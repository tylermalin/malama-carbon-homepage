import React from 'react';
import { motion } from '../utils/motion';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const MALAMA_LOGO_URL = 'https://fykjijdixtcgjavidmve.supabase.co/storage/v1/object/public/website-assets/logos/logo.png';

// Track CTA clicks
async function trackCTA(buttonLabel: string, destination: string) {
  try {
    const { analytics } = await import('../lib/analytics');
    await analytics.trackCTAClick({
      buttonLabel,
      buttonLocation: 'hero',
      pageName: 'home',
      destination
    });
  } catch (error) {
    console.error('Failed to track CTA:', error);
  }
}

interface HeroSectionProps {
  onExplorePlatform?: () => void;
  onHowItWorks?: () => void;
  onStartProject?: () => void;
  onLandSteward?: () => void;
  onShowDocumentation?: () => void;
  onShowBlog?: () => void;
  onShowProjectGallery?: () => void;
  onShowTimeline?: () => void;
}

export function HeroSection({ onExplorePlatform, onHowItWorks, onStartProject, onLandSteward, onShowDocumentation, onShowBlog, onShowProjectGallery, onShowTimeline }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(27, 67, 50, 0.4), rgba(10, 61, 63, 0.4)), url('https://images.unsplash.com/photo-1546064125-11154220541f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xjYW5vJTIwbGFuZHNjYXBlJTIwaGF3YWlpfGVufDF8fHx8MTc1NjI3MjkwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      
      {/* Logo */}
      <motion.div 
        className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <img 
          src={MALAMA_LOGO_URL} 
          alt="Mālama Labs" 
          width="300"
          height="300"
          className="object-contain hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-16">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white font-medium"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          C02.0
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Pre-certify any durable carbon methodology, on any certification platform. Automate credit creation, reporting, and monitoring with our Universal dMRV and Climate Intelligence Network.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            onClick={() => {
              trackCTA('Start Your Project', '/signup');
              onStartProject?.();
            }}
            className="bg-white text-primary hover:bg-white/90 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Start Your Project
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              trackCTA('For Project Developers', '/land-steward');
              onLandSteward?.();
            }}
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            For Project Developers
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              trackCTA('Explore the Platform', '/platform');
              onExplorePlatform?.();
            }}
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Explore the Platform
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              trackCTA('How It Works', '/how-it-works');
              onHowItWorks?.();
            }}
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            How It Works
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onShowTimeline}
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Carbon Timeline
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}