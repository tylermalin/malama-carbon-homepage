import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, CheckCircle, ArrowRight, Search, Filter, Plus, Bell, HelpCircle, User, TrendingUp, Circle, BarChart3, MoreHorizontal, Shield, ShoppingCart, Calendar, FileText, Settings, DollarSign, Zap, Eye } from 'lucide-react';

interface CarbonCreditStudioPageProps {
  onNavigate: (section?: string) => void;
  onStartProject: () => void;
}

export function CarbonCreditStudioPage({ 
  onNavigate, 
  onStartProject
}: CarbonCreditStudioPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              variant="ghost"
              onClick={() => onNavigate()}
              className="mb-6 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-medium mb-2">
                  Carbon Credit Studio
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  Accelerate Your Financing
                </p>
              </div>
            </div>
            
            <p className="text-lg text-primary-foreground/90 max-w-3xl">
              Issue & pre-sell durable LC02/VC02 credits on-chain to jumpstart project development and accelerate financing.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Carbon Credit Studio Interface */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Monitor Frame */}
                  <div className="bg-slate-100 rounded-lg p-4 m-4">
                    <div className="bg-slate-900 rounded-lg overflow-hidden">
                      {/* Top Navigation Bar */}
                      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <span className="text-primary text-sm font-bold">M</span>
                          </div>
                          <span className="text-primary font-semibold text-lg">Malama</span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <h2 className="text-primary text-lg font-medium">Carbon Credit Studio: Accelerate Your Financing</h2>
                          
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <Search className="w-5 h-5 text-slate-400" />
                            <HelpCircle className="w-5 h-5 text-slate-400" />
                          </div>
                        </div>
                      </div>

                      {/* Main Content Area */}
                      <div className="flex h-[600px]">
                        {/* Left Sidebar */}
                        <div className="w-64 bg-slate-800 border-r border-slate-700 p-6">
                          <div className="space-y-4">
                            <div className="text-slate-400 text-sm">Product</div>
                            <div className="text-slate-400 text-sm">Dashboard</div>
                            
                            <div className="bg-emerald-600 text-primary px-3 py-2 rounded-lg flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-sm">Issuance & Pre-Sale</span>
                              </div>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <Zap className="w-4 h-4" />
                              <span>dMRV Engine | Carbon Active</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <ShoppingCart className="w-4 h-4" />
                              <span>Marketplace</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>Calendar</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <FileText className="w-4 h-4" />
                              <span>Documents</span>
                              <span className="bg-emerald-600 text-primary px-1 py-0.5 rounded text-xs">Active</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <Shield className="w-4 h-4" />
                              <span>Compliance</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <BarChart3 className="w-4 h-4" />
                              <span>Analytics</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <Settings className="w-4 h-4" />
                              <span>Settings</span>
                            </div>
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-6">
                          <div className="mb-6">
                            <p className="text-slate-400 text-sm mb-4">Issue & pre-sell durable LC02/VC02 credits on-chain to jumpstart project development</p>
                          </div>

                          {/* Key Metrics Cards */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <Card className="bg-slate-800 border-slate-700">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                  </div>
                                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">$1,250,000 USD</h3>
                                <p className="text-slate-400 text-sm">Pre-Sale Capital Raised From Credits Pre-Sold On-Chain</p>
                              </CardContent>
                            </Card>

                            <Card className="bg-slate-800 border-slate-700">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                                    <Circle className="w-5 h-5 text-primary" />
                                  </div>
                                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">2,000,000 tCO2e</h3>
                                <p className="text-slate-400 text-sm">Credits Available for Pre-Sale / Issuance Verified Eligible On-Chain Issuance</p>
                              </CardContent>
                            </Card>

                            <Card className="bg-slate-800 border-slate-700">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                  </div>
                                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-2">$32.00 / tCO2e</h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                                  <span className="text-emerald-400 text-sm">Premium Market</span>
                                </div>
                                <p className="text-slate-400 text-sm">Average Pre-Sale Price / LC02/VC02</p>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Bottom Sections */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Active Pre-Sale Campaigns */}
                            <Card className="bg-slate-800 border-slate-700">
                              <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-primary mb-4">Active Pre-Sale Campaigns</h3>
                                
                                <div className="space-y-4">
                                  <div className="grid grid-cols-3 gap-4 text-sm text-slate-400 mb-3">
                                    <div>Campaign Name</div>
                                    <div>Credits Sold</div>
                                    <div>Status</div>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-slate-700">
                                    <div className="text-primary font-medium">Seed Round - Q2 2024</div>
                                    <div className="text-primary">64%</div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-primary">$102,400</span>
                                      <span className="bg-emerald-600 text-primary px-2 py-1 rounded text-xs">Open</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-primary">
                                  <Plus className="w-4 h-4 mr-2" />
                                  Launch New Pre-Sale Campaign
                                </Button>
                              </CardContent>
                            </Card>

                            {/* On-Chain Issuance & Verification */}
                            <Card className="bg-slate-800 border-slate-700">
                              <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-primary mb-4">On-Chain Issuance & Verification</h3>
                                
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    <span className="text-primary">Next Issuance Batch: Ready</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    <span className="text-primary">Connected to [Blockchain Network]</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-blue-400" />
                                    <span className="text-blue-400 text-sm">View on-chain transactions</span>
                                  </div>
                                </div>
                                
                                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-primary">
                                  Review & Issue Credits
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-medium mb-8 text-primary">Overview</h2>
              <div className="space-y-6 text-foreground">
                <p>
                  The Carbon Credit Studio is Mālama's comprehensive platform for issuing and pre-selling durable carbon credits on-chain. Built for project developers who need immediate financing, the studio enables early credit sales before project completion while maintaining full transparency and compliance.
                </p>
                <p>
                  Our platform integrates with the Universal dMRV Engine to provide real-time monitoring and verification, ensuring that pre-sold credits are backed by actual carbon removal activities. The on-chain issuance creates immutable records of credit ownership and transfer, building trust with buyers and investors.
                </p>
                <p>
                  The studio features automated compliance reporting, integration with major certification platforms, and direct access to verified carbon credit buyers. Real-time pricing and market data help optimize pre-sale strategies and maximize project financing.
                </p>
              </div>
            </div>
            
            {/* Key Features */}
            <div>
              <h2 className="text-3xl font-medium mb-8 text-primary">Key Features</h2>
              <div className="space-y-4">
                {[
                  "Pre-Sale Campaign Management - Launch and manage credit pre-sale campaigns",
                  "On-Chain Credit Issuance - Immutable blockchain records for transparency",
                  "Real-Time Pricing Engine - Dynamic pricing based on market conditions",
                  "Automated Compliance Reporting - Direct integration with certification bodies",
                  "Buyer Verification System - Access to verified carbon credit purchasers",
                  "Campaign Analytics Dashboard - Track performance and optimize strategies",
                  "Multi-Methodology Support - Compatible with all carbon removal protocols",
                  "Escrow and Settlement - Secure payment processing and credit delivery"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* How It Works Process */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-primary mb-4">How It Works: Carbon Credit Studio</h2>
                  <p className="text-slate-300 text-lg">A single system for issuance, pre-sales, and market access</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {[
                    {
                      step: "1",
                      title: "Deploy dMRV & Monitor",
                      icon: "📡",
                      description: "Install monitoring devices, integrate satellite imagery, and connect sensors. Flexible deployment across land, soil, and industrial project sites."
                    },
                    {
                      step: "2",
                      title: "Capture & Process Data",
                      icon: "🧠",
                      description: "Sensor networks and AI models continuously measure key variables. Data processed to detect anomalies and ensure accuracy."
                    },
                    {
                      step: "3",
                      title: "Automated Reporting",
                      icon: "📊",
                      description: "Verified data automatically formatted and submitted to certifiers. Eliminates manual reporting and accelerates approval."
                    },
                    {
                      step: "4",
                      title: "Blockchain Verification",
                      icon: "🔗",
                      description: "Every measurement and verification step is time-stamped, stored, and transparent. Tamper-proof records buyers and regulators can trust."
                    },
                    {
                      step: "5",
                      title: "Market Integration",
                      icon: "💰",
                      description: "Validated data flows seamlessly to Mālama's Carbon Studio, enabling pre-sales, LC02/VC02 tokens, and direct access to verified buyers."
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold text-lg">{step.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
                      <div className="text-3xl mb-3">{step.icon}</div>
                      <p className="text-slate-300 text-sm">{step.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                    <p className="text-slate-300">
                      Mālama's Universal Protocol Suite connects multiple durable carbon removal methods into one trusted framework, ensuring compatibility with the world's most respected certification bodies and registries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-emerald-500/10 border-emerald-500/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-medium mb-4 text-primary">Ready to Launch Your Carbon Credit Campaign?</h3>
                <p className="text-foreground mb-8 max-w-2xl mx-auto">
                  Start pre-selling your carbon credits today with Mālama's Carbon Credit Studio. Get immediate financing while maintaining full transparency and compliance through our on-chain issuance platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={onStartProject}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-primary"
                  >
                    Launch Pre-Sale Campaign
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('platform')}
                    size="lg"
                  >
                    View Studio Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
