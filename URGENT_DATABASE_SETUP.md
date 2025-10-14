# 🚨 URGENT: Fix Database Errors

## What's Happening

You're seeing these errors because the **Onboarding V2 database tables haven't been created yet** in your Supabase project:

### Errors You're Seeing:
- ❌ `404 Not Found` - Missing tables (`profiles`, `task_templates`, etc.)
- ❌ `403 Forbidden` - RLS policies blocking inserts
- ❌ `406 Not Acceptable` - Query format issues

---

## 🎯 Quick Fix (5 minutes)

### Step 1: Run the Comprehensive Fix SQL

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click **"SQL Editor"** in the left sidebar
   - Click **"New Query"**

3. **Copy & Paste This File:**
   ```
   supabase/migrations/FIX_ALL_ERRORS.sql
   ```

4. **Run It**
   - Click **"Run"** button
   - Wait for success message

### Step 2: Verify Tables Were Created

After running the SQL, verify in Supabase:

1. Go to **Table Editor** (left sidebar)
2. You should now see these tables:
   - ✅ `profiles`
   - ✅ `task_templates` (with 20 rows)
   - ✅ `user_tasks`
   - ✅ `onboarding_answers`
   - ✅ `admin_users`
   - ✅ `user_invites`

### Step 3: Test Onboarding

1. Go to your website: `https://www.malamalabs.com/onboarding/v2`
2. Select a role
3. Complete the questionnaire
4. You should now see your dashboard!

---

## What the Fix SQL Does

The `FIX_ALL_ERRORS.sql` file:

### ✅ Creates Tables:
1. **`profiles`** - Stores user role and basic info
2. **`task_templates`** - Pre-defined tasks for each role (20 tasks seeded)
3. **`user_tasks`** - User's personalized task list
4. **`onboarding_answers`** - Stores survey responses

### ✅ Sets Up Security:
- Row Level Security (RLS) policies
- Users can only see/edit their own data
- Task templates are readable by all authenticated users

### ✅ Fixes Analytics:
- Creates `referral_performance` view
- Creates `get_top_pages()` function
- Resolves 404 errors in admin dashboard

---

## Alternative: Run Individual Migrations

If you prefer to run migrations separately (not recommended):

### Option A: All-in-One
```sql
-- Run this single file:
supabase/migrations/FIX_ALL_ERRORS.sql
```

### Option B: Step-by-Step
```sql
-- Run these in order:
1. supabase/migrations/COPY_PASTE_009_user_invites_STANDALONE.sql
2. supabase/migrations/COPY_PASTE_007_onboarding_v2_FIXED.sql
```

---

## Troubleshooting

### Still Getting Errors?

#### Error: "policy already exists"
- **Solution:** The SQL is idempotent - it drops existing policies first
- This is normal and safe

#### Error: "permission denied for table"
- **Solution:** Make sure you're running as the project owner
- Try running from Supabase Dashboard SQL Editor

#### Tables created but RLS errors persist
- **Solution:** Sign out and sign back in
- RLS policies need fresh session

#### Can't see tables in Table Editor
- **Solution:** Refresh the Supabase Dashboard page
- Check you're looking in the **public** schema

---

## What Happens Next

### After Running the SQL:

1. **Onboarding Works** ✅
   - Users can select roles
   - Forms save data
   - No more 403/404 errors

2. **Dashboard Displays** ✅
   - User profile information
   - Next steps based on role
   - Task progress tracking

3. **Admin Panel Works** ✅
   - View all users
   - See onboarding responses
   - Track user progress

---

## Current Error Breakdown

### From Your Console:

1. **`referral_performance` (404)**
   - Fixed by: Creating view in SQL ✅

2. **`get_top_pages` (404)**
   - Fixed by: Creating function in SQL ✅

3. **`profiles` (406/403)**
   - Fixed by: Creating table + RLS policies ✅

4. **`onboarding_answers` (403)**
   - Fixed by: Creating table + RLS policies ✅

5. **`user_tasks` (403)**
   - Fixed by: Creating table + RLS policies ✅

---

## File Contents Summary

### `FIX_ALL_ERRORS.sql` includes:

```sql
-- 1. Create all 4 onboarding tables
-- 2. Set up RLS policies for each
-- 3. Seed 20 task templates (5 per role)
-- 4. Create analytics view
-- 5. Create analytics function
-- 6. Success message with counts
```

**Total Lines:** ~320  
**Tables Created:** 4  
**Policies Created:** 12  
**Seeds Inserted:** 20  
**Functions Created:** 2

---

## Verification Checklist

After running the SQL, verify:

- [ ] SQL ran without errors
- [ ] Success message appeared
- [ ] Tables appear in Table Editor
- [ ] `task_templates` has 20 rows
- [ ] Can complete onboarding without errors
- [ ] Dashboard shows user profile
- [ ] Next steps appear in dashboard
- [ ] No console errors when submitting forms

---

## Need Help?

### If you're still stuck:

1. **Check the SQL output**
   - Did you see the success message?
   - Any error messages?

2. **Verify in Supabase**
   - Table Editor → Do tables exist?
   - SQL Editor → Run `SELECT COUNT(*) FROM profiles;`

3. **Clear browser cache**
   - Hard refresh (Cmd+Shift+R)
   - Try incognito mode

4. **Check Supabase logs**
   - Logs section in dashboard
   - Look for RLS policy errors

---

## Priority: Run This Now!

**👉 Action Required:**
1. Copy `supabase/migrations/FIX_ALL_ERRORS.sql`
2. Paste in Supabase SQL Editor
3. Click Run
4. Wait for success message
5. Test onboarding

**Time Required:** 2 minutes  
**Difficulty:** Copy/paste  
**Risk:** None (idempotent, safe to run multiple times)

---

**Status:** 🔴 **BLOCKING** - Website won't work until this is run  
**Next Step:** Run the SQL now!

