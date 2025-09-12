import { motion } from 'motion/react';
import { Button } from './ui/button';
import { UserPlus, Settings, Flame, CheckCircle, Coins, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Register your project and connect with our platform",
    step: "01"
  },
  {
    icon: Settings,
    title: "Sensor Install",
    description: "Deploy AI-powered monitoring sensors on your land",
    step: "02"
  },
  {
    icon: Flame,
    title: "Biochar Creation",
    description: "Convert organic waste into stable biochar using our protocols",
    step: "03"
  },
  {
    icon: CheckCircle,
    title: "Credit Validation",
    description: "Automated verification through our dMRV engine",
    step: "04"
  },
  {
    icon: Coins,
    title: "On-chain Issue",
    description: "Mint and trade verified LC02/VC02 credits on blockchain",
    step: "05"
  }
];

interface HowItWorksProps {
  onShowDetailedProcess?: () => void;
  onLaunchProject?: () => void;
}

export function HowItWorks({ onShowDetailedProcess, onLaunchProject }: HowItWorksProps) {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-primary font-bold">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From setup to credit sales, our streamlined process makes carbon removal accessible and profitable
          </p>
        </motion.div>
        
        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30"></div>
            
            <div className="grid grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    {/* Step Number */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium z-10">
                      {step.step}
                    </div>
                    
                    {/* Icon Circle */}
                    <div className="w-20 h-20 bg-background border-4 border-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h3 className="text-xl mb-3 text-primary">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-primary bg-muted px-2 py-1 rounded">
                    {step.step}
                  </span>
                  <h3 className="text-lg text-primary">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={onLaunchProject}
              className="hover:scale-105 transition-transform duration-300"
            >
              Launch Your Project
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onShowDetailedProcess}
              className="hover:scale-105 transition-transform duration-300 group"
            >
              See Detailed Process
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}