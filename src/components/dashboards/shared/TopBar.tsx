import { motion } from 'motion/react';
import { Badge } from '../ui/badge';

export function TopBar() {
  return (
    <div className="bg-background border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-primary">Mālama Carbon</h1>
                <p className="text-sm text-muted-foreground">Carbon Removal Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Pre-launch Preview
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
