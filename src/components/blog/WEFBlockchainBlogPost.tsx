import { motion } from 'motion/react';
import { Quote, Mail, ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface WEFBlockchainBlogPostProps {
  onNavigate: (section?: string) => void;
}

export function WEFBlockchainBlogPost({ onNavigate }: WEFBlockchainBlogPostProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate('blog')}
            className="mb-8 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Featured Article
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Policy & Standards
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl mb-6 text-primary font-medium leading-tight">
              Blockchains and Climate: Lessons from the WEF White Paper
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              How blockchain infrastructure can accelerate credible climate action—and what barriers remain.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Mālama Labs Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>January 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            
            {/* Hero Image */}
            <div className="w-full h-72 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-12 flex items-center justify-center border border-border/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-primary" />
                </div>
                <span className="text-muted-foreground font-medium">Blockchain Climate Action Visualization</span>
              </div>
            </div>

            {/* Why It Matters */}
            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold text-primary mb-6">Why It Matters</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The World Economic Forum's <em className="text-foreground font-medium">Blockchain for Scaling Climate
                  Action</em> white paper underscores what many of us at Mālama Labs
                  already know: digital infrastructure has the potential to accelerate
                  climate solutions at the scale this moment demands. Over seven months
                  of research with industry leaders, the WEF report outlines both the
                  promise and the barriers to using blockchain to support climate
                  action.
                </p>
                <p>
                  At Mālama, we see this not just as validation of our mission, but as a
                  roadmap to ensure technology delivers for people, land, and
                  ecosystems.
                </p>
              </div>
            </motion.section>

            {/* Pull Quote */}
            <motion.blockquote 
              className="border-l-4 border-primary pl-6 italic text-foreground mb-12 bg-primary/5 rounded-r-2xl py-6 pr-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Quote className="inline mr-2 h-6 w-6 text-primary mb-2" />
              <p className="text-lg font-medium">
                "Reaching global climate goals requires $4.35 trillion in annual climate
                finance by 2030—far beyond the $632 billion invested in the past
                decade." – WEF
              </p>
            </motion.blockquote>

            {/* Five Pathways */}
            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-semibold text-primary mb-6">Five Pathways Where Blockchain Can Drive Climate Action</h2>
              <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-8">
                  <ol className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-1">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Strengthening Trust in Global Coordination</h3>
                        <p className="text-muted-foreground">Shared, tamperproof ledgers for accountability across governments and companies.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-1">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Digital MRV for Credibility</h3>
                        <p className="text-muted-foreground">Pairing blockchain records with IoT sensors, satellite data, and AI to verify every credit.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-1">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Financing Project Developers Directly</h3>
                        <p className="text-muted-foreground">Smart contracts that eliminate middlemen and accelerate funding.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-1">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Democratizing Climate Action</h3>
                        <p className="text-muted-foreground">Fractionalized credits that allow individuals and small organizations to participate.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 mt-1">
                        5
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Incentivizing Regenerative Systems</h3>
                        <p className="text-muted-foreground">ReFi models that reward biodiversity, clean air, and soil health.</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </motion.section>

            {/* Trends */}
            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl font-semibold text-primary mb-6">Emerging Trends</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Institutional adoption</h3>
                      <p className="text-muted-foreground text-sm">World Bank's Climate Action Data Trust.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Corporate demand</h3>
                      <p className="text-muted-foreground text-sm">Ambitious net-zero commitments driving demand for transparency.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Digital MRV momentum</h3>
                      <p className="text-muted-foreground text-sm">New pilots with standards like Verra.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Data interoperability</h3>
                      <p className="text-muted-foreground text-sm">Platforms linking into a global carbon data layer.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-foreground">Community-driven innovation</h3>
                      <p className="text-muted-foreground text-sm">Inclusive governance and recognition of local stewardship.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Barriers */}
            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h2 className="text-3xl font-semibold text-primary mb-6">Barriers We Must Address</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The WEF is clear-eyed about the challenges: entrenched markets, the
                  reputational baggage of both blockchain and carbon credits, education
                  gaps, regulatory uncertainty, and the risk of digital hype eclipsing
                  real ecological impact.
                </p>
                <p>
                  At Mālama Labs, we believe the antidote is focusing relentlessly on
                  <strong className="text-foreground"> impact-first design</strong>: every credit linked to a
                  measurable ecological outcome, every token tied back to real land, and
                  every innovation evaluated against its benefit to communities and
                  ecosystems.
                </p>
              </div>
            </motion.section>

            {/* What Comes Next */}
            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h2 className="text-3xl font-semibold text-primary mb-6">What Comes Next</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The WEF's recommendations stress that policymakers, project
                  developers, and technologists must work together. Regulations must
                  provide integrity without choking innovation. The blockchain-climate
                  community must invest in outreach to traditional climate actors. And
                  most importantly, we must keep the focus on <strong className="text-foreground">credible impact
                  in the real world</strong>.
                </p>
                <p>
                  For Mālama Labs, this is both a challenge and an invitation. We are
                  building systems that turn nature-based stewardship into trusted,
                  investable climate solutions. The WEF white paper affirms that this
                  path—uniting blockchain with land, community, and culture—is essential
                  to scaling climate action at the pace the planet requires.
                </p>
              </div>
            </motion.section>

            {/* CTA Banner */}
            <motion.div 
              className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Be Part of the Solution
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We are engaging with scientists, developers, credit buyers, and
                community leaders. Reach out to connect or learn more about how our
                platform integrates the very trends the WEF highlights.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => window.open('mailto:info@malamalabs.com', '_blank')}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" /> Contact Us
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('getStarted')}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Get Updates
                </Button>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              {['Blockchain', 'Climate Action', 'WEF', 'Carbon Credits', 'Digital MRV', 'ReFi'].map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </article>
        </div>
      </section>
    </div>
  );
}
