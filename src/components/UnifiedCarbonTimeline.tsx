import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from '../utils/motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowRight, 
  Globe, 
  BookOpen, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3,
  CheckCircle,
  Shield,
  Zap,
  Leaf
} from 'lucide-react';
const MALAMA_LOGO_URL = 'https://fykjijdixtcgjavidmve.supabase.co/storage/v1/object/public/website-assets/logos/logo.png';

// Interactive components
import PortraitPopover from './PortraitPopover';
import DocumentModal from './DocumentModal';
import QuoteHighlight from './QuoteHighlight';
import WordCloudSimple from './WordCloudSimple';
import EUETSPriceLineChart from './EUETSPriceLineChart';
import BeforeAfterSlider from './BeforeAfterSlider';
import HeadlineGallery from './HeadlineGallery';
import NDCProgress from './NDCProgress';
import CDMProjectHeat from './CDMProjectHeat';
import KPIStatCards from './KPIStatCards';
import CCPChecklist from './CCPChecklist';
import MRVCompareSlider from './MRVCompareSlider';
import SourcesDrawer from './SourcesDrawer';
import { useData } from '../context/DataContext';

interface UnifiedCarbonTimelineProps {
  onBackToHome?: () => void;
  onShowAbout?: () => void;
  onShowProjects?: () => void;
  onShowContact?: () => void;
  onShowGetStarted?: () => void;
}

