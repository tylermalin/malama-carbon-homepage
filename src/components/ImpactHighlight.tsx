import { motion } from 'motion/react';
import { CarbonProjectCard } from './CarbonProjectCard';
import { Button } from './ui/button';
import { Grid, ArrowRight } from 'lucide-react';

interface ImpactHighlightProps {
  onShowProjectGallery?: () => void;
}

export function ImpactHighlight({ onShowProjectGallery }: ImpactHighlightProps) {
  // Sample project data showcasing the comprehensive Carbon Project Card
  const sampleProject = {
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
      monitoringType: ['Universal dMRV', 'Automated Data Streams', 'Real-Time Metrics']
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
  };

  const handleInvest = (projectId: string) => {
    console.log('Invest in project:', projectId);
    // Handle investment logic
  };

  const handleLearnMore = (projectId: string) => {
    console.log('Learn more about project:', projectId);
    // Handle navigation to detailed project page
  };

  const handleBookmark = (projectId: string) => {
    console.log('Bookmark project:', projectId);
    // Handle bookmark logic
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-6 text-primary text-center">Detailed Project View</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">Our comprehensive project cards provide complete transparency with certification details, real-time dMRV data, risk assessments, and investment opportunities.</p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <CarbonProjectCard
              project={sampleProject}
              variant="detailed"
              onInvest={handleInvest}
              onLearnMore={handleLearnMore}
              onBookmark={handleBookmark}
            />
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
          </div>
        </motion.div>

        {/* CTA to Project Gallery */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            onClick={onShowProjectGallery}
            size="lg"
            variant="outline"
            className="hover:scale-105 transition-transform duration-300 group"
          >
            <Grid className="w-5 h-5 mr-2" />
            View All Projects
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}