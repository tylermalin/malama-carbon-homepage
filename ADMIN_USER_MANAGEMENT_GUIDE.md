# 👥 Admin User Management Guide

## Overview

The enhanced Admin Dashboard now provides complete visibility and control over all registered users with data directly from Supabase Auth.

**Access:** `https://malamalabs.com/admin` (admin users only)

---

## 🎯 What You Can See

### User Table Columns

| Column | Description |
|--------|-------------|
| **User** | Name, email, organization |
| **Email Status** | ✅ Verified or ❌ Unverified with verification date |
| **Role** | User type (Project Developer, Credit Buyer, etc.) |
| **Last Sign In** | Most recent login date & time, or "Never" |
| **Created** | Account registration date |
| **Actions** | Send Email, View Details, Delete |

---

## 🛠️ Actions You Can Take

### 📧 Send Email to User

**What it does:** Sends a magic link email for instant sign-in

**How to use:**
1. Click the **📧 Send** button (blue)
2. A prompt will appear with the user's email
3. Add an optional custom message (or use default)
4. Click OK to send
5. User receives a magic link email to sign in

**Use cases:**
- Welcome new users
- Re-engage inactive users
- Help users who lost their password
- Send important updates

**Example message:**
> "Welcome to Mālama Labs! Click the link below to access your dashboard."

---

### 👁️ View User Details

**What it does:** Shows complete user information popup

**How to use:**
1. Click the **👁️ Eye** button (gray)
2. View popup with:
   - User ID
   - Full name
   - Email address
   - Email verification status
   - Role/type
   - Organization
   - Registration date & time
   - Last sign-in date & time

**Use cases:**
- Quick reference for user info
- Customer support inquiries
- Verify user details before taking action

---

### 🗑️ Delete User

**What it does:** Permanently removes user from auth.users and all related data

**How to use:**
1. Click the **🗑️ Trash** button (red)
2. **Warning popup** will show:
   ```
   ⚠️ Delete user [email]?
   
   This will:
   - Delete their profile
   - Delete all their projects
   - Delete all their tasks
   
   This action CANNOT be undone!
   ```
3. Click OK to confirm deletion

**⚠️ CRITICAL:** This action:
- Is **permanent** and **irreversible**
- Removes user from Supabase Auth
- Cascades to delete all related records
- Cannot be undone
- User will need to re-register

**Use cases:**
- Remove spam/fake accounts
- Comply with GDPR deletion requests
- Clean up test accounts

---

## 🔍 Search & Filters

### Search Bar

**What you can search:**
- User name
- Email address
- Organization name

**How to use:**
1. Type in the search box
2. Results filter in real-time
3. Clear search to see all users

**Examples:**
- `tyler` → finds Tyler Malin
- `@gmail.com` → finds all Gmail users
- `mālama` → finds Mālama Labs employees

---

### Filter Dropdown

**Filter options:**
- **All Users** - Show everyone
- **✅ Verified Email** - Only users who confirmed their email
- **❌ Unverified Email** - Only users awaiting email confirmation
- **Project Developers** - Filter by role
- **Tech Developers** - Filter by role
- **Credit Buyers** - Filter by role
- **Partners** - Filter by role

**Combine with search:**
- Filter by "Unverified Email"
- Search for `@gmail.com`
- → Find all unverified Gmail users

---

## 📊 Email Verification Status

### ✅ Verified Users

**Badge:** Green "✅ Verified"

**Shows:**
- User confirmed their email
- Verification date

**Actions:**
- Full access to platform
- Can receive all emails
- Trusted account

---

### ❌ Unverified Users

**Badge:** Yellow "❌ Unverified"

**Means:**
- User registered but didn't click verification link
- Email might be invalid or spam folder
- Limited access to platform

**What you can do:**
1. Click **📧 Send Email** to resend magic link
2. They can verify by clicking link
3. Or manually verify in Supabase Dashboard

**To manually verify:**
1. Go to Supabase Dashboard
2. Authentication → Users
3. Find user
4. Click ••• → "Verify email"

---

## 🔄 Refresh User List

**Button:** Top right of user table

**What it does:**
- Reloads all users from Supabase Auth
- Updates verification statuses
- Shows latest sign-in times

**Use after:**
- Sending emails
- Deleting users
- Suspecting stale data

---

## 📧 Email Verification Fix

**If users aren't receiving verification emails:**

See: `EMAIL_VERIFICATION_FIX.md`

**Quick fix:**
1. Set up SendGrid SMTP (free tier)
2. Configure in Supabase → Project Settings → Auth → SMTP
3. Test with new user registration

---

## 🔐 Security & Privacy

### What You CAN See:
✅ User emails (from auth.users)
✅ Email verification status
✅ Last sign-in times
✅ Registration dates
✅ Profile information (name, org, role)

### What You CANNOT See:
❌ **Passwords** (hashed, unrecoverable)
❌ Payment information
❌ Private messages
❌ Personal documents

**Passwords are stored as:**
```
$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa
```
This is **bcrypt hash** - one-way encryption. **This is correct and secure!**

---

## 🎯 Common Admin Tasks

### 1. Welcome New User

**Steps:**
1. Filter by "Unverified Email"
2. Find new registration
3. Click **📧 Send Email**
4. Add welcome message
5. Send magic link

**Template:**
> "Welcome to Mālama Labs! We're excited to have you. Click the link to access your dashboard and get started."

---

### 2. Re-engage Inactive Users

**Steps:**
1. Sort by "Last Sign In"
2. Find users who haven't logged in recently
3. Click **📧 Send Email**
4. Add personalized message
5. Send magic link

