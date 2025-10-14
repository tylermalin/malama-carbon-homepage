import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Checkbox } from '../../ui/checkbox';
import { Alert, AlertDescription } from '../../ui/alert';
import { Loader2, Code, ArrowRight, CheckCircle2 } from 'lucide-react';
import { 
  technologyDeveloperSchema, 
  TechnologyDeveloperFormData,
  technologyDeveloperLabels 
} from '../../../schemas/onboarding/technologyDeveloper';
import { 
  saveUserRole, 
  saveOnboardingAnswers, 
  generateTasksForRole 
} from '../../../lib/onboardingV2';
import { authHelpers } from '../../../utils/supabase/client';

interface TechnologyDeveloperFormProps {
  onComplete: () => void;
}

export function TechnologyDeveloperForm({ onComplete }: TechnologyDeveloperFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<TechnologyDeveloperFormData>({
    resolver: zodResolver(technologyDeveloperSchema),
    defaultValues: {
      integration_types: [],
      stack: []
    }
  });

  const integrationTypes = watch('integration_types') || [];

  const toggleIntegrationType = (type: string) => {
    const current = integrationTypes;
    const updated = current.includes(type as any)
      ? current.filter(t => t !== type)
      : [...current, type as any];
    setValue('integration_types', updated);
  };

  async function onSubmit(data: TechnologyDeveloperFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create account
      const signUpResult = await authHelpers.signUp(
        data.email,
        data.password,
        data.project_name
      );

      if (!signUpResult.success || !signUpResult.user) {
        throw new Error(signUpResult.error || 'Failed to create account');
      }

      const userId = signUpResult.user.id;

      // 2. Save role
      await saveUserRole(
        userId,
        'TECHNOLOGY_DEVELOPER',
        data.project_name,
        data.org_name
      );

      // 3. Save answers
      await saveOnboardingAnswers(
        userId,
        'TECHNOLOGY_DEVELOPER',
        data
      );

      // 4. Generate tasks
      await generateTasksForRole(userId, 'TECHNOLOGY_DEVELOPER');

      // 5. Complete
      console.log('✅ Technology Developer onboarding complete!');
      onComplete();
    } catch (err) {
      console.error('Onboarding error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Technology Developer Registration
          </h1>
          <p className="text-gray-600">
            Build with Mālama APIs and smart contracts
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <span>Project Details</span>
            <span>Account</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Project Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tell us about your project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Use Case */}
                  <div>
                    <Label htmlFor="use_case">Primary Use Case *</Label>
                    <select
                      id="use_case"
                      {...register('use_case')}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select use case...</option>
                      {Object.entries(technologyDeveloperLabels.use_case).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {errors.use_case && (
                      <p className="text-sm text-red-600 mt-1">{errors.use_case.message}</p>
                    )}
                  </div>

                  {/* Integration Types */}
                  <div>
                    <Label>Integration Types *</Label>
                    <p className="text-sm text-gray-600 mb-2">Select all that apply</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(technologyDeveloperLabels.integration_types).map(([value, label]) => (
                        <div key={value} className="flex items-center">
                          <Checkbox
                            id={`integration-${value}`}
                            checked={integrationTypes.includes(value as any)}
                            onCheckedChange={() => toggleIntegrationType(value)}
                          />
                          <label htmlFor={`integration-${value}`} className="ml-2 text-sm cursor-pointer">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.integration_types && (
                      <p className="text-sm text-red-600 mt-1">{errors.integration_types.message}</p>
                    )}
                  </div>

                  {/* Project Name */}
                  <div>
                    <Label htmlFor="project_name">Project Name *</Label>
                    <Input
                      id="project_name"
                      {...register('project_name')}
                      placeholder="My Carbon Project"
                    />
                    {errors.project_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.project_name.message}</p>
                    )}
                  </div>

                  {/* Organization Name */}
                  <div>
                    <Label htmlFor="org_name">Organization Name (Optional)</Label>
                    <Input
                      id="org_name"
                      {...register('org_name')}
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Environment */}
                  <div>
                    <Label htmlFor="env">Preferred Environment *</Label>
                    <select
                      id="env"
                      {...register('env')}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select environment...</option>
                      {Object.entries(technologyDeveloperLabels.env).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {errors.env && (
                      <p className="text-sm text-red-600 mt-1">{errors.env.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Project Description (Optional)</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Tell us more about what you're building..."
                      rows={4}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Account */}
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
                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="developer@example.com"
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
                    <Checkbox
                      id="accept_terms"
                      {...register('accept_terms')}
                    />
                    <label htmlFor="accept_terms" className="ml-2 text-sm">
                      I agree to the{' '}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>
                      {' '}and{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600"
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

