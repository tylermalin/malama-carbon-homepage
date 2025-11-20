-- AI Compliance Scanner Database Schema
-- Version: 1.0
-- Created: 2025-11-10

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ============================================================================
-- COMPANIES TABLE
-- Stores information about startups being monitored
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    domain TEXT UNIQUE NOT NULL,
    industry TEXT,
    description TEXT,
    contact_email TEXT,
    contact_name TEXT,
    crunchbase_url TEXT,
    linkedin_url TEXT,
    company_size TEXT, -- startup, small, medium, enterprise
    funding_stage TEXT, -- pre-seed, seed, series-a, etc.
    headquarters_country TEXT,
    uses_ai BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    last_scanned_at TIMESTAMPTZ,
    
    -- Soft delete
    deleted_at TIMESTAMPTZ,
    
    -- Search
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(name, '') || ' ' || coalesce(domain, '') || ' ' || coalesce(industry, ''))
    ) STORED
);

CREATE INDEX idx_compliance_companies_domain ON compliance_companies(domain);
CREATE INDEX idx_compliance_companies_industry ON compliance_companies(industry);
CREATE INDEX idx_compliance_companies_search ON compliance_companies USING gin(search_vector);
CREATE INDEX idx_compliance_companies_created_at ON compliance_companies(created_at DESC);

-- ============================================================================
-- SCANS TABLE
-- Tracks individual compliance scan runs
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES compliance_companies(id) ON DELETE CASCADE,
    
    -- Status tracking
    status TEXT NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'queued', 'scraping', 'analyzing', 'complete', 'failed', 'cancelled')),
    
    -- Risk scoring
    overall_risk_score NUMERIC(3,1) CHECK (overall_risk_score >= 0 AND overall_risk_score <= 10),
    risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    
    -- Compliance status by jurisdiction
    gdpr_compliant BOOLEAN,
    gdpr_score NUMERIC(3,1),
    ccpa_compliant BOOLEAN,
    ccpa_score NUMERIC(3,1),
    ai_act_compliant BOOLEAN,
    ai_act_score NUMERIC(3,1),
    
    -- Counts
    total_issues INTEGER DEFAULT 0,
    critical_issues INTEGER DEFAULT 0,
    high_issues INTEGER DEFAULT 0,
    medium_issues INTEGER DEFAULT 0,
    low_issues INTEGER DEFAULT 0,
    
    -- Timing
    started_at TIMESTAMPTZ DEFAULT NOW(),
    scraping_started_at TIMESTAMPTZ,
    analyzing_started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    
    -- Error handling
    error_message TEXT,
    error_stack TEXT,
    retry_count INTEGER DEFAULT 0,
    
    -- Raw data storage
    raw_data JSONB, -- Full LLM response
    metadata JSONB, -- Additional metadata
    
    -- User tracking
    user_id UUID REFERENCES auth.users(id),
    scan_type TEXT DEFAULT 'manual' CHECK (scan_type IN ('manual', 'scheduled', 'api', 'bulk')),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_compliance_scans_company ON compliance_scans(company_id);
CREATE INDEX idx_compliance_scans_status ON compliance_scans(status);
CREATE INDEX idx_compliance_scans_risk_level ON compliance_scans(risk_level);
CREATE INDEX idx_compliance_scans_created_at ON compliance_scans(created_at DESC);
CREATE INDEX idx_compliance_scans_user ON compliance_scans(user_id);
CREATE INDEX idx_compliance_scans_raw_data ON compliance_scans USING gin(raw_data);

-- ============================================================================
-- SCRAPED PAGES TABLE
-- Stores raw content from website scraping
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_scraped_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scan_id UUID NOT NULL REFERENCES compliance_scans(id) ON DELETE CASCADE,
    
    -- Page info
    url TEXT NOT NULL,
    page_type TEXT NOT NULL 
        CHECK (page_type IN ('homepage', 'privacy', 'terms', 'legal', 'about', 'ai-policy', 'cookies', 'security', 'other')),
    
    -- Content
    raw_html TEXT,
    parsed_text TEXT,
    word_count INTEGER,
    
    -- HTTP metadata
    status_code INTEGER,
    content_type TEXT,
    response_time_ms INTEGER,
    
    -- Extracted metadata
    metadata JSONB, -- scripts, trackers, third-party services
    detected_technologies TEXT[], -- ["google-analytics", "stripe", "openai"]
    detected_tracking BOOLEAN DEFAULT false,
    
    -- Timestamps
    scraped_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Quality metrics
    scrape_success BOOLEAN DEFAULT true,
    error_message TEXT
);

