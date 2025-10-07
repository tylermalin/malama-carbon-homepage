import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
}

export function SlideLayout({ children, className = '' }: SlideLayoutProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center p-12 md:p-20 ${className}`}>
      <div className="max-w-6xl w-full">
        {children}
      </div>
    </div>
  );
}

interface SlideHeadlineProps {
  children: ReactNode;
  className?: string;
}

export function SlideHeadline({ children, className = '' }: SlideHeadlineProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight ${className}`}
    >
      {children}
    </motion.h1>
  );
}

interface SlideSubtitleProps {
  children: ReactNode;
  className?: string;
}

export function SlideSubtitle({ children, className = '' }: SlideSubtitleProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  );
}

interface SlideBodyProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SlideBody({ children, className = '', delay = 0.3 }: SlideBodyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`text-lg md:text-xl text-slate-600 leading-relaxed ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface SlideVisualProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SlideVisual({ children, className = '', delay = 0.4 }: SlideVisualProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

