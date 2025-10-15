-- ============================================
-- ADVISOR PROFILES TABLE
-- Store advisor-specific information
-- ============================================

CREATE TABLE IF NOT EXISTS public.advisor_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  full_name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  
  -- Contact & Social
  email TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  
  -- Professional Background
  bio TEXT,
  expertise_areas TEXT[], -- Array of expertise tags
  
  -- Advisory Details
  advisory_preferences TEXT, -- meeting frequency, compensation type
  meeting_frequency TEXT, -- monthly, quarterly, as-needed
  compensation_type TEXT, -- equity, cash, pro-bono
  
  -- Agreement Status
  nda_signed BOOLEAN DEFAULT false,
  nda_signed_at TIMESTAMPTZ,
  agreement_status TEXT DEFAULT 'pending', -- pending, signed, active, inactive
  agreement_signed_at TIMESTAMPTZ,
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_completed_at TIMESTAMPTZ,
  
  -- Profile
  profile_image_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Ensure one profile per user
  UNIQUE(user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_advisor_profiles_user_id 
  ON public.advisor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_advisor_profiles_agreement_status 
  ON public.advisor_profiles(agreement_status);
CREATE INDEX IF NOT EXISTS idx_advisor_profiles_expertise 
  ON public.advisor_profiles USING GIN(expertise_areas);

-- Check constraints
ALTER TABLE public.advisor_profiles
  ADD CONSTRAINT valid_agreement_status 
  CHECK (agreement_status IN ('pending', 'signed', 'active', 'inactive'));

ALTER TABLE public.advisor_profiles
  ADD CONSTRAINT valid_compensation_type 
  CHECK (compensation_type IN ('equity', 'cash', 'pro-bono', 'mixed', NULL));

ALTER TABLE public.advisor_profiles
  ADD CONSTRAINT valid_meeting_frequency 
  CHECK (meeting_frequency IN ('weekly', 'bi-weekly', 'monthly', 'quarterly', 'as-needed', NULL));

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE public.advisor_profiles ENABLE ROW LEVEL SECURITY;

-- Advisors can view and update their own profile
CREATE POLICY "Advisors can view own profile"
  ON public.advisor_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Advisors can update own profile"
  ON public.advisor_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Advisors can insert their own profile
CREATE POLICY "Advisors can insert own profile"
  ON public.advisor_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Admins can see all advisor profiles
CREATE POLICY "Admins can view all advisor profiles"
  ON public.advisor_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Admins can update advisor profiles
CREATE POLICY "Admins can update advisor profiles"
  ON public.advisor_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Advisor profiles table created!';
  RAISE NOTICE '   - Table: advisor_profiles';
  RAISE NOTICE '   - RLS policies enabled';
END $$;


