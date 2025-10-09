import { motion } from 'motion/react';
import { SlideLayout, SlideHeadline, SlideSubtitle } from '../SlideLayout';
import malamaLogo from '../../../assets/malamalabbs.png';

export function BuyersSlide00Cover() {
  return (
    <SlideLayout className="text-center">
      <div>
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
          CO₂.0 for Buyers
        </SlideHeadline>

        <SlideSubtitle className="text-slate-700">
          Democratizing Access to High-Integrity Carbon Credits
        </SlideSubtitle>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-slate-400 text-sm"
        >
          Carbon Credit Buyers Presentation · 2025
        </motion.div>
      </div>
    </SlideLayout>
  );
}

