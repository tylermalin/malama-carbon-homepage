import React, { useState } from 'react';
import { AuthUser } from '../types/auth';
import { PageType } from '../hooks/useNavigation';

// Main content components
import { HeroSection } from './HeroSection';
import { ValueProposition } from './ValueProposition';
import { CoreModules } from './CoreModules';
import { PartnerLogos } from './PartnerLogos';
import { ImpactHighlight } from './ImpactHighlight';
import { HowItWorks } from './HowItWorks';
import { OnboardingFlow } from './OnboardingFlow';
import { ClosingCTA } from './ClosingCTA';
import { Footer } from './Footer';
import { DashboardRouter } from './dashboards/DashboardRouter';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { DMRVDashboard } from './dMRVDashboard';
import { TokenomicsOverview } from './TokenomicsOverview';
import { CarbonTimelineLanding } from './CarbonTimelineLanding';
import { UnifiedCarbonTimeline } from './UnifiedCarbonTimeline';

// Page components
import { ProjectDashboard } from './ProjectDashboard';
import { PlatformPage } from './PlatformPage';
import { HowItWorksPage } from './HowItWorksPage';
import { GetStartedPage } from './GetStartedPage';
import { LandStewardPage } from './LandStewardPage';
import { DocumentationPage } from './DocumentationPage';
import { BlogPage } from './BlogPage';
import { ProjectGallery } from './ProjectGallery';
import { AboutPage } from './AboutPage';
import { TeamPage } from './TeamPage';
import { ContactPage } from './ContactPage';
import { FAQPage } from './FAQPage';
import { CareersPage } from './CareersPage';
import { LegalPage } from './LegalPage';
import { ProductFeaturePage } from './ProductFeaturePage';
import { Cpu, Flame, Coins } from 'lucide-react';

interface PageRouterProps {
  currentPage: PageType;
  user: AuthUser | null;
  onAccountCreated: (userData: AuthUser) => void;
  navigationFunctions: {
    showPlatform: (section?: string) => void;
    showHowItWorks: () => void;
    showGetStarted: () => void;
    showLandSteward: () => void;
    showDocumentation: () => void;
    showBlog: () => void;
    showProjectGallery: () => void;
    showAbout: () => void;
    showTeam: () => void;
    showContact: () => void;
    showFAQ: () => void;
    showCareers: () => void;
    showPrivacyPolicy: () => void;
    showTermsOfService: () => void;
    showCookiePolicy: () => void;
    showCarbonStudio: () => void;
    showCarbonProtocols: () => void;
    showDMRVEngine: () => void;
    showTimeline: () => void;
  };
  navigateToSection: (section?: string) => void;
}

