-- Multi-Role System Migration - COMPLETELY SAFE VERSION
-- Run this SQL in Supabase SQL Editor to enable multi-role support

-- STEP 1: Drop any existing views that might conflict
DROP VIEW IF EXISTS public.user_roles_view CASCADE;

-- STEP 2: Create user_roles table to store multiple roles per user
CREATE TABLE IF NOT EXISTS public.user_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  questionnaire_completed BOOLEAN DEFAULT FALSE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, role)
);

-- STEP 3: Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_completed ON public.user_roles(questionnaire_completed);

-- STEP 4: Add new profile fields ONLY if they don't exist
DO $$ 
BEGIN
  -- Add phone column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'phone'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN phone TEXT;
    RAISE NOTICE 'Added column: phone';
  ELSE
    RAISE NOTICE 'Column already exists: phone';
  END IF;

  -- Add project_lead column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'project_lead'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN project_lead TEXT;
    RAISE NOTICE 'Added column: project_lead';
  ELSE
    RAISE NOTICE 'Column already exists: project_lead';
  END IF;

  -- Add project_description column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'project_description'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN project_description TEXT;
    RAISE NOTICE 'Added column: project_description';
  ELSE
    RAISE NOTICE 'Column already exists: project_description';
  END IF;

  -- Add profile_image_url column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'profile_image_url'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN profile_image_url TEXT;
    RAISE NOTICE 'Added column: profile_image_url';
  ELSE
    RAISE NOTICE 'Column already exists: profile_image_url';
  END IF;
END $$;

-- STEP 5: Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- STEP 6: Drop existing policies if they exist (idempotent)
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can delete own roles" ON public.user_roles;

-- STEP 7: Create RLS policies for user_roles table
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roles"
  ON public.user_roles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own roles"
  ON public.user_roles FOR DELETE
  USING (auth.uid() = user_id);

-- STEP 8: Create a helpful view to see all user roles aggregated
CREATE VIEW public.user_roles_view AS
SELECT 
  user_id,
  array_agg(role ORDER BY added_at) as roles,
  COUNT(*) as total_roles,
  COUNT(*) FILTER (WHERE questionnaire_completed = true) as completed_roles
FROM public.user_roles
GROUP BY user_id;

-- STEP 9: Drop existing function if it exists
DROP FUNCTION IF EXISTS public.get_user_incomplete_questionnaires(UUID);

-- STEP 10: Create a function to get incomplete questionnaires for a user
CREATE FUNCTION public.get_user_incomplete_questionnaires(p_user_id UUID)
RETURNS TABLE (
  role TEXT,
  added_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT ur.role, ur.added_at
  FROM public.user_roles ur
  WHERE ur.user_id = p_user_id
    AND ur.questionnaire_completed = FALSE
  ORDER BY ur.added_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Multi-role system migration completed successfully!';
  RAISE NOTICE '   - user_roles table created';
  RAISE NOTICE '   - Profile fields added (phone, project_lead, project_description, profile_image_url)';
  RAISE NOTICE '   - RLS policies configured';
  RAISE NOTICE '   - Helper views and functions created';
END $$;

