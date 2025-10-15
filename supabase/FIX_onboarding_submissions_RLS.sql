-- ============================================
-- FIX: Optimize RLS policy for onboarding_submissions
-- Replace auth.uid() with (select auth.uid()) for better performance
-- ============================================

-- Drop existing policy
DROP POLICY IF EXISTS "Users can insert their own onboarding" ON public.onboarding_submissions;

-- Recreate with optimized version
CREATE POLICY "Users can insert their own onboarding"
ON public.onboarding_submissions
FOR INSERT
TO authenticated
WITH CHECK (user_id = (select auth.uid()));

-- Also optimize other policies if they exist
DROP POLICY IF EXISTS "Users can view their own onboarding" ON public.onboarding_submissions;
CREATE POLICY "Users can view their own onboarding"
ON public.onboarding_submissions
FOR SELECT
TO authenticated
USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update their own onboarding" ON public.onboarding_submissions;
CREATE POLICY "Users can update their own onboarding"
ON public.onboarding_submissions
FOR UPDATE
TO authenticated
USING (user_id = (select auth.uid()))
WITH CHECK (user_id = (select auth.uid()));

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd
FROM pg_policies 
WHERE tablename = 'onboarding_submissions'
ORDER BY policyname;

-- ============================================
-- DONE! Performance optimized.
-- ============================================

