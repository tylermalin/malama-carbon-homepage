-- =====================================================
-- STANDALONE VERSION - Creates admin_users if needed
-- Safe to run even if admin_users already exists
-- =====================================================

-- First, ensure admin_users table exists
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  added_by TEXT
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Add your admin email if not already there
INSERT INTO public.admin_users (email, added_by)
VALUES 
  ('tyler@malamalabs.com', 'initial_setup'),
  ('tylermalin@gmail.com', 'initial_setup')
ON CONFLICT (email) DO NOTHING;

-- Admin policies (drop first for idempotency)
DROP POLICY IF EXISTS "Allow read access to admin list" ON public.admin_users;
DROP POLICY IF EXISTS "Only admins can add admins" ON public.admin_users;

CREATE POLICY "Allow read access to admin list"
ON public.admin_users
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can add admins"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

-- Now create user_invites table
CREATE TABLE IF NOT EXISTS public.user_invites (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  message TEXT,
  invited_by TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days')
);

CREATE INDEX IF NOT EXISTS idx_user_invites_email ON public.user_invites(email);
CREATE INDEX IF NOT EXISTS idx_user_invites_status ON public.user_invites(status);

ALTER TABLE public.user_invites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all invites" ON public.user_invites;
DROP POLICY IF EXISTS "Admins can create invites" ON public.user_invites;
DROP POLICY IF EXISTS "Users can view their own invite" ON public.user_invites;

CREATE POLICY "Admins can view all invites" 
ON public.user_invites 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

CREATE POLICY "Admins can create invites" 
ON public.user_invites 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

CREATE POLICY "Users can view their own invite" 
ON public.user_invites 
FOR SELECT 
TO authenticated
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

CREATE OR REPLACE FUNCTION expire_old_invites()
RETURNS void AS $$
BEGIN
  UPDATE public.user_invites
  SET status = 'expired'
  WHERE status = 'pending'
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION expire_old_invites() TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'SUCCESS! Admin users and user invites tables created.';
  RAISE NOTICE 'Admin emails configured: tyler@malamalabs.com, tylermalin@gmail.com';
END $$;

