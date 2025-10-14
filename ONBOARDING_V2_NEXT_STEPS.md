# Onboarding V2 - Next Steps to Complete

## 🎯 Current Status: 67% Complete (8/12 tasks)

You now have a **solid, production-ready foundation** for Onboarding V2. Here's what remains and how to complete it.

---

## ✅ WHAT'S READY TO USE NOW

### 1. Database Layer ✅
- 4 tables with RLS policies
- 20 task templates (5 per role)
- Idempotent migrations
- **Action:** Run `COPY_PASTE_007_onboarding_v2_FIXED.sql` in Supabase

### 2. Data API ✅  
File: `src/lib/onboardingV2.ts`
- `saveUserRole()` - Save user's selected role
- `saveOnboardingAnswers()` - Store form data
- `generateTasksForRole()` - Create tasks (idempotent)
- `getUserTasks()` - Fetch user's tasks
- `updateTaskStatus()` - Mark tasks complete
- `getDashboardNextSteps()` - Get dashboard data
- `getOnboardingProgress()` - Progress statistics

### 3. Validation ✅
Files: `src/schemas/onboarding/*.ts`
- Project Developer schema (15+ fields)
- Technology Developer schema
- Credit Buyer schema  
- Partner schema
- All with password confirmation, terms acceptance

### 4. UI Foundation ✅
- `RoleSelectionV2.tsx` - Beautiful animated role cards
- `featureFlags.ts` - Feature toggle system
- Ready for forms integration

---

## 🚧 WHAT NEEDS TO BE BUILT (4 Tasks)

### **CRITICAL: Forms (Task 7)**

Build 4 form components following this pattern:

```tsx
// Example: src/components/onboarding/forms/ProjectDeveloperForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectDeveloperSchema } from '../../../schemas/onboarding/projectDeveloper';
import { saveUserRole, saveOnboardingAnswers, generateTasksForRole } from '../../../lib/onboardingV2';

export function ProjectDeveloperForm({ user, onComplete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(projectDeveloperSchema)
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    
    // 1. Save role
    await saveUserRole(user.id, 'PROJECT_DEVELOPER', data.full_name, data.business_name);
    
    // 2. Save all form answers
    await saveOnboardingAnswers(user.id, 'PROJECT_DEVELOPER', data);
    
    // 3. Generate tasks
    await generateTasksForRole(user.id, 'PROJECT_DEVELOPER');
    
    // 4. Complete
    onComplete();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-8">
      {/* Field: Land Role */}
      <select {...register('land_role')}>
        <option value="OWNER">Land Owner</option>
        <option value="MANAGER">Land Manager</option>
        {/* etc */}
      </select>
      {errors.land_role && <span>{errors.land_role.message}</span>}

      {/* Field: Biomass Types (multi-select checkboxes) */}
      {/* Field: Interests (multi-select checkboxes) */}
      {/* Fields: acreage, locations, etc */}
      {/* Account fields: email, password, confirm, terms */}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
      </button>
    </form>
  );
}
```

**Files needed:**
- ✅ Schema exists: `src/schemas/onboarding/projectDeveloper.ts`
- ⏳ Form component: `src/components/onboarding/forms/ProjectDeveloperForm.tsx`

Repeat for:
- Technology Developer
- Credit Buyer
- Partner

**Estimated time:** 4-6 hours for all 4 forms

---

### **CRITICAL: Routing (Task 10)**

Add routes in `src/hooks/useNavigation.ts`:

```typescript
export type PageType = 
  | 'home'
  | 'onboardingV2'  // Role selection
  | 'onboardingV2ProjectDeveloper'
  | 'onboardingV2TechDeveloper'
  | 'onboardingV2CreditBuyer'
  | 'onboardingV2Partner'
  // ... existing types

const pathToPageMap: Record<string, PageType> = {
  '/onboarding/v2': 'onboardingV2',
  '/onboarding/v2/project-developer': 'onboardingV2ProjectDeveloper',
  '/onboarding/v2/technology-developer': 'onboardingV2TechDeveloper',
  '/onboarding/v2/credit-buyer': 'onboardingV2CreditBuyer',
  '/onboarding/v2/partner': 'onboardingV2Partner',
  // ... existing routes
};
```

Then in `PageRouter.tsx`:

```typescript
case 'onboardingV2':
  return <RoleSelectionV2 onRoleSelect={handleRoleSelect} />;
case 'onboardingV2ProjectDeveloper':
  return <ProjectDeveloperForm user={user} onComplete={() => navigate('dashboard')} />;
// etc
```

**Estimated time:** 1 hour

---

### **ENHANCEMENT: Dashboard Components (Task 9)**

Build these dashboard widgets:

1. **ProcessOverviewCard** - Shows role and registration date
2. **NextSteps** - Lists user's tasks with status toggles
3. **ScheduleCallCard** - Links to Cal.com booking
4. **QuestionnaireSummary** - Shows answers recap

**Estimated time:** 2-3 hours

---

### **OPTIONAL: Testing (Task 12)**

Example test:
```typescript
// __tests__/onboarding/projectDeveloper.test.ts
describe('Project Developer Onboarding', () => {
  it('saves role and generates tasks', async () => {
    const userId = 'test-user-id';
    await saveUserRole(userId, 'PROJECT_DEVELOPER', 'Test User');
    const result = await generateTasksForRole(userId, 'PROJECT_DEVELOPER');
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(5); // 5 tasks for this role
  });
});
```

---

## 🚀 Quick Start Guide

### Option 1: MVP (Forms + Routing Only)
**Time: ~5-7 hours**

1. Build the 4 forms
2. Add routing
3. Test end-to-end
4. Toggle feature flag
5. Deploy

### Option 2: Full Implementation (MVP + Dashboard)
**Time: ~8-10 hours**

1. Do Option 1
2. Build dashboard components  
3. Add tests
4. Deploy

---

## 📋 Deployment Checklist

Before enabling `VITE_ONBOARDING_V2_ENABLED=true`:

- [ ] Run database migration in Supabase
- [ ] Verify 20 task templates exist
- [ ] Build all 4 forms
- [ ] Add routing
- [ ] Test complete flow: role select → form → tasks generated → dashboard
- [ ] Add environment variable to Vercel
- [ ] Deploy

---

## 🎁 What You Get

When complete, users will:

1. **Visit `/onboarding/v2`** → See 4 beautiful role cards
2. **Select their role** → Routed to role-specific form
3. **Complete questionnaire** → Validation, nice UX
4. **Submit** → Role saved, answers saved, tasks generated
5. **Redirect to dashboard** → See their next steps

All **feature-flagged**, **type-safe**, **database-backed**, and **ready to scale**.

---

## 💡 Need Help?

**Code references:**
- Data layer: `src/lib/onboardingV2.ts`
- Schemas: `src/schemas/onboarding/`
- Role selection: `src/components/onboarding/RoleSelectionV2.tsx`
- Migrations: `supabase/migrations/007_*.sql`

**Key functions to use in forms:**
```typescript
import { 
  saveUserRole,           // Step 1: Save their role
  saveOnboardingAnswers,  // Step 2: Save form data
  generateTasksForRole    // Step 3: Create their tasks
} from '../../../lib/onboardingV2';
```

---

You have a **professional-grade foundation**. The remaining work is straightforward form-building and routing integration. 🚀

