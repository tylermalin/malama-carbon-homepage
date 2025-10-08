import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { ExternalLink, Video, Calendar, Mail, Lock } from 'lucide-react';
import { Button } from '../../ui/button';

export function ProjectsSlide10Closing() {
  return (
    <SlideLayout
      title="Join Mālama's Developer Network"
      subtitle="Build, Verify, and Finance the Next Generation of Carbon Projects"
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
            <p className="text-sm text-muted-foreground mb-4">5-min introduction</p>
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
            <h3 className="font-semibold text-primary mb-2">Book Session</h3>
            <p className="text-sm text-muted-foreground mb-4">Schedule with team</p>
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
            <Mail className="w-10 h-10 text-accent-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground mb-4">Direct contact</p>
            <Button 
              onClick={() => window.location.href = 'mailto:tyler@malamalabs.com'}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Email
            </Button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center">
            <Lock className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Investor Portal</h3>
            <p className="text-sm text-muted-foreground mb-4">Code: malama2025</p>
            <Button 
              onClick={() => window.location.href = '/investors'}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Access
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-primary mb-3">Zero Upfront Costs</h3>
          <p className="text-lg text-muted-foreground">
            Mālama only earns when your project generates revenue — aligning our success with yours
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center space-y-2"
        >
          <p className="text-2xl font-bold text-primary">🌐 www.malamalabs.com</p>
          <p className="text-lg text-muted-foreground">📧 tyler@malamalabs.com</p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
