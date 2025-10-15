-- Simple fix for multi-role system
-- Run this if COPY_PASTE_011_SAFE.sql didn't work

-- 1. Add columns directly (ignore errors if they exist)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS project_lead TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS project_description TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- 2. Verify columns were added
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
  AND column_name IN ('phone', 'project_lead', 'project_description', 'profile_image_url');

-- 3. Check if user_roles table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'user_roles'
) as user_roles_exists;

