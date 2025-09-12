import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Footer } from './Footer';
import { 
  ArrowRight, 
  Activity, 
  Cpu, 
  Flame, 
  Coins, 
  CheckCircle,
  BarChart3,
  Leaf,
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Target,
  FileText,
  Settings
} from 'lucide-react';

interface PlatformPageProps {
  onNavigate: (section?: string) => void;
  onStartProject?: () => void;
}

export function PlatformPage({ onNavigate, onStartProject }: PlatformPageProps) {
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
              Explore Our Platform
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto">
              Discover the comprehensive tools and technologies that power Mālama Carbon's carbon removal platform
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
                How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="overview" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Platform Overview
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three core modules working together to create a comprehensive carbon removal solution
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Cpu className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    📡 dMRV Engine
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    AI + blockchain-powered measurement tools
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => scrollToSection('dmrv-features')}
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 group-hover:gap-3 font-medium"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    📋 Carbon Credit Protocols
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    Link any accepted methodology to any 3rd Party Validator
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => scrollToSection('protocols-features')}
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 group-hover:gap-3 font-medium"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-accent-foreground rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    🏭 Carbon Credit Studio
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    Issue & sell durable LCO₂/VCO₂ credits on-chain
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => scrollToSection('studio-features')}
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 group-hover:gap-3 font-medium"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
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
              Key Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced capabilities that set our platform apart in the carbon removal industry
            </p>
          </motion.div>

          {/* dMRV Engine Features */}
          <motion.div 
            id="dmrv-features"
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-gradient-to-r from-[rgba(27,67,50,0.03)] via-[rgba(10,61,63,0.02)] to-[rgba(236,230,218,0.05)] backdrop-blur-sm shadow-[0_8px_24px_rgba(27,67,50,0.08)]">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-medium text-primary">dMRV Engine</h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Real-time IoT sensor monitoring</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">AI-powered data validation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Blockchain-secured measurements</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Automated reporting systems</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-primary font-medium">
                      Reduce verification costs by 70% while increasing accuracy
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center">
                      <BarChart3 className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Carbon Credit Protocols Features */}
          <motion.div 
            id="protocols-features"
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-gradient-to-r from-[rgba(10,61,63,0.03)] via-[rgba(27,67,50,0.02)] to-[rgba(236,230,218,0.05)] backdrop-blur-sm shadow-[0_8px_24px_rgba(10,61,63,0.08)]">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1 flex items-center justify-center">
                    <div className="w-32 h-32 bg-secondary/10 rounded-3xl flex items-center justify-center">
                      <Leaf className="w-16 h-16 text-secondary" />
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-medium text-primary">Carbon Credit Protocols</h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Biochar & Rock Weathering protocols</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Afforestation & Regenerative Agriculture</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Blue Carbon & ecosystem restoration</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">3rd party validator integration</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Multi-standard compliance support</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-secondary font-medium">
                      Support all carbon removal methodologies with verified impact
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Carbon Credit Studio Features */}
          <motion.div 
            id="studio-features"
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-gradient-to-r from-[rgba(236,230,218,0.05)] via-[rgba(27,67,50,0.02)] to-[rgba(10,61,63,0.03)] backdrop-blur-sm shadow-[0_8px_24px_rgba(236,230,218,0.1)]">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-accent-foreground rounded-2xl flex items-center justify-center">
                        <Coins className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-medium text-primary">Carbon Credit Studio</h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Automated credit issuance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Smart contract compliance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Marketplace integration</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Revenue optimization</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-accent-foreground font-medium">
                      Access premium markets for durable carbon removal credits
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 bg-accent-foreground/10 rounded-3xl flex items-center justify-center">
                      <Zap className="w-16 h-16 text-accent-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Platform Impact */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Platform Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from our comprehensive carbon removal platform
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">2.3M</div>
              <div className="text-muted-foreground">Carbon Credits Issued</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">450+</div>
              <div className="text-muted-foreground">Projects Tracked</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">25</div>
              <div className="text-muted-foreground">Countries Active</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">70%</div>
              <div className="text-muted-foreground">Cost Reduction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Ready to Transform Carbon Markets?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join leading carbon project developers who are scaling durable carbon removal with our platform
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