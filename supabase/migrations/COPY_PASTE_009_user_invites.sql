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

