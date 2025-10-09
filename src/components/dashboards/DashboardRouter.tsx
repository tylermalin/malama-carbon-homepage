import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { StewardDashboard } from './StewardDashboard';
import { DeveloperDashboard } from './DeveloperDashboard';
import { BuyerDashboard } from './BuyerDashboard';
import { PartnerDashboard } from './PartnerDashboard';
import { 
  Leaf, 
  Code, 
  ShoppingCart, 
  Handshake,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

type DashboardType = 'steward' | 'developer' | 'buyer' | 'partner' | null;

interface DashboardRouterProps {
  userType?: DashboardType;
}

const roleTypes = [
  {
    id: 'steward' as DashboardType,
    title: 'Project Developer',
    description: 'Manage land operations and create biochar to earn carbon credits',
    icon: Leaf,
    color: 'bg-primary',
    features: ['Project Management', 'Carbon Credit Earning', 'MRV Tools', 'Mobile Data Upload']
  },
  {
    id: 'developer' as DashboardType,
    title: 'Developer',
    description: 'Build tools on our APIs for carbon measurement and trading',
    icon: Code,
    color: 'bg-secondary',
    features: ['API Access', 'Documentation', 'Dev Community', 'Sandbox Environment']
  },
  {
    id: 'buyer' as DashboardType,
    title: 'Credit Buyer',
    description: 'Purchase verified carbon removal credits with transparency',
    icon: ShoppingCart,
    color: 'bg-accent-foreground',
    features: ['Marketplace Access', 'Portfolio Management', 'Verified Credits', 'Compliance Tools']
  },
  {
    id: 'partner' as DashboardType,
    title: 'Partner',
    description: 'Join our network to scale global carbon removal initiatives',
    icon: Handshake,
    color: 'bg-primary',
    features: ['Collaboration Tools', 'Resource Access', 'Grant Opportunities', 'Strategy Support']
  }
];

export function DashboardRouter({ userType }: DashboardRouterProps) {
  console.log('DashboardRouter received userType:', userType);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardType>(userType || null);

  const selectDashboard = (type: DashboardType) => {
    setSelectedDashboard(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setSelectedDashboard(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedDashboard === 'steward') {
    return <StewardDashboard onBack={goBack} />;
  }

  if (selectedDashboard === 'developer') {
    return <DeveloperDashboard onBack={goBack} />;
  }

  if (selectedDashboard === 'buyer') {
    return <BuyerDashboard onBack={goBack} />;
  }

  if (selectedDashboard === 'partner') {
    return <PartnerDashboard onBack={goBack} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-primary font-medium">
              Get started with Mālama Carbon
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-4xl mx-auto">
              Get started with Mālama Carbon based on your role in the carbon removal ecosystem
            </p>
            
            <div className="bg-muted/20 rounded-xl p-6 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium text-primary">Pre-launch preview with sample data</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Book a call to go deeper into the platform capabilities
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roleTypes.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]"
                  onClick={() => selectDashboard(role.id)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 ${role.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium text-primary">{role.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-foreground/80 mb-6">{role.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm text-foreground/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full group-hover:scale-105 transition-transform duration-300">
                      Enter Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
