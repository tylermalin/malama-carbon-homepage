import React from 'react';
import { motion } from '../utils/motion';
import { Button } from './ui/button';
import { ArrowRight, Globe, BookOpen } from 'lucide-react';
import malamaLogo from '../assets/malamalabbs.png';

interface CarbonTimelineLandingProps {
  onExploreTimeline?: () => void;
  onLearnAboutMalama?: () => void;
  onAbout?: () => void;
  onProjects?: () => void;
  onJoin?: () => void;
  onShowActIII?: () => void;
}

export function CarbonTimelineLanding({ 
  onExploreTimeline, 
  onLearnAboutMalama, 
  onAbout, 
  onProjects, 
  onJoin,
  onShowActIII 
}: CarbonTimelineLandingProps) {
  // Debug logging
  console.log('CarbonTimelineLanding props:', {
    onExploreTimeline,
    onLearnAboutMalama,
    onAbout,
    onProjects,
    onJoin,
    onShowActIII
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Animated World Map Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMHRvcG9ncmFwaGljfGVufDF8fHx8MTc1NjI3MjkwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')] bg-cover bg-center bg-no-repeat"></div>
      </div>

      {/* Animated Particle Flow */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Mālama Labs Logo */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={malamaLogo} 
              alt="Mālama Labs" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <p className="text-lg text-slate-600 font-medium">
              Mālama Labs
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            The 60-Year Story of
            <br />
            <span className="text-amber-600">Carbon Markets</span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-slate-700 mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            From Theory to Technology: How Carbon Markets Evolved
          </motion.p>

          {/* Mālama Labs Tagline */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Turning nature-based impact into verified, investable climate solutions
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button 
              size="lg" 
              onClick={() => {
                console.log('Explore Timeline button clicked, onExploreTimeline:', onExploreTimeline);
                if (onExploreTimeline) {
                  onExploreTimeline();
                } else {
                  console.error('onExploreTimeline is undefined!');
                }
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Globe className="w-5 h-5 mr-2" />
              Explore Timeline
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onLearnAboutMalama}
              className="border-2 border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white font-semibold px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Learn About Mālama Labs
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
