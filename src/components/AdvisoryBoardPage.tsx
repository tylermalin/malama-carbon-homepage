import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { AdvisoryApplicationForm } from './AdvisoryApplicationForm';
import { AdvisoryApplicationSuccess } from './AdvisoryApplicationSuccess';
import { 
  Users, 
  Target, 
  DollarSign, 
  Clock, 
  Calendar,
  ExternalLink,
  CheckCircle2,
  Star,
  Shield,
  Zap,
  Globe,
  Building2,
  Briefcase,
  Scale,
  Gavel,
  TrendingUp,
  ArrowRight,
  Mail,
  Lock
} from 'lucide-react';

interface AdvisoryBoardPageProps {
  onNavigate: (section?: string) => void;
  onContact?: () => void;
}

const ADVISORY_PASSWORD = 'malama2025';

const advisorTypes = [
  {
    title: 'Carbon Market Veterans',
    description: 'Former leadership from Verra, Gold Standard, Puro.earth, or major carbon registries. Understanding of verification standards, methodology development, and market dynamics.',
    icon: Globe,
    badge: 'High Priority',
    badgeColor: 'destructive',
    priority: 'urgent'
  },
  {
    title: 'Corporate Sustainability Leaders',
    description: 'Heads of Sustainability or Carbon Procurement at Fortune 500 companies. Can introduce us to corporate buyers and validate our value proposition.',
    icon: Building2,
    badge: 'High Priority',
    badgeColor: 'destructive',
    priority: 'urgent'
  },
  {
    title: 'Climate Tech Investors',
    description: 'Partners at climate-focused funds (Lowercarbon, Breakthrough Energy, etc.). Help with fundraising strategy, investor introductions, and cap table construction.',
    icon: TrendingUp,
    badge: 'Priority',
    badgeColor: 'default',
    priority: 'high'
  },
  {
    title: 'Web3 / Blockchain Experts',
    description: 'Experience with tokenization, DeFi protocols, or RWA (Real World Assets). Help us navigate regulatory frameworks and blockchain architecture decisions.',
    icon: Zap,
    badge: 'Priority',
    badgeColor: 'default',
    priority: 'high'
  },
  {
    title: 'Insurance / Risk Management',
    description: 'Actuaries or underwriters with experience in novel risk products. Help us build sustainable insurance reserves and potentially connect with reinsurers.',
    icon: Shield,
    badge: 'Priority',
    badgeColor: 'default',
    priority: 'high'
  },
  {
    title: 'Regulatory / Legal Experts',
    description: 'Experience with SEC, CFTC, or carbon market regulations. Navigate securities law for tokenized credits and compliance requirements.',
    icon: Gavel,
    badge: 'Valuable',
    badgeColor: 'secondary',
    priority: 'medium'
  }
];

