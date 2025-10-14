import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from '../utils/motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, ArrowRight, BookOpen, Users, Lightbulb, Globe } from 'lucide-react';
// Removing malamaLogo import since the file doesn't exist

interface ActIGenesisTimelineProps {
  onBackToLanding?: () => void;
  onNextAct?: () => void;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'academic' | 'policy' | 'theory' | 'milestone';
  icon: React.ReactNode;
  image?: string;
}

interface Person {
  name: string;
  title: string;
  bio: string;
  image: string;
  contribution: string;
  years: string;
}

export function ActIGenesisTimeline({ onBackToLanding, onNextAct }: ActIGenesisTimelineProps) {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [activePerson, setActivePerson] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      year: '1960',
      title: 'The Coase Theorem',
      description: 'Ronald Coase publishes "The Problem of Social Cost," introducing the concept that externalities can be efficiently managed through property rights and market mechanisms.',
      category: 'theory',
      icon: <BookOpen className="w-4 h-4" />,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    },
    {
      year: '1968',
      title: 'The Tragedy of the Commons',
      description: 'Garrett Hardin publishes his influential essay, highlighting how shared resources can be overused when individuals act in their own self-interest.',
      category: 'theory',
      icon: <Globe className="w-4 h-4" />,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop'
    },
    {
      year: '1972',
      title: 'Stockholm Conference',
      description: 'The first major international environmental conference establishes the United Nations Environment Programme and puts environmental issues on the global agenda.',
      category: 'policy',
      icon: <Globe className="w-4 h-4" />,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop'
    },
    {
      year: '1988',
      title: 'IPCC Established',
      description: 'The Intergovernmental Panel on Climate Change is created to provide scientific assessments of climate change and its impacts.',
      category: 'milestone',
      icon: <Users className="w-4 h-4" />,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop'
    },
    {
      year: '1990',
      title: 'First IPCC Assessment',
      description: 'The IPCC releases its first assessment report, confirming that human activities are increasing greenhouse gas concentrations.',
      category: 'academic',
      icon: <BookOpen className="w-4 h-4" />,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    },
    {
      year: '1992',
      title: 'Rio Earth Summit',
      description: 'The United Nations Framework Convention on Climate Change is adopted, establishing the foundation for international climate action.',
      category: 'policy',
      icon: <Globe className="w-4 h-4" />,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop'
    },
    {
      year: '1995',
      title: 'Second IPCC Assessment',
      description: 'The IPCC concludes that "the balance of evidence suggests a discernible human influence on global climate," strengthening the scientific consensus.',
      category: 'academic',
      icon: <BookOpen className="w-4 h-4" />,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    },
    {
      year: '1997',
      title: 'Kyoto Protocol',
      description: 'The Kyoto Protocol is adopted, establishing legally binding emission reduction targets for developed countries and introducing market-based mechanisms.',
      category: 'milestone',
      icon: <Lightbulb className="w-4 h-4" />,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop'
    }
  ];

  const keyFigures: Person[] = [
    {
      name: 'Ronald Coase',
      title: 'Nobel Prize Winner, Economist',
      bio: 'British economist who won the Nobel Prize in Economics in 1991. His work on transaction costs and property rights laid the theoretical foundation for market-based environmental solutions.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      contribution: 'Coase Theorem - Property rights and market solutions to externalities',
      years: '1910-2013'
    },
    {
      name: 'Robert Stavins',
      title: 'Environmental Economist, Harvard',
      bio: 'Leading environmental economist and director of the Harvard Environmental Economics Program. Pioneered research on market-based environmental policy instruments.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      contribution: 'Market-based environmental policy design and carbon pricing',
      years: '1958-present'
    },
    {
      name: 'Freeman Dyson',
      title: 'Theoretical Physicist, Institute for Advanced Study',
      bio: 'Renowned physicist who contributed to climate science and advocated for technological solutions to climate change, including carbon capture and geoengineering.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      contribution: 'Climate science and technological solutions to global warming',
      years: '1923-2020'
    }
  ];

  const handleScroll = () => {
    if (timelineRef.current) {
      const scrollLeft = timelineRef.current.scrollLeft;
      const maxScroll = timelineRef.current.scrollWidth - timelineRef.current.clientWidth;
      setScrollPosition(scrollLeft / maxScroll);
    }
  };

  useEffect(() => {
    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('scroll', handleScroll);
      return () => timeline.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'theory': return 'bg-green-100 text-green-800 border-green-200';
      case 'policy': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'academic': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'milestone': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100">
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
              src="https://fykjijdixtcgjavidmve.supabase.co/storage/v1/object/public/website-assets/logos/logo.png"
              alt="Mālama Labs" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Act I: Genesis
              </h1>
              <p className="text-green-600 text-sm">1960 - 1997</p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              onClick={onBackToLanding}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Timeline
            </Button>
            <Button 
              onClick={onNextAct}
              className="bg-green-600 hover:bg-green-700 text-white"
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
            The Academic Foundations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            From theoretical breakthroughs to international policy frameworks, 
            the seeds of carbon markets were planted in academia and nurtured by visionary thinkers.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="border-green-400 text-green-600 px-4 py-2">
              Economic Theory
            </Badge>
            <Badge variant="outline" className="border-blue-400 text-blue-600 px-4 py-2">
              Policy Development
            </Badge>
            <Badge variant="outline" className="border-purple-400 text-purple-600 px-4 py-2">
              Scientific Consensus
            </Badge>
          </div>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Timeline of Key Events
          </h3>
          
          <div 
            ref={timelineRef}
            className="relative overflow-x-auto pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-8 min-w-max">
              {/* Timeline Line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-green-300 via-green-400 to-green-500">
                <motion.div 
                  className="h-full bg-green-600"
                  style={{ width: `${scrollPosition * 100}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${scrollPosition * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className={`w-6 h-6 rounded-full border-4 border-white shadow-lg cursor-pointer z-10 ${
                      activeEvent === event.year ? 'bg-green-600' : 'bg-green-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveEvent(activeEvent === event.year ? null : event.year)}
                  >
                    <div className="w-full h-full rounded-full bg-white/20" />
                  </motion.div>

                  {/* Year Label */}
                  <div className="mt-2 text-sm font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {event.year}
                  </div>

                  {/* Event Card */}
                  <AnimatePresence>
                    {activeEvent === event.year && (
                      <motion.div
                        className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="w-80 bg-white shadow-xl border-0">
                          <CardHeader className="pb-3">
                            <div className="flex items-center space-x-2 mb-2">
                              {event.icon}
                              <Badge className={getCategoryColor(event.category)}>
                                {event.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {event.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {event.description}
                            </p>
                            {event.image && (
                              <div className="mt-3 rounded-lg overflow-hidden">
                                <img 
                                  src={event.image} 
                                  alt={event.title}
                                  className="w-full h-32 object-cover"
                                />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Figures Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Key Figures
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {keyFigures.map((person, index) => (
              <motion.div
                key={person.name}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    activePerson === person.name ? 'ring-2 ring-green-400 shadow-xl' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setActivePerson(activePerson === person.name ? null : person.name)}
                >
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={person.image} 
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {person.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {person.title}
                    </p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {person.years}
                    </p>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {activePerson === person.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                Key Contribution:
                              </h4>
                              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {person.contribution}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                Biography:
                              </h4>
                              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {person.bio}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-gray-50 border-green-200">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                The Foundation is Set
              </h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                By 1997, the theoretical and policy foundations for carbon markets were firmly established. 
                The Kyoto Protocol would soon test these ideas in practice, marking the transition from 
                academic theory to real-world implementation.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={onNextAct}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  Continue to Act II: Promise & Peril
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
