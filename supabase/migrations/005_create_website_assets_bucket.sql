-- ============================================
-- CREATE STORAGE BUCKET FOR WEBSITE ASSETS
-- ============================================

-- Create the bucket for website content (logos, images, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'website-assets',
  'website-assets',
  true,
  10485760, -- 10MB limit per file
  ARRAY[
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/gif', 
    'image/webp',
    'image/svg+xml',
    'video/mp4',
    'video/webm'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all website assets
CREATE POLICY "Public can view website assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'website-assets');

-- Policy: Allow authenticated admins to upload/manage assets
CREATE POLICY "Admins can manage website assets"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'website-assets' 
  AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'website-assets' 
  AND EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  )
);

-- Helper function to get asset URL
CREATE OR REPLACE FUNCTION get_asset_url(asset_path TEXT)
RETURNS TEXT AS $$
DECLARE
  base_url TEXT;
BEGIN
  -- Return the path that can be used with getPublicUrl
  RETURN asset_path;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute on the function
GRANT EXECUTE ON FUNCTION get_asset_url(TEXT) TO authenticated, anon;

COMMENT ON FUNCTION get_asset_url(TEXT) IS 'Returns the asset path for use with Supabase Storage getPublicUrl';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Website assets storage bucket created!';
  RAISE NOTICE '   - Bucket: website-assets';
  RAISE NOTICE '   - Public read access enabled';
  RAISE NOTICE '   - 10MB file size limit';
  RAISE NOTICE '   - Allowed: Images (JPEG, PNG, GIF, WebP, SVG), Videos (MP4, WebM)';
  RAISE NOTICE '   - Admin-only uploads';
  RAISE NOTICE '';
  RAISE NOTICE '📁 Suggested folder structure:';
  RAISE NOTICE '   website-assets/';
  RAISE NOTICE '     logos/';
  RAISE NOTICE '       malama-logo-blue.png';
  RAISE NOTICE '       malama-logo-orange.png';
  RAISE NOTICE '     team/';
  RAISE NOTICE '       tyler-headshot.png';
  RAISE NOTICE '       dominick-photo.png';
  RAISE NOTICE '     projects/';
  RAISE NOTICE '       project-1.jpg';
  RAISE NOTICE '     marketing/';
  RAISE NOTICE '       hero-bg.jpg';
  RAISE NOTICE '     videos/';
  RAISE NOTICE '       mission-video.mp4';
END $$;

