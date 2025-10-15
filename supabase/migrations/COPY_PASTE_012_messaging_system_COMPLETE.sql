-- ============================================
-- MĀLAMA LABS - MESSAGING SYSTEM
-- Complete migration for admin-to-user messaging
-- and advisor/investor invitations
-- ============================================
-- 
-- This migration creates:
-- 1. admin_messages table (admin-to-user communication)
-- 2. message_templates table (pre-built message templates)
-- 3. advisor_profiles table (advisor information)
-- 4. investor_profiles table (investor information)
-- 5. Enhanced user_invites table (tracking & tokens)
-- 6. onboarding_status field in user_roles
--
-- Copy and paste this entire file into Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. ADMIN MESSAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.admin_messages (
  id BIGSERIAL PRIMARY KEY,
  
  -- Message content
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'general',
  priority TEXT NOT NULL DEFAULT 'normal',
  
  -- Sender info
  sent_by TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Recipient info
  recipient_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_role TEXT,
  recipient_email TEXT,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'sent',
  read_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_message_type CHECK (message_type IN ('general', 'project_update', 'credit_availability', 'action_required', 'announcement')),
  CONSTRAINT valid_priority CHECK (priority IN ('normal', 'high', 'urgent')),
  CONSTRAINT valid_status CHECK (status IN ('sent', 'read', 'archived')),
  CONSTRAINT has_recipient CHECK (recipient_user_id IS NOT NULL OR recipient_role IS NOT NULL)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_admin_messages_recipient_user ON public.admin_messages(recipient_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_messages_recipient_role ON public.admin_messages(recipient_role);
CREATE INDEX IF NOT EXISTS idx_admin_messages_status ON public.admin_messages(status);
CREATE INDEX IF NOT EXISTS idx_admin_messages_sent_at ON public.admin_messages(sent_at DESC);

-- RLS
ALTER TABLE public.admin_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all messages" ON public.admin_messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can insert messages" ON public.admin_messages FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update messages" ON public.admin_messages FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Users can view their own messages" ON public.admin_messages FOR SELECT TO authenticated
  USING (recipient_user_id = auth.uid() OR recipient_role IN (SELECT role FROM public.user_roles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own messages" ON public.admin_messages FOR UPDATE TO authenticated
  USING (recipient_user_id = auth.uid() OR recipient_role IN (SELECT role FROM public.user_roles WHERE user_id = auth.uid()));

-- ============================================
-- 2. MESSAGE TEMPLATES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.message_templates (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  role TEXT,
  message_type TEXT NOT NULL DEFAULT 'general',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_message_templates_role ON public.message_templates(role);
CREATE INDEX IF NOT EXISTS idx_message_templates_active ON public.message_templates(is_active);

ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage templates" ON public.message_templates FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

-- Seed templates
INSERT INTO public.message_templates (name, subject, message, role, message_type)
VALUES 
  ('project_ready_for_planning', 'Your Project is Ready for the Next Step 🌱', 
   'Aloha {name},\n\nGreat news! We''ve reviewed your project questionnaire and you''re ready to move forward.\n\nLet''s onboard your project and create your Project Planning Documents. This next step will include:\n\n• Detailed project profile setup\n• Reactor/site and feedstock configuration\n• MRV sensor deployment planning\n• Baseline documentation preparation\n\nSchedule a call with our team to get started: {cal_link}\n\nWe''re excited to help bring your carbon removal project to life!\n\nAloha,\nThe Mālama Labs Team',
   'PROJECT_DEVELOPER', 'project_update'),
  
  ('first_credits_available', 'First Liquid Carbon Tokens Available for Purchase 🎯',
   'Aloha {name},\n\nExciting announcement! The first verified Liquid Carbon Tokens (LC02) are now available on our marketplace.\n\n**Available Credits:**\n• {credit_count} high-quality LC02 tokens\n• {methodologies} methodologies\n• Verified and ready for retirement\n\nLogin to review opportunities and secure your carbon credits:\n{marketplace_link}\n\nOur team is available to discuss portfolio strategy and volume pricing.\n\nAloha,\nMālama Labs Team',
   'CREDIT_BUYER', 'credit_availability'),
  
  ('api_sandbox_ready', 'Your API Sandbox is Ready 🚀',
   'Aloha {name},\n\nYour development environment is now live!\n\n**Your API Credentials:**\n• Environment: Sandbox\n• API Key: {api_key}\n• Documentation: {docs_link}\n\n**Quickstart Resources:**\n• Sample code and tutorials\n• Test data sets\n• Developer community access\n\nReady to build? Start here: {sandbox_link}\n\nQuestions? Join our developer Discord: {discord_link}\n\nHappy coding!\nMālama Labs Dev Team',
   'TECHNOLOGY_DEVELOPER', 'action_required'),
  
  ('welcome_message', 'Welcome to Mālama Labs! 🌺',
   'Aloha {name},\n\nWelcome to Mālama Labs! We''re thrilled to have you join our mission to scale durable carbon removal.\n\nYour account is set up and your personalized dashboard is ready. Here''s what you can do next:\n\n• Complete your profile\n• Review your personalized tasks\n• Schedule an intro call with our team\n• Explore our platform tools\n\nGet started: {dashboard_link}\n\nHave questions? We''re here to help: aloha@malamalabs.com\n\nMahalo,\nThe Mālama Labs Team',
   NULL, 'general')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 3. ADD ONBOARDING STATUS TO USER_ROLES
-- ============================================

ALTER TABLE public.user_roles
  ADD COLUMN IF NOT EXISTS onboarding_status TEXT DEFAULT 'questionnaire_complete';

ALTER TABLE public.user_roles
  DROP CONSTRAINT IF EXISTS valid_onboarding_status;

ALTER TABLE public.user_roles
  ADD CONSTRAINT valid_onboarding_status 
  CHECK (onboarding_status IN ('questionnaire_complete', 'pending_review', 'onboarding_active', 'project_live', 'active'));

UPDATE public.user_roles
SET onboarding_status = CASE
  WHEN questionnaire_completed = true THEN 'questionnaire_complete'
  ELSE 'pending_review'
END
WHERE onboarding_status IS NULL;

-- ============================================
-- 4. ADVISOR PROFILES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.advisor_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  full_name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  email TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  bio TEXT,
  expertise_areas TEXT[],
  
  -- Advisory Details
  advisory_preferences TEXT,
  meeting_frequency TEXT,
  compensation_type TEXT,
  
  -- Agreement Status
  nda_signed BOOLEAN DEFAULT false,
  nda_signed_at TIMESTAMPTZ,
  agreement_status TEXT DEFAULT 'pending',
  agreement_signed_at TIMESTAMPTZ,
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_completed_at TIMESTAMPTZ,
  profile_image_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_agreement_status CHECK (agreement_status IN ('pending', 'signed', 'active', 'inactive')),
  CONSTRAINT valid_compensation_type CHECK (compensation_type IN ('equity', 'cash', 'pro-bono', 'mixed', NULL)),
  CONSTRAINT valid_meeting_frequency CHECK (meeting_frequency IN ('weekly', 'bi-weekly', 'monthly', 'quarterly', 'as-needed', NULL))
);

CREATE INDEX IF NOT EXISTS idx_advisor_profiles_user_id ON public.advisor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_advisor_profiles_agreement_status ON public.advisor_profiles(agreement_status);
CREATE INDEX IF NOT EXISTS idx_advisor_profiles_expertise ON public.advisor_profiles USING GIN(expertise_areas);

ALTER TABLE public.advisor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Advisors can view own profile" ON public.advisor_profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Advisors can update own profile" ON public.advisor_profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Advisors can insert own profile" ON public.advisor_profiles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all advisor profiles" ON public.advisor_profiles FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update advisor profiles" ON public.advisor_profiles FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

-- ============================================
-- 5. INVESTOR PROFILES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.investor_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  full_name TEXT NOT NULL,
  entity_name TEXT,
  investor_type TEXT,
  email TEXT,
  phone TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  
  -- Investment Details
  investment_amount DECIMAL(15, 2),
  investment_date DATE,
  investment_round TEXT,
  investment_interest_range TEXT,
  portfolio_companies TEXT[],
  sector_focus TEXT[],
  
  -- Due Diligence
  accreditation_verified BOOLEAN DEFAULT false,
  accreditation_verified_at TIMESTAMPTZ,
  due_diligence_status TEXT DEFAULT 'pending',
  
  -- Agreements
  nda_signed BOOLEAN DEFAULT false,
  nda_signed_at TIMESTAMPTZ,
  investment_agreement_signed BOOLEAN DEFAULT false,
  investment_agreement_signed_at TIMESTAMPTZ,
  
  -- Access & Status
  data_room_access BOOLEAN DEFAULT false,
  data_room_access_granted_at TIMESTAMPTZ,
  status TEXT DEFAULT 'prospect',
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_completed_at TIMESTAMPTZ,
  profile_image_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_investor_type CHECK (investor_type IN ('angel', 'vc', 'strategic', 'institutional', 'family-office', 'individual', NULL)),
  CONSTRAINT valid_investor_status CHECK (status IN ('prospect', 'reviewing', 'interested', 'committed', 'invested', 'passed')),
  CONSTRAINT valid_due_diligence_status CHECK (due_diligence_status IN ('pending', 'in-progress', 'complete'))
);

CREATE INDEX IF NOT EXISTS idx_investor_profiles_user_id ON public.investor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_investor_profiles_status ON public.investor_profiles(status);
CREATE INDEX IF NOT EXISTS idx_investor_profiles_investor_type ON public.investor_profiles(investor_type);
CREATE INDEX IF NOT EXISTS idx_investor_profiles_sector_focus ON public.investor_profiles USING GIN(sector_focus);

ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Investors can view own profile" ON public.investor_profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Investors can update own profile" ON public.investor_profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Investors can insert own profile" ON public.investor_profiles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all investor profiles" ON public.investor_profiles FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update investor profiles" ON public.investor_profiles FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

-- ============================================
-- 6. ENHANCE USER_INVITES TABLE
-- ============================================

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

ALTER TABLE public.user_invites
  DROP CONSTRAINT IF EXISTS valid_invite_type;

ALTER TABLE public.user_invites
  ADD CONSTRAINT valid_invite_type 
  CHECK (invite_type IN ('user', 'advisor', 'investor'));

-- Generate tokens for existing invites
UPDATE public.user_invites
SET invite_token = encode(gen_random_bytes(32), 'hex'),
    token_expires_at = created_at + INTERVAL '30 days'
WHERE invite_token IS NULL;

CREATE INDEX IF NOT EXISTS idx_user_invites_token ON public.user_invites(invite_token);
CREATE INDEX IF NOT EXISTS idx_user_invites_type ON public.user_invites(invite_type);
CREATE INDEX IF NOT EXISTS idx_user_invites_campaign ON public.user_invites(source_campaign);

-- Token generation function
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

DROP TRIGGER IF EXISTS set_invite_token ON public.user_invites;
CREATE TRIGGER set_invite_token
  BEFORE INSERT ON public.user_invites
  FOR EACH ROW
  EXECUTE FUNCTION generate_invite_token();

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Mark message as read
CREATE OR REPLACE FUNCTION mark_message_read(message_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE public.admin_messages
  SET status = 'read',
      read_at = NOW(),
      updated_at = NOW()
  WHERE id = message_id AND status = 'sent';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Archive message
CREATE OR REPLACE FUNCTION archive_message(message_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE public.admin_messages
  SET status = 'archived',
      archived_at = NOW(),
      updated_at = NOW()
  WHERE id = message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Track invite opens
CREATE OR REPLACE FUNCTION track_invite_open(token TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.user_invites
  SET opened_at = NOW()
  WHERE invite_token = token AND opened_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Mark invite completed
CREATE OR REPLACE FUNCTION mark_invite_completed(token TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.user_invites
  SET status = 'accepted',
      completed_at = NOW(),
      accepted_at = NOW()
  WHERE invite_token = token AND status = 'pending';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
DECLARE
  messages_count INT;
  templates_count INT;
  advisors_count INT;
  investors_count INT;
BEGIN
  SELECT COUNT(*) INTO messages_count FROM public.admin_messages;
  SELECT COUNT(*) INTO templates_count FROM public.message_templates;
  SELECT COUNT(*) INTO advisors_count FROM public.advisor_profiles;
  SELECT COUNT(*) INTO investors_count FROM public.investor_profiles;
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '✅ MESSAGING SYSTEM MIGRATION COMPLETE!';
  RAISE NOTICE '✅ ============================================';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Tables Created:';
  RAISE NOTICE '   • admin_messages (% rows)', messages_count;
  RAISE NOTICE '   • message_templates (% rows)', templates_count;
  RAISE NOTICE '   • advisor_profiles (% rows)', advisors_count;
  RAISE NOTICE '   • investor_profiles (% rows)', investors_count;
  RAISE NOTICE '   • user_invites enhanced with tokens';
  RAISE NOTICE '   • user_roles enhanced with onboarding_status';
  RAISE NOTICE '';
  RAISE NOTICE '🔒 Security:';
  RAISE NOTICE '   • RLS policies enabled on all tables';
  RAISE NOTICE '   • Admin-only access to messages & templates';
  RAISE NOTICE '   • Users can view their own messages';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 Ready to use!';
  RAISE NOTICE '   • Admin: Go to /admin → Messages tab';
  RAISE NOTICE '   • Users: Messages appear in dashboard';
  RAISE NOTICE '';
END $$;


