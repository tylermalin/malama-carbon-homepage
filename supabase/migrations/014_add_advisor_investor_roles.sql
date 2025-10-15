-- ============================================
-- ADD ADVISOR AND INVESTOR ROLES
-- Extend onboarding system for advisors and investors
-- ============================================

-- Add onboarding_status to user_roles table
ALTER TABLE public.user_roles
  ADD COLUMN IF NOT EXISTS onboarding_status TEXT DEFAULT 'questionnaire_complete';

-- Check constraint for onboarding_status
ALTER TABLE public.user_roles
  DROP CONSTRAINT IF EXISTS valid_onboarding_status;

ALTER TABLE public.user_roles
  ADD CONSTRAINT valid_onboarding_status 
  CHECK (onboarding_status IN (
    'questionnaire_complete',
    'pending_review',
    'onboarding_active',
    'project_live',
    'active'
  ));

-- Update existing records to have a status
UPDATE public.user_roles
SET onboarding_status = CASE
  WHEN questionnaire_completed = true THEN 'questionnaire_complete'
  ELSE 'pending_review'
END
WHERE onboarding_status IS NULL;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Advisor and Investor roles support added!';
  RAISE NOTICE '   - Added onboarding_status field to user_roles';
  RAISE NOTICE '   - Status values: questionnaire_complete, pending_review, onboarding_active, project_live, active';
END $$;


