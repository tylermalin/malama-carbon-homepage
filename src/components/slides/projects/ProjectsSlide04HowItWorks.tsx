import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { UserPlus, FileText, Wifi, BarChart3, Coins } from 'lucide-react';

export function ProjectsSlide04HowItWorks() {
  const steps = [
    { 
      icon: UserPlus, 
      title: 'Sign Up & Define Scope', 
      desc: 'Work with our team to establish your measurement plan'
    },
    { 
      icon: Wifi, 
      title: 'Deploy Sensors & Connect', 
      desc: 'Integrate IoT and satellite feeds through Universal dMRV network'
    },
    { 
      icon: BarChart3, 
      title: 'Automated Analysis', 
      desc: 'AI-driven models assess permanence, additionality, and leakage'
    },
    { 
      icon: Coins, 
      title: 'Receive LCO₂ Tokens', 
      desc: 'Access early liquidity based on validated metrics'
    },
    { 
      icon: FileText, 
      title: 'Full Verification', 
      desc: 'LCO₂ converts into verified VCO₂ credits upon certification'
    },
  ];

  return (
    <SlideLayout
      title="How It Works"
      subtitle="From Project Setup to Verified Credits — All in One Platform"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-border/50 rounded-xl p-6"
            >
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold text-secondary-foreground">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SlideLayout>
  );
}
