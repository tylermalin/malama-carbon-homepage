import { z } from 'zod';

/**
 * Project Developer Questionnaire Schema
 * For logged-in users completing their profile
 * NO email/password fields - user is already authenticated
 */
export const projectDeveloperQuestionnaireSchema = z.object({
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
  
  // Optional Profile Fields
  business_name: z.string().optional(),
  acreage: z.number().positive().optional(),
  locations: z.array(z.string()).optional(),
  documents: z.array(z.string()).optional(),
  map_upload: z.string().optional(),
  why_now: z.string().max(1000).optional(),
});

export type ProjectDeveloperQuestionnaireData = z.infer<typeof projectDeveloperQuestionnaireSchema>;

// Re-export labels for consistency
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

