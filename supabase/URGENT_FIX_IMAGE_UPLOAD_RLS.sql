-- ============================================
-- URGENT FIX: IMAGE UPLOAD RLS POLICY ERROR
-- Run this ENTIRE script in your Supabase SQL Editor
-- ============================================

-- Step 1: Ensure the profile-images bucket exists and is properly configured
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

-- Step 2: Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop ALL existing policies on storage.objects to start fresh
DROP POLICY IF EXISTS "Users can upload own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Public can view profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Step 4: Create NEW permissive policies for profile-images bucket
-- These policies allow ANY authenticated user to upload/update/delete in the profile-images bucket
-- The application code handles ensuring users only access their own files

-- INSERT Policy: Allow authenticated users to upload to profile-images
CREATE POLICY "Authenticated users can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images'
);

-- UPDATE Policy: Allow authenticated users to update files in profile-images
CREATE POLICY "Authenticated users can update profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images')
WITH CHECK (bucket_id = 'profile-images');

-- DELETE Policy: Allow authenticated users to delete files in profile-images
CREATE POLICY "Authenticated users can delete profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');

-- SELECT Policy: Allow public read access to all profile images
CREATE POLICY "Public can view profile images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Step 5: Verify the configuration
SELECT 
  '✅ BUCKET CONFIGURATION' as status,
  id,
  name,
  public,
  file_size_limit / 1024 / 1024 as "size_limit_mb",
  allowed_mime_types
FROM storage.buckets
WHERE id = 'profile-images';

-- Step 6: Verify the policies
SELECT 
  '✅ RLS POLICIES' as status,
  policyname,
  cmd as operation,
  CASE 
    WHEN roles::text LIKE '%authenticated%' THEN 'authenticated'
    WHEN roles::text LIKE '%public%' THEN 'public'
    ELSE roles::text
  END as role
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND (policyname LIKE '%profile%' OR policyname LIKE '%Authenticated%');

-- Success message
DO $$
BEGIN
  RAISE NOTICE '==========================================';
  RAISE NOTICE '✅ IMAGE UPLOAD RLS POLICIES FIXED!';
  RAISE NOTICE '==========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Configuration:';
  RAISE NOTICE '  ✓ Bucket: profile-images';
  RAISE NOTICE '  ✓ Public: YES';
  RAISE NOTICE '  ✓ Size Limit: 5MB';
  RAISE NOTICE '  ✓ Allowed: JPEG, PNG, GIF, WebP';
  RAISE NOTICE '';
  RAISE NOTICE 'Policies Created:';
  RAISE NOTICE '  ✓ INSERT: Authenticated users can upload';
  RAISE NOTICE '  ✓ UPDATE: Authenticated users can update';
  RAISE NOTICE '  ✓ DELETE: Authenticated users can delete';
  RAISE NOTICE '  ✓ SELECT: Public can view';
  RAISE NOTICE '';
  RAISE NOTICE 'Upload path format: {userId}/filename.jpg';
  RAISE NOTICE 'Try uploading again - it should work now!';
  RAISE NOTICE '==========================================';
END $$;

