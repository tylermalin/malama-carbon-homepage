-- ============================================
-- ONBOARDING V2: ROLE-BASED PROFILES & TASKS
-- ALL CHANGES ARE ADDITIVE (NON-DESTRUCTIVE)
-- ============================================

-- ======================
-- 1. PROFILES TABLE
-- ======================

CREATE TABLE IF NOT EXISTS public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('PROJECT_DEVELOPER', 'TECHNOLOGY_DEVELOPER', 'CREDIT_BUYER', 'PARTNER')),
  org_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- RLS Policies: Users can only access their own profile
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

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();

-- ======================
-- 2. TASK TEMPLATES
-- ======================

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

-- Make task_templates publicly readable (templates are not sensitive)
ALTER TABLE public.task_templates ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists (for idempotency)
DROP POLICY IF EXISTS "Task templates are publicly readable" ON public.task_templates;

CREATE POLICY "Task templates are publicly readable"
ON public.task_templates FOR SELECT
TO authenticated
USING (true);

-- ======================
-- 3. USER TASKS
-- ======================

CREATE TYPE task_status AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE', 'BLOCKED');

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

-- Enable RLS
ALTER TABLE public.user_tasks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view own tasks" ON public.user_tasks;
DROP POLICY IF EXISTS "Users can insert own tasks" ON public.user_tasks;
DROP POLICY IF EXISTS "Users can update own tasks" ON public.user_tasks;
DROP POLICY IF EXISTS "Users can delete own tasks" ON public.user_tasks;

-- RLS Policies: Users can only access their own tasks
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

CREATE POLICY "Users can delete own tasks"
ON public.user_tasks FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_user_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS user_tasks_updated_at ON public.user_tasks;
CREATE TRIGGER user_tasks_updated_at
  BEFORE UPDATE ON public.user_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_user_tasks_updated_at();

-- ======================
-- 4. ONBOARDING ANSWERS
-- ======================

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

-- Enable RLS
ALTER TABLE public.onboarding_answers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view own answers" ON public.onboarding_answers;
DROP POLICY IF EXISTS "Users can insert own answers" ON public.onboarding_answers;
DROP POLICY IF EXISTS "Users can update own answers" ON public.onboarding_answers;

-- RLS Policies: Users can only access their own answers
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

-- ======================
-- SUCCESS MESSAGE
-- ======================

DO $$
BEGIN
  RAISE NOTICE '✅ Onboarding V2 tables created successfully!';
  RAISE NOTICE '   - profiles (with RLS)';
  RAISE NOTICE '   - task_templates (with RLS)';
  RAISE NOTICE '   - user_tasks (with RLS + status enum)';
  RAISE NOTICE '   - onboarding_answers (with RLS)';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  Next step: Run 008_seed_task_templates.sql to populate templates';
END $$;

