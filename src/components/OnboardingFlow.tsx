import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Leaf, 
  Code, 
  ShoppingCart, 
  Handshake, 
  ArrowRight, 
  CheckCircle,
  MapPin,
  FileText,
  TrendingUp,
  Key,
  Book,
  Users,
  Building,
  Target,
  BarChart3,
  CreditCard,
  Settings,
  Globe
} from 'lucide-react';

interface FlowStep {
  title: string;
  description: string;
  icon: any;
  details: string[];
}

interface UserType {
  id: string;
  title: string;
  headline: string;
  subheadline: string;
  icon: any;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  ctaText: string;
  steps: FlowStep[];
}

const userTypes: UserType[] = [
  {
    id: 'stewards',
    title: 'Project Developers',
    headline: 'Earn from regenerative practices',
    subheadline: 'Transform your agricultural waste into valuable carbon credits while improving soil health and generating new income.',
    icon: Leaf,
    color: 'text-green-600',
    gradientFrom: 'from-green-50',
    gradientTo: 'to-emerald-50',
    ctaText: 'Get Started as a Steward',
    steps: [
      {
        title: 'Intro Questionnaire',
        description: 'Tell us about your land and operations',
        icon: FileText,
        details: [
          'Do you currently manage land or agricultural operations?',
          'What type of biomass or waste do you produce?',
          'Are you interested in biochar, tree planting, or regenerative farming?'
        ]
      },
      {
        title: 'TMK or Land ID Upload',
        description: 'Verify your land ownership or management rights',
        icon: MapPin,
        details: [
          'Enter your TMK or land documentation',
          'Upload optional map or documents (e.g., lease, deed)'
        ]
      },
      {
        title: 'Baseline Assessment',
        description: 'Understand your carbon potential and earnings',
        icon: TrendingUp,
        details: [
          'Receive estimated carbon potential',
          'Preview sample earnings model based on LC token issuance'
        ]
      },
      {
        title: 'Sign Up for Steward Portal',
        description: 'Access your project management dashboard',
        icon: CheckCircle,
        details: [
          'Create account to manage projects, upload field data, and receive LC tokens',
          'Grant access to mobile MRV onboarding tools'
        ]
      }
    ]
  },
  {
    id: 'developers',
    title: 'Developers',
    headline: 'Build tools on our APIs',
    subheadline: 'Access comprehensive APIs for carbon measurement, verification, and trading. Create innovative climate solutions on our open platform.',
    icon: Code,
    color: 'text-blue-600',
    gradientFrom: 'from-blue-50',
    gradientTo: 'to-indigo-50',
    ctaText: 'Request API Access',
    steps: [
      {
        title: 'Developer Use Case Selection',
        description: 'Define your integration goals',
        icon: Target,
        details: [
          'Are you building an MRV tool, marketplace, DAO, or integration?'
        ]
      },
      {
        title: 'API Key Request',
        description: 'Get access to our development environment',
        icon: Key,
        details: [
          'Create developer account',
          'Request access to staging API environment'
        ]
      },
      {
        title: 'Documentation Hub',
        description: 'Explore comprehensive API resources',
        icon: Book,
        details: [
          'MRV endpoints (sensor, satellite, field data)',
          'Token issuance (LC, VC, insurance pool)',
          'Credit marketplace and retirement'
        ]
      },
      {
        title: 'Join Dev Community',
        description: 'Connect with other developers and get support',
        icon: Users,
        details: [
          'Optional: Join Discord or Slack for developer updates, grants, and support'
        ]
      }
    ]
  },
  {
    id: 'buyers',
    title: 'Buyers',
    headline: 'Purchase LC02 with transparency',
    subheadline: 'Buy high-quality, verified carbon removal credits with complete traceability and blockchain-verified provenance.',
    icon: ShoppingCart,
    color: 'text-purple-600',
    gradientFrom: 'from-purple-50',
    gradientTo: 'to-violet-50',
    ctaText: 'Explore Available Credits',
    steps: [
      {
        title: 'Buyer Profile Creation',
        description: 'Set up your organization profile',
        icon: Building,
        details: [
          'Organization type: Corporate, DAO, Government, Investor',
          'Intended use: Offset, treasury, resale, compliance'
        ]
      },
      {
        title: 'Credit Preference Setup',
        description: 'Define your carbon credit requirements',
        icon: Settings,
        details: [
          'Volume range: 1,000 – 100,000+ tCO₂',
          'Preferred method: Biochar, regenerative ag, forestry',
          'Risk tolerance: Platinum, Gold, Silver LC tiers'
        ]
      },
      {
        title: 'Marketplace Access',
        description: 'Browse and purchase verified credits',
        icon: CreditCard,
        details: [
          'Browse available LC token batches',
          'View project details, pricing, trust score, MRV data',
          'Add to cart or reserve allocation'
        ]
      },
      {
        title: 'Dashboard Enrollment',
        description: 'Manage your carbon portfolio',
        icon: BarChart3,
        details: [
          'Set up recurring purchases, monitor unlocks, retire credits, or export reports'
        ]
      }
    ]
  },
  {
    id: 'partners',
    title: 'Partners',
    headline: 'Help us scale',
    subheadline: 'Join our network of technology providers, research institutions, and climate organizations accelerating global carbon removal.',
    icon: Handshake,
    color: 'text-orange-600',
    gradientFrom: 'from-orange-50',
    gradientTo: 'to-amber-50',
    ctaText: 'Become a Partner',
    steps: [
      {
        title: 'Partner Type Selection',
        description: 'Choose your organization type',
        icon: Building,
        details: [
          'Technology provider',
          'Academic institution',
          'NGO or nonprofit',
          'Policy or registry org'
        ]
      },
      {
        title: 'Partnership Interest Form',
        description: 'Share your collaboration goals',
        icon: FileText,
        details: [
          'Project or tool overview',
          'Desired collaboration (e.g., research, co-development, data sharing)'
        ]
      },
      {
        title: 'Use Case Mapping',
        description: 'Align with our platform capabilities',
        icon: Globe,
        details: [
          'Connect to MRV stack, site deployments, or pilot project pathways',
          'Option to schedule strategy call'
        ]
      },
      {
        title: 'Mālama Partner Portal Access',
        description: 'Access exclusive partner resources',
        icon: CheckCircle,
        details: [
          'Partner resources',
          'API sandbox',
          'Grant and collaboration announcements'
        ]
      }
    ]
  }
];

