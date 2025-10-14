# 📊 Mālama Labs - Comprehensive Analytics Setup

## Overview

This document describes the complete analytics and tracking system for the Mālama Labs website. All user interactions are tracked and stored in Supabase for analysis.

---

## 🎯 What's Tracked

### 1. **Presentation Analytics**
- **Presentation Click Tracking**: Tracks when users click on presentation cards
- **Slide View Tracking**: Individual slide views, time spent, navigation patterns
- **Session Tracking**: Unique viewing sessions per deck

### 2. **Navigation & Engagement**
- **Page Views**: All page navigations across the site
- **CTA Clicks**: Call-to-action button clicks with location context
- **Referral Codes**: UTM and referral parameter tracking

### 3. **User Forms & Submissions**
- **Contact Form**: General inquiries
- **Onboarding Forms**: Get Started flow for all 4 user types (Steward, Developer, Buyer, Partner)
- **Advisory Board Applications**: Full application form data
- **Form Abandonment**: Where users drop off in multi-step forms

### 4. **Project Management**
- **Project Creation**: User-created carbon projects
- **Project Updates**: Metrics, status changes, progress
- **Project Analytics**: Carbon sequestered, sensors, credits issued

### 5. **User Profiles**
- **Profile Data**: Extended user information beyond auth
- **Profile Types**: Multi-role support (Project Developer + Buyer)
- **Company Information**: Business details for B2B

### 6. **Error Tracking**
- **Client-Side Errors**: Unhandled JavaScript errors
- **API Errors**: Failed requests and responses
- **Promise Rejections**: Unhandled async errors

---

## 📁 Database Schema

### Tables Created

1. **`presentation_clicks`** - Presentation deck click tracking
2. **`slide_views`** - Individual slide view analytics
3. **`page_views`** - Website page view tracking
4. **`cta_clicks`** - CTA button click tracking
5. **`onboarding_submissions`** - Get Started form submissions
6. **`advisory_applications`** - Advisory Board applications
7. **`projects`** - User carbon projects
8. **`user_profiles`** - Extended user profiles
9. **`form_abandonments`** - Form abandonment tracking
10. **`error_logs`** - Client-side error tracking

### Analytics Views

1. **`presentation_funnel`** - Presentation engagement metrics
2. **`daily_active_users`** - DAU tracking
3. **`top_ctas`** - Most clicked buttons
4. **`referral_performance`** - Referral code effectiveness

---

## 🚀 Setup Instructions

### Step 1: Run SQL Migration

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Open the file: `supabase/migrations/COPY_PASTE_002_analytics.sql`
4. Copy the entire contents
5. Paste into Supabase SQL Editor
6. Click **Run**

**Expected Output:**
```
Success. No rows returned
```

### Step 2: Verify Tables

1. Go to **Table Editor** in Supabase
2. You should see all 10 new tables listed
3. Click on each table to verify structure

### Step 3: Test Analytics (Already Done!)

The analytics library is already integrated into your codebase at `src/lib/analytics.ts`.

---

## 💻 Usage Examples

### Track a Page View

```typescript
import { analytics } from '@/lib/analytics';

// Automatically called on page navigation
await analytics.trackPageView({
  pageName: 'home',
  pagePath: '/'
});
```

### Track a CTA Click

```typescript
import { analytics } from '@/lib/analytics';

// On button click
await analytics.trackCTAClick({
  buttonLabel: 'Get Started',
  buttonLocation: 'hero',
  pageName: 'home',
  destination: '/onboarding/v2'
});
```

### Track Presentation Engagement

```typescript
import { analytics } from '@/lib/analytics';

// When user opens a presentation
await analytics.trackPresentationClick({
  deckKey: 'BUYERS'
});

// When user views a slide
await analytics.trackSlideView({
  deckKey: 'BUYERS',
  slideNumber: 3,
  slideTitle: 'Market Opportunity',
  timeOnSlide: 45 // seconds
});
```

### Submit Onboarding Form

```typescript
import { analytics } from '@/lib/analytics';

// When user completes Get Started flow
await analytics.submitOnboarding({
  userId: user.id,
  userType: 'developer',
  formData: {
    email: 'user@example.com',
    projectDescription: '...',
    // ... all form fields
  }
});
```

### Create a Project

```typescript
import { analytics } from '@/lib/analytics';

// When user creates a project in dashboard
const result = await analytics.createProject({
  userId: user.id,
  name: 'Hawaii Biochar Project',
  location: 'Maui, HI',
  projectType: 'Biochar',
  description: 'Converting agricultural waste to biochar'
});

if (result.success) {
  console.log('Project created:', result.data);
}
```

### Update User Profile

```typescript
import { analytics } from '@/lib/analytics';

// When user updates their profile
await analytics.createOrUpdateUserProfile({
  userId: user.id,
  fullName: 'John Doe',
  companyName: 'Carbon Solutions Inc',
  profileTypes: ['Project Developer', 'Carbon Credit Buyer'],
  industry: 'Carbon Markets',
  phone: '+1-555-0123',
  website: 'https://example.com'
});
```

### Track Form Abandonment

```typescript
import { analytics } from '@/lib/analytics';

// When user leaves a form incomplete
await analytics.trackFormAbandonment({
  formType: 'onboarding_developer',
  stepNumber: 2,
  stepName: 'Project Details',
  completedFields: {
    email: true,
    projectType: true,
    description: false
  }
});
```

### Track Errors

