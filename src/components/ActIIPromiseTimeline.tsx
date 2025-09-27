import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from '../utils/motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, ArrowRight, TrendingUp, Globe, AlertTriangle, BarChart3 } from 'lucide-react';

interface ActIIPromiseTimelineProps {
  onBackToActI?: () => void;
  onNextAct?: () => void;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'policy' | 'market' | 'crisis' | 'breakthrough';
  impact: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
}

interface CDMProject {
  region: string;
  projects: number;
  type: string;
  percentage: number;
  color: string;
}

export function ActIIPromiseTimeline({ onBackToActI, onNextAct }: ActIIPromiseTimelineProps) {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(2005);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(true);

  const timelineEvents: TimelineEvent[] = [
    {
      year: '1997',
      title: 'Kyoto Protocol Signed',
      description: 'The first international agreement with legally binding emission reduction targets and market-based mechanisms.',
      category: 'policy',
      impact: 'high',
      icon: <Globe className="w-4 h-4" />
    },
    {
      year: '2001',
      title: 'US Withdraws from Kyoto',
      description: 'The United States, the world\'s largest emitter, withdraws from the Kyoto Protocol, dealing a major blow to international climate cooperation.',
      category: 'crisis',
      impact: 'high',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      year: '2005',
      title: 'EU ETS Launches',
      description: 'The European Union Emissions Trading System becomes the world\'s first major carbon market, covering 12,000 installations.',
      category: 'market',
      impact: 'high',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      year: '2006',
      title: 'CDM Boom Begins',
      description: 'Clean Development Mechanism projects surge as companies rush to generate carbon credits for compliance and voluntary markets.',
      category: 'market',
      impact: 'high',
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      year: '2008',
      title: 'Financial Crisis Hits',
      description: 'The global financial crisis causes EU ETS carbon prices to crash from €30 to €5 per tonne, exposing market vulnerabilities.',
      category: 'crisis',
      impact: 'high',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      year: '2012',
      title: 'Kyoto Protocol Expires',
      description: 'The first commitment period ends with mixed results, but CDM projects continue to proliferate globally.',
      category: 'policy',
      impact: 'medium',
      icon: <Globe className="w-4 h-4" />
    },
    {
      year: '2015',
      title: 'Paris Agreement',
      description: 'A new global climate agreement is reached, emphasizing voluntary commitments and market-based solutions.',
      category: 'breakthrough',
      impact: 'high',
      icon: <Globe className="w-4 h-4" />
    },
    {
      year: '2020',
      title: 'COVID-19 Market Disruption',
      description: 'The pandemic causes unprecedented volatility in carbon markets, with prices initially crashing then recovering.',
      category: 'crisis',
      impact: 'high',
      icon: <AlertTriangle className="w-4 h-4" />
    }
  ];

  // EU ETS Price Data (simplified)
  const euEtsPrices = [
    { year: 2005, price: 8.5, event: 'Launch' },
    { year: 2006, price: 15.2, event: 'Growth' },
    { year: 2007, price: 22.8, event: 'Peak' },
    { year: 2008, price: 5.1, event: 'Crash' },
    { year: 2009, price: 7.3, event: 'Recovery' },
    { year: 2010, price: 12.4, event: 'Stabilization' },
    { year: 2011, price: 8.9, event: 'Decline' },
    { year: 2012, price: 3.2, event: 'Collapse' }
  ];

  const cdmProjects: CDMProject[] = [
    { region: 'Asia', projects: 2847, type: 'Renewable Energy', percentage: 45, color: 'bg-orange-400' },
    { region: 'Latin America', projects: 1234, type: 'Forestry', percentage: 25, color: 'bg-green-400' },
    { region: 'Africa', projects: 567, type: 'Energy Efficiency', percentage: 15, color: 'bg-blue-400' },
    { region: 'Europe', projects: 234, type: 'Waste Management', percentage: 8, color: 'bg-purple-400' },
    { region: 'Other', projects: 345, type: 'Industrial', percentage: 7, color: 'bg-gray-400' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'policy': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'market': return 'bg-green-100 text-green-800 border-green-200';
      case 'crisis': return 'bg-red-100 text-red-800 border-red-200';
      case 'breakthrough': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const maxPrice = Math.max(...euEtsPrices.map(d => d.price));
  const minPrice = Math.min(...euEtsPrices.map(d => d.price));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <motion.header 
        className="relative z-50 p-6 bg-white/80 backdrop-blur-sm"
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
              src="/images/malama-logo.png"
              alt="Mālama Labs" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Act II: Promise & Peril
              </h1>
              <p className="text-orange-600 text-sm">1997 - 2021</p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              onClick={onBackToActI}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Act I
            </Button>
            <Button 
              onClick={onNextAct}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Next Act
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            The Wild West of Carbon Markets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            From the first major carbon market launch to global expansion and crisis, 
            this era saw both remarkable growth and dramatic volatility.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="border-orange-400 text-orange-600 px-4 py-2">
              Market Growth
            </Badge>
            <Badge variant="outline" className="border-red-400 text-red-600 px-4 py-2">
              Volatility
            </Badge>
            <Badge variant="outline" className="border-blue-400 text-blue-600 px-4 py-2">
              Global Expansion
            </Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline Events */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Key Events Timeline
              </h3>
              
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        activeEvent === event.year ? 'ring-2 ring-orange-400 shadow-xl' : 'hover:shadow-lg'
                      }`}
                      onClick={() => setActiveEvent(activeEvent === event.year ? null : event.year)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                              {event.icon}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                  {event.year}
                                </span>
                                <Badge className={getCategoryColor(event.category)}>
                                  {event.category}
                                </Badge>
                                <span className={`text-sm font-semibold ${getImpactColor(event.impact)}`}>
                                  {event.impact} impact
                                </span>
                              </div>
                              <h4 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                {event.title}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <AnimatePresence>
                        {activeEvent === event.year && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {event.description}
                              </p>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* EU ETS Price Chart */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    EU ETS Price Volatility (2005-2012)
                  </CardTitle>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Click on years to see price changes and major events
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Interactive Chart */}
                    <div className="h-64 flex items-end space-x-2">
                      {euEtsPrices.map((data, index) => (
                        <motion.div
                          key={data.year}
                          className="flex flex-col items-center cursor-pointer group"
                          onClick={() => setSelectedYear(data.year)}
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.div
                            className={`w-8 rounded-t transition-all duration-300 ${
                              selectedYear === data.year 
                                ? 'bg-orange-500' 
                                : 'bg-orange-300 group-hover:bg-orange-400'
                            }`}
                            style={{ 
                              height: `${((data.price - minPrice) / (maxPrice - minPrice)) * 200}px` 
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${((data.price - minPrice) / (maxPrice - minPrice)) * 200}px` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                          <span className="text-xs text-gray-600 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {data.year}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Price Display */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        €{euEtsPrices.find(d => d.year === selectedYear)?.price.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {euEtsPrices.find(d => d.year === selectedYear)?.event}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CDM World Map */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    CDM Project Distribution by Region
                  </CardTitle>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Click on regions to see project type breakdown
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Simplified World Map Visualization */}
                    <div className="space-y-4">
                      {cdmProjects.map((region, index) => (
                        <motion.div
                          key={region.region}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedRegion === region.region 
                              ? 'ring-2 ring-orange-400 bg-orange-50' 
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => setSelectedRegion(selectedRegion === region.region ? null : region.region)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full ${region.color}`} />
                              <span className="font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                {region.region}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                {region.projects.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {region.percentage}%
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Project Type Breakdown */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Project Types
                      </h4>
                      {selectedRegion ? (
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {cdmProjects.find(r => r.region === selectedRegion)?.type} projects in {selectedRegion}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-400 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${cdmProjects.find(r => r.region === selectedRegion)?.percentage}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Click on a region to see project details
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Side Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 sticky top-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    The Wild West of Carbon Markets
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSidePanel(!showSidePanel)}
                  >
                    {showSidePanel ? '−' : '+'}
                  </Button>
                </div>
              </CardHeader>
              
              <AnimatePresence>
                {showSidePanel && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2" />
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              Explosive Growth
                            </h4>
                            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                              CDM projects grew from 0 to over 8,000 in just 15 years, creating a $2.7 billion market.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              Price Volatility
                            </h4>
                            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                              EU ETS prices swung from €30 to €3, exposing the market's vulnerability to external shocks.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              Quality Concerns
                            </h4>
                            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                              Questions emerged about additionality and environmental integrity of many carbon credits.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        {/* Summary Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Lessons from the Wild West
              </h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                This era proved that carbon markets could work at scale, but also revealed critical flaws 
                in design and oversight. The stage was set for a reckoning that would reshape the industry.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={onNextAct}
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
                >
                  Continue to Act III: Reckoning & Rebirth
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
