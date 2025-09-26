import React, { createContext, useContext, useEffect } from 'react';
import { motion as motionLib, AnimatePresence as AnimatePresenceLib } from 'motion/react';

// Create a context to ensure single motion instance
const MotionContext = createContext<{
  motion: typeof motionLib;
  AnimatePresence: typeof AnimatePresenceLib;
} | null>(null);

// Prevent duplicate loading
if (typeof window !== 'undefined') {
  if ((window as any).__MOTION_LOADED__) {
    console.warn('Motion already loaded, preventing duplicate loading');
  } else {
    (window as any).__MOTION_LOADED__ = true;
  }
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure motion is only loaded once
    if (typeof window !== 'undefined') {
      (window as any).__MOTION_LOADED__ = true;
    }
  }, []);

  return (
    <MotionContext.Provider value={{ motion: motionLib, AnimatePresence: AnimatePresenceLib }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within MotionProvider');
  }
  return context;
}
