import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

export function BuyersSlide02BrokenModel() {
  const problems = [
    { model: 'Broker-led Offtakes', issue: 'Expensive middlemen (20–50% markup)' },
    { model: 'Marketplace Platforms', issue: 'Fragmented, inconsistent data' },
    { model: 'Voluntary Registries', issue: 'Long delays, poor visibility' },
    { model: 'Buyers', issue: 'Pay premiums for unverifiable impact' },
  ];

  return (
    <SlideLayout
      title="The Old Model is Broken"
      subtitle="Carbon buying today is costly, opaque, and inefficient"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 flex items-center gap-4"
            >
              <X className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-lg text-primary mb-1">{problem.model}</div>
                <div className="text-muted-foreground">{problem.issue}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
}
