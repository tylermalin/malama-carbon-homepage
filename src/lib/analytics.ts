/**
 * Comprehensive Analytics & Tracking Library
 * Malama Labs - All User Interactions
 */

import { supabase } from './supabaseClient';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get or generate a session ID for tracking anonymous users
 */
export function getSessionId(): string {
  try {
    let sessionId = sessionStorage.getItem('malama_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('malama_session_id', sessionId);
    }
    return sessionId;
  } catch (e) {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Get referral code from localStorage or URL
 */
export function getReferralCode(): string | null {
  try {
    // Check URL first
    const params = new URLSearchParams(window.location.search);
    const urlRef = params.get('ref');
    if (urlRef) {
      localStorage.setItem('refCode', urlRef);
      return urlRef;
    }
    // Fallback to stored value
    return localStorage.getItem('refCode');
  } catch (e) {
    return null;
  }
}

/**
 * Get current user ID from Supabase Auth
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (e) {
    return null;
  }
}

/**
 * Base metadata for all tracking events
 */
async function getBaseMetadata() {
  return {
    user_agent: navigator.userAgent,
    referral_code: getReferralCode(),
    session_id: getSessionId(),
    user_id: await getCurrentUserId(),
  };
}

// ============================================
// 1. PRESENTATION TRACKING
// ============================================

export async function trackPresentationClick(params: {
  deckKey: 'SAFE_ROUND' | 'BUYERS' | 'PROJECTS';
  extra?: Record<string, any>;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Presentation click:', params);
      return { success: false };
    }

    const metadata = await getBaseMetadata();

    const { error } = await supabase.from('presentation_clicks').insert({
      deck_key: params.deckKey,
      extra: params.extra || null,
      ...metadata,
    });

    if (error) throw error;
    console.log('✅ Presentation click tracked:', params.deckKey);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to track presentation click:', error);
    return { success: false, error };
  }
}

export async function trackSlideView(params: {
  deckKey: 'SAFE_ROUND' | 'BUYERS' | 'PROJECTS';
  slideNumber: number;
  slideTitle?: string;
  timeOnSlide?: number;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Slide view:', params);
      return { success: false };
    }

    const metadata = await getBaseMetadata();

    const { error } = await supabase.from('slide_views').insert({
      deck_key: params.deckKey,
      slide_number: params.slideNumber,
      slide_title: params.slideTitle || null,
      time_on_slide: params.timeOnSlide || null,
      ...metadata,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to track slide view:', error);
    return { success: false, error };
  }
}

// ============================================
// 2. PAGE VIEW TRACKING
// ============================================

export async function trackPageView(params: {
  pageName: string;
  pagePath: string;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Page view:', params);
      return { success: false };
    }

    const metadata = await getBaseMetadata();

    const { error } = await supabase.from('page_views').insert({
      page_name: params.pageName,
      page_path: params.pagePath,
      referrer: document.referrer || null,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      ...metadata,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to track page view:', error);
    return { success: false, error };
  }
}

// ============================================
// 3. CTA BUTTON CLICKS
// ============================================

export async function trackCTAClick(params: {
  buttonLabel: string;
  buttonLocation: string;
  pageName: string;
  destination?: string;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] CTA click:', params);
      return { success: false };
    }

    const metadata = await getBaseMetadata();

    const { error } = await supabase.from('cta_clicks').insert({
      button_label: params.buttonLabel,
      button_location: params.buttonLocation,
      page_name: params.pageName,
      destination: params.destination || null,
      ...metadata,
    });

    if (error) throw error;
    console.log('✅ CTA click tracked:', params.buttonLabel);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to track CTA click:', error);
    return { success: false, error };
  }
}

// ============================================
// 4. ONBOARDING SUBMISSIONS
// ============================================

export async function submitOnboarding(params: {
  userId: string;
  userType: 'steward' | 'developer' | 'buyer' | 'partner';
  formData: Record<string, any>;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Onboarding submission:', params);
      return { success: false };
    }

    const metadata = await getBaseMetadata();

    const { data, error } = await supabase
      .from('onboarding_submissions')
      .insert({
        user_id: params.userId,
        user_type: params.userType,
        form_data: params.formData,
        referral_code: metadata.referral_code,
        user_agent: metadata.user_agent,
      })
      .select()
      .single();

    if (error) throw error;
    console.log('✅ Onboarding submission saved:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to submit onboarding:', error);
    return { success: false, error };
  }
}

