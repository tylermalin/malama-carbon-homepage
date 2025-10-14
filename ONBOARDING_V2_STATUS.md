# Onboarding V2 - Implementation Status

## ✅ COMPLETED (8/12 Tasks)

### Phase 1: Database Foundation
- [x] Database migrations (4 tables with RLS)
- [x] Idempotent task template seeds (20 templates)
- [x] Zod validation schemas (all 4 roles)

### Phase 2A: Data & UI Foundation  
- [x] Data persistence layer (`src/lib/onboardingV2.ts`)
- [x] Feature flags system (`src/lib/featureFlags.ts`)
- [x] Role selection page (`src/components/onboarding/RoleSelectionV2.tsx`)

## 🚧 IN PROGRESS

### Phase 2B: Forms (Current)
Building 4 per-role form components using:
- React Hook Form (already installed)
- Zod schemas (already created)
- Existing UI components (Card, Button, Input, etc.)

## 📋 REMAINING WORK

### Critical Path (Required for MVP)

**1. Four Per-Role Forms** (Task 7)
Each form needs:
- React Hook Form integration with Zod validation
- Multi-step wizard UI
- Save to `onboarding_answers` table
- Generate tasks on completion
- Redirect to dashboard

Files to create:
- `src/components/onboarding/forms/ProjectDeveloperForm.tsx`
- `src/components/onboarding/forms/TechnologyDeveloperForm.tsx`
- `src/components/onboarding/forms/CreditBuyerForm.tsx`
- `src/components/onboarding/forms/PartnerForm.tsx`

**2. Routing Integration** (Task 10)
- Add `/onboarding/v2` route to `useNavigation.ts`
- Add per-role routes (`/onboarding/v2/project-developer`, etc.)
- Feature flag check in navigation
- Update PageRouter.tsx

### Enhancement (Nice to Have)

**3. Dashboard V2 Components** (Task 9)
- `src/components/dashboard/ProcessOverviewCard.tsx`
- `src/components/dashboard/ScheduleCallCard.tsx`
- `src/components/dashboard/NextSteps.tsx`
- `src/components/dashboard/QuestionnaireSummary.tsx`

**4. Optional**
- Task 11: CORS proxy (if needed)
- Task 12: Tests

## 🎯 Deployment Checklist

Before enabling the feature:

1. **Database Setup**
   - [ ] Run `COPY_PASTE_007_onboarding_v2_FIXED.sql` in Supabase
   - [ ] Verify 20 task templates exist
   - [ ] Test RLS policies

2. **Environment Variables**
   ```bash
   VITE_ONBOARDING_V2_ENABLED=true
   VITE_CAL_LINK=https://cal.com/malama/intro
   ```

3. **Code Integration**
   - [ ] Complete all 4 forms
   - [ ] Add routing
   - [ ] Test end-to-end flow
   - [ ] Toggle feature flag

## 📚 Implementation Guide

### Form Pattern (Template)

Each form should follow this pattern:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { [roleSchema], [RoleFormData] } from '../../../schemas/onboarding/[role]';
import { saveUserRole, saveOnboardingAnswers, generateTasksForRole } from '../../../lib/onboardingV2';

export function [Role]Form({ user, onComplete }) {
  const form = useForm<[RoleFormData]>({
    resolver: zodResolver([roleSchema])
  });

  async function onSubmit(data: [RoleFormData]) {
    // 1. Save role
    await saveUserRole(user.id, '[ROLE]', data.full_name, data.org_name);
    
    // 2. Save answers
    await saveOnboardingAnswers(user.id, '[ROLE]', data);
    
    // 3. Generate tasks
    await generateTasksForRole(user.id, '[ROLE]');
    
    // 4. Redirect
    onComplete();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields using form.register() */}
    </form>
  );
}
```

### Routing Pattern

In `useNavigation.ts`:

```typescript
export type PageType = 
  | 'home'
  | 'onboardingV2'  // NEW
  | 'onboardingV2ProjectDeveloper'  // NEW
  | 'onboardingV2TechDeveloper'  // NEW
  | 'onboardingV2CreditBuyer'  // NEW
  | 'onboardingV2Partner'  // NEW
  // ... existing types

const pathToPageMap: Record<string, PageType> = {
  '/onboarding/v2': 'onboardingV2',
  '/onboarding/v2/project-developer': 'onboardingV2ProjectDeveloper',
  // ... etc
};
```

## 🔄 Rollback Plan

To disable Onboarding V2:
1. Set `VITE_ONBOARDING_V2_ENABLED=false`
2. Redeploy

Database changes are safe to leave (additive only, no destructive changes).

## 📞 Support

Questions? Check:
- Database schema: `supabase/migrations/007_create_onboarding_v2_tables.sql`
- Validation rules: `src/schemas/onboarding/`
- Data layer API: `src/lib/onboardingV2.ts`

