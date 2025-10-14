# 🎯 Admin Dashboard & Profile Images Setup

## ✅ What's New

### 1. **Admin Analytics Dashboard** 
Full-featured analytics dashboard with real-time data visualization

### 2. **Supabase Storage for Profile Images**
Persistent cloud storage for user profile photos and company logos

---

## 🚀 Quick Setup (10 Minutes)

### Step 1: Run Analytics Tables (If Not Done)

Go to Supabase SQL Editor and run:
```sql
-- File: supabase/migrations/COPY_PASTE_002_analytics.sql
```

### Step 2: Create Admin Role

Go to Supabase SQL Editor and run:
```sql
-- File: supabase/migrations/003_create_admin_role.sql
```

This will:
- ✅ Set tyler@malamalabs.com as admin
- ✅ Set tylermalin@gmail.com as admin  
- ✅ Create `is_admin()` helper function
- ✅ Create `admin_users` view

### Step 3: Create Profile Images Bucket

Go to Supabase SQL Editor and run:
```sql
-- File: supabase/migrations/004_create_profile_images_bucket.sql
```

This creates:
- ✅ `profile-images` storage bucket
- ✅ RLS policies (users can only edit their own images)
- ✅ Public read access
- ✅ 5MB file size limit
- ✅ Image format validation (JPEG, PNG, GIF, WebP)

### Step 4: Verify Setup

1. **Check Admin Role:**
   ```sql
   SELECT * FROM admin_users;
   ```
   You should see tyler@malamalabs.com listed.

2. **Check Storage Bucket:**
   - Go to **Storage** in Supabase
   - You should see `profile-images` bucket
   - Check that it's marked as **Public**

---

## 📊 Admin Dashboard

### Access

**URL:** `https://malamalabs.com/admin`  
**Alternate:** `https://malamalabs.com/analytics`

### Features

#### Real-Time Metrics
- Total Users
- Page Views (last N days)
- CTA Clicks
- Presentation Opens
- Contact Submissions
- Onboarding Completions
- Advisory Applications
- Projects Created
- Errors Logged

#### Time Range Filtering
- Last 7 days
- Last 30 days
- Last 90 days
- Last 365 days (1 year)

#### Data Views
- **Presentation Engagement** - Which decks are being viewed
- **Top CTAs** - Most clicked buttons
- **Recent Contact Submissions** - Full details of inquiries
- **Referral Performance** - UTM tracking and referral codes

#### Export Functionality
Export any table to CSV:
- contact_submissions
- presentation_clicks
- slide_views
- page_views
- cta_clicks
- onboarding_submissions
- advisory_applications
- projects
- user_profiles
- form_abandonments
- error_logs

### Dashboard Sections

#### 1. Metrics Overview (9 Cards)
```
┌─────────────┬─────────────┬─────────────┐
│ Total Users │ Page Views  │ CTA Clicks  │
├─────────────┼─────────────┼─────────────┤
│ Presentations│ Contacts   │ Onboarding  │
├─────────────┼─────────────┼─────────────┤
│ Advisory    │ Projects    │ Errors      │
└─────────────┴─────────────┴─────────────┘
```

#### 2. Presentation Engagement
```
SAFE Round Deck       →  45 clicks
Buyers Presentation   →  32 clicks
Projects Presentation →  28 clicks
```

#### 3. Top CTAs
```
Get Started           →  hero          →  127 clicks
Schedule Demo         →  hero          →  89 clicks
For Project Developer →  hero          →  67 clicks
```

#### 4. Recent Contact Submissions
```
┌──────────────────────────────────────────────┐
│ John Doe (john@example.com)                  │
│ Company: Carbon Solutions Inc                │
│ Type: Partnership Inquiry                    │
│ Message: Looking to integrate...             │
│ Date: Oct 14, 2025                          │
└──────────────────────────────────────────────┘
```

---

## 📸 Profile Image Storage

### How It Works

1. **User Upload**
   - User clicks camera icon on profile
   - Selects image (JPEG, PNG, GIF, WebP)
   - Image uploads to Supabase Storage
   - Old image automatically deleted
   - Profile updated with new URL

