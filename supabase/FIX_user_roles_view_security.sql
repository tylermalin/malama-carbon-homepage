-- ============================================
-- FIX: Remove SECURITY DEFINER from user_roles_view
-- Replace with SECURITY INVOKER (default) for better security
-- ============================================

-- First, let's see what the current view definition is
SELECT pg_get_viewdef('public.user_roles_view', true);

-- Drop the existing view
DROP VIEW IF EXISTS public.user_roles_view;

-- Recreate without SECURITY DEFINER (uses SECURITY INVOKER by default)
-- This will enforce RLS for the querying user, not the view creator
CREATE OR REPLACE VIEW public.user_roles_view 
AS
SELECT 
  ur.user_id,
  ur.role,
  ur.questionnaire_completed,
  ur.added_at,
  ur.completed_at,
  p.full_name,
  p.org_name
FROM public.user_roles ur
LEFT JOIN public.profiles p ON ur.user_id = p.user_id;

-- Add a comment explaining the security model
COMMENT ON VIEW public.user_roles_view IS 
'View of user roles with profile info. Uses SECURITY INVOKER to enforce RLS for the querying user.';

-- Verify the view was created correctly
SELECT 
  schemaname,
  viewname,
  viewowner,
  definition
FROM pg_views
WHERE viewname = 'user_roles_view';

-- ============================================
-- ✅ DONE! View now uses SECURITY INVOKER
-- ============================================

