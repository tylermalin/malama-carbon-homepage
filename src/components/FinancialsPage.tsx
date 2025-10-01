import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Users,
  Globe,
  Zap,
  Shield,
  Flame,
  Activity,
  Target,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface FinancialsPageProps {
  onNavigate: (section?: string) => void;
  onContact?: () => void;
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
}

const COLORS = ['#1B4332', '#0A3D3F', '#ECE6DA', '#52B788', '#95D5B2'];

const revenueData = [
  { year: 'Year 1', revenue: 788000, projects: 10, margin: 75 },
  { year: 'Year 2', revenue: 2600000, projects: 30, margin: 78 },
  { year: 'Year 3', revenue: 6200000, projects: 60, margin: 80 },
  { year: 'Year 4', revenue: 12500000, projects: 100, margin: 81 },
  { year: 'Year 5', revenue: 22700000, projects: 150, margin: 82 },
];

const projectionData = [
  { year: 'Year 1', conservative: 0.5, moderate: 0.788, optimistic: 1.2, projects: 10, cashflow: -0.737 },
  { year: 'Year 2', conservative: 1.8, moderate: 2.6, optimistic: 3.5, projects: 30, cashflow: 0.076 },
  { year: 'Year 3', conservative: 4.5, moderate: 6.2, optimistic: 8.5, projects: 60, cashflow: 1.5 },
  { year: 'Year 4', conservative: 9.0, moderate: 12.5, optimistic: 17.0, projects: 100, cashflow: 4.8 },
  { year: 'Year 5', conservative: 16.0, moderate: 22.7, optimistic: 32.0, projects: 150, cashflow: 9.1 },
];

const creditVolumeData = [
  { month: 'Jan', LC02: 5000, VC02: 1200 },
  { month: 'Feb', LC02: 8500, VC02: 2800 },
  { month: 'Mar', LC02: 12000, VC02: 4500 },
  { month: 'Apr', LC02: 18500, VC02: 7200 },
  { month: 'May', LC02: 25000, VC02: 11500 },
  { month: 'Jun', LC02: 35000, VC02: 18000 },
];

const revenueBreakdown = [
  { name: 'LCO₂ Facilitation Fees', value: 60, amount: 472800, margin: 60 },
  { name: 'VCO₂ Platform Fees', value: 40, amount: 315200, margin: 98 },
  { name: 'SaaS Licensing', value: 15, amount: 118200, margin: 95 },
  { name: 'Insurance Premiums', value: 6, amount: 47280, margin: 75 },
];

const keyMetrics = [
  {
    title: 'Year 1 Revenue',
    value: '$788K',
    change: 'Projected',
    trend: 'up',
    icon: DollarSign,
    color: 'primary',
    description: '10 Projects'
  },
  {
    title: 'Year 5 Revenue',
    value: '$22.7M',
    change: 'Projected',
    trend: 'up',
    icon: Coins,
    color: 'secondary',
    description: '150 Projects'
  },
  {
    title: 'LTV/CAC Ratio',
    value: '13.5x',
    change: 'Strong',
    trend: 'up',
    icon: Activity,
    color: 'primary',
    description: 'Unit Economics'
  },
  {
    title: 'Payback Period',
    value: '1.9mo',
    change: 'Fast',
    trend: 'up',
    icon: TrendingUp,
    color: 'secondary',
    description: 'Customer Acquisition'
  }
];

const milestones = [
  {
    quarter: 'Q3 2024',
    title: 'Series A Funding',
    amount: '$12M',
    description: 'Led by Climate Impact Ventures',
    status: 'completed'
  },
  {
    quarter: 'Q4 2024',
    title: 'Platform Launch',
    amount: '1M+ tCO2e',
    description: 'First major credit issuance',
    status: 'completed'
  },
  {
    quarter: 'Q1 2025',
    title: 'Strategic Partnerships',
    amount: '8 Partners',
    description: 'Major compliance buyers onboarded',
    status: 'completed'
  },
  {
    quarter: 'Q2 2025',
    title: 'International Expansion',
    amount: '15 Countries',
    description: 'Global market presence',
    status: 'in-progress'
  },
  {
    quarter: 'Q3 2025',
    title: 'Series B Target',
    amount: '$35M',
    description: 'Scale operations globally',
    status: 'planned'
  },
];