export function PageRouter({ 
  currentPage, 
  user, 
  onAccountCreated, 
  navigationFunctions,
  navigateToSection
}: PageRouterProps) {
  const [userType, setUserType] = useState<'steward' | 'developer' | 'buyer' | 'partner' | undefined>(undefined);

  const handleAccountCreated = (userData: AuthUser, userType?: string) => {
    console.log('Account created with user type:', userType);
    setUserType(userType as 'steward' | 'developer' | 'buyer' | 'partner' | undefined);
    onAccountCreated(userData);
  };
  const {
    showPlatform,
    showHowItWorks,
    showGetStarted,
    showLandSteward,
    showDocumentation,
    showBlog,
    showProjectGallery,
    showAbout,
    showTeam,
    showContact,
    showFAQ,
    showCareers,
    showPrivacyPolicy,
    showTermsOfService,
    showCookiePolicy,
    showCarbonStudio,
    showCarbonProtocols,
    showDMRVEngine,
    showTimeline
  } = navigationFunctions;

  // Render individual pages
  switch (currentPage) {
    case 'dashboard':
      return user ? <ProjectDashboard user={user} /> : null;
    
    case 'platform':
      return (
        <>
          <PlatformPage onNavigate={navigateToSection} onStartProject={showGetStarted} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'howItWorks':
      return (
        <>
          <HowItWorksPage onNavigate={navigateToSection} onStartProject={showGetStarted} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'getStarted':
      return (
        <>
          <GetStartedPage 
            onNavigate={navigateToSection} 
            onAccountCreated={handleAccountCreated} 
            onShowDashboards={() => navigateToPage('dashboard')}
            user={user}
          />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'dashboards':
      return <DashboardRouter userType={userType} />;
    
    case 'privacyPolicy':
      return <PrivacyPolicyPage onNavigate={navigateToSection} />;
    
    case 'landSteward':
      return (
        <>
          <LandStewardPage 
            onNavigate={navigateToSection} 
            onStartProject={() => {
              console.log('PageRouter: showGetStarted called');
              showGetStarted();
            }} 
          />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'documentation':
      return (
        <>
          <DocumentationPage onNavigate={navigateToSection} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'blog':
      return (
        <>
          <BlogPage onNavigate={navigateToSection} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'projectGallery':
      return (
        <>
          <ProjectGallery onNavigate={navigateToSection} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'about':
      return (
        <>
          <AboutPage onNavigate={navigateToSection} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'team':
      return (
        <>
          <TeamPage onNavigate={navigateToSection} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'contact':
      return (
        <>
          <ContactPage onNavigate={navigateToSection} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'faq':
      return (
        <>
          <FAQPage onNavigate={navigateToSection} onContact={showContact} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'careers':
      return (
        <>
          <CareersPage onNavigate={navigateToSection} />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
      
    case 'termsOfService':
      return (
        <>
          <LegalPage 
            onNavigate={navigateToSection}
            title="Terms of Service"
            content="These Terms of Service govern your use of Mālama Carbon's platform and services. By accessing or using our platform, you agree to be bound by these terms."
          />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
      
    case 'cookiePolicy':
      return (
        <>
          <LegalPage 
            onNavigate={navigateToSection}
            title="Cookie Policy"
            content="This Cookie Policy explains how Mālama Carbon uses cookies and similar technologies to enhance your experience on our platform."
          />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
      
    case 'carbonStudio':
      return (
        <>
          <ProductFeaturePage 
            onNavigate={navigateToSection}
            onStartProject={showGetStarted}
            title="Carbon Credit Studio"
            subtitle="Issue and pre-sell durable credits on-chain"
            description="Our Carbon Credit Studio enables projects to issue and pre-sell durable LC02/VC02 credits on-chain to jumpstart financing and accelerate project development."
            features={[
              "Pre-sell carbon credits before project completion",
              "On-chain issuance for transparency and trust",
              "Integration with major certification platforms",
              "Automated compliance and reporting",
              "Access to verified carbon credit buyers",
              "Real-time pricing and market data"
            ]}
            icon={Coins}
          />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
      
    case 'carbonProtocols':
      return (
        <>
          <ProductFeaturePage 
            onNavigate={navigateToSection}
            onStartProject={showGetStarted}
            title="Durable Carbon Sequestration Protocols"
            subtitle="Track, verify, and tokenize biochar carbon removal"
            description="Our protocols provide a comprehensive framework for tracking, verifying, and tokenizing biochar carbon removal with pre-certification pathways."
            features={[
              "Pre-certification pathways for faster approval",
              "Biochar-specific measurement protocols",
              "Automated verification and monitoring",
              "Integration with Verra and Gold Standard",
              "Permanence tracking and verification",
              "Chain of custody documentation"
            ]}
            icon={Flame}
          />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
      
    case 'dmrvEngine':
      return (
        <>
          <ProductFeaturePage 
            onNavigate={navigateToSection}
            onStartProject={showGetStarted}
            title="Universal dMRV Engine"
            subtitle="Automated measurement across any methodology"
            description="Our Universal dMRV Engine provides automated measurement and monitoring across any carbon methodology, integrated with certification platforms."
            features={[
              "Compatible with any carbon methodology",
              "AI-powered sensor networks",
              "Real-time data collection and analysis",
              "Automated reporting to certification bodies",
              "Blockchain-verified data integrity",
              "Cross-platform integration capabilities"
            ]}
            icon={Cpu}
          />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
    
    case 'timeline':
      return (
        <UnifiedCarbonTimeline 
          onBackToHome={() => navigateToSection()}
          onShowAbout={showAbout}
          onShowProjects={showProjectGallery}
          onShowContact={showContact}
          onShowGetStarted={showGetStarted}
        />
      );
    
    
    case 'home':
    default:
      // Render full homepage
      return (
        <>
          <HeroSection 
            onExplorePlatform={showPlatform} 
            onHowItWorks={showHowItWorks} 
            onStartProject={showGetStarted} 
            onLandSteward={showLandSteward} 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowProjectGallery={showProjectGallery} 
            onShowTimeline={showTimeline}
          />
          <ValueProposition onExplorePlatform={showPlatform} />
          <CoreModules onNavigateToPlatform={showPlatform} />
          <PartnerLogos />
          <ImpactHighlight onShowProjectGallery={showProjectGallery} />
          <DMRVDashboard />
          <TokenomicsOverview />
          <HowItWorks onShowDetailedProcess={showHowItWorks} onLaunchProject={showGetStarted} />
          <OnboardingFlow />
          <ClosingCTA 
            onStartProject={showGetStarted} 
            onLandSteward={showLandSteward}
            onExplorePlatform={showPlatform}
            onHowItWorks={showHowItWorks}
          />
          <Footer 
            onShowDocumentation={showDocumentation} 
            onShowBlog={showBlog} 
            onShowPlatform={showPlatform}
            onShowHowItWorks={showHowItWorks}
            onShowAbout={showAbout}
            onShowTeam={showTeam}
            onShowContact={showContact}
            onShowCareers={showCareers}
            onShowFAQ={showFAQ}
            onShowPrivacyPolicy={showPrivacyPolicy}
            onShowTermsOfService={showTermsOfService}
            onShowCookiePolicy={showCookiePolicy}
            onShowCarbonStudio={showCarbonStudio}
            onShowCarbonProtocols={showCarbonProtocols}
            onShowDMRVEngine={showDMRVEngine}
          />
        </>
      );
  }
}