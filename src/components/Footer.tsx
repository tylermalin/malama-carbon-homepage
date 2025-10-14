import React from 'react';
import { motion } from 'motion/react';
import { Separator } from './ui/separator';
import { Twitter, Linkedin, Github, Youtube } from 'lucide-react';

interface FooterProps {
  onShowDocumentation?: () => void;
  onShowBlog?: () => void;
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
}

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/malama-labs" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@malamalabs" },
  { name: "Medium", icon: Github, href: "https://medium.com/@malamalabs" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/malamalabs" }
];

export function Footer({ 
  onShowDocumentation, 
  onShowBlog, 
  onShowPlatform,
  onShowHowItWorks,
  onShowAbout,
  onShowTeam,
  onShowContact,
  onShowCareers,
  onShowFAQ,
  onShowPrivacyPolicy,
  onShowTermsOfService,
  onShowCookiePolicy,
  onShowCarbonStudio,
  onShowCarbonProtocols,
  onShowDMRVEngine,
  onShowFinancials,
  onShowInvestor,
  onShowAdvisory,
  onShowPresentation,
  onShowPresentations,
  onShowProjectGallery
}: FooterProps) {
  
  const companyLinks = [
    { name: "About Mālama Labs", action: onShowAbout, description: "Our mission, vision, and values" },
    { name: "Our Technology", action: onShowPlatform, description: "Universal dMRV, Risk & Integrity Engine" },
    { name: "Projects", action: onShowProjectGallery, description: "Active carbon innovation sites" },
    { name: "Our Team", action: onShowTeam, description: "Leadership and advisors" },
    { name: "Careers", action: onShowCareers, description: "Join the Mālama mission" }
  ];

  const investorLinks = [
    { name: "Advisory Board Portal", action: onShowAdvisory, description: "Secure materials for advisory members" },
    { name: "Investor Portal", action: onShowInvestor, description: "Secure investor access" },
    { name: "Presentations", action: onShowPresentations, description: "View investor, buyer, and developer decks" },
    { name: "Schedule a Call", action: () => window.open('https://calendar.app.google/PjPddjUkZjdxHPqr8', '_blank'), description: "Connect with leadership" }
  ];

  const platformLinks = [
    { name: "Platform Overview", action: onShowPlatform, description: "Digital infrastructure for carbon markets" },
    { name: "Universal dMRV Engine", action: onShowDMRVEngine, description: "Automated MRV through AI & IoT" },
    { name: "Carbon Credit Studio", action: onShowCarbonStudio, description: "Project onboarding & tokenization" },
    { name: "Carbon Protocols", action: onShowCarbonProtocols, description: "Verified frameworks & standards" }
  ];

  const resourceLinks = [
    { name: "Knowledge Base", action: onShowDocumentation, description: "Educational materials & docs" },
    { name: "Media & Press", action: onShowBlog, description: "Announcements and features" },
    { name: "FAQ", action: onShowFAQ, description: "Frequently asked questions" },
    { name: "Contact Us", action: onShowContact, description: "Partnership inquiries" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", action: onShowPrivacyPolicy },
    { name: "Terms of Use", action: onShowTermsOfService },
    { name: "Cookie Policy", action: onShowCookiePolicy }
  ];

  return (
    <footer className="bg-[rgba(0,0,0,1)] text-primary-foreground py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Logo and Company Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://fykjijdixtcgjavidmve.supabase.co/storage/v1/object/public/website-assets/logos/logo.png" 
                alt="Mālama Labs" 
                className="h-[80px] w-auto object-contain"
              />
            </div>
            <p className="text-primary-foreground/80 max-w-md mb-4 leading-relaxed font-medium">
              Building the Digital Infrastructure for Compliance-Grade Carbon Markets
            </p>
            <p className="text-primary-foreground/60 text-sm mb-8 leading-relaxed">
              Mālama Labs Inc.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300" />
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* Company */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-primary-foreground">Company</h3>
            <div className="space-y-3">
              {companyLinks.map((link) => (
                <div key={link.name}>
                  <button
                    onClick={link.action}
                    className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-left font-medium text-sm"
                  >
                    {link.name}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Investors & Advisors */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-primary-foreground">Investors & Advisors</h3>
            <div className="space-y-3">
              {investorLinks.map((link) => (
                <div key={link.name}>
                  <button
                    onClick={link.action}
                    className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-left font-medium text-sm"
                  >
                    {link.name}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Platform */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-primary-foreground">Platform</h3>
            <div className="space-y-3">
              {platformLinks.map((link) => (
                <div key={link.name}>
                  <button
                    onClick={link.action}
                    className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-left font-medium text-sm"
                  >
                    {link.name}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Resources */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-primary-foreground">Resources</h3>
            <div className="space-y-3">
              {resourceLinks.map((link) => (
                <div key={link.name}>
                  <button
                    onClick={link.action}
                    className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-left font-medium text-sm"
                  >
                    {link.name}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <Separator className="bg-primary-foreground/20 mb-8" />
        
        {/* Legal Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {legalLinks.map((link) => (
            <button
              key={link.name}
              onClick={link.action}
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors duration-300"
            >
              {link.name}
            </button>
          ))}
        </motion.div>

        <Separator className="bg-primary-foreground/20 mb-8" />
        
        <motion.div 
          className="text-center text-sm text-primary-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="mb-2">© 2025 Mālama Labs Incorporated. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}