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
    id: 'hawaii-macadamia-biochar-2024',
    name: 'Hawaiʻi Macadamia Biochar Project',
    developer: {
      name: 'Pacific Agroforestry Co-op',
      verified: true
    },
    type: 'biochar' as const,
    location: {
      country: 'United States',
      region: 'Hawaiʻi',
      coordinates: { lat: 19.8968, lng: -155.5828 }
    },
    images: [
      'https://images.unsplash.com/photo-1720170723453-dd9de7397bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYWNhZGFtaWElMjBudXRzJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU2MjcyOTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1576611807771-75a0723cba7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9jaGFyJTIwcHJvZHVjdGlvbiUyMGNhcmJvbiUyMHNlcXVlc3RyYXRpb258ZW58MXx8fHwxNzU2OTg4NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1637552481611-1f36222fb188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBwbGFudGF0aW9uJTIwc3VzdGFpbmFibGUlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTY5ODg0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    description: 'Converting agricultural waste from macadamia nut processing into high-quality biochar for permanent carbon sequestration. This project supports local farmers while creating durable carbon removal credits verified through our advanced dMRV platform.',
    
    certifications: [
      {
        standard: 'LC02 Biochar Standard',
        status: 'verified' as const,
        certifier: 'Puro.earth',
        date: '2024-03-15'
      },
      {
        standard: 'Verra VCS',
        status: 'in_progress' as const,
        certifier: 'Verra'
      },
      {
        standard: 'Gold Standard',
        status: 'pending' as const,
        certifier: 'Gold Standard Foundation'
      }
    ],
    
    metrics: {
      totalCORCs: 2500,
      estimatedCORCs: 3200,
      permanenceRating: 95,
      projectDuration: 10,
      startDate: '2024-01-15',
      verificationDate: '2024-08-20'
    },
    
    dMRV: {
      activeSensors: 24,
      dataPoints: 156840,
      aiAccuracy: 97.3,
      lastUpdate: '2024-12-15T10:30:00Z',
      monitoringType: ['Temperature', 'Moisture', 'pH Levels', 'Carbon Content', 'Biochar Stability']
    },
    
    pricing: {
      currentPrice: 120,
      currency: 'CORC',
      minimumPurchase: 100,
      earlyLiquidity: 35
    },
    
    status: 'active' as const,
    fundingProgress: 78,
    
    keywords: [
      'Biochar',
      'Agricultural Waste',
      'Macadamia Processing',
      'Hawaii Agriculture',
      'Circular Economy',
      'Soil Enhancement'
    ],
    
    sustainabilityGoals: [
      'Climate Action (SDG 13)',
      'Sustainable Agriculture (SDG 2)',
      'Clean Energy (SDG 7)',
      'Responsible Consumption (SDG 12)'
    ],
    
    riskFactors: [
      'Weather dependency for biomass availability',
      'Market fluctuations in carbon credit pricing',
      'Regulatory changes in carbon markets'
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
          <h2 className="text-4xl md:text-5xl mb-6 text-primary font-bold">
            Featured Carbon Project
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our flagship biochar carbon sequestration project showcasing 
            comprehensive dMRV monitoring, verified impact, and investment opportunities
          </p>
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