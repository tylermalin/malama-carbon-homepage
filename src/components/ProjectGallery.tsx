import React from 'react';
import { motion } from 'motion/react';
import { CarbonProjectCard } from './CarbonProjectCard';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface ProjectGalleryProps {
  onNavigate: (section?: string) => void;
}

export function ProjectGallery({ onNavigate }: ProjectGalleryProps) {
  // Sample project data showcasing different project types and variants
  const projects = [
    {
      id: 'hawaii-food-forest-project-2025',
      name: 'Hawaiʻi Food Forest Project',
      developer: {
        name: '505 Farms LLC',
        verified: true
      },
      type: 'biochar' as const,
      location: {
        country: 'United States',
        region: 'Maui, Hawaiʻi'
      },
      images: [
        'https://images.unsplash.com/photo-1720170723453-dd9de7397bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYWNhZGFtaWElMjBudXRzJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU2MjcyOTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      description: 'Developing a regenerative food forest that integrates biochar production, agroforestry, and climate-smart practices. In partnership with 505 Farms LLC, this project will convert diverse agricultural byproducts into durable carbon sequestration while supporting local food security and ecological restoration. Verified through Mālama\'s Universal dMRV and Climate Intelligence Network, the project is positioned to generate high-integrity carbon credits and early offtake opportunities.',
      certifications: [
        { standard: 'LC02 Biochar Standard', status: 'in_progress' as const, certifier: 'Puro.earth' },
        { standard: 'Puro.earth', status: 'pending' as const, certifier: 'Puro.earth' },
        { standard: 'Verra VCS', status: 'in_progress' as const, certifier: 'Verra' },
        { standard: 'Gold Standard', status: 'pending' as const, certifier: 'Gold Standard' }
      ],
      metrics: {
        totalCORCs: 0, // Coming Soon
        estimatedCORCs: 0, // Coming Soon
        permanenceRating: 95, // High durability through biochar integration
        projectDuration: 10,
        startDate: '2025-10-01', // Q4 2025
        verificationDate: '2026-04-01' // Target Q2 2026
      },
      dMRV: {
        activeSensors: 0, // Planned
        dataPoints: 0, // Planned
        aiAccuracy: 0, // Pre-certification underway
        lastUpdate: '2024-12-15T10:30:00Z',
        monitoringType: ['Universal dMRV deployment planned for site monitoring', 'Automated pre-certification data streams', 'Real-time metrics across soil health, biomass conversion, and carbon stability']
      },
      pricing: {
        currentPrice: 0, // TBD
        currency: 'CORC',
        minimumPurchase: 0, // TBD
        earlyLiquidity: 0 // Pre-sales opening soon
      },
      status: 'planning' as const,
      fundingProgress: 0, // Pre-sales opening soon
      keywords: ['Biochar', 'Agroforestry', 'Food Security', 'Circular Economy', 'Maui Agriculture', 'Soil Enhancement'],
      sustainabilityGoals: ['Climate Action (SDG 13)', 'Sustainable Agriculture (SDG 2)', 'Life on Land (SDG 15)', 'Responsible Consumption (SDG 12)'],
      riskFactors: [
        'Agricultural yield variability',
        'Carbon market price shifts',
        'Certification and regulatory timelines'
      ]
    },
    {
      id: 'costa-rica-forest-restoration-2024',
      name: 'Costa Rica Forest Restoration Initiative',
      developer: {
        name: 'Tropical Conservation Alliance',
        verified: true
      },
      type: 'afforestation' as const,
      location: {
        country: 'Costa Rica',
        region: 'Guanacaste Province'
      },
      images: [
        'https://images.unsplash.com/photo-1637552481611-1f36222fb188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBwbGFudGF0aW9uJTIwc3VzdGFpbmFibGUlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTY5ODg0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      description: 'Large-scale reforestation project restoring degraded pasturelands with native tree species to create carbon sinks and biodiversity corridors.',
      certifications: [
        { standard: 'Verra VCS', status: 'verified' as const, certifier: 'Verra', date: '2024-02-10' },
        { standard: 'CCBS', status: 'verified' as const, certifier: 'Verra', date: '2024-02-10' }
      ],
      metrics: {
        totalCORCs: 8500,
        estimatedCORCs: 12000,
        permanenceRating: 88,
        projectDuration: 30,
        startDate: '2023-03-01',
        verificationDate: '2024-06-15'
      },
      dMRV: {
        activeSensors: 67,
        dataPoints: 445670,
        aiAccuracy: 94.7,
        lastUpdate: '2024-12-15T08:45:00Z',
        monitoringType: ['Forest Coverage', 'Biomass Growth', 'Soil Carbon', 'Biodiversity Index']
      },
      pricing: {
        currentPrice: 85,
        currency: 'CORC',
        minimumPurchase: 250,
        earlyLiquidity: 20
      },
      status: 'active' as const,
      fundingProgress: 92,
      keywords: ['Reforestation', 'Biodiversity', 'Native Species', 'Tropical Forest'],
      sustainabilityGoals: ['Climate Action (SDG 13)', 'Life on Land (SDG 15)', 'Sustainable Communities (SDG 11)']
    },
    {
      id: 'australian-soil-carbon-2024',
      name: 'Australian Regenerative Agriculture Program',
      developer: {
        name: 'Outback Carbon Solutions',
        verified: false
      },
      type: 'soil_carbon' as const,
      location: {
        country: 'Australia',
        region: 'Queensland'
      },
      images: [
        'https://images.unsplash.com/photo-1576611807771-75a0723cba7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9jaGFyJTIwcHJvZHVjdGlvbiUyMGNhcmJvbiUyMHNlcXVlc3RyYXRpb258ZW58MXx8fHwxNzU2OTg4NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      description: 'Implementation of regenerative farming practices to enhance soil carbon sequestration across cattle ranching operations.',
      certifications: [
        { standard: 'Australian Carbon Credit Units', status: 'in_progress' as const, certifier: 'Clean Energy Regulator' }
      ],
      metrics: {
        totalCORCs: 1850,
        estimatedCORCs: 2400,
        permanenceRating: 76,
        projectDuration: 25,
        startDate: '2024-07-01'
      },
      dMRV: {
        activeSensors: 42,
        dataPoints: 89340,
        aiAccuracy: 91.2,
        lastUpdate: '2024-12-15T12:20:00Z',
        monitoringType: ['Soil Organic Carbon', 'Microbial Activity', 'Plant Biomass', 'Livestock Impact']
      },
      pricing: {
        currentPrice: 95,
        currency: 'CORC',
        minimumPurchase: 150,
        earlyLiquidity: 45
      },
      status: 'planning' as const,
      fundingProgress: 34,
      keywords: ['Regenerative Agriculture', 'Soil Health', 'Cattle Ranching', 'Carbon Farming'],
      sustainabilityGoals: ['Climate Action (SDG 13)', 'Sustainable Agriculture (SDG 2)', 'Life on Land (SDG 15)'],
      riskFactors: [
        'Drought conditions affecting vegetation growth',
        'Market volatility in agricultural commodities'
      ]
    }
  ];

  const handleInvest = (projectId: string) => {
    console.log('Invest in project:', projectId);
  };

  const handleLearnMore = (projectId: string) => {
    console.log('Learn more about project:', projectId);
  };

  const handleBookmark = (projectId: string) => {
    console.log('Bookmark project:', projectId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => onNavigate()}
              className="hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-6 text-primary leading-tight">
              Carbon Project
              <span className="block text-secondary">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive project information cards showcasing 
              diverse carbon sequestration initiatives worldwide with full 
              dMRV transparency and investment opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed View */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary text-center">
              Detailed Project View
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Our comprehensive project cards provide complete transparency with 
              certification details, real-time dMRV data, risk assessments, and 
              investment opportunities.
            </p>
            
            <CarbonProjectCard
              project={projects[0]}
              variant="detailed"
              onInvest={handleInvest}
              onLearnMore={handleLearnMore}
              onBookmark={handleBookmark}
            />
          </motion.div>
        </div>
      </section>

      {/* Compact Grid View */}
      <section className="py-20 px-6 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">
              Project Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Browse multiple projects in our compact card format, perfect for 
              portfolio views and quick comparisons across different project types.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CarbonProjectCard
                  project={project}
                  variant="compact"
                  onInvest={handleInvest}
                  onLearnMore={handleLearnMore}
                  onBookmark={handleBookmark}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">
              Award-Winning Design Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our Carbon Project Information Cards set new standards for 
              transparency and user experience in carbon market platforms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl border bg-background"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl mb-3 text-primary">Real-time dMRV Data</h3>
              <p className="text-muted-foreground">Live sensor data, AI accuracy ratings, and blockchain-verified measurements</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl border bg-background"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl mb-3 text-primary">Certification Transparency</h3>
              <p className="text-muted-foreground">Complete certification status with issuing authorities and verification dates</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl border bg-background"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl mb-3 text-primary">Investment Ready</h3>
              <p className="text-muted-foreground">Pricing, funding progress, risk factors, and early liquidity options</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}