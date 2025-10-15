import { motion } from 'motion/react';
import { ScheduleCallCard } from '../dashboard/ScheduleCallCard';
import { ProfileCompletionBanner } from '../dashboard/ProfileCompletionBanner';
import { ProfileEditor } from '../dashboard/ProfileEditor';
import { QuestionnaireTodos } from '../dashboard/QuestionnaireTodos';
import { MessageInbox } from '../dashboard/MessageInbox';

interface AuthenticatedDashboardProps {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

/**
 * Unified Dashboard for Multi-Role System
 * All users see the same dashboard with:
 * - Profile completion banner (role selection)
 * - Questionnaire todos
 * - Profile editor
 * - Schedule call CTA
 */
export function AuthenticatedDashboard({ user }: AuthenticatedDashboardProps) {
  const handleNavigate = (page: string) => {
    // Map page names to correct URL paths
    const pageToPath: Record<string, string> = {
      'onboardingV2': '/onboarding/v2',
      'onboardingV2ProjectDeveloper': '/onboarding/v2/project-developer',
      'onboardingV2TechDeveloper': '/onboarding/v2/technology-developer',
      'onboardingV2CreditBuyer': '/onboarding/v2/credit-buyer',
      'onboardingV2Partner': '/onboarding/v2/partner',
      'dashboard': '/dashboard'
    };
    
    const path = pageToPath[page] || `/${page}`;
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ marginTop: '200px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Welcome Message */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user.name || user.email.split('@')[0]}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Your personalized dashboard is ready
            </p>
          </div>
          
          {/* Profile Completion Banner */}
          <div className="mb-6">
            <ProfileCompletionBanner 
              userId={user.id}
              userEmail={user.email}
              onNavigate={handleNavigate}
            />
          </div>
          
          {/* Message Inbox */}
          <div className="mb-6">
            <MessageInbox userId={user.id} />
          </div>
          
          {/* Questionnaire Todos */}
          <div className="mb-6">
            <QuestionnaireTodos 
              userId={user.id}
              onNavigate={handleNavigate}
            />
          </div>
          
          {/* Profile Editor */}
          <div className="mb-6">
            <ProfileEditor 
              userId={user.id}
              userEmail={user.email}
              onProfileUpdate={() => {
                // Optionally reload data when profile is updated
                window.location.reload();
              }}
            />
          </div>

          {/* Schedule Call Card */}
          <div className="mb-6">
            <ScheduleCallCard />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

