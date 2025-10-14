# Deploy Edge Function - Fix CORS Errors

This guide will help you deploy the Supabase Edge Function to fix the CORS errors and enable real project management.

## 🎯 What This Fixes

**Current Error:**
```
Access to fetch at 'https://fykjijdixtcgjavidmve.supabase.co/functions/v1/make-server-b827df6e/projects' 
from origin 'https://www.malamalabs.com' has been blocked by CORS policy
```

**After Deployment:**
✅ Projects are saved to database  
✅ Projects persist across sessions  
✅ No more CORS errors  
✅ Full CRUD functionality  

---

## 📋 Step 1: Create the Database Table

Go to Supabase Dashboard → **SQL Editor** → Copy and paste this:

```sql
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

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create own projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

Click **Run** ✅

---

## 🚀 Step 2: Deploy the Edge Function

### Option A: Using Supabase CLI (Recommended)

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   ```

3. **Link your project:**
   ```bash
   cd "/Users/tylermalin/Downloads/Mālama Carbon Homepage"
   supabase link --project-ref fykjijdixtcgjavidmve
   ```

4. **Deploy the function:**
   ```bash
   supabase functions deploy make-server-b827df6e
   ```

5. **Verify deployment:**
   ```bash
   supabase functions list
   ```

You should see:
```
NAME                     VERSION  CREATED AT
make-server-b827df6e     1        2025-XX-XX
```

---

### Option B: Using Supabase Dashboard (Manual)

1. Go to **Supabase Dashboard** → **Edge Functions**
2. Click **New Function**
3. Name: `make-server-b827df6e`
4. Copy and paste the code from: `supabase/functions/make-server-b827df6e/index.ts`
5. Click **Deploy**

---

## ✅ Step 3: Verify It's Working

1. Go to **malamalabs.com**
2. Sign in to your account
3. Go to **Dashboard**
4. Try creating a new project
5. Check the browser console:
   - ✅ **Before:** CORS error
   - ✅ **After:** Successful API response!

---

## 📊 Expected Results

### Console Output (Success):
```
✅ Project created successfully
✅ Project saved to database
```

### Console Output (Before Fix):
```
❌ CORS policy error
❌ Failed to fetch
```

---

## 🔍 Troubleshooting

### "Function not found" Error

**Check deployment:**
```bash
supabase functions list
```

If not listed, redeploy:
```bash
supabase functions deploy make-server-b827df6e
```

---

### Still Getting CORS Errors

**Check function logs:**
```bash
supabase functions logs make-server-b827df6e
```

**Verify the function URL matches your code:**
```
https://fykjijdixtcgjavidmve.supabase.co/functions/v1/make-server-b827df6e/projects
```

---

### 401 Unauthorized

**Verify:**
1. User is signed in
2. Valid auth token is being sent
3. RLS policies are correctly configured

**Test RLS:**
```sql
SELECT * FROM public.projects WHERE user_id = auth.uid();
```

---

## 📝 What the Edge Function Does

### Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | Get all user's projects |
| POST | `/projects` | Create new project |
| GET | `/projects/:id` | Get specific project |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |

### Security:
- ✅ CORS headers for cross-origin requests
- ✅ JWT authentication required
- ✅ RLS policies enforce user ownership
- ✅ Auto-updates `updated_at` timestamp

---

## 🎉 Success Indicators

After deployment, you should see:

1. ✅ No CORS errors in console
2. ✅ Projects persist after page refresh
3. ✅ Projects appear in Supabase Dashboard → Database → `projects` table
4. ✅ Real-time updates work correctly

---

## 📚 Files Created

- `supabase/functions/make-server-b827df6e/index.ts` - Edge Function code
- `supabase/migrations/006_create_projects_table.sql` - Database schema
- `supabase/migrations/COPY_PASTE_006_projects.sql` - Clean SQL
- `supabase/functions/README.md` - Function documentation
- `DEPLOY_EDGE_FUNCTION.md` - This deployment guide

---

## 💡 Pro Tips

1. **Test locally first:**
   ```bash
   supabase functions serve make-server-b827df6e
   ```

2. **Watch logs in real-time:**
   ```bash
   supabase functions logs make-server-b827df6e --follow
   ```

3. **Redeploy after changes:**
   ```bash
   supabase functions deploy make-server-b827df6e --no-verify-jwt
   ```

---

Need help? Check the logs or reach out! 🚀