// ============================================
// 5. ADVISORY BOARD APPLICATIONS
// ============================================

export async function submitAdvisoryApplication(formData: {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  currentTitle?: string;
  currentCompany?: string;
  yearsExperience?: string;
  expertise?: string[];
  advisoryExperience?: string;
  currentRoles?: string;
  primaryExpertise?: string;
  howCanHelp?: string;
  whyInterested?: string;
  achievements?: string;
  investorIntros?: string;
  corporateIntros?: string;
  developerIntros?: string;
  networkDescription?: string;
  timeCommitment?: string;
  equityExpectation?: string;
  cashExpectation?: string;
  startDate?: string;
  heardAbout?: string;
  resumeUrl?: string;
  additionalInfo?: string;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Advisory application:', formData);
      return { success: false, fallbackToMailto: true };
    }

    const { data, error } = await supabase
      .from('advisory_applications')
      .insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        linkedin: formData.linkedin,
        current_title: formData.currentTitle,
        current_company: formData.currentCompany,
        years_experience: formData.yearsExperience,
        expertise: formData.expertise,
        advisory_experience: formData.advisoryExperience,
        current_roles: formData.currentRoles,
        primary_expertise: formData.primaryExpertise,
        how_can_help: formData.howCanHelp,
        why_interested: formData.whyInterested,
        achievements: formData.achievements,
        investor_intros: formData.investorIntros,
        corporate_intros: formData.corporateIntros,
        developer_intros: formData.developerIntros,
        network_description: formData.networkDescription,
        time_commitment: formData.timeCommitment,
        equity_expectation: formData.equityExpectation,
        cash_expectation: formData.cashExpectation,
        start_date: formData.startDate,
        heard_about: formData.heardAbout,
        resume_url: formData.resumeUrl,
        additional_info: formData.additionalInfo,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      })
      .select()
      .single();

    if (error) throw error;
    console.log('✅ Advisory application submitted:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to submit advisory application:', error);
    return { success: false, fallbackToMailto: true, error };
  }
}

// ============================================
// 6. PROJECT MANAGEMENT
// ============================================

export async function createProject(params: {
  userId: string;
  name: string;
  location: string;
  projectType: string;
  description: string;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Project creation:', params);
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: params.userId,
        name: params.name,
        location: params.location,
        project_type: params.projectType,
        description: params.description,
        status: 'Planning',
        progress: 10,
      })
      .select()
      .single();

    if (error) throw error;
    console.log('✅ Project created:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to create project:', error);
    return { success: false, error };
  }
}

export async function getUserProjects(userId: string) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Fetching user projects');
      return { success: false, data: null, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to fetch projects:', error);
    return { success: false, data: null, error };
  }
}

export async function updateProject(projectId: string, updates: Partial<{
  name: string;
  location: string;
  projectType: string;
  description: string;
  status: 'Planning' | 'Active' | 'Completed' | 'On Hold';
  carbonSequestered: number;
  sensorsDeployed: number;
  biocharsProduced: number;
  creditsIssued: number;
  progress: number;
}>) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Project update:', projectId, updates);
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    console.log('✅ Project updated:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to update project:', error);
    return { success: false, error };
  }
}

// ============================================
// 7. USER PROFILE MANAGEMENT
// ============================================

export async function uploadProfileImage(params: {
  userId: string;
  file: File;
}): Promise<{ success: boolean; url?: string; error?: any }> {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Profile image upload (Supabase not configured)');
      return { success: false, error: 'Supabase not configured' };
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(params.file.type)) {
      return { success: false, error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP allowed.' };
    }

    // Validate file size (5MB)
    if (params.file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File too large. Maximum size is 5MB.' };
    }

    // Generate file path: {userId}/profile.{ext}
    const fileExt = params.file.name.split('.').pop();
    const filePath = `${params.userId}/profile.${fileExt}`;

    // Delete existing profile image if any
    const { data: existingFiles } = await supabase.storage
      .from('profile-images')
      .list(params.userId);

    if (existingFiles && existingFiles.length > 0) {
      const filesToDelete = existingFiles.map(file => `${params.userId}/${file.name}`);
      await supabase.storage
        .from('profile-images')
        .remove(filesToDelete);
    }

    // Upload new image
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(filePath, params.file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);

    console.log('✅ Profile image uploaded:', publicUrl);
    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('❌ Failed to upload profile image:', error);
    return { success: false, error };
  }
}

