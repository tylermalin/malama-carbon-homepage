-- ================================================================
-- RELOAD POSTGREST SCHEMA CACHE
-- Run this in Supabase SQL Editor to force cache reload
-- ================================================================

-- This sends a NOTIFY signal to PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema';

-- Alternative: You can also use this function if available
-- SELECT net.http_post(
--   url:='http://127.0.0.1:3000/rpc/reload_schema',
--   headers:=jsonb_build_object('Content-Type', 'application/json')
-- );

