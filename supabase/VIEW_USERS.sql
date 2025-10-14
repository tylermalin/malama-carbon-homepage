-- ==========================================
-- VIEW ALL REGISTERED USERS (SAFE QUERY)
-- ==========================================
-- This query shows user emails and profile info
-- ❌ PASSWORDS ARE NOT AND CANNOT BE RETRIEVED (they are hashed)
-- ✅ This is the CORRECT and SECURE way to view user data
-- ==========================================

-- View all users with their profile information
SELECT 
  u.id as user_id,
  u.email,
  u.created_at as registered_at,
  u.email_confirmed_at,
  u.last_sign_in_at,
  CASE 
    WHEN u.email_confirmed_at IS NULL THEN '❌ Unverified'
    ELSE '✅ Verified'
  END as email_status,
  p.full_name,
  p.organization,
  p.role as user_type,
  p.profile_completed
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
ORDER BY u.created_at DESC;

-- ==========================================
-- View only UNVERIFIED users (need manual verification)
-- ==========================================

SELECT 
  email,
  created_at,
  'Awaiting verification' as status
FROM auth.users
WHERE email_confirmed_at IS NULL
ORDER BY created_at DESC;

-- ==========================================
-- Count users by type
-- ==========================================

SELECT 
  COALESCE(p.role, 'No profile') as user_type,
  COUNT(*) as count
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
GROUP BY p.role
ORDER BY count DESC;

-- ==========================================
-- SECURITY NOTE ABOUT PASSWORDS
-- ==========================================
-- ⚠️ You CANNOT and SHOULD NOT retrieve passwords
-- 
-- Passwords in auth.users are stored as:
-- - Hashed using bcrypt
-- - One-way encryption (cannot be reversed)
-- - Example hash: $2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa
--
-- This is CORRECT and SECURE behavior!
-- 
-- If you need to help a user:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click ••• next to user → "Send password reset email"
-- 3. User creates new password
--
-- NEVER store or transmit plain text passwords!
-- ==========================================

