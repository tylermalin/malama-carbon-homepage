/**
 * Questionnaire Todos
 * Shows a card for each incomplete role questionnaire
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  Leaf,
  Code,
  ShoppingCart,
  Handshake
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface QuestionnaireTodosProps {
  userId: string;
  onNavigate: (page: string) => void;
}

interface UserRole {
  id: number;
  role: string;
  questionnaire_completed: boolean;
  added_at: string;
}

const roleIcons = {
  'PROJECT_DEVELOPER': Leaf,
  'TECHNOLOGY_DEVELOPER': Code,
  'CREDIT_BUYER': ShoppingCart,
  'PARTNER': Handshake
};

const roleLabels = {
  'PROJECT_DEVELOPER': 'Project Developer',
  'TECHNOLOGY_DEVELOPER': 'Technology Developer',
  'CREDIT_BUYER': 'Credit Buyer',
  'PARTNER': 'Partner'
};

const rolePaths = {
  'PROJECT_DEVELOPER': 'onboardingV2ProjectDeveloper',
  'TECHNOLOGY_DEVELOPER': 'onboardingV2TechDeveloper',
  'CREDIT_BUYER': 'onboardingV2CreditBuyer',
  'PARTNER': 'onboardingV2Partner'
};

export function QuestionnaireTodos({ userId, onNavigate }: QuestionnaireTodosProps) {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRoles();
  }, [userId]);

  const loadRoles = async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('questionnaire_completed', false)
        .order('added_at', { ascending: true });

      if (error) throw error;
      setUserRoles(data || []);
    } catch (error) {
      console.error('Error loading incomplete roles:', error);
      setUserRoles([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || userRoles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Clock className="w-5 h-5 text-orange-500" />
        Pending Questionnaires
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {userRoles.map((userRole) => {
          const Icon = roleIcons[userRole.role as keyof typeof roleIcons];
          const label = roleLabels[userRole.role as keyof typeof roleLabels];
          const path = rolePaths[userRole.role as keyof typeof rolePaths];

          return (
            <motion.div
              key={userRole.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-orange-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {Icon && <Icon className="w-6 h-6 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {label} Questionnaire
                          </h3>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            Incomplete
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Complete this questionnaire to unlock personalized features and tools for your {label.toLowerCase()} role.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FileText className="w-3 h-3" />
                          <span>Takes ~5 minutes</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => onNavigate(path)}
                      className="bg-orange-600 hover:bg-orange-700 text-white flex-shrink-0"
                    >
                      Complete
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

