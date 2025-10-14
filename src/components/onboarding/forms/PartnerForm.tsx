import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Alert, AlertDescription } from '../../ui/alert';
import { Loader2, Handshake, ArrowRight, CheckCircle2 } from 'lucide-react';
import { 
  partnerQuestionnaireSchema, 
  PartnerQuestionnaireData,
  partnerLabels 
} from '../../../schemas/onboarding/partnerQuestionnaire';
import { 
  saveUserRole, 
  saveOnboardingAnswers, 
  generateTasksForRole,
  markQuestionnaireComplete
} from '../../../lib/onboardingV2';
import { authHelpers } from '../../../utils/supabase/client';

interface PartnerFormProps {
  onComplete: () => void;
}

export function PartnerForm({ onComplete }: PartnerFormProps) {
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
  } = useForm<PartnerQuestionnaireData>({
    resolver: zodResolver(partnerQuestionnaireSchema),
    defaultValues: {
      goals: []
    }
  });

  // Check if user is logged in
  React.useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await authHelpers.getCurrentUser();
        if (currentUser) {
          console.log('✅ User logged in:', currentUser.email);
          setExistingUser({ id: currentUser.id, email: currentUser.email || '' });
        } else {
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

  const goals = watch('goals') || [];

  const toggleGoal = (goal: string) => {
    const current = goals;
    const updated = current.includes(goal as any)
      ? current.filter(g => g !== goal)
      : [...current, goal as any];
    setValue('goals', updated);
  };

  async function onSubmit(data: PartnerQuestionnaireData) {
    console.log('🎯 Questionnaire submitted!', { data });
    setIsSubmitting(true);
    setError(null);

    try {
      if (!existingUser) {
        throw new Error('You must be logged in to complete the questionnaire');
      }

      const userId = existingUser.id;
      console.log('✅ Saving questionnaire for user:', existingUser.email);

      // Save role
      const roleResult = await saveUserRole(
        userId,
        'PARTNER',
        existingUser.email?.split('@')[0] || 'User',
        data.org_name
      );
      if (!roleResult.success) console.warn('Failed to save role:', roleResult.error);

      // Save answers
      const answersResult = await saveOnboardingAnswers(userId, 'PARTNER', data);
      if (!answersResult.success) console.warn('Failed to save answers:', answersResult.error);

      // Generate tasks
      const tasksResult = await generateTasksForRole(userId, 'PARTNER');
      if (!tasksResult.success) console.warn('Failed to generate tasks:', tasksResult.error);

      // Mark questionnaire complete
      const completeResult = await markQuestionnaireComplete(userId, 'PARTNER');
      if (!completeResult.success) console.warn('Failed to mark questionnaire complete:', completeResult.error);
      else console.log('✅ Questionnaire marked as complete!');

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
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
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
            <Handshake className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Partner Questionnaire
          </h1>
          <p className="text-gray-600">
            Let's explore collaboration opportunities
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <span>Organization & Goals</span>
            <span>Details</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Organization & Goals */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Organization & Partnership Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Partner Type */}
                  <div>
                    <Label>Organization Type *</Label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {Object.entries(partnerLabels.partner_type).map(([value, label]) => (
                        <label key={value} className="relative">
                          <input
                            type="radio"
                            value={value}
                            {...register('partner_type')}
                            className="peer sr-only"
                          />
                          <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-emerald-300 peer-checked:border-emerald-600 peer-checked:bg-emerald-50 transition-all">
                            <p className="text-sm font-medium text-gray-900">{label}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.partner_type && (
                      <p className="text-sm text-red-600 mt-1">{errors.partner_type.message}</p>
                    )}
                  </div>

                  {/* Organization Name */}
                  <div>
                    <Label htmlFor="org_name">Organization Name *</Label>
                    <Input
                      id="org_name"
                      {...register('org_name')}
                      placeholder="Your Organization"
                      className="mt-1"
                    />
                    {errors.org_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.org_name.message}</p>
                    )}
                  </div>

                  {/* Partnership Goals */}
                  <div>
                    <Label>Partnership Goals * (Select all that apply)</Label>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      {Object.entries(partnerLabels.goals).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleGoal(value)}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            goals.includes(value as any)
                              ? 'border-emerald-600 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <p className="text-sm font-medium text-gray-900">{label}</p>
                        </button>
                      ))}
                    </div>
                    {errors.goals && (
                      <p className="text-sm text-red-600 mt-1">{errors.goals.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                    >
                      Next
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pilot Interest */}
                  <div>
                    <Label htmlFor="pilot_interest">Pilot Project Interest (Optional)</Label>
                    <Textarea
                      id="pilot_interest"
                      {...register('pilot_interest')}
                      placeholder="Describe any specific pilot projects or collaborations you'd like to explore..."
                      className="mt-1 h-24"
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max 500 characters
                    </p>
                  </div>

                  {/* Resources Available */}
                  <div>
                    <Label htmlFor="resources_available">Resources Available (Optional)</Label>
                    <Textarea
                      id="resources_available"
                      {...register('resources_available')}
                      placeholder="What resources (funding, expertise, network, etc.) can you contribute to the partnership?"
                      className="mt-1 h-24"
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max 500 characters
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="outline"
                      className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Completing...
                        </>
                      ) : (
                        'Complete Questionnaire'
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
