import { motion } from 'motion/react';
import { SlideLayout, SlideHeadline, SlideSubtitle } from './SlideLayout';
import malamaLogo from '../../assets/malamalabbs.png';

export function Slide01Cover() {
  return (
    <SlideLayout className="text-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Particle dots */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-emerald-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="inline-block mb-12"
        >
          <img 
            src={malamaLogo} 
            alt="Mālama Labs" 
            className="w-48 h-48 mx-auto object-contain"
          />
        </motion.div>

        <SlideHeadline>
          Co2.0
        </SlideHeadline>

        <SlideSubtitle className="text-slate-700">
          Building the Digital Infrastructure for Compliance-Grade Carbon Markets
        </SlideSubtitle>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-slate-400 text-sm"
        >
          Investor Presentation · 2025
        </motion.div>
      </div>
    </SlideLayout>
  );
}

