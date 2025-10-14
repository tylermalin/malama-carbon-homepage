-- ============================================
-- Fix: Infinite Recursion in admin_users RLS
-- ============================================
-- The admin_users table RLS is causing recursion when storage tries to verify permissions.
-- We need to simplify or disable RLS for admin_users since it's causing system-level issues.

-- SOLUTION: Drop ALL RLS policies from admin_users and disable RLS
-- Admin access should be controlled at the application level, not via RLS,
-- especially since it's interfering with core storage operations.

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Admin users can view own record" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can insert own record" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can update own record" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can delete own record" ON public.admin_users;

-- Step 2: Disable RLS on admin_users table
-- This table should be managed by service role / server-side operations only
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;

-- ============================================
-- Alternative: If we MUST keep RLS enabled, use a non-recursive policy
-- ============================================
-- Uncomment below if you want to keep RLS, but this creates a simple policy
-- that doesn't cause recursion

-- ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Service role has full access to admin_users"
-- ON public.admin_users
-- FOR ALL
-- TO service_role
-- USING (true)
-- WITH CHECK (true);

-- CREATE POLICY "Authenticated users can read admin_users"
-- ON public.admin_users
-- FOR SELECT
-- TO authenticated
-- USING (true);

-- Note: We're allowing read access to check if a user is admin,
-- but only service role can modify the table.

COMMIT;

