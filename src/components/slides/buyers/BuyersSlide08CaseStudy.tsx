import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { TrendingDown, DollarSign, CheckCircle } from 'lucide-react';

export function BuyersSlide07CaseStudy() {
  return (
    <SlideLayout
      title="Case Study"
      subtitle="Verified Impact, Lower Cost"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-2xl p-8 mb-8 text-center"
        >
          <h3 className="text-xl font-semibold text-primary mb-4">Fortune 1000 Buyer</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Pre-purchased <strong className="text-primary">1,000 tons</strong> of biochar carbon removal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 text-center"
          >
            <div className="text-sm text-red-600 font-medium mb-2">Spot Market</div>
            <div className="text-5xl font-bold text-red-600 mb-2">$180</div>
            <div className="text-sm text-red-700">/ton</div>
            <div className="mt-4 text-2xl font-bold text-red-600">$180,000</div>
            <div className="text-xs text-red-600 mt-1">Total Cost</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 text-center"
          >
            <div className="text-sm text-green-600 font-medium mb-2">LCO₂ Price</div>
            <div className="text-5xl font-bold text-green-600 mb-2">$125</div>
            <div className="text-sm text-green-700">/ton</div>
            <div className="mt-4 text-2xl font-bold text-green-600">$125,000</div>
            <div className="text-xs text-green-600 mt-1">Total Cost</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
            <TrendingDown className="w-10 h-10 mx-auto mb-2" />
            <div className="text-4xl font-bold mb-1">31%</div>
            <div className="text-sm">Cost Savings</div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center">
            <CheckCircle className="w-10 h-10 mx-auto mb-2" />
            <div className="text-xl font-bold mb-1">Auto-Converted to VCO₂</div>
            <div className="text-sm">with on-chain proof</div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
