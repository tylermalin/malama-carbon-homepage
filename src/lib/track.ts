// Tracking utility for presentation clicks
// Note: Supabase integration is optional and will fail gracefully if not configured

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
    // Log to console for now - can be connected to Supabase later
    console.log('Presentation click tracked:', {
      deck_key: deckKey,
      referral_code: referralCode ?? null,
      user_id: userId ?? null,
      user_agent: userAgent ?? null,
      extra: extra ?? null,
      timestamp: new Date().toISOString(),
    });

    // If you want to enable Supabase tracking, add your credentials to .env:
    // VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
    // Then uncomment the code below:
    
    /*
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      await supabase.from("presentation_clicks").insert({
        deck_key: deckKey,
        referral_code: referralCode ?? null,
        user_id: userId ?? null,
        user_agent: userAgent ?? null,
        extra: extra ? JSON.stringify(extra) : null,
      });
    }
    */
  } catch (error) {
    console.error('Failed to track presentation click:', error);
  }
}
