// Import the shared Supabase client instead of creating a new one
// This prevents "Multiple GoTrueClient instances" warning
import { supabase as sharedSupabase } from '../../lib/supabaseClient';
// Import project info for API endpoints
import { projectId } from './info';

// Re-export the shared client
export const supabase = sharedSupabase;

// Auth helper functions
export const authHelpers = {
  async signUp(email: string, password: string, name: string) {
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async signIn(email: string, password: string) {
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async signOut() {
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async getCurrentSession() {
    try {
      if (!supabase) {
        // Supabase not configured - silently return null session
        return { session: null, error: null };
      }
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      return { session, error: null };
    } catch (error) {
      // Only log errors if Supabase is configured (to avoid noise when it's intentionally not set up)
      if (supabase) {
        console.error('Get session error:', error);
      }
      return { session: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async getCurrentUser() {
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        throw error;
      }

      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },

  async resendConfirmationEmail(email: string) {
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Resend confirmation error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};

// Project API helpers
export const projectAPI = {
  async createProject(projectData: any, accessToken: string) {
    try {
      console.log('ProjectAPI: Creating project with token:', accessToken);
      console.log('ProjectAPI: Project data:', projectData);
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b827df6e/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(projectData)
      });

      console.log('ProjectAPI: Response status:', response.status);
      const data = await response.json();
      console.log('ProjectAPI: Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Create project error:', error);
      return { data: null, error: error.message };
    }
  },

  async getUserProjects(accessToken: string) {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b827df6e/projects`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      return { data: data.projects, error: null };
    } catch (error) {
      console.error('Fetch projects error:', error);
      return { data: null, error: error.message };
    }
  },

  async updateProjectMetrics(projectId: string, metrics: any, accessToken: string) {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b827df6e/projects/${projectId}/metrics`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(metrics)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update project metrics');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Update project metrics error:', error);
      return { data: null, error: error.message };
    }
  },

  async getGlobalStats() {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b827df6e/stats/global`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch global stats');
      }

      return { data: data.stats, error: null };
    } catch (error) {
      console.error('Fetch global stats error:', error);
      return { data: null, error: error.message };
    }
  }
};