import { z } from 'zod';

// Technology Developer (Builder) Onboarding Schema
export const technologyDeveloperSchema = z.object({
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
  
  // Account Information
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirm: z.string().min(1, 'Please confirm your password'),
  accept_terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.password === data.password_confirm, {
  message: "Passwords don't match",
  path: ["password_confirm"],
});

export type TechnologyDeveloperFormData = z.infer<typeof technologyDeveloperSchema>;

// Human-readable labels
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

