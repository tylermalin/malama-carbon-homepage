# AI Compliance Scanner - Product Requirements Document

## Executive Summary

**Product Name:** Beneficial AI Compliance Scanner  
**Version:** 1.0 MVP  
**Target Launch:** 6 weeks from project start  
**Primary Goal:** Automatically identify AI and data-privacy compliance risks in startup materials and generate actionable reports for lead generation.

---

## 1. Product Vision

### Problem Statement
- Startups using AI/ML often lack proper compliance disclosures
- Privacy policies frequently miss GDPR, CCPA, or AI Act requirements
- Legal teams need automated monitoring across portfolio companies
- No simple tool exists for quick compliance health checks

### Solution
An automated scanner that:
1. Crawls startup websites for compliance-related content
2. Uses LLM analysis to identify gaps and risks
3. Generates human-readable risk reports with remediation steps
4. Creates qualified leads for legal/compliance services

### Success Metrics
- **Week 1-2:** 50+ startups scanned successfully
- **Month 1:** 100+ free scans completed
- **Month 2:** 10+ paid reports or consulting conversions
- **Month 3:** $5-10K MRR from monitoring subscriptions

---

## 2. Target Users

### Primary Personas

**1. Solo Founder (AI Startup)**
- **Need:** Quick compliance check before launch/fundraise
- **Pain:** Can't afford $5K legal review yet
- **Value Prop:** $0-99 instant compliance audit

**2. Legal Advisor/Counsel**
- **Need:** Monitor 10-50 clients for new risks
- **Pain:** Manual review is time-consuming
- **Value Prop:** Automated weekly monitoring + alerts

**3. Business Development (Beneficial/Complai)**
- **Need:** Qualified leads with diagnosed problems
- **Pain:** Cold outreach has low conversion
- **Value Prop:** Risk reports = warm intro opportunities

---

## 3. Core Features (MVP)

### 3.1 Startup Input & Discovery
**Priority:** P0 (Must Have)

**Input Methods:**
- [ ] Manual URL entry (startup website)
- [ ] Bulk CSV upload (name, domain, optional metadata)
- [ ] API integration with Crunchbase/YC directory (future)

**Data Captured:**
- Company name
- Primary domain
- Industry/category tags
- Submission date
- Contact email (optional)

### 3.2 Intelligent Web Scraping
**Priority:** P0 (Must Have)

**Target Pages:**
- `/privacy` or `/privacy-policy`
- `/terms` or `/terms-of-service`
- `/legal`
- Homepage (for AI use mentions)
- `/about` (team/contact info)

**Extraction Logic:**
- Full-text content
- HTML metadata (scripts, trackers)
- External integrations (Google Analytics, Segment, etc.)
- AI/ML service mentions (OpenAI, Anthropic, etc.)

**Technical Requirements:**
- Handle JavaScript-rendered sites (Playwright)
- Respect robots.txt
- Rate limiting (1 req/sec per domain)
- 30-second timeout per page
- Store raw HTML + parsed text

### 3.3 LLM Compliance Analysis Engine
**Priority:** P0 (Must Have)

**Analysis Categories:**

1. **AI Disclosure Requirements**
   - Is AI/ML use disclosed?
   - Is synthetic content labeled?
   - Are AI limitations explained?

2. **Data Privacy (GDPR/CCPA)**
   - Is data collection disclosed?
   - Are retention periods specified?
   - Is there a deletion process?
   - Are third-party processors listed?
   - EU representative contact (GDPR Art. 27)?

3. **Consent & Control**
   - Opt-in/opt-out mechanisms
   - Cookie consent banners
   - Data portability options

4. **High-Risk AI (EU AI Act)**
   - Biometric data processing
   - Emotion recognition
   - Critical infrastructure use
   - Profiling/automated decisions

**Risk Scoring:**
```
0-3: Low Risk (minor gaps)
4-6: Medium Risk (missing sections)
7-9: High Risk (legal exposure)
10: Critical (enforcement likely)
```

