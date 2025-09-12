import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Footer } from './Footer';
import { 
  ArrowRight, 
  Clock, 
  DollarSign, 
  Target, 
  Activity,
  UserPlus,
  Wifi,
  Play,
  Shield,
  Coins,
  CheckCircle,
  Zap,
  BarChart3,
  Settings,
  Globe,
  Cpu
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (section?: string) => void;
  onStartProject?: () => void;
}

const benefits = [
  {
    title: "70% Faster",
    description: "Time to market compared to traditional verification",
    icon: Clock,
    color: "text-primary"
  },
  {
    title: "50% Lower Costs", 
    description: "Reduced verification and compliance expenses",
    icon: DollarSign,
    color: "text-secondary"
  },
  {
    title: "99.9% Accuracy",
    description: "AI-powered measurement and validation", 
    icon: Target,
    color: "text-accent-foreground"
  },
  {
    title: "Real-time",
    description: "Continuous monitoring and instant reporting",
    icon: Activity,
    color: "text-primary"
  }
];

const processSteps = [
  {
    number: "01",
    title: "Sign Up & Onboard",
    subtitle: "Register your project and connect with our platform",
    timeline: "1-2 weeks",
    tasks: [
      "Complete project assessment",
      "Connect monitoring infrastructure", 
      "Set up data feeds",
      "Configure compliance settings"
    ],
    icon: UserPlus,
    color: "bg-primary"
  },
  {
    number: "02", 
    title: "Sensor Deployment",
    subtitle: "Deploy AI-powered monitoring sensors on your land",
    timeline: "2-3 weeks",
    tasks: [
      "Install IoT monitoring devices",
      "Calibrate measurement systems",
      "Establish data connectivity", 
      "Test automated reporting"
    ],
    icon: Wifi,
    color: "bg-secondary"
  },
  {
    number: "03",
    title: "Production & Tracking", 
    subtitle: "Deploy any accepted carbon credit protocol with real-time monitoring",
    timeline: "Ongoing",
    tasks: [
      "Support for all carbon removal methodologies",
      "Biochar, Rock Weathering, Afforestation protocols",
      "Regenerative Agriculture & Blue Carbon tracking",
      "Real-time process monitoring & validation",
      "Quality assurance across all project types"
    ],
    icon: Play,
    color: "bg-accent-foreground"
  },
  {
    number: "04",
    title: "Automated Verification",
    subtitle: "AI-powered validation through our dMRV engine", 
    timeline: "Real-time",
    tasks: [
      "Continuous data validation",
      "Compliance verification",
      "Third-party audits",
      "Credit calculation"
    ],
    icon: Shield,
    color: "bg-primary"
  },
  {
    number: "05",
    title: "Credit Issuance & Trading",
    subtitle: "Mint and trade verified LCO₂/VCO₂ credits on blockchain",
    timeline: "Monthly", 
    tasks: [
      "Automated credit minting",
      "Marketplace listing",
      "Revenue optimization",
      "Transaction settlement"
    ],
    icon: Coins,
    color: "bg-secondary"
  }
];

export function HowItWorksPage({ onNavigate, onStartProject }: HowItWorksPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-primary font-medium">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto">
              From setup to credit sales, our streamlined process makes carbon removal accessible and profitable
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={onStartProject}
                className="hover:scale-105 transition-transform duration-300"
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const element = document.getElementById('process-steps');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:scale-105 transition-transform duration-300"
              >
                See Process
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Platform */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proven advantages that accelerate your carbon removal project
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
                  <CardContent className="p-8 text-center">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-medium text-primary mb-3">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-foreground/80">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section id="process-steps" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              The Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Five simple steps to transform your carbon removal project into a profitable venture
            </p>
          </motion.div>
          
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-none bg-gradient-to-r from-[rgba(27,67,50,0.03)] via-[rgba(10,61,63,0.02)] to-[rgba(236,230,218,0.05)] backdrop-blur-sm shadow-[0_8px_24px_rgba(27,67,50,0.08)]">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-12 gap-0">
                      {/* Number and Icon */}
                      <div className="lg:col-span-2 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 flex flex-col items-center justify-center">
                        <div className="text-6xl font-medium text-primary/20 mb-4">
                          {step.number}
                        </div>
                        <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="lg:col-span-7 p-8">
                        <h3 className="text-2xl font-medium text-primary mb-2">
                          {step.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-6">
                          {step.subtitle}
                        </p>
                        
                        <div className="space-y-3">
                          {step.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-foreground/80">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Timeline */}
                      <div className="lg:col-span-3 bg-gradient-to-br from-muted/20 to-muted/10 p-8 flex flex-col items-center justify-center border-l border-border/50">
                        <Clock className="w-8 h-8 text-primary mb-4" />
                        <Badge variant="outline" className="text-sm font-medium border-primary/20 text-primary bg-primary/5">
                          {step.timeline}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Visualization */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Seamless Integration
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform integrates every step for maximum efficiency and profitability
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-primary mb-3">Smart Automation</h3>
              <p className="text-foreground/80">
                AI-powered systems handle measurement, validation, and compliance automatically
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-medium text-primary mb-3">Global Standards</h3>
              <p className="text-foreground/80">
                Compatible with all major carbon credit standards and verification bodies
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-accent-foreground/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-medium text-primary mb-3">Market Access</h3>
              <p className="text-foreground/80">
                Direct access to premium carbon credit markets with optimized pricing
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the carbon removal revolution with our proven platform and expert support
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={onStartProject}
                className="hover:scale-105 transition-transform duration-300"
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate()}
                className="hover:scale-105 transition-transform duration-300"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}