import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowRight, 
  Activity, 
  Cpu, 
  Flame, 
  Coins, 
  CheckCircle,
  BarChart3,
  Leaf,
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Target,
  FileText,
  Settings,
  Plus,
  Database,
  Search,
  Funnel,
  Eye,
  DollarSign,
  ShoppingCart,
  Calendar as CalendarIcon,
  Bell,
  HelpCircle,
  Ellipsis,
  Circle as CircleIcon
} from 'lucide-react';

interface PlatformPageProps {
  onNavigate: (section?: string) => void;
  onStartProject?: () => void;
  onNavigateToDMRV?: () => void;
  onNavigateToProtocols?: () => void;
  onNavigateToStudio?: () => void;
}

export function PlatformPage({ onNavigate, onStartProject, onNavigateToDMRV, onNavigateToProtocols, onNavigateToStudio }: PlatformPageProps) {
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-primary font-medium">
              Explore Our Platform
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto">
              Discover the comprehensive tools and technologies that power Mālama Carbon's carbon removal platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={onStartProject}
                className="hover:scale-105 transition-transform duration-300"
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate()}
                className="hover:scale-105 transition-transform duration-300"
              >
                How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="overview" className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Platform Overview
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three core modules working together to create a comprehensive carbon removal solution
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Cpu className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    📡 dMRV Engine
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    AI + blockchain-powered measurement tools
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => scrollToSection('dmrv-features')}
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 group-hover:gap-3 font-medium"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    📋 Carbon Credit Protocols
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    Link any accepted methodology to any 3rd Party Validator
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => scrollToSection('protocols-features')}
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 group-hover:gap-3 font-medium"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-accent-foreground rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-4 text-center text-primary font-medium">
                    🏭 Carbon Credit Studio
                  </h3>
                  
                  <p className="text-center text-foreground/80 mb-6 line-height-relaxed">
                    Issue & sell durable LCO₂/VCO₂ credits on-chain
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => scrollToSection('studio-features')}
                      className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 group-hover:gap-3 font-medium"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Key Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced capabilities that set our platform apart in the carbon removal industry
            </p>
          </motion.div>

          {/* dMRV Engine Features */}
          <motion.div 
            id="dmrv-features"
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-gradient-to-r from-[rgba(27,67,50,0.03)] via-[rgba(10,61,63,0.02)] to-[rgba(236,230,218,0.05)] backdrop-blur-sm shadow-[0_8px_24px_rgba(27,67,50,0.08)]">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-medium text-primary">dMRV Engine</h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Real-time IoT sensor monitoring</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">AI-powered data validation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Blockchain-secured measurements</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Automated reporting systems</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-primary font-medium mb-6">
                      Reduce verification costs by 70% while increasing accuracy
                    </p>
                    
                    {/* Methodology Management Dashboard Mockup */}
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                      <div className="bg-slate-900 rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm font-bold">M</span>
                            </div>
                            <span className="text-white font-semibold text-lg">Mālama</span>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">Dashboard</button>
                              <button className="px-4 py-2 text-slate-400 hover:text-white text-sm">Methodologies</button>
                              <button className="px-4 py-2 text-slate-400 hover:text-white text-sm">Reports</button>
                              <button className="px-4 py-2 text-slate-400 hover:text-white text-sm">Integrations</button>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                                  <Users className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-white text-sm">Dr. Anya Sharma</span>
                              </div>
                              <Bell className="w-5 h-5 text-slate-400" />
                              <HelpCircle className="w-5 h-5 text-slate-400" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Body */}
                        <div className="flex h-96">
                          {/* Sidebar */}
                          <div className="w-80 bg-slate-800 border-r border-slate-700 p-6">
                            <div className="mb-8">
                              <h2 className="text-2xl font-bold text-white mb-2">KPI</h2>
                              <h3 className="text-3xl font-bold text-emerald-400 mb-2">dMRV</h3>
                              <p className="text-slate-400">Returns</p>
                            </div>
                            <div className="mb-6">
                              <p className="text-slate-400 text-sm mb-2">Current Project:</p>
                              <p className="text-white font-medium">Amazon Reforestation 2024</p>
                            </div>
                            <div className="space-y-3">
                              <Button variant="outline" className="w-full bg-slate-700 hover:bg-slate-600 text-white border-slate-600">
                                <Plus className="w-4 h-4 mr-2" />
                                New Methodology
                              </Button>
                              <Button variant="outline" className="w-full bg-slate-700 hover:bg-slate-600 text-white border-slate-600">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Sensor Network
                              </Button>
                              <button className="text-emerald-400 text-sm hover:text-emerald-300">View All Projects</button>
                            </div>
                          </div>
                          
                          {/* Main Content */}
                          <div className="flex-1 p-6 overflow-auto">
                            <div className="mb-6">
                              <h1 className="text-2xl font-bold text-white mb-4">Methodology Management</h1>
                              <div className="flex items-center gap-4 mb-6">
                                <div className="relative flex-1">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                  <input 
                                    type="text" 
                                    placeholder="Search methodologies..." 
                                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                                  />
                                </div>
                                <Button variant="outline" className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600">
                                  <Funnel className="w-4 h-4 mr-2" />
                                  Filter
                                </Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                  <Plus className="w-4 h-4 mr-2" />
                                  New Methodology
                                </Button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6">
                              <Card className="bg-slate-700 border-slate-600">
                                <CardContent className="p-6">
                                  <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white">VM0042 - Reforestation & Afforestation</h3>
                                    <Badge className="bg-emerald-600 text-white">Active</Badge>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-4">Associated Projects: Amazon Basin Project, African Savannah Initiative...</p>
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                                      <Database className="w-3 h-3 text-white" />
                                    </div>
                                    <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                                      <Shield className="w-3 h-3 text-white" />
                                    </div>
                                    <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                                      <Zap className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-xs text-slate-400 ml-2">Blockchain Technology</span>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-slate-700 border-slate-600">
                                <CardContent className="p-6">
                                  <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white">REDD+ v3.0</h3>
                                    <Badge className="bg-yellow-600 text-white">Active</Badge>
                                  </div>
                                  <p className="text-slate-300 text-sm mb-4">Measures carbon sequestration through planting native trees...</p>
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
                    
                    {onNavigateToDMRV && (
                      <button 
                        onClick={onNavigateToDMRV}
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-300 font-medium"
                      >
                        <span>Learn more about dMRV Engine</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center">
                      <BarChart3 className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Carbon Credit Protocols Features */}
          <motion.div 
            id="protocols-features"
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-gradient-to-r from-[rgba(10,61,63,0.03)] via-[rgba(27,67,50,0.02)] to-[rgba(236,230,218,0.05)] backdrop-blur-sm shadow-[0_8px_24px_rgba(10,61,63,0.08)]">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1 flex items-center justify-center">
                    <div className="w-32 h-32 bg-secondary/10 rounded-3xl flex items-center justify-center">
                      <Leaf className="w-16 h-16 text-secondary" />
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-medium text-primary">Carbon Credit Protocols</h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Biochar & Rock Weathering protocols</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Afforestation & Regenerative Agriculture</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Blue Carbon & ecosystem restoration</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">3rd party validator integration</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Multi-standard compliance support</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-secondary font-medium mb-6">
                      Support all carbon removal methodologies with verified impact
                    </p>
                    
                    {/* Universal Protocol Suite Mockup */}
                    <div className="relative z-10 p-12 text-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-xl shadow-2xl mb-6">
                      <div className="mb-8">
                        <div className="text-center mb-12">
                          <h2 className="text-2xl font-bold text-slate-900 mb-1">Mālama</h2>
                          <p className="text-lg font-semibold text-slate-800">Universal Protocol Suite</p>
                          <p className="text-sm text-slate-700 mt-2">One framework, many pathways</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-4 hover:bg-slate-700/80 transition-colors">
                            <div className="text-2xl mb-2">🔥</div>
                            <h3 className="text-sm font-semibold text-white mb-1">Biochar</h3>
                            <p className="text-xs text-slate-300">Pre-certification pathways</p>
                          </div>
                          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-4 hover:bg-slate-700/80 transition-colors">
                            <div className="text-2xl mb-2">💎</div>
                            <h3 className="text-sm font-semibold text-white mb-1">Enhanced Rock Weathering</h3>
                            <p className="text-xs text-slate-300">Mineral permanence</p>
                          </div>
                          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-4 hover:bg-slate-700/80 transition-colors">
                            <div className="text-2xl mb-2">🌊</div>
                            <h3 className="text-sm font-semibold text-white mb-1">Blue Carbon</h3>
                            <p className="text-xs text-slate-300">Ecosystem co-benefits</p>
                          </div>
                          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-4 hover:bg-slate-700/80 transition-colors">
                            <div className="text-2xl mb-2">🌱</div>
                            <h3 className="text-sm font-semibold text-white mb-1">Reforestation & Afforestation</h3>
                            <p className="text-xs text-slate-300">Biodiversity & growth</p>
                          </div>
                          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-4 hover:bg-slate-700/80 transition-colors">
                            <div className="text-2xl mb-2">🌾</div>
                            <h3 className="text-sm font-semibold text-white mb-1">Soil Carbon & Regenerative Agriculture</h3>
                            <p className="text-xs text-slate-300">Soil health & yields</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
                          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
                            <p className="text-sm text-slate-300"><span className="text-yellow-400 font-semibold">Digital MRV</span> | Blockchain | Compliance-Grade Integrity</p>
                          </div>
                        </div>
                        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Recognized by Leading Global Standards</h3>
                          <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-600">Verra</div>
                            <div className="bg-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-600">Gold Standard</div>
                            <div className="bg-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-600">American Carbon Registry</div>
                            <div className="bg-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-600">ecoRegistry</div>
                            <div className="bg-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-600">Puro.earth</div>
                            <div className="bg-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-600">PURO</div>
                            <div className="bg-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-600">UNEPPC WIN CA</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {onNavigateToProtocols && (
                      <button 
                        onClick={onNavigateToProtocols}
                        className="flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-300 font-medium"
                      >
                        <span>Learn more about Carbon Protocols</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Carbon Credit Studio Features */}
          <motion.div 
            id="studio-features"
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-gradient-to-r from-[rgba(236,230,218,0.05)] via-[rgba(27,67,50,0.02)] to-[rgba(10,61,63,0.03)] backdrop-blur-sm shadow-[0_8px_24px_rgba(236,230,218,0.1)]">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-accent-foreground rounded-2xl flex items-center justify-center">
                        <Coins className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-medium text-primary">Carbon Credit Studio</h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Automated credit issuance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Smart contract compliance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Marketplace integration</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent-foreground mt-1 flex-shrink-0" />
                        <span className="text-foreground/80">Revenue optimization</span>
                      </div>
                    </div>
                    
                    <p className="text-lg text-accent-foreground font-medium mb-6">
                      Access premium markets for durable carbon removal credits
                    </p>
                    
                    {/* Carbon Credit Studio Financing Mockup */}
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                      <div className="bg-slate-900 rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm font-bold">M</span>
                            </div>
                            <span className="text-white font-semibold text-lg">Mālama</span>
                          </div>
                          <div className="flex items-center gap-6">
                            <h2 className="text-white text-lg font-medium">Carbon Credit Studio: Accelerate Your Financing</h2>
                            <div className="flex items-center gap-3">
                              <Bell className="w-5 h-5 text-slate-400" />
                              <Search className="w-5 h-5 text-slate-400" />
                              <HelpCircle className="w-5 h-5 text-slate-400" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Body */}
                        <div className="flex h-[600px]">
                          {/* Sidebar */}
                          <div className="w-64 bg-slate-800 border-r border-slate-700 p-6">
                            <div className="space-y-4">
                              <div className="text-slate-400 text-sm">Product</div>
                              <div className="text-slate-400 text-sm">Dashboard</div>
                              <div className="bg-emerald-600 text-white px-3 py-2 rounded-lg flex items-center justify-between">
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
                                <CalendarIcon className="w-4 h-4" />
                                <span>Calendar</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-300 text-sm">
                                <FileText className="w-4 h-4" />
                                <span>Documents</span>
                                <Badge className="bg-emerald-600 text-white px-1 py-0.5 text-xs">Active</Badge>
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
                          <div className="flex-1 p-6 overflow-auto">
                            <div className="mb-6">
                              <p className="text-slate-400 text-sm mb-4">Issue & pre-sell durable LC02/VC02 credits on-chain to jumpstart project development</p>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                              <Card className="bg-slate-800 border-slate-700">
                                <CardContent className="p-6">
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                      <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <Ellipsis className="w-5 h-5 text-slate-400" />
                                  </div>
                                  <h3 className="text-2xl font-bold text-white mb-2">$1,250,000 USD</h3>
                                  <p className="text-slate-400 text-sm">Pre-Sale Capital Raised From Credits Pre-Sold On-Chain</p>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-slate-800 border-slate-700">
                                <CardContent className="p-6">
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                                      <CircleIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <Ellipsis className="w-5 h-5 text-slate-400" />
                                  </div>
                                  <h3 className="text-2xl font-bold text-white mb-2">2,000,000 tCO2e</h3>
                                  <p className="text-slate-400 text-sm">Credits Available for Pre-Sale / Issuance Verified Eligible On-Chain Issuance</p>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-slate-800 border-slate-700">
                                <CardContent className="p-6">
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                      <BarChart3 className="w-5 h-5 text-white" />
                                    </div>
                                    <Ellipsis className="w-5 h-5 text-slate-400" />
                                  </div>
                                  <h3 className="text-2xl font-bold text-white mb-2">$32.00 / tCO2e</h3>
                                  <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    <span className="text-emerald-400 text-sm">Premium Market</span>
                                  </div>
                                  <p className="text-slate-400 text-sm">Average Pre-Sale Price / LC02/VC02</p>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6">
                              <Card className="bg-slate-800 border-slate-700">
                                <CardContent className="p-6">
                                  <h3 className="text-lg font-semibold text-white mb-4">Active Pre-Sale Campaigns</h3>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4 text-sm text-slate-400 mb-3">
                                      <div>Campaign Name</div>
                                      <div>Credits Sold</div>
                                      <div>Status</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-slate-700">
                                      <div className="text-white font-medium">Seed Round - Q2 2024</div>
                                      <div className="text-white">64%</div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-white">$102,400</span>
                                        <Badge className="bg-emerald-600 text-white">Open</Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Launch New Pre-Sale Campaign
                                  </Button>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-slate-800 border-slate-700">
                                <CardContent className="p-6">
                                  <h3 className="text-lg font-semibold text-white mb-4">On-Chain Issuance & Verification</h3>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                                      <span className="text-white">Next Issuance Batch: Ready</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                                      <span className="text-white">Connected to [Blockchain Network]</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Eye className="w-5 h-5 text-blue-400" />
                                      <span className="text-blue-400 text-sm">View on-chain transactions</span>
                                    </div>
                                  </div>
                                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                                    Review & Issue Credits
                                  </Button>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {onNavigateToStudio && (
                      <button 
                        onClick={onNavigateToStudio}
                        className="flex items-center gap-2 text-accent-foreground hover:text-primary transition-colors duration-300 font-medium"
                      >
                        <span>Learn more about Carbon Credit Studio</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 bg-accent-foreground/10 rounded-3xl flex items-center justify-center">
                      <Zap className="w-16 h-16 text-accent-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Platform Impact */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Platform Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from our comprehensive carbon removal platform
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">2.3M</div>
              <div className="text-muted-foreground">Carbon Credits Issued</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">450+</div>
              <div className="text-muted-foreground">Projects Tracked</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">25</div>
              <div className="text-muted-foreground">Countries Active</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-medium text-primary mb-2">70%</div>
              <div className="text-muted-foreground">Cost Reduction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Ready to Transform Carbon Markets?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join leading carbon project developers who are scaling durable carbon removal with our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={onStartProject}
                className="hover:scale-105 transition-transform duration-300"
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('https://calendar.app.google/mpPNfQZBixvoCmb18', '_blank')}
                className="hover:scale-105 transition-transform duration-300"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}