# Admin Dashboard - Quick Setup Guide

## ⚠️ Error Fix: "admin_users does not exist"

You got this error because the `admin_users` table hasn't been created yet. Use the standalone version below.

---

## 🚀 One-Step Setup

### Copy and Paste This SQL File:
```
supabase/migrations/COPY_PASTE_009_user_invites_STANDALONE.sql
```

This single file will:
✅ Create `admin_users` table (if needed)
✅ Add your admin emails (tyler@malamalabs.com, tylermalin@gmail.com)
✅ Create `user_invites` table
✅ Set up all RLS policies
✅ Create the `expire_old_invites()` function

---

## 📋 Steps

1. **Open Supabase Dashboard**
   - Go to your Supabase project
   - Click "SQL Editor" in the left sidebar

2. **Run the Migration**
   - Click "New Query"
   - Copy ALL contents from: `supabase/migrations/COPY_PASTE_009_user_invites_STANDALONE.sql`
   - Paste into the SQL editor
   - Click "Run"

3. **Verify Success**
   - You should see: "SUCCESS! Admin users and user invites tables created."
   - Check the "Tables" section - you should see:
     - `admin_users`
     - `user_invites`

4. **Test Admin Access**
   - Go to your website: `/admin`
   - Sign in with your email (tyler@malamalabs.com or tylermalin@gmail.com)
   - You should now see all 4 tabs!

---

## ✅ What This Creates

### Tables Created:

#### `admin_users`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | TEXT | Admin email (unique) |
| added_at | TIMESTAMPTZ | When admin was added |
| added_by | TEXT | Who added this admin |

**Your Admin Emails:**
- tyler@malamalabs.com ✅
- tylermalin@gmail.com ✅

#### `user_invites`
| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| email | TEXT | Invitee email |
| role | TEXT | Role (PROJECT_DEVELOPER, etc.) |
| message | TEXT | Personal note |
| invited_by | TEXT | Admin who sent invite |
| status | TEXT | pending/accepted/expired |
| created_at | TIMESTAMPTZ | When invite was sent |
| accepted_at | TIMESTAMPTZ | When invite was accepted |
| expires_at | TIMESTAMPTZ | Auto-set to 7 days later |

---

## 🔧 After Setup

Once the SQL runs successfully:

1. **Access Admin Dashboard**
   - Navigate to `/admin` on your website
   - Sign in if needed
   - You should see 4 tabs: Analytics | Users | Images | Invite

2. **Test Each Tab**
   - **Analytics**: Should show existing data
   - **Users**: Will show registered users from `profiles` table
   - **Images**: Will show uploaded images from storage buckets
   - **Invite**: Ready to send invitations!

3. **Invite Your First User**
   - Go to Invite tab
   - Enter email: `test@example.com`
   - Select role: Project Developer
   - Add message: "Welcome to Mālama Labs!"
   - Click "Send Invitation"

---

## 🐛 Troubleshooting

### "Still can't access admin dashboard"
- Make sure you're signed in with `tyler@malamalabs.com` or `tylermalin@gmail.com`
- Check that the SQL ran without errors
- Try signing out and back in

### "Users tab is empty"
- Normal if no users have completed onboarding V2 yet
- Users will appear after they register through `/onboarding/v2`

### "Images tab is empty"
- Normal if no one has uploaded profile images yet
- Upload an image from `/dashboard` to test

### "Need to add another admin"
Run this SQL:
```sql
INSERT INTO public.admin_users (email, added_by)
VALUES ('new-admin@example.com', 'tyler@malamalabs.com')
ON CONFLICT (email) DO NOTHING;
```

---

## 📊 What Works Now

✅ Full admin dashboard with 4 tabs
✅ User management (view, search, filter, delete)
✅ Image gallery (view, delete)
✅ User invitation system
✅ Logged-in users skip account creation in onboarding
✅ All 4 onboarding forms updated

---

## 🎉 You're All Set!

After running the SQL, your admin dashboard is **fully functional**!

Questions? Issues? Let me know!

