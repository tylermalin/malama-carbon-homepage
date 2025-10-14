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
import { TermsOfServicePage } from './TermsOfServicePage';
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
import { FinancialsPage } from './FinancialsPage';
import { InvestorPage } from './InvestorPage';
import { AdvisoryBoardPage } from './AdvisoryBoardPage';
import { CarbonProtocolsPage } from './CarbonProtocolsPage';
import { DMRVEnginePage } from './DMRVEnginePage';
import { CarbonCreditStudioPage } from './CarbonCreditStudioPage';
import { PresentationPage } from './PresentationPage';
import { PresentationsHubPage } from './PresentationsHubPage';
import { BuyersPresentationPage } from './BuyersPresentationPage';
import { ProjectsPresentationPage } from './ProjectsPresentationPage';
import { AdminAnalyticsDashboard } from './AdminAnalyticsDashboard';
import { StorageTest } from './StorageTest';
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
    showFinancials: () => void;
    showInvestor: () => void;
    showAdvisory: () => void;
    showDashboards: () => void;
    showPresentation: () => void;
    showPresentations: () => void;
    showPresentationBuyers: () => void;
    showPresentationProjects: () => void;
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
    showTimeline,
    showFinancials,
    showInvestor,
    showAdvisory,
    showDashboards,
    showPresentation,
    showPresentations,
    showPresentationBuyers,
    showPresentationProjects
  } = navigationFunctions;

  // Render individual pages
  switch (currentPage) {
    case 'dashboard':
      return user ? <ProjectDashboard user={user} /> : null;
    
    case 'platform':
      return (
        <>
          <PlatformPage 
            onNavigate={navigateToSection} 
            onStartProject={showGetStarted}
            onNavigateToDMRV={showDMRVEngine}
            onNavigateToProtocols={showCarbonProtocols}
            onNavigateToStudio={showCarbonStudio}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
          />
        </>
      );
    
    case 'getStarted':
      return (
        <>
          <GetStartedPage 
            onNavigate={navigateToSection} 
            onAccountCreated={handleAccountCreated} 
            onShowDashboards={showDashboards}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
          />
        </>
      );
    
      
    case 'termsOfService':
      return (
        <TermsOfServicePage 
          onNavigate={navigateToSection}
        />
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
          />
        </>
      );
      
    case 'carbonStudio':
      return (
        <>
          <CarbonCreditStudioPage 
            onNavigate={navigateToSection}
            onStartProject={showGetStarted}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
          />
        </>
      );
      
    case 'carbonProtocols':
      return (
        <>
          <CarbonProtocolsPage 
            onNavigate={navigateToSection}
            onStartProject={showGetStarted}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
          />
        </>
      );
      
    case 'dmrvEngine':
      return (
        <>
          <DMRVEnginePage 
            onNavigate={navigateToSection}
            onStartProject={showGetStarted}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
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
    
    case 'financials':
      return (
        <>
          <FinancialsPage 
            onNavigate={navigateToSection}
            onContact={showContact}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
          />
        </>
      );
    
    case 'investor':
      return (
        <InvestorPage 
          onNavigate={navigateToSection}
          onContact={showContact}
        />
      );
    
    case 'advisory':
      return (
        <AdvisoryBoardPage 
          onNavigate={navigateToSection}
          onContact={showContact}
        />
      );
    
    case 'admin':
      return (
        <AdminAnalyticsDashboard 
          onNavigate={navigateToSection}
          onShowGetStarted={showGetStarted}
          user={user}
        />
      );
    
    case 'storageTest':
      return <StorageTest />;
    
    case 'presentation':
      return (
        <PresentationPage
          onNavigate={navigateToSection}
          onShowInvestor={showInvestor}
        />
      );
    
    case 'presentations':
      return (
        <PresentationsHubPage
          onNavigate={navigateToSection}
          onShowPresentation={showPresentation}
          onShowPresentationBuyers={showPresentationBuyers}
          onShowPresentationProjects={showPresentationProjects}
          onShowInvestor={showInvestor}
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
          onShowFinancials={showFinancials}
          onShowAdvisory={showAdvisory}
          onShowPresentations={showPresentations}
          onShowProjectGallery={showProjectGallery}
        />
      );
    
    case 'presentationBuyers':
      return (
        <BuyersPresentationPage
          onNavigate={navigateToSection}
        />
      );
    
    case 'presentationProjects':
      return (
        <ProjectsPresentationPage
          onNavigate={navigateToSection}
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
            onShowFinancials={showFinancials}
            onShowInvestor={showInvestor}
            onShowAdvisory={showAdvisory}
            onShowPresentation={showPresentation}
            onShowPresentations={showPresentations}
          />
        </>
      );
  }
}