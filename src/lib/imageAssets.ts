/**
 * Website Image Assets Manager
 * Central place to manage all website images from Supabase Storage
 */

import { supabase } from './supabaseClient';

// Base configuration
const BUCKET_NAME = 'website-assets';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Get public URL for an asset in Supabase Storage
 * Falls back to local assets if Supabase is not configured
 */
export function getAssetUrl(path: string): string {
  if (!supabase || !SUPABASE_URL) {
    console.warn(`Supabase not configured, using local asset: ${path}`);
    return `/assets/${path}`; // Fallback to local
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Upload an asset to Supabase Storage (admin only)
 */
export async function uploadAsset(file: File, path: string) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) throw error;
  return data;
}

/**
 * Delete an asset from Supabase Storage (admin only)
 */
export async function deleteAsset(path: string) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) throw error;
  return data;
}

/**
 * List all assets in a folder
 */
export async function listAssets(folder: string = '') {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(folder);

  if (error) throw error;
  return data;
}

// ============================================
// ASSET PATH CONSTANTS
// Organize all image paths in one place
// ============================================

export const ASSETS = {
  // Logos
  LOGO_BLUE: getAssetUrl('logos/malama-logo-blue.png'),
  LOGO_ORANGE: getAssetUrl('logos/malama-logo-orange.png'),
  LOGO_BW: getAssetUrl('logos/malama-bw.png'),
  LOGO_LABS: getAssetUrl('logos/malamalabbs.png'),
  
  // Team Photos
  TEAM: {
    TYLER: getAssetUrl('team/tyler2025headshot.png'),
    DOMINICK: getAssetUrl('team/Dominick.png'),
    JEFFREY: getAssetUrl('team/jeffrey.jpeg'),
  },
  
  // Project Images
  PROJECTS: {
    CARBON_JOURNEY: getAssetUrl('projects/carbon-journey.jpeg'),
    CARBON_PROTOCOLS: getAssetUrl('projects/Carbon-Protocols.png'),
  },
  
  // Marketing/Hero Images
  MARKETING: {
    HERO_BG: getAssetUrl('marketing/hero-background.jpg'),
  },
  
  // Videos
  VIDEOS: {
    MISSION: getAssetUrl('videos/malama-labs-our-mission.mp4'),
  },
  
  // Registry Logos (if you have them)
  REGISTRIES: {
    // Add as needed
  },
  
  // Platform Screenshots
  PLATFORM: {
    SCREENSHOT_1: getAssetUrl('platform/1.png'),
    SCREENSHOT_2: getAssetUrl('platform/2.png'),
    SCREENSHOT_3: getAssetUrl('platform/3.png'),
    SCREENSHOT_4: getAssetUrl('platform/4.png'),
  }
};

// Helper to check if Supabase Storage is available
export function isStorageAvailable(): boolean {
  return !!(supabase && SUPABASE_URL);
}

// Preload critical images
export function preloadCriticalImages() {
  const criticalImages = [
    ASSETS.LOGO_BLUE,
    ASSETS.LOGO_LABS,
    ASSETS.TEAM.TYLER,
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

export default ASSETS;

