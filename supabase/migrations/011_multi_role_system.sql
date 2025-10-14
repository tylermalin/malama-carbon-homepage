-- ================================================================
-- Multi-Role System + Enhanced Profile Fields
-- Allows users to have multiple roles and comprehensive profile data
-- ================================================================

-- Step 1: Create user_roles table for multi-role support
CREATE TABLE IF NOT EXISTS public.user_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  questionnaire_completed BOOLEAN DEFAULT FALSE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- Step 2: Add new fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS project_lead TEXT,
ADD COLUMN IF NOT EXISTS project_description TEXT,
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Step 3: RLS policies for user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can delete own roles" ON public.user_roles;

CREATE POLICY "Users can view own roles" 
ON public.user_roles FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roles" 
ON public.user_roles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roles" 
ON public.user_roles FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own roles" 
ON public.user_roles FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- Step 4: Helper view to get user's roles as array
CREATE OR REPLACE VIEW public.user_roles_view AS
SELECT 
  user_id,
  ARRAY_AGG(role ORDER BY added_at) as roles,
  ARRAY_AGG(questionnaire_completed ORDER BY added_at) as completed_statuses,
  COUNT(*) as role_count,
  COUNT(*) FILTER (WHERE questionnaire_completed = true) as completed_count
FROM public.user_roles
GROUP BY user_id;

-- Grant access to the view
GRANT SELECT ON public.user_roles_view TO authenticated;

-- Step 5: Function to get incomplete questionnaires for a user
CREATE OR REPLACE FUNCTION public.get_user_incomplete_questionnaires(p_user_id UUID)
RETURNS TABLE (
  role TEXT,
  added_at TIMESTAMPTZ
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

GRANT EXECUTE ON FUNCTION public.get_user_incomplete_questionnaires(UUID) TO authenticated;

-- Success message
SELECT 'Multi-role system created successfully! Users can now have multiple roles.' as message;

