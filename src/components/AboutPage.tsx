import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft,
  Heart,
  Globe,
  Sprout,
  Target,
  Users,
  Zap,
  Award,
  MapPin,
  TrendingUp
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (section?: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
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
            Back to Home
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
              <Heart className="w-5 h-5 mr-2" />
              About Mālama Carbon
            </Badge>
            
            <h1 className="text-5xl md:text-6xl mb-6 text-primary leading-tight">
              Bridging Ancient Wisdom
              <span className="block text-secondary">with Modern Technology</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Mālama Carbon combines traditional Hawaiian land stewardship practices with cutting-edge 
              blockchain technology to create a transparent, efficient, and profitable carbon removal ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-3xl text-primary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To democratize access to carbon removal markets by creating technology that enables 
                    landowners and communities to participate in climate action while generating sustainable 
                    income. We believe that traditional ecological knowledge, combined with modern 
                    verification systems, can drive the most effective carbon sequestration solutions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Globe className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-3xl text-primary">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A world where every piece of land contributes to climate healing, where traditional 
                    stewardship practices are valued and rewarded, and where transparent, blockchain-verified 
                    carbon credits create trust and impact at scale. Starting from Hawaiʻi, expanding globally.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Our Story</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Born from the intersection of traditional Hawaiian values and modern climate urgency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-2 bg-background">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-primary" />
                    <Badge variant="outline" className="text-base px-4 py-2">Founded in Hawaiʻi</Badge>
                  </div>
                  
                  <h3 className="text-2xl mb-6 text-primary">Rooted in Mālama ʻĀina</h3>
                  
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      Mālama Carbon was founded on the principle of <strong>mālama ʻāina</strong> - 
                      the Hawaiian concept of caring for the land. Our founders recognized that traditional 
                      land stewardship practices, refined over centuries, offer some of the most effective 
                      approaches to carbon sequestration.
                    </p>
                    
                    <p className="leading-relaxed">
                      However, landowners and communities practicing these methods faced barriers to 
                      accessing carbon credit markets. Complex verification processes, high costs, 
                      and lack of transparency kept small-scale stewards out of the growing climate economy.
                    </p>
                    
                    <p className="leading-relaxed">
                      We built Mālama Carbon to change this - creating technology that makes carbon 
                      credit generation accessible, transparent, and profitable for communities 
                      practicing regenerative land stewardship.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Sprout className="w-6 h-6 text-primary" />
                      <h4 className="text-lg text-primary">Traditional Knowledge</h4>
                    </div>
                    <p className="text-muted-foreground">
                      Respecting and leveraging indigenous land management practices that have 
                      sustained ecosystems for generations.
                    </p>
                  </div>

                  <div className="p-6 bg-secondary/5 rounded-lg border border-secondary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-6 h-6 text-secondary" />
                      <h4 className="text-lg text-primary">Modern Technology</h4>
                    </div>
                    <p className="text-muted-foreground">
                      Using blockchain, IoT sensors, and AI to create transparent, verifiable, 
                      and scalable carbon monitoring systems.
                    </p>
                  </div>

                  <div className="p-6 bg-accent/50 rounded-lg border border-accent">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-primary" />
                      <h4 className="text-lg text-primary">Community Impact</h4>
                    </div>
                    <p className="text-muted-foreground">
                      Creating economic opportunities for land stewards while advancing 
                      global climate goals through local action.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do, from product development to community partnerships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl mb-3 text-primary">Mālama ʻĀina</h3>
                <p className="text-muted-foreground">
                  Caring for the land with respect, responsibility, and love for future generations.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl mb-3 text-primary">Transparency</h3>
                <p className="text-muted-foreground">
                  Building trust through open, verifiable processes and blockchain-recorded impacts.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl mb-3 text-primary">Community</h3>
                <p className="text-muted-foreground">
                  Empowering local stewards and creating shared prosperity through climate action.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-primary">Innovation</h3>
                <p className="text-muted-foreground">
                  Continuously improving our technology to serve communities and the climate better.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Projected 1 Year Impact</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building a platform that creates real change for communities and the climate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl mb-3 text-primary">1,200+</div>
              <div className="text-lg text-muted-foreground">Acres Under Management</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl mb-3 text-secondary">50+</div>
              <div className="text-lg text-muted-foreground">Active Projects</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl mb-3 text-primary">25,000</div>
              <div className="text-lg text-muted-foreground">Tons CO₂ Sequestered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl mb-3 text-green-500">$500K+</div>
              <div className="text-lg text-muted-foreground">Returned to Communities</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-8 text-primary">
              Join Our Mission
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Whether you're a landowner, developer, or organization committed to climate action, 
              there's a place for you in the Mālama Carbon ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate()}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <Sprout className="w-6 h-6 mr-3" />
                Get Started Today
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate()}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <Users className="w-6 h-6 mr-3" />
                Contact Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}