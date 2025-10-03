import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, CheckCircle, ArrowRight, Search, Filter, Plus, Bell, HelpCircle, User, Activity, Database, Shield, Zap, Cpu } from 'lucide-react';

interface DMRVEnginePageProps {
  onNavigate: (section?: string) => void;
  onStartProject: () => void;
}

export function DMRVEnginePage({ 
  onNavigate, 
  onStartProject
}: DMRVEnginePageProps) {
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
                <Cpu className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-medium mb-2">
                  Universal dMRV Engine
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  Digital Measurement, Reporting & Verification Platform
                </p>
              </div>
            </div>
            
            <p className="text-lg text-primary-foreground/90 max-w-3xl">
              Automated measurement and monitoring across any carbon methodology, integrated with certification platforms for seamless compliance and verification.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* dMRV Platform Interface */}
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
                          <div className="flex items-center gap-2">
                            <button className="px-4 py-2 bg-emerald-600 text-primary rounded-lg text-sm font-medium">Dashboard</button>
                            <button className="px-4 py-2 text-slate-400 hover:text-primary text-sm">Methodologies</button>
                            <button className="px-4 py-2 text-slate-400 hover:text-primary text-sm">Reports</button>
                            <button className="px-4 py-2 text-slate-400 hover:text-primary text-sm">Integrations</button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-primary text-sm">Dr. Anya Sharma</span>
                            </div>
                            <Bell className="w-5 h-5 text-slate-400" />
                            <HelpCircle className="w-5 h-5 text-slate-400" />
                          </div>
                        </div>
                      </div>

                      {/* Main Content Area */}
                      <div className="flex h-96">
                        {/* Left Sidebar */}
                        <div className="w-80 bg-slate-800 border-r border-slate-700 p-6">
                          <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary mb-2">KPI</h2>
                            <h3 className="text-3xl font-bold text-emerald-400 mb-2">dMRV</h3>
                            <p className="text-slate-400">Returns</p>
                          </div>
                          
                          <div className="mb-6">
                            <p className="text-slate-400 text-sm mb-2">Current Project:</p>
                            <p className="text-primary font-medium">Amazon Reforestation 2024</p>
                          </div>
                          
                          <div className="space-y-3">
                            <Button className="w-full bg-slate-700 hover:bg-slate-600 text-primary border-slate-600">
                              <Plus className="w-4 h-4 mr-2" />
                              New Methodology
                            </Button>
                            <Button className="w-full bg-slate-700 hover:bg-slate-600 text-primary border-slate-600">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Sensor Network
                            </Button>
                            <button className="text-emerald-400 text-sm hover:text-emerald-300">
                              View All Projects
                            </button>
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-6">
                          <div className="mb-6">
                            <h1 className="text-2xl font-bold text-primary mb-4">Methodology Management</h1>
                            
                            <div className="flex items-center gap-4 mb-6">
                              <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                  type="text" 
                                  placeholder="Search methodologies..." 
                                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-primary placeholder-slate-400"
                                />
                              </div>
                              <Button className="bg-slate-700 hover:bg-slate-600 text-primary border-slate-600">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                              </Button>
                              <Button className="bg-emerald-600 hover:bg-emerald-700 text-primary">
                                <Plus className="w-4 h-4 mr-2" />
                                New Methodology
                              </Button>
                            </div>
                          </div>

                          {/* Methodology Cards */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-slate-700 border-slate-600">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <h3 className="text-lg font-semibold text-primary">VM0042 - Reforestation & Afforestation</h3>
                                  <span className="bg-emerald-600 text-primary px-2 py-1 rounded text-xs font-medium">Active</span>
                                </div>
                                
                                <p className="text-slate-300 text-sm mb-4">
                                  Associated Projects: Amazon Basin Project, African Savannah Initiative...
                                </p>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                                    <Database className="w-3 h-3 text-primary" />
                                  </div>
                                  <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-primary" />
                                  </div>
                                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-primary" />
                                  </div>
                                  <span className="text-xs text-slate-400 ml-2">Blockchain Technology</span>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-slate-700 border-slate-600">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <h3 className="text-lg font-semibold text-primary">REDD+ v3.0</h3>
                                  <span className="bg-yellow-600 text-primary px-2 py-1 rounded text-xs font-medium">Active</span>
                                </div>
                                
                                <p className="text-slate-300 text-sm mb-4">
                                  Measures carbon sequestration through planting native trees...
                                </p>
                                
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                  <span className="text-xs text-slate-400">Pending Approval</span>
                                </div>
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
                  The Universal dMRV Engine is Mālama's core platform for digital measurement, reporting, and verification across any carbon methodology. Built with enterprise-grade architecture, it provides automated data collection, real-time analysis, and seamless integration with certification platforms.
                </p>
                <p>
                  Our dMRV system combines IoT sensor networks, satellite data, AI-powered analytics, and blockchain verification to ensure data integrity and regulatory compliance. The platform supports methodologies from Verra, Gold Standard, American Carbon Registry, and emerging Article 6.4 frameworks.
                </p>
                <p>
                  The engine features a comprehensive methodology management system, allowing project developers to select, customize, and implement carbon removal protocols with built-in compliance tracking and automated reporting to certification bodies.
                </p>
              </div>
            </div>
            
            {/* Key Features */}
            <div>
              <h2 className="text-3xl font-medium mb-8 text-primary">Key Features</h2>
              <div className="space-y-4">
                {[
                  "Universal Methodology Support - Compatible with any carbon removal protocol",
                  "AI-Powered Sensor Networks - Automated data collection and quality control",
                  "Real-Time Analytics Dashboard - Live monitoring and performance tracking",
                  "Blockchain Data Integrity - Immutable chain-of-custody verification",
                  "Automated Certification Reporting - Direct integration with registry systems",
                  "Cross-Platform Integration - Seamless connectivity with existing tools",
                  "Compliance-Grade Verification - Built-in regulatory requirement tracking",
                  "Scalable Architecture - Enterprise-ready for large-scale deployments"
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

          {/* Technical Specifications */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-medium mb-6 text-primary">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-primary">Data Collection</h4>
                    <ul className="space-y-2 text-foreground">
                      <li>• IoT sensor network integration</li>
                      <li>• Satellite imagery processing</li>
                      <li>• Drone-based monitoring</li>
                      <li>• Ground truth validation</li>
                      <li>• Weather data integration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-primary">Analytics & AI</h4>
                    <ul className="space-y-2 text-foreground">
                      <li>• Machine learning algorithms</li>
                      <li>• Predictive modeling</li>
                      <li>• Anomaly detection</li>
                      <li>• Automated quality control</li>
                      <li>• Performance optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-primary">Integration</h4>
                    <ul className="space-y-2 text-foreground">
                      <li>• Verra VCS integration</li>
                      <li>• Gold Standard compatibility</li>
                      <li>• American Carbon Registry</li>
                      <li>• Article 6.4 framework support</li>
                      <li>• API-first architecture</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-primary">Security & Compliance</h4>
                    <ul className="space-y-2 text-foreground">
                      <li>• Blockchain verification</li>
                      <li>• End-to-end encryption</li>
                      <li>• Audit trail maintenance</li>
                      <li>• Regulatory compliance tracking</li>
                      <li>• Data sovereignty controls</li>
                    </ul>
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
                <h3 className="text-2xl font-medium mb-4 text-primary">Ready to Deploy dMRV?</h3>
                <p className="text-foreground mb-8 max-w-2xl mx-auto">
                  Deploy the Universal dMRV Engine for your carbon project and ensure compliance-grade measurement, reporting, and verification with automated data collection and blockchain-verified integrity.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={onStartProject}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-primary"
                  >
                    Deploy dMRV Engine
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('platform')}
                    size="lg"
                  >
                    View Platform Demo
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
