-- ============================================
-- DIAGNOSTIC: Check what policies exist
-- ============================================

-- Check ALL policies on storage.objects
SELECT 
  policyname,
  cmd,
  roles::text[] as roles,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- Check if RLS is enabled on storage.objects
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'storage' 
AND tablename = 'objects';

-- Check bucket configuration
SELECT 
  id,
  name,
  public
FROM storage.buckets
WHERE name = 'profile-images';

