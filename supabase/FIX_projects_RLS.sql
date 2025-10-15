-- ============================================
-- FIX: Optimize RLS policies for projects table
-- Replace auth.uid() with (select auth.uid()) for better performance
-- ============================================

-- Drop ALL existing policies (old and new)
DROP POLICY IF EXISTS "Users can CRUD their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON public.projects;

-- Create separate optimized policies for each operation

-- SELECT policy
CREATE POLICY "Users can view their own projects"
ON public.projects
FOR SELECT
TO authenticated
USING (user_id = (select auth.uid()));

-- INSERT policy
CREATE POLICY "Users can insert their own projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));

-- UPDATE policy
CREATE POLICY "Users can update their own projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));

-- DELETE policy
CREATE POLICY "Users can delete their own projects"
ON public.projects
FOR DELETE
TO authenticated
USING (user_id = (select auth.uid()));

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'projects'
ORDER BY policyname;

-- ============================================
-- DONE! Performance optimized.
-- ============================================

