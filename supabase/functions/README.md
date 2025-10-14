# Supabase Edge Functions

This directory contains Supabase Edge Functions for the Mālama Labs application.

## Functions

### `make-server-b827df6e` - Project Management API

Handles CRUD operations for carbon removal projects.

**Endpoints:**
- `GET /projects` - Get all projects for authenticated user
- `POST /projects` - Create a new project
- `GET /projects/:id` - Get a specific project
- `PUT /projects/:id` - Update a project
- `DELETE /projects/:id` - Delete a project

## Deployment

### Prerequisites

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref fykjijdixtcgjavidmve
   ```

### Deploy the Function

```bash
cd "Mālama Carbon Homepage"
supabase functions deploy make-server-b827df6e
```

### Set Environment Variables

The function needs access to these environment variables (automatically available in Supabase):
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key

These are automatically set by Supabase when you deploy.

## Database Setup

Before using the function, create the projects table:

1. Go to Supabase Dashboard → SQL Editor
2. Run the migration: `supabase/migrations/006_create_projects_table.sql`

Or copy and paste this SQL:

```sql
-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planning',
  estimated_credits INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create own projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE TO authenticated USING (auth.uid() = user_id);
```

## Testing

Test the function locally:

```bash
supabase functions serve make-server-b827df6e
```

Then make requests to `http://localhost:54321/functions/v1/make-server-b827df6e/projects`

## Verification

After deployment, verify the function is working:

1. Check deployment status:
   ```bash
   supabase functions list
   ```

2. View logs:
   ```bash
   supabase functions logs make-server-b827df6e
   ```

3. Test in your app:
   - Sign in at malamalabs.com
   - Go to Dashboard
   - Try creating a project
   - Check console for successful API calls (no more CORS errors!)

## Troubleshooting

### CORS Errors
- Verify the function is deployed: `supabase functions list`
- Check function logs: `supabase functions logs make-server-b827df6e`
- Ensure CORS headers are present in all responses

### 401 Unauthorized
- Verify user is authenticated
- Check that Authorization header is being sent
- Verify token is valid

### Database Errors
- Ensure projects table exists
- Verify RLS policies are configured
- Check that user_id references auth.users correctly

