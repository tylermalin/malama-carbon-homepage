import { z } from 'zod';

// Project Developer Onboarding Schema
export const projectDeveloperSchema = z.object({
  // Land Information
  land_role: z.enum(['OWNER', 'MANAGER', 'PLANNING', 'OTHER'], {
    required_error: 'Please select your land role',
  }),
  
  // Biomass Types (multi-select, at least one required)
  biomass_types: z.array(
    z.enum([
      'AG_RESIDUES',
      'WOODY_BIOMASS',
      'DEDICATED_ENERGY_CROPS',
      'ORGANIC_WASTE',
      'NONE_PLANNING'
    ])
  ).min(1, 'Please select at least one biomass type'),
  
  // Interests (multi-select, at least one required)
  interests: z.array(
    z.enum([
      'BIOCHAR_PRODUCTION',
      'BIOCHAR_SOIL_APPLICATION',
      'REGENERATIVE_AG',
      'BLUE_CARBON',
      'AFORESTATION_REFORESTATION',
      'ENHANCED_ROCK_WEATHERING',
      'OTHER'
    ])
  ).min(1, 'Please select at least one interest area'),
  
  // Optional Fields
  acreage: z.number().positive().optional(),
  locations: z.array(z.string()).optional(),
  documents: z.array(z.string()).optional(), // File paths/URLs
  map_upload: z.string().optional(), // File path/URL
  why_now: z.string().max(1000).optional(),
  
  // Account Information
  full_name: z.string().min(2, 'Full name is required'),
  business_name: z.string().optional(),
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

export type ProjectDeveloperFormData = z.infer<typeof projectDeveloperSchema>;

// Human-readable labels for form fields
export const projectDeveloperLabels = {
  land_role: {
    OWNER: 'Land Owner',
    MANAGER: 'Land Manager',
    PLANNING: 'Planning Stage',
    OTHER: 'Other'
  },
  biomass_types: {
    AG_RESIDUES: 'Agricultural Residues',
    WOODY_BIOMASS: 'Woody Biomass',
    DEDICATED_ENERGY_CROPS: 'Dedicated Energy Crops',
    ORGANIC_WASTE: 'Organic Waste',
    NONE_PLANNING: 'None (Planning Stage)'
  },
  interests: {
    BIOCHAR_PRODUCTION: 'Biochar Production',
    BIOCHAR_SOIL_APPLICATION: 'Biochar Soil Application',
    REGENERATIVE_AG: 'Regenerative Agriculture',
    BLUE_CARBON: 'Blue Carbon',
    AFORESTATION_REFORESTATION: 'Afforestation/Reforestation',
    ENHANCED_ROCK_WEATHERING: 'Enhanced Rock Weathering',
    OTHER: 'Other'
  }
};

