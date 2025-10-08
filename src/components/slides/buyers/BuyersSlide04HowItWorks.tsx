import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { Search, BarChart3, DollarSign, CheckCircle, Target } from 'lucide-react';

export function BuyersSlide04HowItWorks() {
  const steps = [
    { icon: Search, title: 'Discover', desc: 'Browse pre-verified carbon projects on Mālama' },
    { icon: BarChart3, title: 'Review', desc: 'Real-time data and methodology-based risk scores' },
    { icon: DollarSign, title: 'Pre-Purchase', desc: 'Buy LCO₂ tokens (discounted early access)' },
    { icon: CheckCircle, title: 'Convert', desc: 'LCO₂ automatically converts to VCO₂ after verification' },
    { icon: Target, title: 'Retire', desc: 'Retire credits instantly with on-chain proof' },
  ];

  return (
    <SlideLayout
      title="How It Works"
      subtitle="From Data to Verified Credits — A Transparent Lifecycle"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold text-secondary-foreground">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}
