import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Leaf, Code, ShoppingCart, Handshake, ArrowRight } from 'lucide-react';
import { UserRole } from '../../lib/onboardingV2';

interface RoleSelectionV2Props {
  onRoleSelect: (role: UserRole) => void;
}

interface RoleCardData {
  role: UserRole;
  title: string;
  description: string;
  icon: typeof Leaf;
  color: string;
  gradient: string;
  ctaText: string;
}

const roles: RoleCardData[] = [
  {
    role: 'PROJECT_DEVELOPER',
    title: 'Project Developer',
    description: 'Generate and monetize carbon credits via Mālama\'s MRV',
    icon: Leaf,
    color: 'bg-primary',
    gradient: 'from-emerald-500 to-green-600',
    ctaText: 'Get Started as Project Developer'
  },
  {
    role: 'TECHNOLOGY_DEVELOPER',
    title: 'Technology Developer (Builder)',
    description: 'Build with Mālama APIs and smart contracts',
    icon: Code,
    color: 'bg-secondary',
    gradient: 'from-blue-500 to-indigo-600',
    ctaText: 'Build with Mālama APIs'
  },
  {
    role: 'CREDIT_BUYER',
    title: 'Credit Buyer',
    description: 'Purchase verified removals with traceable MRV',
    icon: ShoppingCart,
    color: 'bg-accent-foreground',
    gradient: 'from-purple-500 to-pink-600',
    ctaText: 'Get Started as Credit Buyer'
  },
  {
    role: 'PARTNER',
    title: 'Partner / Collaborator',
    description: 'Scale carbon removal with joint programs',
    icon: Handshake,
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-red-600',
    ctaText: 'Get Started as Partner'
  }
];

export function RoleSelectionV2({ onRoleSelect }: RoleSelectionV2Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your Path
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your role to get started with Mālama Labs. Each path is tailored to your specific needs and goals.
          </p>
        </motion.div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {roles.map((roleData, index) => {
            const Icon = roleData.icon;
            
            return (
              <motion.div
                key={roleData.role}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                  onClick={() => onRoleSelect(roleData.role)}
                >
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-slate-900" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {roleData.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      {roleData.description}
                    </p>

                    {/* CTA Button */}
                    <Button 
                      variant="outline"
                      className="w-full border-2 border-slate-900 text-slate-900 bg-transparent hover:bg-slate-900 hover:text-white transition-all duration-300 group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRoleSelect(roleData.role);
                      }}
                    >
                      {roleData.ctaText}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Not sure which path is right for you?{' '}
            <a href="mailto:contact@malamalabs.com" className="text-primary hover:underline">
              Contact us
            </a>
            {' '}for guidance.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

