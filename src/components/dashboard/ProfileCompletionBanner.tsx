/**
 * Profile Completion Banner
 * Shows profile completion status and prompts users to complete their profile
 * Includes inline role selection for better UX
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { AlertCircle, CheckCircle2, ArrowRight, User, Briefcase, FileText, Leaf, Code, ShoppingCart, Handshake, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface ProfileCompletionBannerProps {
  userId: string;
  userEmail: string;
  onNavigate: (page: string) => void;
}

interface ProfileData {
  full_name: string | null;
  role: string | null;
  org_name: string | null;
  profile_completed: boolean | null;
}

export function ProfileCompletionBanner({ userId, userEmail, onNavigate }: ProfileCompletionBannerProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingRole, setIsSavingRole] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, role, org_name, profile_completed')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.log('No profile found yet:', error);
        setProfile(null);
      } else {
        setProfile(data);
        calculateCompletion(data);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = async (roleId: string, rolePath: string) => {
    if (!supabase) {
      console.warn('Supabase not configured, navigating directly');
      onNavigate(rolePath);
      return;
    }

    setIsSavingRole(true);

    try {
      // Save role to profile
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          role: roleId,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (updateError) {
        console.error('Error saving role:', updateError);
        throw updateError;
      }

      console.log('✅ Role saved:', roleId);

      // Reload profile to update UI
      await loadProfile();

      // Navigate to questionnaire
      onNavigate(rolePath);
    } catch (error) {
      console.error('❌ Failed to save role:', error);
      alert('Failed to save role. Please try again.');
    } finally {
      setIsSavingRole(false);
    }
  };

  const calculateCompletion = (profileData: ProfileData | null) => {
    let percentage = 0;
    
    // Base: Account created = 20%
    percentage += 20;
    
    // Has name = 20%
    if (profileData?.full_name) {
      percentage += 20;
    }
    
    // Has role selected = 30%
    if (profileData?.role) {
      percentage += 30;
    }
    
    // Has organization = 15%
    if (profileData?.org_name) {
      percentage += 15;
    }
    
    // Profile marked as completed = 15%
    if (profileData?.profile_completed) {
      percentage += 15;
    }
    
    setCompletionPercentage(percentage);
  };

  // If loading, don't show anything
  if (isLoading) {
    return null;
  }

  // If profile is 100% complete, don't show banner
  if (completionPercentage >= 100) {
    return null;
  }

  // If no profile exists or role is not selected, show banner
  const needsRoleSelection = !profile || !profile.role;
  const needsQuestionnaire = profile?.role && !profile?.profile_completed;

  // Define role options
  const roleOptions = [
    {
      id: 'PROJECT_DEVELOPER',
      title: 'Project Developer',
      description: 'Generate and monetize carbon credits',
      icon: Leaf,
      path: 'onboardingV2ProjectDeveloper'
    },
    {
      id: 'TECHNOLOGY_DEVELOPER',
      title: 'Technology Developer',
      description: 'Build tools and infrastructure',
      icon: Code,
      path: 'onboardingV2TechDeveloper'
    },
    {
      id: 'CREDIT_BUYER',
      title: 'Credit Buyer',
      description: 'Purchase verified carbon credits',
      icon: ShoppingCart,
      path: 'onboardingV2CreditBuyer'
    },
    {
      id: 'PARTNER',
      title: 'Partner',
      description: 'Collaborate on ecosystem growth',
      icon: Handshake,
      path: 'onboardingV2Partner'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          {/* Header Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Complete Your Profile
            </h3>
            <p className="text-sm text-gray-700">
              {needsRoleSelection 
                ? 'Select your role to unlock personalized features and recommendations.'
                : 'Complete your questionnaire to access all platform features.'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 font-medium">Profile Completion</span>
              <span className="text-blue-600 font-bold">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          {/* Role Selection Cards (shown if no role selected) */}
          {needsRoleSelection && (
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4">Select Your Role</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id, role.path)}
                      disabled={isSavingRole}
                      whileHover={{ scale: isSavingRole ? 1 : 1.02 }}
                      whileTap={{ scale: isSavingRole ? 1 : 0.98 }}
                      className={`flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left group ${isSavingRole ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                        <Icon className="w-5 h-5 text-slate-900 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {role.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {role.description}
                        </p>
                      </div>
                      {isSavingRole ? (
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Questionnaire CTA (shown if role selected but not completed) */}
          {needsQuestionnaire && (
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-1">
                    Complete Your {profile.role.replace(/_/g, ' ')} Questionnaire
                  </h5>
                  <p className="text-sm text-gray-600">
                    Just a few more questions to personalize your dashboard
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onNavigate('onboardingV2')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Checklist */}
          <div className="mt-6 pt-6 border-t border-blue-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">Account created</span>
              </div>
              {profile?.full_name && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Name added</span>
                </div>
              )}
              {profile?.role ? (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Role selected: {profile.role.replace(/_/g, ' ')}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  <span className="text-gray-700 font-medium">Select your role</span>
                </div>
              )}
              {profile?.profile_completed ? (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Questionnaire completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  <span className="text-gray-700 font-medium">Complete questionnaire</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

