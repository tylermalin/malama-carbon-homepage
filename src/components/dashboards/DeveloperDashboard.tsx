import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { TopBar } from './shared/TopBar';
import { FooterCTA } from './shared/FooterCTA';
import { SampleDataCard } from './shared/SampleDataCard';
import { StatCard } from './shared/StatCard';
import { developerData } from './data/sampleData';
import { 
  Code, 
  Key, 
  Copy, 
  CheckCircle,
  ExternalLink,
  BookOpen,
  Terminal,
  BarChart3,
  Cpu,
  Globe,
  ArrowLeft
} from 'lucide-react';

interface DeveloperDashboardProps {
  onBack?: () => void;
}

export function DeveloperDashboard({ onBack }: DeveloperDashboardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(developerData.sandbox.keyMasked);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const endpointColumns = [
    { key: 'path', label: 'Endpoint' },
    { key: 'method', label: 'Method' },
    { key: 'desc', label: 'Description' },
    { key: 'limit', label: 'Rate Limit' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status: string) => (
        <Badge variant={status === 'Available' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      )
    }
  ];

  const quickStartSteps = [
    {
      step: 1,
      title: "Get API Key",
      description: "Copy your sandbox credentials below",
      icon: Key
    },
    {
      step: 2,
      title: "Call /mrv/signals",
      description: "Test with sample MRV data",
      icon: BarChart3
    },
    {
      step: 3,
      title: "Render Sample Chart",
      description: "Build your first visualization",
      icon: Cpu
    }
  ];

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
            value={`${(developerData.stats.uptime * 100).toFixed(1)}%`}
            label="API Uptime (preview)"
            trend={{ value: 0.1, label: "+0.1% this week" }}
          />
          <StatCard
            value={developerData.stats.endpoints}
            label="Endpoints Available"
          />
          <StatCard
            value={developerData.stats.sdks.join(', ')}
            label="SDKs"
          />
          <StatCard
            value={developerData.stats.sandboxCallsToday}
            label="Sandbox Calls Today"
            trend={{ value: 15, label: "+15% vs yesterday" }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Start */}
          <div>
            <Card className="border-none bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickStartSteps.map((step) => (
                    <div key={step.step} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Endpoints Table */}
          <div className="lg:col-span-2">
            <SampleDataCard
              title="API Endpoints"
              data={developerData.endpoints}
              columns={endpointColumns}
            />
          </div>
        </div>

        {/* SDK & Docs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                SDK & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Docs
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Code className="w-4 h-4 mr-2" />
                    SDK Library
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• Comprehensive API reference with live examples</p>
                  <p>• Integration guides and best practices</p>
                  <p>• SDK libraries for popular languages</p>
                  <p>• Webhook documentation for real-time updates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sandbox Credentials */}
          <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
                <Key className="w-5 h-5" />
                Sandbox Credentials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    API Key
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={developerData.sandbox.keyMasked}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={copyToClipboard}
                      className="px-3"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• Rate-limited sandbox environment</p>
                  <p>• Test data and mock responses</p>
                  <p>• No real transactions or charges</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FooterCTA />
    </div>
  );
}
