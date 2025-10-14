import { z } from 'zod';

// Partner / Collaborator Onboarding Schema
export const partnerSchema = z.object({
  // Partner Type
  partner_type: z.enum([
    'NGO',
    'ACADEMIA',
    'FOUNDATION',
    'CORPORATE',
    'PUBLIC_SECTOR',
    'OTHER'
  ], {
    required_error: 'Please select your organization type',
  }),
  
  // Goals (multi-select, at least one required)
  goals: z.array(
    z.enum([
      'PROJECT_CO_DEVELOPMENT',
      'RESEARCH',
      'TRAINING_OUTREACH',
      'FUNDING_GRANTS',
      'POLICY_STANDARDIZATION'
    ])
  ).min(1, 'Please select at least one partnership goal'),
  
  // Optional Fields
  pilot_interest: z.string().max(500).optional(),
  resources_available: z.string().max(500).optional(),
  
  // Contact Information
  contact_name: z.string().min(2, 'Contact name is required'),
  org_name: z.string().min(2, 'Organization name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirm: z.string(),
  accept_terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.password === data.password_confirm, {
  message: "Passwords don't match",
  path: ["password_confirm"],
});

export type PartnerFormData = z.infer<typeof partnerSchema>;

// Human-readable labels
export const partnerLabels = {
  partner_type: {
    NGO: 'NGO',
    ACADEMIA: 'Academic/Research Institution',
    FOUNDATION: 'Foundation',
    CORPORATE: 'Corporate Partner',
    PUBLIC_SECTOR: 'Public Sector/Government',
    OTHER: 'Other'
  },
  goals: {
    PROJECT_CO_DEVELOPMENT: 'Project Co-Development',
    RESEARCH: 'Research Collaboration',
    TRAINING_OUTREACH: 'Training & Outreach',
    FUNDING_GRANTS: 'Funding & Grants',
    POLICY_STANDARDIZATION: 'Policy & Standardization'
  }
};