CREATE INDEX idx_scraped_pages_scan ON compliance_scraped_pages(scan_id);
CREATE INDEX idx_scraped_pages_type ON compliance_scraped_pages(page_type);
CREATE INDEX idx_scraped_pages_technologies ON compliance_scraped_pages USING gin(detected_technologies);

-- ============================================================================
-- FINDINGS TABLE
-- Detailed compliance issues discovered
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scan_id UUID NOT NULL REFERENCES compliance_scans(id) ON DELETE CASCADE,
    
    -- Classification
    category TEXT NOT NULL,
    -- ai_disclosure, gdpr_privacy, ccpa_privacy, consent_management, 
    -- data_security, data_retention, third_party_sharing, cookie_compliance,
    -- ai_act_high_risk, children_privacy, biometric_data, automated_decisions
    
    subcategory TEXT,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    score NUMERIC(3,1) CHECK (score >= 0 AND score <= 10),
    
    -- Content
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence TEXT[], -- Direct quotes from policies
    source_urls TEXT[], -- Which pages contained the evidence
    
    -- Recommendations
    recommendations TEXT[] NOT NULL,
    fix_difficulty TEXT CHECK (fix_difficulty IN ('easy', 'moderate', 'complex', 'requires-legal')),
    estimated_fix_time TEXT, -- "2 hours", "1 day", "1 week"
    
    -- Compliance references
    gdpr_articles TEXT[], -- ["Article 13", "Article 14"]
    ccpa_sections TEXT[], -- ["§1798.100", "§1798.120"]
    ai_act_references TEXT[],
    other_regulations TEXT[],
    
    -- Priority
    is_blocking BOOLEAN DEFAULT false, -- Blocks product launch
    is_enforced BOOLEAN DEFAULT false, -- Actively enforced by regulators
    fine_risk_amount TEXT, -- "Up to €20M or 4% revenue"
    
    -- Templates
    suggested_policy_text TEXT, -- Ready-to-use policy language
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_findings_scan ON compliance_findings(scan_id);
CREATE INDEX idx_findings_category ON compliance_findings(category);
CREATE INDEX idx_findings_severity ON compliance_findings(severity);
CREATE INDEX idx_findings_blocking ON compliance_findings(is_blocking) WHERE is_blocking = true;

-- ============================================================================
-- LEADS TABLE
-- Track sales opportunities from scans
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES compliance_companies(id) ON DELETE CASCADE,
    scan_id UUID REFERENCES compliance_scans(id),
    
    -- Lead status
    status TEXT DEFAULT 'new' 
        CHECK (status IN ('new', 'contacted', 'responded', 'qualified', 'meeting-scheduled', 'proposal-sent', 'converted', 'lost')),
    lead_source TEXT DEFAULT 'free-scan'
        CHECK (lead_source IN ('free-scan', 'bulk-scan', 'referral', 'inbound', 'outbound')),
    
    -- Contact info
    contact_email TEXT,
    contact_name TEXT,
    contact_role TEXT,
    contact_phone TEXT,
    
    -- Lead quality
    lead_score INTEGER CHECK (lead_score >= 0 AND lead_score <= 100),
    qualification_notes TEXT,
    
    -- Engagement tracking
    first_scan_at TIMESTAMPTZ,
    last_scan_at TIMESTAMPTZ,
    total_scans INTEGER DEFAULT 1,
    report_downloaded BOOLEAN DEFAULT false,
    report_downloaded_at TIMESTAMPTZ,
    
    -- Outreach
    contacted_at TIMESTAMPTZ,
    contact_method TEXT, -- email, phone, linkedin
    responded_at TIMESTAMPTZ,
    meeting_scheduled_at TIMESTAMPTZ,
    
    -- Conversion
    converted_at TIMESTAMPTZ,
    conversion_value NUMERIC(10,2),
    conversion_service TEXT, -- compliance-audit, policy-generation, legal-review
    
    -- Notes and follow-up
    notes TEXT,
    next_follow_up_at TIMESTAMPTZ,
    
    -- Assignment
    assigned_to UUID REFERENCES auth.users(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_company ON compliance_leads(company_id);
CREATE INDEX idx_leads_status ON compliance_leads(status);
CREATE INDEX idx_leads_score ON compliance_leads(lead_score DESC);
CREATE INDEX idx_leads_follow_up ON compliance_leads(next_follow_up_at) WHERE next_follow_up_at IS NOT NULL;
CREATE INDEX idx_leads_assigned ON compliance_leads(assigned_to);

-- ============================================================================
-- SUBSCRIPTIONS TABLE
-- Ongoing monitoring subscriptions
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES compliance_companies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    
    -- Plan details
    plan TEXT NOT NULL CHECK (plan IN ('free', 'basic', 'pro', 'enterprise')),
    billing_interval TEXT CHECK (billing_interval IN ('monthly', 'quarterly', 'annual')),
    price_cents INTEGER,
    
    -- Monitoring config
    scan_frequency TEXT DEFAULT 'weekly' 
        CHECK (scan_frequency IN ('daily', 'weekly', 'biweekly', 'monthly')),
    alert_threshold TEXT DEFAULT 'high'
        CHECK (alert_threshold IN ('all', 'medium', 'high', 'critical')),
    
    -- Notification preferences
    email_alerts BOOLEAN DEFAULT true,
    slack_webhook_url TEXT,
    webhook_url TEXT,
    
    -- Status
    active BOOLEAN DEFAULT true,
    paused BOOLEAN DEFAULT false,
    
    -- Timing
    last_scan_at TIMESTAMPTZ,
    next_scan_at TIMESTAMPTZ,
    scans_remaining INTEGER, -- For limited plans
    
    -- Billing
    stripe_subscription_id TEXT,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT
);

