import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  FileText, 
  ExternalLink, 
  Calendar, 
  ArrowRight,
  Download,
  Share2,
  Megaphone,
  Building2,
  Award,
  TrendingUp,
  Linkedin,
  Twitter,
  Facebook,
  Link as LinkIcon,
  Copy,
  CheckCircle2
} from 'lucide-react';

interface PressReleasesPageProps {
  onNavigate: (section?: string) => void;
}

export function PressReleasesPage({ onNavigate }: PressReleasesPageProps) {
  const [viewingRelease, setViewingRelease] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  // Handle URL hash on page load (for direct links to specific press releases)
  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && pressReleases.find(r => r.id === hash)) {
      setViewingRelease(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Helper function to copy link to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Social share functions
  const shareToLinkedIn = (release: any) => {
    // Use main site URL - it has proper server-rendered OG tags for preview
    const url = 'https://malamalabs.com';
    // LinkedIn will use the text parameter for the post content
    const text = `${release.title}\n\n${release.excerpt}\n\nRead more about our latest announcement:`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  const shareToTwitter = (release: any) => {
    // Use main site URL - it has proper server-rendered OG tags for preview
    const url = 'https://malamalabs.com';
    const text = `${release.title}\n\n${release.excerpt}`;
    const hashtags = release.tags.slice(0, 3).join(',').replace(/\s+/g, '');
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  const shareToFacebook = (release: any) => {
    // Use main site URL - it has proper server-rendered OG tags for preview
    const url = 'https://malamalabs.com';
    const quote = `${release.title}\n\n${release.excerpt}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  // Update meta tags for better sharing
  React.useEffect(() => {
    if (viewingRelease) {
      const release = pressReleases.find(r => r.id === viewingRelease);
      if (release) {
        // Update page title
        document.title = `${release.title} | Mālama Labs Press Release`;
        
        // Update or create Open Graph meta tags
        updateMetaTag('og:title', release.title);
        updateMetaTag('og:description', release.excerpt);
        updateMetaTag('og:image', release.image);
        updateMetaTag('og:url', `${window.location.origin}/press`);
        updateMetaTag('og:type', 'article');
        
        // Twitter Card meta tags
        updateMetaTag('twitter:card', 'summary_large_image', 'name');
        updateMetaTag('twitter:title', release.title, 'name');
        updateMetaTag('twitter:description', release.excerpt, 'name');
        updateMetaTag('twitter:image', release.image, 'name');
        updateMetaTag('twitter:site', '@malamalabs', 'name');
      }
    }
  }, [viewingRelease]);

  const updateMetaTag = (property: string, content: string, attributeName: string = 'property') => {
    let element = document.querySelector(`meta[${attributeName}="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, property);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Press releases data
  const pressReleases = [
    {
      id: 'cop30-carbon-integrity-nov-2025',
      title: "Mālama Labs: Rebuilding Trust and Integrity in Carbon Markets Beyond \"Net Zero\"",
      subtitle: "As COP30 convenes in Belém, Mālama Labs advances transparent, verifiable carbon solutions",
      date: "November 9, 2025",
      location: "Haʻikū, Hawaiʻi",
      category: "Climate Leadership",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjbGltYXRlJTIwc3VtbWl0fGVufDF8fHx8MTczNjQ3MzIyOHww&ixlib=rb-4.1.0&q=80&w=1920",
      excerpt: "As world leaders convene in Belém for COP30, Mālama Labs responds to mounting concerns over carbon market credibility by delivering transparent, science-backed solutions that transform climate promises into measurable outcomes.",
      featured: true,
      tags: ["COP30", "Carbon Markets", "Transparency", "Climate Action", "Digital MRV"],
      content: `
        <div class="press-release-content">
          <p class="text-lg font-semibold text-primary mb-4">FOR IMMEDIATE RELEASE</p>
          <p class="text-sm text-muted-foreground mb-8"><em>Haʻikū, Hawaiʻi — November 9, 2025</em></p>

          <p class="mb-6 leading-relaxed">
            As world leaders convene in Belém for COP30, the conversation around climate credibility has reached a breaking point. In recent weeks, three influential analyses have defined that debate:
          </p>

          <p class="mb-6 leading-relaxed">
            <strong>Dr. Joëlle Gergis</strong>, writing in <em>The Guardian</em>, warned that "net zero" has become a political loophole;
            <strong>Professor Rohini Pande</strong>, in <em>Science</em>, dissected the auditing failures that undermined forest carbon markets;
            and <strong>Fiona Harvey</strong>, environment editor at <em>The Guardian</em>, reported from COP30 on the clash between rhetoric and reality—where populism, finance gaps, and forest politics threaten to derail progress even as the planet surpasses 1.5 °C.
          </p>

          <blockquote class="border-l-4 border-primary pl-6 py-4 my-8 bg-accent/30 rounded-r-lg italic text-lg">
            <p class="mb-4">
              "Gergis exposed the moral hazard of delay, Pande revealed the weakness of verification, and Harvey's frontline reporting shows how global politics is still outpacing planetary limits," said <strong>Tyler Malin, Founder of Mālama Labs.</strong>
            </p>
            <p>
              "COP30 is the moment when data must replace diplomacy. Mālama exists to rebuild trust through verifiable impact—turning climate promises into measurable outcomes that markets and communities can believe in."
            </p>
          </blockquote>

          <h2 class="text-3xl font-bold text-primary mt-12 mb-6">From Offsets to Integrity</h2>

          <p class="mb-6 leading-relaxed">
            The voluntary carbon market now exceeds $36 billion, yet many systems still rely on unverifiable data and inconsistent baselines. Mālama Labs calls not for abandonment but for <strong>reinvention</strong>—anchored in science and transparency.
          </p>

          <ul class="list-disc pl-6 mb-8 space-y-3">
            <li><strong>Durable Removal:</strong> Biochar and enhanced rock weathering projects that store carbon for centuries or longer, complementing forest preservation.</li>
            <li><strong>Digital MRV:</strong> Real-time measurement, reporting, and verification combining IoT sensors, satellite imagery, and blockchain records to eliminate bias.</li>
            <li><strong>Open Standards:</strong> In line with the spirit of Verra's new REDD methodology (VM0048), Mālama promotes <strong>public, replicable datasets</strong> so each tonne removed can be independently validated.</li>
          </ul>

          <blockquote class="border-l-4 border-secondary pl-6 py-4 my-8 bg-secondary/10 rounded-r-lg italic text-lg">
            <p class="mb-4">
              "Transparent, real-time data is the cure for an ailing market," said <strong>Jeffrey Wise, Co-Founder and COO of Mālama Labs.</strong>
            </p>
            <p class="mb-4">
              "Armed with accurate data, the market—not a central authority—can decide which projects deserve investment. Capital will naturally flow toward what genuinely works."
            </p>
            <p>
              "We see value in both forestry and more durable carbon removal," added <strong>Dominick Garey, Co-Founder and CTO.</strong> "Our role isn't to arbitrate between methods but to measure each with precision and transparency so every tonne, regardless of origin, stands on verifiable ground."
            </p>
          </blockquote>

          <h2 class="text-3xl font-bold text-primary mt-12 mb-6">Learning from REDD and Moving Forward</h2>

          <p class="mb-6 leading-relaxed">
            Verra's recent article, <em>"REDD Has Never Been Easy, But It's Too Important to Not Make It Work,"</em> acknowledges the methodological gaps that eroded confidence in forest credits and introduces jurisdiction-level baselines to restore integrity. Mālama Labs supports this evolution while extending it through open, decentralized verification—ensuring that data and incentives remain transparent.
          </p>

          <blockquote class="border-l-4 border-primary pl-6 py-4 my-8 bg-accent/30 rounded-r-lg italic text-lg">
            <p>
              "REDD is vital, but credibility requires transparency at every step—from satellite data to sensor readings to on-chain proof," said Malin. "Verra's move toward jurisdictional datasets is progress; the next step is making those datasets open and interoperable."
            </p>
          </blockquote>

          <p class="mb-6 leading-relaxed">
            As Brazil champions its proposed <strong>Tropical Forests Forever Facility (TFFF)</strong> at COP30, Mālama Labs underscores that funding alone is not enough—<strong>trust requires proof.</strong>
          </p>

          <p class="mb-6 leading-relaxed">
            Forests become true climate assets only when protection is measured transparently and benefits are distributed equitably. Digital MRV ensures that every hectare preserved and every dollar spent can be traced, verified, and reinvested where it matters most.
          </p>

          <h2 class="text-3xl font-bold text-primary mt-12 mb-6">Aligning Science, Equity, and Policy</h2>

          <p class="mb-6 leading-relaxed">
            Mālama Labs integrates technology with justice. By enabling <strong>direct, traceable payments to Indigenous and rural land stewards</strong>, the platform guarantees that communities safeguarding ecosystems share equitably in the climate value they create.
          </p>

          <blockquote class="border-l-4 border-secondary pl-6 py-4 my-8 bg-secondary/10 rounded-r-lg italic text-lg">
            <p>
              "We must ensure that local communities actually receive the financial and ecological benefits promised in credit sales," said Malin. "Digital contracts and wallet-based verification make that not just possible—but provable."
            </p>
          </blockquote>

          <p class="mb-6 leading-relaxed">
            This model aligns with emerging <strong>Article 6.4</strong> standards under the Paris Agreement and forthcoming <strong>U.S. Commodity Futures Trading Commission</strong> guidance, both emphasizing additionality, quantification, and public disclosure.
          </p>

          <h2 class="text-3xl font-bold text-primary mt-12 mb-6">Restoring Credibility, Building Permanence</h2>

          <p class="mb-6 leading-relaxed">
            Global forests store roughly 861 billion tonnes of carbon. Preserving them is essential, yet permanence demands coupling natural sinks with mineral and biochar sequestration. Mālama Labs' hybrid approach values both immediate protection and long-term durability—linking <strong>nature and technology</strong> through verifiable data.
          </p>

          <h2 class="text-3xl font-bold text-primary mt-12 mb-6">About Mālama Labs Inc.</h2>

          <p class="mb-6 leading-relaxed">
            Mālama Labs is building Hawaiʻi's first regional carbon market, integrating <strong>durable carbon removal</strong>, <strong>digital MRV infrastructure</strong>, and <strong>community-based regeneration.</strong>
          </p>

          <p class="mb-8 leading-relaxed">
            Its mission: <em>to turn nature-based impact into verified, investable climate solutions that honor both ecological integrity and cultural values.</em>
          </p>

          <div class="bg-accent/20 rounded-lg p-6 mb-8">
            <p class="mb-2"><strong>Website:</strong> <a href="https://malamalabs.com" class="text-secondary hover:underline">https://malamalabs.com</a></p>
            <p><strong>Press Contact:</strong> <a href="mailto:press@malamalabs.com" class="text-secondary hover:underline">press@malamalabs.com</a></p>
          </div>

          <h2 class="text-3xl font-bold text-primary mt-12 mb-6">Key Takeaways</h2>

          <ul class="list-disc pl-6 mb-8 space-y-3">
            <li>COP30 reveals the gap between political rhetoric and measurable progress; Mālama Labs delivers proof, not promises.</li>
            <li>Verra's REDD reforms mark progress—Mālama Labs extends them through open, real-time verification.</li>
            <li>Forest preservation and durable carbon removal are complementary pathways in a unified, data-driven market.</li>
            <li>Equity is enforced through direct, verifiable compensation to land stewards.</li>
            <li>Amid global division, <strong>data integrity is the new diplomacy.</strong></li>
          </ul>

          <div class="text-center mt-12 pt-8 border-t border-border">
            <p class="text-sm text-muted-foreground">© Mālama Labs 2025 — All Rights Reserved</p>
          </div>
        </div>
      `
    }
  ];

  // Render individual press release
  if (viewingRelease) {
    const release = pressReleases.find(r => r.id === viewingRelease);
    if (!release) {
      setViewingRelease(null);
      return null;
    }

    return (
      <div className="min-h-screen bg-background">
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => {
                setViewingRelease(null);
                window.history.pushState({}, '', '/press');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mb-8"
            >
              ← Back to Press Releases
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <Badge className="mb-4">{release.category}</Badge>
                <h1 className="text-5xl mb-4 text-primary leading-tight">
                  {release.title}
                </h1>
                {release.subtitle && (
                  <p className="text-2xl text-muted-foreground mb-6">
                    {release.subtitle}
                  </p>
                )}
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {release.date}
                  </div>
                </div>
              </div>

              {release.image && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <ImageWithFallback 
                    src={release.image}
                    alt={release.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: release.content }}
              />

              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-2xl mb-6 text-primary">Share This Release</h3>
                
                {/* Social Share Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button 
                    onClick={() => shareToLinkedIn(release)}
                    variant="outline"
                    className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Share on LinkedIn
                  </Button>
                  
                  <Button 
                    onClick={() => shareToTwitter(release)}
                    variant="outline"
                    className="border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Share on Twitter
                  </Button>
                  
                  <Button 
                    onClick={() => shareToFacebook(release)}
                    variant="outline"
                    className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Share on Facebook
                  </Button>
                </div>

                {/* Copy Link Button */}
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => copyToClipboard('https://malamalabs.com/press')}
                    className="flex-1 max-w-md"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  
                  {/* Native Share (for mobile) */}
                  {navigator.share && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        navigator.share({
                          title: release.title,
                          text: release.excerpt,
                          url: 'https://malamalabs.com/press'
                        });
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      More Options
                    </Button>
                  )}
                </div>

                {/* Pre-formatted Social Media Copy */}
                <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-border">
                  <p className="text-sm font-semibold text-primary mb-2">Ready-to-post content:</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">LinkedIn/Facebook:</p>
                      <p className="text-sm">{release.title}</p>
                      <p className="text-sm mt-2">{release.excerpt}</p>
                      <p className="text-sm text-secondary mt-2">📰 Read the full press release: https://malamalabs.com/press</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Twitter/X:</p>
                      <p className="text-sm">{release.title}</p>
                      <p className="text-sm mt-2 text-secondary">https://malamalabs.com/press</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        #{release.tags.slice(0, 3).join(' #').replace(/\s+/g, '')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Main press releases listing
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 text-lg px-6 py-2">
              <Megaphone className="w-5 h-5 mr-2" />
              Press & Media
            </Badge>
            
            <h1 className="text-6xl md:text-7xl mb-8 text-primary leading-tight">
              Press Releases
              <span className="block text-secondary">& Company News</span>
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Stay informed about Mālama Labs' latest announcements, partnerships, 
              and milestones in advancing digital carbon infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate()}
                className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = 'mailto:press@malamalabs.com'}
                className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                Media Inquiries
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Press Releases Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6 text-primary">
              Latest Announcements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Official press releases and company announcements from Mālama Labs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-1 gap-12">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 group hover:border-primary/20">
                  <div className="lg:flex">
                    <div className="lg:w-1/2 relative overflow-hidden">
                      <ImageWithFallback 
                        src={release.image}
                        alt={release.title}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {release.category}
                        </Badge>
                      </div>
                      {release.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-secondary text-secondary-foreground">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="lg:w-1/2 p-8 lg:p-12">
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {release.date}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl mb-4 text-primary leading-tight">
                        {release.title}
                      </h3>
                      
                      {release.subtitle && (
                        <p className="text-lg text-secondary mb-4">
                          {release.subtitle}
                        </p>
                      )}
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {release.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {release.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          onClick={() => {
                            setViewingRelease(release.id);
                            window.history.pushState({}, '', `/press#${release.id}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="group-hover:gap-3 transition-all duration-300"
                        >
                          Read Full Release
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" />
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareToLinkedIn(release);
                          }}
                          size="icon"
                          title="Share on LinkedIn"
                          className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white"
                        >
                          <Linkedin className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareToTwitter(release);
                          }}
                          size="icon"
                          title="Share on Twitter"
                          className="border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white"
                        >
                          <Twitter className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 px-6 bg-accent/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h2 className="text-4xl mb-6 text-primary">
              Media Resources
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Need logos, brand assets, or company information? Access our complete media kit 
              with high-resolution assets and brand guidelines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => window.location.href = 'mailto:press@malamalabs.com?subject=Media Kit Request'}
                className="hover:scale-105 transition-transform duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Request Media Kit
              </Button>
              
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => window.location.href = 'mailto:press@malamalabs.com'}
                className="hover:scale-105 transition-transform duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                Media Inquiries
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-8 text-primary">
              Get in Touch
            </h2>
            
            <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
              For press inquiries, interview requests, or additional information about 
              Mālama Labs, please reach out to our communications team.
            </p>

            <div className="p-8 bg-background/80 rounded-2xl border border-border/50">
              <div className="space-y-4 text-lg">
                <div>
                  <strong className="text-primary">Press Contact:</strong>{' '}
                  <a href="mailto:press@malamalabs.com" className="text-secondary hover:underline">
                    press@malamalabs.com
                  </a>
                </div>
                <div>
                  <strong className="text-primary">General Inquiries:</strong>{' '}
                  <a href="mailto:hello@malamalabs.com" className="text-secondary hover:underline">
                    hello@malamalabs.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