export function OnboardingFlow() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setCurrentStep(0);
  };

  const handleBackToTypes = () => {
    setSelectedType(null);
    setCurrentStep(0);
  };

  const selectedUserType = userTypes.find(type => type.id === selectedType);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-primary font-bold">
            Choose Your Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started with Mālama Labs based on your role in the carbon removal ecosystem
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedType ? (
            <motion.div
              key="user-types"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {userTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.05)] via-[rgba(10,61,63,0.03)] to-[rgba(236,230,218,0.08)] backdrop-blur-sm border border-[rgba(27,67,50,0.1)] shadow-[0_8px_24px_rgba(27,67,50,0.08)] overflow-hidden"
                    onClick={() => handleTypeSelect(type.id)}
                  >
                    <CardContent className="p-8 relative">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-center mb-6">
                          <div className={`w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <type.icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-xl mb-2 text-center text-primary font-medium">
                          {type.title}
                        </h3>
                        
                        <h4 className="text-lg mb-3 text-center text-secondary font-medium">
                          {type.headline}
                        </h4>
                        
                        <p className="text-center text-foreground/70 mb-6 text-sm line-height-relaxed">
                          {type.subheadline}
                        </p>
                        
                        <div className="flex items-center justify-center">
                          <Button 
                            variant="outline"
                            size="sm"
                            className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                          >
                            <span>Learn More</span>
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="flow-details"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-5xl mx-auto"
            >
              {selectedUserType && (
                <>
                  {/* Header */}
                  <div className="text-center mb-12">
                    <Button
                      variant="ghost"
                      onClick={handleBackToTypes}
                      className="mb-6 hover:bg-primary/10"
                    >
                      ← Back to User Types
                    </Button>
                    
                    <div className="flex items-center justify-center mb-6">
                      <div className={`w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg`}>
                        <selectedUserType.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl mb-4 text-primary font-medium">
                      {selectedUserType.headline}
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {selectedUserType.subheadline}
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="grid gap-6 mb-12">
                    {selectedUserType.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="border-none bg-gradient-to-r from-[rgba(27,67,50,0.03)] via-[rgba(10,61,63,0.02)] to-[rgba(236,230,218,0.05)] backdrop-blur-sm shadow-[0_4px_16px_rgba(27,67,50,0.05)]">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                  <step.icon className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant="secondary" className="text-xs">
                                    Step {index + 1}
                                  </Badge>
                                </div>
                                
                                <h4 className="text-lg font-medium text-primary mb-2">
                                  {step.title}
                                </h4>
                                
                                <p className="text-muted-foreground mb-3">
                                  {step.description}
                                </p>
                                
                                <ul className="space-y-2">
                                  {step.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <Button size="lg" className="hover:scale-105 transition-transform duration-200">
                      {selectedUserType.ctaText}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}