2. **Storage Structure**
   ```
   profile-images/
     {user_id}/
       profile.jpg
   ```

3. **Database Integration**
   - URL saved to `user_profiles.profile_image_url`
   - Automatically loaded on dashboard mount
   - Persists across sessions and devices

### Features

✅ **Automatic Upload** - Files upload to cloud storage  
✅ **5MB Limit** - Prevents large file uploads  
✅ **Format Validation** - Only allows image types  
✅ **Auto Cleanup** - Old images deleted automatically  
✅ **Public URLs** - Images accessible via public URL  
✅ **RLS Security** - Users can only edit their own images  
✅ **Preview** - Instant preview while uploading  

### Storage Policies (RLS)

```sql
-- Users can upload their own images
CREATE POLICY "Users can upload own profile image"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'profile-images' AND foldername = user_id);

-- Public read access
CREATE POLICY "Public can view profile images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'profile-images');
```

### API Usage

```typescript
import { analytics } from '@/lib/analytics';

// Upload image
const result = await analytics.uploadProfileImage({
  userId: user.id,
  file: imageFile
});

if (result.success) {
  console.log('Image URL:', result.url);
}

// Get image URL
const imageUrl = await analytics.getProfileImageUrl(user.id);
```

---

## 🔐 Admin Role System

### Check If User Is Admin

**SQL Function:**
```sql
SELECT is_admin(); -- Returns true/false
```

**In Code:**
```typescript
const { data: { user } } = await supabase.auth.getUser();
const isAdmin = user?.user_metadata?.role === 'admin';
```

### Add New Admin

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'newadmin@malamalabs.com';
```

### View All Admins

```sql
SELECT * FROM admin_users;
```

---

## 📈 Analytics Queries

### Daily Stats

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_views
FROM page_views
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Top Pages

```sql
SELECT 
  page_name,
  COUNT(*) as views,
  COUNT(DISTINCT session_id) as unique_visitors
FROM page_views
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY page_name
ORDER BY views DESC
LIMIT 10;
```

### Conversion Funnel

```sql
-- Homepage → Get Started → Account Created
SELECT 
  'Homepage Views' as step,
  COUNT(DISTINCT session_id) as count
FROM page_views
WHERE page_name = 'home'
UNION ALL
SELECT 
  'Get Started Clicks' as step,
  COUNT(DISTINCT session_id) as count
FROM cta_clicks
WHERE button_label = 'Get Started'
UNION ALL
SELECT 
  'Accounts Created' as step,
  COUNT(*) as count
FROM user_profiles;
```

### Referral ROI

```sql
SELECT 
  referral_code,
  COUNT(DISTINCT user_id) as signups,
  COUNT(*) as total_interactions,
  (COUNT(DISTINCT user_id)::float / COUNT(*)::float * 100)::numeric(10,2) as conversion_rate
FROM (
  SELECT referral_code, user_id FROM page_views
  UNION ALL
  SELECT referral_code, user_id FROM cta_clicks
) combined
WHERE referral_code IS NOT NULL
GROUP BY referral_code
ORDER BY signups DESC;
```

---

## 🎨 Dashboard Customization

### Adding New Metric Cards

Edit `src/components/AdminAnalyticsDashboard.tsx`:

```typescript
const metricCards: MetricCard[] = [
  // ... existing cards ...
  {
    title: 'New Metric',
    value: metrics.newMetric,
    icon: TrendingUp,
    color: 'text-blue-500',
  }
];
```

### Adding New Data Tables

1. Add SQL query to `loadAnalytics()`:
```typescript
const newData = await supabase
  .from('your_table')
  .select('*')
  .gte('created_at', isoDate);
```

2. Add state:
```typescript
const [newData, setNewData] = useState<any[]>([]);
```

3. Add card to JSX:
```typescript
<Card>
  <CardHeader>
    <CardTitle>Your New Data</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Render your data */}
  </CardContent>
