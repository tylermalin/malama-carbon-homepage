-- ============================================
-- MESSAGE TEMPLATES TABLE
-- Pre-built templates for common admin messages
-- ============================================

CREATE TABLE IF NOT EXISTS public.message_templates (
  id BIGSERIAL PRIMARY KEY,
  
  -- Template info
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Template metadata
  role TEXT, -- Which role this template is for (optional)
  message_type TEXT NOT NULL DEFAULT 'general',
  
  -- Management
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_message_templates_role 
  ON public.message_templates(role);
CREATE INDEX IF NOT EXISTS idx_message_templates_active 
  ON public.message_templates(is_active);

-- ============================================
-- SEED TEMPLATES
-- ============================================

INSERT INTO public.message_templates (name, subject, message, role, message_type)
VALUES 
  -- Project Developer Templates
  (
    'project_ready_for_planning',
    'Your Project is Ready for the Next Step 🌱',
    'Aloha {name},

Great news! We''ve reviewed your project questionnaire and you''re ready to move forward.

Let''s onboard your project and create your Project Planning Documents. This next step will include:

• Detailed project profile setup
• Reactor/site and feedstock configuration
• MRV sensor deployment planning
• Baseline documentation preparation

Schedule a call with our team to get started: {cal_link}

We''re excited to help bring your carbon removal project to life!

Aloha,
The Mālama Labs Team',
    'PROJECT_DEVELOPER',
    'project_update'
  ),
  
  (
    'sensors_ready',
    'Your dMRV Sensors are Ready to Deploy 📡',
    'Aloha {name},

Your monitoring equipment is ready! Our team has prepared:

• Sensor deployment guide
• Mobile data capture app access
• Baseline measurement protocols
• Support resources

Next steps:
1. Review the deployment guide
2. Install sensors at your site
3. Begin baseline measurements
4. Schedule check-in call

Access your resources: {dashboard_link}

Mahalo,
Mālama Labs Team',
    'PROJECT_DEVELOPER',
    'action_required'
  ),

  -- Credit Buyer Templates
  (
    'first_credits_available',
    'First Liquid Carbon Tokens Available for Purchase 🎯',
    'Aloha {name},

Exciting announcement! The first verified Liquid Carbon Tokens (LC02) are now available on our marketplace.

**Available Credits:**
• {credit_count} high-quality LC02 tokens
• {methodologies} methodologies
• Verified and ready for retirement

Login to review opportunities and secure your carbon credits:
{marketplace_link}

Our team is available to discuss portfolio strategy and volume pricing.

Aloha,
Mālama Labs Team',
    'CREDIT_BUYER',
    'credit_availability'
  ),

  (
    'new_project_listing',
    'New Carbon Removal Project Listed 🌿',
    'Aloha {name},

A new high-quality carbon removal project has been added to our marketplace:

**{project_name}**
• Type: {project_type}
• Location: {location}
• Available Credits: {available_credits}
• Price: {price_range}

This project may align with your portfolio strategy. Review details and due diligence materials in your dashboard.

View Project: {project_link}

Mahalo,
Mālama Labs Team',
    'CREDIT_BUYER',
    'announcement'
  ),

  -- Technology Developer Templates
  (
    'api_sandbox_ready',
    'Your API Sandbox is Ready 🚀',
    'Aloha {name},

Your development environment is now live!

**Your API Credentials:**
• Environment: Sandbox
• API Key: {api_key}
• Documentation: {docs_link}

**Quickstart Resources:**
• Sample code and tutorials
• Test data sets
• Developer community access

Ready to build? Start here: {sandbox_link}

Questions? Join our developer Discord: {discord_link}

Happy coding!
Mālama Labs Dev Team',
    'TECHNOLOGY_DEVELOPER',
    'action_required'
  ),

  (
    'integration_approved',
    'Integration Review Complete ✅',
    'Aloha {name},

Excellent work! We''ve reviewed your integration approach and everything looks great.

**Next Steps:**
• Production API access approved
• Rate limits: {rate_limits}
• Go-live checklist: {checklist_link}

Schedule your technical review call to finalize deployment:
{cal_link}

Mahalo for building with Mālama!

Aloha,
Mālama Labs Team',
    'TECHNOLOGY_DEVELOPER',
    'project_update'
  ),

  -- Partner Templates
  (
    'partnership_proposal_review',
    'Partnership Proposal - Next Steps 🤝',
    'Aloha {name},

Thank you for your partnership proposal! We''ve reviewed your submission and are excited about the potential collaboration.

**Areas of Alignment:**
{alignment_areas}

**Proposed Next Steps:**
1. Schedule strategy session
2. Discuss pilot project scope
3. Review funding opportunities
4. Formalize partnership terms

Let''s schedule a call to explore this further:
{cal_link}

We look forward to working together!

Aloha,
Mālama Labs Team',
    'PARTNER',
    'project_update'
  ),

  -- General Templates
  (
    'welcome_message',
    'Welcome to Mālama Labs! 🌺',
    'Aloha {name},

Welcome to Mālama Labs! We''re thrilled to have you join our mission to scale durable carbon removal.

Your account is set up and your personalized dashboard is ready. Here''s what you can do next:

• Complete your profile
• Review your personalized tasks
• Schedule an intro call with our team
• Explore our platform tools

Get started: {dashboard_link}

Have questions? We''re here to help: aloha@malamalabs.com

Mahalo,
The Mālama Labs Team',
    NULL,
    'general'
  ),

  (
    'quarterly_update',
    'Mālama Labs Q{quarter} Update 📊',
    'Aloha {name},

Here''s our quarterly progress update:

**Platform Milestones:**
{milestones}

**New Features:**
{features}

**Upcoming:**
{upcoming}

Read the full update: {blog_link}

Thank you for being part of our community!

Aloha,
Mālama Labs Team',
    NULL,
    'announcement'
  )

ON CONFLICT (name) DO NOTHING;

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage templates"
  ON public.message_templates
  FOR ALL
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
DECLARE
  template_count INT;
BEGIN
  SELECT COUNT(*) INTO template_count FROM public.message_templates;
  
  RAISE NOTICE '✅ Message templates table created!';
  RAISE NOTICE '   - Total templates: %', template_count;
  RAISE NOTICE '   - PROJECT_DEVELOPER: 2 templates';
  RAISE NOTICE '   - CREDIT_BUYER: 2 templates';
  RAISE NOTICE '   - TECHNOLOGY_DEVELOPER: 2 templates';
  RAISE NOTICE '   - PARTNER: 1 template';
  RAISE NOTICE '   - GENERAL: 2 templates';
END $$;


