import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { TrendingUp, Globe, Users } from 'lucide-react';

export function ProjectsSlide02Opportunity() {
  return (
    <SlideLayout
      title="The Opportunity"
      subtitle="The World Needs More Verified Carbon Projects, Faster"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto"
      >
        Small and community-led projects represent the largest untapped potential
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 text-center"
        >
          <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-700 mb-3">Supply Gap</h3>
          <p className="text-muted-foreground">
            Demand for high-integrity carbon credits exceeds verified supply
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 text-center"
        >
          <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-700 mb-3">Infrastructure Gap</h3>
          <p className="text-muted-foreground">
            Local projects often lack data infrastructure, verification support, and pre-finance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-xl p-8 text-center"
        >
          <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-emerald-700 mb-3">Impact Opportunity</h3>
          <p className="text-muted-foreground">
            Bridging this gap accelerates climate action, jobs, and resilience
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