</Card>
```

---

## 🔍 Troubleshooting

### Admin Dashboard Not Showing Data

1. **Check if tables exist:**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

2. **Check if you're admin:**
   ```sql
   SELECT raw_user_meta_data->>'role' as role
   FROM auth.users
   WHERE email = 'your@email.com';
   ```

3. **Check browser console for errors**

### Profile Images Not Uploading

1. **Check bucket exists:**
   - Go to Supabase → Storage
   - Verify `profile-images` bucket exists
   - Check it's marked as **Public**

2. **Check RLS policies:**
   ```sql
   SELECT * FROM pg_policies
   WHERE tablename = 'objects'
   AND schemaname = 'storage';
   ```

3. **Check file size and type:**
   - Must be < 5MB
   - Must be JPEG, PNG, GIF, or WebP

4. **Check browser console for detailed errors**

### Images Not Loading

1. **Check public URL is correct:**
   ```typescript
   const { data } = supabase.storage
     .from('profile-images')
     .getPublicUrl('user_id/profile.jpg');
   console.log(data.publicUrl);
   ```

2. **Check bucket is public:**
   - Supabase → Storage → profile-images
   - Verify "Public" toggle is ON

3. **Try accessing URL directly in browser**

---

## 📊 Data Export

### Manual Export (CSV)

1. Go to `/admin` dashboard
2. Scroll to "Export Data" section
3. Click button for table you want
4. CSV will download automatically

### Programmatic Export

```typescript
const { data } = await supabase
  .from('contact_submissions')
  .select('*')
  .csv();
```

### Connect to BI Tool

**Connection String:**
```
Host: db.{project-ref}.supabase.co
Port: 5432
Database: postgres
User: postgres
Password: {your-db-password}
```

**Recommended Tools:**
- Metabase (open-source)
- Google Sheets (via Supabase connection)
- Tableau
- Power BI

---

## 🎯 Next Steps

### Optional Enhancements

1. **Real-Time Dashboard**
   - Add WebSocket subscription
   - Live update metrics

2. **Advanced Filters**
   - Filter by user type
   - Filter by referral code
   - Custom date ranges

3. **Automated Reports**
   - Daily email digest
   - Weekly summary
   - Monthly analytics

4. **A/B Testing**
   - Track experiment variants
   - Compare conversion rates

5. **User Segmentation**
   - Cohort analysis
   - Retention curves
   - User journey mapping

---

## 🔒 Security Notes

### Admin Access
- Only users with `role: admin` in metadata can access `/admin`
- All queries are server-side validated
- No direct database access from frontend

### Profile Images
- RLS ensures users can only upload/delete their own images
- Public read access is intentional (for profile display)
- File type and size validation prevents abuse
- Old images auto-deleted to prevent storage bloat

### Data Privacy
- Contact form submissions visible only to admins
- User profiles protected by RLS
- No PII in analytics events (only session IDs)

---

## ✅ Verification Checklist

- [ ] Ran `002_comprehensive_analytics.sql`
- [ ] Ran `003_create_admin_role.sql`
- [ ] Ran `004_create_profile_images_bucket.sql`
- [ ] Verified admin role: `SELECT * FROM admin_users;`
- [ ] Verified storage bucket exists in Supabase UI
- [ ] Tested `/admin` dashboard access
- [ ] Uploaded test profile image
- [ ] Verified image persists after reload
- [ ] Tested CSV export functionality
- [ ] Checked browser console for errors

---

## 📞 Support

### Resources
- **Analytics Setup:** See `ANALYTICS_SETUP.md`
- **Quick Start:** See `QUICK_START_ANALYTICS.md`
- **Interaction Map:** See `INTERACTION_MAP.md`
- **Supabase Docs:** https://supabase.com/docs

### Common Issues
- If dashboard shows 0 data → Tables might not be created yet
- If image upload fails → Check bucket RLS policies
- If not recognized as admin → Run admin role SQL again

---

**Last Updated:** 2025-10-14  
**Version:** 1.0.0  
**Status:** ✅ Deployed to Production

