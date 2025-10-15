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
import { Loader2, Code, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { 
  technologyDeveloperQuestionnaireSchema, 
  TechnologyDeveloperQuestionnaireData,
  technologyDeveloperLabels 
} from '../../../schemas/onboarding/technologyDeveloperQuestionnaire';
import { 
  saveUserRole, 
  saveOnboardingAnswers, 
  generateTasksForRole,
  markQuestionnaireComplete
} from '../../../lib/onboardingV2';
import { authHelpers } from '../../../utils/supabase/client';

interface TechnologyDeveloperFormProps {
  onComplete: () => void;
}

export function TechnologyDeveloperForm({ onComplete }: TechnologyDeveloperFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [existingUser, setExistingUser] = useState<{ id: string; email: string } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techStackInput, setTechStackInput] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<TechnologyDeveloperQuestionnaireData>({
    resolver: zodResolver(technologyDeveloperQuestionnaireSchema),
    defaultValues: {
      integration_types: [],
      stack: []
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

  const integrationTypes = watch('integration_types') || [];
  const selectedUseCase = watch('use_case');
  const selectedEnv = watch('env');

  // Debug logging
  React.useEffect(() => {
    console.log('Selected Use Case:', selectedUseCase);
    console.log('Selected Env:', selectedEnv);
    console.log('Integration Types:', integrationTypes);
  }, [selectedUseCase, selectedEnv, integrationTypes]);

  const toggleIntegrationType = (type: string) => {
    const current = integrationTypes;
    const updated = current.includes(type as any)
      ? current.filter(t => t !== type)
      : [...current, type as any];
    setValue('integration_types', updated);
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !techStack.includes(techStackInput.trim())) {
      const updated = [...techStack, techStackInput.trim()];
      setTechStack(updated);
      setValue('stack', updated);
      setTechStackInput('');
    }
  };

  const removeTechStack = (item: string) => {
    const updated = techStack.filter(t => t !== item);
    setTechStack(updated);
    setValue('stack', updated);
  };

  async function onSubmit(data: TechnologyDeveloperQuestionnaireData) {
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
        'TECHNOLOGY_DEVELOPER',
        existingUser.email?.split('@')[0] || 'User',
        data.org_name || data.project_name
      );
      if (!roleResult.success) console.warn('Failed to save role:', roleResult.error);

      // Save answers
      const answersResult = await saveOnboardingAnswers(userId, 'TECHNOLOGY_DEVELOPER', data);
      if (!answersResult.success) console.warn('Failed to save answers:', answersResult.error);

      // Generate tasks
      const tasksResult = await generateTasksForRole(userId, 'TECHNOLOGY_DEVELOPER');
      if (!tasksResult.success) console.warn('Failed to generate tasks:', tasksResult.error);

      // Mark questionnaire complete
      const completeResult = await markQuestionnaireComplete(userId, 'TECHNOLOGY_DEVELOPER');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
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
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Technology Developer Questionnaire
          </h1>
          <p className="text-gray-600">
            Tell us about your integration needs
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
            <span>Use Case & Integration</span>
            <span>Project Details</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Use Case & Integration */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Use Case & Integration Needs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Use Case */}
                  <div>
                    <Label>Primary Use Case *</Label>
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {Object.entries(technologyDeveloperLabels.use_case).map(([value, label]) => {
                        const isSelected = selectedUseCase === value;
                        return (
                          <label key={value} className="relative cursor-pointer block">
                            <input
                              type="radio"
                              value={value}
                              {...register('use_case')}
                              className="sr-only"
                            />
                            <div 
                              className="p-4 border-2 border-gray-800 rounded-lg transition-all"
                              style={{
                                backgroundColor: isSelected ? '#1f2937' : 'transparent',
                                borderColor: '#1f2937'
                              }}
                            >
                              <p 
                                className="text-sm font-medium transition-colors"
                                style={{
                                  color: isSelected ? '#ffffff' : '#111827'
                                }}
                              >{label}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    {errors.use_case && (
                      <p className="text-sm text-red-600 mt-1">{errors.use_case.message}</p>
                    )}
                  </div>

                  {/* Integration Types */}
                  <div>
                    <Label>Integration Types * (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {Object.entries(technologyDeveloperLabels.integration_types).map(([value, label]) => {
                        const isSelected = integrationTypes.includes(value as any);
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => toggleIntegrationType(value)}
                            className="p-3 border-2 border-gray-800 rounded-lg text-left transition-all hover:bg-gray-100"
                            style={{
                              backgroundColor: isSelected ? '#1f2937' : 'transparent',
                              borderColor: '#1f2937',
                              color: isSelected ? '#ffffff' : '#111827'
                            }}
                          >
                            <p className="text-sm font-medium">{label}</p>
                          </button>
                        );
                      })}
                    </div>
                    {errors.integration_types && (
                      <p className="text-sm text-red-600 mt-1">{errors.integration_types.message}</p>
                    )}
                  </div>

                  {/* Environment Preference */}
                  <div>
                    <Label>Preferred Environment *</Label>
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {Object.entries(technologyDeveloperLabels.env).map(([value, label]) => {
                        const isSelected = selectedEnv === value;
                        return (
                          <label key={value} className="relative cursor-pointer block">
                            <input
                              type="radio"
                              value={value}
                              {...register('env')}
                              className="sr-only"
                            />
                            <div 
                              className="p-3 border-2 border-gray-800 rounded-lg transition-all"
                              style={{
                                backgroundColor: isSelected ? '#1f2937' : 'transparent',
                                borderColor: '#1f2937'
                              }}
                            >
                              <p 
                                className="text-sm font-medium transition-colors"
                                style={{
                                  color: isSelected ? '#ffffff' : '#111827'
                                }}
                              >{label}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    {errors.env && (
                      <p className="text-sm text-red-600 mt-1">{errors.env.message}</p>
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

          {/* Step 2: Project Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Project Name */}
                  <div>
                    <Label htmlFor="project_name">Project Name *</Label>
                    <Input
                      id="project_name"
                      {...register('project_name')}
                      placeholder="My Carbon MRV Platform"
                      className="mt-1"
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
                      placeholder="Your Company Inc."
                      className="mt-1"
                    />
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <Label htmlFor="stack">Tech Stack (Optional)</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          id="stack"
                          value={techStackInput}
                          onChange={(e) => setTechStackInput(e.target.value)}
                          placeholder="e.g., React, Node.js, PostgreSQL"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTechStack();
                            }
                          }}
                        />
                        <Button type="button" onClick={addTechStack} variant="outline">
                          Add
                        </Button>
                      </div>
                      {techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {tech}
                              <button
                                type="button"
                                onClick={() => removeTechStack(tech)}
                                className="hover:text-blue-900"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Project Description (Optional)</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Tell us about your project and what you're building..."
                      className="mt-1 h-24"
                      maxLength={1000}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max 1000 characters
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
