import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';

export function BuyersSlide07MalamaDifference() {
  const comparisons = [
    { 
      feature: 'Transparency',
      traditional: 'Hidden project info',
      malama: 'Full on-chain data lineage',
      malamaWins: true
    },
    { 
      feature: 'Pricing',
      traditional: 'Markups & opacity',
      malama: 'Transparent market pricing',
      malamaWins: true
    },
    { 
      feature: 'Verification',
      traditional: 'Offline docs',
      malama: 'Real-time digital MRV',
      malamaWins: true
    },
    { 
      feature: 'Access',
      traditional: 'Limited to elite buyers',
      malama: 'Open to all qualified participants',
      malamaWins: true
    },
    { 
      feature: 'Liquidity',
      traditional: 'Manual resale',
      malama: 'Smart-contract-enabled trading',
      malamaWins: true
    },
  ];

  return (
    <SlideLayout
      title="The Mālama Difference"
      subtitle="Integrity and Access, Not Intermediation"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-border/50 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-primary/10 to-secondary/10 border-b-2 border-border/50">
            <div className="p-4 font-semibold text-primary">Feature</div>
            <div className="p-4 font-semibold text-red-600 border-l-2 border-border/50">Traditional Broker</div>
            <div className="p-4 font-semibold text-green-600 border-l-2 border-border/50">Mālama Labs</div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="grid grid-cols-3 border-b border-border/30 hover:bg-accent/10 transition-colors"
            >
              <div className="p-4 font-medium text-primary">{row.feature}</div>
              <div className="p-4 border-l-2 border-border/50 flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{row.traditional}</span>
              </div>
              <div className="p-4 border-l-2 border-border/50 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">{row.malama}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}