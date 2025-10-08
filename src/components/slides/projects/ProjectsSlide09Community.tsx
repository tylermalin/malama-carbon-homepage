import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { Users, TrendingUp, Shield, Globe } from 'lucide-react';

export function ProjectsSlide09Community() {
  return (
    <SlideLayout
      title="Empowering Communities"
      subtitle="Turning Local Action into Verified Global Impact"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
      >
        Mālama's tools are designed for <strong className="text-primary">inclusion</strong> — enabling smallholders, 
        Indigenous stewards, and local developers to:
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-8 text-center"
        >
          <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-3">Retain More Value</h3>
          <p className="text-muted-foreground">
            Capture the full value of their land and labor without expensive intermediaries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-xl p-8 text-center"
        >
          <Shield className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-3">Build Trust</h3>
          <p className="text-muted-foreground">
            Access transparent data tools that build trust with funders and buyers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 rounded-xl p-8 text-center"
        >
          <Globe className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-3">Connect Globally</h3>
          <p className="text-muted-foreground">
            Connect directly to climate finance and international buyers
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 text-center max-w-3xl mx-auto"
      >
        <Users className="w-12 h-12 text-primary mx-auto mb-4" />
        <p className="text-lg text-muted-foreground italic">
          "Climate solutions work best when they work for everyone"
        </p>
      </motion.div>
    </SlideLayout>
  );
}
