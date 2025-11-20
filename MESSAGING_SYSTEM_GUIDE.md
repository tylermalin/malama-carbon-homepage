# Mālama Labs Messaging System - Complete Guide

## 🎉 Overview

The Messaging System enables seamless communication between admins and users through the platform. Admins can send targeted messages to individual users or entire roles, while users receive notifications in their dashboard and via email.

---

## 🚀 Quick Setup

### Step 1: Run Database Migration

Copy and paste this file into Supabase SQL Editor:
```
supabase/migrations/COPY_PASTE_012_messaging_system_COMPLETE.sql
```

This creates:
- ✅ `admin_messages` table
- ✅ `message_templates` table  
- ✅ `advisor_profiles` table
- ✅ `investor_profiles` table
- ✅ Enhanced `user_invites` table
- ✅ `onboarding_status` field in `user_roles`

### Step 2: Upload Email Template (Optional)

Upload the admin message email template:
```
supabase/email-templates/admin-message.html
```

Go to: Supabase Dashboard → Authentication → Email Templates → Create New Template

**Template Name:** `admin-message`

---

## 📋 Features

### For Admins

#### 1. Send Messages
- **Individual Messages**: Send to specific users
- **Role-Based Messages**: Broadcast to all users in a role
- **Bulk Messages**: Send to all users at once

#### 2. Message Templates
Pre-built templates for common scenarios:
- "Project ready for planning documents" (Project Developers)
- "First credits available" (Credit Buyers)
- "API sandbox ready" (Technology Developers)
- "Welcome message" (All users)

#### 3. Message Types
- `general` - General updates
- `project_update` - Project-specific updates
- `credit_availability` - New credits available
- `action_required` - User action needed
- `announcement` - Platform announcements

#### 4. Priority Levels
- `normal` - Standard message
- `high` - Important message
- `urgent` - Immediate attention required

#### 5. Tracking & Analytics
- View all sent messages
- Track read status
- Filter by role, type, status
- Monitor engagement rates

### For Users

#### 1. Message Inbox
- See all messages in dashboard
- Unread count badge
- Click to expand and read
- Mark as read automatically
- Archive old messages

#### 2. Email Notifications
- Receive email when admin sends message
- Professional Mālama branding
- "View in Dashboard" CTA button
- Reply-to for questions

---

## 🎯 How to Use

### Admin: Sending a Message

1. **Go to Admin Dashboard**
   ```
   Navigate to /admin
   Click "Messages" tab
   ```

2. **Compose Message**
   - (Optional) Select a template
   - Choose recipient type:
     - Individual user
     - All users in a role (PROJECT_DEVELOPER, CREDIT_BUYER, etc.)
     - All users
   - Select message type and priority
   - Enter subject and message
   - Click "Send Message"

3. **Track Engagement**
   - View "Message History" below composer
   - See read status for each message
   - Filter by role, status, or type
   - Monitor read rates

### User: Viewing Messages

1. **Dashboard Notification**
   - Login to dashboard at `/dashboard`
   - See "Messages" section at top
   - Unread count badge shows new messages

2. **Read Message**
   - Click on message to expand
   - Message automatically marked as read
   - Click "Archive" to hide old messages

3. **Email Notification**
   - Check email for new message notification
   - Click "View in Dashboard" to see full message
   - Reply to email for questions

---

## 📝 Message Use Cases

### For Project Developers (Biochar Producers)

**Use Case:** Project ready for next step

```
Subject: Your Project is Ready for the Next Step 🌱
Type: project_update
Priority: high

Message:
Aloha {name},

Great news! We've reviewed your project questionnaire and you're ready to move forward.

Let's onboard your project and create your Project Planning Documents...
```

### For Credit Buyers

**Use Case:** New credits available

```
Subject: First Liquid Carbon Tokens Available for Purchase 🎯
Type: credit_availability
Priority: high

Message:
Aloha {name},

Exciting announcement! The first verified Liquid Carbon Tokens (LC02) are now available on our marketplace...
```

### For Technology Developers

**Use Case:** API access approved

```
Subject: Your API Sandbox is Ready 🚀
Type: action_required
Priority: normal

Message:
Aloha {name},

Your development environment is now live!

Your API Credentials:
• Environment: Sandbox
• API Key: {api_key}
...
```

---

## 👥 Advisor & Investor Features

### Inviting Advisors

1. **Go to Invitations Tab**
   ```
   /admin → Invite User tab
   ```

2. **Select "Advisor" Type**
   - Enter email, name, expertise area
   - Add campaign name (e.g., "Q4-2025-Advisors")
   - Write custom message or use template
   - Click "Send Invitation"

3. **Track Invite Status**
   - See when invite was sent, opened, completed
   - Monitor conversion rates
   - View advisor profiles once onboarded

