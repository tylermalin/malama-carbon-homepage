-- ============================================
-- INVESTOR PROFILES TABLE
-- Store investor-specific information
-- ============================================

CREATE TABLE IF NOT EXISTS public.investor_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  full_name TEXT NOT NULL,
  entity_name TEXT, -- Individual name or company/fund name
  investor_type TEXT, -- angel, vc, strategic, institutional
  
  -- Contact Info
  email TEXT,
  phone TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  
  -- Investment Details
  investment_amount DECIMAL(15, 2),
  investment_date DATE,
  investment_round TEXT, -- seed, series-a, etc.
  investment_interest_range TEXT, -- For potential investors
  
  -- Background
  portfolio_companies TEXT[], -- Array of company names
  sector_focus TEXT[], -- climate-tech, carbon-markets, etc.
  
  -- Due Diligence
  accreditation_verified BOOLEAN DEFAULT false,
  accreditation_verified_at TIMESTAMPTZ,
  due_diligence_status TEXT DEFAULT 'pending', -- pending, in-progress, complete
  
  -- Agreements
  nda_signed BOOLEAN DEFAULT false,
  nda_signed_at TIMESTAMPTZ,
  investment_agreement_signed BOOLEAN DEFAULT false,
  investment_agreement_signed_at TIMESTAMPTZ,
  
  -- Access & Status
  data_room_access BOOLEAN DEFAULT false,
  data_room_access_granted_at TIMESTAMPTZ,
  status TEXT DEFAULT 'prospect', -- prospect, reviewing, committed, invested, passed
  
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
CREATE INDEX IF NOT EXISTS idx_investor_profiles_user_id 
  ON public.investor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_investor_profiles_status 
  ON public.investor_profiles(status);
CREATE INDEX IF NOT EXISTS idx_investor_profiles_investor_type 
  ON public.investor_profiles(investor_type);
CREATE INDEX IF NOT EXISTS idx_investor_profiles_sector_focus 
  ON public.investor_profiles USING GIN(sector_focus);

-- Check constraints
ALTER TABLE public.investor_profiles
  ADD CONSTRAINT valid_investor_type 
  CHECK (investor_type IN ('angel', 'vc', 'strategic', 'institutional', 'family-office', 'individual', NULL));

ALTER TABLE public.investor_profiles
  ADD CONSTRAINT valid_status 
  CHECK (status IN ('prospect', 'reviewing', 'interested', 'committed', 'invested', 'passed'));

ALTER TABLE public.investor_profiles
  ADD CONSTRAINT valid_due_diligence_status 
  CHECK (due_diligence_status IN ('pending', 'in-progress', 'complete'));

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;

-- Investors can view and update their own profile
CREATE POLICY "Investors can view own profile"
  ON public.investor_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Investors can update own profile"
  ON public.investor_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Investors can insert their own profile
CREATE POLICY "Investors can insert own profile"
  ON public.investor_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Admins can see all investor profiles
CREATE POLICY "Admins can view all investor profiles"
  ON public.investor_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Admins can update investor profiles
CREATE POLICY "Admins can update investor profiles"
  ON public.investor_profiles
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
  RAISE NOTICE '✅ Investor profiles table created!';
  RAISE NOTICE '   - Table: investor_profiles';
  RAISE NOTICE '   - RLS policies enabled';
END $$;


