-- ================================================================
-- VERIFY THE MIGRATION WORKED
-- Run this to check that everything was created successfully
-- ================================================================

-- 1. Check if user_roles table exists
SELECT 
  'user_roles table exists' as check_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'user_roles'
  ) THEN '✅ PASS' ELSE '❌ FAIL' END as status;

-- 2. Check if new profile columns exist
SELECT 
  'phone column exists' as check_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'phone'
  ) THEN '✅ PASS' ELSE '❌ FAIL' END as status
UNION ALL
SELECT 
  'project_lead column exists',
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'project_lead'
  ) THEN '✅ PASS' ELSE '❌ FAIL' END
UNION ALL
SELECT 
  'project_description column exists',
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'project_description'
  ) THEN '✅ PASS' ELSE '❌ FAIL' END
UNION ALL
SELECT 
  'profile_image_url column exists',
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'profile_image_url'
  ) THEN '✅ PASS' ELSE '❌ FAIL' END;

-- 3. Check RLS policies
SELECT 
  'user_roles RLS policies' as check_name,
  COUNT(*) || ' policies created (should be 4)' as status
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'user_roles';

-- 4. Show all columns in profiles table
SELECT 
  'profiles columns' as info,
  string_agg(column_name, ', ' ORDER BY ordinal_position) as columns
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
GROUP BY 1;

-- 5. Show structure of user_roles table
SELECT 
  'user_roles columns' as info,
  string_agg(column_name || ' (' || data_type || ')', ', ' ORDER BY ordinal_position) as columns
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_roles'
GROUP BY 1;

