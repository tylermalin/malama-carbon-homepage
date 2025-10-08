import { motion } from 'motion/react';
import { Button } from './ui/button';
import { UserPlus, FileText, Wifi, BarChart3, Coins, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Register your project and connect with the Mālama platform. Gain access to your personalized dashboard, onboarding tools, and support team.",
    step: "01"
  },
  {
    icon: FileText,
    title: "Project Documentation & Planning",
    description: "Work with our team to design a complete measurement and monitoring plan. Define project boundaries, data sources, and methodology pathways to ensure alignment with recognized carbon accounting standards.",
    step: "02"
  },
  {
    icon: Wifi,
    title: "Sensor Deployment & Testing",
    description: "Deploy AI-powered environmental sensors and connect to the Mālama dMRV network. Our system integrates field sensors, satellite data, and analytics to monitor carbon flows with precision and transparency.",
    step: "03"
  },
  {
    icon: BarChart3,
    title: "Validate – Automated Reporting & Compliance",
    description: "Automate reporting and streamline compliance across multiple programs — including tax credit pathways (45Q), compliance markets (LCFS), and voluntary registries (Isometric, Verra, Puro.earth). All outputs are audit-ready, verifiable, and instantly traceable.",
    step: "04"
  },
  {
    icon: Coins,
    title: "On-Chain Issue",
    description: "Once validated, credits are issued as LCO₂ (Liquid Carbon) and converted to VCO₂ (Verified Carbon) upon certification. Your verified credits are tokenized on-chain, enabling transparent trading, traceable retirement, and integration with global climate markets.",
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Accurately measure, quantify, and report every molecule of CO₂ in your operations — from field to finance — to support project commercialization and regulatory compliance.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes carbon removal accessible, auditable, and profitable.
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