-- ONBOARDING V2: FIXED - Truly Idempotent Version
-- Safe to run multiple times

-- ==================
-- 1. PROFILES TABLE
-- ==================
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

-- Drop existing policies first (if they exist)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ==================
-- 2. TASK TEMPLATES
-- ==================
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
CREATE POLICY "Task templates are publicly readable" ON public.task_templates FOR SELECT TO authenticated USING (true);

-- ==================
-- 3. USER TASKS
-- ==================
DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE', 'BLOCKED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.user_tasks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id BIGINT REFERENCES public.task_templates(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'PENDING',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_tasks_user_id ON public.user_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tasks_status ON public.user_tasks(status);
ALTER TABLE public.user_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own tasks" ON public.user_tasks;
DROP POLICY IF EXISTS "Users can insert own tasks" ON public.user_tasks;
DROP POLICY IF EXISTS "Users can update own tasks" ON public.user_tasks;
DROP POLICY IF EXISTS "Users can delete own tasks" ON public.user_tasks;

CREATE POLICY "Users can view own tasks" ON public.user_tasks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON public.user_tasks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON public.user_tasks FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks" ON public.user_tasks FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ==================
-- 4. ONBOARDING ANSWERS
-- ==================
CREATE TABLE IF NOT EXISTS public.onboarding_answers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  question_key TEXT NOT NULL,
  answer JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role, question_key)
);

CREATE INDEX IF NOT EXISTS idx_onboarding_answers_user_id ON public.onboarding_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_answers_role ON public.onboarding_answers(role);
ALTER TABLE public.onboarding_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own answers" ON public.onboarding_answers;
DROP POLICY IF EXISTS "Users can insert own answers" ON public.onboarding_answers;
DROP POLICY IF EXISTS "Users can update own answers" ON public.onboarding_answers;

CREATE POLICY "Users can view own answers" ON public.onboarding_answers FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own answers" ON public.onboarding_answers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own answers" ON public.onboarding_answers FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ==================
-- 5. SEED TASK TEMPLATES (Idempotent)
-- ==================
INSERT INTO public.task_templates (role, title, description, required, sort_order) VALUES
('PROJECT_DEVELOPER', 'Create Project Profile', 'Complete your project details including location, biomass types, and land information', true, 1),
('PROJECT_DEVELOPER', 'Add Reactor/Site & Feedstock', 'Register your biochar production equipment and specify your feedstock sources', true, 2),
('PROJECT_DEVELOPER', 'Connect Sensors/Mobile Capture', 'Set up MRV sensors or mobile data capture for monitoring', true, 3),
('PROJECT_DEVELOPER', 'Upload Baseline & Ops Docs', 'Provide documentation for baseline measurements and operational procedures', true, 4),
('PROJECT_DEVELOPER', 'Schedule Kickoff Call', 'Book a call with our team to finalize project setup and timeline', true, 5),
('TECHNOLOGY_DEVELOPER', 'Request API Credentials', 'Get your API keys and access tokens for development', true, 1),
('TECHNOLOGY_DEVELOPER', 'Review Docs & Quickstart', 'Read through API documentation and complete the quickstart tutorial', true, 2),
('TECHNOLOGY_DEVELOPER', 'Spin Up Sandbox/Testnet', 'Initialize your development environment with test data', true, 3),
('TECHNOLOGY_DEVELOPER', 'Post Hello in Dev Community', 'Introduce yourself and your project in our developer Discord/forum', false, 4),
('TECHNOLOGY_DEVELOPER', 'Schedule Integration Review', 'Book a technical review call to discuss your integration approach', true, 5),
('CREDIT_BUYER', 'Complete Buyer Profile', 'Provide organization details, volume targets, and purchasing preferences', true, 1),
('CREDIT_BUYER', 'Browse Verified Listings', 'Explore available carbon removal credits matching your criteria', true, 2),
('CREDIT_BUYER', 'Request Diligence Packet', 'Download project documentation and verification reports', false, 3),
('CREDIT_BUYER', 'Build a Portfolio Plan', 'Work with our team to design a diversified credit portfolio', true, 4),
('CREDIT_BUYER', 'Schedule Procurement Call', 'Book a call to finalize purchasing terms and logistics', true, 5),
('PARTNER', 'Describe Partnership Goals', 'Share your objectives for collaboration (research, training, policy, etc.)', true, 1),
('PARTNER', 'Share Organization Profile', 'Provide details about your organization and relevant expertise', true, 2),
('PARTNER', 'Explore Funding/Grants', 'Review potential funding opportunities and grant programs', false, 3),
('PARTNER', 'Select Pilot Project', 'Identify a specific pilot or initiative for collaboration', true, 4),
('PARTNER', 'Schedule Strategy Session', 'Book a call to align on partnership structure and next steps', true, 5)
ON CONFLICT (role, title) DO NOTHING;

