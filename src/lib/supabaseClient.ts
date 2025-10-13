import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Form submissions will only log to console.');
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Type for contact form submissions
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  inquiry_type?: string;
  message: string;
  created_at?: string;
  user_agent?: string;
  referrer?: string;
}

// Submit contact form
export async function submitContactForm(data: ContactSubmission) {
  try {
    if (!supabase) {
      console.log('Supabase not configured. Form data:', data);
      // Fallback to mailto
      return { 
        success: false, 
        fallbackToMailto: true,
        error: 'Supabase not configured' 
      };
    }

    // Add metadata
    const submissionData = {
      ...data,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    };

    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('Supabase submission error:', error);
      return { 
        success: false, 
        fallbackToMailto: true,
        error: error.message 
      };
    }

    console.log('Form submitted successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return { 
      success: false, 
      fallbackToMailto: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

