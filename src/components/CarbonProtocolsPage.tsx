import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';

interface CarbonProtocolsPageProps {
  onNavigate: (section?: string) => void;
  onStartProject: () => void;
}

export function CarbonProtocolsPage({ 
  onNavigate, 
  onStartProject
}: CarbonProtocolsPageProps) {
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
                <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-medium mb-2">
                  Carbon Protocols
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  Universal Protocol Suite for Durable Carbon Removal
                </p>
              </div>
            </div>
            
            <p className="text-lg text-primary-foreground/90 max-w-3xl">
              Mālama Labs delivers a full spectrum of durable carbon sequestration protocols designed to meet the highest standards of scientific rigor, cultural responsibility, and market trust.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Universal Protocol Suite Image */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Background with stars */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="absolute inset-0 opacity-30">
                      {[...Array(50)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-12 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="mb-8"
                    >
                      {/* Central Hub */}
                      <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">Mālama</h2>
                        <p className="text-lg font-semibold text-slate-800">Universal Protocol Suite</p>
                        <p className="text-sm text-slate-700 mt-2">One framework, many pathways</p>
                      </div>

                      {/* Protocol Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                        {[
                          { name: "Biochar", icon: "🔥", desc: "Pre-certification pathways" },
                          { name: "Enhanced Rock Weathering", icon: "💎", desc: "Mineral permanence" },
                          { name: "Blue Carbon", icon: "🌊", desc: "Ecosystem co-benefits" },
                          { name: "Reforestation & Afforestation", icon: "🌱", desc: "Biodiversity & growth" },
                          { name: "Soil Carbon & Regenerative Agriculture", icon: "🌾", desc: "Soil health & yields" }
                        ].map((protocol, index) => (
                          <motion.div
                            key={protocol.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                            className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-4 hover:bg-slate-700/80 transition-colors"
                          >
                            <div className="text-2xl mb-2">{protocol.icon}</div>
                            <h3 className="text-sm font-semibold text-primary mb-1">{protocol.name}</h3>
                            <p className="text-xs text-slate-300">{protocol.desc}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Key Features */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
                        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
                          <p className="text-sm text-slate-300">
                            <span className="text-yellow-400 font-semibold">Digital MRV</span> | Blockchain | Compliance-Grade Integrity
                          </p>
                        </div>
                      </div>

                      {/* Global Standards */}
                      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-primary mb-4">Recognized by Leading Global Standards</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                          {[
                            "Verra", "Gold Standard", "American Carbon Registry", 
                            "ecoRegistry", "Puro.earth", "PURO", "UNEPPC WIN CA"
                          ].map((standard, index) => (
                            <motion.div
                              key={standard}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                              className="bg-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-600"
                            >
                              {standard}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
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
            {/* Description */}
            <div>
              <h2 className="text-3xl font-medium mb-8 text-primary">Overview</h2>
              <div className="space-y-6 text-foreground">
                <p>
                  Our Universal Protocol Suite empowers project developers to transform ecological restoration into verified, investable climate solutions.
                </p>
                <p>
                  Each protocol—whether for biochar, enhanced rock weathering, blue carbon, reforestation, or regenerative agriculture—is built with compliance-grade integrity at its core. By combining advanced measurement and reporting frameworks with digital monitoring, verification, and blockchain tokenization, Mālama ensures that every ton of carbon removed is permanent, traceable, and market-ready.
                </p>
                <p>
                  Our protocols are compatible with the world's leading certification and registry systems, including Verra, Gold Standard, American Carbon Registry, ecoRegistry, Isometric, Puro.earth, and emerging Article 6.4 frameworks. This guarantees that projects using Mālama's infrastructure can achieve recognition across both voluntary and compliance carbon markets.
                </p>
              </div>
            </div>
            
            {/* Key Features */}
            <div>
              <h2 className="text-3xl font-medium mb-8 text-primary">Key Features</h2>
              <div className="space-y-4">
                {[
                  "Comprehensive Methodologies across land, ocean, soil, and mineral systems",
                  "Digital MRV Integration for real-time monitoring and automated verification",
                  "Registry Compatibility with Verra, Gold Standard, ecoRegistry, American Carbon Registry, Isometric, and others",
                  "Pre-Certification Pathways for faster project financing and market entry",
                  "Permanence & Risk Modeling to safeguard long-term carbon storage",
                  "Tokenized Credit Issuance with immutable chain-of-custody tracking"
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

          {/* Impact & CTA */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-medium mb-6 text-primary">Impact Action</h3>
                <p className="text-foreground mb-8 leading-relaxed">
                  By adopting the Universal Protocol Suite, developers, communities, and investors can move beyond fragmented approaches and participate in a unified, high-integrity framework for durable carbon removal. This accelerates financing, builds buyer confidence, and ensures projects align with both ecological integrity and global compliance standards.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={onStartProject}
                    className="flex-1"
                    size="lg"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('platform')}
                    className="flex-1"
                    size="lg"
                  >
                    Explore Protocols
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
