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
  EyeOff,
  Code,
  ShoppingCart,
  Handshake,
  Users,
  Building,
  GraduationCap,
  Heart,
  Scale,
  Cpu,
  Key,
  BookOpen,
  MessageSquare,
  TreePine,
  Factory,
  Globe,
  TrendingUp
} from 'lucide-react';

interface GetStartedPageProps {
  onNavigate: (section?: string) => void;
  onAccountCreated?: (user: any) => void;
}

type UserType = 'steward' | 'developer' | 'buyer' | 'partner';

interface FormData {
  userType: UserType | null;
  
  // Common fields
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  organizationName: string;
  agreeToTerms: boolean;
  
  // Steward specific
  managesLand: string;
  biomassType: string[];
  interests: string[];
  operationsDescription: string;
  tmkId: string;
  landDocuments: File[];
  carbonPotential: number;
  estimatedEarnings: number;
  
  // Developer specific
  useCase: string;
  projectDescription: string;
  integrationType: string[];
  
  // Buyer specific
  organizationType: string;
  intendedUse: string;
  volumeRange: string;
  preferredMethod: string[];
  riskTolerance: string;
  
  // Partner specific
  partnerType: string;
  collaborationGoals: string;
  desiredCollaboration: string[];
}

const userTypes = [
  {
    id: 'steward' as UserType,
    title: 'Land Steward',
    description: 'Manage land operations and create biochar to earn carbon credits',
    icon: Leaf,
    color: 'bg-primary',
    features: ['Project Management', 'Carbon Credit Earning', 'MRV Tools', 'Mobile Data Upload']
  },
  {
    id: 'developer' as UserType,
    title: 'Developer',
    description: 'Build tools on our APIs for carbon measurement and trading',
    icon: Code,
    color: 'bg-secondary',
    features: ['API Access', 'Documentation', 'Dev Community', 'Sandbox Environment']
  },
  {
    id: 'buyer' as UserType,
    title: 'Credit Buyer',
    description: 'Purchase verified carbon removal credits with transparency',
    icon: ShoppingCart,
    color: 'bg-accent-foreground',
    features: ['Marketplace Access', 'Portfolio Management', 'Verified Credits', 'Compliance Tools']
  },
  {
    id: 'partner' as UserType,
    title: 'Partner',
    description: 'Join our network to scale global carbon removal initiatives',
    icon: Handshake,
    color: 'bg-primary',
    features: ['Collaboration Tools', 'Resource Access', 'Grant Opportunities', 'Strategy Support']
  }
];

