-- ============================================
-- CREATE STORAGE BUCKET FOR PROFILE IMAGES
-- ============================================

-- Create the bucket for profile images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

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

-- Helper function to get profile image URL
CREATE OR REPLACE FUNCTION get_profile_image_url(user_id UUID)
RETURNS TEXT AS $$
DECLARE
  base_url TEXT;
  image_path TEXT;
BEGIN
  -- Get the Supabase project URL (you'll need to configure this)
  -- For now, return the path and let the client build the full URL
  SELECT name INTO image_path
  FROM storage.objects
  WHERE bucket_id = 'profile-images'
    AND (storage.foldername(name))[1] = user_id::text
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF image_path IS NULL THEN
    RETURN NULL;
  END IF;
  
  RETURN image_path;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute on the function
GRANT EXECUTE ON FUNCTION get_profile_image_url(UUID) TO authenticated, anon;

COMMENT ON FUNCTION get_profile_image_url(UUID) IS 'Returns the profile image path for a given user';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Profile images storage bucket created!';
  RAISE NOTICE '   - Bucket: profile-images';
  RAISE NOTICE '   - Public read access enabled';
  RAISE NOTICE '   - 5MB file size limit';
  RAISE NOTICE '   - Allowed: JPEG, PNG, GIF, WebP';
  RAISE NOTICE '   - RLS policies configured';
  RAISE NOTICE '';
  RAISE NOTICE '📁 Storage structure:';
  RAISE NOTICE '   profile-images/';
  RAISE NOTICE '     {user_id}/';
  RAISE NOTICE '       profile.jpg';
END $$;

