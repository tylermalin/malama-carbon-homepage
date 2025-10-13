-- Create contact_submissions table
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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS contact_submissions_email_idx ON contact_submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form submissions)
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow only authenticated users to read
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comment for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';

