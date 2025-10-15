-- Fix security issue: Remove SECURITY DEFINER view
-- This view isn't used by the application, so we can safely drop it

-- Drop the view
DROP VIEW IF EXISTS public.user_roles_view CASCADE;

-- Verify it's gone
SELECT COUNT(*) as view_exists 
FROM information_schema.views 
WHERE table_schema = 'public' 
AND table_name = 'user_roles_view';
-- Should return 0

-- Note: All application code queries user_roles table directly,
-- so this view removal has no impact on functionality.

