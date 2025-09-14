import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { TopBar } from './shared/TopBar';
import { FooterCTA } from './shared/FooterCTA';
import { SampleDataCard } from './shared/SampleDataCard';
import { ProgressBlock } from './shared/ProgressBlock';
import { StatCard } from './shared/StatCard';
import { buyerData } from './data/sampleData';
import { 
  ShoppingCart, 
  Download, 
  FileText,
  TreePine,
  TrendingUp,
  BarChart3,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface BuyerDashboardProps {
  onBack?: () => void;
}

export function BuyerDashboard({ onBack }: BuyerDashboardProps) {
  const marketColumns = [
    { key: 'project', label: 'Project' },
    { key: 'region', label: 'Region' },
    { key: 'method', label: 'Method' },
    { 
      key: 'verification', 
      label: 'Verification',
      render: (verification: string) => (
        <Badge variant={verification.includes('Puro.earth') ? 'default' : 'secondary'}>
          {verification}
        </Badge>
      )
    },
    { key: 'price', label: 'Price' },
    { key: 'vintage', label: 'Vintage' },
    { 
      key: 'dmrvConfidence', 
      label: 'dMRV Confidence',
      render: (confidence: number) => (
        <span className="text-sm font-medium">
          {Math.round(confidence * 100)}%
        </span>
      )
    }
  ];

  const portfolioColumns = [
    { key: 'holding', label: 'Holdings (tCO₂e)' },
    { key: 'vintage', label: 'Vintage' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status: string) => (
        <Badge variant={status === 'Allocated' ? 'default' : 'outline'}>
          {status}
        </Badge>
      )
    },
    { 
      key: 'proof', 
      label: 'Proof',
      render: (proof: string) => (
        <Button variant="ghost" size="sm">
          <FileText className="w-4 h-4 mr-1" />
          {proof}
        </Button>
      )
    }
  ];

  const portfolioItems = [
    { label: "Portfolio data collected", completed: true },
    { label: "Verification status updated", completed: true },
    { label: "Compliance documentation prepared", completed: false },
    { label: "Third-party audit scheduled", completed: false }
  ];

  const handleExportPDF = () => {
    // Simulate PDF export
    const element = document.createElement('a');
    const file = new Blob(['Sample PDF content - Portfolio Report'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'malama-portfolio-preview.pdf';
    element.click();
  };

  const handleGenerateAttestation = () => {
    // Simulate attestation generation
    const element = document.createElement('a');
    const file = new Blob(['Sample Attestation - Carbon Credit Holdings'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'malama-attestation-preview.txt';
    element.click();
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
            value={buyerData.stats.availableProjects}
            label="Available Projects"
            trend={{ value: 2, label: "+2 this week" }}
          />
          <StatCard
            value={`${buyerData.stats.previewPortfolio.toLocaleString()} tCO₂e`}
            label="Preview Portfolio"
          />
          <StatCard
            value={`$${buyerData.stats.avgPrice}/CORC`}
            label="Avg Price (preview)"
            trend={{ value: -5, label: "-5% vs last month" }}
          />
          <StatCard
            value={buyerData.stats.verifiers.join(', ')}
            label="Verification Mix"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Marketplace Preview */}
          <div className="lg:col-span-2">
            <SampleDataCard
              title="Marketplace Preview"
              data={buyerData.market}
              columns={marketColumns}
            />
          </div>

          {/* Portfolio Snapshot */}
          <div>
            <ProgressBlock
              title="Portfolio Snapshot"
              progress={buyerData.disclosureReadiness * 100}
              items={portfolioItems}
            />
          </div>
        </div>

        {/* Portfolio Holdings */}
        <div className="mb-8">
          <SampleDataCard
            title="Portfolio Holdings"
            data={buyerData.portfolio}
            columns={portfolioColumns}
          />
        </div>

        {/* Compliance & Reporting */}
        <Card className="border-none bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Compliance & Reporting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleExportPDF}
                  className="h-12 hover:scale-105 transition-transform duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Preview PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleGenerateAttestation}
                  className="h-12 hover:scale-105 transition-transform duration-300"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Mock Attestation
                </Button>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-primary mb-1">Note: All exports are illustrative</p>
                    <p className="text-sm text-muted-foreground">
                      These are sample reports for preview purposes. Real compliance documentation 
                      will be available when the platform launches.
                    </p>
                  </div>
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