**Output Format:**
```json
{
  "startup": "synthtext.ai",
  "scan_date": "2025-11-10",
  "overall_risk_score": 8.2,
  "categories": [
    {
      "category": "AI Disclosure",
      "risk_level": "high",
      "score": 9,
      "findings": [
        "No mention of AI use on homepage or terms",
        "Generated content not labeled as synthetic"
      ],
      "recommendations": [
        "Add 'Powered by AI' disclosure",
        "Label AI-generated outputs clearly"
      ]
    }
  ],
  "detected_integrations": ["stripe", "google-analytics"],
  "missing_policies": ["data-deletion", "eu-representative"],
  "compliance_jurisdictions": {
    "gdpr": "non-compliant",
    "ccpa": "partial",
    "ai_act": "unknown"
  }
}
```

### 3.4 Interactive Dashboard
**Priority:** P0 (Must Have)

**Views:**

**A. Scan Queue**
- List of pending/completed scans
- Status indicators (queued, scraping, analyzing, complete)
- Bulk actions (delete, re-scan)

**B. Risk Overview**
- Risk score distribution chart
- Top 10 riskiest startups
- Filter by industry, score, date

**C. Individual Report Page**
```
┌─────────────────────────────────────────┐
│ SynthText.ai - Compliance Report        │
│ Risk Score: 8.2/10 🔴 HIGH RISK         │
├─────────────────────────────────────────┤
│ AI Disclosure         [9/10] Critical   │
│ GDPR Compliance       [7/10] High       │
│ CCPA Compliance       [4/10] Medium     │
│ Data Security         [6/10] Medium     │
├─────────────────────────────────────────┤
│ 🚨 Critical Issues (3)                  │
│ - No AI use disclosure                  │
│ - Missing data deletion policy          │
│ - No EU representative listed           │
│                                         │
│ 💡 Recommendations                      │
│ 1. Add AI disclaimer to T&C            │
│ 2. Create data subject request form    │
│ 3. Appoint EU GDPR representative       │
└─────────────────────────────────────────┘
```

**D. Lead Management**
- Mark as contacted
- Add notes
- Export to CRM (CSV/API)
- Email outreach template generator

### 3.5 Notification System
**Priority:** P1 (Should Have)

**Alerts:**
- Email digest (daily/weekly)
- Slack webhook integration
- In-app notifications

**Triggers:**
- New high-risk scan completed
- Weekly summary (monitoring mode)
- Policy changes detected (future)

### 3.6 Free Scan Landing Page
**Priority:** P0 (Must Have)

**URL:** `/compliance-scan`

**Content:**
```
┌─────────────────────────────────────┐
│  Is Your AI Startup Compliant?     │
│  Free 60-Second Risk Check          │
│                                     │
│  [Enter your website]  [→ Scan]    │
│                                     │
│  ✓ Privacy policy analysis          │
│  ✓ AI disclosure check              │
│  ✓ GDPR/CCPA gaps                   │
│  ✓ Instant risk report              │
│                                     │
│  Used by 500+ startups              │
└─────────────────────────────────────┘
```

**Lead Capture:**
- Optional email for full report
- "Get help fixing these issues" CTA
- Link to book consultation

---

## 4. Technical Architecture

### 4.1 System Components

```
┌─────────────┐
│   User/UI   │ (React Dashboard)
└──────┬──────┘
       │
       ↓ (HTTP/REST)
┌─────────────────────────┐
│   API Server (FastAPI)  │
│  - Scan endpoints       │
│  - Auth (Supabase)      │
│  - Rate limiting        │
└────┬───────────────┬────┘
     │               │
     ↓               ↓
┌──────────┐   ┌─────────────┐
│ Scraper  │   │ LLM Analyzer│
│ Service  │   │ (GPT-4/Claude)│
│(Playwright)   └─────────────┘
└────┬─────┘
     │
     ↓
┌──────────────────────┐
│  Supabase/Postgres   │
│  - Scans table       │
│  - Findings table    │
│  - Companies table   │
│  - Vector store      │
└──────────────────────┘
```

