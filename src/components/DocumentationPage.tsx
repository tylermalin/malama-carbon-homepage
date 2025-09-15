import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  BookOpen, 
  Code, 
  FileText, 
  Zap, 
  ArrowRight,
  Clock,
  Bell,
  Download,
  Search,
  Filter,
  Bookmark
} from 'lucide-react';

interface DocumentationPageProps {
  onNavigate: (section?: string) => void;
}

export function DocumentationPage({ onNavigate }: DocumentationPageProps) {
  const upcomingSections = [
    {
      title: "Getting Started",
      description: "Quick setup guides and initial configuration",
      icon: Zap,
      status: "In Development",
      eta: "Q1 2025"
    },
    {
      title: "API Reference",
      description: "Complete API documentation with examples",
      icon: Code,
      status: "Coming Soon",
      eta: "Q2 2025"
    },
    {
      title: "Protocol Specifications",
      description: "Detailed carbon sequestration protocol documentation",
      icon: FileText,
      status: "In Development",
      eta: "Q1 2025"
    },
    {
      title: "Integration Guides",
      description: "Platform integration and third-party connections",
      icon: BookOpen,
      status: "Planned",
      eta: "Q2 2025"
    },
    {
      title: "SDK Documentation",
      description: "Software development kits and libraries",
      icon: Code,
      status: "Planned",
      eta: "Q3 2025"
    },
    {
      title: "Best Practices",
      description: "Implementation guidelines and optimization tips",
      icon: Bookmark,
      status: "Coming Soon",
      eta: "Q2 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 text-lg px-6 py-2">
              <BookOpen className="w-5 h-5 mr-2" />
              Documentation Hub
            </Badge>
            
            <h1 className="text-6xl md:text-7xl mb-8 text-primary leading-tight">
              Comprehensive
              <span className="block text-secondary">Platform Documentation</span>
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Everything you need to build, integrate, and optimize with Mālama's 
              carbon sequestration platform. Coming soon with detailed guides, 
              API references, and best practices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => window.open('mailto:hello@malamalabs.com?subject=Documentation Early Access', '_blank')}
                className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
              >
                <Bell className="w-5 h-5 mr-2" />
                Get Notified When Ready
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate()}
                className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
              >
                Back to Platform
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Coming Soon Sections */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6 text-primary">
              What's Coming
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building comprehensive documentation to support every aspect 
              of your carbon sequestration journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 group hover:border-primary/20">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <section.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{section.title}</CardTitle>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge 
                        variant={section.status === 'In Development' ? 'default' : 'secondary'}
                        className="text-sm"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {section.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      {section.description}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      Expected: {section.eta}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Features */}
      <section className="py-20 px-6 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6 text-primary">
              Documentation Features Preview
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of our upcoming documentation platform with 
              these planned features.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl mb-8 text-primary">
                Intelligent Documentation
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Search className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl mb-2 text-primary">AI-Powered Search</h4>
                    <p className="text-muted-foreground">Find exactly what you need with intelligent search across all documentation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Filter className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl mb-2 text-primary">Smart Filtering</h4>
                    <p className="text-muted-foreground">Filter by use case, integration type, or experience level</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Code className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl mb-2 text-primary">Interactive Examples</h4>
                    <p className="text-muted-foreground">Test API calls and see responses directly in the documentation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Download className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl mb-2 text-primary">Offline Access</h4>
                    <p className="text-muted-foreground">Download documentation for offline development</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8 border-2 bg-background">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <span className="text-lg font-medium">API Reference</span>
                    <Badge className="bg-green-500 text-white">Live Examples</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg">
                    <span className="text-lg font-medium">Code Samples</span>
                    <Badge className="bg-blue-500 text-white">Multi-Language</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                    <span className="text-lg font-medium">Tutorials</span>
                    <Badge className="bg-purple-500 text-white">Step-by-Step</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="text-lg font-medium">Troubleshooting</span>
                    <Badge className="bg-orange-500 text-white">AI-Assisted</Badge>
                  </div>
                </div>
              </Card>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-8 text-primary">
              Get Early Access
            </h2>
            
            <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
              Be among the first to access our comprehensive documentation 
              when it launches. Sign up for updates and early access.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={() => window.open('mailto:hello@malamalabs.com?subject=Documentation Early Access Request', '_blank')}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <Bell className="w-6 h-6 mr-3" />
                Request Early Access
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate()}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <BookOpen className="w-6 h-6 mr-3" />
                Explore Platform
              </Button>
            </div>

            <div className="mt-12 p-6 bg-background/80 rounded-2xl border border-border/50">
              <p className="text-lg text-muted-foreground">
                <strong className="text-primary">Developer Preview Available.</strong> Contact us for 
                access to early documentation drafts and beta API endpoints.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}