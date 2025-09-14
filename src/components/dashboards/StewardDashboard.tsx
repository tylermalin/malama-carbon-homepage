import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { TopBar } from './shared/TopBar';
import { FooterCTA } from './shared/FooterCTA';
import { SampleDataCard } from './shared/SampleDataCard';
import { ProgressBlock } from './shared/ProgressBlock';
import { StatCard } from './shared/StatCard';
import { stewardData } from './data/sampleData';
import { 
  Leaf, 
  MapPin, 
  Activity, 
  Calendar,
  TrendingUp,
  Download,
  BarChart3,
  ArrowLeft
} from 'lucide-react';

interface StewardDashboardProps {
  onBack?: () => void;
}

export function StewardDashboard({ onBack }: StewardDashboardProps) {
  const [priceSensitivity, setPriceSensitivity] = useState([120]);

  const calculateRevenue = (price: number) => {
    const annualCredits = stewardData.stats.projectedAnnualCredits;
    const platformFee = 0.15;
    const netCredits = annualCredits * (1 - platformFee);
    return Math.round(netCredits * price);
  };

  const projectColumns = [
    { key: 'name', label: 'Project' },
    { key: 'tmk', label: 'TMK / Parcel' },
    { key: 'practice', label: 'Practice' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status: string) => (
        <Badge variant={status === 'Verified' ? 'default' : status === 'In Review' ? 'secondary' : 'outline'}>
          {status}
        </Badge>
      )
    },
    { key: 'estCredits', label: 'Est. Credits/yr' },
    { key: 'lastUpdate', label: 'Last Update' }
  ];

  const mrvItems = [
    { label: "Temperature sensors calibrated", completed: true },
    { label: "Soil samples collected", completed: true },
    { label: "Biochar production data logged", completed: false },
    { label: "Third-party verification scheduled", completed: false }
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
            value={`${stewardData.stats.projectedAnnualCredits.toLocaleString()} tCO₂e`}
            label="Projected Annual Credits"
            trend={{ value: 12, label: "+12% vs last year" }}
          />
          <StatCard
            value={stewardData.stats.verifiedPlots}
            label="Verified Plots"
          />
          <StatCard
            value={`${Math.round(stewardData.stats.mrvHealth * 100)}%`}
            label="MRV Health"
            trend={{ value: 5, label: "+5% this month" }}
          />
          <StatCard
            value={stewardData.stats.nextTask}
            label="Next Field Task"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Projects Table */}
          <div className="lg:col-span-2">
            <SampleDataCard
              title="Projects"
              data={stewardData.projects}
              columns={projectColumns}
            />
          </div>

          {/* MRV Snapshot */}
          <div>
            <ProgressBlock
              title="MRV Snapshot"
              progress={stewardData.mrv.completeness * 100}
              items={mrvItems}
            />
          </div>
        </div>

        {/* MRV Signals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stewardData.mrv.signals.map((signal, index) => (
            <Card key={index} className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-primary">{signal.type}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {signal.last7.map((value, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Day {i + 1}</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-2 bg-primary rounded-full"
                          style={{ width: `${(value / Math.max(...signal.last7)) * 100}%` }}
                        />
                        <span className="font-medium">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Earnings Preview */}
        <Card className="border-none bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Earnings Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-primary mb-3 block">
                  Credit Price Sensitivity Analysis
                </label>
                <div className="space-y-4">
                  <Slider
                    value={priceSensitivity}
                    onValueChange={setPriceSensitivity}
                    max={200}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$50/tonne</span>
                    <span className="font-medium text-primary">${priceSensitivity[0]}/tonne</span>
                    <span>$200/tonne</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${calculateRevenue(priceSensitivity[0]).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Revenue</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">
                    {stewardData.stats.projectedAnnualCredits.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Credits Generated</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-foreground">
                    ${Math.round(calculateRevenue(priceSensitivity[0]) / 12).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Average</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <FooterCTA />
    </div>
  );
}
