# Complete Email Templates Setup Guide

## 📧 6 Email Templates for Mālama Labs

All templates are professionally designed with:
- ✅ Mālama Labs branding (colors, logo, typography)
- ✅ Mobile-responsive design
- ✅ Security best practices
- ✅ Clear call-to-action buttons
- ✅ Hawaiian "Aloha" greeting
- ✅ Company address & contact info

---

## 🚀 Quick Setup (5-10 minutes)

### Navigate to Supabase Email Templates

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **Authentication** → **Email Templates**

You'll see 6 template options. Update each one below:

---

## 📝 Template 1: Confirm Signup

**When Used:** New user registration / email verification

**File:** `confirm-signup.html`

**Subject:** `Welcome to Mālama Labs - Verify Your Email`

**Steps:**
1. Click "Confirm signup" template
2. Copy ALL contents from `confirm-signup.html`
3. Paste into editor
4. Update subject line
5. Save

**Template Variables:** `{{ .ConfirmationURL }}`

---

## 🔐 Template 2: Magic Link

**When Used:** Passwordless sign-in

**File:** `magic-link.html`

**Subject:** `Sign In to Mālama Labs - Your Magic Link`

**Steps:**
1. Click "Magic Link" template
2. Copy ALL contents from `magic-link.html`
3. Paste into editor
4. Update subject line
5. Save

**Template Variables:** `{{ .ConfirmationURL }}`

---

## ✉️ Template 3: Invite User

**When Used:** Admin invites new user to platform

**File:** `invite-user.html`

**Subject:** `You're Invited to Join Mālama Labs`

**Steps:**
1. Click "Invite user" template
2. Copy ALL contents from `invite-user.html`
3. Paste into editor
4. Update subject line
5. Save

**Template Variables:**
- `{{ .ConfirmationURL }}`
- `{{ .Role }}` - User's assigned role

**Note:** This template is used by the Admin Dashboard "Invite" tab!

---

## 📮 Template 4: Change Email Address

**When Used:** User changes their email address

**File:** `change-email.html`

**Subject:** `Confirm Your Email Change - Mālama Labs`

**Steps:**
1. Click "Change Email Address" template
2. Copy ALL contents from `change-email.html`
3. Paste into editor
4. Update subject line
5. Save

**Template Variables:**
- `{{ .ConfirmationURL }}`
- `{{ .Email }}` - Old email
- `{{ .NewEmail }}` - New email

---

## 🔑 Template 5: Reset Password

**When Used:** User forgets password

**File:** `reset-password.html`

**Subject:** `Reset Your Mālama Labs Password`

**Steps:**
1. Click "Reset Password" template
2. Copy ALL contents from `reset-password.html`
3. Paste into editor
4. Update subject line
5. Save

**Template Variables:** `{{ .ConfirmationURL }}`

---

## 🛡️ Template 6: Reauthentication

**When Used:** Verify identity for sensitive actions

**File:** `reauthentication.html`

**Subject:** `Verify It's You - Mālama Labs Security Check`

**Steps:**
1. Click "Reauthentication" (or "Confirm Reauthentication") template
2. Copy ALL contents from `reauthentication.html`
3. Paste into editor
4. Update subject line
5. Save

**Template Variables:** `{{ .ConfirmationURL }}`

---

## ✅ Verification Checklist

After uploading all templates, verify:

- [ ] All 6 templates saved successfully
- [ ] Subject lines updated for each
- [ ] Test confirm signup (register new user at `/onboarding/v2`)
- [ ] Test magic link (use "Sign in with magic link" option)
- [ ] Test invite user (from Admin Dashboard → Invite tab)
- [ ] Test password reset (from sign-in page)
- [ ] Test email change (from user profile settings)

---

## 📋 All Subject Lines (Copy/Paste Ready)

```
Confirm Signup:      Welcome to Mālama Labs - Verify Your Email
Magic Link:          Sign In to Mālama Labs - Your Magic Link
Invite User:         You're Invited to Join Mālama Labs
Change Email:        Confirm Your Email Change - Mālama Labs
Reset Password:      Reset Your Mālama Labs Password
Reauthentication:    Verify It's You - Mālama Labs Security Check
```

---

## 🎨 Template Design Features

### Common Elements in All Templates:
- **Header**: Dark green gradient with Mālama "M" logo
- **Greeting**: "Aloha!" 
- **CTA Button**: Large, prominent, gradient green button
- **Security Info**: Warnings about link expiration, suspicious activity
- **Footer**: Company address, contact email, privacy/terms links

### Brand Colors:
- **Primary Green**: `#1B4332` → `#0A3D3F` (gradient)
- **Secondary Green**: `#52B788` → `#95D5B2` (gradient)
- **Light Background**: `#f0fdf4` → `#e8f5e9`
- **Text**: Dark slate for readability

### Mobile Responsive:
- All templates tested on mobile, tablet, desktop
- Buttons large enough for touch
- Text readable at all sizes
- Images scale properly

---

## 🔧 Troubleshooting

### Templates not showing up?
- Make sure you clicked "Save" after pasting
- Refresh the Supabase dashboard
- Check browser console for errors

### Emails not being sent?
- Verify SMTP settings in Supabase (Authentication → Settings → SMTP)
- Check spam folder
- Verify user email address is valid

### Variables not populating?
- Make sure you're using the exact variable names: `{{ .ConfirmationURL }}`, `{{ .Email }}`, etc.
- Supabase automatically fills these when sending emails

### Design looks broken?
- Ensure you copied the ENTIRE HTML file (including `<!DOCTYPE html>` and closing tags)
- Some email clients strip styles - test in Gmail, Outlook, Apple Mail

---

## 📞 Support

Questions about the email templates?
- **Email:** aloha@malamalabs.com
- **Docs:** [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)

---

**All templates created ✅**  
**Ready to upload to Supabase! 🚀**

