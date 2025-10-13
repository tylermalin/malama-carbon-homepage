# Database Migrations

This directory contains SQL migration files for the Supabase database.

## Running Migrations

### Method 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of the migration file
5. Click **Run** to execute

### Method 2: Supabase CLI (Advanced)
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Migration Files

### 001_create_contact_submissions.sql
**Purpose**: Creates the `contact_submissions` table to store contact form data

**What it does**:
- Creates table with columns: id, name, email, company, inquiry_type, message, user_agent, referrer, created_at
- Adds indexes for performance
- Sets up Row Level Security (RLS) policies:
  - Allows anyone (anonymous users) to INSERT submissions
  - Allows only authenticated users to SELECT submissions
  
**Run this**: Copy contents into SQL Editor and run

---

## Table Structure

```sql
contact_submissions
├── id (UUID, primary key, auto-generated)
├── name (TEXT, required)
├── email (TEXT, required)
├── company (TEXT, optional)
├── inquiry_type (TEXT, optional)
├── message (TEXT, required)
├── user_agent (TEXT, optional)
├── referrer (TEXT, optional)
└── created_at (TIMESTAMP WITH TIME ZONE, auto-generated)
```

## Security

Row Level Security (RLS) is enabled on all tables to ensure:
- Public users can only INSERT their own submissions
- Admin users must authenticate to view submissions
- Service role key bypasses RLS (keep it secret!)

## Need Help?

See `SUPABASE_SETUP.md` in the project root for full setup instructions.

