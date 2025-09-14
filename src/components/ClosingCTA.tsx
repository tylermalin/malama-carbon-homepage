import { motion } from 'motion/react';
import { Button } from './ui/button';

interface ClosingCTAProps {
  onStartProject?: () => void;
  onLandSteward?: () => void;
  onExplorePlatform?: () => void;
  onHowItWorks?: () => void;
}

export function ClosingCTA({ onStartProject, onLandSteward, onExplorePlatform, onHowItWorks }: ClosingCTAProps) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Image with Blue/Aqua Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(16, 185, 129, 0.75) 50%, rgba(6, 182, 212, 0.8) 100%), url('https://images.unsplash.com/photo-1546064125-11154220541f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xjYW5vJTIwbGFuZHNjYXBlJTIwaGF3YWlpfGVufDF8fHx8MTc1NjI3MjkwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-1">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-32 h-32 bg-emerald-400/8 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white font-medium"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Hawaiʻi Grown, Planet Scale
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join us in transforming natural climate solutions with technology that serves the Earth.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            onClick={onStartProject}
            className="bg-white text-primary hover:bg-white/90 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Start Your Project
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onLandSteward}
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            For Land Stewards
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onExplorePlatform}
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Explore the Platform
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onHowItWorks}
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            How It Works
          </Button>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm">
            Ready to scale carbon removal? Let's build the future together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}