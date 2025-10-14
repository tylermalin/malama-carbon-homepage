import { motion } from 'motion/react';
import { ScheduleCallCard } from '../dashboard/ScheduleCallCard';
import { ProfileCompletionBanner } from '../dashboard/ProfileCompletionBanner';
import { ProfileEditor } from '../dashboard/ProfileEditor';
import { QuestionnaireTodos } from '../dashboard/QuestionnaireTodos';

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
    window.history.pushState({}, '', page === 'onboardingV2' ? '/onboarding/v2' : `/${page}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dashboard
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Track your projects, monitor carbon credits, and manage your carbon removal journey
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user.name || user.email.split('@')[0]}! 👋
            </h2>
            <p className="text-lg text-gray-600">
              Your personalized dashboard is ready
            </p>
          </div>
          
          {/* Profile Completion Banner */}
          <ProfileCompletionBanner 
            userId={user.id}
            userEmail={user.email}
            onNavigate={handleNavigate}
          />
          
          {/* Questionnaire Todos */}
          <div className="mt-8">
            <QuestionnaireTodos 
              userId={user.id}
              onNavigate={handleNavigate}
            />
          </div>
          
          {/* Profile Editor */}
          <div className="mt-8">
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
          <div className="mt-8">
            <ScheduleCallCard />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

