-- ============================================
-- CHECK: What columns exist in each table?
-- ============================================

-- Check onboarding_submissions columns
SELECT 'onboarding_submissions' as table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'onboarding_submissions'
ORDER BY ordinal_position;

-- Check projects columns
SELECT 'projects' as table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'projects'
ORDER BY ordinal_position;

-- Check user_profiles columns
SELECT 'user_profiles' as table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'user_profiles'
ORDER BY ordinal_position;

-- Check admin_users columns
SELECT 'admin_users' as table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'admin_users'
ORDER BY ordinal_position;

-- Check profiles columns (might be this instead of user_profiles)
SELECT 'profiles' as table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

