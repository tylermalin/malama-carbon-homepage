import React from 'react';
import { AuthModal } from './components/AuthModal';
import { NavigationBar } from './components/NavigationBar';
import { PageRouter } from './components/PageRouter';
import { useAuth } from './hooks/useAuth';
import { useNavigation } from './hooks/useNavigation';
import { AuthUser } from './types/auth';

export default function App() {
  const {
    user,
    isAuthModalOpen,
    isCheckingAuth,
    handleAuthSuccess,
    handleSignOut,
    openAuthModal,
    closeAuthModal
  } = useAuth();

  const {
    currentPage,
    navigateToSection,
    isOnSubPage,
    showDashboard,
    ...navigationFunctions
  } = useNavigation();

  const toggleDashboard = () => {
    if (!user) {
      openAuthModal();
    } else {
      showDashboard();
    }
  };

  const handleAccountCreated = (userData: AuthUser) => {
    handleAuthSuccess(userData);
    showDashboard();
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <NavigationBar
        user={user}
        isOnSubPage={isOnSubPage}
        isDashboardActive={currentPage === 'dashboard'}
        onSignIn={openAuthModal}
        onSignOut={handleSignOut}
        onHome={() => navigateToSection()}
        onDashboard={toggleDashboard}
      />

      <PageRouter
        currentPage={currentPage}
        user={user}
        onAccountCreated={handleAccountCreated}
        navigationFunctions={navigationFunctions}
        navigateToSection={navigateToSection}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />
    </main>
  );
}