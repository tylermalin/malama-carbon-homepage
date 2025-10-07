import { SlideLayout, SlideHeadline, SlideSubtitle, SlideVisual } from './SlideLayout';
import { Shield, Cpu, Coins, Database } from 'lucide-react';

export function Slide06TechStack() {
  const layers = [
    {
      icon: Shield,
      title: 'Risk & Integrity Engine',
      description: 'AI-powered permanence and additionality scoring',
      color: 'from-red-500 to-orange-500',
      borderColor: 'border-red-500/30'
    },
    {
      icon: Cpu,
      title: 'Universal dMRV Platform',
      description: 'Automated verification and certification',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Coins,
      title: 'Token Architecture',
      description: 'LCO₂ and VCO₂ lifecycle management',
      color: 'from-emerald-500 to-green-500',
      borderColor: 'border-emerald-500/30'
    },
    {
      icon: Database,
      title: 'Data Integration Layer',
      description: 'Satellite + IoT + Blockchain',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30'
    }
  ];

  return (
    <SlideLayout>
      <div className="text-center mb-12">
        <SlideHeadline>
          A Four-Layer Infrastructure for High-Integrity Carbon Markets
        </SlideHeadline>
        <SlideSubtitle>
          End-to-end platform from measurement to market
        </SlideSubtitle>
      </div>

      <SlideVisual>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layers.map((layer, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border ${layer.borderColor} hover:scale-105 transition-transform`}
            >
              <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${layer.color} rounded-2xl flex items-center justify-center`}>
                <layer.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-500 font-bold mb-2">LAYER {index + 1}</div>
                <h3 className="text-lg font-bold text-primary mb-3">{layer.title}</h3>
                <p className="text-sm text-slate-400">{layer.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
          <p className="text-center text-slate-300">
            <span className="text-emerald-400 font-bold">Result:</span> Real-time, verifiable carbon removal at scale—bridging finance, verification, and compliance
          </p>
        </div>
      </SlideVisual>
    </SlideLayout>
  );
}

