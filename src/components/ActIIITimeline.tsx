import React, { useState } from 'react';
import { motion, AnimatePresence } from '../utils/motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, ChevronRight, Globe, Shield, Zap, Leaf, ArrowRight, ExternalLink, Plus } from 'lucide-react';
const MALAMA_LOGO_URL = 'https://fykjijdixtcgjavidmve.supabase.co/storage/v1/object/public/website-assets/logos/logo.png';

interface ActIIITimelineProps {
  onPartnerWithMalama?: () => void;
  onExploreProjects?: () => void;
  onStartJourney?: () => void;
  onBackToLanding?: () => void;
}

export function ActIIITimeline({ 
  onPartnerWithMalama, 
  onExploreProjects, 
  onStartJourney,
  onBackToLanding 
}: ActIIITimelineProps) {
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [mrvSliderValue, setMrvSliderValue] = useState(50);
  const [completedPrinciples, setCompletedPrinciples] = useState<number[]>([]);

  const timelineEntries = [
    {
      year: '2023',
      title: 'Guardian "Phantom Credits" Investigation',
      description: 'Exposed widespread issues with carbon credit quality and verification, leading to industry-wide scrutiny.',
      impact: 'High',
      category: 'Scandal',
      details: 'The investigation revealed that many carbon credits were not delivering the promised environmental benefits, shaking confidence in the voluntary carbon market.'
    },
    {
      year: '2023',
      title: 'ICVCM Core Carbon Principles Release',
      description: 'Established global standards for high-integrity carbon credits to restore market confidence.',
      impact: 'High',
      category: 'Regulation',
      details: 'The Integrity Council for the Voluntary Carbon Market released 10 Core Carbon Principles to ensure carbon credits represent real, additional, and verifiable emissions reductions.'
    },
    {
      year: '2024',
      title: 'Rise of Digital MRV',
      description: 'Satellite monitoring and AI-powered verification revolutionize carbon credit measurement.',
      impact: 'Very High',
      category: 'Technology',
      details: 'Digital Measurement, Reporting, and Verification (dMRV) systems using satellite data, IoT sensors, and machine learning dramatically improve accuracy and reduce costs.'
    },
    {
      year: '2025',
      title: 'SBTi Stricter Corporate Claims Guidance',
      description: 'Science Based Targets initiative tightens rules for corporate carbon neutrality claims.',
      impact: 'High',
      category: 'Regulation',
      details: 'New guidance requires companies to use only high-integrity carbon credits and provides stricter criteria for offsetting claims.'
    }
  ];

  const corePrinciples = [
    {
      id: 1,
      title: 'Additionality',
      description: 'The carbon credit represents emissions reductions that would not have occurred without the carbon market incentive.',
      icon: <Plus className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Permanence',
      description: 'The emissions reductions are maintained for at least 100 years or until atmospheric CO2 concentrations return to safe levels.',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Quantification',
      description: 'The emissions reductions are measured, monitored, and verified using robust methodologies.',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 4,
      title: 'No Double Counting',
      description: 'The emissions reductions are not counted more than once across different carbon accounting systems.',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: 5,
      title: 'Verification',
      description: 'The emissions reductions are independently verified by a third-party auditor.',
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const togglePrinciple = (id: number) => {
    setCompletedPrinciples(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <motion.header 
        className="relative z-50 p-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={MALAMA_LOGO_URL} 
              alt="Mālama Labs" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Act III: Reckoning & Rebirth
              </h1>
              <p className="text-amber-300 text-sm">2022 - Future</p>
            </div>
          </motion.div>
          
          <Button 
            variant="outline"
            onClick={onBackToLanding}
            className="border-white/30 text-white hover:bg-white/10"
          >
            Back to Timeline
          </Button>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Hero Section */}
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            The Great Reckoning
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            After decades of growth, the carbon market faces its moment of truth. 
            Scandals, new technologies, and stricter standards are reshaping the future.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="border-amber-400 text-amber-400 px-4 py-2">
              Digital Revolution
            </Badge>
            <Badge variant="outline" className="border-blue-400 text-blue-400 px-4 py-2">
              Higher Standards
            </Badge>
            <Badge variant="outline" className="border-green-400 text-green-400 px-4 py-2">
              New Hope
            </Badge>
          </div>
        </motion.div>

        {/* Timeline Entries */}
        <div className="space-y-8 mb-20">
          {timelineEntries.map((entry, index) => (
            <motion.div
              key={entry.year + index}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card 
                className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer ${
                  activeYear === entry.year ? 'ring-2 ring-amber-400' : ''
                }`}
                onClick={() => setActiveYear(activeYear === entry.year ? null : entry.year)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl">
                        {entry.year}
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {entry.title}
                        </CardTitle>
                        <p className="text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {entry.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`${
                          entry.impact === 'Very High' ? 'border-red-400 text-red-400' :
                          entry.impact === 'High' ? 'border-orange-400 text-orange-400' :
                          'border-yellow-400 text-yellow-400'
                        }`}
                      >
                        {entry.impact} Impact
                      </Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-400">
                        {entry.category}
                      </Badge>
                      <ChevronRight className={`w-5 h-5 text-white/60 transition-transform ${
                        activeYear === entry.year ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </CardHeader>
                
                <AnimatePresence>
                  {activeYear === entry.year && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0">
                        <p className="text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {entry.details}
                        </p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Interactive MRV Comparison */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                MRV Evolution: From Manual to Digital
              </CardTitle>
              <p className="text-white/70 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                Drag the slider to see how carbon verification has transformed
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mrvSliderValue}
                    onChange={(e) => setMrvSliderValue(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${mrvSliderValue}%, #374151 ${mrvSliderValue}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-white/60 mt-2">
                    <span>Old MRV (Manual, Opaque)</span>
                    <span>New MRV (Satellite, AI, Mālama)</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className={`transition-all duration-500 ${mrvSliderValue < 50 ? 'opacity-100' : 'opacity-50'}`}>
                    <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Traditional MRV
                    </h3>
                    <ul className="space-y-2 text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <li>• Manual data collection</li>
                      <li>• Limited transparency</li>
                      <li>• High costs</li>
                      <li>• Slow verification</li>
                      <li>• Human error prone</li>
                    </ul>
                  </div>
                  
                  <div className={`transition-all duration-500 ${mrvSliderValue >= 50 ? 'opacity-100' : 'opacity-50'}`}>
                    <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Digital MRV (Mālama)
                    </h3>
                    <ul className="space-y-2 text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <li>• Satellite monitoring</li>
                      <li>• AI-powered analysis</li>
                      <li>• Real-time verification</li>
                      <li>• Blockchain transparency</li>
                      <li>• Cost-effective scaling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ICVCM Core Carbon Principles */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                ICVCM Core Carbon Principles
              </CardTitle>
              <p className="text-white/70 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                Click through each principle to understand what makes carbon credits trustworthy
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {corePrinciples.map((principle) => (
                  <motion.div
                    key={principle.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      completedPrinciples.includes(principle.id)
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => togglePrinciple(principle.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-full ${
                        completedPrinciples.includes(principle.id)
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-white/20 text-white'
                      }`}>
                        {principle.icon}
                      </div>
                      <h3 className="text-white font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {principle.title}
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {principle.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {completedPrinciples.length} of {corePrinciples.length} principles completed
                </p>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(completedPrinciples.length / corePrinciples.length) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mālama Case Study Spotlight */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Card className="bg-gradient-to-r from-amber-400/20 to-blue-400/20 backdrop-blur-sm border-amber-400/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Case Study Spotlight: Mālama's Biochar + dMRV Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    The Challenge
                  </h3>
                  <p className="text-white/80 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Traditional biochar carbon projects faced verification challenges, high costs, and limited scalability. 
                    Mālama Labs needed a solution that could scale across Hawaii's diverse agricultural landscape.
                  </p>
                  
                  <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    The Solution
                  </h3>
                  <ul className="space-y-2 text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <li>• Satellite monitoring of biochar application sites</li>
                    <li>• IoT sensors for real-time data collection</li>
                    <li>• AI-powered carbon sequestration modeling</li>
                    <li>• Blockchain-verified carbon credits</li>
                    <li>• Integration with Verra and Gold Standard</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    The Results
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-amber-400">95%</div>
                      <div className="text-white/80 text-sm">Reduction in verification costs</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-amber-400">10x</div>
                      <div className="text-white/80 text-sm">Faster project certification</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-amber-400">100%</div>
                      <div className="text-white/80 text-sm">Transparent data verification</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Join the Carbon Revolution
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            The future of carbon markets is here. Be part of the transformation that's making climate action 
            more transparent, efficient, and impactful than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg"
              onClick={onPartnerWithMalama}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Globe className="w-5 h-5 mr-2" />
              Partner with Mālama
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onExploreProjects}
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Leaf className="w-5 h-5 mr-2" />
              Explore Our Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onStartJourney}
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 font-semibold px-8 py-4 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
