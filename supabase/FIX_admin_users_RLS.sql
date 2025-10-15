-- ============================================
-- FIX: Optimize RLS policies for admin_users table
-- Replace auth.uid() with (select auth.uid()) for better performance
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Only admins can add admins" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view admin list" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can delete admin users" ON public.admin_users;

-- Create optimized policies

-- SELECT policy - Admins can view the admin list
CREATE POLICY "Admins can view admin list"
ON public.admin_users
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = (select auth.uid())
  )
);

-- INSERT policy - Only admins can add admins
CREATE POLICY "Only admins can add admins"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = (select auth.uid())
  )
);

-- UPDATE policy - Admins can update admin users
CREATE POLICY "Admins can update admin users"
ON public.admin_users
FOR UPDATE
TO authenticated
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

-- DELETE policy - Admins can delete admin users (but not themselves)
CREATE POLICY "Admins can delete admin users"
ON public.admin_users
FOR DELETE
TO authenticated
USING (
  user_id != (select auth.uid()) AND
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = (select auth.uid())
  )
);

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'admin_users'
ORDER BY policyname;

-- ============================================
-- DONE! Performance optimized.
-- ============================================

