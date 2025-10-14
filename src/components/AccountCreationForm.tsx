import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Footer } from './Footer';
import { authHelpers } from '../utils/supabase/client';
import { 
  ArrowRight, 
  ArrowLeft,
  MapPin, 
  Upload, 
  BarChart3, 
  UserPlus,
  CheckCircle,
  Leaf,
  DollarSign,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';

interface AccountCreationFormProps {
  onNavigate: (section?: string) => void;
  onAccountCreated?: (user: any) => void;
}

interface FormData {
  // Step 1: Land & Operations
  managesLand: string;
  biomassType: string[];
  interests: string[];
  operationsDescription: string;
  
  // Step 2: TMK/Land ID
  tmkId: string;
  landDocuments: File[];
  
  // Step 3: Baseline Assessment (calculated/preview)
  carbonPotential: number;
  estimatedEarnings: number;
  
  // Step 4: Account Creation
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  agreeToTerms: boolean;
}

export function AccountCreationForm({ onNavigate, onAccountCreated }: AccountCreationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    managesLand: '',
    biomassType: [],
    interests: [],
    operationsDescription: '',
    tmkId: '',
    landDocuments: [],
    carbonPotential: 0,
    estimatedEarnings: 0,
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeToTerms: false
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayUpdate = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const calculateCarbonPotential = () => {
    // Simple calculation based on form inputs
    let potential = 100; // Base potential
    
    if (formData.biomassType.includes('agricultural-waste')) potential += 50;
    if (formData.biomassType.includes('forestry-residue')) potential += 75;
    if (formData.biomassType.includes('woody-biomass')) potential += 60;
    
    if (formData.interests.includes('biochar')) potential += 100;
    if (formData.interests.includes('tree-planting')) potential += 80;
    if (formData.interests.includes('regenerative-farming')) potential += 70;
    
    const carbonPotential = Math.round(potential * (0.8 + Math.random() * 0.4));
    const estimatedEarnings = Math.round(carbonPotential * 15 * (0.9 + Math.random() * 0.2));
    
    updateFormData('carbonPotential', carbonPotential);
    updateFormData('estimatedEarnings', estimatedEarnings);
  };

  const nextStep = () => {
    if (currentStep === 2 && formData.carbonPotential === 0) {
      calculateCarbonPotential();
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    try {
      const { user, error } = await authHelpers.signUp(
        formData.email, 
        formData.password, 
        formData.fullName
      );

      if (error) {
        console.error('Sign up error:', error);
        alert('Account creation failed. Please try again.');
        return;
      }

      if (user && onAccountCreated) {
        onAccountCreated(user);
      }
      
      // Here you would typically save the form data to your backend
      console.log('Form submitted:', formData);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.managesLand && formData.biomassType.length > 0 && formData.interests.length > 0;
      case 2:
        return formData.tmkId.trim() !== '';
      case 3:
        return true; // Assessment step is automatic
      case 4:
        return formData.email && formData.password && formData.confirmPassword && 
               formData.fullName && formData.agreeToTerms && 
               formData.password === formData.confirmPassword;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium text-primary mb-4">Tell us about your land and operations</h2>
              <p className="text-lg text-muted-foreground">Help us understand your current operations and goals</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium text-primary mb-4 block">
                  Do you currently manage land or agricultural operations?
                </Label>
                <RadioGroup 
                  value={formData.managesLand} 
                  onValueChange={(value) => updateFormData('managesLand', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="own-land" id="own-land" />
                    <Label htmlFor="own-land" className="cursor-pointer">I own agricultural or forestry land</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="manage-land" id="manage-land" />
                    <Label htmlFor="manage-land" className="cursor-pointer">I manage land for others</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="planning" id="planning" />
                    <Label htmlFor="planning" className="cursor-pointer">I'm planning to start land operations</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-lg font-medium text-primary mb-4 block">
                  What type of biomass or waste do you produce? (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'agricultural-waste', label: 'Agricultural waste (crop residues, husks)' },
                    { id: 'forestry-residue', label: 'Forestry residue (branches, bark, sawdust)' },
                    { id: 'woody-biomass', label: 'Woody biomass (prunings, yard waste)' },
                    { id: 'organic-waste', label: 'Organic waste (food scraps, manure)' },
                    { id: 'energy-crops', label: 'Dedicated energy crops' },
                    { id: 'none-yet', label: 'None yet, but planning to generate' }
                  ].map((option) => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={option.id}
                        checked={formData.biomassType.includes(option.id)}
                        onCheckedChange={(checked) => handleArrayUpdate('biomassType', option.id, checked as boolean)}
                      />
                      <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-medium text-primary mb-4 block">
                  Are you interested in biochar, tree planting, or regenerative farming? (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'biochar', label: 'Biochar production and soil application' },
                    { id: 'tree-planting', label: 'Afforestation and reforestation' },
                    { id: 'regenerative-farming', label: 'Regenerative agriculture practices' },
                    { id: 'rock-weathering', label: 'Enhanced rock weathering' },
                    { id: 'blue-carbon', label: 'Blue carbon (coastal ecosystem restoration)' },
                    { id: 'other-carbon', label: 'Other carbon removal methods' }
                  ].map((option) => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={option.id}
                        checked={formData.interests.includes(option.id)}
                        onCheckedChange={(checked) => handleArrayUpdate('interests', option.id, checked as boolean)}
                      />
                      <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="operations" className="text-lg font-medium text-primary mb-4 block">
                  Tell us more about your current or planned operations (optional)
                </Label>
                <Textarea 
                  id="operations"
                  placeholder="Describe your land, current activities, goals, and any specific carbon removal interests..."
                  value={formData.operationsDescription}
                  onChange={(e) => updateFormData('operationsDescription', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium text-primary mb-4">TMK or Land ID Upload</h2>
              <p className="text-lg text-muted-foreground">Verify your land ownership or management rights</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="tmk" className="text-lg font-medium text-primary mb-4 block">
                  Enter your TMK or land documentation ID
                </Label>
                <Input 
                  id="tmk"
                  placeholder="e.g., 1-2-3-456-789 or property deed number"
                  value={formData.tmkId}
                  onChange={(e) => updateFormData('tmkId', e.target.value)}
                  className="text-lg py-3"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  TMK (Tax Map Key) for Hawaiian properties, or equivalent land identification number
                </p>
              </div>

              <div>
                <Label className="text-lg font-medium text-primary mb-4 block">
                  Upload optional map or documents (e.g., lease, deed)
                </Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors duration-300">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-muted-foreground">Accepted formats: PDF, JPG, PNG (max 10MB each)</p>
                  <Button variant="outline" className="mt-4">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
                
                {formData.landDocuments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-primary">Uploaded files:</p>
                    {formData.landDocuments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-muted/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-primary mb-2">Why we need this information:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Verify legitimate land access for carbon projects</li>
                      <li>• Ensure compliance with local regulations</li>
                      <li>• Enable accurate carbon accounting for your specific location</li>
                      <li>• Facilitate third-party verification processes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium text-primary mb-4">Baseline Assessment</h2>
              <p className="text-lg text-muted-foreground">Understand your carbon potential and earnings</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-medium text-primary mb-2">Carbon Potential</h3>
                  <div className="text-4xl font-medium text-primary mb-2">
                    {formData.carbonPotential.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground">tonnes CO₂/year</p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Based on your land type, biomass sources, and selected methodologies
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-gradient-to-br from-secondary/5 to-accent/10 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-medium text-primary mb-2">Estimated Earnings</h3>
                  <div className="text-4xl font-medium text-secondary mb-2">
                    ${formData.estimatedEarnings.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground">per year</p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Preview based on current LC token market rates
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none bg-gradient-to-br from-accent/10 to-muted/20 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-medium text-primary mb-6">Sample Earnings Model</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Annual carbon removal (tonnes)</span>
                    <span className="font-medium">{formData.carbonPotential.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average LC token price</span>
                    <span className="font-medium">$15/tonne</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Platform fee (15%)</span>
                    <span className="font-medium">-${Math.round(formData.estimatedEarnings * 0.15).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium text-primary">Net annual earnings</span>
                      <span className="font-medium text-secondary">${Math.round(formData.estimatedEarnings * 0.85).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary mb-2">Next steps after signup:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Detailed site assessment and sensor deployment</li>
                    <li>• Custom protocol selection and optimization</li>
                    <li>• Real-time monitoring and verification setup</li>
                    <li>• Direct access to carbon credit marketplaces</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium text-primary mb-4">Sign Up for Steward Portal</h2>
              <p className="text-lg text-muted-foreground">Access your project management dashboard</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-lg font-medium text-primary mb-2 block">
                  Full Name
                </Label>
                <Input 
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className="text-lg py-3"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-lg font-medium text-primary mb-2 block">
                  Email Address
                </Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="text-lg py-3"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-lg font-medium text-primary mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="text-lg py-3 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-lg font-medium text-primary mb-2 block">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="text-lg py-3 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData('agreeToTerms', checked)}
                />
                <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed">
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>, and consent to receive project updates and LC token distributions
                </Label>
              </div>

              <div className="bg-muted/20 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <UserPlus className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-primary mb-2">Your Steward Portal will include:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Project management dashboard with real-time data</li>
                      <li>• Mobile MRV (Measurement, Reporting, Verification) tools</li>
                      <li>• Field data upload and validation interface</li>
                      <li>• LC token wallet and transaction history</li>
                      <li>• Direct access to carbon credit marketplaces</li>
                      <li>• Expert support and guidance throughout your journey</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-primary font-medium">
              Join Mālama Carbon
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Start your carbon removal journey with our comprehensive platform
            </p>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-primary">Step {currentStep} of 4</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center space-x-4 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step <= currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Content */}
          <Card className="border-none bg-card/80 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                {currentStep > 1 ? (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => onNavigate()}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                )}

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isLoading}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <UserPlus className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        onShowDocumentation={() => {}}
        onShowBlog={() => {}}
        onShowPlatform={() => {}}
        onShowHowItWorks={() => {}}
        onShowAbout={() => {}}
        onShowTeam={() => {}}
        onShowContact={() => {}}
        onShowCareers={() => {}}
        onShowFAQ={() => {}}
        onShowPrivacyPolicy={() => {}}
        onShowTermsOfService={() => {}}
        onShowCookiePolicy={() => {}}
        onShowCarbonStudio={() => {}}
        onShowCarbonProtocols={() => {}}
        onShowDMRVEngine={() => {}}
        onShowFinancials={() => {}}
        onShowInvestor={() => {}}
        onShowAdvisory={() => {}}
      />
    </div>
  );
}