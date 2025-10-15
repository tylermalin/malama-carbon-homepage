-- ============================================
-- FIX IMAGE UPLOAD - WORKS WITH LIMITED PERMISSIONS
-- This version uses the correct role for storage operations
-- ============================================

-- Step 1: Switch to the storage admin role to modify storage objects
-- This is required because storage.objects is owned by supabase_storage_admin
SET ROLE supabase_storage_admin;

-- Step 2: Ensure the profile-images bucket exists
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

-- Step 3: Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies (these will work with storage admin role)
DROP POLICY IF EXISTS "Users can upload own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Public can view profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete profile images" ON storage.objects;

-- Step 5: Create NEW permissive policies
CREATE POLICY "Authenticated users can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can update profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images')
WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can delete profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');

CREATE POLICY "Public can view profile images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Step 6: Reset role back to normal
RESET ROLE;

-- Verify the setup
SELECT 
  '✅ BUCKET CONFIGURATION' as status,
  id,
  name,
  public,
  file_size_limit / 1024 / 1024 as "size_limit_mb",
  allowed_mime_types
FROM storage.buckets
WHERE id = 'profile-images';

SELECT 
  '✅ RLS POLICIES' as status,
  policyname,
  cmd as operation
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND policyname LIKE '%profile%';

-- Success!
SELECT '✅ Image upload policies fixed! Try uploading again.' as message;

