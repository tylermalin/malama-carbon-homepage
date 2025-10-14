# Supabase Email Template Setup

## How to Customize Your Email Verification Template

Follow these steps to update your Supabase email templates with the custom Mālama Labs branding:

### Step 1: Access Email Templates
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **Mālama Carbon Homepage**
3. Navigate to **Authentication** → **Email Templates** in the left sidebar

### Step 2: Update the "Confirm Signup" Template
1. Find the **"Confirm signup"** template in the list
2. Click on it to open the editor
3. Copy the entire contents of `confirm-signup.html` (in this folder)
4. Paste it into the **Message Body (HTML)** field
5. Update the **Subject Line** to:
   ```
   Verify your email - Welcome to Mālama Labs! 🌱
   ```

### Step 3: Save and Test
1. Click **Save** at the bottom of the page
2. Test by creating a new account at https://malamalabs.com/onboarding/v2
3. Check your email inbox for the verification email

---

## What's Included in the Template

✅ **Mālama Labs branding** with logo and colors  
✅ **Personalized welcome message**  
✅ **Clear call-to-action** button  
✅ **Contact information** (aloha@malamalabs.com)  
✅ **Professional footer** with company address  
✅ **Privacy & Terms links**  
✅ **Mobile-responsive design**

---

## Available Variables

Supabase provides these variables you can use in templates:

- `{{ .ConfirmationURL }}` - The verification link
- `{{ .Email }}` - The user's email address
- `{{ .Token }}` - The verification token
- `{{ .TokenHash }}` - The hashed token
- `{{ .SiteURL }}` - Your site URL

---

## Other Email Templates to Customize

You may also want to customize these templates:

### 1. **Magic Link**
Used for passwordless login.

### 2. **Invite User**
Sent when you manually invite users.

### 3. **Reset Password**
Sent when users request a password reset.

### 4. **Change Email Address**
Sent when users update their email.

---

## Brand Colors Reference

Use these colors for consistency across all templates:

- **Primary Dark**: `#1b4332` (Dark green)
- **Primary**: `#0a3d3f` (Teal)
- **Accent**: `#10b981` (Emerald green)
- **Text Dark**: `#1e293b` (Slate 800)
- **Text Light**: `#64748b` (Slate 500)
- **Background**: `#f8fafc` (Slate 50)

---

## Need Help?

If you run into any issues:
1. Check that you saved the template
2. Ensure `{{ .ConfirmationURL }}` is present in the template
3. Test with a new email address
4. Contact Supabase support if emails aren't sending

---

**Created for:** Mālama Labs Inc.  
**Last Updated:** October 14, 2025

