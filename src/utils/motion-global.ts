// Global motion instance to prevent duplicate loading
import { motion as motionLib, AnimatePresence as AnimatePresenceLib } from 'motion/react';

// Create a singleton instance
let motionInstance: typeof motionLib | null = null;
let animatePresenceInstance: typeof AnimatePresenceLib | null = null;

export const motion = motionLib;
export const AnimatePresence = AnimatePresenceLib;

// Prevent duplicate initialization
if (typeof window !== 'undefined') {
  (window as any).__MOTION_LOADED__ = true;
}
