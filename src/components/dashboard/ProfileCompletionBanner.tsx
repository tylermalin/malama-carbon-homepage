/**
 * Profile Completion Banner
 * Shows profile completion status and prompts users to complete their profile
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { AlertCircle, CheckCircle2, ArrowRight, User, Briefcase, FileText } from 'lucide-react';
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
  const needsProfile = !profile || !profile.role;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            {/* Left side: Icon and content */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                {needsProfile ? (
                  <AlertCircle className="w-6 h-6 text-white" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {needsProfile ? 'Complete Your Profile' : 'Finish Setting Up Your Account'}
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  {needsProfile 
                    ? 'Tell us about yourself to unlock all features and get personalized recommendations.'
                    : 'Add a few more details to access all platform features and start your projects.'}
                </p>
                
                {/* Progress bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">
                      Profile Completion
                    </span>
                    <span className="text-blue-600 font-bold">
                      {completionPercentage}%
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
                
                {/* Checklist */}
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
                  {!profile?.role && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      <span className="text-gray-700 font-medium">Select your role (Project Developer, Credit Buyer, etc.)</span>
                    </div>
                  )}
                  {profile?.role && !profile?.org_name && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">Role selected: {profile.role.replace(/_/g, ' ')}</span>
                    </div>
                  )}
                  {!profile?.profile_completed && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      <span className="text-gray-700 font-medium">Complete questionnaire</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right side: Action button */}
            <div className="flex-shrink-0">
              <Button
                onClick={() => onNavigate('onboardingV2')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {needsProfile ? 'Get Started' : 'Continue Setup'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

