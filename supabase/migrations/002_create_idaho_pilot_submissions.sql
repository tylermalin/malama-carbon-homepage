-- ============================================
-- Create idaho_pilot_submissions table
-- ============================================
CREATE TABLE IF NOT EXISTS idaho_pilot_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  category TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  farm_name TEXT,
  farm_size_acres INTEGER,
  land_type TEXT,
  soil_ph_known TEXT,
  soil_texture TEXT,
  recent_amendments TEXT,
  current_crops TEXT,
  crop_cycle TEXT,
  previous_silicate_use TEXT,
  preferred_contact_method TEXT,
  best_contact_time TEXT,
  message TEXT NOT NULL,
  how_heard TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idaho_pilot_submissions_email_idx ON idaho_pilot_submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idaho_pilot_submissions_created_at_idx ON idaho_pilot_submissions(created_at DESC);

-- Create index on country for filtering
CREATE INDEX IF NOT EXISTS idaho_pilot_submissions_country_idx ON idaho_pilot_submissions(country);

-- Create index on farm_size_acres for analytics
CREATE INDEX IF NOT EXISTS idaho_pilot_submissions_farm_size_idx ON idaho_pilot_submissions(farm_size_acres);

-- Enable Row Level Security (RLS)
ALTER TABLE idaho_pilot_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form submissions)
CREATE POLICY "Allow public insert" ON idaho_pilot_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow only authenticated users to read
CREATE POLICY "Allow authenticated read" ON idaho_pilot_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comment for documentation
COMMENT ON TABLE idaho_pilot_submissions IS 'Stores Idaho Pilot Project application form submissions from farmers and landowners';

