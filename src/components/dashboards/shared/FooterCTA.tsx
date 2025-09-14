import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Calendar, Mail, X } from 'lucide-react';
import { ScheduleCallModal } from './ScheduleCallModal';
import { LaunchUpdatesModal } from './LaunchUpdatesModal';

export function FooterCTA() {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showUpdatesModal, setShowUpdatesModal] = useState(false);

  return (
    <>
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              This is a pre-launch preview with sample data. Book a call to explore the full platform or get notified when we launch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => setShowScheduleModal(true)}
                className="hover:scale-105 transition-transform duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowUpdatesModal(true)}
                className="hover:scale-105 transition-transform duration-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get Launch Updates
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ScheduleCallModal 
        isOpen={showScheduleModal} 
        onClose={() => setShowScheduleModal(false)} 
      />
      <LaunchUpdatesModal 
        isOpen={showUpdatesModal} 
        onClose={() => setShowUpdatesModal(false)} 
      />
    </>
  );
}
