import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { ExternalLink, Video, Calendar, Lock } from 'lucide-react';
import { Button } from '../../ui/button';

export function BuyersSlide05Closing() {
  return (
    <SlideLayout
      title="Join the CO₂.0 Movement"
      subtitle="Access the Next Generation of Carbon Markets"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-8 text-center">
            <Video className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-3">Watch the Overview</h3>
            <p className="text-muted-foreground mb-6">5-minute introduction to Mālama Labs</p>
            <Button 
              onClick={() => window.open('https://youtu.be/nAYsgyyh7cc?si=VdeTGcOkYCdpvOjO', '_blank')}
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Watch Now
            </Button>
          </div>

          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-xl p-8 text-center">
            <Calendar className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-3">Book a Demo</h3>
            <p className="text-muted-foreground mb-6">Schedule time with our team</p>
            <Button 
              onClick={() => window.open('https://calendar.app.google/PjPddjUkZjdxHPqr8', '_blank')}
              variant="secondary"
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 rounded-xl p-8 text-center"
        >
          <Lock className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-3">Investor Portal</h3>
          <p className="text-muted-foreground mb-2">Access detailed financials and documentation</p>
          <p className="text-sm text-muted-foreground mb-6">
            <strong>Access code:</strong> malama2025
          </p>
          <Button 
            onClick={() => window.location.href = '/investors'}
            variant="outline"
            className="w-full max-w-xs mx-auto"
          >
            Access Portal
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-muted-foreground"
        >
          <p className="text-lg font-medium text-primary mb-2">www.malamalabs.com</p>
          <p>tyler@malamalabs.com</p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
