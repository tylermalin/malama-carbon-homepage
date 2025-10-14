/**
 * Questionnaire To-Do Card
 * Shows pending questionnaire tasks after role selection
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { CheckCircle2, Circle, FileText, ArrowRight, Leaf, Code, ShoppingCart, Handshake } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface QuestionnaireTodoCardProps {
  userId: string;
  onNavigate: (page: string) => void;
}

interface ProfileData {
  role: string | null;
  profile_completed: boolean | null;
}

export function QuestionnaireTodoCard({ userId, onNavigate }: QuestionnaireTodoCardProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        .select('role, profile_completed')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.log('No profile found:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show if no role selected or already completed
  if (isLoading || !profile?.role || profile?.profile_completed) {
    return null;
  }

  // Map roles to their questionnaire paths
  const rolePathMap: Record<string, { path: string; icon: any; title: string }> = {
    'PROJECT_DEVELOPER': {
      path: 'onboardingV2ProjectDeveloper',
      icon: Leaf,
      title: 'Project Developer'
    },
    'TECHNOLOGY_DEVELOPER': {
      path: 'onboardingV2TechDeveloper',
      icon: Code,
      title: 'Technology Developer'
    },
    'CREDIT_BUYER': {
      path: 'onboardingV2CreditBuyer',
      icon: ShoppingCart,
      title: 'Credit Buyer'
    },
    'PARTNER': {
      path: 'onboardingV2Partner',
      icon: Handshake,
      title: 'Partner'
    }
  };

  const roleInfo = rolePathMap[profile.role] || {
    path: 'onboardingV2',
    icon: FileText,
    title: profile.role.replace(/_/g, ' ')
  };

  const Icon = roleInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <FileText className="w-5 h-5" />
            Complete Your Questionnaire
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Role Badge */}
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-orange-200">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Your Role</p>
              <p className="font-semibold text-gray-900">{roleInfo.title}</p>
            </div>
          </div>

          {/* To-Do Checklist */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Role Selected</p>
                <p className="text-sm text-gray-600">You've chosen {roleInfo.title}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Complete Questionnaire</p>
                <p className="text-sm text-gray-600">Answer a few questions to personalize your experience</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Unlock Full Access</p>
                <p className="text-sm text-gray-600">Access all platform features and start creating</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 font-medium">Onboarding Progress</span>
              <span className="text-orange-600 font-bold">50%</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => onNavigate(roleInfo.path)}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
          >
            Complete Questionnaire
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-center text-gray-500">
            Takes about 2-3 minutes
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

