-- ============================================
-- COMPREHENSIVE ANALYTICS & DATA TRACKING
-- Malama Labs Website - All User Interactions
-- ============================================

-- ============================================
-- 1. PRESENTATION CLICK TRACKING
-- ============================================
CREATE TABLE IF NOT EXISTS presentation_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deck_key TEXT NOT NULL CHECK (deck_key IN ('SAFE_ROUND', 'BUYERS', 'PROJECTS')),
  referral_code TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_agent TEXT,
  extra JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS presentation_clicks_deck_key_idx ON presentation_clicks(deck_key);
CREATE INDEX IF NOT EXISTS presentation_clicks_referral_code_idx ON presentation_clicks(referral_code) WHERE referral_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS presentation_clicks_user_id_idx ON presentation_clicks(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS presentation_clicks_created_at_idx ON presentation_clicks(created_at DESC);

ALTER TABLE presentation_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on presentation_clicks" ON presentation_clicks
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated read on presentation_clicks" ON presentation_clicks
  FOR SELECT TO authenticated USING (true);

COMMENT ON TABLE presentation_clicks IS 'Tracks clicks on presentation deck cards from the presentations hub';


-- ============================================
-- 2. SLIDE VIEW TRACKING (Presentation Analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS slide_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  deck_key TEXT NOT NULL CHECK (deck_key IN ('SAFE_ROUND', 'BUYERS', 'PROJECTS')),
  slide_number INTEGER NOT NULL,
  slide_title TEXT,
  referral_code TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT, -- For tracking unique viewing sessions
  time_on_slide INTEGER, -- Seconds spent on slide
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS slide_views_deck_key_idx ON slide_views(deck_key);
CREATE INDEX IF NOT EXISTS slide_views_slide_number_idx ON slide_views(slide_number);
CREATE INDEX IF NOT EXISTS slide_views_session_id_idx ON slide_views(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS slide_views_created_at_idx ON slide_views(created_at DESC);

ALTER TABLE slide_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on slide_views" ON slide_views
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated read on slide_views" ON slide_views
  FOR SELECT TO authenticated USING (true);

COMMENT ON TABLE slide_views IS 'Tracks individual slide views within presentations for engagement analytics';


-- ============================================
-- 3. PAGE VIEW TRACKING
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referral_code TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS page_views_page_name_idx ON page_views(page_name);
CREATE INDEX IF NOT EXISTS page_views_page_path_idx ON page_views(page_path);
CREATE INDEX IF NOT EXISTS page_views_user_id_idx ON page_views(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS page_views_session_id_idx ON page_views(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views(created_at DESC);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on page_views" ON page_views
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated read on page_views" ON page_views
  FOR SELECT TO authenticated USING (true);

COMMENT ON TABLE page_views IS 'Tracks page views across the entire website for analytics';


-- ============================================
-- 4. CTA BUTTON CLICKS
-- ============================================
CREATE TABLE IF NOT EXISTS cta_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  button_label TEXT NOT NULL,
  button_location TEXT NOT NULL, -- e.g., 'hero', 'footer', 'pricing'
  page_name TEXT NOT NULL,
  destination TEXT, -- Where the button leads
  referral_code TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS cta_clicks_button_label_idx ON cta_clicks(button_label);
CREATE INDEX IF NOT EXISTS cta_clicks_page_name_idx ON cta_clicks(page_name);
CREATE INDEX IF NOT EXISTS cta_clicks_user_id_idx ON cta_clicks(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS cta_clicks_created_at_idx ON cta_clicks(created_at DESC);

ALTER TABLE cta_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on cta_clicks" ON cta_clicks
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated read on cta_clicks" ON cta_clicks
  FOR SELECT TO authenticated USING (true);

COMMENT ON TABLE cta_clicks IS 'Tracks CTA button clicks for conversion optimization';


-- ============================================
-- 5. USER ONBOARDING SUBMISSIONS (Get Started)
-- ============================================
CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('steward', 'developer', 'buyer', 'partner')),
  
  -- Form data stored as JSONB for flexibility
  form_data JSONB NOT NULL,
  
  -- Metadata
  referral_code TEXT,
  user_agent TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Status tracking
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS onboarding_submissions_user_id_idx ON onboarding_submissions(user_id);
CREATE INDEX IF NOT EXISTS onboarding_submissions_user_type_idx ON onboarding_submissions(user_type);
CREATE INDEX IF NOT EXISTS onboarding_submissions_status_idx ON onboarding_submissions(status);
CREATE INDEX IF NOT EXISTS onboarding_submissions_completed_at_idx ON onboarding_submissions(completed_at DESC);

ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own onboarding" ON onboarding_submissions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own onboarding" ON onboarding_submissions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all onboarding" ON onboarding_submissions
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
  );

COMMENT ON TABLE onboarding_submissions IS 'Stores Get Started form submissions for all user types';


-- ============================================
-- 6. ADVISORY BOARD APPLICATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS advisory_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  linkedin TEXT,
  
  -- Background
  current_title TEXT,
  current_company TEXT,
  years_experience TEXT,
  expertise TEXT[], -- Array of expertise areas
  advisory_experience TEXT,
  current_roles TEXT,
  
  -- Expertise Details
  primary_expertise TEXT,
  how_can_help TEXT,
  why_interested TEXT,
  achievements TEXT,
  
  -- Network
  investor_intros TEXT,
  corporate_intros TEXT,
  developer_intros TEXT,
  network_description TEXT,
  
  -- Details
  time_commitment TEXT,
  equity_expectation TEXT,
  cash_expectation TEXT,
  start_date TEXT,
  heard_about TEXT,
  resume_url TEXT,
  additional_info TEXT,
  
  -- Metadata
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected', 'onboarded')),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS advisory_applications_email_idx ON advisory_applications(email);
CREATE INDEX IF NOT EXISTS advisory_applications_status_idx ON advisory_applications(status);
CREATE INDEX IF NOT EXISTS advisory_applications_created_at_idx ON advisory_applications(created_at DESC);

ALTER TABLE advisory_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on advisory_applications" ON advisory_applications
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated read on advisory_applications" ON advisory_applications
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
  );

COMMENT ON TABLE advisory_applications IS 'Stores applications for the Advisory Board';


-- ============================================
-- 7. USER PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Project Info
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  project_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'Planning' CHECK (status IN ('Planning', 'Active', 'Completed', 'On Hold')),
  
  -- Metrics
  carbon_sequestered NUMERIC DEFAULT 0,
  sensors_deployed INTEGER DEFAULT 0,
  biochars_produced INTEGER DEFAULT 0,
  credits_issued INTEGER DEFAULT 0,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  
  -- Dates
  start_date DATE,
  last_updated DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS projects_user_id_idx ON projects(user_id);
CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);
CREATE INDEX IF NOT EXISTS projects_project_type_idx ON projects(project_type);
CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects(created_at DESC);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own projects" ON projects
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all projects" ON projects
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
  );

COMMENT ON TABLE projects IS 'User-created carbon projects with tracking metrics';


-- ============================================
-- 8. USER PROFILES (Extended)
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Profile Info
  full_name TEXT NOT NULL,
  company_name TEXT,
  profile_types TEXT[] DEFAULT '{}', -- e.g., ['Project Developer', 'Carbon Credit Buyer']
  industry TEXT,
  phone TEXT,
  address TEXT,
  website TEXT,
  profile_image_url TEXT,
  
  -- Preferences
  newsletter_subscribed BOOLEAN DEFAULT false,
  marketing_emails BOOLEAN DEFAULT false,
  
  -- Metadata
  registration_date DATE DEFAULT CURRENT_DATE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS user_profiles_user_id_idx ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS user_profiles_company_name_idx ON user_profiles(company_name) WHERE company_name IS NOT NULL;

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

COMMENT ON TABLE user_profiles IS 'Extended user profile information';


-- ============================================
-- 9. FORM ABANDONMENT TRACKING
-- ============================================
CREATE TABLE IF NOT EXISTS form_abandonments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL, -- e.g., 'contact', 'onboarding_steward', 'advisory'
  step_number INTEGER,
  step_name TEXT,
  completed_fields JSONB, -- Which fields were filled
  session_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS form_abandonments_form_type_idx ON form_abandonments(form_type);
CREATE INDEX IF NOT EXISTS form_abandonments_session_id_idx ON form_abandonments(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS form_abandonments_created_at_idx ON form_abandonments(created_at DESC);

ALTER TABLE form_abandonments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on form_abandonments" ON form_abandonments
  FOR INSERT TO anon, authenticated WITH CHECK (true);

COMMENT ON TABLE form_abandonments IS 'Tracks where users abandon forms to optimize conversion';


-- ============================================
-- 10. ERROR TRACKING
-- ============================================
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  error_type TEXT NOT NULL, -- e.g., 'api_error', 'validation_error', 'network_error'
  error_message TEXT NOT NULL,
  error_stack TEXT,
  page_name TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_agent TEXT,
  extra_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS error_logs_error_type_idx ON error_logs(error_type);
CREATE INDEX IF NOT EXISTS error_logs_page_name_idx ON error_logs(page_name) WHERE page_name IS NOT NULL;
CREATE INDEX IF NOT EXISTS error_logs_created_at_idx ON error_logs(created_at DESC);

ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on error_logs" ON error_logs
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated read on error_logs" ON error_logs
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
  );

COMMENT ON TABLE error_logs IS 'Tracks client-side errors for debugging and monitoring';


-- ============================================
-- ANALYTICS VIEWS (For Easy Reporting)
-- ============================================

-- Presentation funnel metrics
CREATE OR REPLACE VIEW presentation_funnel AS
SELECT 
  deck_key,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) as total_slides_viewed,
  AVG(time_on_slide) as avg_time_per_slide,
  MAX(slide_number) as max_slide_reached,
  DATE(created_at) as view_date
