import { z } from 'zod';

/**
 * Credit Buyer Questionnaire Schema
 * For logged-in users completing their profile
 * NO email/password fields - user is already authenticated
 */
export const creditBuyerQuestionnaireSchema = z.object({
  // Organization Type
  org_type: z.enum([
    'CORPORATE',
    'DAO',
    'GOVERNMENT',
    'INVESTOR',
    'OTHER'
  ], {
    required_error: 'Please select your organization type',
  }),
  
  org_name: z.string().min(2, 'Organization name is required'),
  
  // Intended Use (multi-select, at least one required)
  intended_use: z.array(
    z.enum([
      'OFFSETTING',
      'TREASURY',
      'RESALE',
      'COMPLIANCE'
    ])
  ).min(1, 'Please select at least one intended use'),
  
  // Volume Range
  volume_range: z.enum([
    'V1000_5000',
    'V5000_25000',
    'V25000_100000',
    'V100000_PLUS'
  ], {
    required_error: 'Please select your annual volume range',
  }),
  
  // Preferred Methods (multi-select, optional)
  preferred_methods: z.array(
    z.enum([
      'BIOCHAR',
      'FORESTRY',
      'BLUE_CARBON',
      'REGENERATIVE_AG',
      'ENHANCED_ROCK',
      'DIRECT_AIR_CAPTURE',
      'MIXED'
    ])
  ).optional(),
  
  // Risk Tolerance
  risk_tolerance: z.enum([
    'PLATINUM',
    'GOLD',
    'SILVER',
    'MIXED'
  ], {
    required_error: 'Please select your risk tolerance level',
  }),
  
  // Contact Name (optional - can use profile name)
  contact_name: z.string().optional(),
});

export type CreditBuyerQuestionnaireData = z.infer<typeof creditBuyerQuestionnaireSchema>;

// Re-export labels for consistency
export const creditBuyerLabels = {
  org_type: {
    CORPORATE: 'Corporate',
    DAO: 'DAO',
    GOVERNMENT: 'Government/Public Sector',
    INVESTOR: 'Investor/Fund',
    OTHER: 'Other'
  },
  intended_use: {
    OFFSETTING: 'Carbon Offsetting',
    TREASURY: 'Treasury Asset',
    RESALE: 'Resale/Trading',
    COMPLIANCE: 'Compliance Requirements'
  },
  volume_range: {
    V1000_5000: '1,000 - 5,000 tCO₂e/year',
    V5000_25000: '5,000 - 25,000 tCO₂e/year',
    V25000_100000: '25,000 - 100,000 tCO₂e/year',
    V100000_PLUS: '100,000+ tCO₂e/year'
  },
  preferred_methods: {
    BIOCHAR: 'Biochar',
    FORESTRY: 'Forestry',
    BLUE_CARBON: 'Blue Carbon',
    REGENERATIVE_AG: 'Regenerative Agriculture',
    ENHANCED_ROCK: 'Enhanced Rock Weathering',
    DIRECT_AIR_CAPTURE: 'Direct Air Capture',
    MIXED: 'Mixed Portfolio'
  },
  risk_tolerance: {
    PLATINUM: 'Platinum (Highest Durability)',
    GOLD: 'Gold (High Durability)',
    SILVER: 'Silver (Mixed Durability)',
    MIXED: 'Mixed (Custom Portfolio)'
  }
};