export async function getProfileImageUrl(userId: string): Promise<string | null> {
  try {
    if (!supabase) return null;

    // List files in user's folder
    const { data: files, error } = await supabase.storage
      .from('profile-images')
      .list(userId);

    if (error) throw error;
    if (!files || files.length === 0) return null;

    // Get the most recent profile image
    const profileImage = files.find(file => file.name.startsWith('profile.'));
    if (!profileImage) return null;

    const filePath = `${userId}/${profileImage.name}`;
    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('❌ Failed to get profile image URL:', error);
    return null;
  }
}

export async function createOrUpdateUserProfile(params: {
  userId: string;
  fullName: string;
  companyName?: string;
  profileTypes?: string[];
  industry?: string;
  phone?: string;
  address?: string;
  website?: string;
  profileImageUrl?: string;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Profile update:', params);
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: params.userId,
        full_name: params.fullName,
        company_name: params.companyName,
        profile_types: params.profileTypes || [],
        industry: params.industry,
        phone: params.phone,
        address: params.address,
        website: params.website,
        profile_image_url: params.profileImageUrl,
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (error) throw error;
    console.log('✅ Profile saved:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to save profile:', error);
    return { success: false, error };
  }
}

export async function getUserProfile(userId: string) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Fetching user profile');
      return { success: false, data: null, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to fetch profile:', error);
    return { success: false, data: null, error };
  }
}

// ============================================
// 8. FORM ABANDONMENT TRACKING
// ============================================

export async function trackFormAbandonment(params: {
  formType: string;
  stepNumber?: number;
  stepName?: string;
  completedFields?: Record<string, any>;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Form abandonment:', params);
      return { success: false };
    }

    const metadata = await getBaseMetadata();

    const { error } = await supabase.from('form_abandonments').insert({
      form_type: params.formType,
      step_number: params.stepNumber,
      step_name: params.stepName,
      completed_fields: params.completedFields || null,
      ...metadata,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to track form abandonment:', error);
    return { success: false, error };
  }
}

// ============================================
// 9. ERROR TRACKING
// ============================================

export async function trackError(params: {
  errorType: string;
  errorMessage: string;
  errorStack?: string;
  pageName?: string;
  extraData?: Record<string, any>;
}) {
  try {
    if (!supabase) {
      console.log('📊 [Analytics] Error:', params);
      return { success: false };
    }

    const metadata = await getBaseMetadata();

    const { error } = await supabase.from('error_logs').insert({
      error_type: params.errorType,
      error_message: params.errorMessage,
      error_stack: params.errorStack,
      page_name: params.pageName,
      extra_data: params.extraData || null,
      user_agent: metadata.user_agent,
      user_id: metadata.user_id,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to track error:', error);
    return { success: false, error };
  }
}

// ============================================
// 10. GLOBAL ERROR HANDLER
// ============================================

/**
 * Set up global error tracking
 */
export function initializeErrorTracking() {
  // Track unhandled errors
  window.addEventListener('error', (event) => {
    trackError({
      errorType: 'unhandled_error',
      errorMessage: event.message,
      errorStack: event.error?.stack,
      pageName: window.location.pathname,
      extraData: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackError({
      errorType: 'unhandled_promise_rejection',
      errorMessage: event.reason?.message || String(event.reason),
      errorStack: event.reason?.stack,
      pageName: window.location.pathname,
    });
  });

  console.log('✅ Global error tracking initialized');
}

// ============================================
// EXPORTS
// ============================================

export const analytics = {
  // Presentation
  trackPresentationClick,
  trackSlideView,
  
  // Navigation
  trackPageView,
  trackCTAClick,
  
  // Forms
  submitOnboarding,
  submitAdvisoryApplication,
  trackFormAbandonment,
  
  // Projects
  createProject,
  getUserProjects,
  updateProject,
  
  // Profiles
  createOrUpdateUserProfile,
  getUserProfile,
  uploadProfileImage,
  getProfileImageUrl,
  
  // Errors
  trackError,
  initializeErrorTracking,
  
  // Utilities
  getSessionId,
  getReferralCode,
  getCurrentUserId,
};

export default analytics;