CREATE INDEX idx_subscriptions_company ON compliance_subscriptions(company_id);
CREATE INDEX idx_subscriptions_user ON compliance_subscriptions(user_id);
CREATE INDEX idx_subscriptions_active ON compliance_subscriptions(active) WHERE active = true;
CREATE INDEX idx_subscriptions_next_scan ON compliance_subscriptions(next_scan_at) WHERE active = true;

-- ============================================================================
-- SCAN QUEUE TABLE
-- For managing async scan processing
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_scan_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scan_id UUID NOT NULL REFERENCES compliance_scans(id) ON DELETE CASCADE,
    
    -- Queue status
    status TEXT DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    priority INTEGER DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
    
    -- Processing
    worker_id TEXT,
    started_processing_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    -- Retry logic
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    last_error TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scan_queue_status ON compliance_scan_queue(status, priority DESC, created_at);
CREATE INDEX idx_scan_queue_worker ON compliance_scan_queue(worker_id) WHERE status = 'processing';

-- ============================================================================
-- NOTIFICATION LOG
-- Track all notifications sent
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Target
    user_id UUID REFERENCES auth.users(id),
    email TEXT,
    
    -- Related entities
    scan_id UUID REFERENCES compliance_scans(id),
    company_id UUID REFERENCES compliance_companies(id),
    
    -- Notification details
    notification_type TEXT NOT NULL
        CHECK (notification_type IN ('scan-complete', 'high-risk-detected', 'weekly-digest', 'policy-changed', 'lead-created')),
    channel TEXT NOT NULL CHECK (channel IN ('email', 'slack', 'webhook', 'in-app')),
    
    -- Content
    subject TEXT,
    body TEXT,
    data JSONB,
    
    -- Delivery status
    status TEXT DEFAULT 'pending'
        CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'bounced')),
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    
    -- Error tracking
    error_message TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON compliance_notifications(user_id);
CREATE INDEX idx_notifications_status ON compliance_notifications(status);
CREATE INDEX idx_notifications_created ON compliance_notifications(created_at DESC);

-- ============================================================================
-- COMPLIANCE TEMPLATES TABLE
-- Store reusable policy templates and suggested fixes
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Template info
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    
    -- Jurisdictions
    applies_to_gdpr BOOLEAN DEFAULT false,
    applies_to_ccpa BOOLEAN DEFAULT false,
    applies_to_ai_act BOOLEAN DEFAULT false,
    
    -- Template content
    title TEXT NOT NULL,
    description TEXT,
    template_text TEXT NOT NULL,
    variables JSONB, -- {"company_name": "string", "data_retention_days": "number"}
    
    -- Usage
    usage_count INTEGER DEFAULT 0,
    
    -- Metadata
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_templates_category ON compliance_templates(category);
CREATE INDEX idx_templates_active ON compliance_templates(is_active) WHERE is_active = true;

