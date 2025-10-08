import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, DollarSign, Shield } from 'lucide-react';

export function BuyersSlide05LCO2Advantage() {
  return (
    <SlideLayout
      title="The LCO₂ Advantage"
      subtitle="Buy Earlier. Save More. Drive Measurable Impact."
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-2xl p-8 mb-8 text-center"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">What is LCO₂?</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <strong className="text-primary">Liquid Carbon (LCO₂)</strong> = Pre-financed, risk-adjusted carbon removal token that converts to <strong className="text-primary">Verified Carbon (VCO₂)</strong> after full MRV verification
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center"
          >
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-green-700 mb-3">Discounted Pricing</h4>
            <p className="text-muted-foreground text-sm">
              10–40% savings compared to spot credits
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center"
          >
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-blue-700 mb-3">Pre-Finance Projects</h4>
            <p className="text-muted-foreground text-sm">
              Enable transparent pre-finance for early-stage projects
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-xl p-6 text-center"
          >
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h4 className="font-semibold text-emerald-700 mb-3">Automatic Conversion</h4>
            <p className="text-muted-foreground text-sm">
              Converts to VCO₂ after full MRV verification
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-lg">
            LCO₂
          </div>
          <ArrowRight className="w-8 h-8 text-primary" />
          <div className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold text-lg">
            Verification
          </div>
          <ArrowRight className="w-8 h-8 text-primary" />
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg">
            VCO₂
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}