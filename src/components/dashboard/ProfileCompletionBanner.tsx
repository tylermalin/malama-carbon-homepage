/**
 * Profile Completion Banner - Multi-Role Support
 * Shows profile completion status and prompts users to complete their profile
 * Supports multiple role selection and per-role questionnaires
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { AlertCircle, CheckCircle2, ArrowRight, User, Briefcase, FileText, Leaf, Code, ShoppingCart, Handshake, Loader2, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface ProfileCompletionBannerProps {
  userId: string;
  userEmail: string;
  onNavigate: (page: string) => void;
}

interface ProfileData {
  full_name: string | null;
  org_name: string | null;
  phone: string | null;
  project_description: string | null;
}

interface UserRole {
  id: number;
  role: string;
  questionnaire_completed: boolean;
  added_at: string;
}

export function ProfileCompletionBanner({ userId, userEmail, onNavigate }: ProfileCompletionBannerProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingRole, setIsSavingRole] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    loadProfile();
    loadRoles();
  }, [userId]);

  const loadProfile = async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, org_name, phone, project_description')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.log('No profile found yet:', error);
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

  const loadRoles = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .order('added_at', { ascending: true });

      if (error) throw error;
      
      setUserRoles(data || []);
      calculateCompletion(data || []);
    } catch (error) {
      console.error('Error loading roles:', error);
      setUserRoles([]);
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
      // Insert role into user_roles table
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: roleId,
          questionnaire_completed: false,
          added_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Error saving role:', insertError);
        throw insertError;
      }

      console.log('✅ Role saved:', roleId);

      // Reload roles to update UI
      await loadRoles();

      // Navigate to questionnaire
      onNavigate(rolePath);
    } catch (error) {
      console.error('❌ Failed to save role:', error);
      alert('Failed to save role. Please try again.');
    } finally {
      setIsSavingRole(false);
    }
  };

  const calculateCompletion = (roles: UserRole[]) => {
    let percentage = 0;
    
    // Base: Account created = 20%
    percentage += 20;
    
    // Has name = 20%
    if (profile?.full_name) {
      percentage += 20;
    }
    
    // Has at least one role selected = 30%
    if (roles.length > 0) {
      percentage += 30;
    }
    
    // Has organization = 15%
    if (profile?.org_name) {
      percentage += 15;
    }
    
    // At least one questionnaire completed = 15%
    if (roles.some(r => r.questionnaire_completed)) {
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

  // Define all role options
  const allRoleOptions = [
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

  // Filter out roles already selected
  const selectedRoleIds = userRoles.map(r => r.role);
  const availableRoles = allRoleOptions.filter(role => !selectedRoleIds.includes(role.id));
  
  const hasRoles = userRoles.length > 0;
  const hasAvailableRoles = availableRoles.length > 0;

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
              {!hasRoles 
                ? 'Select your role to unlock personalized features and recommendations.'
                : hasAvailableRoles 
                  ? 'Add more roles or complete your pending questionnaires.'
                  : 'Complete your questionnaires to access all platform features.'}
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

          {/* Initial Role Selection (shown if no roles selected) */}
          {!hasRoles && hasAvailableRoles && (
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4">Select Your Role</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRoles.map((role) => {
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

          {/* Additional Role Selections (shown if at least one role selected) */}
          {hasRoles && hasAvailableRoles && (
            <div className="mb-6">
              <h4 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Additional Role Selections
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                You can add multiple roles to your profile
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableRoles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id, role.path)}
                      disabled={isSavingRole}
                      whileHover={{ scale: isSavingRole ? 1 : 1.02 }}
                      whileTap={{ scale: isSavingRole ? 1 : 0.98 }}
                      className={`flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow transition-all text-left group ${isSavingRole ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                        <Icon className="w-4 h-4 text-slate-900 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm flex-1">
                        {role.title}
                      </span>
                      {isSavingRole ? (
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
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
              {hasRoles ? (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">
                    {userRoles.length} role{userRoles.length > 1 ? 's' : ''} selected
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  <span className="text-gray-700 font-medium">Select your role</span>
                </div>
              )}
              {userRoles.filter(r => r.questionnaire_completed).length > 0 ? (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">
                    {userRoles.filter(r => r.questionnaire_completed).length} questionnaire{userRoles.filter(r => r.questionnaire_completed).length > 1 ? 's' : ''} completed
                  </span>
                </div>
              ) : hasRoles ? (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  <span className="text-gray-700 font-medium">Complete questionnaires</span>
                </div>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