-- ============================================================================
-- AUDIT LOG
-- Track all changes for compliance and debugging
-- ============================================================================
CREATE TABLE IF NOT EXISTS compliance_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Actor
    user_id UUID REFERENCES auth.users(id),
    user_email TEXT,
    
    -- Action
    action TEXT NOT NULL, -- created, updated, deleted, scanned, exported
    entity_type TEXT NOT NULL, -- company, scan, finding, lead
    entity_id UUID,
    
    -- Details
    changes JSONB, -- before/after for updates
    metadata JSONB,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_user ON compliance_audit_log(user_id);
CREATE INDEX idx_audit_log_entity ON compliance_audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created ON compliance_audit_log(created_at DESC);

-- ============================================================================
-- VIEWS
-- Useful aggregated views
-- ============================================================================

-- High-risk companies needing attention
CREATE OR REPLACE VIEW compliance_high_risk_companies AS
SELECT 
    c.id,
    c.name,
    c.domain,
    c.industry,
    s.overall_risk_score,
    s.risk_level,
    s.critical_issues,
    s.high_issues,
    s.completed_at as last_scan_at,
    l.status as lead_status,
    l.contact_email
FROM compliance_companies c
INNER JOIN compliance_scans s ON s.id = (
    SELECT id FROM compliance_scans 
    WHERE company_id = c.id AND status = 'complete'
    ORDER BY completed_at DESC 
    LIMIT 1
)
LEFT JOIN compliance_leads l ON l.company_id = c.id
WHERE s.risk_level IN ('high', 'critical')
    AND c.deleted_at IS NULL
ORDER BY s.overall_risk_score DESC;

-- Scan statistics
CREATE OR REPLACE VIEW compliance_scan_stats AS
SELECT 
    DATE(completed_at) as scan_date,
    COUNT(*) as total_scans,
    AVG(overall_risk_score) as avg_risk_score,
    SUM(CASE WHEN risk_level = 'critical' THEN 1 ELSE 0 END) as critical_count,
    SUM(CASE WHEN risk_level = 'high' THEN 1 ELSE 0 END) as high_count,
    SUM(CASE WHEN risk_level = 'medium' THEN 1 ELSE 0 END) as medium_count,
    SUM(CASE WHEN risk_level = 'low' THEN 1 ELSE 0 END) as low_count,
    AVG(duration_seconds) as avg_duration_seconds
FROM compliance_scans
WHERE status = 'complete'
    AND completed_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(completed_at)
ORDER BY scan_date DESC;

-- Lead conversion funnel
CREATE OR REPLACE VIEW compliance_lead_funnel AS
SELECT 
    status,
    COUNT(*) as count,
    AVG(lead_score) as avg_score,
    SUM(conversion_value) as total_value
FROM compliance_leads
WHERE created_at > NOW() - INTERVAL '90 days'
GROUP BY status
ORDER BY 
    CASE status
        WHEN 'new' THEN 1
        WHEN 'contacted' THEN 2
        WHEN 'responded' THEN 3
        WHEN 'qualified' THEN 4
        WHEN 'meeting-scheduled' THEN 5
        WHEN 'proposal-sent' THEN 6
        WHEN 'converted' THEN 7
        WHEN 'lost' THEN 8
    END;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to calculate lead score based on scan results
