import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { Zap, TrendingUp, Shield } from 'lucide-react';

export function ProjectsSlide03Solution() {
  return (
    <SlideLayout
      title="The Mālama Solution: CO₂.0"
      subtitle="Early Liquidity + Verified Data = Climate Finance for All"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto"
      >
        Transform project data into verifiable, tradable climate assets
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-8"
        >
          <Zap className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-3">Integrated dMRV</h3>
          <p className="text-muted-foreground">
            Digital measurement, reporting, and verification powered by sensors, satellite data, and AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-xl p-8"
        >
          <TrendingUp className="w-12 h-12 text-secondary mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-3">Risk-Adjusted Scoring</h3>
          <p className="text-muted-foreground">
            Liquidity Score based on verified inputs determines early financing eligibility
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 rounded-xl p-8"
        >
          <Shield className="w-12 h-12 text-accent-foreground mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-3">LCO₂ Tokens</h3>
          <p className="text-muted-foreground">
            Issue Liquid Carbon tokens before final certification — turn data into early-stage finance
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
