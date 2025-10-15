-- ============================================
-- TEMPORARY: Disable RLS for testing
-- This will allow uploads to work
-- ============================================

-- Disable RLS on storage.objects (TEMPORARY - for testing only)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'storage' 
AND tablename = 'objects';

-- ============================================
-- After you confirm uploads work, re-enable with:
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
-- ============================================

