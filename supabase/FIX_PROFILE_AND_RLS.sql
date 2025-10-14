-- ================================================================
-- COMPLETE FIX: Profile Creation + RLS Policies
-- Run this to fix profile loading issues
-- ================================================================

-- Step 1: Drop ALL existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow all authenticated reads" ON public.profiles;
DROP POLICY IF EXISTS "Users and admins can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Step 2: Create new, working policies
CREATE POLICY "authenticated_select_profiles" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (true);  -- Anyone logged in can read any profile

CREATE POLICY "authenticated_insert_profiles" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);  -- Can only insert own profile

CREATE POLICY "authenticated_update_profiles" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)  -- Can only update own profile
WITH CHECK (auth.uid() = user_id);

-- Step 3: Create your profile (if it doesn't exist)
-- This will use the currently logged-in user's ID
INSERT INTO public.profiles (
  user_id,
  full_name,
  role,
  org_name,
  profile_completed,
  created_at,
  updated_at
)
SELECT 
  auth.uid(),
  COALESCE(
    (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = auth.uid()),
    (SELECT email FROM auth.users WHERE id = auth.uid())
  ) as full_name,
  NULL as role,  -- Will be set when user selects role
  NULL as org_name,
  false as profile_completed,
  NOW() as created_at,
  NOW() as updated_at
WHERE auth.uid() IS NOT NULL  -- Only if user is logged in
ON CONFLICT (user_id) DO NOTHING;  -- Skip if profile already exists

-- Step 4: Verify it worked
SELECT 
  user_id,
  full_name,
  role,
  org_name,
  profile_completed,
  created_at
FROM public.profiles 
WHERE user_id = auth.uid();

-- You should see YOUR profile row now!
-- If role is NULL, that's correct - you'll select it in the dashboard