FROM slide_views
GROUP BY deck_key, DATE(created_at);

-- Daily active users
CREATE OR REPLACE VIEW daily_active_users AS
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT COALESCE(user_id::text, session_id)) as dau
FROM page_views
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Top converting CTAs
CREATE OR REPLACE VIEW top_ctas AS
SELECT 
  button_label,
  button_location,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT COALESCE(user_id::text, session_id)) as unique_users,
  DATE(created_at) as click_date
FROM cta_clicks
GROUP BY button_label, button_location, DATE(created_at)
ORDER BY total_clicks DESC;

-- Referral performance
CREATE OR REPLACE VIEW referral_performance AS
SELECT 
  referral_code,
  COUNT(DISTINCT COALESCE(user_id::text, session_id)) as unique_visitors,
  COUNT(*) as total_interactions,
  COUNT(CASE WHEN deck_key IS NOT NULL THEN 1 END) as presentation_opens
FROM (
  SELECT referral_code, user_id, session_id, deck_key FROM presentation_clicks
  UNION ALL
  SELECT referral_code, user_id, session_id, NULL::text as deck_key FROM page_views
) combined
WHERE referral_code IS NOT NULL
GROUP BY referral_code
ORDER BY unique_visitors DESC;


-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Malama Labs Analytics Schema Created Successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Tables Created:';
  RAISE NOTICE '  1. presentation_clicks - Presentation deck click tracking';
  RAISE NOTICE '  2. slide_views - Individual slide view analytics';
  RAISE NOTICE '  3. page_views - Website page view tracking';
  RAISE NOTICE '  4. cta_clicks - CTA button click tracking';
  RAISE NOTICE '  5. onboarding_submissions - Get Started form submissions';
  RAISE NOTICE '  6. advisory_applications - Advisory Board applications';
  RAISE NOTICE '  7. projects - User carbon projects';
  RAISE NOTICE '  8. user_profiles - Extended user profiles';
  RAISE NOTICE '  9. form_abandonments - Form abandonment tracking';
  RAISE NOTICE '  10. error_logs - Client-side error tracking';
  RAISE NOTICE '';
  RAISE NOTICE '📈 Analytics Views:';
  RAISE NOTICE '  - presentation_funnel';
  RAISE NOTICE '  - daily_active_users';
  RAISE NOTICE '  - top_ctas';
  RAISE NOTICE '  - referral_performance';
  RAISE NOTICE '';
  RAISE NOTICE '🔒 All tables have RLS enabled with appropriate policies';
  RAISE NOTICE '📇 All tables have optimized indexes for performance';
END $$;