### 4.2 Database Schema

```sql
-- Companies being monitored
CREATE TABLE compliance_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  domain TEXT UNIQUE NOT NULL,
  industry TEXT,
  contact_email TEXT,
  crunchbase_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_scanned_at TIMESTAMPTZ
);

-- Scan history
CREATE TABLE compliance_scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES compliance_companies(id),
  status TEXT DEFAULT 'pending', -- pending, scraping, analyzing, complete, failed
  overall_risk_score NUMERIC(3,1),
  risk_level TEXT, -- low, medium, high, critical
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  raw_data JSONB, -- full LLM response
  user_id UUID REFERENCES auth.users(id)
);

-- Scraped content
CREATE TABLE compliance_scraped_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scan_id UUID REFERENCES compliance_scans(id),
  url TEXT NOT NULL,
  page_type TEXT, -- homepage, privacy, terms, legal, about
  raw_html TEXT,
  parsed_text TEXT,
  metadata JSONB, -- scripts, trackers, etc.
  scraped_at TIMESTAMPTZ DEFAULT NOW()
);

-- Detailed findings
CREATE TABLE compliance_findings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scan_id UUID REFERENCES compliance_scans(id),
  category TEXT NOT NULL, -- ai_disclosure, gdpr, ccpa, security, etc.
  severity TEXT NOT NULL, -- low, medium, high, critical
  score NUMERIC(3,1),
  title TEXT NOT NULL,
  description TEXT,
  evidence TEXT[], -- quotes from policies
  recommendations TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead tracking
CREATE TABLE compliance_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES compliance_companies(id),
  scan_id UUID REFERENCES compliance_scans(id),
  status TEXT DEFAULT 'new', -- new, contacted, qualified, converted, lost
  contact_email TEXT,
  contacted_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Monitoring subscriptions
CREATE TABLE compliance_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES compliance_companies(id),
  user_id UUID REFERENCES auth.users(id),
  plan TEXT, -- free, monthly, enterprise
  frequency TEXT DEFAULT 'weekly', -- daily, weekly, monthly
  active BOOLEAN DEFAULT true,
  last_scan_at TIMESTAMPTZ,
  next_scan_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.3 API Endpoints

```typescript
// Scans
POST   /api/compliance/scan              // Start new scan
GET    /api/compliance/scans             // List all scans
GET    /api/compliance/scans/:id         // Get scan details
DELETE /api/compliance/scans/:id         // Delete scan
POST   /api/compliance/scans/:id/rescan  // Re-run analysis

// Companies
GET    /api/compliance/companies         // List monitored companies
POST   /api/compliance/companies         // Add company
PUT    /api/compliance/companies/:id     // Update company
DELETE /api/compliance/companies/:id     // Remove company

// Bulk operations
POST   /api/compliance/bulk/scan         // Scan multiple (CSV upload)
GET    /api/compliance/bulk/export       // Export results (CSV)

// Leads
GET    /api/compliance/leads             // List leads
PUT    /api/compliance/leads/:id         // Update lead status
POST   /api/compliance/leads/:id/contact // Generate outreach email

// Public (no auth)
POST   /api/compliance/public/scan       // Free scan (rate limited)
```

---

## 5. LLM Prompt Chain

### 5.1 System Prompt

```
You are an expert compliance auditor specializing in AI/ML startups, GDPR, CCPA, and the EU AI Act.

Your task: Analyze website content and policies to identify compliance gaps and risks.

Focus areas:
1. AI/ML disclosure and transparency
2. Data privacy (GDPR Articles 12-14, CCPA § 1798.100)
3. User consent and control mechanisms
4. High-risk AI systems (EU AI Act Annex III)
5. Data security and retention policies

