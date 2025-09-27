import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sprout, Network } from 'lucide-react';

interface ValuePropositionProps {
  onExplorePlatform: () => void;
}

export function ValueProposition({ onExplorePlatform }: ValuePropositionProps) {
  return (
    <section className="py-20 px-6 bg-[rgba(190,203,187,0.45)]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl mb-6 text-primary">
            From Planet to Protocol
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We align with trusted standards to pre-certify any durable carbon methodology across major certification platforms. Our Universal dMRV and Climate Intelligence Network automate credit creation, monitoring, and reporting—so projects unlock funding earlier and scale with confidence.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Land & Ocean Stewardship */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-accent/50 p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <Sprout className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl mb-4 text-center text-primary font-bold">Land & Ocean Stewardship</h3>
              <p className="text-center text-muted-foreground text-sm">
                Farmers, foresters, and coastal managers adopt regenerative practices—from soil carbon and reforestation to seaweed and mangroves—creating durable sequestration opportunities while gaining early offtake financing.
              </p>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </motion.div>

          {/* Engineered Solutions */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-secondary/10 p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                  <Network className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl mb-4 text-center text-secondary font-bold">Engineered Solutions</h3>
              <p className="text-center text-muted-foreground text-sm">
                Projects deploying biochar, enhanced weathering, or direct air capture can connect into our system for automated monitoring and pre-certification, accelerating investment readiness.
              </p>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
            </div>
          </motion.div>
          
          {/* Digital Verification */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-primary/10 p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <Network className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl mb-4 text-center text-primary font-bold">Digital Verification</h3>
              <p className="text-center text-muted-foreground text-sm">
                AI-powered sensors, satellite data, and blockchain records ensure immutable tracking—from carbon capture to credit issuance—building trust with investors, buyers, and regulators.
              </p>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            onClick={onExplorePlatform}
            className="hover:scale-105 transition-transform duration-300"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}