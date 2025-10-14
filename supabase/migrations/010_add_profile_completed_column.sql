-- ================================================================
-- Add profile_completed column to profiles table
-- Safe to run multiple times (idempotent)
-- ================================================================

-- Add profile_completed column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'profile_completed'
    ) THEN
        ALTER TABLE public.profiles 
        ADD COLUMN profile_completed BOOLEAN DEFAULT FALSE;
        
        RAISE NOTICE 'Column profile_completed added to profiles table';
    ELSE
        RAISE NOTICE 'Column profile_completed already exists';
    END IF;
END $$;

-- Create index for faster queries on completion status
CREATE INDEX IF NOT EXISTS idx_profiles_completed 
ON public.profiles(profile_completed);

-- Success message
SELECT 'Profile completed column added successfully!' as message;

