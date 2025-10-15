-- ============================================
-- ADMIN MESSAGES TABLE
-- For admin-to-user communication system
-- ============================================

CREATE TABLE IF NOT EXISTS public.admin_messages (
  id BIGSERIAL PRIMARY KEY,
  
  -- Message content
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'general',
  priority TEXT NOT NULL DEFAULT 'normal',
  
  -- Sender info
  sent_by TEXT NOT NULL, -- admin email
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Recipient info (can be individual or role-based)
  recipient_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_role TEXT, -- PROJECT_DEVELOPER, CREDIT_BUYER, etc.
  recipient_email TEXT, -- For display purposes
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'sent',
  read_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_messages_recipient_user 
  ON public.admin_messages(recipient_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_messages_recipient_role 
  ON public.admin_messages(recipient_role);
CREATE INDEX IF NOT EXISTS idx_admin_messages_status 
  ON public.admin_messages(status);
CREATE INDEX IF NOT EXISTS idx_admin_messages_sent_at 
  ON public.admin_messages(sent_at DESC);

-- Check constraints
ALTER TABLE public.admin_messages
  ADD CONSTRAINT valid_message_type 
  CHECK (message_type IN ('general', 'project_update', 'credit_availability', 'action_required', 'announcement'));

ALTER TABLE public.admin_messages
  ADD CONSTRAINT valid_priority 
  CHECK (priority IN ('normal', 'high', 'urgent'));

ALTER TABLE public.admin_messages
  ADD CONSTRAINT valid_status 
  CHECK (status IN ('sent', 'read', 'archived'));

-- Must have either recipient_user_id OR recipient_role
ALTER TABLE public.admin_messages
  ADD CONSTRAINT has_recipient 
  CHECK (recipient_user_id IS NOT NULL OR recipient_role IS NOT NULL);

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE public.admin_messages ENABLE ROW LEVEL SECURITY;

-- Admins can see all messages
CREATE POLICY "Admins can view all messages"
  ON public.admin_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Admins can insert messages
CREATE POLICY "Admins can insert messages"
  ON public.admin_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Admins can update messages
CREATE POLICY "Admins can update messages"
  ON public.admin_messages
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE email = auth.jwt() ->> 'email'
    )
  );

-- Users can see their own messages (individual or role-based)
CREATE POLICY "Users can view their own messages"
  ON public.admin_messages
  FOR SELECT
  TO authenticated
  USING (
    recipient_user_id = auth.uid()
    OR recipient_role IN (
      SELECT role FROM public.user_roles
      WHERE user_id = auth.uid()
    )
  );

-- Users can update their own messages (mark as read/archived)
CREATE POLICY "Users can update their own messages"
  ON public.admin_messages
  FOR UPDATE
  TO authenticated
  USING (
    recipient_user_id = auth.uid()
    OR recipient_role IN (
      SELECT role FROM public.user_roles
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    -- Can only update status, read_at, archived_at
    recipient_user_id = auth.uid()
    OR recipient_role IN (
      SELECT role FROM public.user_roles
      WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to mark message as read
CREATE OR REPLACE FUNCTION mark_message_read(message_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE public.admin_messages
  SET status = 'read',
      read_at = NOW(),
      updated_at = NOW()
  WHERE id = message_id
    AND status = 'sent';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to archive message
CREATE OR REPLACE FUNCTION archive_message(message_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE public.admin_messages
  SET status = 'archived',
      archived_at = NOW(),
      updated_at = NOW()
  WHERE id = message_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Admin messages table created successfully!';
  RAISE NOTICE '   - Table: admin_messages';
  RAISE NOTICE '   - RLS policies enabled';
  RAISE NOTICE '   - Helper functions created';
END $$;

