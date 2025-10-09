import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
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
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Built for All Project Types
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          From Farms to Forests — and Everything In Between
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-slate-900" />
                </div>
                <div className="text-3xl mb-2">{type.emoji}</div>
                <h3 className="text-base font-semibold text-primary leading-tight">
                  {type.title}
                </h3>
              </div>
            );
          })}
          
          <div className="bg-slate-800/30 border-2 border-dashed border-slate-600 rounded-xl p-6 text-center flex items-center justify-center">
            <p className="text-slate-500 italic">...and more methodologies coming soon</p>
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}