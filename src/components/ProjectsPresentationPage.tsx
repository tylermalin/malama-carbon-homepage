import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

// Projects slide components
import { ProjectsSlide01Problem } from './slides/projects/ProjectsSlide01Problem';
import { ProjectsSlide02Opportunity } from './slides/projects/ProjectsSlide02Opportunity';
import { ProjectsSlide03Solution } from './slides/projects/ProjectsSlide03Solution';
import { ProjectsSlide04HowItWorks } from './slides/projects/ProjectsSlide04HowItWorks';
import { ProjectsSlide05EarlyLiquidity } from './slides/projects/ProjectsSlide05EarlyLiquidity';
import { ProjectsSlide06ZeroCost } from './slides/projects/ProjectsSlide06ZeroCost';
import { ProjectsSlide07ProjectTypes } from './slides/projects/ProjectsSlide07ProjectTypes';
import { ProjectsSlide08Benefits } from './slides/projects/ProjectsSlide08Benefits';
import { ProjectsSlide09Community } from './slides/projects/ProjectsSlide09Community';
import { ProjectsSlide10Closing } from './slides/projects/ProjectsSlide10Closing';

interface ProjectsPresentationPageProps {
  onNavigate: () => void;
}

export function ProjectsPresentationPage({ onNavigate }: ProjectsPresentationPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    { component: ProjectsSlide01Problem, title: 'The Problem' },
    { component: ProjectsSlide02Opportunity, title: 'The Opportunity' },
    { component: ProjectsSlide03Solution, title: 'The Solution' },
    { component: ProjectsSlide04HowItWorks, title: 'How It Works' },
    { component: ProjectsSlide05EarlyLiquidity, title: 'Early Liquidity' },
    { component: ProjectsSlide06ZeroCost, title: 'Zero Upfront Costs' },
    { component: ProjectsSlide07ProjectTypes, title: 'Project Types' },
    { component: ProjectsSlide08Benefits, title: 'Benefits' },
    { component: ProjectsSlide09Community, title: 'Empowering Communities' },
    { component: ProjectsSlide10Closing, title: 'Join Us' },
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
            <CurrentSlideComponent />
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