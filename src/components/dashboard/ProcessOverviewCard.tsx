import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Leaf, Code, ShoppingCart, Handshake, Calendar } from 'lucide-react';
import { getUserProfile, UserRole } from '../../lib/onboardingV2';

interface ProcessOverviewCardProps {
  userId: string;
}

const roleConfig: Record<UserRole, { label: string; icon: typeof Leaf; color: string }> = {
  PROJECT_DEVELOPER: {
    label: 'Project Developer',
    icon: Leaf,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  TECHNOLOGY_DEVELOPER: {
    label: 'Technology Developer',
    icon: Code,
    color: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  CREDIT_BUYER: {
    label: 'Credit Buyer',
    icon: ShoppingCart,
    color: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  PARTNER: {
    label: 'Partner / Collaborator',
    icon: Handshake,
    color: 'bg-orange-100 text-orange-800 border-orange-300'
  }
};

export function ProcessOverviewCard({ userId }: ProcessOverviewCardProps) {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  async function loadProfile() {
    const result = await getUserProfile(userId);
    if (result.success && result.data) {
      setProfile(result.data);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile || !profile.role) {
    return null;
  }

  const roleInfo = roleConfig[profile.role as UserRole];
  const RoleIcon = roleInfo.icon;
  const registrationDate = profile.created_at 
    ? new Date(profile.created_at).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : 'Recently';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Role Badge */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${roleInfo.color} flex items-center justify-center`}>
            <RoleIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{profile.full_name || 'User'}</div>
            <Badge variant="outline" className={roleInfo.color}>
              {roleInfo.label}
            </Badge>
          </div>
        </div>

        {/* Organization */}
        {profile.org_name && (
          <div className="pt-3 border-t">
            <div className="text-sm text-gray-600">Organization</div>
            <div className="font-medium text-gray-900">{profile.org_name}</div>
          </div>
        )}

        {/* Registration Date */}
        <div className={profile.org_name ? '' : 'pt-3 border-t'}>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Joined {registrationDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

