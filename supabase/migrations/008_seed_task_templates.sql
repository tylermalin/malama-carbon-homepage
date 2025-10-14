-- ============================================
-- SEED TASK TEMPLATES (IDEMPOTENT)
-- Uses ON CONFLICT DO NOTHING for safety
-- ============================================

-- ======================
-- PROJECT DEVELOPER TASKS
-- ======================

INSERT INTO public.task_templates (role, title, description, required, sort_order)
VALUES 
  ('PROJECT_DEVELOPER', 'Create Project Profile', 'Complete your project details including location, biomass types, and land information', true, 1),
  ('PROJECT_DEVELOPER', 'Add Reactor/Site & Feedstock', 'Register your biochar production equipment and specify your feedstock sources', true, 2),
  ('PROJECT_DEVELOPER', 'Connect Sensors/Mobile Capture', 'Set up MRV sensors or mobile data capture for monitoring', true, 3),
  ('PROJECT_DEVELOPER', 'Upload Baseline & Ops Docs', 'Provide documentation for baseline measurements and operational procedures', true, 4),
  ('PROJECT_DEVELOPER', 'Schedule Kickoff Call', 'Book a call with our team to finalize project setup and timeline', true, 5)
ON CONFLICT (role, title) DO NOTHING;

-- ======================
-- TECHNOLOGY DEVELOPER TASKS
-- ======================

INSERT INTO public.task_templates (role, title, description, required, sort_order)
VALUES
  ('TECHNOLOGY_DEVELOPER', 'Request API Credentials', 'Get your API keys and access tokens for development', true, 1),
  ('TECHNOLOGY_DEVELOPER', 'Review Docs & Quickstart', 'Read through API documentation and complete the quickstart tutorial', true, 2),
  ('TECHNOLOGY_DEVELOPER', 'Spin Up Sandbox/Testnet', 'Initialize your development environment with test data', true, 3),
  ('TECHNOLOGY_DEVELOPER', 'Post Hello in Dev Community', 'Introduce yourself and your project in our developer Discord/forum', false, 4),
  ('TECHNOLOGY_DEVELOPER', 'Schedule Integration Review', 'Book a technical review call to discuss your integration approach', true, 5)
ON CONFLICT (role, title) DO NOTHING;

-- ======================
-- CREDIT BUYER TASKS
-- ======================

INSERT INTO public.task_templates (role, title, description, required, sort_order)
VALUES
  ('CREDIT_BUYER', 'Complete Buyer Profile', 'Provide organization details, volume targets, and purchasing preferences', true, 1),
  ('CREDIT_BUYER', 'Browse Verified Listings', 'Explore available carbon removal credits matching your criteria', true, 2),
  ('CREDIT_BUYER', 'Request Diligence Packet', 'Download project documentation and verification reports', false, 3),
  ('CREDIT_BUYER', 'Build a Portfolio Plan', 'Work with our team to design a diversified credit portfolio', true, 4),
  ('CREDIT_BUYER', 'Schedule Procurement Call', 'Book a call to finalize purchasing terms and logistics', true, 5)
ON CONFLICT (role, title) DO NOTHING;

-- ======================
-- PARTNER TASKS
-- ======================

INSERT INTO public.task_templates (role, title, description, required, sort_order)
VALUES
  ('PARTNER', 'Describe Partnership Goals', 'Share your objectives for collaboration (research, training, policy, etc.)', true, 1),
  ('PARTNER', 'Share Organization Profile', 'Provide details about your organization and relevant expertise', true, 2),
  ('PARTNER', 'Explore Funding/Grants', 'Review potential funding opportunities and grant programs', false, 3),
  ('PARTNER', 'Select Pilot Project', 'Identify a specific pilot or initiative for collaboration', true, 4),
  ('PARTNER', 'Schedule Strategy Session', 'Book a call to align on partnership structure and next steps', true, 5)
ON CONFLICT (role, title) DO NOTHING;

-- ======================
-- SUCCESS MESSAGE
-- ======================

DO $$
DECLARE
  template_count INT;
BEGIN
  SELECT COUNT(*) INTO template_count FROM public.task_templates;
  
  RAISE NOTICE '✅ Task templates seeded successfully!';
  RAISE NOTICE '   Total templates: %', template_count;
  RAISE NOTICE '   - PROJECT_DEVELOPER: 5 tasks';
  RAISE NOTICE '   - TECHNOLOGY_DEVELOPER: 5 tasks';
  RAISE NOTICE '   - CREDIT_BUYER: 5 tasks';
  RAISE NOTICE '   - PARTNER: 5 tasks';
  RAISE NOTICE '';
  RAISE NOTICE '✅ All migrations complete. Ready for onboarding v2!';
END $$;

