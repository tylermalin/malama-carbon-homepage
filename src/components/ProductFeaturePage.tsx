import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface ProductFeaturePageProps {
  onNavigate: (section?: string) => void;
  onStartProject: () => void;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export function ProductFeaturePage({ 
  onNavigate, 
  onStartProject, 
  title, 
  subtitle, 
  description, 
  features,
  icon: Icon 
}: ProductFeaturePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              variant="ghost"
              onClick={() => onNavigate()}
              className="mb-6 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-medium mb-2">
                  {title}
                </h1>
                <p className="text-xl text-primary-foreground/80">
                  {subtitle}
                </p>
              </div>
            </div>
            
            <p className="text-lg text-primary-foreground/90 max-w-3xl">
              {description}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Features List */}
            <div>
              <h2 className="text-3xl font-medium mb-8 text-primary">Key Features</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* CTA Card */}
            <Card className="bg-muted/50 border-none">
              <CardContent className="p-8">
                <h3 className="text-2xl font-medium mb-4 text-primary">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join Mālama Carbon's platform and start building your durable carbon removal project today.
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={onStartProject}
                    className="w-full"
                    size="lg"
                  >
                    Start Your Project
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate()}
                    className="w-full"
                    size="lg"
                  >
                    Learn More About Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Additional Information */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-card p-8 rounded-2xl border max-w-4xl mx-auto">
              <h3 className="text-2xl font-medium mb-4 text-primary">
                Learn More
              </h3>
              <p className="text-muted-foreground">
                This feature is part of Mālama Carbon's comprehensive platform for durable carbon removal. 
                Contact our team to learn more about implementation and pricing.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}