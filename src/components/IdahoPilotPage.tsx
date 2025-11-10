import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft,
  MapPin,
  Sprout,
  Shield,
  Zap,
  CheckCircle,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Heart,
  Leaf,
  Mountain,
  Users,
  HelpCircle,
  Star,
  Quote
} from 'lucide-react';

interface IdahoPilotPageProps {
  onNavigate: (section?: string) => void;
  onShowRegister?: () => void;
}

export function IdahoPilotPage({ onNavigate, onShowRegister }: IdahoPilotPageProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags would be added to document head in production */}
      
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
      <section className="relative py-20 px-6 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-emerald-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 text-lg px-6 py-2">
              <MapPin className="w-5 h-5 mr-2" />
              Idaho Pilot Project 2026 - Participate!
            </Badge>
            
            <h1 className="text-4xl md:text-6xl mb-6 text-primary leading-tight font-bold">
              Idaho Rock Weathering Pilot
              <span className="block text-secondary mt-2">Farmers & Landowners</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Join Idaho's pioneering enhanced rock weathering program. Strengthen your soil, boost crop resilience, 
              reduce input costs, and help remove carbon from the atmosphere — all at no cost to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => onShowRegister?.()}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Apply Now - Check Eligibility
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => scrollToSection('how-it-works')}
              >
                <Target className="w-5 h-5 mr-2" />
                How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About the Pilot */}
      <section id="about-pilot" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-primary font-bold">
              About the Idaho Pilot Program
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Run by Mālama Labs, this groundbreaking pilot combines soil health improvement 
              with verified carbon removal through enhanced rock weathering.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Purpose</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Demonstrate how enhanced rock weathering improves soil health while 
                  permanently removing CO₂ from the atmosphere through natural mineralization processes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Idaho farmers and landowners with suitable agricultural land. We work with 
                  row crops, pastures, and other farming operations across the state.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Run by Mālama Labs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We turn nature-based impact into verified, investable climate solutions. 
                  Our mission drives innovative approaches to regenerative agriculture and carbon removal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-primary font-bold">
              Stronger Soil, Resilient Crops, Fewer Inputs
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Experience the dual benefits of enhanced rock weathering: immediate agronomic improvements 
              and long-term climate impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Agronomic Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-primary mb-8 flex items-center">
                <Sprout className="w-6 h-6 mr-3" />
                Agronomic Benefits
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Improved Soil pH Balance</h4>
                    <p className="text-muted-foreground">Natural pH adjustment for optimal nutrient availability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Enhanced Nutrient Release</h4>
                    <p className="text-muted-foreground">Slow-release minerals support long-term plant nutrition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Stronger, More Resilient Crops</h4>
                    <p className="text-muted-foreground">Improved plant structure and stress resistance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Reduced Input Costs</h4>
                    <p className="text-muted-foreground">Lower fertilizer and soil amendment requirements over time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Climate Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-8 flex items-center">
                <Leaf className="w-6 h-6 mr-3" />
                Climate Benefits
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Permanent Carbon Removal</h4>
                    <p className="text-muted-foreground">CO₂ permanently sequestered through rock-atmosphere reactions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Verified Climate Impact</h4>
                    <p className="text-muted-foreground">Scientifically measured and third-party verified carbon credits</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Long-Term Soil Carbon Storage</h4>
                    <p className="text-muted-foreground">Enhanced soil organic matter retention and stability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Climate Resilience</h4>
                    <p className="text-muted-foreground">Improved water retention and drought resistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-primary font-bold">
              How the Program Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We handle everything from rock supply to carbon verification. Your job is to farm — we take care of the rest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle className="text-lg">Check Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Submit your farm details. We assess soil type, crops, and location to ensure program fit.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <CardTitle className="text-lg">Soil Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive baseline soil analysis establishes current conditions and application rates.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <CardTitle className="text-lg">Application & Spreading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We supply crushed silicate rock and coordinate professional spreading at optimal timing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <CardTitle className="text-lg">Monitoring & Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ongoing soil monitoring and third-party verification of carbon removal impacts.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Badge variant="outline" className="text-lg px-6 py-2">
              <Shield className="w-5 h-5 mr-2" />
              We Supply Rock • Handle Spreading • Manage Verification
            </Badge>
          </div>
        </div>
      </section>

      {/* Nutrients & Mechanisms */}
      <section id="nutrients" className="py-20 px-6 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-primary font-bold">
              Key Nutrients & Plant Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Silicate rocks provide essential minerals that support plant health and soil biological activity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Mountain className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Calcium (Ca)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Essential for cell wall structure, root development, and nutrient uptake. Improves soil structure and pH buffering.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Silicon (Si)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Strengthens plant tissues, increases disease resistance, and improves stress tolerance. Key for structural integrity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Magnesium (Mg)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Central component of chlorophyll, essential for photosynthesis and enzyme activation. Supports energy transfer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Potassium (K)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regulates water uptake, stomatal function, and disease resistance. Critical for fruit and grain quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Sulphur (S)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Essential for protein synthesis, oil production, and chlorophyll formation. Improves nitrogen use efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-lg">Trace Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Iron, manganese, zinc, and other micronutrients released slowly for sustained plant nutrition and soil health.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Farmers Leading the Way */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-primary font-bold">
              Farmers Leading the Way
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Early adopters of enhanced rock weathering are seeing real results in soil health and crop performance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-lg italic mb-6 text-muted-foreground">
                  "After applying silicate rock, we noticed improved soil structure and better water retention. 
                  Our corn yields increased by 12% while reducing our lime applications."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Idaho Corn Grower</h4>
                    <p className="text-sm text-muted-foreground">2,400-acre operation, Southern Idaho</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-secondary/30 mb-4" />
                <p className="text-lg italic mb-6 text-muted-foreground">
                  "The rock weathering program helped us build stronger soils while contributing to carbon removal. 
                  It's rewarding to know our farming practices are helping the climate."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                    <Sprout className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Idaho Wheat Producer</h4>
                    <p className="text-sm text-muted-foreground">1,800-acre dryland operation, Eastern Idaho</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-primary font-bold">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <HelpCircle className="w-5 h-5 mr-3 text-primary" />
                  Is this program free for farmers?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, participating farmers receive crushed silicate rock and spreading services at no cost. 
                  The program is funded through carbon credit sales from verified CO₂ removal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <HelpCircle className="w-5 h-5 mr-3 text-primary" />
                  What soil types and crops qualify?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We work with various soil types across Idaho, particularly those that will benefit from pH adjustment 
                  and mineral supplementation. Suitable crops include corn, wheat, potatoes, beans, and pasture grasses. 
                  Each application is customized based on soil testing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <HelpCircle className="w-5 h-5 mr-3 text-primary" />
                  How long until I see results?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Initial soil pH improvements can be observed within the first growing season. Long-term benefits 
                  including enhanced soil structure, nutrient availability, and crop resilience develop over 2-3 years 
                  as the rock continues to weather and release minerals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <HelpCircle className="w-5 h-5 mr-3 text-primary" />
                  How does carbon crediting work?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As silicate rocks weather naturally, they permanently sequester atmospheric CO₂ through mineralization. 
                  We measure and verify this carbon removal using scientific monitoring protocols. The resulting carbon 
                  credits are sold to fund the program, making it cost-free for farmers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <HelpCircle className="w-5 h-5 mr-3 text-primary" />
                  Are there any long-term commitments or contracts?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The pilot program involves a multi-year monitoring period to track soil health and carbon removal outcomes. 
                  Participation agreements are straightforward and designed to be farmer-friendly, with clear terms 
                  regarding monitoring access and data sharing for scientific verification.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="apply-now" className="py-20 px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-green-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-primary font-bold">
              Ready to Participate?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join Idaho's pioneering enhanced rock weathering program. Strengthen your soil, 
              boost your crops, and contribute to climate solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-12 py-6"
                onClick={() => onShowRegister?.()}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Apply Now - Check Eligibility
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Card className="border-2">
                <CardContent className="pt-6 text-center">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:idaho@malamaproject.org" className="text-primary hover:underline">
                      idaho@malamaproject.org
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6 text-center">
                  <Phone className="w-8 h-8 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+12623302790" className="text-secondary hover:underline">
                      (262) 330-2790
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-6 bg-background border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Mālama Labs</h3>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We turn nature-based impact into verified, investable climate solutions.
            </p>
            
            <Button 
              variant="outline" 
              onClick={() => onNavigate()}
              className="mb-8"
            >
              Return to Main Site
            </Button>
            
            <Separator className="my-8" />
            
            <div className="text-sm text-muted-foreground">
              <p>© 2025 Mālama Labs. All rights reserved.</p>
              <p className="mt-2">
                Idaho Rock Weathering Pilot Program • Enhanced Rock Weathering • Carbon Removal • Soil Health
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-responsive note and image placeholders */}
      <div className="hidden">
        {/* SEO Meta Tags (would be implemented in document head) */}
        {/* 
        <title>Idaho Rock Weathering Pilot – Farmers & Landowners | Mālama Labs</title>
        <meta name="description" content="Join Idaho's pioneering enhanced rock weathering program. Strengthen soil, boost crops, reduce inputs, and remove carbon. Free for qualifying farmers and landowners." />
        <meta property="og:title" content="Idaho Rock Weathering Pilot – Farmers & Landowners" />
        <meta property="og:description" content="Enhanced rock weathering program for Idaho farmers. Improve soil health while permanently removing CO₂ from the atmosphere." />
        <meta property="og:image" content="/images/idaho-pilot-hero.jpg" />
        <meta property="og:url" content="https://malamalabs.com/idaho-pilot" />
        */}

        {/* Image Placeholders with Alt Text */}
        {/* 
        Hero Background: "Equipment distributing crushed silicate rock across Idaho farmland for enhanced rock weathering pilot program"
        About Section: "Idaho agricultural landscape with Mālama Labs logo overlay"
        Benefits Section: "Split image showing healthy soil structure and thriving crops"
        How It Works: "Four-panel progression showing rock application process"
        Nutrients Section: "Microscopic view of silicate rock minerals"
        Testimonials: "Idaho farmers in field with improved soil"
        */}
      </div>
    </div>
  );
}
