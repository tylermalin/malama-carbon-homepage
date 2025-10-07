import { SlideLayout, SlideHeadline, SlideSubtitle, SlideVisual } from './SlideLayout';
import { Rocket, Cpu, Globe, Coins } from 'lucide-react';

export function Slide14Roadmap() {
  const phases = [
    {
      year: '2025',
      title: 'Launch',
      icon: Rocket,
      color: 'from-emerald-500 to-green-600',
      milestones: [
        'Reactor commissioning complete',
        'Puro.earth certification process',
        'First 10 projects onboarded',
        'Platform beta deployment'
      ]
    },
    {
      year: '2026',
      title: 'Scale',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-600',
      milestones: [
        'dMRV Platform full rollout',
        'Expand to 30 projects',
        'AI risk engine production',
        'First VCO₂ credits issued'
      ]
    },
    {
      year: '2027',
      title: 'Global',
      icon: Globe,
      color: 'from-purple-500 to-pink-600',
      milestones: [
        'Universal registry integration',
        'International expansion',
        '100+ active projects',
        'Series A fundraise'
      ]
    },
    {
      year: '2028+',
      title: 'Market Leader',
      icon: Coins,
      color: 'from-orange-500 to-red-600',
      milestones: [
        'Token liquidity established',
        'Multi-methodology support',
        'Enterprise partnerships',
        '$100M+ GMV annually'
      ]
    }
  ];

  return (
    <SlideLayout>
      <div className="text-center mb-12">
        <SlideHeadline>
          From Hawai'i to the World
        </SlideHeadline>
        <SlideSubtitle>
          Building the infrastructure for a $100B+ carbon removal market
        </SlideSubtitle>
      </div>

      <SlideVisual>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:scale-105 transition-transform"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center`}>
                <phase.icon className="w-8 h-8 text-primary" />
              </div>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-1">{phase.year}</div>
                <div className="text-emerald-400 font-semibold">{phase.title}</div>
              </div>

              <ul className="space-y-2">
                {phase.milestones.map((milestone, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span className="text-slate-300">{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
          <div className="text-center">
            <p className="text-slate-300">
              <span className="text-emerald-400 font-bold">Strategic Vision:</span> Build the Bloomberg Terminal for carbon removal—the trusted infrastructure layer for a transparent, verifiable, and scalable carbon economy
            </p>
          </div>
        </div>
      </SlideVisual>
    </SlideLayout>
  );
}

