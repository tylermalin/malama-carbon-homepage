-- ============================================
-- CREATE ADMIN ROLE FOR TYLER
-- ============================================

-- Update tyler@malamalabs.com to have admin role
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'tyler@malamalabs.com';

-- Also update tylermalin@gmail.com if it exists
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'tylermalin@gmail.com';

-- Create admin_users view for easy access
CREATE OR REPLACE VIEW admin_users AS
SELECT 
  id,
  email,
  raw_user_meta_data->>'name' as name,
  raw_user_meta_data->>'role' as role,
  created_at,
  last_sign_in_at
FROM auth.users
WHERE raw_user_meta_data->>'role' = 'admin';

-- Grant admin read access to all analytics tables
-- (Already handled by RLS policies that check for admin role)

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant usage on the function
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

COMMENT ON FUNCTION is_admin() IS 'Returns true if current user has admin role';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Admin role configured!';
  RAISE NOTICE '   - tyler@malamalabs.com → Admin';
  RAISE NOTICE '   - tylermalin@gmail.com → Admin (if exists)';
  RAISE NOTICE '   - is_admin() function created';
  RAISE NOTICE '   - admin_users view created';
END $$;

