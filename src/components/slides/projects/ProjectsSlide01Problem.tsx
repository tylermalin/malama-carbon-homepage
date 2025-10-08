import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { Clock, DollarSign, Lock } from 'lucide-react';

export function ProjectsSlide01Problem() {
  return (
    <SlideLayout
      title="The Problem: Projects Locked Out of Liquidity"
      subtitle="High-impact carbon projects face long verification delays and limited financing"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto"
      >
        It can take 12–36 months before a project can issue and sell credits
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 text-center"
        >
          <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Verification Delays</h3>
          <p className="text-muted-foreground">
            Slow and expensive verification processes can take years
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-8 text-center"
        >
          <DollarSign className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-orange-700 mb-2">Cash Flow Gap</h3>
          <p className="text-muted-foreground">
            Developers face months or years of zero cash flow before credits issue
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 text-center"
        >
          <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Limited Financing</h3>
          <p className="text-muted-foreground">
            Options limited to elite developers or complex offtake agreements
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