export function FinancialsPage({ onNavigate, onContact, selectedTab: externalSelectedTab, onTabChange }: FinancialsPageProps) {
  const [internalSelectedTab, setInternalSelectedTab] = useState('overview');
  
  // Use external tab if provided, otherwise use internal state
  const selectedTab = externalSelectedTab || internalSelectedTab;
  const setSelectedTab = onTabChange || setInternalSelectedTab;

  // If embedded (has external tab control), render without hero section
  const isEmbedded = externalSelectedTab !== undefined;

  return (
    <div className={isEmbedded ? "w-full" : "min-h-screen bg-background"}>
      {!isEmbedded && (
        <>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
            
            <motion.div 
              className="max-w-7xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Financial Overview 2024-2025
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
                Mālama Carbon
                <br />
                <span className="text-secondary">Financial Performance</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
                Transparent, sustainable growth powering the future of carbon markets
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={onContact}
                >
                  Request Full Report
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => onNavigate()}
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </section>
        </>
      )}

      {/* Key Metrics Grid */}
      {!isEmbedded && (
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-${metric.color}/10`}>
                          <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                        </div>
                        <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span className="text-sm font-semibold">{metric.change}</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-1 text-primary">{metric.value}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{metric.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Financial Dashboard */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Financial Projections</h2>
            <p className="text-muted-foreground">5-Year Path to $22.7M Revenue, Cash-Flow Positive Year 2</p>
          </div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-2 md:grid-cols-4 mb-12 h-auto p-1 bg-muted/50 rounded-lg border border-border/50">
              <TabsTrigger value="overview" className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all hover:bg-background/80">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="revenue" className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all hover:bg-background/80">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Revenue</span>
              </TabsTrigger>
              <TabsTrigger value="projections" className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all hover:bg-background/80">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Projections</span>
              </TabsTrigger>
              <TabsTrigger value="credits" className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all hover:bg-background/80">
                <Coins className="w-4 h-4" />
                <span className="hidden sm:inline">Credits</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8 mt-8">
              {/* Revenue Model */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Revenue Model: Four Streams</CardTitle>
                    <CardDescription>Diversified revenue streams with high-margin SaaS components</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h4 className="font-semibold text-primary mb-2">Stream 1: LCO₂ Facilitation Fees (60% of Year 1)</h4>
                          <p className="text-sm text-muted-foreground mb-2">$75,000 per presale deducted from LCO₂ presale proceeds. Covers onboarding, risk assessment, buyer matching, IoT deployment.</p>
                          <Badge className="bg-primary/10 text-primary border-primary/20">60% gross margin</Badge>
                        </div>
                        <div className="p-4 bg-secondary/5 rounded-lg">
                          <h4 className="font-semibold text-primary mb-2">Stream 2: SaaS Licensing (15% of Year 1)</h4>
                          <p className="text-sm text-muted-foreground mb-2">$12,000/year per active project. Platform access, monitoring dashboard, methodology tools.</p>
                          <Badge className="bg-secondary/10 text-secondary border-secondary/20">95% gross margin</Badge>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h4 className="font-semibold text-primary mb-2">Stream 3: VCO₂ Platform Fees (grows to 40% by Year 5)</h4>
                          <p className="text-sm text-muted-foreground mb-2">7% of verified credit trading value. Applies when VCO₂ trades on secondary market.</p>
                          <Badge className="bg-primary/10 text-primary border-primary/20">98% gross margin</Badge>
                        </div>
                        <div className="p-4 bg-secondary/5 rounded-lg">
                          <h4 className="font-semibold text-primary mb-2">Stream 4: Insurance Premiums (6% of Year 1)</h4>
                          <p className="text-sm text-muted-foreground mb-2">2% of LCO₂ presale GMV. Builds reserve pool for project failures.</p>
                          <Badge className="bg-secondary/10 text-secondary border-secondary/20">75% gross margin after claims</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 5-Year Financial Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">5-Year Financial Summary</CardTitle>
                    <CardDescription>Key metrics and growth trajectory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left py-3 px-4 font-semibold text-primary">Metric</th>
                            <th className="text-right py-3 px-4 font-semibold text-primary">Year 1</th>
                            <th className="text-right py-3 px-4 font-semibold text-primary">Year 2</th>
                            <th className="text-right py-3 px-4 font-semibold text-primary">Year 3</th>
                            <th className="text-right py-3 px-4 font-semibold text-primary">Year 4</th>
                            <th className="text-right py-3 px-4 font-semibold text-primary">Year 5</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          <tr>
                            <td className="py-3 px-4 font-medium">New Projects Closed</td>
                            <td className="text-right py-3 px-4">10</td>
                            <td className="text-right py-3 px-4">30</td>
                            <td className="text-right py-3 px-4">60</td>
                            <td className="text-right py-3 px-4">100</td>
                            <td className="text-right py-3 px-4">150</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium">Net Active Projects</td>
                            <td className="text-right py-3 px-4">10</td>
                            <td className="text-right py-3 px-4">36</td>
                            <td className="text-right py-3 px-4">90</td>
                            <td className="text-right py-3 px-4">180</td>
                            <td className="text-right py-3 px-4">315</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium">Total Revenue</td>
                            <td className="text-right py-3 px-4">$788K</td>
                            <td className="text-right py-3 px-4">$2.6M</td>
                            <td className="text-right py-3 px-4">$6.2M</td>
                            <td className="text-right py-3 px-4">$12.5M</td>
                            <td className="text-right py-3 px-4">$22.7M</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium">YoY Growth</td>
                            <td className="text-right py-3 px-4">-</td>
                            <td className="text-right py-3 px-4">226%</td>
                            <td className="text-right py-3 px-4">142%</td>
                            <td className="text-right py-3 px-4">101%</td>
                            <td className="text-right py-3 px-4">82%</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium">Gross Margin</td>
                            <td className="text-right py-3 px-4">75%</td>
                            <td className="text-right py-3 px-4">78%</td>
                            <td className="text-right py-3 px-4">80%</td>
                            <td className="text-right py-3 px-4">81%</td>
                            <td className="text-right py-3 px-4">82%</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium">Operating Cash Flow</td>
                            <td className="text-right py-3 px-4 text-red-600">($737K)</td>
                            <td className="text-right py-3 px-4 text-green-600">+$76K</td>
                            <td className="text-right py-3 px-4 text-green-600">+$1.5M</td>
                            <td className="text-right py-3 px-4 text-green-600">+$4.8M</td>
                            <td className="text-right py-3 px-4 text-green-600">+$9.1M</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Unit Economics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Unit Economics (Per Project)</CardTitle>
                    <CardDescription>Strong unit economics with fast payback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">$108K</div>
                        <p className="text-sm text-muted-foreground">3-Year LTV</p>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">$8K</div>
                        <p className="text-sm text-muted-foreground">Customer Acquisition Cost</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">13.5x</div>
                        <p className="text-sm text-muted-foreground">LTV / CAC Ratio</p>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">1.9mo</div>
                        <p className="text-sm text-muted-foreground">Payback Period</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Revenue Performance</CardTitle>
                    <CardDescription>Quarterly revenue, costs, and profit trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1B4332" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0A3D3F" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0A3D3F" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ECE6DA" />
                        <XAxis dataKey="month" stroke="#1B4332" />
                        <YAxis stroke="#1B4332" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#FAFAF9', 
                            borderColor: '#1B4332',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#1B4332" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorRevenue)" 
                          name="Revenue ($)"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="profit" 
                          stroke="#0A3D3F" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorProfit)" 
                          name="Profit ($)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="border-2 border-border/50 h-full">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">Revenue Breakdown</CardTitle>
                      <CardDescription>By revenue stream (YTD)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={revenueBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name} (${value}%)`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {revenueBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: any, name: any, props: any) => [
                              `$${props.payload.amount.toLocaleString()}`,
                              `${value}%`
                            ]}
                            contentStyle={{ 
                              backgroundColor: '#FAFAF9', 
                              borderColor: '#1B4332',
                              borderRadius: '8px'
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                      <div className="mt-6 space-y-3">
                        {revenueBreakdown.map((item, index) => (
                          <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              />
                              <span className="text-sm text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-primary">
                              ${(item.amount / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="border-2 border-border/50 h-full">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">Key Milestones</CardTitle>
                      <CardDescription>Growth trajectory & achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {milestones.map((milestone, index) => (
                          <div 
                            key={index}
                            className="relative pl-8 pb-4 border-l-2 border-border last:border-0"
                          >
                            <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${
                              milestone.status === 'completed' 
                                ? 'bg-green-500' 
                                : milestone.status === 'in-progress'
                                ? 'bg-secondary'
                                : 'bg-muted'
                            }`} />
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">{milestone.quarter}</p>
                                <h4 className="font-semibold text-primary">{milestone.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                              </div>
                              <Badge 
                                variant="outline"
                                className={
                                  milestone.status === 'completed'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : milestone.status === 'in-progress'
                                    ? 'bg-secondary/10 text-secondary border-secondary/20'
                                    : 'bg-muted text-muted-foreground'
                                }
                              >
                                {milestone.amount}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Revenue Tab */}
            <TabsContent value="revenue" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Revenue Growth Trajectory</CardTitle>
                    <CardDescription>Quarterly revenue vs. costs comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ECE6DA" />
                        <XAxis dataKey="month" stroke="#1B4332" />
                        <YAxis stroke="#1B4332" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#FAFAF9', 
                            borderColor: '#1B4332',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="revenue" fill="#1B4332" radius={[8, 8, 0, 0]} name="Revenue ($)" />
                        <Bar dataKey="costs" fill="#ECE6DA" radius={[8, 8, 0, 0]} name="Costs ($)" />
                        <Bar dataKey="profit" fill="#0A3D3F" radius={[8, 8, 0, 0]} name="Profit ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Gross Margin',
                    value: '74%',
                    description: 'Industry-leading margins',
                    icon: TrendingUp,
                    trend: '+12%'
                  },
                  {
                    title: 'Operating Efficiency',
                    value: '89%',
                    description: 'Revenue to cost ratio',
                    icon: Activity,
                    trend: '+8%'
                  },
                  {
                    title: 'Customer LTV',
                    value: '$485K',
                    description: 'Average lifetime value',
                    icon: Users,
                    trend: '+35%'
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-primary/10">
                            <stat.icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            {stat.trend}
                          </Badge>
                        </div>
                        <h3 className="text-3xl font-bold mb-2 text-primary">{stat.value}</h3>
                        <p className="text-sm font-medium text-foreground">{stat.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Projections Tab */}
            <TabsContent value="projections" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">5-Year Revenue Projections</CardTitle>
                    <CardDescription>Conservative, moderate, and optimistic scenarios (in millions)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ECE6DA" />
                        <XAxis dataKey="year" stroke="#1B4332" />
                        <YAxis stroke="#1B4332" />
                        <Tooltip 
                          formatter={(value: any) => `$${value}M`}
                          contentStyle={{ 
                            backgroundColor: '#FAFAF9', 
                            borderColor: '#1B4332',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="conservative" 
                          stroke="#ECE6DA" 
                          strokeWidth={3}
                          strokeDasharray="5 5"
                          name="Conservative"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="moderate" 
                          stroke="#1B4332" 
                          strokeWidth={3}
                          name="Moderate"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="optimistic" 
                          stroke="#0A3D3F" 
                          strokeWidth={3}
                          name="Optimistic"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-background">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Growth Drivers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Expanding credit issuance to 500K+ tCO2e annually',
                      'Strategic partnerships with Fortune 500 companies',
                      'International market expansion (30+ countries)',
                      'New product lines: Forestry & Blue Carbon',
                      'Platform technology licensing revenue',
                      'Institutional investor participation'
                    ].map((driver, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{driver}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-2 border-border/50 bg-gradient-to-br from-secondary/5 to-background">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Market Assumptions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Carbon credit prices: $45-75/tCO2e by 2028',
                      'Regulatory compliance mandates accelerating',
                      'Platform fee structure: 8-12% commission',
                      'Customer acquisition cost declining 15% YoY',
                      'Market TAM growing 35% annually',
                      'Technology adoption curve accelerating'
                    ].map((assumption, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{assumption}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Credits Tab */}
            <TabsContent value="credits" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Carbon Credit Volume</CardTitle>
                    <CardDescription>LC02 and VC02 monthly issuance (tCO2e)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={creditVolumeData}>
                        <defs>
                          <linearGradient id="colorLC02" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1B4332" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorVC02" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0A3D3F" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#0A3D3F" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ECE6DA" />
                        <XAxis dataKey="month" stroke="#1B4332" />
                        <YAxis stroke="#1B4332" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#FAFAF9', 
                            borderColor: '#1B4332',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="LC02" 
                          stroke="#1B4332" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorLC02)" 
                          stackId="1"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="VC02" 
                          stroke="#0A3D3F" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorVC02)" 
                          stackId="1"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'LC02 Credits',
                    value: '104K',
                    description: 'Pre-finance credits issued',
                    icon: Coins,
                    color: 'primary',
                    badge: 'Liquid'
                  },
                  {
                    title: 'VC02 Credits',
                    value: '45K',
                    description: 'Verified credits certified',
                    icon: Shield,
                    color: 'secondary',
                    badge: 'Verified'
                  },
                  {
                    title: 'Conversion Rate',
                    value: '43%',
                    description: 'LC02 → VC02 success rate',
                    icon: Zap,
                    color: 'primary',
                    badge: 'Growing'
                  },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className={`border-2 border-${metric.color}/20 bg-gradient-to-br from-${metric.color}/5 to-background`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-${metric.color}/10`}>
                            <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                          </div>
                          <Badge className={`bg-${metric.color}/10 text-${metric.color} border-${metric.color}/20`}>
                            {metric.badge}
                          </Badge>
                        </div>
                        <h3 className="text-3xl font-bold mb-2 text-primary">{metric.value}</h3>
                        <p className="text-sm font-medium text-foreground">{metric.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Investment Highlights */}
      {!isEmbedded && (
        <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                Investment Highlights
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Why Mālama Carbon represents a unique opportunity in the carbon markets
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: 'Global Market Leadership',
                  description: 'Positioned to capture 15% of the biochar carbon credit market by 2027',
                  stat: '$2.8B TAM'
                },
                {
                  icon: Zap,
                  title: 'Technology Moat',
                  description: 'Proprietary dMRV platform with 97% accuracy and blockchain verification',
                  stat: '3 Patents'
                },
                {
                  icon: Shield,
                  title: 'Regulatory Alignment',
                  description: 'Full compliance with Article 6.4 and major carbon registries',
                  stat: '100% Certified'
                },
                {
                  icon: TrendingUp,
                  title: 'Revenue Scalability',
                  description: 'High-margin platform model with decreasing CAC and increasing LTV',
                  stat: '74% Margin'
                },
                {
                  icon: Users,
                  title: 'Strategic Partnerships',
                  description: 'Tier-1 corporate buyers and government partnerships secured',
                  stat: '8 Fortune 500'
                },
                {
                  icon: Flame,
                  title: 'Impact at Scale',
                  description: 'Enabling 10M+ tCO2e removal by 2028 with transparent tracking',
                  stat: '47 Projects'
                },
              ].map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm h-full hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <highlight.icon className="w-6 h-6 text-primary" />
                        </div>
                        <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                          {highlight.stat}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-primary">{highlight.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Valuation & Investor Returns Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Valuation & Investor Returns
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Market-leading valuations and compelling return scenarios for early investors
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Precedent Valuations */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Precedent Valuations</CardTitle>
                  <CardDescription>Market leaders in CDR and carbon markets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { company: 'Pachama', valuation: '$1.2B', stage: 'Series C', year: '2023' },
                      { company: 'Watershed', valuation: '$1.7B', stage: 'Series C', year: '2023' },
                      { company: 'Persefoni', valuation: '$1.1B', stage: 'Series C', year: '2023' },
                      { company: 'Carbon Direct', valuation: '$1.0B', stage: 'Series B', year: '2022' },
                      { company: 'Climeworks', valuation: '$2.0B', stage: 'Series C', year: '2022' },
                    ].map((precedent, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-primary">{precedent.company}</h4>
                          <p className="text-sm text-muted-foreground">{precedent.stage} • {precedent.year}</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {precedent.valuation}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Exit Scenarios */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Our Exit Scenarios & Potential Returns</CardTitle>
                  <CardDescription>Conservative, base, and optimistic projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        scenario: 'Conservative',
                        valuation: '$500M',
                        multiple: '33x',
                        description: 'Market consolidation, steady growth',
                        color: 'bg-blue-50 text-blue-700 border-blue-200'
                      },
                      {
                        scenario: 'Base Case',
                        valuation: '$1.2B',
                        multiple: '80x',
                        description: 'Market leadership, strong partnerships',
                        color: 'bg-green-50 text-green-700 border-green-200'
                      },
                      {
                        scenario: 'Optimistic',
                        valuation: '$2.5B',
                        multiple: '167x',
                        description: 'Global expansion, IPO potential',
                        color: 'bg-purple-50 text-purple-700 border-purple-200'
                      },
                    ].map((scenario, index) => (
                      <div key={index} className="p-6 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-primary">{scenario.scenario}</h4>
                          <Badge className={scenario.color}>
                            {scenario.multiple}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-primary">{scenario.valuation}</span>
                          <span className="text-sm text-muted-foreground">Exit Valuation</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Key Takeaway */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">Key Takeaway</h3>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  Our <strong>$15M valuation cap</strong> represents a <strong>7-15x discount</strong> to current market leaders, 
                  with potential for <strong>33-167x returns</strong> based on precedent transactions. 
                  We're positioned to capture significant market share in the rapidly growing $1.2T carbon removal market.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Investment Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Early Entry Advantage',
                description: '7-15x discount to market leaders',
                icon: TrendingUp,
                stat: '15x Discount'
              },
              {
                title: 'Proven Market',
                description: 'Precedent valuations $1B+',
                icon: Target,
                stat: '$1B+ Precedents'
              },
              {
                title: 'High Growth Potential',
                description: '33-167x return scenarios',
                icon: Zap,
                stat: '167x Max'
              },
              {
                title: 'Market Timing',
                description: 'Carbon markets at inflection point',
                icon: Globe,
                stat: '$1.2T TAM'
              },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <highlight.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                        {highlight.stat}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isEmbedded && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                    Ready to Learn More?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Request our full investor deck and financial model, or schedule a call with our team to discuss partnership opportunities.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" className="group" onClick={onContact}>
                      Contact Investor Relations
                      <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => onNavigate()}>
                      Explore Our Platform
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}