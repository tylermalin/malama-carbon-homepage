# 🚨 Quick Fix: CORS Errors

## The Error You're Seeing:
```
Access to fetch at 'https://fykjijdixtcgjavidmve.supabase.co/functions/v1/make-server-b827df6e/projects' 
from origin 'https://www.malamalabs.com' has been blocked by CORS policy
```

---

## ⚡ 2-Minute Fix

### Step 1: Create Database Table (30 seconds)

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy this file: **`supabase/migrations/COPY_PASTE_006_projects.sql`**
3. Paste and click **Run**

---

### Step 2: Deploy Edge Function (90 seconds)

**In your terminal:**

```bash
# Install CLI (if needed)
npm install -g supabase

# Login
supabase login

# Link project
cd "/Users/tylermalin/Downloads/Mālama Carbon Homepage"
supabase link --project-ref fykjijdixtcgjavidmve

# Deploy function
supabase functions deploy make-server-b827df6e
```

---

## ✅ Done!

Reload **malamalabs.com/dashboard** and:
- ✅ No more CORS errors
- ✅ Projects save to database
- ✅ Projects persist after refresh

---

## 📖 Need More Details?

See **`DEPLOY_EDGE_FUNCTION.md`** for:
- Troubleshooting
- Manual deployment via UI
- Testing instructions
- Function documentation

---

**That's it!** 🎉