Output format: Structured JSON with risk scores, findings, and actionable recommendations.

Be specific: Quote exact missing sections and provide compliance templates.
```

### 5.2 Analysis Prompt Template

```
Analyze the following startup's web content for compliance issues:

**Company:** {company_name}
**Domain:** {domain}
**Industry:** {industry}

**Content:**

--- Homepage ---
{homepage_text}

--- Privacy Policy ---
{privacy_policy_text}

--- Terms of Service ---
{terms_text}

--- Detected Technologies ---
{integrations_list}

**Instructions:**
1. Assign an overall risk score (0-10)
2. Identify specific compliance gaps in these categories:
   - AI Disclosure & Transparency
   - GDPR Compliance (if processing EU data)
   - CCPA Compliance (if processing CA data)
   - Data Security & Retention
   - High-Risk AI Systems

3. For each issue, provide:
   - Severity (low/medium/high/critical)
   - Evidence (quote the missing/problematic section)
   - Specific recommendation (exact language to add)

4. List jurisdictions this startup operates in and their compliance status

Output as JSON following this schema:
{json_schema}
```

### 5.3 Recommendation Generator

```
Given these compliance findings:
{findings_json}

Generate 3-5 prioritized action items for the startup, in plain English.

Format:
🔴 Critical (fix immediately):
- [specific action]

🟡 High Priority (fix this month):
- [specific action]

🟢 Medium Priority (address in Q1):
- [specific action]

Include estimated time to fix and whether legal counsel is needed.
```

---

## 6. UI/UX Wireframes

### 6.1 Free Scan Landing Page

```
╔════════════════════════════════════════════════╗
║                                                ║
║         🛡️ AI Compliance Scanner              ║
║     Is Your Startup Legally Protected?        ║
║                                                ║
║  [        Enter your website URL       ] [→]  ║
║                                                ║
║  ✓ Instant privacy policy analysis            ║
║  ✓ AI disclosure compliance check             ║
║  ✓ GDPR & CCPA gap detection                  ║
║  ✓ Free risk report in 60 seconds             ║
║                                                ║
║  [ Optional: Email for full report ]          ║
║                                                ║
║  Trusted by 500+ AI startups                  ║
║  [YC] [Techstars] [500 Startups] logos        ║
║                                                ║
╚════════════════════════════════════════════════╝
```

### 6.2 Dashboard - Scan List

```
╔══════════════════════════════════════════════════════╗
║ Compliance Scans                    [+ New Scan]    ║
╟──────────────────────────────────────────────────────╢
║ 🔍 Filter: [All] [High Risk] [Recent]   🔄 Refresh  ║
╟──────────────────────────────────────────────────────╢
║                                                      ║
║ SynthText.ai              🔴 8.2  2 hours ago       ║
║ Privacy issues detected                             ║
║ [View Report] [Contact]                             ║
║                                                      ║
║ VoiceClone.io             🟡 5.1  1 day ago         ║
║ Missing AI disclosures                              ║
║ [View Report] [Contact]                             ║
║                                                      ║
║ DataMesh Inc.             🟢 2.3  3 days ago        ║
║ Minor consent improvements needed                   ║
║ [View Report] [Mark Complete]                       ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

### 6.3 Individual Report View

