import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Alert, AlertDescription } from '../../ui/alert';
import { Loader2, ShoppingCart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EmailVerificationSuccess } from '../EmailVerificationSuccess';
import { 
  creditBuyerSchema, 
  CreditBuyerFormData,
  creditBuyerLabels 
} from '../../../schemas/onboarding/creditBuyer';
import { 
  saveUserRole, 
  saveOnboardingAnswers, 
  generateTasksForRole 
} from '../../../lib/onboardingV2';
import { authHelpers } from '../../../utils/supabase/client';

interface CreditBuyerFormProps {
  onComplete: () => void;
}

export function CreditBuyerForm({ onComplete }: CreditBuyerFormProps) {
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
  } = useForm<CreditBuyerFormData>({
    resolver: zodResolver(creditBuyerSchema),
    defaultValues: {
      intended_use: [],
      preferred_methods: [],
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

  const intendedUse = watch('intended_use') || [];
  const preferredMethods = watch('preferred_methods') || [];

  const toggleIntendedUse = (use: string) => {
    const current = intendedUse;
    const updated = current.includes(use as any)
      ? current.filter(u => u !== use)
      : [...current, use as any];
    setValue('intended_use', updated);
  };

  const togglePreferredMethod = (method: string) => {
    const current = preferredMethods || [];
    const updated = current.includes(method as any)
      ? current.filter(m => m !== method)
      : [...current, method as any];
    setValue('preferred_methods', updated);
  };

  async function onSubmit(data: CreditBuyerFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      let userId: string;
      
      if (existingUser) {
        console.log('✅ Using existing logged-in user:', existingUser.email);
        userId = existingUser.id;
      } else {
        console.log('🚀 Starting signup with:', { email: data.email, name: data.contact_name });
        
        // 1. Create account
        const { data: signUpData, error: signUpError } = await authHelpers.signUp(
          data.email,
          data.password,
          data.contact_name
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

      // 2. Save role
      await saveUserRole(
        userId,
        'CREDIT_BUYER',
        data.contact_name,
        data.org_name
      );

      // 3. Save answers
      await saveOnboardingAnswers(
        userId,
        'CREDIT_BUYER',
        data
      );

      // 4. Generate tasks
      await generateTasksForRole(userId, 'CREDIT_BUYER');

      // 5. Handle completion based on user type
      if (existingUser) {
        console.log('✅ Existing user onboarding complete! Redirecting to dashboard');
        onComplete();
      } else {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Credit Buyer Registration
          </h1>
          <p className="text-gray-600">
            Purchase verified removals with traceable MRV
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <span>Organization & Needs</span>
            <span>Contact & Account</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Organization & Needs */}
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
                  {/* Organization Type */}
                  <div>
                    <Label htmlFor="org_type">Organization Type *</Label>
                    <select
                      id="org_type"
                      {...register('org_type')}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="">Select organization type...</option>
                      {Object.entries(creditBuyerLabels.org_type).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {errors.org_type && (
                      <p className="text-sm text-red-600 mt-1">{errors.org_type.message}</p>
                    )}
                  </div>

                  {/* Organization Name */}
                  <div>
                    <Label htmlFor="org_name">Organization Name *</Label>
                    <Input
                      id="org_name"
                      {...register('org_name')}
                      placeholder="Your Company Inc."
                    />
                    {errors.org_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.org_name.message}</p>
                    )}
                  </div>

                  {/* Intended Use */}
                  <div>
                    <Label>Intended Use *</Label>
                    <p className="text-sm text-gray-600 mb-2">Select all that apply</p>
                    <div className="space-y-2">
                      {Object.entries(creditBuyerLabels.intended_use).map(([value, label]) => (
                        <div key={value} className="flex items-center">
                          <Checkbox
                            id={`use-${value}`}
                            checked={intendedUse.includes(value as any)}
                            onCheckedChange={() => toggleIntendedUse(value)}
                          />
                          <label htmlFor={`use-${value}`} className="ml-2 text-sm cursor-pointer">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.intended_use && (
                      <p className="text-sm text-red-600 mt-1">{errors.intended_use.message}</p>
                    )}
                  </div>

                  {/* Volume Range */}
                  <div>
                    <Label htmlFor="volume_range">Annual Volume Range *</Label>
                    <select
                      id="volume_range"
                      {...register('volume_range')}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="">Select volume range...</option>
                      {Object.entries(creditBuyerLabels.volume_range).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {errors.volume_range && (
                      <p className="text-sm text-red-600 mt-1">{errors.volume_range.message}</p>
                    )}
                  </div>

                  {/* Preferred Methods */}
                  <div>
                    <Label>Preferred Removal Methods (Optional)</Label>
                    <p className="text-sm text-gray-600 mb-2">Select all that interest you</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(creditBuyerLabels.preferred_methods).map(([value, label]) => (
                        <div key={value} className="flex items-center">
                          <Checkbox
                            id={`method-${value}`}
                            checked={preferredMethods?.includes(value as any)}
                            onCheckedChange={() => togglePreferredMethod(value)}
                          />
                          <label htmlFor={`method-${value}`} className="ml-2 text-sm cursor-pointer">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Tolerance */}
                  <div>
                    <Label htmlFor="risk_tolerance">Durability Preference *</Label>
                    <select
                      id="risk_tolerance"
                      {...register('risk_tolerance')}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="">Select preference...</option>
                      {Object.entries(creditBuyerLabels.risk_tolerance).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {errors.risk_tolerance && (
                      <p className="text-sm text-red-600 mt-1">{errors.risk_tolerance.message}</p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
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
                      placeholder="Jane Smith"
                    />
                    {errors.contact_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.contact_name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="jane@company.com"
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
                      <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        Terms of Service
                      </a>
                      {' '}and{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
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

