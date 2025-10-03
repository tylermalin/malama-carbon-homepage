import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Mail,
  User,
  Briefcase,
  Target,
  Users,
  Clock,
  Star
} from 'lucide-react';

interface AdvisoryApplicationFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const steps = [
  { number: 1, title: 'Personal', icon: User },
  { number: 2, title: 'Background', icon: Briefcase },
  { number: 3, title: 'Expertise', icon: Target },
  { number: 4, title: 'Network', icon: Users },
  { number: 5, title: 'Details', icon: Clock }
];

const expertiseOptions = [
  'Carbon Markets',
  'Voluntary Carbon Standards',
  'Corporate Sustainability',
  'Climate Tech Investing',
  'Web3/Blockchain',
  'DeFi/Tokenization',
  'Insurance/Risk Management',
  'Regulatory/Legal',
  'Carbon Project Development',
  'MRV/Verification'
];

export function AdvisoryApplicationForm({ onClose, onSubmit }: AdvisoryApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    
    // Step 2: Background
    currentTitle: '',
    currentCompany: '',
    yearsExperience: '',
    expertise: [] as string[],
    advisoryExperience: '',
    currentRoles: '',
    
    // Step 3: Expertise
    primaryExpertise: '',
    howCanHelp: '',
    whyInterested: '',
    achievements: '',
    
    // Step 4: Network
    investorIntros: '',
    corporateIntros: '',
    developerIntros: '',
    networkDescription: '',
    
    // Step 5: Details
    timeCommitment: '',
    equityExpectation: '',
    cashExpectation: '',
    startDate: '',
    heardAbout: '',
    resumeUrl: '',
    additionalInfo: ''
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      expertise: checked 
        ? [...prev.expertise, expertise]
        : prev.expertise.filter(e => e !== expertise)
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const progress = (currentStep / 5) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-2 border-gray-200 bg-white backdrop-blur-lg">
          <CardHeader className="text-center border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
              <div className="flex-1">
                <CardTitle className="text-3xl text-gray-900 mb-2">Advisory Board Application</CardTitle>
                <CardDescription className="text-gray-600">
                  Join us in building the future of carbon markets
                </CardDescription>
              </div>
              <div className="w-8"></div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className={`flex flex-col items-center ${
                      currentStep >= step.number ? 'text-emerald-600' : 'text-gray-500'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= step.number 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => updateFormData('fullName', e.target.value)}
                        placeholder="Jane Smith"
                        className="bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="jane@example.com"
                          className="bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location <span className="text-red-400">*</span>
                        </label>
                        <Input
                          value={formData.location}
                          onChange={(e) => updateFormData('location', e.target.value)}
                          placeholder="San Francisco, CA"
                          className="bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn Profile <span className="text-red-400">*</span>
                        </label>
                        <Input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => updateFormData('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Professional Background */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Background</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Title <span className="text-red-400">*</span>
                      </label>
                      <Input
                        value={formData.currentTitle}
                        onChange={(e) => updateFormData('currentTitle', e.target.value)}
                        placeholder="VP of Sustainability"
                        className="bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Company <span className="text-red-400">*</span>
                      </label>
                      <Input
                        value={formData.currentCompany}
                        onChange={(e) => updateFormData('currentCompany', e.target.value)}
                        placeholder="Acme Corp"
                        className="bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Years of Relevant Experience <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.yearsExperience}
                      onChange={(e) => updateFormData('yearsExperience', e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="16+">16+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Areas of Expertise <span className="text-red-400">*</span> (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {expertiseOptions.map((expertise) => (
                        <label key={expertise} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.expertise.includes(expertise)}
                            onChange={(e) => handleExpertiseChange(expertise, e.target.checked)}
                            className="w-4 h-4 text-emerald-500 bg-white border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">{expertise}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Previous Advisory Experience
                    </label>
                    <select
                      value={formData.advisoryExperience}
                      onChange={(e) => updateFormData('advisoryExperience', e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="">Select...</option>
                      <option value="none">No prior advisory experience</option>
                      <option value="1-2">1-2 advisory roles</option>
                      <option value="3-5">3-5 advisory roles</option>
                      <option value="6+">6+ advisory roles</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Current Advisory Roles (if any)
                    </label>
                    <textarea
                      value={formData.currentRoles}
                      onChange={(e) => updateFormData('currentRoles', e.target.value)}
                      placeholder="List companies you currently advise..."
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px]"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Expertise & Value Add */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">How You Can Help Us</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Primary Area Where You Can Add Most Value <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.primaryExpertise}
                      onChange={(e) => updateFormData('primaryExpertise', e.target.value)}
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="carbon-markets">Carbon Markets Strategy</option>
                      <option value="fundraising">Fundraising & Investor Relations</option>
                      <option value="corporate-sales">Corporate Buyer Introductions</option>
                      <option value="project-developers">Carbon Project Developer Network</option>
                      <option value="web3-tech">Web3/Blockchain Technical Guidance</option>
                      <option value="insurance">Insurance & Risk Management</option>
                      <option value="regulatory">Regulatory & Legal Navigation</option>
                      <option value="product">Product & Technology Strategy</option>
                      <option value="operations">Operations & Scaling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      How specifically can you help Malama Labs? <span className="text-red-400">*</span>
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      Be as specific as possible. Examples: introductions to specific people/companies, technical expertise, strategic guidance.
                    </p>
                    <textarea
                      value={formData.howCanHelp}
                      onChange={(e) => updateFormData('howCanHelp', e.target.value)}
                      placeholder="Examples: 'I can introduce you to 3 Fortune 500 sustainability officers' or 'I can help validate your carbon accounting methodology'"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 min-h-[120px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Why are you interested in advising Malama Labs? <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.whyInterested}
                      onChange={(e) => updateFormData('whyInterested', e.target.value)}
                      placeholder="What excites you about our mission and approach?"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Notable Achievements or Track Record <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={formData.achievements}
                      onChange={(e) => updateFormData('achievements', e.target.value)}
                      placeholder="Key accomplishments, deals closed, companies built, etc."
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px]"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Network & Connections */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Network & Connections</h2>
                  
                  <p className="text-gray-600 mb-6">
                    One of the most valuable things advisors provide is opening doors. Help us understand your network.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Can you introduce us to climate tech investors?
                      </label>
                      <select
                        value={formData.investorIntros}
                        onChange={(e) => updateFormData('investorIntros', e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      >
                        <option value="">Select...</option>
                        <option value="no">No connections</option>
                        <option value="1-2">1-2 warm introductions possible</option>
                        <option value="3-5">3-5 warm introductions possible</option>
                        <option value="6+">6+ warm introductions possible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Can you introduce us to corporate carbon buyers (Fortune 500 sustainability teams)?
                      </label>
                      <select
                        value={formData.corporateIntros}
                        onChange={(e) => updateFormData('corporateIntros', e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      >
                        <option value="">Select...</option>
                        <option value="no">No connections</option>
                        <option value="1-2">1-2 warm introductions possible</option>
                        <option value="3-5">3-5 warm introductions possible</option>
                        <option value="6+">6+ warm introductions possible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Can you introduce us to carbon project developers?
                      </label>
                      <select
                        value={formData.developerIntros}
                        onChange={(e) => updateFormData('developerIntros', e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      >
                        <option value="">Select...</option>
                        <option value="no">No connections</option>
                        <option value="1-2">1-2 warm introductions possible</option>
                        <option value="3-5">3-5 warm introductions possible</option>
                        <option value="6+">6+ warm introductions possible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe your most valuable network connections for our business
                      </label>
                      <textarea
                        value={formData.networkDescription}
                        onChange={(e) => updateFormData('networkDescription', e.target.value)}
                        placeholder="Be specific: names of firms, types of contacts, strength of relationships..."
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Expectations & Logistics */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Expectations & Logistics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Commitment You Can Offer <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.timeCommitment}
                        onChange={(e) => updateFormData('timeCommitment', e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="1-2">1-2 hours/month (light advisory)</option>
                        <option value="2-4">2-4 hours/month (standard advisory)</option>
                        <option value="5-10">5-10 hours/month (active advisory)</option>
                        <option value="10+">10+ hours/month (executive advisory)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        When could you start?
                      </label>
                      <select
                        value={formData.startDate}
                        onChange={(e) => updateFormData('startDate', e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      >
                        <option value="">Select...</option>
                        <option value="immediately">Immediately</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="flexible">Flexible timing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Equity Compensation Expectation
                      </label>
                      <select
                        value={formData.equityExpectation}
                        onChange={(e) => updateFormData('equityExpectation', e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      >
                        <option value="">Select...</option>
                        <option value="standard">Standard package (0.25-0.50%)</option>
                        <option value="executive">Executive package (0.50-1.00%)</option>
                        <option value="flexible">Flexible / Let's discuss</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Cash Stipend Preference
                      </label>
                      <select
                        value={formData.cashExpectation}
                        onChange={(e) => updateFormData('cashExpectation', e.target.value)}
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                      >
                        <option value="">Select...</option>
                        <option value="none">No cash needed (equity only)</option>
                        <option value="standard">Standard ($2-5K annually)</option>
                        <option value="executive">Executive ($10-25K annually)</option>
                        <option value="flexible">Flexible / Let's discuss</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      How did you hear about us?
                    </label>
                    <Input
                      value={formData.heardAbout}
                      onChange={(e) => updateFormData('heardAbout', e.target.value)}
                      placeholder="Referral, LinkedIn, conference, etc."
                      className="bg-slate-700/50 border-slate-600 text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Resume / CV URL (optional)
                    </label>
                    <Input
                      type="url"
                      value={formData.resumeUrl}
                      onChange={(e) => updateFormData('resumeUrl', e.target.value)}
                      placeholder="Link to Google Drive, Dropbox, or personal website"
                      className="bg-slate-700/50 border-slate-600 text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Additional Information
                    </label>
                    <textarea
                      value={formData.additionalInfo}
                      onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                      placeholder="Anything else we should know?"
                      className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={prevStep}
                className={`border-gray-300 text-gray-700 hover:bg-gray-50 ${
                  currentStep === 1 ? 'invisible' : ''
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={nextStep}
                className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200"
              >
                {currentStep === 5 ? 'Submit Application' : 'Next Step'}
                {currentStep < 5 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
