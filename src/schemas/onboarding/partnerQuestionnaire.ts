import { z } from 'zod';

/**
 * Partner Questionnaire Schema
 * For logged-in users completing their profile
 * NO email/password fields - user is already authenticated
 */
export const partnerQuestionnaireSchema = z.object({
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
  
  // Contact Information (organization name only - user already has name/email)
  org_name: z.string().min(2, 'Organization name is required'),
});

export type PartnerQuestionnaireData = z.infer<typeof partnerQuestionnaireSchema>;

// Re-export labels for consistency
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

