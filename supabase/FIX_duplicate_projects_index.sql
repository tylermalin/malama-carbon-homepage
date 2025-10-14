-- ============================================
-- FIX: Remove duplicate index on projects table
-- Drop projects_user_id_idx (keep idx_projects_user_id)
-- ============================================

-- Check existing indexes before dropping
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename = 'projects' 
  AND (indexname = 'idx_projects_user_id' OR indexname = 'projects_user_id_idx')
ORDER BY indexname;

-- Drop the duplicate index
DROP INDEX IF EXISTS public.projects_user_id_idx;

-- Verify only one index remains
SELECT 
  tablename,
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename = 'projects' 
  AND schemaname = 'public'
ORDER BY indexname;

-- ============================================
-- ✅ Duplicate index removed!
-- ============================================

