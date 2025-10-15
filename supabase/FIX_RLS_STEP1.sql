-- ============================================
-- STEP 1: Fix RLS for tables that have user_id
-- (onboarding_submissions, projects, profiles)
-- ============================================

-- ============================================
-- 1. ONBOARDING_SUBMISSIONS
-- ============================================

DROP POLICY IF EXISTS "Users can insert their own onboarding" ON public.onboarding_submissions;
DROP POLICY IF EXISTS "Users can view their own onboarding" ON public.onboarding_submissions;
DROP POLICY IF EXISTS "Users can update their own onboarding" ON public.onboarding_submissions;

CREATE POLICY "Users can insert their own onboarding"
ON public.onboarding_submissions FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can view their own onboarding"
ON public.onboarding_submissions FOR SELECT TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own onboarding"
ON public.onboarding_submissions FOR UPDATE TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));

-- ============================================
-- 2. PROJECTS
-- ============================================

DROP POLICY IF EXISTS "Users can CRUD their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON public.projects;

CREATE POLICY "Users can view their own projects"
ON public.projects FOR SELECT TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own projects"
ON public.projects FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own projects"
ON public.projects FOR UPDATE TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own projects"
ON public.projects FOR DELETE TO authenticated
USING (user_id = (select auth.uid()));

-- ============================================
-- 3. PROFILES
-- ============================================

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT TO authenticated
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete their own profile"
ON public.profiles FOR DELETE TO authenticated
USING (user_id = (select auth.uid()));

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 
  tablename,
  policyname,
  cmd,
  'OPTIMIZED' as status
FROM pg_policies 
WHERE tablename IN ('onboarding_submissions', 'projects', 'profiles')
ORDER BY tablename, policyname;

-- ============================================
-- ✅ STEP 1 COMPLETE!
-- Run FIX_admin_users_CORRECTED.sql next for admin_users
-- ============================================

