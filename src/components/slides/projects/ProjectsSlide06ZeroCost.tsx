import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';

export function ProjectsSlide06ZeroCost() {
  return (
    <SlideLayout
      title="Zero Upfront Costs"
      subtitle="Mālama only earns when your project generates revenue"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Model */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <X className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-semibold text-red-700">Traditional Consultancy</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-700" />
                </div>
                <span className="text-muted-foreground">$50K–$200K upfront fees</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-700" />
                </div>
                <span className="text-muted-foreground">Pay before any revenue</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-700" />
                </div>
                <span className="text-muted-foreground">Consultant keeps fee regardless of outcome</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-red-700" />
                </div>
                <span className="text-muted-foreground">High financial risk for developers</span>
              </li>
            </ul>
          </motion.div>

          {/* Mālama Partnership */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-semibold text-green-700">Mālama Partnership</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-muted-foreground"><strong className="text-primary">$0 upfront</strong> — no documentation fees</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-muted-foreground">We co-develop your MRV plan & integrate sensors</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-muted-foreground">Fees deducted <strong className="text-primary">only when credits sell</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-muted-foreground">Aligned incentives — we succeed when you succeed</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
