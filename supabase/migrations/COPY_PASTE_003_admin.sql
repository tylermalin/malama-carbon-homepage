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

