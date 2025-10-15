-- ============================================
-- Show ALL columns for ALL relevant tables
-- ============================================

SELECT 
  table_name,
  column_name,
  data_type,
  ordinal_position
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name IN ('onboarding_submissions', 'projects', 'profiles', 'user_profiles', 'admin_users')
ORDER BY table_name, ordinal_position;

