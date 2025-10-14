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
import { Loader2, Handshake, ArrowRight, CheckCircle2 } from 'lucide-react';
import { 
  partnerSchema, 
  PartnerFormData,
  partnerLabels 
} from '../../../schemas/onboarding/partner';
import { 
  saveUserRole, 
  saveOnboardingAnswers, 
  generateTasksForRole 
} from '../../../lib/onboardingV2';
import { authHelpers } from '../../../utils/supabase/client';

interface PartnerFormProps {
  onComplete: () => void;
}

export function PartnerForm({ onComplete }: PartnerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      goals: [],
      accept_terms: false
    }
  });

  const goals = watch('goals') || [];

  const toggleGoal = (goal: string) => {
    const current = goals;
    const updated = current.includes(goal as any)
      ? current.filter(g => g !== goal)
      : [...current, goal as any];
    setValue('goals', updated);
  };

  async function onSubmit(data: PartnerFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create account
      const signUpResult = await authHelpers.signUp(
        data.email,
        data.password,
        data.contact_name
      );

      if (!signUpResult.success || !signUpResult.user) {
        throw new Error(signUpResult.error || 'Failed to create account');
      }

      const userId = signUpResult.user.id;

      // 2. Save role
      await saveUserRole(
        userId,
        'PARTNER',
        data.contact_name,
        data.org_name
      );

      // 3. Save answers
      await saveOnboardingAnswers(
        userId,
        'PARTNER',
        data
      );

      // 4. Generate tasks
      await generateTasksForRole(userId, 'PARTNER');

      // 5. Complete
      console.log('✅ Partner onboarding complete!');
      onComplete();
    } catch (err) {
      console.error('Onboarding error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 py-12">
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
            Partner Registration
          </h1>
          <p className="text-gray-600">
            Scale carbon removal with joint programs
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-600' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <span>Partnership Goals</span>
            <span>Contact & Account</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Partnership Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tell us about your organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Partner Type */}
                  <div>
                    <Label htmlFor="partner_type">Organization Type *</Label>
                    <select
                      id="partner_type"
                      {...register('partner_type')}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                    >
                      <option value="">Select type...</option>
                      {Object.entries(partnerLabels.partner_type).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {errors.partner_type && (
                      <p className="text-sm text-red-600 mt-1">{errors.partner_type.message}</p>
                    )}
                  </div>

                  {/* Goals */}
                  <div>
                    <Label>Partnership Goals *</Label>
                    <p className="text-sm text-gray-600 mb-2">Select all that apply</p>
                    <div className="space-y-2">
                      {Object.entries(partnerLabels.goals).map(([value, label]) => (
                        <div key={value} className="flex items-center">
                          <Checkbox
                            id={`goal-${value}`}
                            checked={goals.includes(value as any)}
                            onCheckedChange={() => toggleGoal(value)}
                          />
                          <label htmlFor={`goal-${value}`} className="ml-2 text-sm cursor-pointer">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.goals && (
                      <p className="text-sm text-red-600 mt-1">{errors.goals.message}</p>
                    )}
                  </div>

                  {/* Pilot Interest */}
                  <div>
                    <Label htmlFor="pilot_interest">Pilot Project Interest (Optional)</Label>
                    <Textarea
                      id="pilot_interest"
                      {...register('pilot_interest')}
                      placeholder="Describe any specific pilot projects you'd like to explore..."
                      rows={3}
                    />
                  </div>

                  {/* Resources Available */}
                  <div>
                    <Label htmlFor="resources_available">Resources Available (Optional)</Label>
                    <Textarea
                      id="resources_available"
                      {...register('resources_available')}
                      placeholder="What resources can you contribute to the partnership?"
                      rows={3}
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Contact & Account */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contact Name */}
                  <div>
                    <Label htmlFor="contact_name">Contact Name *</Label>
                    <Input
                      id="contact_name"
                      {...register('contact_name')}
                      placeholder="Your Name"
                    />
                    {errors.contact_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.contact_name.message}</p>
                    )}
                  </div>

                  {/* Organization Name */}
                  <div>
                    <Label htmlFor="org_name">Organization Name *</Label>
                    <Input
                      id="org_name"
                      {...register('org_name')}
                      placeholder="Your Organization"
                    />
                    {errors.org_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.org_name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="contact@organization.org"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register('password')}
                      placeholder="Min. 8 characters"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Password Confirm */}
                  <div>
                    <Label htmlFor="password_confirm">Confirm Password *</Label>
                    <Input
                      id="password_confirm"
                      type="password"
                      {...register('password_confirm')}
                      placeholder="Re-enter password"
                    />
                    {errors.password_confirm && (
                      <p className="text-sm text-red-600 mt-1">{errors.password_confirm.message}</p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start">
                    <Controller
                      name="accept_terms"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="accept_terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <label htmlFor="accept_terms" className="ml-2 text-sm">
                      I agree to the{' '}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                        Terms of Service
                      </a>
                      {' '}and{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.accept_terms && (
                    <p className="text-sm text-red-600">{errors.accept_terms.message}</p>
                  )}

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
                      className="flex-1 bg-slate-900 text-white hover:bg-slate-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        'Complete Registration'
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

