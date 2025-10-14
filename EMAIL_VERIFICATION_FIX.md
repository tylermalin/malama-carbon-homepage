# 📧 Email Verification Not Working - Troubleshooting Guide

## Problem
Users are registering but not receiving verification emails.

---

## 🔍 Quick Diagnostics

### Step 1: Check Supabase Email Settings

1. **Go to Supabase Dashboard**
   - Navigate to: `Authentication` → `Email Templates`

2. **Verify Email Template is Active**
   - Click on "Confirm signup"
   - Make sure it's enabled
   - Check that the template looks correct

3. **Check Email Provider Settings**
   - Go to: `Project Settings` → `Auth`
   - Scroll to **SMTP Settings**

---

## 🚨 Common Issues & Fixes

### Issue 1: Using Supabase's Default Email (Development Only)

**Problem:** Supabase's built-in email service is rate-limited and may not work in production.

**Check:**
```
Project Settings → Auth → SMTP Settings
```

If you see "Supabase Mail Server" → This only works for development!

**Solution:** Set up a proper email provider (see below)

---

### Issue 2: Email Rate Limiting

**Symptoms:**
- First few emails work, then stop
- Console shows: `429 Too Many Requests`

**Fix:**
1. Go to Supabase Dashboard → `Authentication` → `Rate Limits`
2. Temporarily increase rate limits for testing
3. Set up proper SMTP for production

---

### Issue 3: Emails Going to Spam

**Check:**
- User's spam/junk folder
- Promotions tab (Gmail)

**Fix:**
- Set up SPF/DKIM records (requires custom SMTP)

---

## ✅ Recommended Solution: Set Up Custom SMTP

### Option A: Use SendGrid (Recommended - Free Tier Available)

1. **Sign up for SendGrid**
   - Go to: https://sendgrid.com
   - Create free account (100 emails/day)

2. **Create API Key**
   - Dashboard → Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - **Save the key** (you won't see it again)

3. **Get SMTP Credentials**
   - SendGrid SMTP settings:
   ```
   Host: smtp.sendgrid.net
   Port: 587
   Username: apikey
   Password: [Your API Key from step 2]
   ```

4. **Configure in Supabase**
   - Go to: `Project Settings` → `Auth` → `SMTP Settings`
   - Enable Custom SMTP
   - Enter:
     ```
     Host: smtp.sendgrid.net
     Port: 587
     Username: apikey
     Password: [Your SendGrid API Key]
     Sender email: aloha@malamalabs.com
     Sender name: Mālama Labs
     ```

5. **Test**
   - Send a test email from Supabase
   - Try registering a new user

---

### Option B: Use Gmail SMTP (Quick Setup)

⚠️ **Warning:** Not recommended for production (daily limits)

1. **Enable 2-Factor Authentication on Gmail**

2. **Create App Password**
   - Google Account → Security → App passwords
   - Generate password for "Mail"

3. **Configure in Supabase**
   ```
   Host: smtp.gmail.com
   Port: 587
   Username: your-email@gmail.com
   Password: [App password from step 2]
   Sender email: your-email@gmail.com
   Sender name: Mālama Labs
   ```

---

### Option C: Use AWS SES (Production-Grade)

**Best for:** High volume, reliability

1. Sign up for AWS
2. Set up SES in your region
3. Verify domain: malamalabs.com
4. Get SMTP credentials
5. Configure in Supabase

---

## 🔧 Quick Fix: Manual Verification (Temporary)

While setting up SMTP, you can manually verify users:

1. **Go to Supabase Dashboard**
2. **Authentication** → **Users**
3. Find the user
4. Click the **•••** menu
5. Select **"Send magic link"** or manually verify

---

## 📊 Check Email Status

### View Email Logs in Supabase:

```sql
-- Run in Supabase SQL Editor
SELECT 
  email,
  email_confirmed_at,
  created_at,
  CASE 
    WHEN email_confirmed_at IS NULL THEN 'Unverified'
    ELSE 'Verified'
  END as status
FROM auth.users
ORDER BY created_at DESC
LIMIT 20;
```

---

## 🎯 Immediate Action Plan

### For Right Now (Development/Testing):

1. **Manually verify test users** in Supabase Dashboard
2. **Check spam folders** for existing emails
3. **Disable email confirmation temporarily** (not recommended for production):
   - `Project Settings` → `Auth` → Disable "Enable email confirmations"

### For Production (Permanent Fix):

1. ✅ **Set up SendGrid SMTP** (recommended, free tier)
2. ✅ **Update email templates** with custom branding
3. ✅ **Test with multiple email providers** (Gmail, Outlook, etc.)
4. ✅ **Monitor email delivery** in SendGrid dashboard

---

## 📧 Your Custom Email Template

You already created this great template:
```
supabase/email-templates/confirm-signup.html
```

**Make sure it's uploaded to Supabase:**
1. Go to `Authentication` → `Email Templates` → `Confirm signup`
2. Copy/paste your custom HTML
3. Click **Save**

---

## 🧪 Test Verification Flow

1. Register new user at: `https://malamalabs.com/onboarding/v2`
2. Check email (and spam folder)
3. Click verification link
4. Should redirect to dashboard

---

## 📞 Need Help?

**Supabase Support:**
- Dashboard → Help & Support
- Community: supabase.com/community

**SendGrid Support:**
- Dashboard → Support
- Docs: docs.sendgrid.com

---

## ✅ Success Checklist

- [ ] SMTP configured in Supabase
- [ ] Test email sent successfully
- [ ] Custom email template uploaded
- [ ] New user registration sends email
- [ ] Email arrives in inbox (not spam)
- [ ] Verification link works
- [ ] User can access dashboard after verification

---

## 🔐 Security Note: User Password Access

**You asked about viewing user passwords - Here's the truth:**

❌ **Passwords are NOT stored in plain text** (this is correct and secure!)
✅ **Passwords are hashed** using bcrypt (one-way encryption)
✅ **You can view user EMAILS** in admin dashboard
✅ **You can reset passwords** but not view them

**This is how it SHOULD be for security!**

If you need to help a user who forgot their password:
1. They click "Forgot Password" on login
2. They receive reset email
3. They create new password

**Never ask for, store, or transmit plain text passwords!**

