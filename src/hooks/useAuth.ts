import { useState, useEffect } from 'react';
import { authHelpers } from '../utils/supabase/client';
import { AuthUser } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const { session, error } = await authHelpers.getCurrentSession();
      
      // Silently skip if Supabase is not configured
      if (!session && !error) {
        setIsCheckingAuth(false);
        return;
      }
      
      if (!error && session?.access_token) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || 'User',
          accessToken: session.access_token
        });
      }
    } catch (error) {
      // Only log if Supabase is configured (to avoid noise)
      if (import.meta.env.VITE_SUPABASE_URL) {
        console.error('Error checking session:', error);
      }
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleAuthSuccess = (userData: AuthUser) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await authHelpers.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return {
    user,
    isAuthModalOpen,
    isCheckingAuth,
    handleAuthSuccess,
    handleSignOut,
    openAuthModal,
    closeAuthModal
  };
}