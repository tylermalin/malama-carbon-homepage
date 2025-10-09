import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Download, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  FileText,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Shield,
  Activity,
  Globe,
  Zap
} from 'lucide-react';
import { FinancialsPage } from './FinancialsPage';
import { RequestAccessForm } from './RequestAccessForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import malamaLogo from '../assets/malamalabbs.png';

interface InvestorPageProps {
  onNavigate: (page: string) => void;
  onContact: () => void;
}

export const InvestorPage: React.FC<InvestorPageProps> = ({ onNavigate, onContact }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [financialsTab, setFinancialsTab] = useState('overview');
  const [showRequestAccess, setShowRequestAccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'malama2025' || password === 'investor2025') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid access code. Please contact us for access.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Investor Portal</h1>
            <p className="text-gray-600">Enter your access code to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Access Code
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter access code"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
            >
              Access Portal
            </button>
          </form>

          <div className="mt-6 text-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRequestAccess(true)}
              className="w-full border-emerald-500/30 text-emerald-700 hover:bg-emerald-50"
            >
              Request Access
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Or contact us at{' '}
              <a href="mailto:tyler@malamalabs.com" className="text-emerald-600 hover:text-emerald-700">
                tyler@malamalabs.com
              </a>
            </p>
          </div>
        </motion.div>

        <RequestAccessForm
          isOpen={showRequestAccess}
          onClose={() => setShowRequestAccess(false)}
          onSuccess={() => onNavigate('home')}
          portalType="investor"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={malamaLogo} 
                alt="Mālama Labs" 
                className="h-12 w-auto object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mālama Labs Investor Portal</h1>
                <p className="text-gray-600 mt-1">Confidential – For Authorized Investors Only</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                <Lock className="w-4 h-4 mr-1" />
                Secure Access
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-xl border-2 border-emerald-500/20 p-8 shadow-lg mb-8">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Mālama Labs is building the digital infrastructure for compliance-grade carbon markets. This secure investor portal provides authorized stakeholders with exclusive access to current fundraising details, company performance data, and key strategic materials. Our goal is to align mission-driven investors with the future of verifiable carbon removal—turning nature-based impact into investable, high-integrity climate assets.
            </p>
            
            <div className="border-t border-slate-200 pt-6">
              <p className="text-base text-slate-600 leading-relaxed">
                Through a <span className="font-semibold text-primary">$1.2M SAFE round</span> at an <span className="font-semibold text-primary">$8M post-money valuation cap</span>, Mālama Labs is advancing its Universal dMRV platform, certification integrations (Puro.earth, Article 6.4), and Hawai'i-based carbon innovation projects. This portal includes the Executive Summary, Financials, and Data Room materials needed for due diligence and participation in the round.
              </p>
            </div>
          </div>

          {/* Key Investment Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Pre-Seed
                </Badge>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-primary">$1.2M</h3>
              <p className="text-sm text-muted-foreground font-medium">SAFE Round</p>
              <p className="text-xs text-muted-foreground mt-1">Raising</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                  Valuation
                </Badge>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-primary">$8M</h3>
              <p className="text-sm text-muted-foreground font-medium">Valuation Cap</p>
              <p className="text-xs text-muted-foreground mt-1">SAFE Terms</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  +20%
                </Badge>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-primary">20%</h3>
              <p className="text-sm text-muted-foreground font-medium">Discount</p>
              <p className="text-xs text-muted-foreground mt-1">Series Seed</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  Growing
                </Badge>
              </div>
              <h3 className="text-3xl font-bold mb-1 text-primary">12</h3>
              <p className="text-sm text-muted-foreground font-medium">Team Members</p>
              <p className="text-xs text-muted-foreground mt-1">Core Team</p>
            </CardContent>
          </Card>
        </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Header Section */}
        <div className="mb-8 pt-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">mālama labs inc.</h2>
          <h3 className="text-2xl font-semibold text-primary mb-2">SAFE round 2025</h3>
          <p className="text-xl text-gray-600">executive summary</p>
        </div>

        <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
          {/* Enhanced Tabs Navigation */}
          <div className="bg-slate-800 border-b border-slate-700">
            <div className="px-6 py-4">
              <nav className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {[
                  { id: 'overview', label: 'Overview', icon: FileText, description: 'Executive Summary & Strategy' },
                  { id: 'round', label: 'Round Info', icon: DollarSign, description: 'Investment Details & Terms' },
                  { id: 'financials', label: 'Financials', icon: BarChart3, description: 'Financial Performance & Projections' },
                  { id: 'data', label: 'Data Room', icon: Download, description: 'Due Diligence Documents' },
                  { id: 'team', label: 'Team', icon: Users, description: 'Leadership & Advisors' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`group relative flex flex-col items-center p-4 rounded-xl transition-all duration-200 min-w-[140px] border-2 ${
                      selectedTab === tab.id
                        ? 'bg-primary text-white shadow-lg transform scale-105 border-primary'
                        : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 hover:text-white hover:shadow-md border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className={`p-3 rounded-lg mb-3 ${
                      selectedTab === tab.id 
                        ? 'bg-white/20' 
                        : 'bg-slate-600/50 group-hover:bg-slate-500/50'
                    }`}>
                      <tab.icon className={`w-6 h-6 ${
                        selectedTab === tab.id ? 'text-white' : 'text-slate-200'
                      }`} />
                    </div>
                    <div className="text-center">
                      <div className={`font-semibold text-sm mb-1 ${
                        selectedTab === tab.id ? 'text-white' : 'text-slate-200'
                      }`}>
                        {tab.label}
                      </div>
                      <div className={`text-xs leading-tight ${
                        selectedTab === tab.id ? 'text-white/80' : 'text-slate-400 group-hover:text-slate-200'
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                    {selectedTab === tab.id && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4">Executive Summary</h3>
                  <div className="prose max-w-none">
                    <h4 className="text-xl font-semibold text-primary mb-3">Mālama Labs: Building the Capital Markets Infrastructure for Carbon Removal</h4>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      We enable carbon projects to access capital in <strong>90 days instead of 24 months</strong> by building a risk assessment engine, marketplace, and insurance layer that enables early project financing.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4">The $2 Billion Capital Problem</h4>
                  <p className="text-muted-foreground mb-4">
                    Carbon project developers need upfront capital to deploy biochar reactors ($500K-2M), purchase rock dust for enhanced weathering ($200K-1M), and install monitoring equipment ($50K-200K). But corporate buyers won't pay until credits verify in 24 months.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Legacy brokers make it worse: They charge $200K upfront and take 30-60% of credit value, leaving developers with only 40% after a 2-year wait. Result: High-quality projects die waiting while low-quality credits flood the market.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-red-200 bg-red-50/50">
                    <CardContent className="p-6">
                      <h5 className="text-lg font-semibold text-red-800 mb-4">❌ The Legacy Model</h5>
                      <ul className="space-y-2 text-red-700">
                        <li>• Developer pays $200K upfront</li>
                        <li>• Waits 18-24 months for verification</li>
                        <li>• Brokers take 30-60% of value</li>
                        <li>• Developer nets $40-60K per 1,000 tons</li>
                        <li>• Time to cash: 2+ years</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-green-50/50">
                    <CardContent className="p-6">
                      <h5 className="text-lg font-semibold text-green-800 mb-4">✅ The Mālama Model</h5>
                      <ul className="space-y-2 text-green-700">
                        <li>• Developer pays $0 upfront</li>
                        <li>• Presells LCO₂ tokens in 90 days</li>
                        <li>• We take $75K + 7% ongoing fees</li>
                        <li>• Developer nets $460K total</li>
                        <li>• Time to first cash: 90 days</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4">Our Three-Layer Solution</h4>
                  <div className="space-y-6">
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-background">
                      <CardContent className="p-6">
                        <h5 className="text-lg font-semibold text-primary mb-3">1. Risk Assessment Engine</h5>
                        <p className="text-muted-foreground">
                          We analyze projects across 5 factors (methodology, developer track record, region, technical feasibility, financial stability) and assign a 0-100 risk score. This determines how many LCO₂ tokens a project can presell (e.g., 80/100 score → presell 70% of projected credits).
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/5 to-background">
                      <CardContent className="p-6">
                        <h5 className="text-lg font-semibold text-primary mb-3">2. Marketplace</h5>
                        <p className="text-muted-foreground">
                          We match developers who need capital with corporate buyers who want early allocation of high-integrity carbon removal credits. Buyers purchase LCO₂ (liquid carbon futures) at a discount (~$90/ton vs $150 verified), providing developers with immediate liquidity.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-background">
                      <CardContent className="p-6">
                        <h5 className="text-lg font-semibold text-primary mb-3">3. Insurance Layer</h5>
                        <p className="text-muted-foreground">
                          If credits don't fully verify, our insurance reserve (built from 2% premiums on GMV) covers the gap. Risk is shared between developer, buyer, and platform. This de-risks the entire market and enables early liquidity that wasn't possible before.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-primary mb-6">Key Performance Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/10 to-background text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-primary mb-2">7.7x</div>
                        <p className="text-sm text-muted-foreground">More Revenue for Developers</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/10 to-background text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-primary mb-2">90 days</div>
                        <p className="text-sm text-muted-foreground">Time to First Cash</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/10 to-background text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-primary mb-2">40-67%</div>
                        <p className="text-sm text-muted-foreground">Buyer ROI on LCO₂</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/10 to-background text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-primary mb-2">$100B</div>
                        <p className="text-sm text-muted-foreground">Market Size by 2030</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

              </div>
            )}

            {selectedTab === 'round' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6">Investment Opportunity</h3>
                  {/* Investment Summary */}
                  <div className="mb-8">
                    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
                      <CardContent className="p-8">
                        <div className="text-center mb-6">
                          <h4 className="text-3xl font-bold text-primary mb-2">$1.2M SAFE Round</h4>
                          <p className="text-xl text-muted-foreground">$8M Valuation Cap | Closing October 31, 2025</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">$1.2M</div>
                            <p className="text-sm text-muted-foreground">Raising</p>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">$8M</div>
                            <p className="text-sm text-muted-foreground">Valuation Cap</p>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">20%</div>
                            <p className="text-sm text-muted-foreground">Discount Rate</p>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">$25K</div>
                            <p className="text-sm text-muted-foreground">Minimum Investment</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Investment Highlights */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-primary mb-4">Investment Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-background">
                        <CardContent className="p-6">
                          <h5 className="text-lg font-semibold text-primary mb-3">Revenue Targets</h5>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• $788K Year 1 revenue target from 10 projects</li>
                            <li>• 75% gross margins (Year 1) scaling to 82% (Year 5)</li>
                            <li>• 10.8x LTV/CAC ratio with 1.9-month payback period</li>
                            <li>• Cash-flow positive by end of Year 2</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/5 to-background">
                        <CardContent className="p-6">
                          <h5 className="text-lg font-semibold text-primary mb-3">Pipeline & Growth</h5>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• 2 projects in pipeline: AgEnergy (LOI signed), Weathered (verbal commit)</li>
                            <li>• Path to $22.7M revenue by Year 5</li>
                            <li>• Strategic partnerships with major carbon buyers</li>
                            <li>• International expansion planned</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Use of Funds */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-primary mb-4">Use of Funds</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/10 to-background">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">40%</div>
                            <div className="text-2xl font-semibold text-primary mb-2">$480K</div>
                            <h5 className="text-lg font-semibold mb-3">Team</h5>
                            <p className="text-sm text-muted-foreground">Hire 2 engineers (full-stack + ML/AI), 1 BD rep (close 10 projects), 1 operations manager (sensor deployment)</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/10 to-background">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">30%</div>
                            <div className="text-2xl font-semibold text-primary mb-2">$360K</div>
                            <h5 className="text-lg font-semibold mb-3">Technology & Operations</h5>
                            <p className="text-sm text-muted-foreground">IoT sensor deployment (12 projects), satellite data subscriptions (PlanetScope), risk engine MVP (AI model training), insurance reserve seed capital</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/10 to-background">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">20%</div>
                            <div className="text-2xl font-semibold text-primary mb-2">$240K</div>
                            <h5 className="text-lg font-semibold mb-3">Sales & Marketing</h5>
                            <p className="text-sm text-muted-foreground">Outbound to 100 project developers, partnerships (Puro.earth, methodology providers), LCO₂ buyer acquisition, brand/content</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/10 to-background">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">10%</div>
                            <div className="text-2xl font-semibold text-primary mb-2">$120K</div>
                            <h5 className="text-lg font-semibold mb-3">Working Capital</h5>
                            <p className="text-sm text-muted-foreground">Legal (SAFE docs, employment agreements), runway buffer for delays</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                  {/* 12-Month Milestones */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-primary mb-4">12-Month Milestones</h4>
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-background">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-lg font-semibold text-primary mb-3">Key Deliverables</h5>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>• Close 10 projects → $788K revenue</li>
                              <li>• Deploy 10 IoT sensor networks → Monitoring data collection begins</li>
                              <li>• Issue 7,000+ LCO₂ tokens → Marketplace liquidity proven</li>
                              <li>• First VCO₂ credits issue → Full cycle validated (LCO₂ → VCO₂)</li>
                              <li>• Expand beyond Hawaii → California & Pacific Northwest</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-lg font-semibold text-primary mb-3">18-Month Exit to Series Seed</h5>
                            <div className="bg-secondary/10 p-4 rounded-lg">
                              <p className="text-sm text-muted-foreground mb-2"><strong>Target:</strong> $2M at $10-12M post-money once we hit:</p>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• 30+ cumulative projects</li>
                                <li>• $2.5M annual revenue run rate</li>
                                <li>• Proof of VCO₂ conversion (LCO₂ → verified credits)</li>
                                <li>• Insurance track record (0-2 claims, reserves healthy)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
              </div>
            )}

            {selectedTab === 'financials' && (
              <div>
                <FinancialsPage 
                  onNavigate={onNavigate}
                  selectedTab={financialsTab}
                  onTabChange={setFinancialsTab}
                />
              </div>
            )}

            {selectedTab === 'data' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6">Data Room</h3>
                  <p className="text-muted-foreground mb-8">Download confidential documents and materials</p>
                </div>

                {/* Company Overview & Strategy */}
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4 flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Company Overview & Strategy
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'Executive Summary', department: 'Management', type: 'Document', size: '302.82 KB', updated: 'Oct 8, 2025', pages: 7, downloadUrl: 'https://www.dropbox.com/scl/fi/gdfkcq9rdxqnw5yqzf6hk/MLSR25_ExecutiveSummary.pdf?rlkey=z5svhx6axyermatcg2mfmgwtf&st=l5cy8uhk&dl=0' },
                      { name: 'Business Plan', department: 'Management', type: 'Document', size: '2.32 MB', updated: 'Oct 8, 2025', pages: 165, downloadUrl: 'https://www.dropbox.com/scl/fi/gzqkwmd1qs7q7wfvxy06g/MLSR25_BusinessPlanv2.5.pdf?rlkey=3y0vjbxv8hrs53pktd39qs7nr&st=muwjxwzo&dl=0' },
                      { name: 'Pitch Deck', department: 'Management', type: 'File', size: '45.96 MB', updated: 'Oct 8, 2025', pages: 15, downloadUrl: 'https://www.dropbox.com/scl/fi/78gbg6jb3s41u3pt9qkpl/MLSR25_InvestorDeck?rlkey=kjix6j76rs2uzztyt6y5ppf2w&st=hv3adzb0&dl=0' },
                      { name: 'Greenpaper', department: 'Management', type: 'Document', size: '1.06 MB', updated: 'Oct 8, 2025', pages: 44, downloadUrl: 'https://www.dropbox.com/scl/fi/jqfbmjm8v76sjndjfd0yn/MLSR25_GREEN-PAPERv25.pdf?rlkey=r1wgn6lvu0yvx8grctdljcwam&st=b370tx9e&dl=0' },
                      { name: 'Social Media & Brand Guidelines', department: 'Marketing', type: 'PDF', size: '3.7 MB', updated: 'Oct 2025', pages: 45, downloadUrl: 'https://www.dropbox.com/scl/fi/8fkv1urc9u6kntcrx9a97/MLSR25_SocialsBrandGuide.pdf?rlkey=sx5yz2kvvthkamthmwf5qg84n&st=30pqd1rx&dl=0' },
                      { name: 'Brand Book/Design Guide', department: 'Marketing', type: 'PDF', size: '4.3 MB', updated: 'Oct 2025', pages: 11, downloadUrl: 'https://www.dropbox.com/scl/fi/8fkv1urc9u6kntcrx9a97/MLSR25_SocialsBrandGuide.pdf?rlkey=sx5yz2kvvthkamthmwf5qg84n&st=6n4ee0x&dl=0' },
                    ].map((doc, index) => (
                      <Card key={index} className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-primary truncate">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.type} • {doc.size} {doc.pages && `• ${doc.pages} pages`}</p>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="p-2 flex-shrink-0"
                              onClick={() => window.open(doc.downloadUrl, '_blank')}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                              {doc.department}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Updated {doc.updated}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Legal & Corporate Documents */}
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Legal & Corporate Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'Articles of Incorporation', department: 'Legal', type: 'PDF', size: '106 KB', updated: 'Dec 2024', pages: 4, downloadUrl: 'https://www.dropbox.com/scl/fi/oh1aze9a6d9fgj5qpilsp/MLSR25_CertOfInc?rlkey=2j2z8js883iakt6dihjp103gq&st=1zrraawt&dl=0' },
                      { name: 'Board Consents and Actions', department: 'Legal', type: 'PDF', size: '0.7 MB', updated: 'Oct 2025', pages: null, downloadUrl: 'https://www.dropbox.com/scl/fi/fymrp25fgvzpe24ubwjic/11_16_24_BoardMinutes.pdf?rlkey=b72h91ox4dd5rrb08z1vzrh9u&st=l4rbo3z1&dl=0' },
                      { name: 'Due Diligence Questionnaire', department: 'Legal', type: 'PDF', size: '126.81 KB', updated: 'Dec 2024', pages: null, downloadUrl: 'https://www.dropbox.com/scl/fi/9d1ovh65eabfyx2m49s0m/_MLSR25_LegalTemplate_InvestorSuitability.docx.pdf?rlkey=hfibofkuhp830bnxmamcp6fs8&st=dme2rxlt&dl=0' },
                      { name: 'Malama Co-Founder Agreements', department: 'Legal', type: 'PDF', size: '123.2 KB', updated: 'Dec 2024', pages: 11, downloadUrl: 'https://www.dropbox.com/scl/fi/1zldmqr91qc169bfv03mg/MLSR25_OriginalFoundersAgreement?rlkey=6c4c4rz5nvrh6dfnjw4ud2n9p&st=mzsca22h&dl=0' },
                      { name: 'Stock Purchase Agreements', department: 'Legal', type: 'PDF', size: '1.1 MB', updated: 'Dec 2024', pages: null, downloadUrl: null },
                      { name: 'Term Sheet', department: 'Legal', type: 'Document', size: '309.34 KB', updated: 'Oct 8, 2025', pages: 7, downloadUrl: 'https://www.dropbox.com/scl/fi/rysidie9jn36q6zon3jz4/MLSR25_TermSheet.pdf?rlkey=0gsqa1ycagl5fmlab45ygzkln&st=9pzzww28&dl=0' },
                      { name: 'Voting Agreements/Company Bylaws', department: 'Legal', type: 'PDF', size: '500 KB', updated: 'Dec 2024', pages: 25, downloadUrl: 'https://www.dropbox.com/scl/fi/6tj1bib32s0y1ts6kh07u/MLSR25_Bylaws?rlkey=khe4mvmcehd2whexhuix47mlk&st=y7l06har&dl=0' },
                    ].map((doc, index) => (
                      <Card key={index} className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-primary truncate">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.type} • {doc.size} {doc.pages && `• ${doc.pages} pages`}</p>
                              </div>
                            </div>
                            {doc.downloadUrl ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="p-2 flex-shrink-0"
                                onClick={() => window.open(doc.downloadUrl, '_blank')}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            ) : (
                              <div className="text-xs text-muted-foreground italic px-2 py-1 border border-border/50 rounded flex-shrink-0">
                                Available Upon Request
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                              {doc.department}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Updated {doc.updated}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Financial & Operational Data */}
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Financial & Operational Data
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'Balance Sheet', department: 'Financial', type: 'PDF', size: '36 KB', updated: 'Oct 2025', pages: 1, downloadUrl: 'https://www.dropbox.com/scl/fi/kfriit7kx330jih8h4824/MLSR25_ProFormaBalanceSheet?rlkey=oc7h3xu8ihyb49uwfzss0ypli&st=rib64y5w&dl=0' },
                      { name: 'Capitalization Table', department: 'Financial', type: 'Excel', size: '0.4 MB', updated: 'Dec 2024', pages: null, downloadUrl: null },
                      { name: 'Company Objectives & KPIs', department: 'Operations', type: 'PDF', size: '0.9 MB', updated: 'Dec 2024', pages: 12, downloadUrl: 'https://www.dropbox.com/scl/fi/qv01lmg90kmogpa68owq8/MLSR25_Objectives-KPI-Report.pdf?rlkey=62zyetwm0lch80bdlfe6e7sou&st=ipz9tvti&dl=0' },
                      { name: 'Employee List & Salaries', department: 'Operations', type: 'PDF', size: '0.2 MB', updated: 'Oct 2025', pages: 3, downloadUrl: 'https://www.dropbox.com/scl/fi/o8mag194blhlfqccwvid8/MLSR25_EmployeeCompensationTable-as-of-Q4-2025?rlkey=u20y3mihezfcbkpydl57tlxdr&st=7hpxbfpydl57tlxdr&dl=0' },
                      { name: 'Financial Model', department: 'Financial', type: 'Excel', size: '250 KB', updated: 'Oct 2025', pages: 7, downloadUrl: 'https://www.dropbox.com/scl/fi/lpdh0uizapugq6y0cxawn/MLSR25_BusinessModel-1.xlsx?rlkey=utlixpenuifp6jfc8drxvtz18&st=z8idxeet&dl=0' },
                      { name: 'Org Chart', department: 'Operations', type: 'PDF', size: '0.3 MB', updated: 'Oct 2025', pages: 14, downloadUrl: 'https://www.dropbox.com/scl/fi/mxgtwfg0klajgzjmgenjt/MLSR25_OrgChart?rlkey=qfcdwgm5lwtxe3yi7t59e3h4z&st=a20wxyah&dl=0' },
                      { name: 'Profit and Loss Statements', department: 'Financial', type: 'PDF', size: '36 KB', updated: 'Oct 2025', pages: 1, downloadUrl: 'https://www.dropbox.com/scl/fi/66mjkalsvky28xrlkxt36/MLSR25_ProForma_Profit_Loss-P-L-Statement?rlkey=bqrp0kfkp434h5untocs9n152&st=t0s32zna&dl=0' },
                      { name: 'SaaS Metrics', department: 'Financial', type: 'PDF', size: '0.6 MB', updated: 'Dec 2024', pages: 9, downloadUrl: 'https://www.dropbox.com/scl/fi/v88d0v68muvdig5xdr30n/MLSR25_SaaSREPORT_Q4-2025.pdf?rlkey=mzbtaebshm330ydc4mprzvqpl&st=roqmdpay&dl=0' },
                      { name: 'Sales Plan', department: 'Sales', type: 'PDF', size: '215.12 KB', updated: 'Dec 2024', pages: 9, downloadUrl: 'https://www.dropbox.com/scl/fi/g68z58830nxn8sfe064iw/MLSR25_SalesPlan_Pipeline?rlkey=4mzug6sky15fk5rudultzkcn4&st=eus5sjpe&dl=0' },
                    ].map((doc, index) => (
                      <Card key={index} className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-primary truncate">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.type} • {doc.size} {doc.pages && `• ${doc.pages} pages`}</p>
                              </div>
                            </div>
                            {doc.downloadUrl ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="p-2 flex-shrink-0"
                                onClick={() => window.open(doc.downloadUrl, '_blank')}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            ) : (
                              <div className="text-xs text-muted-foreground italic px-2 py-1 border border-border/50 rounded flex-shrink-0">
                                Available Upon Request
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                              {doc.department}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Updated {doc.updated}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Product & Technical Documentation */}
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Product & Technical Documentation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'API Documentation', department: 'Technical', type: 'PDF', size: '2.7 MB', updated: 'Oct 2025', pages: 15, downloadUrl: 'https://www.dropbox.com/scl/fi/jmzwzq9v3v76zq2b3owys/MLSR25_APIIntegrations.pdf?rlkey=pfrjx7prg0fqwlod50ss2k4xf&st=0sh8yp5m&dl=0' },
                      { name: 'IP Planning and Strategy Document', department: 'Technical', type: 'PDF', size: '1.9 MB', updated: 'Oct 2025', pages: null, downloadUrl: 'https://www.dropbox.com/scl/fi/kq4l8foe20nqgodx7hzxg/MLSR25_IPStrategyMemo?rlkey=9kc3lj7r9bqwd7vo3a3vq18o9&st=pe8vh8fp&dl=0' },
                      { name: 'System Architecture Diagram', department: 'Technical', type: 'PDF', size: '1.4 MB', updated: 'Oct 2025', pages: 7, downloadUrl: 'https://www.dropbox.com/scl/fi/k4b109do5s36pasisz22j/MLSR25_SystemArchitecture.pdf?rlkey=aqagd02ypd1rx8sn6v88wanx9&st=fpz3bjc2&dl=0' },
                      { name: 'Tokenomics', department: 'Technical', type: 'PDF', size: '2.7 MB', updated: 'Oct 2025', pages: 58, downloadUrl: 'https://www.dropbox.com/scl/fi/hm53tump9a5omghamoscb/MLSR25_TokenomicsLitepaper_v1.3.pdf?rlkey=215tm72r9org8q2wr93gvn1jw&st=kne2f26t&dl=0' },
                    ].map((doc, index) => (
                      <Card key={index} className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-primary truncate">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.type} • {doc.size} {doc.pages && `• ${doc.pages} pages`}</p>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="p-2 flex-shrink-0"
                              onClick={() => window.open(doc.downloadUrl, '_blank')}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                              {doc.department}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Updated {doc.updated}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'team' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">The Team</h3>
                  <p className="text-lg text-muted-foreground mb-6">Carbon Science + Web3 Infrastructure + Operational Execution</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                          <img 
                            src="/assets/tyler2025headshot.png" 
                            alt="Tyler Malin"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-primary">Tyler Malin</h4>
                        <p className="text-secondary font-medium">CEO & Co-Founder</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-primary mb-2">Background:</h5>
                          <p className="text-muted-foreground text-sm">Serial entrepreneur with 20+ years building marketplaces. 2 successful exits including Idea Farmer (Inc. 500 Top 10). Legal & operations expertise for regulatory navigation.</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-primary mb-2">Why Tyler:</h5>
                          <p className="text-muted-foreground text-sm">Proven track record of building and selling companies through multiple market cycles. Knows how to scale from 0 to 100 customers, when to stay lean vs invest, and how to attract Series A investors.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                          <img 
                            src="https://www.malamalabs.com/assets/Dominick-BASZ3WWg.png" 
                            alt="Dominick Garey"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-primary">Dominick Garey</h4>
                        <p className="text-secondary font-medium">CTO & Co-Founder</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-primary mb-2">Background:</h5>
                          <p className="text-muted-foreground text-sm">Full-stack blockchain architect with deep Web3 expertise. Technical leader for dMRV platform and carbon marketplace. System integration & protocol development specialist.</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-primary mb-2">Why Dom:</h5>
                          <p className="text-muted-foreground text-sm">Can build enterprise-grade infrastructure, not just prototypes. Expertise in blockchain rails for VCO₂ tokenization, AI for risk assessment and fraud detection, satellite + IoT integration for monitoring.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                          <img 
                            src="https://www.malamalabs.com/assets/jeffrey-BXTnCr7s.jpeg" 
                            alt="Jeffrey Wise"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold text-primary">Jeffrey Wise</h4>
                        <p className="text-secondary font-medium">COO & Co-Founder</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-primary mb-2">Background:</h5>
                          <p className="text-muted-foreground text-sm">Hawaii agriculture & sustainability background. Operational leader for on-ground sensor deployment. Deep community relationships that generate project pipeline.</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-primary mb-2">Why Jeffrey:</h5>
                          <p className="text-muted-foreground text-sm">We're building where carbon is being removed—his local roots provide trust in a trust-starved market. Understanding of regional regulatory environment (Hawaii launching state carbon market 2026).</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-primary mb-6">Why This Team Wins</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-background">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-primary mb-3">Geographic Advantage</h5>
                        <p className="text-muted-foreground">Building from Hawaii (not SF/NYC) = on the ground with projects, local relationships provide early pipeline advantage</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/5 to-background">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-primary mb-3">Proven Execution</h5>
                        <p className="text-muted-foreground">Tyler's 2 exits demonstrate ability to scale from 0 to 100 customers, manage capital efficiently, and navigate exits</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-background">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-primary mb-3">Technical Depth</h5>
                        <p className="text-muted-foreground">This isn't a whitepaper—we're building production infrastructure with real blockchain, AI, satellite, and IoT integration</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/5 to-background">
                      <CardContent className="p-6">
                        <h5 className="font-semibold text-primary mb-3">Domain Expertise</h5>
                        <p className="text-muted-foreground">Combination of marketplace experience (Tyler), technical infrastructure (Dom), and carbon/agriculture knowledge (Jeffrey)</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-primary mb-6">Key Hires (Next 12 Months)</h4>
                  <div className="space-y-4">
                    <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-primary mb-2">VP Carbon Markets (Q2 2026)</h5>
                            <p className="text-muted-foreground mb-2">Target: Ex-Verra, Gold Standard, or Puro.earth for carbon market credibility with institutional buyers</p>
                          </div>
                          <Badge className="bg-primary/10 text-primary border-primary/20">Planned</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-primary mb-2">Chief Scientist (Q3 2026)</h5>
                            <p className="text-muted-foreground mb-2">Target: PhD in soil carbon or geochemistry for scientific rigor in risk modeling</p>
                          </div>
                          <Badge className="bg-primary/10 text-primary border-primary/20">Planned</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-primary mb-2">2 Engineers (Q1 2026)</h5>
                            <p className="text-muted-foreground mb-2">Full-stack + ML/AI for risk engine and dMRV platform development</p>
                          </div>
                          <Badge className="bg-secondary/10 text-secondary border-secondary/20">Priority</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-primary mb-2">1 BD Rep (Q1 2026)</h5>
                            <p className="text-muted-foreground mb-2">Focus on closing 10 projects Year 1, proven track record in carbon markets</p>
                          </div>
                          <Badge className="bg-secondary/10 text-secondary border-secondary/20">Priority</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* CTA Section */}
        <div className="mt-12">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                Ready to Invest?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join us in building the future of carbon markets. Schedule a call with our team to discuss investment opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={() => window.open('https://calendar.app.google/PjPddjUkZjdxHPqr8', '_blank')}
                >
                  Schedule Investment Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => window.open('mailto:investors@malama.earth', '_blank')}
                >
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};