export function UnifiedCarbonTimeline({
  onBackToHome,
  onShowAbout,
  onShowProjects,
  onShowContact,
  onShowGetStarted
}: UnifiedCarbonTimelineProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { refs } = useData();

  // Timeline data organized by chronological order
  const timelineEvents = [
    // Act I: Genesis (1960-1997)
    {
      year: 1960,
      title: "The Birth of Environmental Economics",
      description: "Ronald Coase publishes 'The Problem of Social Cost,' laying theoretical foundations for market-based environmental solutions.",
      expandedDescription: "Ronald Coase publishes The Problem of Social Cost, arguing that clear property rights and market exchanges can resolve environmental externalities. His ideas ignite the field of environmental economics, reframing pollution from an inevitable byproduct to a cost that can be internalized. Coase's logic plants the intellectual seed for emissions trading and, decades later, carbon markets.",
      context: "Establishes theoretical roots. Every timeline needs this 'origin story.'",
      hookIdeas: ["Interactive portrait of Coase with a 'Did you know?' card explaining externalities", "Short animated diagram of 'polluter pays' logic"],
      category: "genesis",
      icon: Lightbulb,
      color: "from-emerald-500 to-teal-600"
    },
    {
      year: 1972,
      title: "Stockholm Conference",
      description: "First major international environmental conference establishes global environmental governance framework.",
      expandedDescription: "The UN Conference on the Human Environment in Stockholm marks the first global recognition of environmental degradation as a shared international problem. Governments create new ministries of environment and agree on principles of cooperation. The Stockholm Declaration sets a precedent for linking environment and development.",
      context: "First multilateral stage for environmental governance.",
      hookIdeas: ["Scanned images of the Stockholm Declaration", "Timeline scroll showing how many nations created environment ministries after 1972"],
      category: "genesis",
      icon: Globe,
      color: "from-emerald-500 to-teal-600"
    },
    {
      year: 1987,
      title: "Brundtland Report",
      description: "Sustainable development concept introduced, emphasizing intergenerational equity and environmental protection.",
      expandedDescription: "The UN's Our Common Future (Brundtland Report) introduces 'sustainable development,' stressing that meeting present needs must not compromise future generations. It links economic growth, social equity, and environmental stewardship under one framework. This concept becomes a central pillar of international climate discourse.",
      context: "Frames climate change as a development issue, not just environmental.",
      hookIdeas: ["Quote highlight card: 'Sustainable development is development that meets the needs of the present...'", "Interactive word cloud comparing 1987 vs. today's climate vocabulary"],
      category: "genesis",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600"
    },
    {
      year: 1992,
      title: "Rio Earth Summit",
      description: "UN Framework Convention on Climate Change (UNFCCC) established, setting stage for international climate action.",
      expandedDescription: "The UN Earth Summit in Rio de Janeiro produces the UNFCCC, the Convention on Biological Diversity, and Agenda 21. The UNFCCC institutionalizes climate as a global governance issue, leading to future Conferences of the Parties (COPs). It also acknowledges the principle of 'common but differentiated responsibilities.'",
      context: "The starting point for climate diplomacy.",
      hookIdeas: ["Interactive COP map showing how negotiations spread globally after Rio", "Archival footage embed"],
      category: "genesis",
      icon: Globe,
      color: "from-emerald-500 to-teal-600"
    },
    {
      year: 1995,
      title: "IPCC Second Assessment",
      description: "Scientific consensus on human influence on climate change strengthens political will for action.",
      expandedDescription: "The IPCC's Second Assessment Report concludes that 'the balance of evidence suggests a discernible human influence on global climate.' This declaration strengthens political will for binding action. It directly informs negotiations that will lead to the Kyoto Protocol two years later.",
      context: "The scientific trigger for political action.",
      hookIdeas: ["Graph of CO₂ emissions vs. IPCC report quotes", "Toggle between 1990s graphs and modern projections"],
      category: "genesis",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600"
    },

    // Act II: Promise & Peril (1997-2021)
    {
      year: 1997,
      title: "Kyoto Protocol",
      description: "First international agreement with binding emission reduction targets and market mechanisms.",
      expandedDescription: "Kyoto becomes the first treaty to set binding emissions targets for developed countries. It establishes carbon trading through the Clean Development Mechanism (CDM), Joint Implementation (JI), and International Emissions Trading. Despite limited scope, it provides a working template for compliance carbon markets.",
      context: "Birth of compliance markets and offset mechanisms.",
      hookIdeas: ["Treaty map showing Annex I vs. non-Annex I countries", "Mini-explainer animation of CDM/JI"],
      category: "promise",
      icon: TrendingUp,
      color: "from-orange-500 to-red-600"
    },
    {
      year: 2005,
      title: "EU ETS Launch",
      description: "World's first major carbon market begins trading, proving concept but revealing design flaws.",
      expandedDescription: "The EU Emissions Trading System begins trading, covering thousands of facilities. While initial over-allocation of permits causes price volatility, the EU ETS demonstrates that a regional cap-and-trade system is politically and technically feasible. Over time, it becomes the anchor of global carbon pricing.",
      context: "The world's first large-scale carbon market.",
      hookIdeas: ["Interactive price graph (2005 → today)", "Map of EU ETS coverage by sector"],
      category: "promise",
      icon: BarChart3,
      color: "from-orange-500 to-red-600"
    },
    {
      year: 2008,
      title: "CDM Boom",
      description: "Clean Development Mechanism reaches peak with thousands of projects, but quality concerns emerge.",
      expandedDescription: "The CDM reaches its peak, registering over 4,000 projects in 81 countries. Billions of credits are issued, primarily in industrial gas destruction, renewable energy, and forestry. However, quality concerns and uneven benefits emerge, raising questions about additionality and environmental integrity.",
      context: "The boom years of offsets — and first cracks in credibility.",
      hookIdeas: ["World map with hotspots of CDM projects", "Filters for project type"],
      category: "promise",
      icon: Globe,
      color: "from-orange-500 to-red-600"
    },
    {
      year: 2012,
      title: "EU ETS Price Collapse",
      description: "Carbon prices crash to near zero, exposing oversupply and weak governance.",
      expandedDescription: "Oversupply and weak demand drive EU ETS prices down to near zero, undermining incentives for emissions reductions. Simultaneously, the CDM collapses as demand for credits dries up post-2012. Investor confidence wanes, and the credibility of market mechanisms is questioned.",
      context: "Proof that poorly designed markets can fail.",
      hookIdeas: ["Dramatic 'falling line' graph", "Interactive quiz: 'What happens when prices crash?'"],
      category: "peril",
      icon: AlertTriangle,
      color: "from-red-500 to-orange-600"
    },
    {
      year: 2015,
      title: "Paris Agreement",
      description: "New global climate framework with voluntary commitments and enhanced transparency.",
      expandedDescription: "The Paris Agreement unites nearly all countries under voluntary nationally determined contributions (NDCs). Article 6 introduces cooperative approaches and a new crediting mechanism, replacing the CDM. Paris emphasizes transparency, common frameworks, and a goal of limiting warming to well below 2°C.",
      context: "Resets the global climate framework with universal participation.",
      hookIdeas: ["Global pledge map showing NDCs", "Animated infographic of 'ratchet mechanism'"],
      category: "promise",
      icon: Globe,
      color: "from-orange-500 to-red-600"
    },
    {
      year: 2020,
      title: "COVID-19 Impact",
      description: "Pandemic disrupts carbon markets but accelerates digital transformation and remote monitoring.",
      expandedDescription: "The pandemic disrupts supply chains, monitoring visits, and trading activity in carbon markets. At the same time, it accelerates digital innovation, with remote sensing and digital MRV tools gaining traction. Some corporate buyers pause purchases, while others double down on net-zero commitments.",
      context: "A crisis that forces digital adaptation.",
      hookIdeas: ["Before/after slider: field audit vs. satellite dashboard", "Timeline showing dip and rebound in retirements"],
      category: "peril",
      icon: AlertTriangle,
      color: "from-red-500 to-orange-600"
    },

    // Act III: Reckoning & Rebirth (2022-Future)
    {
      year: 2022,
      title: "ICVCM Core Carbon Principles",
      description: "New integrity framework establishes high-quality carbon credit standards.",
      expandedDescription: "The Integrity Council for the Voluntary Carbon Market launches its Core Carbon Principles (CCPs), providing ten foundational rules for what counts as a 'high-integrity' credit. The framework addresses governance, quantification, permanence, and sustainable development safeguards.",
      context: "Sets the new quality baseline for the VCM.",
      hookIdeas: ["Interactive checklist of CCPs", "Hover for plain-language explanation"],
      category: "rebirth",
      icon: Shield,
      color: "from-blue-500 to-indigo-600"
    },
    {
      year: 2023,
      title: "Guardian 'Phantom Credits' Investigation",
      description: "Media exposes widespread quality issues, forcing industry reckoning.",
      expandedDescription: "Investigative journalists from The Guardian and partners claim that over 90% of rainforest credits under Verra may be invalid. The exposé dominates headlines and sparks a crisis of confidence in the VCM. It triggers reforms by standards and pushes buyers to demand transparency.",
      context: "The reckoning moment that forces structural change.",
      hookIdeas: ["News headline gallery", "Slider: 'Before vs After' trust levels"],
      category: "reckoning",
      icon: AlertTriangle,
      color: "from-red-500 to-pink-600"
    },
    {
      year: 2024,
      title: "Digital MRV Revolution",
      description: "Satellite monitoring, AI verification, and blockchain transparency transform carbon markets.",
      expandedDescription: "Technologies including satellites, IoT sensors, AI analysis, and blockchain registries begin to scale in carbon markets. These tools enable real-time monitoring, auditable data trails, and continuous verification. The shift promises to reduce reliance on static baselines and human auditors.",
      context: "The tech-driven pivot toward integrity and transparency.",
      hookIdeas: ["Comparative slider: 'Old MRV vs Digital MRV'", "Animated satellite flyover"],
      category: "rebirth",
      icon: Zap,
      color: "from-blue-500 to-indigo-600"
    },
    {
      year: 2025,
      title: "SBTi Stricter Guidance",
      description: "Corporate climate claims face stricter verification requirements.",
      expandedDescription: "The Science Based Targets initiative tightens rules for corporate claims, requiring deep decarbonization before offsets can be used. High-integrity credits may still be applied to neutralize residuals, but greenwashing loopholes close. This forces corporations to scrutinize the credits they buy.",
      context: "Raises the bar for corporate credibility in the net-zero era.",
      hookIdeas: ["Interactive corporate 'pathway' chart (internal cuts → beyond-value-chain credits)"],
      category: "rebirth",
      icon: CheckCircle,
      color: "from-blue-500 to-indigo-600"
    },
    {
      year: 2026,
      title: "Mālama Labs dMRV Platform",
      description: "Next-generation digital measurement, reporting, and verification transforms nature-based carbon projects.",
      expandedDescription: "Mālama Labs launches a next-generation digital MRV platform, integrating satellite, AI, and blockchain verification for nature-based carbon projects. It standardizes transparent credit issuance across methodologies, reducing disputes over integrity. This demonstrates how regional innovation can set a global precedent.",
      context: "Marks Act III's culmination—tech-enabled, high-integrity carbon markets.",
      hookIdeas: ["Case study spotlight with live demo screenshots", "Animation of data flow from forest sensor → blockchain registry → buyer dashboard"],
      category: "rebirth",
      icon: Leaf,
      color: "from-emerald-500 to-blue-600"
    }
  ];

  const years = Array.from(new Set(timelineEvents.map(event => event.year))).sort((a, b) => a - b);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'genesis': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'promise': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'peril': return 'bg-red-100 text-red-800 border-red-200';
      case 'reckoning': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'rebirth': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'genesis': return 'Genesis';
      case 'promise': return 'Promise';
      case 'peril': return 'Peril';
      case 'reckoning': return 'Reckoning';
      case 'rebirth': return 'Rebirth';
      default: return 'Event';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900">
      {/* Header */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="flex justify-end mb-8">
            <Button
              variant="outline"
              onClick={onBackToHome}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              ← Back to Home
            </Button>
          </div>

              {/* Mālama Labs Logo */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={MALAMA_LOGO_URL}
                  alt="Mālama Labs"
                  className="h-32 w-auto mx-auto"
                />
              </motion.div>

              {/* Main Title */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  The 60-Year Story of
                  <br />
                  <span className="text-amber-600">Carbon Markets</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                  From Theory to Technology: How Carbon Markets Evolved
                </p>
                <div className="flex justify-center mt-4">
                  <SourcesDrawer 
                    citations={refs} 
                    anchorLabel="View Sources" 
                    description="References and sources used throughout this timeline"
                    title="Timeline Sources & References"
                  />
                </div>
              </motion.div>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="relative z-10 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(activeYear === year ? null : year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeYear === year 
                    ? 'bg-amber-500 text-slate-900' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {year}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelineEvents
              .filter(event => !activeYear || event.year === activeYear)
              .map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <motion.div
                    key={`${event.year}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredEvent(`${event.year}-${index}`)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    className="group"
                  >
                    <Card 
                      className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => setExpandedEvent(expandedEvent === `${event.year}-${index}` ? null : `${event.year}-${index}`)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getCategoryColor(event.category)}>
                            {getCategoryLabel(event.category)}
                          </Badge>
                          <span className="text-2xl font-bold text-amber-600">{event.year}</span>
                        </div>
                        <CardTitle className="text-slate-900 text-lg group-hover:text-amber-700 transition-colors">
                          {event.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${event.color}`}>
                            <IconComponent className="w-5 h-5 text-aliceblue" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-slate-500">Click to expand</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Expanded Event Modal */}
      <AnimatePresence>
        {expandedEvent && (() => {
          const [year, index] = expandedEvent.split('-');
          const event = timelineEvents.find(e => e.year === parseInt(year));
          if (!event) return null;
          
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                  style={{ zIndex: 9998 }}
              onClick={() => setExpandedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    style={{ zIndex: 9999 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${event.color}`}>
                        <event.icon className="w-8 h-8 text-aliceblue" />
                      </div>
                      <div>
                        <Badge className={getCategoryColor(event.category)}>
                          {getCategoryLabel(event.category)}
                        </Badge>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">{event.title}</h2>
                        <p className="text-2xl font-bold text-amber-600">{event.year}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedEvent(null)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    {/* Expanded Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Detailed Description</h3>
                      <p className="text-slate-700 leading-relaxed">
                        {event.expandedDescription}
                      </p>
                    </div>

                    {/* Context & Significance */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Context & Significance</h3>
                      <p className="text-slate-700 leading-relaxed">
                        {event.context}
                      </p>
                    </div>


                        {/* Special Interactive Elements for Specific Events */}
                        {event.year === 1960 && (
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Interactive Elements</h3>
                            <div className="space-y-4">
                              <PortraitPopover
                                name="Ronald H. Coase"
                                imageUrl="/src/assets/coase-13431-content-portrait-mobile-tiny.jpg"
                                subtitle="The Problem of Social Cost (1960)"
                                facts={[
                                  "Proposed bargaining under clear property rights.",
                                  "Laid groundwork for market-based environmental policy.",
                                  "Framed externalities as negotiable under clear property rights."
                                ]}
                              />
                              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                                <p className="text-emerald-800 text-sm">
                                  <strong>Externalities:</strong> When the cost or benefit of an activity affects third parties who didn't choose to incur that cost or benefit. Coase argued that with clear property rights, markets can internalize these externalities.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {event.year === 1987 && (
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Interactive Elements</h3>
                            <div className="space-y-4">
                              <QuoteHighlight
                                quote="Sustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs."
                                author="Brundtland Commission"
                                source="Our Common Future (1987)"
                              />
                              <WordCloudSimple
                                items={[
                                  {text:"Sustainable", weight:5},
                                  {text:"Equity", weight:3},
                                  {text:"Stewardship", weight:2},
                                  {text:"Future Generations", weight:4},
                                  {text:"Development", weight:3},
                                  {text:"Environment", weight:2}
                                ]}
                              />
                            </div>
                          </div>
                        )}

                        {event.year === 2012 && (
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Interactive Elements</h3>
                            <div className="space-y-4">
                              <EUETSPriceLineChart
                                data={[
                                  {date:"2008-01-01", price:23},
                                  {date:"2010-06-01", price:15},
                                  {date:"2012-12-01", price:3},
                                  {date:"2018-01-01", price:8},
                                  {date:"2024-01-01", price:80}
                                ]}
                              />
                              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                  <div className="text-3xl">📉</div>
                                  <div>
                                    <p className="text-red-800 font-semibold">EU ETS Price: €30 → €3</p>
                                    <p className="text-red-600 text-sm">What happens when markets are poorly designed?</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {event.year === 2023 && (
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Interactive Elements</h3>
                            <div className="space-y-4">
                              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0">
                                    <img 
                                      src="https://i.guim.co.uk/img/media/8a8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b/0_0_3000_2000/master/3000.jpg?width=300&quality=85&auto=format&fit=max&s=1234567890abcdef" 
                                      alt="Alto Mayo protection forest in Peru" 
                                      className="w-24 h-16 object-cover rounded-lg"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-red-800 mb-2">The Guardian Investigation</h4>
                                    <p className="text-red-700 text-sm mb-3">
                                      "More than 90% of rainforest carbon offsets by biggest certifier are worthless, analysis shows"
                                    </p>
                                    <a 
                                      href="https://www.theguardian.com/environment/2023/jan/18/revealed-forest-carbon-offsets-biggest-provider-worthless-verra-aoe"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                      Read the full investigation →
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <HeadlineGallery
                                items={[
                                  {title:"Investigation alleges 'phantom credits'", outlet:"The Guardian", date:"Jan 2023", url:"https://www.theguardian.com/environment/2023/jan/18/revealed-forest-carbon-offsets-biggest-provider-worthless-verra-aoe"},
                                  {title:"Verra announces rainforest methodology overhaul", outlet:"The Guardian", date:"Mar 2023"},
                                  {title:"Integrity councils set new bar for quality", outlet:"ICVCM", date:"2023"},
                                ]}
                              />
                            </div>
                          </div>
                        )}

                        {event.year === 2024 && (
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Interactive Elements</h3>
                            <div className="space-y-4">
                              <MRVCompareSlider />
                            </div>
                          </div>
                        )}

                        {event.year === 2026 && (
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Interactive Elements</h3>
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                  <img src={malamaLogo} alt="Mālama Labs" className="h-12 w-auto" />
                                  <div>
                                    <p className="text-slate-800 font-semibold">Next-Generation dMRV Platform</p>
                                    <p className="text-slate-600 text-sm">Satellite + AI + Blockchain = Transparent Carbon Credits</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* End Screen & Conversion */}
      <div className="relative z-10 px-6 py-20 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              The Future of Carbon Markets
              <br />
              <span className="text-amber-600">Begins Here</span>
            </h2>
            <p className="text-xl text-slate-700 mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Mālama Labs is building the infrastructure for the high-integrity era.
            </p>

            {/* CTA Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-aliceblue" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">For Developers</h3>
                    <p className="text-slate-600 mb-6">Build the next generation of climate solutions with our APIs and tools.</p>
                    <Button 
                      onClick={onShowGetStarted}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    >
                      Start Building
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <TrendingUp className="w-8 h-8 text-aliceblue" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">For Corporates</h3>
                    <p className="text-slate-600 mb-6">Integrate high-integrity carbon credits into your sustainability strategy.</p>
                    <Button 
                      onClick={onShowContact}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                    >
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-8 h-8 text-aliceblue" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">For Students & Educators</h3>
                    <p className="text-slate-600 mb-6">Access teaching materials and resources about carbon markets.</p>
                    <Button 
                      onClick={onShowContact}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                    >
                      Download Kit
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="border-t border-slate-200 pt-8"
            >
              <div className="flex flex-wrap justify-center gap-8 mb-6">
                <button 
                  onClick={onShowAbout}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={onShowProjects}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Projects
                </button>
                <button 
                  onClick={onShowContact}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Contact
                </button>
                <button 
                  onClick={onShowGetStarted}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Join
                </button>
              </div>
              <p className="text-slate-500 text-sm">
                © 2024 Mālama Labs. Building the future of carbon markets.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
