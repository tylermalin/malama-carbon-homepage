import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import LivePoolStats from "./LivePoolStats";
import { ArrowRight, ArrowLeft, Leaf, LineChart, ShieldCheck, Coins } from "lucide-react";
import { Footer } from "./Footer";

interface StakePageProps {
  onNavigate: (section?: string) => void;
  navigationFunctions?: {
    onShowDocumentation?: () => void;
    onShowBlog?: () => void;
    onShowPressReleases?: () => void;
    onShowPlatform?: () => void;
    onShowHowItWorks?: () => void;
    onShowAbout?: () => void;
    onShowTeam?: () => void;
    onShowContact?: () => void;
    onShowCareers?: () => void;
    onShowFAQ?: () => void;
    onShowPrivacyPolicy?: () => void;
    onShowTermsOfService?: () => void;
    onShowCookiePolicy?: () => void;
    onShowCarbonStudio?: () => void;
    onShowCarbonProtocols?: () => void;
    onShowDMRVEngine?: () => void;
    onShowFinancials?: () => void;
    onShowInvestor?: () => void;
    onShowAdvisory?: () => void;
    onShowPresentation?: () => void;
    onShowPresentations?: () => void;
    onShowProjectGallery?: () => void;
    onShowIdahoPilot?: () => void;
  };
}

export function StakePage({ onNavigate, navigationFunctions }: StakePageProps) {
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

      {/* Hero Section with Background Image */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(27, 67, 50, 0.6), rgba(10, 61, 63, 0.5)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
        
        {/* Additional Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0" />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 text-lg px-6 py-2 bg-white/20 backdrop-blur-sm text-white border-white/30">
              <Coins className="w-5 h-5 mr-2" />
              Stake Pool MLMA
            </Badge>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white font-medium leading-tight drop-shadow-lg">
              Stake to Mālama
              <span className="block text-white/95">Support Climate Action</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed drop-shadow-md">
              Earn ADA rewards while helping fund biochar-based carbon removal,
              ecosystem restoration, and open digital MRV infrastructure.
            </p>

            <Button
              size="lg"
              onClick={() => window.open('https://beta.cexplorer.io/pool/pool1vy9qerf9fenp893mqrdm58uj45w3etutv4n0vdh8669uvqenkqr', '_blank')}
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Delegate to MLMA <ArrowRight className="ml-2 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Why Stake With Mālama?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three compelling reasons to delegate your ADA to our mission-driven stake pool
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
                      <Leaf className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    Real Climate Impact
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    Pool fees fund biochar carbon removal, invasive species clearing, 
                    and indigenous-led restoration.
                  </p>
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
                      <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    Non-Custodial & Secure
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    Your ADA stays in your wallet. Delegation is fully reversible and safe.
                  </p>
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
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <LineChart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    Competitive Rewards
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    Low fees and stable performance with over 100 lifetime blocks minted.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Pool Stats */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Live Pool Data
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time statistics from the MLMA stake pool on Cardano
            </p>
          </motion.div>
          
          <LivePoolStats />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="border-2 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
              <CardContent className="p-12">
                <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
                  Stake ADA. Support Restoration. Strengthen the Network.
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join our community of delegators who are making a real difference in climate action
                </p>
                <Button
                  size="lg"
                  onClick={() => window.open('https://beta.cexplorer.io/pool/pool1vy9qerf9fenp893mqrdm58uj45w3etutv4n0vdh8669uvqenkqr', '_blank')}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Delegate Now <ArrowRight className="ml-2 h-6" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {navigationFunctions && (
        <Footer 
          onShowDocumentation={navigationFunctions.onShowDocumentation} 
          onShowBlog={navigationFunctions.onShowBlog} 
          onShowPressReleases={navigationFunctions.onShowPressReleases}
          onShowPlatform={navigationFunctions.onShowPlatform}
          onShowHowItWorks={navigationFunctions.onShowHowItWorks}
          onShowAbout={navigationFunctions.onShowAbout}
          onShowTeam={navigationFunctions.onShowTeam}
          onShowContact={navigationFunctions.onShowContact}
          onShowCareers={navigationFunctions.onShowCareers}
          onShowFAQ={navigationFunctions.onShowFAQ}
          onShowPrivacyPolicy={navigationFunctions.onShowPrivacyPolicy}
          onShowTermsOfService={navigationFunctions.onShowTermsOfService}
          onShowCookiePolicy={navigationFunctions.onShowCookiePolicy}
          onShowCarbonStudio={navigationFunctions.onShowCarbonStudio}
          onShowCarbonProtocols={navigationFunctions.onShowCarbonProtocols}
          onShowDMRVEngine={navigationFunctions.onShowDMRVEngine}
          onShowFinancials={navigationFunctions.onShowFinancials}
          onShowInvestor={navigationFunctions.onShowInvestor}
          onShowAdvisory={navigationFunctions.onShowAdvisory}
          onShowPresentation={navigationFunctions.onShowPresentation}
          onShowPresentations={navigationFunctions.onShowPresentations}
          onShowProjectGallery={navigationFunctions.onShowProjectGallery}
          onShowIdahoPilot={navigationFunctions.onShowIdahoPilot}
        />
      )}
    </div>
  );
}
