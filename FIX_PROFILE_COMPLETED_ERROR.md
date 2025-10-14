# 🔧 Fix: Column profiles.profile_completed Does Not Exist

## Error You're Seeing

```
No profile found yet: {
  code: '42703', 
  details: null, 
  hint: null, 
  message: 'column profiles.profile_completed does not exist'
}
```

This error appears when loading the dashboard because the `profiles` table is missing a required column.

---

## ⚡ Quick Fix (2 minutes)

### Step 1: Go to Supabase SQL Editor

1. Open your Supabase Dashboard
2. Click **SQL Editor** (left sidebar)
3. Click **New query**

### Step 2: Copy and Paste This SQL

```sql
-- Add profile_completed column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT FALSE;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_completed 
ON public.profiles(profile_completed);

-- Verify it worked
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;
```

### Step 3: Run the Query

1. Click **Run** (or press Cmd/Ctrl + Enter)
2. You should see a table showing all columns including `profile_completed`

### Step 4: Reload Your Dashboard

1. Go to `https://malamalabs.com/dashboard`
2. Hard refresh (Cmd+Shift+R or Ctrl+Shift+F5)
3. Error should be gone! ✅

---

## What This Column Does

**`profile_completed`** is a boolean flag that tracks whether a user has finished their role-specific questionnaire.

### Usage in the App:

- **ProfileCompletionBanner**: Shows role cards if `false`, hides if `true`
- **QuestionnaireTodoCard**: Shows to-do card if `false`, hides if `true`
- **Progress Calculation**: Contributes 15% to overall completion percentage
- **Dashboard Logic**: Determines which components to show

### Values:

- `FALSE` (default) - User hasn't completed questionnaire yet
- `TRUE` - User completed questionnaire, profile is 100% done
- `NULL` - Same as `FALSE` (treated as incomplete)

---

## Why This Happened

The column was referenced in the new dashboard components but wasn't in the original database schema. This is common when adding new features!

The migration files are now in your repo:
- `supabase/migrations/010_add_profile_completed_column.sql`
- `supabase/migrations/COPY_PASTE_010_profile_completed.sql`

---

## Verify It's Fixed

After running the SQL, check these:

### 1. No Console Errors

Open browser DevTools (F12) → Console

**Before:**
```
❌ No profile found yet: column profiles.profile_completed does not exist
```

**After:**
```
✅ (No error, profile loads successfully)
```

### 2. Dashboard Loads

You should see:
- ✅ Welcome message
- ✅ Profile completion banner
- ✅ Role selection cards (if no role selected)
- ✅ Questionnaire to-do (if role selected but not completed)

### 3. Profile Loads

Run this in Supabase SQL Editor to see your profile:

```sql
SELECT * FROM public.profiles WHERE user_id = auth.uid();
```

You should see:
- `user_id`: Your UUID
- `full_name`: Your name
- `role`: NULL or your selected role
- `org_name`: NULL or your org
- `profile_completed`: FALSE (default)
- `created_at`: Timestamp
- `updated_at`: Timestamp

---

## What Happens Next

### When You Select a Role:

1. Click role card in dashboard
2. `role` column is set (e.g., `'PROJECT_DEVELOPER'`)
3. `profile_completed` stays `FALSE`
4. Progress bar shows 50%

### When You Complete Questionnaire:

1. Fill out role-specific questions
2. Submit form
3. `profile_completed` is set to `TRUE`
4. `org_name` and other fields are filled
5. Progress bar shows 100%
6. ProfileCompletionBanner disappears
7. QuestionnaireTodoCard disappears
8. You get full dashboard access!

---

## Related Fixes Needed

While you're in Supabase SQL Editor, you might want to run these other fixes too:

### 1. Fix RLS Policies (406 Errors)

```sql
-- Allow authenticated users to read all profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Allow all authenticated reads" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);
```

### 2. Verify All Columns Exist

```sql
-- Check what columns you have
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;
```

**Should see:**
- user_id (uuid)
- full_name (text)
- role (text)
- org_name (text)
- profile_completed (boolean) ← The new one!
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

---

## If It Still Doesn't Work

### Check 1: Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the refresh button
3. "Empty Cache and Hard Reload"

### Check 2: Check Supabase Connection

In browser console:
```javascript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
```

Should show your Supabase project URL and `true`.

### Check 3: Verify Migration Ran

In Supabase SQL Editor:
```sql
SELECT COUNT(*) as has_column
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'profiles'
AND column_name = 'profile_completed';
```

Should return `1` (column exists).

---

## Success Checklist

- [ ] SQL migration run in Supabase
- [ ] `profile_completed` column exists in `profiles` table
- [ ] Dashboard loads without console errors
- [ ] Can see profile completion banner
- [ ] Can select role (saves to database)
- [ ] Can see questionnaire to-do card
- [ ] Progress bar updates correctly

---

## Files to Reference

- **Migration:** `supabase/migrations/COPY_PASTE_010_profile_completed.sql`
- **Dashboard:** `src/components/dashboards/AuthenticatedDashboard.tsx`
- **Banner:** `src/components/dashboard/ProfileCompletionBanner.tsx`
- **To-Do:** `src/components/dashboard/QuestionnaireTodoCard.tsx`

---

**After this fix, your dashboard should work perfectly!** 🎉

If you still see errors, check the other fixes mentioned or let me know what error you're seeing.

