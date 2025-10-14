-- ============================================
-- FIX ALL RLS PERFORMANCE ISSUES
-- Optimizes all tables by replacing auth.uid() with (select auth.uid())
-- Run this once to fix all RLS performance warnings
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

-- Drop ALL existing policies (old and new variations)
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
-- 3. PROFILES (not user_profiles)
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
-- 4. ADMIN_USERS
-- ============================================

DROP POLICY IF EXISTS "Only admins can add admins" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view admin list" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can delete admin users" ON public.admin_users;

CREATE POLICY "Admins can view admin list"
ON public.admin_users FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = (select auth.uid())));

CREATE POLICY "Only admins can add admins"
ON public.admin_users FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = (select auth.uid())));

CREATE POLICY "Admins can update admin users"
ON public.admin_users FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = (select auth.uid())))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = (select auth.uid())));

CREATE POLICY "Admins can delete admin users"
ON public.admin_users FOR DELETE TO authenticated
USING (
  user_id != (select auth.uid()) AND
  EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = (select auth.uid()))
);

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 
  tablename,
  policyname,
  cmd,
  'OPTIMIZED' as status
FROM pg_policies 
WHERE tablename IN ('onboarding_submissions', 'projects', 'profiles', 'admin_users')
ORDER BY tablename, policyname;

-- ============================================
-- ✅ ALL RLS POLICIES OPTIMIZED!
-- ============================================

