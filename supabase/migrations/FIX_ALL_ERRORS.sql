-- ================================================================
-- COMPREHENSIVE FIX FOR ALL DATABASE ERRORS
-- Run this in Supabase SQL Editor to fix all 404/403 errors
-- Safe to run multiple times (idempotent)
-- ================================================================

-- ==================
-- 1. CREATE ONBOARDING V2 TABLES
-- ==================

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  org_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop and recreate RLS policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- TASK TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS public.task_templates (
  id BIGSERIAL PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  title TEXT NOT NULL,
  description TEXT,
  required BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (role, title)
);

CREATE INDEX IF NOT EXISTS idx_task_templates_role ON public.task_templates(role);
ALTER TABLE public.task_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Task templates are publicly readable" ON public.task_templates;
CREATE POLICY "Task templates are publicly readable" 
ON public.task_templates FOR SELECT 
TO authenticated 
USING (true);

-- USER TASKS TABLE
CREATE TABLE IF NOT EXISTS public.user_tasks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id BIGINT REFERENCES public.task_templates(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'DONE', 'BLOCKED')),
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_tasks_user_id ON public.user_tasks(user_id);
ALTER TABLE public.user_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own tasks" ON public.user_tasks;
DROP POLICY IF EXISTS "Users can insert own tasks" ON public.user_tasks;
DROP POLICY IF EXISTS "Users can update own tasks" ON public.user_tasks;

CREATE POLICY "Users can view own tasks" 
ON public.user_tasks FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" 
ON public.user_tasks FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" 
ON public.user_tasks FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- ONBOARDING ANSWERS TABLE
CREATE TABLE IF NOT EXISTS public.onboarding_answers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  question_key TEXT NOT NULL,
  answer JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, question_key)
);

CREATE INDEX IF NOT EXISTS idx_onboarding_answers_user_id ON public.onboarding_answers(user_id);
ALTER TABLE public.onboarding_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own answers" ON public.onboarding_answers;
DROP POLICY IF EXISTS "Users can insert own answers" ON public.onboarding_answers;
DROP POLICY IF EXISTS "Users can update own answers" ON public.onboarding_answers;

CREATE POLICY "Users can view own answers" 
ON public.onboarding_answers FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own answers" 
ON public.onboarding_answers FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own answers" 
ON public.onboarding_answers FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- ==================
-- 2. SEED TASK TEMPLATES
-- ==================

INSERT INTO public.task_templates (role, title, description, required, sort_order)
VALUES
('PROJECT_DEVELOPER', 'Complete Project Developer Profile', 'Provide detailed information about your project and organization.', TRUE, 10),
('PROJECT_DEVELOPER', 'Submit Project Proposal', 'Outline your carbon removal project for review.', TRUE, 20),
('PROJECT_DEVELOPER', 'Deploy dMRV Sensors', 'Integrate monitoring, reporting, and verification hardware.', TRUE, 30),
('PROJECT_DEVELOPER', 'Connect to Carbon Credit Protocol', 'Select and integrate with a verified carbon credit methodology.', TRUE, 40),
('PROJECT_DEVELOPER', 'Launch First Carbon Credit Issuance', 'Issue your first batch of verifiable carbon credits on-chain.', TRUE, 50),
('TECHNOLOGY_DEVELOPER', 'Complete Technology Developer Profile', 'Share your expertise and areas of interest for collaboration.', TRUE, 10),
('TECHNOLOGY_DEVELOPER', 'Explore API Documentation', 'Familiarize yourself with Mālama Labs API endpoints and capabilities.', TRUE, 20),
('TECHNOLOGY_DEVELOPER', 'Build Sandbox Integration', 'Develop and test your first integration in a secure environment.', TRUE, 30),
('TECHNOLOGY_DEVELOPER', 'Submit Integration for Review', 'Get your dMRV or other tech integration reviewed by our team.', TRUE, 40),
('TECHNOLOGY_DEVELOPER', 'Join Developer Community', 'Connect with other builders and contribute to open-source initiatives.', FALSE, 50),
('CREDIT_BUYER', 'Complete Credit Buyer Profile', 'Specify your carbon credit needs and sustainability goals.', TRUE, 10),
('CREDIT_BUYER', 'Explore Carbon Credit Marketplace', 'Browse available carbon removal credits by methodology and price.', TRUE, 20),
('CREDIT_BUYER', 'Make First Carbon Credit Purchase', 'Acquire verified carbon credits to offset your emissions.', TRUE, 30),
('CREDIT_BUYER', 'Set Up Portfolio Tracking', 'Monitor your carbon credit assets and their impact over time.', TRUE, 40),
('CREDIT_BUYER', 'Generate Impact Report', 'Create reports to showcase your climate contributions.', FALSE, 50),
('PARTNER', 'Complete Partner Profile', 'Detail your organization''s mission and collaboration interests.', TRUE, 10),
('PARTNER', 'Schedule Introductory Call', 'Connect with our partnership team to discuss potential synergies.', TRUE, 20),
('PARTNER', 'Propose Joint Initiative', 'Outline a collaborative project or program with Mālama Labs.', TRUE, 30),
('PARTNER', 'Access Partner Resources', 'Utilize shared tools, data, and marketing materials.', FALSE, 40),
('PARTNER', 'Participate in Ecosystem Event', 'Join webinars, workshops, or conferences with our network.', FALSE, 50)
ON CONFLICT (role, title) DO NOTHING;