export function AdvisoryBoardPage({ onNavigate, onContact }: AdvisoryBoardPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = sessionStorage.getItem('advisory_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADVISORY_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('advisory_authenticated', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('advisory_authenticated');
    setPassword('');
  };

  const handleApplicationSubmit = (formData: any) => {
    // Store the application data (you can send this to your backend)
    console.log('Advisory Board Application Submitted:', formData);
    
    // Store in localStorage for now (in production, send to your backend)
    const applications = JSON.parse(localStorage.getItem('advisoryApplications') || '[]');
    applications.push({
      ...formData,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString()
    });
    localStorage.setItem('advisoryApplications', JSON.stringify(applications));
    
    // Show success screen
    setSubmittedEmail(formData.email);
    setShowApplicationForm(false);
    setShowSuccessScreen(true);
  };

  const handleCloseApplication = () => {
    setShowApplicationForm(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccessScreen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">Advisory Board Portal</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter password to access advisory board information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-primary placeholder:text-muted-foreground"
                    required
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-primary"
                >
                  Access Portal
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Advisory Board Portal</h1>
                <p className="text-sm text-muted-foreground">Malama Labs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                className="text-muted-foreground hover:text-primary hover:bg-slate-700/50"
              >
                Company Website
              </Button>
              <Button
                onClick={() => setShowApplicationForm(true)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-primary"
              >
                Apply to Join
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-primary"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Join Our Advisory Board
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Help us build the capital markets infrastructure for carbon removal. 
              Share your expertise, expand your network, and participate in the upside.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowApplicationForm(true)}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-primary px-8 py-3"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('home')}
                size="lg"
                className="border-slate-600 text-muted-foreground hover:bg-slate-700/50 px-8 py-3"
              >
                Learn More About Malama Labs
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Target className="w-6 h-6 text-emerald-400 mr-3" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Enable high-integrity carbon removal projects to access capital in 90 
                  days instead of 24 months by building a risk-adjusted marketplace with an 
                  insurance layer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Globe className="w-6 h-6 text-blue-400 mr-3" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Become the Bloomberg Terminal for carbon removal—the trusted 
                  infrastructure layer that makes every ton traceable, tradeable, and bankable. 
                  By 2030, we aim to facilitate $10B+ in carbon project financing and help scale 
                  the market from 2M tons to 1B+ tons annually.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-lg">
              <CardContent className="p-8">
                <p className="text-muted-foreground text-lg leading-relaxed text-center">
                  We're not just building technology—we're fixing a broken market. Carbon project 
                  developers currently lose 60% of their value to middlemen and wait 2 years for 
                  payment. Corporate buyers can't access high-quality removal credits. The result: 
                  good projects die waiting, bad credits flood the market.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What We're Looking For */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">What We're Looking For</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're seeking exceptional advisors across six key areas to help us build 
              the future of carbon markets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisorTypes.map((advisor, index) => (
              <motion.div
                key={advisor.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-lg hover:bg-slate-800/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg">
                        <advisor.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <Badge 
                        variant={advisor.badgeColor as any}
                        className={`${
                          advisor.priority === 'urgent' 
                            ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                            : advisor.priority === 'high'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-500/20 text-muted-foreground border-slate-500/30'
                        }`}
                      >
                        {advisor.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-primary mb-3">{advisor.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{advisor.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation Package */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Standard Advisory Board Package</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe advisors should share in the upside they help create. 
              Our standard package is competitive with top-tier startups and designed to 
              attract exceptional talent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Star, label: 'Equity', value: '0.25-0.50%', subtext: 'Vesting over 2 years' },
              { icon: DollarSign, label: 'Annual Cash', value: '$2-5K', subtext: 'Optional stipend' },
              { icon: Clock, label: 'Time Commitment', value: '2-4 hours', subtext: 'Monthly' },
              { icon: Calendar, label: 'Initial Term', value: '2 years', subtext: 'Renewable' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-lg text-center">
                  <CardContent className="p-6">
                    <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <metric.icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">{metric.value}</h3>
                    <p className="text-muted-foreground font-medium mb-1">{metric.label}</p>
                    <p className="text-sm text-muted-foreground">{metric.subtext}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Package Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
                  <span>Vesting Schedule: 25% after 6 months, then monthly over remaining 18 months</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
                  <span>Equity Type: Stock options (ISOs for US advisors) or restricted stock</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
                  <span>Strike Price: Fair market value at grant date</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
                  <span>Acceleration: 50% on acquisition or IPO</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
                  <span>Board Participation: Observer rights for select advisors</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Star className="w-6 h-6 text-amber-400 mr-3" />
                  Executive Advisors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For advisors providing 10+ hours/month or opening significant doors 
                  (e.g., $1M+ in deals), we offer enhanced packages:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mr-3" />
                    <span>0.50-1.00% equity</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mr-3" />
                    <span>$10-25K annual cash</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 mr-3" />
                    <span>Potential board seat</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="border-2 border-slate-700 bg-slate-800/50 backdrop-blur-lg">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold text-primary mb-6">
                  Ready to Help Build the Future of Carbon Markets?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  We're looking for 4-6 exceptional advisors to join our board in Q4 2025. 
                  If you have relevant expertise and want to be part of solving one of climate 
                  tech's biggest infrastructure challenges, let's talk.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setShowApplicationForm(true)}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-primary px-8 py-3"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('home')}
                    size="lg"
                    className="border-slate-600 text-muted-foreground hover:bg-slate-700/50 px-8 py-3"
                  >
                    Learn More About Malama Labs
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                <p className="text-muted-foreground mt-6">
                  Questions? Email <a href="mailto:tyler@malamalabs.com" className="text-emerald-400 hover:text-emerald-300">tyler@malamalabs.com</a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <AdvisoryApplicationForm
          onClose={handleCloseApplication}
          onSubmit={handleApplicationSubmit}
        />
      )}

      {/* Success Screen Modal */}
      {showSuccessScreen && (
        <AdvisoryApplicationSuccess
          email={submittedEmail}
          onClose={handleCloseSuccess}
        />
      )}
    </div>
  );
}
