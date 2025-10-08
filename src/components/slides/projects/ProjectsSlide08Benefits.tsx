import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { DollarSign, BarChart3, Globe, Shield, TrendingUp } from 'lucide-react';

export function ProjectsSlide08Benefits() {
  const benefits = [
    { icon: DollarSign, text: 'Early liquidity — fund your project immediately' },
    { icon: BarChart3, text: 'Data-backed verification — automate MRV with AI & sensors' },
    { icon: Globe, text: 'Global market access — reach buyers directly via blockchain' },
    { icon: Shield, text: 'Compliance-ready — align with Puro.earth, Isometric, and Article 6.4' },
    { icon: TrendingUp, text: 'Fair economics — shared upside, no upfront cost' },
  ];

  return (
    <SlideLayout
      title="Benefits for Project Developers"
      subtitle="Faster, Fairer, More Transparent Carbon Project Finance"
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
