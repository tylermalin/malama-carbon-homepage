-- ================================================================
-- RUN THIS IN SUPABASE SQL EDITOR TO FIX ALL DATABASE ERRORS
-- This creates the user_roles table and adds missing columns
-- ================================================================

-- 1. Create user_roles table to store multiple roles per user
CREATE TABLE IF NOT EXISTS public.user_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  questionnaire_completed BOOLEAN DEFAULT FALSE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, role)
);

-- 2. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_completed ON public.user_roles(questionnaire_completed);

-- 3. Add new profile fields ONLY if they don't exist
-- Check and add phone column
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'phone') THEN
    ALTER TABLE public.profiles ADD COLUMN phone TEXT;
  END IF;
END $$;

-- Check and add project_lead column
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'project_lead') THEN
    ALTER TABLE public.profiles ADD COLUMN project_lead TEXT;
  END IF;
END $$;

-- Check and add project_description column
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'project_description') THEN
    ALTER TABLE public.profiles ADD COLUMN project_description TEXT;
  END IF;
END $$;

-- Check and add profile_image_url column
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'profile_image_url') THEN
    ALTER TABLE public.profiles ADD COLUMN profile_image_url TEXT;
  END IF;
END $$;

-- 4. Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies if they exist (idempotent)
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can delete own roles" ON public.user_roles;

-- 6. Create RLS policies for user_roles table
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

-- 7. Create a helpful view to see all user roles aggregated
CREATE OR REPLACE VIEW public.user_roles_view AS
SELECT 
  user_id,
  array_agg(role ORDER BY added_at) as roles,
  COUNT(*) as total_roles,
  COUNT(*) FILTER (WHERE questionnaire_completed = true) as completed_roles
FROM public.user_roles
GROUP BY user_id;

-- 8. Grant access to view
GRANT SELECT ON public.user_roles_view TO authenticated;

-- 9. Create a function to get incomplete questionnaires for a user
CREATE OR REPLACE FUNCTION public.get_user_incomplete_questionnaires(p_user_id UUID)
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

-- 10. Grant execute permission on function
GRANT EXECUTE ON FUNCTION public.get_user_incomplete_questionnaires(UUID) TO authenticated;

-- ================================================================
-- SUCCESS! The following is now available:
-- - user_roles table for multi-role support
-- - phone, project_lead, project_description, profile_image_url columns in profiles
-- - RLS policies for secure access
-- - Helper views and functions
-- ================================================================

-- After running this, RELOAD THE SCHEMA in your app by refreshing the browser!

