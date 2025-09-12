import React from 'react';
import { Button } from './ui/button';
import { LogIn, LogOut, User, BarChart3, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { AuthUser } from '../types/auth';

interface NavigationBarProps {
  user: AuthUser | null;
  isOnSubPage: boolean;
  isDashboardActive: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onHome: () => void;
  onDashboard: () => void;
}

export function NavigationBar({
  user,
  isOnSubPage,
  isDashboardActive,
  onSignIn,
  onSignOut,
  onHome,
  onDashboard
}: NavigationBarProps) {
  return (
    <motion.div 
      className="fixed top-0 right-0 z-50 p-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-border/50">
        {isOnSubPage && (
          <Button
            variant="outline"
            size="sm"
            onClick={onHome}
            className="hover:scale-105 transition-transform duration-200"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
        )}
        
        {user ? (
          <>
            <div className="flex items-center gap-2 px-3">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{user.name}</span>
            </div>
            
            <Button
              variant={isDashboardActive ? "default" : "outline"}
              size="sm"
              onClick={onDashboard}
              className="hover:scale-105 transition-transform duration-200"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Dashboard
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onSignOut}
              className="hover:scale-105 transition-transform duration-200"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={onSignIn}
            size="sm"
            className="hover:scale-105 transition-transform duration-200"
          >
            <LogIn className="w-4 h-4 mr-1" />
            Sign In
          </Button>
        )}
      </div>
    </motion.div>
  );
}