**Template:**
> "We noticed you haven't been active lately. Here's a quick link to jump back into your projects!"

---

### 3. Help User Who Can't Sign In

**Steps:**
1. Search for user email
2. Click **👁️ View Details**
3. Check email verification status
4. If unverified → Click **📧 Send Email**
5. If verified → They can use "Forgot Password"

---

### 4. Clean Up Test Accounts

**Steps:**
1. Search for test email patterns (`test@`, `demo@`, etc.)
2. Review user details
3. Confirm it's a test account
4. Click **🗑️ Delete**
5. Confirm deletion

**⚠️ Be careful!** Deletion is permanent!

---

### 5. Verify Email for User (Manual)

**If magic link isn't working:**

**Option A: Supabase Dashboard**
1. Go to Supabase Dashboard
2. Authentication → Users
3. Find user by email
4. Click ••• → "Send magic link" or "Verify email"

**Option B: Admin Dashboard**
1. Find user
2. Click **📧 Send Email**
3. User clicks link to verify

---

## 📊 User Analytics

### Total Users
- Shown in tab: "Users (X)"
- Updates when filtering

### By Verification Status
- Filter to see counts
- Track verification rate

### By Role
- See distribution of user types
- Identify most common user type

### By Last Sign In
- Identify active vs inactive users
- Sort by activity

---

## 🚨 Troubleshooting

### Users Not Showing Up

**Problem:** Admin dashboard shows 0 users

**Solutions:**
1. Click **🔄 Refresh** button
2. Check you're logged in as admin (`tyler@malamalabs.com`)
3. Verify database migration ran (see `URGENT_DATABASE_SETUP.md`)
4. Check browser console for errors

---

### Can't Send Emails

**Problem:** Magic link emails not sending

**Solutions:**
1. Verify SMTP configured (see `EMAIL_VERIFICATION_FIX.md`)
2. Check Supabase email rate limits
3. Test with your own email first
4. Check user's spam folder

**Quick test:**
1. Click **📧 Send** on your own account
2. Check your email (and spam)
3. If received → SMTP working
4. If not → Configure SendGrid

---

### User Deletion Fails

**Problem:** Error when trying to delete user

**Solutions:**
1. Check you have admin permissions
2. Verify user ID is correct
3. Try deleting from Supabase Dashboard instead:
   - Authentication → Users → Find user → ••• → Delete user
4. Check for related records blocking deletion
5. Contact Supabase support if persists

---

### Auth Admin API Not Working

**Problem:** Error: "auth.admin.listUsers() failed"

**Fallback:** Dashboard will use `profiles` table instead

**To fix:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` in Vercel env vars
2. This key has admin permissions
3. Regular `ANON_KEY` won't work for admin API
4. Redeploy after adding service role key

---

## 🔒 Admin Access Control

**Who can access `/admin`:**
- Users in `admin_users` table
- Currently: `tyler@malamalabs.com`

**To add more admins:**

**Option 1: SQL (Recommended)**
```sql
INSERT INTO public.admin_users (user_email, is_active, role)
VALUES ('newadmin@malamalabs.com', true, 'admin')
ON CONFLICT (user_email) DO NOTHING;
```

**Option 2: Invite Tab**
1. Go to Admin Dashboard → Invite tab
2. Enter email and role
3. Send invitation
4. New admin registers
5. Manually add to `admin_users` table

---

## 📚 Related Documentation

- `EMAIL_VERIFICATION_FIX.md` - Fix email delivery issues
- `URGENT_DATABASE_SETUP.md` - Database setup guide
- `VIEW_USERS.sql` - Safe SQL queries for user data
- `ANALYTICS_SETUP.md` - Analytics dashboard guide

---

## ✅ Best Practices

### DO:
✅ Use search before scrolling through users
✅ Refresh user list regularly
✅ Send personalized messages in emails
✅ Verify user details before deletion
✅ Track verification rates
✅ Help users with email issues

### DON'T:
❌ Delete users without confirmation
❌ Share user emails publicly
❌ Ignore unverified users for weeks
❌ Send spam emails to users
❌ Bypass security measures
❌ Share admin credentials

---

## 🎉 Success Metrics

**Track these in Admin Dashboard:**

📊 **Email Verification Rate**
- Goal: >90% verified within 24 hours
- Action: Send magic links to unverified users

📊 **User Activity Rate**
- Goal: >50% users active in last 30 days
- Action: Re-engage inactive users

📊 **User Growth**
- Goal: Steady growth month over month
- Track: New registrations per day/week

📊 **User Types Distribution**
- Track: Balance of developers, buyers, partners
- Action: Target marketing for underrepresented types

---

## 🆘 Need Help?

**Technical Issues:**
- Check browser console for errors
- Review `URGENT_DATABASE_SETUP.md`
- Verify environment variables in Vercel

**Supabase Support:**
- Dashboard → Help & Support
- Community: supabase.com/community
- Docs: supabase.com/docs

**Email Delivery:**
- See `EMAIL_VERIFICATION_FIX.md`
- SendGrid Support: sendgrid.com/support
- Check spam folders

---

## 🔄 Updates & Changelog

**Latest version:** Enhanced with auth.users integration

**New features:**
- ✅ Email verification status badges
- ✅ Last sign-in tracking
- ✅ Magic link email sending
- ✅ Enhanced deletion with confirmations
- ✅ Filter by verification status
- ✅ Detailed user info popups

**Previous versions:**
- Basic user management (profiles only)
- Search and filter by role
- User deletion

---

**Questions?** Contact tyler@malamalabs.com

