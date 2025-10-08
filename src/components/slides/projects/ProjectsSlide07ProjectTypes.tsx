import { SlideLayout } from '../SlideLayout';
import { motion } from 'motion/react';
import { Sprout, Trees, Flame, Waves, Factory } from 'lucide-react';

export function ProjectsSlide07ProjectTypes() {
  const projectTypes = [
    { icon: Sprout, emoji: '🌱', title: 'Regenerative Agriculture & Soil Carbon', color: 'from-green-500 to-green-600' },
    { icon: Trees, emoji: '🌳', title: 'Forestry & Reforestation (ARR, IFM)', color: 'from-emerald-500 to-emerald-600' },
    { icon: Flame, emoji: '🪵', title: 'Biochar & Biomass Pyrolysis', color: 'from-orange-500 to-orange-600' },
    { icon: Waves, emoji: '🌊', title: 'Blue Carbon (Mangroves, Seaweed)', color: 'from-blue-500 to-blue-600' },
    { icon: Factory, emoji: '🏭', title: 'Industrial Carbon Removal (DACCS, ERW)', color: 'from-slate-500 to-slate-600' },
  ];

  return (
    <SlideLayout
      title="Built for All Project Types"
      subtitle="From Farms to Forests — and Everything In Between"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-background to-accent/10 border-2 border-border/50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl mb-2">{type.emoji}</div>
                <h3 className="text-base font-semibold text-primary leading-tight">
                  {type.title}
                </h3>
              </motion.div>
            );
          })}
          
          {/* Placeholder for visual balance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-dashed border-primary/30 rounded-xl p-6 text-center flex items-center justify-center"
          >
            <p className="text-muted-foreground italic">...and more methodologies coming soon</p>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
