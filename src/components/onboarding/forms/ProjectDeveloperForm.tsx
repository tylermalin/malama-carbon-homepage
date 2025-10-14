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
import { EmailVerificationSuccess } from '../EmailVerificationSuccess';
import { 
  projectDeveloperSchema, 
  ProjectDeveloperFormData,
  projectDeveloperLabels 
} from '../../../schemas/onboarding/projectDeveloper';
import { 
  saveUserRole, 
  saveOnboardingAnswers, 
  generateTasksForRole 
} from '../../../lib/onboardingV2';
import { authHelpers } from '../../../utils/supabase/client';

interface ProjectDeveloperFormProps {
  onComplete: () => void;
}

export function ProjectDeveloperForm({ onComplete }: ProjectDeveloperFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [existingUser, setExistingUser] = useState<{ id: string; email: string } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<ProjectDeveloperFormData>({
    resolver: zodResolver(projectDeveloperSchema),
    defaultValues: {
      biomass_types: [],
      interests: [],
      locations: [],
      accept_terms: false
    }
  });

  // Check if user is already logged in
  React.useEffect(() => {
    async function checkExistingSession() {
      try {
        const currentUser = await authHelpers.getCurrentUser();
        if (currentUser) {
          console.log('✅ User already logged in:', currentUser.email);
          setExistingUser({ id: currentUser.id, email: currentUser.email });
          setUserEmail(currentUser.email);
          // Skip to step 2 (questionnaire) if already logged in
          setStep(2);
        }
      } catch (err) {
        console.log('No existing session');
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkExistingSession();
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

  async function onSubmit(data: ProjectDeveloperFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      let userId: string;
      
      // If user is already logged in, use their existing account
      if (existingUser) {
        console.log('✅ Using existing logged-in user:', existingUser.email);
        userId = existingUser.id;
      } else {
        console.log('🚀 Starting signup with:', { email: data.email, name: data.full_name });
        
        // 1. Create account with Supabase Auth
        const { data: signUpData, error: signUpError } = await authHelpers.signUp(
          data.email,
          data.password,
          data.full_name
        );

        console.log('📋 Sign up result:', { data: signUpData, error: signUpError });

        if (signUpError || !signUpData?.user) {
          console.error('❌ Sign up failed:', signUpError);
          
          // Provide user-friendly error messages
          let errorMsg = 'Failed to create account';
          if (signUpError) {
            const errorStr = signUpError.toLowerCase();
            if (errorStr.includes('rate') || errorStr.includes('too many')) {
              errorMsg = 'Please wait a moment before trying again (rate limit)';
            } else if (errorStr.includes('already registered') || errorStr.includes('already exists')) {
              errorMsg = 'This email is already registered. Please sign in instead.';
            } else if (errorStr.includes('invalid email')) {
              errorMsg = 'Please enter a valid email address';
            } else if (errorStr.includes('password')) {
              errorMsg = 'Password must be at least 6 characters';
            } else {
              errorMsg = signUpError;
            }
          }
          
          throw new Error(errorMsg);
        }

        console.log('✅ Account created, user ID:', signUpData.user.id);
        userId = signUpData.user.id;
        setUserEmail(data.email);
      }

      // 2. Save role to profile
      const roleResult = await saveUserRole(
        userId,
        'PROJECT_DEVELOPER',
        data.full_name,
        data.business_name
      );

      if (!roleResult.success) {
        console.warn('Failed to save role:', roleResult.error);
      }

      // 3. Save onboarding answers
      const answersResult = await saveOnboardingAnswers(
        userId,
        'PROJECT_DEVELOPER',
        data
      );

      if (!answersResult.success) {
        console.warn('Failed to save answers:', answersResult.error);
      }

      // 4. Generate tasks for this role
      const tasksResult = await generateTasksForRole(userId, 'PROJECT_DEVELOPER');

      if (!tasksResult.success) {
        console.warn('Failed to generate tasks:', tasksResult.error);
      }

      // 5. Handle completion based on user type
      if (existingUser) {
        // Existing user - go straight to dashboard
        console.log('✅ Existing user onboarding complete! Redirecting to dashboard');
        onComplete();
      } else {
        // New user - show email verification screen
        console.log('✅ Account created! Showing email verification instructions');
        setShowEmailVerification(true);
      }
      setIsSubmitting(false);
    } catch (err) {
      console.error('Onboarding error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      setIsSubmitting(false);
    }
  }

  // Show email verification success screen
  if (showEmailVerification) {
    return <EmailVerificationSuccess email={userEmail} onContinue={onComplete} />;
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
              Already signed in as {userEmail}
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
                    {existingUser ? (
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
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-1"
                      >
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Account Creation (Skip for logged-in users) */}
          {step === 3 && !existingUser && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      {...register('full_name')}
                      placeholder="John Doe"
                    />
                    {errors.full_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.full_name.message}</p>
                    )}
                  </div>

                  {/* Business Name */}
                  <div>
                    <Label htmlFor="business_name">Business Name (Optional)</Label>
                    <Input
                      id="business_name"
                      {...register('business_name')}
                      placeholder="Your Company LLC"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="john@example.com"
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
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Terms of Service
                      </a>
                      {' '}and{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
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
                      onClick={() => setStep(2)}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="outline"
                      className="flex-1 border-2 border-slate-900 text-slate-900 bg-transparent hover:bg-slate-900 hover:text-white transition-all duration-300"
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

