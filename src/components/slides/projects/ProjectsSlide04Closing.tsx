import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { ExternalLink, Video, Calendar, Mail } from 'lucide-react';
import { Button } from '../../ui/button';

export function ProjectsSlide04Closing() {
  return (
    <SlideLayout
      title="Join Mālama's Developer Network"
      subtitle="Build, Verify, and Finance the Next Generation of Carbon Projects"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-8 text-center">
            <Video className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Watch Overview</h3>
            <p className="text-sm text-muted-foreground mb-6">See how Mālama works</p>
            <Button 
              onClick={() => window.open('https://youtu.be/nAYsgyyh7cc?si=VdeTGcOkYCdpvOjO', '_blank')}
              size="sm"
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Watch
            </Button>
          </div>

          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 rounded-xl p-8 text-center">
            <Calendar className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Developer Session</h3>
            <p className="text-sm text-muted-foreground mb-6">Talk with our team</p>
            <Button 
              onClick={() => window.open('https://calendar.app.google/PjPddjUkZjdxHPqr8', '_blank')}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Book Call
            </Button>
          </div>

          <div className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 rounded-xl p-8 text-center">
            <Mail className="w-12 h-12 text-accent-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Contact Us</h3>
            <p className="text-sm text-muted-foreground mb-6">Reach out directly</p>
            <Button 
              onClick={() => window.location.href = 'mailto:tyler@malamalabs.com'}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Email Team
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-semibold text-primary mb-4">Zero Upfront Costs</h3>
          <p className="text-lg text-muted-foreground mb-2">
            Mālama only earns when your project generates revenue
          </p>
          <p className="text-muted-foreground">
            No cost for project documentation, onboarding, or MRV setup
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center space-y-2"
        >
          <p className="text-2xl font-bold text-primary">www.malamalabs.com</p>
          <p className="text-lg text-muted-foreground">tyler@malamalabs.com</p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
