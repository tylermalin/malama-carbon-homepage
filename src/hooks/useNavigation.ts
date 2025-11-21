import { useState, useEffect } from 'react';

// Track page views
async function trackPageView(pageName: string, pagePath: string) {
  try {
    const { analytics } = await import('../lib/analytics');
    await analytics.trackPageView({
      pageName,
      pagePath
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

export type PageType = 
  | 'home'
  | 'dashboard' 
  | 'dashboards'
  | 'admin'
  | 'storageTest'
  | 'platform'
  | 'howItWorks'
  | 'getStarted'
  | 'signup'
  | 'signin'
  | 'landSteward'
  | 'documentation'
  | 'blog'
  | 'pressReleases'
  | 'projectGallery'
  | 'about'
  | 'team'
  | 'contact'
  | 'faq'
  | 'careers'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'cookiePolicy'
  | 'carbonStudio'
  | 'carbonProtocols'
  | 'dmrvEngine'
  | 'timeline'
  | 'financials'
  | 'investor'
  | 'advisory'
  | 'presentation'
  | 'presentations'
  | 'presentationBuyers'
  | 'presentationProjects'
  | 'onboardingV2'
  | 'onboardingV2ProjectDeveloper'
  | 'onboardingV2TechDeveloper'
  | 'onboardingV2CreditBuyer'
  | 'onboardingV2Partner'
  | 'idahoPilot'
  | 'idahoPilotRegister'
  | 'greenPaper'
  | 'stake';

// Map URL paths to page types
const pathToPageMap: Record<string, PageType> = {
  '/': 'home',
  '/investors': 'investor',
  '/investor': 'investor',
  '/advisory': 'advisory',
  '/advisoryboard': 'advisory',
  '/advisory-board': 'advisory',
  '/admin': 'admin',
  '/analytics': 'admin',
  '/storage-test': 'storageTest',
  '/test-storage': 'storageTest',
  '/presentation': 'presentation',
  '/presentations': 'presentations',
  '/presentations/buyers': 'presentationBuyers',
  '/presentations/projects': 'presentationProjects',
  '/platform': 'platform',
  '/team': 'team',
  '/about': 'about',
  '/contact': 'contact',
  '/faq': 'faq',
  '/careers': 'careers',
  '/blog': 'blog',
  '/press': 'pressReleases',
  '/press-releases': 'pressReleases',
  '/documentation': 'documentation',
  '/how-it-works': 'howItWorks',
  '/carbon-studio': 'carbonStudio',
  '/carbon-protocols': 'carbonProtocols',
  '/dmrv-engine': 'dmrvEngine',
  '/projects': 'projectGallery',
  '/privacy': 'privacyPolicy',
  '/terms': 'termsOfService',
  '/cookies': 'cookiePolicy',
  '/financials': 'financials',
  '/timeline': 'timeline',
  '/dashboard': 'dashboard',
  '/dashboards': 'dashboards',
  '/land-steward': 'landSteward',
  '/signup': 'signup',
  '/signin': 'signin',
  '/login': 'signin',
  '/onboarding/v2': 'onboardingV2',
  '/onboarding/v2/project-developer': 'onboardingV2ProjectDeveloper',
  '/onboarding/v2/technology-developer': 'onboardingV2TechDeveloper',
  '/onboarding/v2/credit-buyer': 'onboardingV2CreditBuyer',
  '/onboarding/v2/partner': 'onboardingV2Partner',
  '/idaho-pilot': 'idahoPilot',
  '/idaho-pilot/register': 'idahoPilotRegister',
  '/green-paper': 'greenPaper',
  '/stake': 'stake',
  '/stake-to-malama': 'stake',
};

// Map page types to URL paths
const pageToPathMap: Record<PageType, string> = {
  home: '/',
  investor: '/investors',
  advisory: '/advisory',
  admin: '/admin',
  storageTest: '/storage-test',
  presentation: '/presentation',
  presentations: '/presentations',
  presentationBuyers: '/presentations/buyers',
  presentationProjects: '/presentations/projects',
  platform: '/platform',
  team: '/team',
  about: '/about',
  contact: '/contact',
  faq: '/faq',
  careers: '/careers',
  blog: '/blog',
  pressReleases: '/press',
  documentation: '/documentation',
  howItWorks: '/how-it-works',
  getStarted: '/signup',
  signup: '/signup',
  signin: '/signin',
  dashboard: '/dashboard',
  dashboards: '/dashboards',
  landSteward: '/land-steward',
  projectGallery: '/projects',
  privacyPolicy: '/privacy',
  termsOfService: '/terms',
  cookiePolicy: '/cookies',
  carbonStudio: '/carbon-studio',
  carbonProtocols: '/carbon-protocols',
  dmrvEngine: '/dmrv-engine',
  timeline: '/timeline',
  financials: '/financials',
  onboardingV2: '/onboarding/v2',
  onboardingV2ProjectDeveloper: '/onboarding/v2/project-developer',
  onboardingV2TechDeveloper: '/onboarding/v2/technology-developer',
  onboardingV2CreditBuyer: '/onboarding/v2/credit-buyer',
  onboardingV2Partner: '/onboarding/v2/partner',
  idahoPilot: '/idaho-pilot',
  idahoPilotRegister: '/idaho-pilot/register',
  greenPaper: '/green-paper',
  stake: '/stake',
};

function getInitialPage(): PageType {
  const path = window.location.pathname.toLowerCase();
  return pathToPageMap[path] || 'home';
}

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage());

  // Update URL when page changes
  useEffect(() => {
    const newPath = pageToPathMap[currentPage] || '/';
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
      
      // Track page view
      trackPageView(currentPage, newPath);
      
      // Update page title
      const pageTitles: Record<PageType, string> = {
        home: 'Mālama Labs - Digital Carbon Infrastructure',
        investor: 'Investor Portal | Mālama Labs',
        advisory: 'Advisory Board | Mālama Labs',
        admin: 'Admin Analytics | Mālama Labs',
        storageTest: 'Storage Test | Mālama Labs',
        presentation: 'Investor Presentation | Mālama Labs',
        presentations: 'Presentations | Mālama Labs',
        presentationBuyers: 'CO₂.0 for Buyers | Mālama Labs',
        presentationProjects: 'CO₂.0 for Projects | Mālama Labs',
        platform: 'Platform | Mālama Labs',
        team: 'Our Team | Mālama Labs',
        about: 'About | Mālama Labs',
        contact: 'Contact | Mālama Labs',
        faq: 'FAQ | Mālama Labs',
        careers: 'Careers | Mālama Labs',
        blog: 'Blog | Mālama Labs',
        pressReleases: 'Press Releases | Mālama Labs',
        documentation: 'Documentation | Mālama Labs',
        howItWorks: 'How It Works | Mālama Labs',
        getStarted: 'Get Started | Mālama Labs',
        signup: 'Sign Up | Mālama Labs',
        signin: 'Sign In | Mālama Labs',
        dashboard: 'Dashboard | Mālama Labs',
        dashboards: 'Dashboards | Mālama Labs',
        landSteward: 'Project Developer | Mālama Labs',
        projectGallery: 'Projects | Mālama Labs',
        privacyPolicy: 'Privacy Policy | Mālama Labs',
        termsOfService: 'Terms of Service | Mālama Labs',
        cookiePolicy: 'Cookie Policy | Mālama Labs',
        carbonStudio: 'Carbon Credit Studio | Mālama Labs',
        carbonProtocols: 'Carbon Protocols | Mālama Labs',
        dmrvEngine: 'dMRV Engine | Mālama Labs',
        timeline: 'Timeline | Mālama Labs',
        financials: 'Financials | Mālama Labs',
        onboardingV2: 'Choose Your Path | Mālama Labs',
        onboardingV2ProjectDeveloper: 'Project Developer Registration | Mālama Labs',
        onboardingV2TechDeveloper: 'Tech Developer Registration | Mālama Labs',
        onboardingV2CreditBuyer: 'Credit Buyer Registration | Mālama Labs',
        onboardingV2Partner: 'Partner Registration | Mālama Labs',
        idahoPilot: 'Idaho Rock Weathering Pilot – Farmers & Landowners | Mālama Labs',
        idahoPilotRegister: 'Apply for Idaho Pilot | Mālama Labs',
        greenPaper: 'The Mālama Green Paper V3.1 | Mālama Labs',
        stake: 'Stake to Mālama | Mālama Labs',
      };
      
      document.title = pageTitles[currentPage] || 'Mālama Labs';
    }
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const page = pathToPageMap[path] || 'home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (page: PageType, section?: string) => {
    setCurrentPage(page);
    
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (section && page === 'home') {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navigateToSection = (section?: string) => {
    navigateToPage('home', section);
  };

  const showPlatformPage = (section?: string) => {
    setCurrentPage('platform');
    
    // Scroll to top when navigating to platform page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Navigation functions for each page
  const navigationFunctions = {
    showHome: () => navigateToPage('home'),
    showDashboard: () => navigateToPage('dashboard'),
    showDashboards: () => navigateToPage('dashboards'),
    showPlatform: showPlatformPage,
    showHowItWorks: () => navigateToPage('howItWorks'),
    showGetStarted: () => navigateToPage('getStarted'),
    showLandSteward: () => navigateToPage('landSteward'),
    showDocumentation: () => navigateToPage('documentation'),
    showBlog: () => navigateToPage('blog'),
    showProjectGallery: () => navigateToPage('projectGallery'),
    showAbout: () => navigateToPage('about'),
    showTeam: () => navigateToPage('team'),
    showContact: () => navigateToPage('contact'),
    showFAQ: () => navigateToPage('faq'),
    showCareers: () => navigateToPage('careers'),
    showPressReleases: () => navigateToPage('pressReleases'),
    showPrivacyPolicy: () => navigateToPage('privacyPolicy'),
    showTermsOfService: () => navigateToPage('termsOfService'),
    showCookiePolicy: () => navigateToPage('cookiePolicy'),
    showCarbonStudio: () => navigateToPage('carbonStudio'),
    showCarbonProtocols: () => navigateToPage('carbonProtocols'),
    showDMRVEngine: () => navigateToPage('dmrvEngine'),
    showTimeline: () => navigateToPage('timeline'),
    showFinancials: () => navigateToPage('financials'),
    showInvestor: () => navigateToPage('investor'),
    showAdvisory: () => navigateToPage('advisory'),
    showPresentation: () => navigateToPage('presentation'),
    showPresentations: () => navigateToPage('presentations'),
    showPresentationBuyers: () => navigateToPage('presentationBuyers'),
    showPresentationProjects: () => navigateToPage('presentationProjects'),
    showIdahoPilot: () => navigateToPage('idahoPilot'),
    showIdahoPilotRegister: () => navigateToPage('idahoPilotRegister'),
    showGreenPaper: () => navigateToPage('greenPaper'),
    showStake: () => navigateToPage('stake'),
  };

  const isOnSubPage = currentPage !== 'home';

  return {
    currentPage,
    navigateToPage,
    navigateToSection,
    isOnSubPage,
    ...navigationFunctions
  };
}