import { motion } from 'motion/react';
import { SlideLayout, SlideHeadline, SlideSubtitle } from '../SlideLayout';

const MALAMA_LOGO_URL = 'https://fykjijdixtcgjavidmve.supabase.co/storage/v1/object/public/website-assets/logos/logo.png';

export function ProjectsSlide00Cover() {
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
            src={MALAMA_LOGO_URL} 
            alt="Mālama Labs" 
            className="w-48 h-48 mx-auto object-contain"
          />
        </motion.div>

        <SlideHeadline>
          CO₂.0 for Projects
        </SlideHeadline>

        <SlideSubtitle className="text-slate-700">
          From Data to Dollars: Turning Verified Impact into Early Liquidity
        </SlideSubtitle>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-slate-400 text-sm"
        >
          Project Developers Presentation · 2025
        </motion.div>
      </div>
    </SlideLayout>
  );
}

