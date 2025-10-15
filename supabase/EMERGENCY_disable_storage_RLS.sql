-- ============================================
-- EMERGENCY: Temporarily disable RLS for testing
-- This will allow uploads to work while we debug
-- ============================================

-- WARNING: This temporarily makes storage less secure
-- Only use for testing, then re-enable with proper policies

-- Disable RLS on storage.objects
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'storage' 
  AND tablename = 'objects';

SELECT '⚠️  RLS DISABLED ON STORAGE - UPLOADS SHOULD WORK NOW!' as message;
SELECT 'Try uploading an image. Once it works, we can re-enable RLS with proper policies.' as next_step;

