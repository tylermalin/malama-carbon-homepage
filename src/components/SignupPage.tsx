/**
 * Simple Signup Page
 * Quick account creation with just the essentials
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Leaf, CheckCircle2, AlertCircle } from 'lucide-react';
import { authHelpers } from '../utils/supabase/client';
import { supabase } from '../lib/supabaseClient';

// Simple signup schema - just the essentials
const signupSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  accept_terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      accept_terms: false
    }
  });

  const acceptTerms = watch('accept_terms');

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('🚀 Creating account...', { email: data.email, name: data.full_name });

      // Create user account
      const { data: signUpData, error: signUpError } = await authHelpers.signUp(
        data.email,
        data.password
      );

      if (signUpError) {
        console.error('❌ Signup error:', signUpError);
        
        // Handle specific error cases
        if (signUpError.message?.includes('already registered')) {
          throw new Error('This email is already registered. Try signing in instead.');
        } else if (signUpError.message?.includes('invalid')) {
          throw new Error('Please enter a valid email address.');
        } else if (signUpError.message?.includes('rate limit')) {
          throw new Error('Too many signup attempts. Please try again in a few moments.');
        } else {
          throw new Error(signUpError.message || 'Failed to create account');
        }
      }

      if (!signUpData?.user) {
        throw new Error('Failed to create account. Please try again.');
      }

      console.log('✅ Account created:', signUpData.user.id);

      // Create basic profile (no role yet - that's done later in dashboard)
      if (supabase) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: signUpData.user.id,
            full_name: data.full_name,
            role: null, // Will be set later when user completes profile
            org_name: null,
            created_at: new Date().toISOString()
          });

        if (profileError) {
          console.warn('⚠️ Profile creation failed (non-critical):', profileError);
          // Don't fail the signup - profile can be created later
        } else {
          console.log('✅ Basic profile created');
        }
      }

      setUserEmail(data.email);
      setSuccess(true);

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        onNavigate('dashboard');
      }, 3000);

    } catch (err: any) {
      console.error('❌ Signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Account Created Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Welcome to Mālama Labs! Please check your email to verify your account.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    <strong>Verification email sent to:</strong><br />
                    {userEmail}
                  </p>
                  <p className="text-xs text-blue-700 mt-2">
                    Check your spam folder if you don't see it within a few minutes.
                  </p>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Redirecting to your dashboard...
                </p>
                <Button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Go to Dashboard Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Signup form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-12 px-4">
      <div className="max-w-md mx-auto">
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
            Join Mālama Labs
          </h1>
          <p className="text-gray-600">
            Create your account and start your carbon removal journey
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Full Name */}
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    {...register('full_name')}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.full_name && (
                    <p className="text-sm text-red-600 mt-1">{errors.full_name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="you@example.com"
                    disabled={isSubmitting}
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
                    placeholder="Create a secure password (8+ characters)"
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="accept_terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setValue('accept_terms', checked as boolean)}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="accept_terms" className="text-sm text-gray-700 leading-tight cursor-pointer">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => window.open('/terms', '_blank')}
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      onClick={() => window.open('/privacy', '_blank')}
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>
                {errors.accept_terms && (
                  <p className="text-sm text-red-600 mt-1">{errors.accept_terms.message}</p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <CheckCircle2 className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                {/* Sign In Link */}
                <div className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('signin')}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Verify your email address</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Complete your profile by selecting your role</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Start creating projects or browsing carbon credits</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

