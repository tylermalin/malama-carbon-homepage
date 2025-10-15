-- ============================================
-- FIX: admin_users table RLS (CORRECTED)
-- admin_users doesn't have user_id, so we need to add it first
-- OR check by email instead
-- ============================================

-- OPTION 1: Add user_id column to admin_users (RECOMMENDED)
-- This links admin_users to auth.users properly

ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Migrate existing data: match emails from admin_users to auth.users
UPDATE public.admin_users au
SET user_id = (
  SELECT id FROM auth.users 
  WHERE email = au.email 
  LIMIT 1
)
WHERE user_id IS NULL;

-- Now create optimized RLS policies using user_id
DROP POLICY IF EXISTS "Only admins can add admins" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view admin list" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can delete admin users" ON public.admin_users;

CREATE POLICY "Admins can view admin list"
ON public.admin_users FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = (select auth.uid())
  )
);

CREATE POLICY "Only admins can add admins"
ON public.admin_users FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = (select auth.uid())
  )
);

CREATE POLICY "Admins can update admin users"
ON public.admin_users FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = (select auth.uid())
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = (select auth.uid())
  )
);

CREATE POLICY "Admins can delete admin users"
ON public.admin_users FOR DELETE TO authenticated
USING (
  user_id != (select auth.uid()) AND
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = (select auth.uid())
  )
);

-- Verify
SELECT * FROM public.admin_users ORDER BY email;

-- ============================================
-- ✅ DONE! admin_users now has user_id and optimized RLS
-- ============================================

