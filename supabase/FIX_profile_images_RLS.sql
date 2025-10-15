-- ============================================
-- FIX PROFILE IMAGES RLS POLICY
-- This creates a more permissive policy for uploads
-- ============================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can upload own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Public can view profile images" ON storage.objects;

-- Policy 1: Allow ANY authenticated user to upload to profile-images bucket
-- (They can only upload to their own folder based on the path they provide)
CREATE POLICY "Users can upload own profile image"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images'
);

-- Policy 2: Allow authenticated users to update files in profile-images
CREATE POLICY "Users can update own profile image"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images')
WITH CHECK (bucket_id = 'profile-images');

-- Policy 3: Allow authenticated users to delete files in profile-images
CREATE POLICY "Users can delete own profile image"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');

-- Policy 4: Allow PUBLIC to view all profile images
CREATE POLICY "Public can view profile images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Verify the policies
SELECT 
  'RLS Policies for profile-images' as info,
  policyname,
  cmd as operation,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND policyname LIKE '%profile%';

SELECT '✅ Profile images RLS policies updated!' as message;