```typescript
import { analytics } from '@/lib/analytics';

// Manual error tracking
try {
  await someAsyncOperation();
} catch (error) {
  await analytics.trackError({
    errorType: 'api_error',
    errorMessage: error.message,
    errorStack: error.stack,
    pageName: 'dashboard',
    extraData: { endpoint: '/api/projects' }
  });
}
```

---

## 🔍 Query Examples (SQL)

### Top 10 Most Viewed Pages (Last 30 Days)

```sql
SELECT 
  page_name,
  COUNT(*) as total_views,
  COUNT(DISTINCT COALESCE(user_id::text, session_id)) as unique_visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY page_name
ORDER BY total_views DESC
LIMIT 10;
```

### Presentation Engagement Funnel

```sql
SELECT 
  deck_key,
  COUNT(DISTINCT session_id) as deck_opens,
  COUNT(*) as total_slides_viewed,
  AVG(time_on_slide)::integer as avg_seconds_per_slide,
  MAX(slide_number) as furthest_slide
FROM slide_views
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY deck_key;
```

### Onboarding Conversion by User Type

```sql
SELECT 
  user_type,
  COUNT(*) as total_submissions,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(LENGTH(form_data::text)) as avg_form_completeness
FROM onboarding_submissions
GROUP BY user_type
ORDER BY total_submissions DESC;
```

### Top CTA Buttons by Conversion

```sql
SELECT 
  button_label,
  button_location,
  page_name,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT COALESCE(user_id::text, session_id)) as unique_clickers
FROM cta_clicks
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY button_label, button_location, page_name
ORDER BY total_clicks DESC
LIMIT 20;
```

### User Projects Dashboard

```sql
SELECT 
  u.email,
  COUNT(p.id) as total_projects,
  SUM(p.carbon_sequestered) as total_carbon,
  SUM(p.credits_issued) as total_credits,
  AVG(p.progress) as avg_progress
FROM user_profiles up
JOIN auth.users u ON u.id = up.user_id
LEFT JOIN projects p ON p.user_id = up.user_id
GROUP BY u.email
ORDER BY total_projects DESC;
```

### Referral Code Performance

```sql
SELECT * FROM referral_performance
WHERE unique_visitors > 5
ORDER BY presentation_opens DESC;
```

### Error Rate by Page

```sql
SELECT 
  page_name,
  error_type,
  COUNT(*) as error_count,
  COUNT(DISTINCT user_id) as affected_users,
  MAX(created_at) as last_occurrence
FROM error_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY page_name, error_type
ORDER BY error_count DESC;
```

---

## 🔒 Security & Privacy

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Public Insert**: Anonymous and authenticated users can insert data (forms, clicks, views)
- **Authenticated Read**: Only authenticated users can read analytics data
- **User-Scoped**: Users can only read/write their own data (projects, profiles, onboarding)
- **Admin Access**: Future admin role can access all data

### Data Retention

Recommended retention policies:

- **Page Views**: 90 days
- **Click Events**: 180 days
- **Form Submissions**: Indefinite (required for business)
- **Error Logs**: 30 days
- **User Data**: Indefinite (until account deletion)

### GDPR Compliance

To delete a user's data:

```sql
-- All user data will cascade delete automatically
DELETE FROM auth.users WHERE id = 'user-uuid-here';
```

---

## 📈 Analytics Dashboards

### Supabase Dashboard Setup

1. Go to **SQL Editor**
2. Create saved queries for each report type
3. Use Supabase's built-in charting or export to Google Sheets/Metabase

### Recommended Dashboards

1. **Overview Dashboard**
   - DAU/MAU
   - Top pages
   - Top CTAs
   - Referral performance

2. **Presentation Analytics**
   - Deck opens by type
   - Slide completion rate
   - Average time per deck
   - Drop-off points

3. **User Acquisition**
   - New signups by type
   - Onboarding completion rate
   - Form abandonment points
   - Referral conversion

4. **Project Analytics**
   - Total projects created
   - Carbon metrics
   - Credits issued
   - Project status distribution

5. **Error Monitoring**
   - Error rate over time
   - Top errors
   - Affected pages
   - User impact

---

## 🛠 Troubleshooting

### Analytics Not Tracking

1. **Check Supabase Credentials**
   ```bash
   # In Vercel or .env.local
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Check Browser Console**
   - Look for "Analytics" or "Tracking" errors
   - Verify Supabase connection

3. **Check RLS Policies**
   - Run SQL query to verify policies exist
   - Test with authenticated user

### Database Errors

1. **Constraint Violations**
   - Check data types match schema
   - Verify foreign key references

2. **Performance Issues**
   - Verify indexes are created
   - Consider partitioning large tables

---

## 🚀 Next Steps

### Phase 1: Foundation (✅ Complete)
- [x] Create all database tables
- [x] Set up RLS policies
- [x] Create analytics library
- [x] Integrate with existing code

### Phase 2: Enhanced Tracking
- [ ] Add page view tracking to all pages
- [ ] Add CTA tracking to all buttons
- [ ] Implement slide view tracking in presentations
- [ ] Add form abandonment tracking

### Phase 3: Reporting
- [ ] Create Supabase Dashboard queries
- [ ] Set up automated reports
- [ ] Build admin analytics page
- [ ] Export to BI tool (optional)

### Phase 4: Optimization
- [ ] A/B testing framework
- [ ] Heatmap tracking
- [ ] Session replay
- [ ] Conversion funnel analysis

---

## 📞 Support

For issues or questions:
1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Review this guide
3. Check console logs for detailed errors
4. Contact the development team

---

**Last Updated**: 2025-10-14  
**Version**: 1.0.0  
**Author**: Mālama Labs Development Team

