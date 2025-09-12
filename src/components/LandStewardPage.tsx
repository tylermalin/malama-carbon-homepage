import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Sprout, 
  DollarSign, 
  Zap, 
  Shield, 
  TrendingUp, 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Coins,
  FileText,
  Clock,
  Target,
  MapPin,
  Upload,
  Calculator,
  UserPlus,
  Leaf,
  BarChart3,
  Globe,
  Award,
  Smartphone
} from 'lucide-react';

interface LandStewardPageProps {
  onNavigate: (section?: string) => void;
  onStartProject: () => void;
}

export function LandStewardPage({ onNavigate, onStartProject }: LandStewardPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <section className="py-6 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => onNavigate()}
            className="hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to User Types
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 text-lg px-6 py-2">
              <Sprout className="w-5 h-5 mr-2" />
              Land Steward Path
            </Badge>
            
            <h1 className="text-5xl md:text-6xl mb-6 text-primary leading-tight">
              Choose Your Path
              <span className="block text-secondary">Land Steward</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get started with Mālama Labs based on your role in the carbon removal ecosystem.
            </p>

            <div className="max-w-4xl mx-auto">
              <Separator className="my-8" />
              
              <h2 className="text-3xl mb-6 text-primary">
                Earn from Regenerative Practices
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Turn your agricultural waste and regenerative practices into verified carbon credits.
                Improve soil health, generate new income, and join a global movement for durable carbon removal.
              </p>
              
              <Separator className="my-8" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4-Step Onboarding Process */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">
              Your Steward Journey in 4 Steps
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've streamlined the onboarding process to get you from land assessment 
              to earning carbon credits as quickly as possible.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Step 1</Badge>
                      <CardTitle className="text-2xl text-primary">Intro Questionnaire</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground mb-6">
                    Tell us about your land and operations:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Do you currently manage land or agricultural operations?</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">What type of biomass or waste do you produce?</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Are you interested in biochar, tree planting, or regenerative farming?</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-secondary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Step 2</Badge>
                      <CardTitle className="text-2xl text-primary">TMK or Land ID Upload</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground mb-6">
                    Verify your land ownership or management rights:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Enter your TMK or land documentation</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Upload className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Upload optional maps or supporting documents (lease, deed, etc.)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-accent/50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                      <Calculator className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Step 3</Badge>
                      <CardTitle className="text-2xl text-primary">Baseline Assessment</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground mb-6">
                    Discover your project's potential:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Receive an estimated carbon credit potential</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Preview a sample earnings model based on LC token issuance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-green-500/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Step 4</Badge>
                      <CardTitle className="text-2xl text-primary">Sign Up for Steward Portal</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground mb-6">
                    Unlock your project dashboard:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Create an account to manage projects and upload field data</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Access mobile-friendly MRV onboarding tools</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Coins className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">Start receiving LC tokens</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Steward Benefits */}
      <section className="py-20 px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">
              Steward Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              For landowners, project developers, and community leaders.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-2 bg-background">
              <h3 className="text-2xl mb-6 text-primary">
                When you onboard with Mālama:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg mb-2 text-primary">Custom dMRV Plan</h4>
                      <p className="text-muted-foreground">Get a tailored digital monitoring, reporting, and verification plan specifically designed for your project</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg mb-2 text-primary">Early Revenue Access</h4>
                      <p className="text-muted-foreground">Pre-sell 5–60% of your future CORC production to cover project fees, equipment, and early revenue</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg mb-2 text-primary">Aligned Incentives</h4>
                      <p className="text-muted-foreground">Mālama only gets paid from a small portion of your presale revenue, keeping incentives aligned</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg mb-2 text-primary">Fast Impact</h4>
                      <p className="text-muted-foreground">Begin generating impact and book your first revenue faster than traditional approaches</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-primary" />
                  <h4 className="text-lg text-primary">Why Choose Mālama?</h4>
                </div>
                <p className="text-muted-foreground">
                  Our platform combines traditional Hawaiian land stewardship wisdom with cutting-edge 
                  blockchain technology to create a transparent, efficient, and profitable carbon removal ecosystem 
                  that benefits both the environment and local communities.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-8 text-primary">
              Ready to Start Your Land Steward Journey?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Transform your land into a powerful tool for climate action while generating 
              sustainable income through verified carbon credits. Begin your onboarding today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={onStartProject}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <Sprout className="w-6 h-6 mr-3" />
                Get Started as a Steward
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate()}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <FileText className="w-6 h-6 mr-3" />
                Learn More About Mālama
              </Button>
            </div>

            <div className="mt-12 p-6 bg-background/80 rounded-2xl border border-border/50">
              <p className="text-lg text-muted-foreground">
                <strong className="text-primary">Onboard now →</strong> No upfront costs or commitments. 
                Start discovering your land's carbon sequestration potential today.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}