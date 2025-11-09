import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { IdahoPilotContactForm } from './IdahoPilotContactForm';
import { ArrowLeft, MapPin } from 'lucide-react';

interface IdahoPilotRegistrationPageProps {
  onNavigate: (section?: string) => void;
}

export function IdahoPilotRegistrationPage({ onNavigate }: IdahoPilotRegistrationPageProps) {
  const handleSuccess = () => {
    // Show success for a moment, then navigate back to Idaho pilot page
    setTimeout(() => {
      onNavigate('idaho-pilot');
    }, 3000);
  };

  const handleCancel = () => {
    onNavigate('idaho-pilot');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <section className="py-6 px-6 border-b border-border/50 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/10 dark:to-blue-950/10">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('idaho-pilot')}
            className="hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Idaho Pilot Info
          </Button>
        </div>
      </section>

      {/* Page Header */}
      <section className="py-12 px-6 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-emerald-950/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 text-base px-4 py-2">
              <MapPin className="w-4 h-4 mr-2" />
              Idaho Pilot Project 2026
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Apply for the Idaho Rock Weathering Pilot
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join Idaho's pioneering enhanced rock weathering program. Complete the application below 
              to check your eligibility and start your journey toward stronger soils and climate impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <IdahoPilotContactForm 
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer Help Text */}
      <section className="py-12 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4 text-primary">Need Help?</h3>
          <p className="text-muted-foreground mb-6">
            If you have questions about the application or the program, feel free to reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="mailto:idaho@malamaproject.org">
                Email: idaho@malamaproject.org
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+12623302790">
                Phone: (262) 330-2790
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


