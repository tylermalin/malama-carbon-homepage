import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { TopBar } from './shared/TopBar';
import { FooterCTA } from './shared/FooterCTA';
import { SampleDataCard } from './shared/SampleDataCard';
import { StatCard } from './shared/StatCard';
import { partnerData } from './data/sampleData';
import { 
  Handshake, 
  Globe, 
  Users, 
  FileText,
  Calendar,
  ExternalLink,
  Cpu,
  MapPin,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface PartnerDashboardProps {
  onBack?: () => void;
}

export function PartnerDashboard({ onBack }: PartnerDashboardProps) {
  const collaborationColumns = [
    { key: 'title', label: 'Title' },
    { key: 'org', label: 'Partner Org' },
    { 
      key: 'focus', 
      label: 'Focus',
      render: (focus: string) => (
        <Badge variant="outline" className="text-xs">
          {focus}
        </Badge>
      )
    }
  ];

  const resourceColumns = [
    { key: 'title', label: 'Title' },
    { 
      key: 'type', 
      label: 'Type',
      render: (type: string) => (
        <Badge variant={type === 'SOP' ? 'default' : 'secondary'}>
          {type}
        </Badge>
      )
    },
    { key: 'updated', label: 'Updated' },
    { 
      key: 'link', 
      label: 'Link',
      render: (link: string) => (
        <Button variant="ghost" size="sm">
          <ExternalLink className="w-4 h-4 mr-1" />
          View
        </Button>
      )
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Ideas': { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' },
      'In Scoping': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'Active': { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      'Completed': { variant: 'outline' as const, className: 'bg-blue-100 text-blue-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline' as const, className: '' };
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </Button>
        )}
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            value={partnerData.stats.active}
            label="Active Collaborations"
            trend={{ value: 1, label: "+1 this month" }}
          />
          <StatCard
            value={partnerData.stats.resources}
            label="Shared Resources"
          />
          <StatCard
            value={partnerData.stats.openCalls}
            label="Open Calls"
            trend={{ value: 1, label: "+1 new" }}
          />
          <StatCard
            value={partnerData.stats.regions}
            label="Regions Engaged"
          />
        </div>

        {/* Collaboration Board */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-6">Collaboration Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(partnerData.collab).map(([status, items]) => (
              <Card key={status} className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-primary capitalize">
                      {status.replace(/([A-Z])/g, ' $1').trim()}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {items.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="p-3 bg-muted/20 rounded-lg">
                        <h4 className="font-medium text-sm text-primary mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{item.org}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.focus}
                        </Badge>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No items
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resource Library */}
        <div className="mb-8">
          <SampleDataCard
            title="Resource Library"
            data={partnerData.resources}
            columns={resourceColumns}
          />
        </div>

        {/* Funding & Grants */}
        <Card className="border-none bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Funding & Grants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partnerData.grants.map((grant, index) => (
                <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-primary">{grant.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      Due {grant.due}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {grant.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <FooterCTA />
    </div>
  );
}
