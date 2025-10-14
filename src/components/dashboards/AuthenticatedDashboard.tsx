import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { StewardDashboard } from './StewardDashboard';
import { DeveloperDashboard } from './DeveloperDashboard';
import { BuyerDashboard } from './BuyerDashboard';
import { PartnerDashboard } from './PartnerDashboard';
import { getUserProfile, UserRole } from '../../lib/onboardingV2';
import { NextStepsCard } from '../dashboard/NextStepsCard';
import { ProcessOverviewCard } from '../dashboard/ProcessOverviewCard';
import { ScheduleCallCard } from '../dashboard/ScheduleCallCard';

interface AuthenticatedDashboardProps {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export function AuthenticatedDashboard({ user }: AuthenticatedDashboardProps) {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, [user.id]);

  async function loadUserProfile() {
    setIsLoading(true);
    try {
      const result = await getUserProfile(user.id);
      
      if (result.success && result.data?.role) {
        setUserRole(result.data.role as UserRole);
      } else {
        // No role found - user hasn't completed onboarding
        console.log('No role found for user, showing default dashboard');
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If user has completed onboarding v2, show role-specific dashboard
  if (userRole) {
    const goBack = () => {
      // Optional: Add navigation back to dashboard selection
      console.log('Navigate back');
    };

    // Map Onboarding V2 roles to Dashboard types
    switch (userRole) {
      case 'PROJECT_DEVELOPER':
        return (
          <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - 2 columns */}
                <div className="lg:col-span-2">
                  <StewardDashboard onBack={goBack} />
                </div>
                
                {/* Sidebar - 1 column */}
                <div className="space-y-6">
                  <ProcessOverviewCard userId={user.id} />
                  <NextStepsCard userId={user.id} />
                  <ScheduleCallCard />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'TECHNOLOGY_DEVELOPER':
        return (
          <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <DeveloperDashboard onBack={goBack} />
                </div>
                <div className="space-y-6">
                  <ProcessOverviewCard userId={user.id} />
                  <NextStepsCard userId={user.id} />
                  <ScheduleCallCard />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'CREDIT_BUYER':
        return (
          <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <BuyerDashboard onBack={goBack} />
                </div>
                <div className="space-y-6">
                  <ProcessOverviewCard userId={user.id} />
                  <NextStepsCard userId={user.id} />
                  <ScheduleCallCard />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'PARTNER':
        return (
          <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <PartnerDashboard onBack={goBack} />
                </div>
                <div className="space-y-6">
                  <ProcessOverviewCard userId={user.id} />
                  <NextStepsCard userId={user.id} />
                  <ScheduleCallCard />
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <DefaultDashboardWithOnboarding user={user} />;
    }
  }

  // Default: Show onboarding prompt
  return <DefaultDashboardWithOnboarding user={user} />;
}

function DefaultDashboardWithOnboarding({ user }: AuthenticatedDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Welcome, {user.name || user.email}! 👋
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Complete your onboarding to unlock your personalized dashboard
          </p>
          
          <div className="bg-muted/20 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Get Started in 3 Minutes
            </h2>
            <p className="text-muted-foreground mb-6">
              Tell us about your role in the carbon removal ecosystem and we'll set up your dashboard with the tools you need.
            </p>
            <button
              onClick={() => {
                window.history.pushState({}, '', '/onboarding/v2');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Complete Onboarding
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ProcessOverviewCard userId={user.id} />
            <div className="md:col-span-2">
              <NextStepsCard userId={user.id} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

