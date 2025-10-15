-- ============================================
-- DEBUG AND FIX STORAGE POLICIES
-- Run this to see current policies and create open ones
-- ============================================

-- Step 1: Check what policies currently exist
SELECT 
  'Current storage.objects policies:' as info,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual as using_clause,
  with_check
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
ORDER BY policyname;

-- Step 2: Drop ALL existing policies on storage.objects that mention 'profile'
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects'
        AND policyname ILIKE '%profile%'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
        RAISE NOTICE 'Dropped policy: %', r.policyname;
    END LOOP;
END $$;

-- Step 3: Create VERY permissive policies for testing
CREATE POLICY "Allow authenticated uploads to profile-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "Allow authenticated updates to profile-images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images')
WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "Allow authenticated deletes in profile-images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');

CREATE POLICY "Allow public reads of profile-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Step 4: Verify new policies
SELECT 
  'New policies created:' as info,
  policyname,
  cmd as operation,
  roles
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname ILIKE '%profile%'
ORDER BY policyname;

-- Step 5: Check bucket configuration
SELECT 
  'Bucket config:' as info,
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id = 'profile-images';

SELECT '✅ Storage policies fixed! Try uploading again.' as message;

