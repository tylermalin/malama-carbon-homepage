-- Copy EVERYTHING from this line to the end of the file
-- Then paste into Supabase SQL Editor and click RUN

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  inquiry_type TEXT,
  message TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS contact_submissions_email_idx ON contact_submissions(email);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';

