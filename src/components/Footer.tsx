import { motion } from 'motion/react';
import { Separator } from './ui/separator';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import malamaLogo from '../assets/malamalabbs.png';

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
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/malamalabs" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/malama-labs" },
  { name: "GitHub", icon: Github, href: "https://github.com/MalamaLabs" },
  { name: "Email", icon: Mail, href: "mailto:hello@malamalabs.com" }
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
  onShowDMRVEngine
}: FooterProps) {
  
  const productLinks = [
    { name: "Platform Overview", action: onShowPlatform },
    { name: "Carbon Credit Studio", action: onShowCarbonStudio },
    { name: "Carbon Protocols", action: onShowCarbonProtocols },
    { name: "dMRV Engine", action: onShowDMRVEngine }
  ];

  const learnLinks = [
    { name: "How It Works", action: onShowHowItWorks },
    { name: "Documentation", action: onShowDocumentation },
    { name: "Blog", action: onShowBlog },
    { name: "FAQ", action: onShowFAQ }
  ];

  const companyLinks = [
    { name: "About", action: onShowAbout },
    { name: "Our Team", action: onShowTeam },
    { name: "Contact", action: onShowContact },
    { name: "Careers", action: onShowCareers }
  ];

  const legalLinks = [
    { name: "Privacy Policy", action: onShowPrivacyPolicy },
    { name: "Terms of Service", action: onShowTermsOfService },
    { name: "Cookie Policy", action: onShowCookiePolicy }
  ];

  return (
    <footer className="bg-[rgba(0,0,0,1)] text-primary-foreground py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
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
                src={malamaLogo} 
                alt="Mālama Labs" 
                className="h-[80px] w-auto object-contain"
              />
            </div>
            <p className="text-primary-foreground/80 max-w-md mb-8 leading-relaxed">
              Automating carbon removal through innovative technology and traditional Hawaiian land stewardship practices.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300" />
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* Products */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium mb-6 text-primary-foreground">Products</h3>
            <div className="space-y-4">
              {productLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Learn */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium mb-6 text-primary-foreground">Learn</h3>
            <div className="space-y-4">
              {learnLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Company */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium mb-6 text-primary-foreground">Company</h3>
            <div className="space-y-4">
              {companyLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Legal */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium mb-6 text-primary-foreground">Legal</h3>
            <div className="space-y-4">
              {legalLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
        
        <Separator className="bg-primary-foreground/20 mb-8" />
        
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>© 2025 Mālama Labs Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <button 
              onClick={onShowPrivacyPolicy}
              className="hover:text-primary-foreground/80 transition-colors duration-300"
            >
              Privacy Policy
            </button>
            <button 
              onClick={onShowTermsOfService}
              className="hover:text-primary-foreground/80 transition-colors duration-300"
            >
              Terms of Service
            </button>
            <button 
              onClick={onShowCookiePolicy}
              className="hover:text-primary-foreground/80 transition-colors duration-300"
            >
              Cookie Policy
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}