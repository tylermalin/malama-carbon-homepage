import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { CheckCircle, Shield, TrendingUp } from 'lucide-react';

export function BuyersSlide03CO2Solution() {
  return (
    <SlideLayout
      title="Introducing CO₂.0"
      subtitle="Mālama Labs makes verified carbon access universal"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto"
      >
        A transparent, blockchain-powered ecosystem for trusted climate credits
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-6 text-center"
        >
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">Risk Transparency</h3>
          <p className="text-muted-foreground">
            Connect directly to verified projects with full risk transparency
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-xl p-6 text-center"
        >
          <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">Early Access</h3>
          <p className="text-muted-foreground">
            Buy early-stage Liquid Carbon (LCO₂) tokens at fair, risk-adjusted prices
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 rounded-xl p-6 text-center"
        >
          <CheckCircle className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">On-Chain Tracking</h3>
          <p className="text-muted-foreground">
            Track every ton from issuance to retirement on blockchain
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