CREATE OR REPLACE FUNCTION calculate_lead_score(scan_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    scan_rec RECORD;
BEGIN
    SELECT 
        s.overall_risk_score,
        s.critical_issues,
        s.high_issues,
        c.funding_stage,
        c.uses_ai
    INTO scan_rec
    FROM compliance_scans s
    JOIN compliance_companies c ON c.id = s.company_id
    WHERE s.id = scan_uuid;
    
    -- Base score from risk
    score := LEAST(scan_rec.overall_risk_score * 8, 80)::INTEGER;
    
    -- Bonus for critical issues (more urgent)
    score := score + (scan_rec.critical_issues * 5);
    
    -- Bonus for funded companies
    IF scan_rec.funding_stage IN ('series-a', 'series-b', 'series-c') THEN
        score := score + 15;
    END IF;
    
    -- Bonus for AI companies (more relevant)
    IF scan_rec.uses_ai THEN
        score := score + 10;
    END IF;
    
    -- Cap at 100
    RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql;

-- Function to update company last_scanned_at
CREATE OR REPLACE FUNCTION update_company_last_scanned()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'complete' THEN
        UPDATE compliance_companies 
        SET last_scanned_at = NEW.completed_at
        WHERE id = NEW.company_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_company_last_scanned
    AFTER UPDATE ON compliance_scans
    FOR EACH ROW
    WHEN (NEW.status = 'complete' AND OLD.status != 'complete')
    EXECUTE FUNCTION update_company_last_scanned();

-- Function to auto-create lead from high-risk scan
CREATE OR REPLACE FUNCTION auto_create_lead_from_scan()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'complete' AND NEW.risk_level IN ('high', 'critical') THEN
        INSERT INTO compliance_leads (
            company_id,
            scan_id,
            status,
            lead_source,
            first_scan_at,
            last_scan_at,
            total_scans,
            lead_score
        )
        VALUES (
            NEW.company_id,
            NEW.id,
            'new',
            CASE WHEN NEW.scan_type = 'api' THEN 'free-scan' ELSE NEW.scan_type END,
            NEW.completed_at,
            NEW.completed_at,
            1,
            calculate_lead_score(NEW.id)
        )
        ON CONFLICT DO NOTHING;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_create_lead
    AFTER UPDATE ON compliance_scans
    FOR EACH ROW
    WHEN (NEW.status = 'complete' AND OLD.status != 'complete')
    EXECUTE FUNCTION auto_create_lead_from_scan();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE compliance_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_scraped_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_notifications ENABLE ROW LEVEL SECURITY;

-- Admin users can see everything
CREATE POLICY admin_all_compliance_companies ON compliance_companies
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Users can see their own scans
CREATE POLICY users_own_scans ON compliance_scans
    FOR ALL USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Public can insert free scans (will be limited by rate limiting)
CREATE POLICY public_insert_scans ON compliance_scans
    FOR INSERT WITH CHECK (
        scan_type = 'api' OR
        user_id = auth.uid()
    );

-- ============================================================================
-- SEED DATA
-- Example compliance templates
-- ============================================================================

INSERT INTO compliance_templates (name, category, subcategory, applies_to_gdpr, applies_to_ccpa, title, template_text, variables)
VALUES 
(
    'AI Use Disclosure',
    'ai_disclosure',
    'general',
    true,
    true,
    'AI-Powered Service Disclosure',
    'This service uses artificial intelligence (AI) and machine learning technologies to [DESCRIBE FUNCTIONALITY]. The AI processes your data to provide [SPECIFIC BENEFITS]. Please note that AI-generated outputs may contain errors or inaccuracies, and should be reviewed before use. By using this service, you acknowledge that content is generated or processed using AI systems.',
    '{"describe_functionality": "string", "specific_benefits": "string"}'
),
(
    'Data Deletion Policy',
    'gdpr_privacy',
    'data_retention',
    true,
    true,
    'User Data Deletion Rights',
    'You have the right to request deletion of your personal data at any time. To exercise this right, please contact us at [CONTACT_EMAIL]. We will process your deletion request within [DAYS] business days. Please note that we may retain certain information as required by law or for legitimate business purposes, such as fraud prevention or legal compliance.',
    '{"contact_email": "string", "days": "number"}'
),
(
    'GDPR Representative',
    'gdpr_privacy',
    'legal_contact',
    true,
    false,
    'EU Representative Contact',
    'In accordance with Article 27 of the GDPR, we have appointed [REPRESENTATIVE_NAME] as our representative in the European Union. You can contact our EU representative at: [ADDRESS], Email: [EMAIL], Phone: [PHONE]',
    '{"representative_name": "string", "address": "string", "email": "string", "phone": "string"}'
);

-- ============================================================================
-- PERMISSIONS
-- Grant necessary permissions to authenticated users
-- ============================================================================

GRANT SELECT ON compliance_high_risk_companies TO authenticated;
GRANT SELECT ON compliance_scan_stats TO authenticated;
GRANT SELECT ON compliance_lead_funnel TO authenticated;

-- ============================================================================
-- COMMENTS
-- Document the schema
-- ============================================================================

COMMENT ON TABLE compliance_companies IS 'Startups and companies being monitored for compliance';
COMMENT ON TABLE compliance_scans IS 'Individual compliance scan runs and their results';
COMMENT ON TABLE compliance_findings IS 'Specific compliance issues and recommendations';
COMMENT ON TABLE compliance_leads IS 'Sales leads generated from compliance scans';
COMMENT ON TABLE compliance_subscriptions IS 'Ongoing monitoring subscriptions';

-- End of migration

