import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

// Projects slide components
import { ProjectsSlide01Problem } from './slides/projects/ProjectsSlide01Problem';
import { ProjectsSlide02Solution } from './slides/projects/ProjectsSlide02Solution';
import { ProjectsSlide03HowItWorks } from './slides/projects/ProjectsSlide03HowItWorks';
import { ProjectsSlide04Closing } from './slides/projects/ProjectsSlide04Closing';

interface ProjectsPresentationPageProps {
  onNavigate: () => void;
}

export function ProjectsPresentationPage({ onNavigate }: ProjectsPresentationPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    { component: ProjectsSlide01Problem, title: 'The Problem' },
    { component: ProjectsSlide02Solution, title: 'The Solution' },
    { component: ProjectsSlide03HowItWorks, title: 'How It Works' },
    { component: ProjectsSlide04Closing, title: 'Join Us' },
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 z-50 bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={onNavigate}
      >
        <X className="w-5 h-5" />
      </Button>

      {/* Main slide area */}
      <div className="h-full flex items-center justify-center px-4 sm:px-8 py-24">
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
            className="w-full max-w-7xl mx-auto"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 left-6 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        <span className="font-medium text-primary">{currentSlide + 1}</span>
        <span className="mx-1">/</span>
        <span>{slides.length}</span>
      </div>
    </div>
  );
}
