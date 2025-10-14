import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Checkbox } from '../../ui/checkbox';
import { Alert, AlertDescription } from '../../ui/alert';
import { Loader2, Leaf, ArrowRight, CheckCircle2 } from 'lucide-react';
import { 
  projectDeveloperQuestionnaireSchema, 
  ProjectDeveloperQuestionnaireData,
  projectDeveloperLabels 
} from '../../../schemas/onboarding/projectDeveloperQuestionnaire';
import { 
  saveUserRole, 
  saveOnboardingAnswers, 
  generateTasksForRole,
  markQuestionnaireComplete
} from '../../../lib/onboardingV2';
import { authHelpers } from '../../../utils/supabase/client';

interface ProjectDeveloperFormProps {
  onComplete: () => void;
}

export function ProjectDeveloperForm({ onComplete }: ProjectDeveloperFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [existingUser, setExistingUser] = useState<{ id: string; email: string } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<ProjectDeveloperQuestionnaireData>({
    resolver: zodResolver(projectDeveloperQuestionnaireSchema),
    defaultValues: {
      biomass_types: [],
      interests: [],
      locations: []
    }
  });

  // Verify user is logged in on mount
  React.useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await authHelpers.getCurrentUser();
        if (currentUser) {
          console.log('✅ User logged in:', currentUser.email);
          setExistingUser({ id: currentUser.id, email: currentUser.email || '' });
        } else {
          // User not logged in - shouldn't happen, but handle gracefully
          setError('Please sign in to complete the questionnaire');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Please sign in to continue');
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  const biomassTypes = watch('biomass_types') || [];
  const interests = watch('interests') || [];

  const toggleBiomassType = (type: string) => {
    const current = biomassTypes;
    const updated = current.includes(type as any)
      ? current.filter(t => t !== type)
      : [...current, type as any];
    setValue('biomass_types', updated);
  };

  const toggleInterest = (interest: string) => {
    const current = interests;
    const updated = current.includes(interest as any)
      ? current.filter(i => i !== interest)
      : [...current, interest as any];
    setValue('interests', updated);
  };

  async function onSubmit(data: ProjectDeveloperQuestionnaireData) {
    console.log('🎯 Questionnaire submitted!', { data });
    setIsSubmitting(true);
    setError(null);

    try {
      // User must be logged in to access this form
      if (!existingUser) {
        throw new Error('You must be logged in to complete the questionnaire');
      }

      const userId = existingUser.id;
      console.log('✅ Saving questionnaire for user:', existingUser.email);

      // 1. Save role to profile
      const roleResult = await saveUserRole(
        userId,
        'PROJECT_DEVELOPER',
        existingUser.email.split('@')[0], // Use email prefix as fallback name
        data.business_name
      );

      if (!roleResult.success) {
        console.warn('Failed to save role:', roleResult.error);
      }

      // 2. Save onboarding answers
      const answersResult = await saveOnboardingAnswers(
        userId,
        'PROJECT_DEVELOPER',
        data
      );

      if (!answersResult.success) {
        console.warn('Failed to save answers:', answersResult.error);
      }

      // 3. Generate tasks for this role
      const tasksResult = await generateTasksForRole(userId, 'PROJECT_DEVELOPER');

      if (!tasksResult.success) {
        console.warn('Failed to generate tasks:', tasksResult.error);
      }

      // 4. Mark questionnaire as completed
      const completeResult = await markQuestionnaireComplete(userId, 'PROJECT_DEVELOPER');

      if (!completeResult.success) {
        console.warn('Failed to mark questionnaire complete:', completeResult.error);
      } else {
        console.log('✅ Questionnaire marked as complete!');
      }

      // 5. Complete! Redirect to dashboard
      console.log('✅ Questionnaire complete! Redirecting to dashboard');
      console.log('📊 Role added to profile. Dashboard will refresh to show updates.');
      onComplete();
      setIsSubmitting(false);
    } catch (err) {
      console.error('Onboarding error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      setIsSubmitting(false);
    }
  }

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Project Developer Registration
          </h1>
          <p className="text-gray-600">
            Generate and monetize carbon credits via Mālama's MRV
          </p>
        </motion.div>

        {/* Progress Indicator */}
        {!existingUser && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : '2'}
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
              <span>Project Info</span>
              <span>Details</span>
              <span>Account</span>
            </div>
          </div>
        )}
        
        {existingUser && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 max-w-xs mx-auto">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </div>
              <div className={`w-24 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-600 max-w-xs mx-auto">
              <span>Project Info</span>
              <span>Complete</span>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Signed in as {existingUser?.email}
            </p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Project Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tell us about your project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Land Role */}
                  <div>
                    <Label htmlFor="land_role">Your Land Role *</Label>
                    <select
                      id="land_role"
                      {...register('land_role')}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select your role...</option>
                      {Object.entries(projectDeveloperLabels.land_role).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {errors.land_role && (
                      <p className="text-sm text-red-600 mt-1">{errors.land_role.message}</p>
                    )}
                  </div>

                  {/* Biomass Types */}
                  <div>
                    <Label>Available Biomass Types *</Label>
                    <p className="text-sm text-gray-600 mb-2">Select all that apply</p>
                    <div className="space-y-2">
                      {Object.entries(projectDeveloperLabels.biomass_types).map(([value, label]) => (
                        <div key={value} className="flex items-center">
                          <Checkbox
                            id={`biomass-${value}`}
                            checked={biomassTypes.includes(value as any)}
                            onCheckedChange={() => toggleBiomassType(value)}
                          />
                          <label htmlFor={`biomass-${value}`} className="ml-2 text-sm cursor-pointer">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.biomass_types && (
                      <p className="text-sm text-red-600 mt-1">{errors.biomass_types.message}</p>
                    )}
                  </div>

                  {/* Interests */}
                  <div>
                    <Label>Areas of Interest *</Label>
                    <p className="text-sm text-gray-600 mb-2">Select all that apply</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(projectDeveloperLabels.interests).map(([value, label]) => (
                        <div key={value} className="flex items-center">
                          <Checkbox
                            id={`interest-${value}`}
                            checked={interests.includes(value as any)}
                            onCheckedChange={() => toggleInterest(value)}
                          />
                          <label htmlFor={`interest-${value}`} className="ml-2 text-sm cursor-pointer">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="text-sm text-red-600 mt-1">{errors.interests.message}</p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Additional Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Project Details (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Acreage */}
                  <div>
                    <Label htmlFor="acreage">Land Area (acres)</Label>
                    <Input
                      id="acreage"
                      type="number"
                      {...register('acreage', { valueAsNumber: true })}
                      placeholder="e.g., 500"
                    />
                    {errors.acreage && (
                      <p className="text-sm text-red-600 mt-1">{errors.acreage.message}</p>
                    )}
                  </div>

                  {/* Why Now */}
                  <div>
                    <Label htmlFor="why_now">Why are you pursuing this now?</Label>
                    <Textarea
                      id="why_now"
                      {...register('why_now')}
                      placeholder="Tell us about your motivation and timeline..."
                      rows={4}
                    />
                    {errors.why_now && (
                      <p className="text-sm text-red-600 mt-1">{errors.why_now.message}</p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          Complete
                          <CheckCircle2 className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}

