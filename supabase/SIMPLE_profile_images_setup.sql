-- ============================================
-- SIMPLE PROFILE IMAGES BUCKET SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create the bucket (safe to run multiple times)
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

-- 2. Drop existing policies (if any) to recreate them cleanly
DROP POLICY IF EXISTS "Users can upload own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Public can view profile images" ON storage.objects;

-- 3. Create policy: Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload own profile image"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 4. Create policy: Allow authenticated users to update their own files
CREATE POLICY "Users can update own profile image"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 5. Create policy: Allow authenticated users to delete their own files
CREATE POLICY "Users can delete own profile image"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 6. Create policy: Allow everyone to view profile images
CREATE POLICY "Public can view profile images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Success!
SELECT '✅ Profile images bucket is ready!' as message;

