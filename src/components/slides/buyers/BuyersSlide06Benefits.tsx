import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { CheckCircle, TrendingDown, Shield, Activity, Globe } from 'lucide-react';

export function BuyersSlide06Benefits() {
  const benefits = [
    { icon: CheckCircle, text: 'Early access to verified projects' },
    { icon: Shield, text: 'Transparent, real-time data and risk scoring' },
    { icon: TrendingDown, text: 'Lower cost per ton (20–40% savings)' },
    { icon: Activity, text: 'On-chain traceability and audit-ready reports' },
    { icon: Globe, text: 'Seamless ESG & SDG integration' },
  ];

  return (
    <SlideLayout
      title="For Buyers, This Means"
      subtitle="Trusted Access to Transparent, Affordable Climate Action"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <span className="text-2xl">✅</span>
                {benefit.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SlideLayout>
  );
}