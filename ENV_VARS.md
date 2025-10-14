# Environment Variables

## Required Variables

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Feature Flags
VITE_ONBOARDING_V2_ENABLED=false

# External Services
VITE_CAL_LINK=https://cal.com/malama/intro
```

## Setup

1. Copy these to your `.env.local` file
2. Replace with your actual Supabase credentials
3. Toggle `VITE_ONBOARDING_V2_ENABLED=true` to enable new onboarding flow

## Feature Flag Usage

The onboarding v2 feature is gated behind `VITE_ONBOARDING_V2_ENABLED`:

- `false` (default): Uses existing onboarding flow
- `true`: Enables new role-based onboarding at `/onboarding/v2`

This allows safe, incremental rollout without breaking existing functionality.