-- ==================
-- 3. CREATE ANALYTICS TABLES (if needed)
-- ==================

-- Create analytics_events table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  session_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code TEXT,
  page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_referral ON public.analytics_events(referral_code);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);

-- Create page_views table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.page_views (
  id BIGSERIAL PRIMARY KEY,
  page_url TEXT NOT NULL,
  session_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_page_url ON public.page_views(page_url);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at);

-- ==================
-- 4. CREATE REFERRAL PERFORMANCE VIEW (for analytics)
-- ==================

CREATE OR REPLACE VIEW public.referral_performance AS
SELECT 
  referral_code,
  COUNT(DISTINCT session_id) as unique_visitors,
  COUNT(*) as total_interactions,
  SUM(CASE WHEN event_type = 'presentation_open' THEN 1 ELSE 0 END) as presentation_opens
FROM public.analytics_events
WHERE referral_code IS NOT NULL
GROUP BY referral_code
ORDER BY total_interactions DESC;

-- ==================
-- 5. CREATE GET_TOP_PAGES FUNCTION (for analytics)
-- ==================

CREATE OR REPLACE FUNCTION public.get_top_pages(days_ago INT DEFAULT 30, page_limit INT DEFAULT 10)
RETURNS TABLE (
  page_name TEXT,
  view_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    page_url as page_name,
    COUNT(*)::BIGINT as view_count
  FROM public.page_views
  WHERE created_at >= NOW() - (days_ago || ' days')::INTERVAL
  GROUP BY page_url
  ORDER BY view_count DESC
  LIMIT page_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_top_pages(INT, INT) TO authenticated;

-- ==================
-- SUCCESS MESSAGE
-- ==================

DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'SUCCESS! All tables and functions created.';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables created:';
  RAISE NOTICE '  ✅ profiles';
  RAISE NOTICE '  ✅ task_templates (with %s rows)', (SELECT COUNT(*) FROM public.task_templates);
  RAISE NOTICE '  ✅ user_tasks';
  RAISE NOTICE '  ✅ onboarding_answers';
  RAISE NOTICE '';
  RAISE NOTICE 'Views/Functions created:';
  RAISE NOTICE '  ✅ referral_performance view';
  RAISE NOTICE '  ✅ get_top_pages() function';
  RAISE NOTICE '';
  RAISE NOTICE 'All RLS policies configured ✓';
  RAISE NOTICE '';
  RAISE NOTICE 'You can now complete onboarding!';
  RAISE NOTICE '========================================';
END $$;

