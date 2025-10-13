# Supabase Setup Guide for Contact Form Submissions

This guide will help you set up Supabase to receive and store contact form submissions from your website.

## Prerequisites

- A Supabase account (free tier is fine) - [Sign up here](https://supabase.com)
- Access to your project's Supabase dashboard

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Choose your organization
4. Enter project details:
   - **Name**: `malama-carbon-homepage` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

## Step 2: Create the Database Table

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Copy and paste the contents of `supabase/migrations/001_create_contact_submissions.sql`
4. Click **"Run"** (or press Ctrl/Cmd + Enter)
5. You should see: ✅ **"Success. No rows returned"**

### What this creates:
- A `contact_submissions` table to store all form data
- Indexes for fast querying by email and date
- Row Level Security (RLS) policies that allow:
  - Anyone to submit forms (anonymous users)
  - Only authenticated admins to read submissions

## Step 3: Get Your API Credentials

1. In your Supabase dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** under Project Settings
3. Find these two values in the **"Project API keys"** section:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long JWT token starting with `eyJ...`)

## Step 4: Add Credentials to Your Project

1. Create a `.env.local` file in your project root (if it doesn't exist):
   ```bash
   touch .env.local
   ```

2. Add your credentials:
   ```bash
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Important**: Never commit `.env.local` to git! It should already be in `.gitignore`

## Step 5: Add Credentials to Vercel (Production)

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add two variables:
   - **Name**: `VITE_SUPABASE_URL`  
     **Value**: Your Project URL
   - **Name**: `VITE_SUPABASE_ANON_KEY`  
     **Value**: Your anon public key
4. Click **"Save"**
5. Redeploy your site for changes to take effect

## Step 6: Test the Form

1. Start your dev server: `npm run dev`
2. Go to the Contact page: `http://localhost:5173/contact`
3. Fill out and submit the form
4. Check the browser console for: ✅ **"Form submitted successfully to database"**
5. In Supabase dashboard, go to **"Table Editor"** → **"contact_submissions"**
6. You should see your test submission!

## Viewing Form Submissions

### Option 1: Supabase Dashboard (Easy)
1. Go to your Supabase dashboard
2. Click **"Table Editor"** in the left sidebar
3. Click **"contact_submissions"** table
4. View all submissions with full search and filtering

### Option 2: SQL Query (Advanced)
```sql
SELECT 
  name, 
  email, 
  company, 
  inquiry_type, 
  message, 
  created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 50;
```

## Optional: Email Notifications

To receive an email whenever someone submits the form, you can use Supabase Database Webhooks:

1. Go to **"Database"** → **"Webhooks"** in Supabase dashboard
2. Click **"Create a new hook"**
3. Configure to send POST request to services like:
   - Zapier (connect to Gmail/Slack)
   - Make.com (advanced automation)
   - Your own email service

Or create a Supabase Edge Function (more advanced).

## Troubleshooting

### Forms open email client instead of submitting
**Issue**: Environment variables not set  
**Fix**: Make sure `.env.local` has correct credentials and restart dev server

### "Failed to submit" error
**Issue**: Wrong credentials or RLS policy issue  
**Fix**: 
1. Check credentials in `.env.local`
2. Make sure SQL migration ran successfully
3. Check browser console for detailed error

### Submissions not appearing in database
**Issue**: RLS policies blocking inserts  
**Fix**: Re-run the migration SQL to ensure policies are correct

### Production works but local development doesn't
**Issue**: `.env.local` file missing or incorrect  
**Fix**: Create `.env.local` with credentials from Supabase dashboard

## Security Notes

- ✅ The `anon` key is safe to expose publicly (it's client-side)
- ✅ RLS policies prevent unauthorized access to submissions
- ✅ Only allow inserts from your domain (optional: add origin validation)
- ⚠️ Never expose your `service_role` key - it bypasses all security

## What Happens Now

1. **Before Supabase setup**: Forms use mailto (opens email client)
2. **After Supabase setup**: Forms submit directly to database
3. **Fallback**: If Supabase fails, falls back to mailto automatically

## Next Steps

- Set up email notifications for new submissions
- Create an admin dashboard to view submissions
- Export submissions to CSV for analysis
- Set up automated follow-up workflows

---

**Need help?** Check the [Supabase Documentation](https://supabase.com/docs) or [contact support](mailto:tyler@malamalabs.com).

