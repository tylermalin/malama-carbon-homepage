import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { TrendingDown } from 'lucide-react';

export function BuyersSlide01Problem() {
  return (
    <SlideLayout
      title="The Problem: The 99% Lockout"
      subtitle="The carbon credit market is built for the few, not the many"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p className="text-lg text-muted-foreground">
                <strong className="text-primary">Only the largest corporations</strong> access offtake agreements
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p className="text-lg text-muted-foreground">
                Most buyers rely on <strong className="text-primary">brokers, intermediaries, or fragmented marketplaces</strong>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <p className="text-lg text-muted-foreground">
                Lack of transparency drives <strong className="text-primary">price inflation, greenwashing, and reputational risk</strong>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-full max-w-md">
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-8 text-center">
              <TrendingDown className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <div className="space-y-6">
                <div>
                  <div className="text-5xl font-bold text-red-600 mb-2">1%</div>
                  <p className="text-sm text-red-700">Elite buyers with access</p>
                </div>
                <div className="border-t-2 border-red-300 pt-6">
                  <div className="text-5xl font-bold text-red-600 mb-2">99%</div>
                  <p className="text-sm text-red-700">Locked out of quality deals</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
