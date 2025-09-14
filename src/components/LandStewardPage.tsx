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
  Smartphone,
  FileCheck,
  BarChart,
  Smartphone as Mobile
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
              Your Steward Journey
              <span className="block text-secondary">in 4 Steps</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Turn your land into a powerful tool for climate action while generating sustainable income through verified carbon credits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onStartProject}
                className="hover:scale-105 transition-transform duration-300"
              >
                Get Started as a Steward
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('about')}
                className="hover:scale-105 transition-transform duration-300"
              >
                Learn More About Mālama
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
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
            {/* Step 1 - Intro Questionnaire */}
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
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Land Management</p>
                        <p className="text-sm text-muted-foreground">Do you manage land or agricultural operations?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Biomass Production</p>
                        <p className="text-sm text-muted-foreground">What type of biomass or waste do you produce?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Project Interest</p>
                        <p className="text-sm text-muted-foreground">Are you interested in biochar, tree planting, or regenerative farming?</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2 - TMK or Land ID Upload */}
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
                      <FileCheck className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Step 2</Badge>
                      <CardTitle className="text-2xl text-primary">TMK or Land ID Upload</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground mb-6">
                    Verify your ownership or management rights:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Upload className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Land Documentation</p>
                        <p className="text-sm text-muted-foreground">Enter your TMK or land documentation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Supporting Documents</p>
                        <p className="text-sm text-muted-foreground">Upload optional maps or supporting documents (lease, deed, etc.)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 3 - Baseline Assessment */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <BarChart className="w-8 h-8 text-primary-foreground" />
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
                      <Calculator className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Carbon Credit Potential</p>
                        <p className="text-sm text-muted-foreground">Estimated carbon credit potential for your land</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Coins className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Earnings Model</p>
                        <p className="text-sm text-muted-foreground">Sample earnings model based on LC token issuance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 4 - Steward Portal Access */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-secondary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                      <Mobile className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Step 4</Badge>
                      <CardTitle className="text-2xl text-primary">Steward Portal Access</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground mb-6">
                    Unlock your project dashboard:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Project Management</p>
                        <p className="text-sm text-muted-foreground">Manage projects and upload field data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Mobile MRV Tools</p>
                        <p className="text-sm text-muted-foreground">Access mobile-friendly MRV onboarding tools</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Coins className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Token Rewards</p>
                        <p className="text-sm text-muted-foreground">Begin receiving LC tokens</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steward Benefits */}
      <section className="py-20 px-6 bg-muted/20">
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
              When you onboard with Mālama, you unlock:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Custom dMRV Plan</h3>
                  <p className="text-muted-foreground">
                    Tailored digital monitoring, reporting, and verification designed for your project.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Early Revenue Access</h3>
                  <p className="text-muted-foreground">
                    Pre-sell 5–60% of your future CORC production to cover project fees, equipment, and early income.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Aligned Incentives</h3>
                  <p className="text-muted-foreground">
                    Mālama only earns from a small portion of your presale revenue — our success depends on yours.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Faster Impact</h3>
                  <p className="text-muted-foreground">
                    Generate verified credits and revenue faster than traditional project approaches.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Mālama */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl mb-6 text-primary">
              Why Choose Mālama?
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Our platform blends traditional Hawaiian land stewardship with cutting-edge blockchain technology to create a transparent, efficient, and profitable carbon removal ecosystem. We ensure benefits flow to both the environment and the communities that steward it.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Traditional Stewardship</h3>
                  <p className="text-muted-foreground">Rooted in Hawaiian land management principles</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Blockchain Technology</h3>
                  <p className="text-muted-foreground">Cutting-edge transparency and verification</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Community Benefits</h3>
                  <p className="text-muted-foreground">Ensuring benefits flow to local communities</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ready to Start CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6 text-primary">
              Ready to Start Your Steward Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Turn your land into a powerful tool for climate action while generating sustainable income through verified carbon credits.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Onboard today at no cost</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Discover your land's carbon potential</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Start your path to verified revenue</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onStartProject}
                className="hover:scale-105 transition-transform duration-300"
              >
                Get Started as a Steward
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('about')}
                className="hover:scale-105 transition-transform duration-300"
              >
                Learn More About Mālama
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}