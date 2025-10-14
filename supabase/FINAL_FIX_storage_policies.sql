-- ============================================
-- FINAL FIX: Storage Policies for Profile Images
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Drop ALL existing policies on storage.objects for profile-images
DO $$ 
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage'
    AND policyname ILIKE '%profile%'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
    RAISE NOTICE 'Dropped policy: %', pol.policyname;
  END LOOP;
END $$;

-- Step 2: Create comprehensive policies for authenticated users
-- These allow ANY authenticated user to upload, update, and delete their own files

-- Allow authenticated users to INSERT (upload) to profile-images
CREATE POLICY "Authenticated users can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images'
);

-- Allow authenticated users to UPDATE (upsert/overwrite) files in profile-images
CREATE POLICY "Authenticated users can update profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images')
WITH CHECK (bucket_id = 'profile-images');

-- Allow authenticated users to DELETE their files in profile-images
CREATE POLICY "Authenticated users can delete profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');

-- Allow PUBLIC to SELECT (read) from profile-images (since bucket is public)
CREATE POLICY "Public users can read profile images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Step 3: Verify policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname ILIKE '%profile%'
ORDER BY policyname;

-- ============================================
-- DONE! Now try uploading an image again.
-- ============================================

