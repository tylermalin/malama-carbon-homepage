import { useState } from 'react';

export type PageType = 
  | 'home'
  | 'dashboard' 
  | 'platform'
  | 'howItWorks'
  | 'getStarted'
  | 'landSteward'
  | 'documentation'
  | 'blog'
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
  | 'dmrvEngine';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const navigateToPage = (page: PageType, section?: string) => {
    setCurrentPage(page);
    
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
    showPrivacyPolicy: () => navigateToPage('privacyPolicy'),
    showTermsOfService: () => navigateToPage('termsOfService'),
    showCookiePolicy: () => navigateToPage('cookiePolicy'),
    showCarbonStudio: () => navigateToPage('carbonStudio'),
    showCarbonProtocols: () => navigateToPage('carbonProtocols'),
    showDMRVEngine: () => navigateToPage('dmrvEngine'),
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