```
╔══════════════════════════════════════════════════════╗
║ ← Back to Scans                                     ║
║                                                      ║
║ SynthText.ai                                         ║
║ https://synthtext.ai                                 ║
║ Scanned: Nov 10, 2025 2:14 PM                       ║
║                                                      ║
║ ┌────────────────────────────────────────────┐      ║
║ │  Overall Risk Score                         │      ║
║ │        🔴 8.2 / 10                          │      ║
║ │      HIGH RISK                              │      ║
║ └────────────────────────────────────────────┘      ║
║                                                      ║
║ Risk Breakdown                                       ║
║ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       ║
║ AI Disclosure          █████████░ 9.0 Critical      ║
║ GDPR Compliance        ███████░░░ 7.0 High          ║
║ CCPA Compliance        ████░░░░░░ 4.0 Medium        ║
║ Data Security          █████░░░░░ 5.0 Medium        ║
║                                                      ║
║ 🚨 Critical Issues (3)                               ║
║ ┌────────────────────────────────────────────┐      ║
║ │ 1. No AI Use Disclosure                     │      ║
║ │    Evidence: No mention of "AI", "machine   │      ║
║ │    learning", or "automated" in T&C         │      ║
║ │    Fix: Add clause: "This service uses...  │      ║
║ │    [See template]                           │      ║
║ │                                              │      ║
║ │ 2. Missing Data Deletion Policy              │      ║
║ │    GDPR Art. 17 requires...                 │      ║
║ │    [View details]                            │      ║
║ │                                              │      ║
║ │ 3. No EU Representative Listed               │      ║
║ │    If processing EU data, GDPR Art. 27...   │      ║
║ │    [View details]                            │      ║
║ └────────────────────────────────────────────┘      ║
║                                                      ║
║ [📧 Email Founder] [💾 Export PDF] [🔄 Re-scan]    ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

---

## 7. Go-to-Market Strategy

### 7.1 Free Tier (Lead Generation)

**Offering:**
- 1 free scan per email
- Basic risk score (0-10)
- Top 3 issues highlighted
- Generic recommendations

**CTA:**
- "Get detailed fix guide" → $99 one-time
- "Book 30-min consultation" → free audit call
- "Monitor ongoing" → $199/mo

### 7.2 Paid Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free Scan** | $0 | 1 scan, basic report |
| **Detailed Report** | $99 | Full analysis, templates, 30-day support |
| **Monthly Monitoring** | $199/mo | Weekly scans, change alerts, priority support |
| **Portfolio** | $499/mo | 50 companies, CRM integration, white-label |
| **Enterprise** | Custom | API access, legal review, compliance sprints |

### 7.3 Launch Sequence

**Week 1-2: Stealth Testing**
- Scan 50 YC companies (public data)
- Refine prompts + scoring
- Internal dogfooding

**Week 3: Soft Launch**
- "Top 10 AI Startups Failing Compliance" blog post
- Share on HN, Reddit r/startups, Twitter
- Embed free scan widget

**Week 4: Outreach Campaign**
- Email 100 founders with their scan results (non-intrusive)
- "We noticed X might be at risk" + offer help
- Track conversion to paid

**Week 5-6: Scale**
- ProductHunt launch
- Partner with accelerators (offer free scans for cohorts)
- Webinar: "AI Compliance 101 for Founders"

### 7.4 Content Marketing

**Blog Posts:**
1. "Why Your AI Startup Needs This Disclosure (Template Included)"
2. "GDPR for AI: The 5 Clauses You're Probably Missing"
3. "EU AI Act Compliance: A Founder's Checklist"
4. "Case Study: How [Startup] Fixed Compliance in 2 Days"

**Lead Magnets:**
- AI Privacy Policy Template (free download)
- GDPR Compliance Checklist (PDF)
- "10 Signs You're Not Compliant" Quiz

---

## 8. Success Metrics & KPIs

### 8.1 Product Metrics

| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| Total Scans | 200 | 1,000 |
| Unique Companies | 150 | 750 |
| Avg Risk Score | 6.5 | 6.0 (improves as word spreads) |
| Scan Completion Rate | 85% | 90% |
| Report Downloads | 50 | 250 |

### 8.2 Business Metrics

| Metric | Month 1 | Month 3 |
|--------|---------|---------|
| Free → Paid Conversion | 5% | 10% |
| MRR | $1,000 | $5,000 |
| Consultation Bookings | 5 | 20 |
| Lead Score (avg) | 60/100 | 70/100 |

### 8.3 Technical Metrics

| Metric | Target |
|--------|--------|
| Scan Time (avg) | < 90 seconds |
| Scraper Success Rate | > 90% |
| LLM Analysis Accuracy | > 85% (human eval) |
| API Uptime | 99.5% |

---

## 9. Risk Mitigation

### 9.1 Technical Risks

| Risk | Mitigation |
|------|------------|
| Scraping blocked by anti-bot | Use rotating proxies, Playwright stealth mode |
| LLM hallucinations | Human-in-loop review for high-risk findings; citation links |
| Slow scan times | Queue system, async processing, CDN for static reports |
| Rate limit exceeded | Implement backoff, queue management |

### 9.2 Business Risks

| Risk | Mitigation |
|------|------------|
| Low conversion rate | A/B test CTAs, offer free consultation |
| Legal liability (bad advice) | Disclaimer: "Not legal advice", recommend attorney review |
| Competition | Focus on AI-specific niche, integrate with Complai |
| Spam concerns | Double opt-in, clear value prop |

---

## 10. Development Roadmap

### Phase 1: MVP (Weeks 1-6)
- [x] PRD + architecture
- [ ] Database schema
- [ ] Basic scraper (Playwright)
- [ ] LLM analyzer (GPT-4)
- [ ] Simple dashboard UI
- [ ] Free scan landing page
- [ ] Email notifications

### Phase 2: Beta (Weeks 7-10)
- [ ] Bulk CSV upload
- [ ] Lead management CRM
- [ ] PDF export
- [ ] Slack integration
- [ ] Advanced filters
- [ ] Payment integration (Stripe)

### Phase 3: Scale (Weeks 11-16)
- [ ] Monitoring subscriptions
- [ ] Change detection (re-scan diff)
- [ ] API for partners
- [ ] White-label option
- [ ] EU AI Act module
- [ ] Multi-language support

---

## 11. Open Questions

1. **LLM Provider:** GPT-4 vs Claude vs open-source (cost vs accuracy)?
2. **Scraping Infrastructure:** Self-hosted vs Apify/Bright Data?
3. **Pricing:** Start free-only or charge from day 1?
4. **Legal Review:** Should Beneficial attorney review all reports?
5. **Brand:** Separate brand vs "Complai Scanner" sub-product?

---

## 12. Next Steps

**Immediate (This Week):**
1. [ ] Approve PRD
2. [ ] Set up Supabase tables
3. [ ] Build scraper prototype (test on 10 sites)
4. [ ] Draft LLM prompts + test on sample policies
5. [ ] Wireframe dashboard in Figma

**Week 2:**
1. [ ] Implement API endpoints
2. [ ] Build React dashboard
3. [ ] Integrate LLM analysis
4. [ ] Test end-to-end flow

**Week 3:**
1. [ ] Polish UI
2. [ ] Add email notifications
3. [ ] Create landing page
4. [ ] Write launch blog post

---

## Appendix A: Sample Compliance Rubric

```json
{
  "ai_disclosure": {
    "weight": 0.25,
    "checks": [
      {
        "id": "ai_001",
        "question": "Is AI/ML use disclosed on homepage or product page?",
        "severity": "high",
        "keywords": ["AI", "artificial intelligence", "machine learning", "automated"]
      },
      {
        "id": "ai_002",
        "question": "Are AI-generated outputs labeled as synthetic?",
        "severity": "medium",
        "keywords": ["generated by", "AI-created", "synthetic"]
      }
    ]
  },
  "gdpr_compliance": {
    "weight": 0.30,
    "checks": [
      {
        "id": "gdpr_001",
        "question": "Is there a privacy policy?",
        "severity": "critical"
      },
      {
        "id": "gdpr_002",
        "question": "Are data retention periods specified?",
        "severity": "high",
        "keywords": ["retain", "delete after", "retention period"]
      }
    ]
  }
}
```

---

**Document Version:** 1.0  
**Last Updated:** November 10, 2025  
**Owner:** Beneficial Legal / Complai  
**Reviewers:** [To be assigned]

