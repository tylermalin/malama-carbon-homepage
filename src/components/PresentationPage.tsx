import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

// Slide components
import { Slide01Cover } from './slides/Slide01Cover';
import { Slide02Problem } from './slides/Slide02Problem';
import { Slide03Opportunity } from './slides/Slide03Opportunity';
import { Slide04Mission } from './slides/Slide04Mission';
import { Slide05Solution } from './slides/Slide05Solution';
import { Slide06TechStack } from './slides/Slide06TechStack';
import { Slide07Tokens } from './slides/Slide07Tokens';
import { Slide08Validation } from './slides/Slide08Validation';
import { Slide09Business } from './slides/Slide09Business';
import { Slide10Traction } from './slides/Slide10Traction';
import { Slide11Team } from './slides/Slide11Team';
import { Slide12Financials } from './slides/Slide12Financials';
import { Slide13Funding } from './slides/Slide13Funding';
import { Slide14Roadmap } from './slides/Slide14Roadmap';
import { Slide15Closing } from './slides/Slide15Closing';

interface PresentationPageProps {
  onNavigate: () => void;
  onShowInvestor: () => void;
}

export function PresentationPage({ onNavigate, onShowInvestor }: PresentationPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    { component: Slide01Cover, title: 'Cover' },
    { component: Slide02Problem, title: 'The Problem' },
    { component: Slide03Opportunity, title: 'The Opportunity' },
    { component: Slide04Mission, title: 'Our Mission' },
    { component: Slide05Solution, title: 'The Solution' },
    { component: Slide06TechStack, title: 'Technology Stack' },
    { component: Slide07Tokens, title: 'Token Architecture' },
    { component: Slide08Validation, title: 'Market Validation' },
    { component: Slide09Business, title: 'Business Model' },
    { component: Slide10Traction, title: 'Traction' },
    { component: Slide11Team, title: 'The Team' },
    { component: Slide12Financials, title: 'Financials' },
    { component: Slide13Funding, title: 'Funding Round' },
    { component: Slide14Roadmap, title: 'Roadmap' },
    { component: Slide15Closing, title: 'Join Us' },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') onNavigate();
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 z-50 overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close button */}
      <button
        onClick={onNavigate}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-slate-800/80 hover:bg-slate-900 backdrop-blur-sm transition-colors"
        aria-label="Close presentation"
      >
        <X className="w-6 h-6 text-primary" />
      </button>

      {/* Slide content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full h-full"
          >
            <CurrentSlideComponent onShowInvestor={onShowInvestor} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-50">
        {/* Previous button */}
        <Button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          variant="outline"
          size="icon"
          className="bg-slate-800 border-slate-700 hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed text-white"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </Button>

        {/* Progress indicator */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-emerald-500'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="text-slate-600 text-sm font-medium min-w-16 text-center">
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Next button */}
        <Button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          variant="outline"
          size="icon"
          className="bg-slate-800 border-slate-700 hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed text-white"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </Button>
      </div>

      {/* Slide title indicator */}
      <div className="absolute top-6 left-6 z-40">
        <p className="text-slate-500 text-sm font-medium">
          {slides[currentSlide].title}
        </p>
      </div>
    </div>
  );
}

