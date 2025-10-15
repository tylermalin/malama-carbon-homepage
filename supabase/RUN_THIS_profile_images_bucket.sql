-- ============================================
-- ENSURE PROFILE IMAGES BUCKET EXISTS
-- Run this in Supabase SQL Editor
-- ============================================

-- Create the bucket for profile images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

-- Enable RLS on storage.objects (safe to run multiple times)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them (idempotent)
DROP POLICY IF EXISTS "Users can upload own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Public can view profile images" ON storage.objects;

-- Policy: Allow authenticated users to upload their own profile images
CREATE POLICY "Users can upload own profile image"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow authenticated users to update their own profile images
CREATE POLICY "Users can update own profile image"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'profile-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow authenticated users to delete their own profile images
CREATE POLICY "Users can delete own profile image"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Allow public read access to all profile images
CREATE POLICY "Public can view profile images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Verify the setup
SELECT 
  'Bucket Configuration' as info,
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id = 'profile-images';

-- Show policies
SELECT 
  'RLS Policies' as info,
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
AND policyname LIKE '%profile%';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Profile images bucket is ready!';
  RAISE NOTICE '   - Upload path format: {userId}/filename.jpg';
  RAISE NOTICE '   - 5MB file size limit';
  RAISE NOTICE '   - Public read access enabled';
END $$;

