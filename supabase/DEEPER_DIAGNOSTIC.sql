-- ============================================
-- DEEPER DIAGNOSTIC: Find the hidden blocker
-- ============================================

-- 1. Check if there are ANY other policies on storage.objects that might conflict
SELECT 
  policyname,
  cmd,
  roles::text[],
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- 2. Check for policies on storage.buckets (these can also block access)
SELECT 
  policyname,
  cmd,
  roles::text[],
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'buckets' 
AND schemaname = 'storage';

-- 3. Verify RLS is enabled (it should be)
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'storage' 
AND tablename IN ('objects', 'buckets');

-- 4. Check bucket configuration
SELECT * FROM storage.buckets WHERE name = 'profile-images';

-- 5. Try to see what the authenticated user's role actually is
-- (Run this while logged in as your test user)
SELECT current_user, current_setting('request.jwt.claims', true);

