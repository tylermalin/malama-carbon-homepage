/**
 * Feature Flags
 * Centralized feature flag checks
 */

/**
 * Check if Onboarding V2 is enabled
 * @returns true if VITE_ONBOARDING_V2_ENABLED=true in environment
 */
export function isOnboardingV2Enabled(): boolean {
  return import.meta.env.VITE_ONBOARDING_V2_ENABLED === 'true';
}

/**
 * Get Cal.com scheduling link
 */
export function getCalLink(): string {
  return import.meta.env.VITE_CAL_LINK || 'https://cal.com/malama/intro';
}

