import { z } from 'zod';

/**
 * Technology Developer Questionnaire Schema
 * For logged-in users completing their profile
 * NO email/password fields - user is already authenticated
 */
export const technologyDeveloperQuestionnaireSchema = z.object({
  // Use Case
  use_case: z.enum([
    'MRV_TOOL',
    'MARKETPLACE_TRADING',
    'DAO_DEFI_INTEGRATION',
    'ENTERPRISE_SUSTAINABILITY',
    'OTHER'
  ], {
    required_error: 'Please select your use case',
  }),
  
  // Integration Types (multi-select)
  integration_types: z.array(
    z.enum([
      'SENSOR_DATA',
      'FIELD_DATA',
      'TRADING',
      'REMOTE_SENSING',
      'TOKEN_LIFECYCLE',
      'VERIFICATION_AUDIT'
    ])
  ).min(1, 'Please select at least one integration type'),
  
  // Project Details
  project_name: z.string().min(2, 'Project name is required'),
  org_name: z.string().optional(),
  stack: z.array(z.string()).optional(), // Tech stack chips
  
  // Environment
  env: z.enum(['SANDBOX_FIRST', 'TESTNET', 'MAINNET_LATER'], {
    required_error: 'Please select your preferred environment',
  }),
  
  description: z.string().max(1000).optional(),
});

export type TechnologyDeveloperQuestionnaireData = z.infer<typeof technologyDeveloperQuestionnaireSchema>;

// Re-export labels for consistency
export const technologyDeveloperLabels = {
  use_case: {
    MRV_TOOL: 'MRV Tool',
    MARKETPLACE_TRADING: 'Marketplace/Trading Platform',
    DAO_DEFI_INTEGRATION: 'DAO/DeFi Integration',
    ENTERPRISE_SUSTAINABILITY: 'Enterprise Sustainability Platform',
    OTHER: 'Other'
  },
  integration_types: {
    SENSOR_DATA: 'Sensor Data Integration',
    FIELD_DATA: 'Field Data Collection',
    TRADING: 'Trading/Marketplace',
    REMOTE_SENSING: 'Remote Sensing Data',
    TOKEN_LIFECYCLE: 'Token Lifecycle Management',
    VERIFICATION_AUDIT: 'Verification & Audit Tools'
  },
  env: {
    SANDBOX_FIRST: 'Sandbox First (Recommended)',
    TESTNET: 'Testnet',
    MAINNET_LATER: 'Planning for Mainnet'
  }
};

