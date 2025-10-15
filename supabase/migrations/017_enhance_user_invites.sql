-- ============================================
-- ENHANCE USER INVITES TABLE
-- Add advisor/investor tracking fields
-- ============================================

-- Add new columns to user_invites
ALTER TABLE public.user_invites
  ADD COLUMN IF NOT EXISTS invite_type TEXT DEFAULT 'user',
  ADD COLUMN IF NOT EXISTS source_campaign TEXT,
  ADD COLUMN IF NOT EXISTS referrer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS investment_interest TEXT,
  ADD COLUMN IF NOT EXISTS expertise_areas TEXT,
  ADD COLUMN IF NOT EXISTS invite_token TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS token_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS opened_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

-- Add check constraint for invite_type
ALTER TABLE public.user_invites
  DROP CONSTRAINT IF EXISTS valid_invite_type;

ALTER TABLE public.user_invites
  ADD CONSTRAINT valid_invite_type 
  CHECK (invite_type IN ('user', 'advisor', 'investor'));

-- Generate tokens for existing invites that don't have one
UPDATE public.user_invites
SET invite_token = encode(gen_random_bytes(32), 'hex'),
    token_expires_at = created_at + INTERVAL '30 days'
WHERE invite_token IS NULL;

-- Create index on invite_token
CREATE INDEX IF NOT EXISTS idx_user_invites_token 
  ON public.user_invites(invite_token);

CREATE INDEX IF NOT EXISTS idx_user_invites_type 
  ON public.user_invites(invite_type);

CREATE INDEX IF NOT EXISTS idx_user_invites_campaign 
  ON public.user_invites(source_campaign);

-- ============================================
-- FUNCTION TO GENERATE INVITE TOKEN
-- ============================================

CREATE OR REPLACE FUNCTION generate_invite_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invite_token IS NULL THEN
    NEW.invite_token := encode(gen_random_bytes(32), 'hex');
    NEW.token_expires_at := NEW.created_at + INTERVAL '30 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS set_invite_token ON public.user_invites;
CREATE TRIGGER set_invite_token
  BEFORE INSERT ON public.user_invites
  FOR EACH ROW
  EXECUTE FUNCTION generate_invite_token();

-- ============================================
-- FUNCTION TO TRACK INVITE OPENS
-- ============================================

CREATE OR REPLACE FUNCTION track_invite_open(token TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.user_invites
  SET opened_at = NOW()
  WHERE invite_token = token
    AND opened_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNCTION TO MARK INVITE COMPLETED
-- ============================================

CREATE OR REPLACE FUNCTION mark_invite_completed(token TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.user_invites
  SET status = 'accepted',
      completed_at = NOW(),
      accepted_at = NOW()
  WHERE invite_token = token
    AND status = 'pending';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ User invites table enhanced!';
  RAISE NOTICE '   - Added invite_type (user, advisor, investor)';
  RAISE NOTICE '   - Added source_campaign tracking';
  RAISE NOTICE '   - Added invite_token with 30-day expiration';
  RAISE NOTICE '   - Added tracking functions';
END $$;