export function GetStartedPage({ onNavigate, onAccountCreated }: GetStartedPageProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0 = user type selection, 1-4 = steps
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showBuyerThankYou, setShowBuyerThankYou] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userType: null,
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    organizationName: '',
    agreeToTerms: false,
    
    // Steward specific
    managesLand: '',
    biomassType: [],
    interests: [],
    operationsDescription: '',
    tmkId: '',
    landDocuments: [],
    carbonPotential: 0,
    estimatedEarnings: 0,
    
    // Developer specific
    useCase: '',
    projectDescription: '',
    integrationType: [],
    
    // Buyer specific
    organizationType: '',
    intendedUse: '',
    volumeRange: '',
    preferredMethod: [],
    riskTolerance: '',
    
    // Partner specific
    partnerType: '',
    collaborationGoals: '',
    desiredCollaboration: []
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

  const selectUserType = (type: UserType) => {
    updateFormData('userType', type);
    setCurrentStep(1);
  };

  const calculateCarbonPotential = () => {
    let potential = 100;
    
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
    if (formData.userType === 'steward' && currentStep === 2 && formData.carbonPotential === 0) {
      calculateCarbonPotential();
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    if (currentStep === 1) {
      setCurrentStep(0); // Go back to user type selection
      updateFormData('userType', null);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
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
        
        // Check if the error is about user already existing
        if (error.message?.toLowerCase().includes('already been registered') || 
            error.message?.toLowerCase().includes('already exists')) {
          const confirmSignIn = confirm(
            'An account with this email already exists. Would you like to sign in instead?'
          );
          
          if (confirmSignIn) {
            try {
              const { user: signInUser, error: signInError } = await authHelpers.signIn(
                formData.email, 
                formData.password
              );
              
              if (signInError) {
                alert('Sign in failed. Please check your credentials or try resetting your password.');
                return;
              }
              
              if (signInUser && onAccountCreated) {
                onAccountCreated(signInUser);
                if (formData.userType === 'buyer') {
                  setShowBuyerThankYou(true);
                } else {
                  setShowThankYou(true);
                }
              }
              
              console.log('User signed in successfully:', formData);
              return;
            } catch (signInError) {
              console.error('Sign in error:', signInError);
              alert('Sign in failed. Please try again or contact support.');
              return;
            }
          }
        } else {
          alert('Account creation failed. Please try again.');
        }
        return;
      }

      if (user && onAccountCreated) {
        onAccountCreated(user);
        // Show buyer-specific thank you message for buyers, general thank you for others
        if (formData.userType === 'buyer') {
          setShowBuyerThankYou(true);
        } else {
          setShowThankYou(true);
        }
      }
      
      console.log('Form submitted:', formData);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (!formData.userType) return false;
    
    switch (currentStep) {
      case 1:
        if (formData.userType === 'steward') {
          return formData.managesLand && formData.biomassType.length > 0 && formData.interests.length > 0;
        } else if (formData.userType === 'developer') {
          return formData.useCase && formData.integrationType.length > 0;
        } else if (formData.userType === 'buyer') {
          return formData.organizationType && formData.intendedUse;
        } else if (formData.userType === 'partner') {
          return formData.partnerType && formData.collaborationGoals;
        }
        break;
      case 2:
        if (formData.userType === 'steward') {
          return formData.tmkId.trim() !== '';
        } else if (formData.userType === 'developer') {
          return formData.projectDescription.trim() !== '';
        } else if (formData.userType === 'buyer') {
          return formData.volumeRange && formData.preferredMethod.length > 0;
        } else if (formData.userType === 'partner') {
          return formData.desiredCollaboration.length > 0;
        }
        break;
      case 3:
        if (formData.userType === 'buyer') {
          return formData.email && formData.password && formData.confirmPassword && 
                 formData.fullName && formData.agreeToTerms && 
                 formData.password === formData.confirmPassword;
        }
        return true; // Assessment/preview steps are automatic for other user types
      case 4:
        if (formData.userType === 'buyer') {
          return true; // Dashboard enrollment step for buyers
        }
        return formData.email && formData.password && formData.confirmPassword && 
               formData.fullName && formData.agreeToTerms && 
               formData.password === formData.confirmPassword;
      default:
        return false;
    }
    return false;
  };

  const getStepTitle = () => {
    if (currentStep === 0) return "Choose Your Path";
    
    const stepTitles = {
      steward: [
        "Tell us about your land and operations",
        "TMK or Land ID Upload", 
        "Baseline Assessment",
        "Sign Up for Steward Portal"
      ],
      developer: [
        "Developer Use Case Selection",
        "API Key Request",
        "Documentation Hub", 
        "Join Dev Community"
      ],
      buyer: [
        "Organization Type & Use",
        "Credit Preference Setup",
        "Buyer Profile Creation",
        "Dashboard Enrollment"
      ],
      partner: [
        "Partner Type Selection",
        "Partnership Interest Form",
        "Use Case Mapping",
        "Mālama Partner Portal Access"
      ]
    };
    
    return stepTitles[formData.userType!]?.[currentStep - 1] || "";
  };

  const getStepSubtitle = () => {
    if (currentStep === 0) return "Get started with Mālama Carbon based on your role in the carbon removal ecosystem";
    
    const stepSubtitles = {
      steward: [
        "Help us understand your current operations and goals",
        "Verify your land ownership or management rights",
        "Understand your carbon potential and earnings",
        "Access your project management dashboard"
      ],
      developer: [
        "Define your integration goals",
        "Get access to our development environment", 
        "Explore comprehensive API resources",
        "Connect with other developers and get support"
      ],
      buyer: [
        "Set up your organization profile",
        "Define your carbon credit requirements",
        "Create your buyer account",
        "Manage your carbon portfolio"
      ],
      partner: [
        "Choose your organization type",
        "Share your collaboration goals",
        "Align with our platform capabilities",
        "Access exclusive partner resources"
      ]
    };
    
    return stepSubtitles[formData.userType!]?.[currentStep - 1] || "";
  };

  const renderUserTypeSelection = () => (
    <motion.div
      key="user-type-selection"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {userTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]"
              onClick={() => selectUserType(type.id)}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-primary">{type.title}</h3>
                  </div>
                </div>
                
                <p className="text-foreground/80 mb-6">{type.description}</p>
                
                <div className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground/70">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-6 group-hover:scale-105 transition-transform duration-300">
                  Get Started as {type.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStewardStep = () => {
    switch (currentStep) {
      case 1:
        return (
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
        );

      case 2:
        return (
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
        );

      case 3:
        return (
          <div className="space-y-8">
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
          </div>
        );

      default:
        return null;
    }
  };

  const renderDeveloperStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                Are you building an MRV tool, marketplace, DAO, or integration?
              </Label>
              <RadioGroup 
                value={formData.useCase} 
                onValueChange={(value) => updateFormData('useCase', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="mrv-tool" id="mrv-tool" />
                  <Label htmlFor="mrv-tool" className="cursor-pointer">MRV tool for measurement and verification</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="marketplace" id="marketplace" />
                  <Label htmlFor="marketplace" className="cursor-pointer">Carbon credit marketplace or trading platform</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="dao" id="dao" />
                  <Label htmlFor="dao" className="cursor-pointer">DAO or DeFi protocol integration</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="enterprise" id="enterprise" />
                  <Label htmlFor="enterprise" className="cursor-pointer">Enterprise sustainability platform</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="cursor-pointer">Other integration</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                What type of integration are you planning? (Select all that apply)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'sensor-data', label: 'Sensor data and IoT integration' },
                  { id: 'satellite-data', label: 'Satellite imagery and remote sensing' },
                  { id: 'field-data', label: 'Field data collection and validation' },
                  { id: 'token-issuance', label: 'Carbon token issuance and management' },
                  { id: 'marketplace-api', label: 'Marketplace and trading functionality' },
                  { id: 'verification', label: 'Verification and audit workflows' }
                ].map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox 
                      id={option.id}
                      checked={formData.integrationType.includes(option.id)}
                      onCheckedChange={(checked) => handleArrayUpdate('integrationType', option.id, checked as boolean)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="project-description" className="text-lg font-medium text-primary mb-4 block">
                Describe your project or tool
              </Label>
              <Textarea 
                id="project-description"
                placeholder="Tell us about your project goals, target users, and how you plan to integrate with our platform..."
                value={formData.projectDescription}
                onChange={(e) => updateFormData('projectDescription', e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="bg-muted/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Key className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary mb-2">API Access includes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Staging environment with test data</li>
                    <li>• Rate-limited API keys for development</li>
                    <li>• Full documentation and code examples</li>
                    <li>• Technical support and community access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">MRV Endpoints</h3>
                  <p className="text-sm text-muted-foreground">Sensor, satellite, and field data APIs</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-gradient-to-br from-secondary/5 to-accent/10 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Cpu className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">Token Issuance</h3>
                  <p className="text-sm text-muted-foreground">LC, VC, and insurance pool management</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-gradient-to-br from-accent/10 to-muted/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">Marketplace</h3>
                  <p className="text-sm text-muted-foreground">Credit trading and retirement APIs</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary mb-2">Documentation Hub includes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Comprehensive API reference with live examples</li>
                    <li>• Integration guides and best practices</li>
                    <li>• SDK libraries for popular languages</li>
                    <li>• Webhook documentation for real-time updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderBuyerStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                Organization type
              </Label>
              <RadioGroup 
                value={formData.organizationType} 
                onValueChange={(value) => updateFormData('organizationType', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="corporate" id="corporate" />
                  <Label htmlFor="corporate" className="cursor-pointer">Corporate</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="dao" id="dao" />
                  <Label htmlFor="dao" className="cursor-pointer">DAO</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="government" id="government" />
                  <Label htmlFor="government" className="cursor-pointer">Government</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="investor" id="investor" />
                  <Label htmlFor="investor" className="cursor-pointer">Investor</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                Intended use
              </Label>
              <RadioGroup 
                value={formData.intendedUse} 
                onValueChange={(value) => updateFormData('intendedUse', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="offset" id="offset" />
                  <Label htmlFor="offset" className="cursor-pointer">Offset</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="treasury" id="treasury" />
                  <Label htmlFor="treasury" className="cursor-pointer">Treasury</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="resale" id="resale" />
                  <Label htmlFor="resale" className="cursor-pointer">Resale</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="compliance" id="compliance" />
                  <Label htmlFor="compliance" className="cursor-pointer">Compliance</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                Volume range (tCO₂)
              </Label>
              <RadioGroup 
                value={formData.volumeRange} 
                onValueChange={(value) => updateFormData('volumeRange', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="1000-5000" id="1000-5000" />
                  <Label htmlFor="1000-5000" className="cursor-pointer">1,000 - 5,000</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="5000-25000" id="5000-25000" />
                  <Label htmlFor="5000-25000" className="cursor-pointer">5,000 - 25,000</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="25000-100000" id="25000-100000" />
                  <Label htmlFor="25000-100000" className="cursor-pointer">25,000 - 100,000</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="100000+" id="100000+" />
                  <Label htmlFor="100000+" className="cursor-pointer">100,000+</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                Preferred method (Select all that apply)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'biochar', label: 'Biochar' },
                  { id: 'regenerative-ag', label: 'Regenerative agriculture' },
                  { id: 'forestry', label: 'Forestry and afforestation' },
                  { id: 'rock-weathering', label: 'Enhanced rock weathering' },
                  { id: 'blue-carbon', label: 'Blue carbon' },
                  { id: 'mixed-portfolio', label: 'Mixed portfolio' }
                ].map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox 
                      id={option.id}
                      checked={formData.preferredMethod.includes(option.id)}
                      onCheckedChange={(checked) => handleArrayUpdate('preferredMethod', option.id, checked as boolean)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                Risk tolerance
              </Label>
              <RadioGroup 
                value={formData.riskTolerance} 
                onValueChange={(value) => updateFormData('riskTolerance', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="platinum" id="platinum" />
                  <Label htmlFor="platinum" className="cursor-pointer">Platinum LC tiers (highest quality)</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="gold" id="gold" />
                  <Label htmlFor="gold" className="cursor-pointer">Gold LC tiers (high quality)</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="silver" id="silver" />
                  <Label htmlFor="silver" className="cursor-pointer">Silver LC tiers (standard quality)</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed" className="cursor-pointer">Mixed portfolio</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-lg font-medium text-primary mb-4 block">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="text-lg"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-lg font-medium text-primary mb-4 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email address"
                className="text-lg"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-lg font-medium text-primary mb-4 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  placeholder="Create a secure password"
                  className="text-lg pr-10"
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
              <Label htmlFor="confirmPassword" className="text-lg font-medium text-primary mb-4 block">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="text-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => updateFormData('agreeToTerms', checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="agreeToTerms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('terms')}
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('privacyPolicy')}
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                </Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-muted/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <ShoppingCart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary mb-2">Marketplace features:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Browse available LC token batches with detailed project information</li>
                    <li>• View pricing, trust scores, and comprehensive MRV data</li>
                    <li>• Add credits to cart or reserve future allocations</li>
                    <li>• Direct communication with project developers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
                <CardContent className="p-6 text-center">
                  <TreePine className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">Project Details</h3>
                  <p className="text-sm text-muted-foreground">Complete project information and impact data</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-gradient-to-br from-secondary/5 to-accent/10 shadow-lg">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">Trust Score</h3>
                  <p className="text-sm text-muted-foreground">AI-powered quality and risk assessment</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-gradient-to-br from-accent/10 to-muted/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">MRV Data</h3>
                  <p className="text-sm text-muted-foreground">Real-time measurement and verification data</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPartnerStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                Choose your organization type
              </Label>
              <RadioGroup 
                value={formData.partnerType} 
                onValueChange={(value) => updateFormData('partnerType', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="technology" id="technology" />
                  <Label htmlFor="technology" className="cursor-pointer">Technology provider</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="academic" id="academic" />
                  <Label htmlFor="academic" className="cursor-pointer">Academic institution</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="ngo" id="ngo" />
                  <Label htmlFor="ngo" className="cursor-pointer">NGO or nonprofit</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="policy" id="policy" />
                  <Label htmlFor="policy" className="cursor-pointer">Policy or registry organization</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="collaboration-goals" className="text-lg font-medium text-primary mb-4 block">
                Share your collaboration goals
              </Label>
              <Textarea 
                id="collaboration-goals"
                placeholder="Describe your organization's mission, how you'd like to collaborate with Mālama Carbon, and what you hope to achieve together..."
                value={formData.collaborationGoals}
                onChange={(e) => updateFormData('collaborationGoals', e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-primary mb-4 block">
                Desired collaboration (Select all that apply)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'research', label: 'Research collaboration' },
                  { id: 'co-development', label: 'Co-development of tools or protocols' },
                  { id: 'data-sharing', label: 'Data sharing and integration' },
                  { id: 'pilot-projects', label: 'Pilot project deployment' },
                  { id: 'policy-development', label: 'Policy and standards development' },
                  { id: 'capacity-building', label: 'Capacity building and training' }
                ].map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox 
                      id={option.id}
                      checked={formData.desiredCollaboration.includes(option.id)}
                      onCheckedChange={(checked) => handleArrayUpdate('desiredCollaboration', option.id, checked as boolean)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Handshake className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary mb-2">Partnership opportunities:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Joint research and development initiatives</li>
                    <li>• Technology integration and co-innovation</li>
                    <li>• Pilot project deployment and scaling</li>
                    <li>• Policy advocacy and standards development</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Cpu className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">MRV Stack</h3>
                  <p className="text-sm text-muted-foreground">Connect to our measurement and verification infrastructure</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-gradient-to-br from-secondary/5 to-accent/10 shadow-lg">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">Site Deployments</h3>
                  <p className="text-sm text-muted-foreground">Collaborate on project deployment and scaling</p>
                </CardContent>
              </Card>

              <Card className="border-none bg-gradient-to-br from-accent/10 to-muted/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-primary mb-2">Pilot Projects</h3>
                  <p className="text-sm text-muted-foreground">Launch collaborative pilot initiatives</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary mb-2">Optional next step:</p>
                  <p className="text-sm text-muted-foreground">
                    Schedule a strategy call with our partnerships team to discuss specific collaboration opportunities and alignment with your goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderAccountCreationStep = () => (
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

      {formData.userType !== 'steward' && (
        <div>
          <Label htmlFor="organizationName" className="text-lg font-medium text-primary mb-2 block">
            Organization Name
          </Label>
          <Input 
            id="organizationName"
            placeholder="Enter your organization name"
            value={formData.organizationName}
            onChange={(e) => updateFormData('organizationName', e.target.value)}
            className="text-lg py-3"
          />
        </div>
      )}

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
          I agree to the <button className="text-primary hover:underline">Terms of Service</button> and <button className="text-primary hover:underline">Privacy Policy</button>, and consent to receive updates and communications
        </Label>
      </div>

      <div className="bg-muted/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <UserPlus className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-primary mb-2">
              Your {formData.userType === 'steward' ? 'Steward Portal' : 
                    formData.userType === 'developer' ? 'Developer Account' :
                    formData.userType === 'buyer' ? 'Buyer Dashboard' : 'Partner Portal'} will include:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {formData.userType === 'steward' && (
                <>
                  <li>• Project management dashboard with real-time data</li>
                  <li>• Mobile MRV tools for field data collection</li>
                  <li>• LC token wallet and transaction history</li>
                  <li>• Direct access to carbon credit marketplaces</li>
                </>
              )}
              {formData.userType === 'developer' && (
                <>
                  <li>• API keys and comprehensive documentation</li>
                  <li>• Sandbox environment for testing</li>
                  <li>• Developer community access and support</li>
                  <li>• Grant and collaboration announcements</li>
                </>
              )}
              {formData.userType === 'buyer' && (
                <>
                  <li>• Carbon credit portfolio management</li>
                  <li>• Marketplace access with advanced filtering</li>
                  <li>• Automated purchasing and compliance tools</li>
                  <li>• Detailed impact reporting and analytics</li>
                </>
              )}
              {formData.userType === 'partner' && (
                <>
                  <li>• Partner resource library and collaboration tools</li>
                  <li>• API sandbox and integration support</li>
                  <li>• Grant opportunities and funding announcements</li>
                  <li>• Strategy calls and partnership development</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    if (currentStep === 0) {
      return renderUserTypeSelection();
    }

    if (currentStep === 4) {
      return renderAccountCreationStep();
    }

    switch (formData.userType) {
      case 'steward':
        return renderStewardStep();
      case 'developer':
        return renderDeveloperStep();
      case 'buyer':
        return renderBuyerStep();
      case 'partner':
        return renderPartnerStep();
      default:
        return null;
    }
  };

  const progress = currentStep === 0 ? 0 : (currentStep / 4) * 100;

  // Show buyer-specific thank you message after successful account creation
  if (showBuyerThankYou) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
                Thank You for Creating Your Buyer Profile!
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Your buyer profile has been successfully created. We're excited to help you access high-quality carbon credits through our platform.
              </p>
              
              <div className="bg-muted/20 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  What's Next?
                </h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">Our team will review your buyer profile and reach out within 2-3 business days</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">We'll schedule a call to discuss your carbon credit needs and portfolio goals</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">Our live marketplace and full platform features are coming soon!</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate()}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Return to Home
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('about')}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Learn More About Mālama
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Show thank you message after successful account creation
  if (showThankYou) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
                Thank You for Your Interest!
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                We're excited to have you join the Mālama Carbon community. Our team will be in touch soon to discuss your project and next steps.
              </p>
              
              <div className="bg-muted/20 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  What's Next?
                </h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">Our team will review your application and reach out within 2-3 business days</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">We'll schedule a call to discuss your specific needs and project goals</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">Our live dashboards and full platform features are coming soon!</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate()}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Return to Home
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('about')}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Learn More About Mālama
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-primary font-medium">
              {currentStep === 0 ? 'Get Started' : getStepTitle()}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-4xl mx-auto">
              {getStepSubtitle()}
            </p>
            
            {/* Progress Bar - only show when in steps */}
            {currentStep > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-primary">Step {currentStep} of 4</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            )}

            {/* Step Indicators - only show when in steps */}
            {currentStep > 0 && (
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
            )}
          </motion.div>

          {/* Form Content */}
          <Card className="border-none bg-card/80 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep > 0 && (
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {currentStep === 1 ? 'Back to User Types' : 'Previous'}
                  </Button>

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
              )}

              {/* Back to Home Button - only show on user type selection */}
              {currentStep === 0 && (
                <div className="flex justify-center mt-12 pt-8 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate()}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}