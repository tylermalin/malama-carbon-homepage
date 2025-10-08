import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, Calendar, Lock, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { PRESENTATIONS, PRESENTATION_SECONDARY } from '../config/presentations';
import { getAndPersistReferralCode } from '../lib/referral';
import { trackPresentationClick } from '../lib/track';

interface PresentationsHubPageProps {
  onNavigate: (page?: string) => void;
  onShowPresentation: () => void;
  onShowPresentationBuyers: () => void;
  onShowPresentationProjects: () => void;
  onShowInvestor: () => void;
}

export function PresentationsHubPage({ onNavigate, onShowPresentation, onShowPresentationBuyers, onShowPresentationProjects, onShowInvestor }: PresentationsHubPageProps) {
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    setRefCode(getAndPersistReferralCode());
  }, []);

  async function handleCardClick(deckKey: "SAFE_ROUND" | "BUYERS" | "PROJECTS", navigationFn: () => void) {
    try {
      await trackPresentationClick({
        deckKey,
        referralCode: refCode ?? undefined,
        userId: null,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
    
    // Navigate using the provided navigation function
    navigationFn();
  }

  const PresentationCard = ({
    title,
    description,
    badge,
    deckKey,
    onClick,
  }: {
    title: string;
    description: string;
    badge?: string;
    deckKey: "SAFE_ROUND" | "BUYERS" | "PROJECTS";
    onClick: () => void;
  }) => (
    <Card 
      className="group border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => handleCardClick(deckKey, onClick)}
      tabIndex={0}
      role="button"
      aria-label={`${title} — view presentation`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(deckKey, onClick);
        }
      }}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          {badge && (
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {badge}
            </Badge>
          )}
        </div>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all duration-300">
          <span>View Presentation</span>
          <ExternalLink className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Back Button */}
      <div className="py-6 px-6">
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
      </div>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-6 text-primary leading-tight font-bold">
              Presentations
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
              Explore our latest presentations for investors, buyers, and project developers.
            </p>
            {refCode && (
              <Badge variant="secondary" className="text-sm px-4 py-2">
                Welcome! Your referral code <strong className="ml-1">{refCode}</strong> has been registered.
              </Badge>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Presentations */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <PresentationCard 
                {...PRESENTATIONS.SAFE_ROUND} 
                onClick={onShowPresentation}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <PresentationCard 
                {...PRESENTATIONS.BUYERS} 
                onClick={onShowPresentationBuyers}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <PresentationCard 
                {...PRESENTATIONS.PROJECTS} 
                onClick={onShowPresentationProjects}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Secondary CTAs */}
      <section className="py-12 px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-primary mb-2">Take the Next Step</h2>
            <p className="text-muted-foreground">Connect with our team or explore more resources</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{PRESENTATION_SECONDARY.introVideo.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick overview of Mālama Labs
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(PRESENTATION_SECONDARY.introVideo.href, '_blank')}
                >
                  Watch Video
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{PRESENTATION_SECONDARY.bookMeeting.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule time with our team
                </p>
                <Button 
                  variant="outline"
                  onClick={() => window.open(PRESENTATION_SECONDARY.bookMeeting.href, '_blank')}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{PRESENTATION_SECONDARY.investorPortal.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {PRESENTATION_SECONDARY.investorPortal.accessNote}
                </p>
                <Button 
                  variant="outline"
                  onClick={onShowInvestor}
                >
                  Access Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