### Inviting Investors

1. **Go to Invitations Tab**
   ```
   /admin → Invite User tab
   ```

2. **Select "Investor" Type**
   - Enter email, entity name, investment range
   - Add campaign name (e.g., "Series-A-2025")
   - Attach data room access
   - Click "Send Invitation"

3. **Track Investment Pipeline**
   - See investor status: prospect → reviewing → committed
   - Monitor due diligence progress
   - Grant data room access

### Advisor Onboarding Flow

```
1. Advisor receives invite email
2. Clicks secure link with token
3. Completes advisor questionnaire:
   - Full name, title, company
   - LinkedIn, website, bio
   - Areas of expertise
   - Advisory preferences
   - NDA signing
4. Gets access to Advisor Portal:
   - Company metrics (read-only)
   - Meeting calendar
   - Document library
   - Message center
```

### Investor Onboarding Flow

```
1. Investor receives invite email
2. Clicks secure link with token
3. Completes investor questionnaire:
   - Full name, entity, investor type
   - Investment interest range
   - Portfolio companies
   - Accreditation verification
   - NDA signing
4. Gets access to Investor Portal:
   - Financial metrics
   - Investment documents
   - Data room
   - Cap table (if invested)
```

---

## 🔐 Security

### Row Level Security (RLS)

All tables have RLS policies enabled:

**Admin Messages:**
- Admins can view/send all messages
- Users can only view their own messages
- Users can only update their own messages (read status)

**Advisor Profiles:**
- Advisors can view/edit their own profile
- Admins can view all advisor profiles

**Investor Profiles:**
- Investors can view/edit their own profile
- Admins can view all investor profiles

### Invitation Tokens

- Cryptographically secure 32-byte tokens
- Auto-expire after 30 days
- One-time use
- Track opens and completions

---

## 📊 Database Schema

### admin_messages

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| subject | TEXT | Message subject |
| message | TEXT | Message body |
| message_type | TEXT | Type of message |
| priority | TEXT | Priority level |
| sent_by | TEXT | Admin email |
| recipient_user_id | UUID | Individual recipient (optional) |
| recipient_role | TEXT | Role-based recipient (optional) |
| status | TEXT | sent, read, archived |
| read_at | TIMESTAMPTZ | When message was read |
| created_at | TIMESTAMPTZ | When created |

### message_templates

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| name | TEXT | Template name (unique) |
| subject | TEXT | Default subject |
| message | TEXT | Template body |
| role | TEXT | Target role (optional) |
| message_type | TEXT | Type of message |
| is_active | BOOLEAN | Active status |

### advisor_profiles

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| user_id | UUID | User reference |
| full_name | TEXT | Advisor name |
| title | TEXT | Job title |
| company | TEXT | Company name |
| expertise_areas | TEXT[] | Areas of expertise |
| agreement_status | TEXT | pending, signed, active |
| nda_signed | BOOLEAN | NDA status |

### investor_profiles

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| user_id | UUID | User reference |
| full_name | TEXT | Investor name |
| entity_name | TEXT | Company/fund name |
| investor_type | TEXT | angel, vc, strategic, etc. |
| investment_amount | DECIMAL | Investment amount |
| status | TEXT | prospect, reviewing, committed, etc. |
| data_room_access | BOOLEAN | Data room access granted |

---

## 🧪 Testing

### Test Message Flow

1. **As Admin:**
   ```
   1. Login with admin account
   2. Go to /admin → Messages tab
   3. Compose message to yourself
   4. Select message type and priority
   5. Send message
   ```

2. **As User:**
   ```
   1. Login with user account
   2. Go to /dashboard
   3. See message in inbox
   4. Click to expand and read
   5. Verify marked as read
   6. Archive message
   ```

3. **Check Email:**
   ```
   - Check inbox for email notification
   - Verify professional branding
   - Click "View in Dashboard" link
   - Confirm redirects to dashboard
   ```

---

## 📞 Support

### Questions?

- Email: aloha@malamalabs.com
- Check documentation in `supabase/migrations/` folder
- Review component code in `src/components/admin/` and `src/components/dashboard/`

### Need Help?

If you encounter issues:
1. Check Supabase logs for errors
2. Verify RLS policies are enabled
3. Ensure admin_users table has your email
4. Check browser console for errors

---

## 🎉 What's Next?

After setup:

1. ✅ Send welcome messages to existing users
2. ✅ Create custom message templates
3. ✅ Invite advisors to advisory board
4. ✅ Invite investors to view data room
5. ✅ Monitor engagement analytics
6. ✅ Use messages to guide users through onboarding

---

**Built with ❤️ by Mālama Labs**

Scaling Durable Carbon Removal 🌱







