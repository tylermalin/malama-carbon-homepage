import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Coins, ArrowRight } from 'lucide-react';

export function ProjectsSlide05EarlyLiquidity() {
  return (
    <SlideLayout
      title="Early Liquidity: LCO₂"
      subtitle="Finance Your Project Before Final Verification"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto"
      >
        Turn verified data into immediate working capital
      </motion.p>

      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-6"
        >
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6 text-primary-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">
            <strong className="text-primary">Access 30–50%</strong> of your projected carbon credit value early
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4 bg-gradient-to-r from-secondary/10 to-accent/10 border-2 border-secondary/20 rounded-xl p-6"
        >
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <Coins className="w-6 h-6 text-secondary-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">
            <strong className="text-primary">Sell or stake LCO₂ tokens</strong> to raise funds and attract buyers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-4 bg-gradient-to-r from-accent/20 to-primary/10 border-2 border-accent/30 rounded-xl p-6"
        >
          <div className="w-12 h-12 bg-accent/50 rounded-full flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-accent-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">
            <strong className="text-primary">Use as collateral</strong> for loans or to fund equipment, labor, or validation costs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-6"
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
          <p className="text-lg text-muted-foreground">
            As your project is verified, <strong className="text-primary">tokens convert seamlessly into VCO₂ credits</strong>
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
