import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { Users, FileText, Link2, TrendingUp } from 'lucide-react';

export function BuyersSlide10PartnerNetwork() {
  return (
    <SlideLayout
      title="Join the Mālama Partner Ecosystem"
      subtitle="Expand the reach of trusted carbon finance"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
      >
        Earn referral benefits by introducing buyers, investors, and projects to Mālama. 
        We provide ready-to-use outreach materials, presentation decks, and branded referral links for advisors and ecosystem partners.
      </motion.p>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-6 text-center"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">Advisors</h3>
            <p className="text-sm text-muted-foreground">
              Connect your network with trusted carbon solutions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-xl p-6 text-center"
          >
            <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">Buyers</h3>
            <p className="text-sm text-muted-foreground">
              Access high-integrity credits at fair prices
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 rounded-xl p-6 text-center"
          >
            <FileText className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">Developers</h3>
            <p className="text-sm text-muted-foreground">
              Get early liquidity and data infrastructure
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center"
          >
            <Link2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">Mālama Labs</h3>
            <p className="text-sm text-muted-foreground">
              Connecting all stakeholders transparently
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-primary mb-3">Become a Partner</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Ready-to-use materials, branded links, and shared success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/advisory'}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Join Advisory Network
            </button>
            <button
              onClick={() => window.location.href = 'mailto:tyler@malamalabs.com'}
              className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Contact Partnership Team
            </button>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}