# Verify Admin Setup

## Quick Check: Is tyler@malamalabs.com an Admin?

### Step 1: Run This in Supabase SQL Editor

```sql
-- Check if admin_users table exists and has tyler@malamalabs.com
SELECT * FROM admin_users;
```

**Expected Result:**
```
email                    | added_at                  | added_by
-------------------------+---------------------------+--------------
tyler@malamalabs.com    | 2025-10-14 05:35:00       | initial_setup
tylermalin@gmail.com    | 2025-10-14 05:35:00       | initial_setup
```

---

### Step 2: If Table Doesn't Exist, Create It

Copy and paste this into Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  added_by TEXT
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to admin list"
ON public.admin_users
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can add admins"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
);

INSERT INTO public.admin_users (email, added_by)
VALUES 
  ('tyler@malamalabs.com', 'initial_setup'),
  ('tylermalin@gmail.com', 'initial_setup')
ON CONFLICT (email) DO NOTHING;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users a
    JOIN auth.users u ON u.email = a.email
    WHERE u.id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin() TO anon;
```

---

### Step 3: Test Admin Access

1. **Sign in** to your app at `malamalabs.com/onboarding/v2` with `tyler@malamalabs.com`
2. **Navigate** to `malamalabs.com/admin`
3. **Expected Behavior:**
   - ✅ If admin setup is correct: You'll see the full Analytics Dashboard
   - ❌ If not admin: You'll see "Access Denied"
   - ⚠️ If not logged in: You'll see "Sign In to Admin Account"

---

## Add Another Admin

To add another admin email, run this in Supabase SQL Editor:

```sql
INSERT INTO public.admin_users (email, added_by)
VALUES ('newemail@example.com', 'tyler@malamalabs.com')
ON CONFLICT (email) DO NOTHING;
```

---

## Remove Admin Access

```sql
DELETE FROM public.admin_users
WHERE email = 'email-to-remove@example.com';
```

---

## View All Admins

```sql
SELECT 
  email,
  added_at,
  added_by
FROM admin_users
ORDER BY added_at DESC;
```

---

## Troubleshooting

### "Access Denied" even though I'm in admin_users table

**Check 1: Are you signed in with the correct email?**
```sql
-- Run this while signed into your app
SELECT email FROM auth.users WHERE id = auth.uid();
```

**Check 2: Does your email exactly match?**
```sql
-- Check for exact match (case-sensitive)
SELECT * FROM admin_users WHERE email = 'tyler@malamalabs.com';
```

**Check 3: Test the is_admin() function**
```sql
-- This should return true when signed in as tyler@malamalabs.com
SELECT is_admin();
```

### Table already exists error

If you get "relation already exists", just run the INSERT:

```sql
INSERT INTO public.admin_users (email, added_by)
VALUES 
  ('tyler@malamalabs.com', 'initial_setup'),
  ('tylermalin@gmail.com', 'initial_setup')
ON CONFLICT (email) DO NOTHING;
```

---

## Security Notes

✅ **Secure:** The `admin_users` table explicitly controls who has admin access  
✅ **Flexible:** Easy to add/remove admins via SQL  
✅ **Protected:** RLS policies prevent unauthorized modifications  
✅ **Transparent:** Component checks email against this table on every /admin page load  

⚠️ **Important:** Only add trusted emails to this table - admins can see all analytics data!

