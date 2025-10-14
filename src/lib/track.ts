// Tracking utility for presentation clicks
// Now fully integrated with Supabase analytics

import { analytics } from './analytics';

export async function trackPresentationClick({
  deckKey,
  referralCode,
  userId,
  userAgent,
  extra,
}: {
  deckKey: "SAFE_ROUND" | "BUYERS" | "PROJECTS";
  referralCode?: string | null;
  userId?: string | null;
  userAgent?: string | null;
  extra?: Record<string, any>;
}) {
  try {
    // Use the new comprehensive analytics system
    await analytics.trackPresentationClick({
      deckKey,
      extra,
    });
  } catch (error) {
    console.error('Failed to track presentation click:', error);
  }
}
