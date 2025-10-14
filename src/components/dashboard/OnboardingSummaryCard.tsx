import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  User, 
  Building2, 
  Mail, 
  Calendar,
  MapPin,
  FileText,
  Edit,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface OnboardingSummaryCardProps {
  userId: string;
}

interface ProfileData {
  full_name?: string;
  org_name?: string;
  role?: string;
  created_at?: string;
}

interface OnboardingAnswer {
  question_key: string;
  answer: any;
  role: string;
}

export function OnboardingSummaryCard({ userId }: OnboardingSummaryCardProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [answers, setAnswers] = useState<OnboardingAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadOnboardingData();
  }, [userId]);

  async function loadOnboardingData() {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    try {
      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Load onboarding answers
      const { data: answersData } = await supabase
        .from('onboarding_answers')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (answersData) {
        setAnswers(answersData);
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const formatRoleName = (role?: string) => {
    if (!role) return 'User';
    return role
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'PROJECT_DEVELOPER':
        return 'bg-emerald-500';
      case 'TECHNOLOGY_DEVELOPER':
        return 'bg-blue-500';
      case 'CREDIT_BUYER':
        return 'bg-purple-500';
      case 'PARTNER':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatQuestionKey = (key: string) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatAnswer = (answer: any) => {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    if (typeof answer === 'object' && answer !== null) {
      return JSON.stringify(answer, null, 2);
    }
    if (typeof answer === 'boolean') {
      return answer ? 'Yes' : 'No';
    }
    return String(answer);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Your Profile
            </CardTitle>
            <Badge className={`${getRoleBadgeColor(profile.role)} text-white`}>
              {formatRoleName(profile.role)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Profile Summary */}
          <div className="grid md:grid-cols-2 gap-4">
            {profile.full_name && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{profile.full_name}</p>
                </div>
              </div>
            )}

            {profile.org_name && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-medium text-foreground">{profile.org_name}</p>
                </div>
              </div>
            )}

            {profile.created_at && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium text-foreground">
                    {new Date(profile.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Onboarding Answers */}
          {answers.length > 0 && (
            <div>
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full justify-between hover:bg-primary/5 transition-colors"
              >
                <span className="flex items-center gap-2 font-semibold text-primary">
                  <FileText className="w-4 h-4" />
                  Survey Responses ({answers.length})
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-3"
                >
                  {answers.map((answer, index) => {
                    // Skip internal fields like password, email, etc.
                    if (
                      answer.question_key.includes('password') ||
                      answer.question_key.includes('email') ||
                      answer.question_key.includes('accept_terms')
                    ) {
                      return null;
                    }

                    return (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                      >
                        <p className="text-sm font-medium text-primary mb-1">
                          {formatQuestionKey(answer.question_key)}
                        </p>
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {formatAnswer(answer.answer)}
                        </p>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          )}

          {/* Edit Profile Button */}
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // Navigate to profile edit (can be enhanced later)
                console.log('Edit profile');
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

