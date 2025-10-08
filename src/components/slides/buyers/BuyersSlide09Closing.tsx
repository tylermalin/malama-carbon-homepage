import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { ExternalLink, Video, Calendar, Lock, Users } from 'lucide-react';
import { Button } from '../../ui/button';

export function BuyersSlide08Closing() {
  return (
    <SlideLayout
      title="Join the CO₂.0 Movement"
      subtitle="Access the Next Generation of Carbon Markets"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-6 text-center">
            <Video className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Watch Overview</h3>
            <p className="text-xs text-muted-foreground mb-4">5-min intro</p>
            <Button 
              onClick={() => window.open('https://youtu.be/nAYsgyyh7cc?si=VdeTGcOkYCdpvOjO', '_blank')}
              size="sm"
              className="w-full"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Watch
            </Button>
          </div>

          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-xl p-6 text-center">
            <Calendar className="w-10 h-10 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Book Demo</h3>
            <p className="text-xs text-muted-foreground mb-4">Schedule call</p>
            <Button 
              onClick={() => window.open('https://calendar.app.google/PjPddjUkZjdxHPqr8', '_blank')}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Book
            </Button>
          </div>

          <div className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 rounded-xl p-6 text-center">
            <Lock className="w-10 h-10 text-accent-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Investor Portal</h3>
            <p className="text-xs text-muted-foreground mb-4">Code: malama2025</p>
            <Button 
              onClick={() => window.location.href = '/investors'}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Access
            </Button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center">
            <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Partner Network</h3>
            <p className="text-xs text-muted-foreground mb-4">Join ecosystem</p>
            <Button 
              onClick={() => window.location.href = '/advisory'}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center space-y-2"
        >
          <p className="text-2xl font-bold text-primary">🌐 www.malamalabs.com</p>
          <p className="text-lg text-muted-foreground">📧 tyler@malamalabs.com</p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
