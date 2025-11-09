import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only warn if credentials are missing (removed verbose debug logging)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Some features may be limited.');
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

// Type for Idaho Pilot farmer contact form submissions
export interface IdahoPilotSubmission {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  category: string; // e.g., "Farmer / Landowner"
  country: string;
  region?: string; // Country/Region/Province
  farm_name?: string; // Optional farm/business name
  farm_size_acres?: number; // Optional farm size in acres
  land_type?: string; // Type of land managed
  soil_ph_known?: string; // Do they know soil pH
  soil_texture?: string; // Soil texture
  recent_amendments?: string; // Recent soil amendments applied
  current_crops?: string; // Current crops
  crop_cycle?: string; // Crop cycle information
  previous_silicate_use?: string; // Previous use of crushed silicate rock
  preferred_contact_method?: string; // Preferred contact method
  best_contact_time?: string; // Best time to contact
  message: string;
  how_heard?: string; // How they heard about the program
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

// Submit Idaho Pilot form
export async function submitIdahoPilotForm(data: IdahoPilotSubmission) {
  try {
    if (!supabase) {
      console.log('Supabase not configured. Idaho Pilot form data:', data);
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
      .from('idaho_pilot_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('Supabase Idaho Pilot submission error:', error);
      return { 
        success: false, 
        fallbackToMailto: true,
        error: error.message 
      };
    }

    console.log('Idaho Pilot form submitted successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to submit Idaho Pilot form:', error);
    return { 
      success: false, 
      fallbackToMailto: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

