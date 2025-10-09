import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { DollarSign, BarChart3, Globe, Shield, TrendingUp } from 'lucide-react';

export function ProjectsSlide08Benefits() {
  const benefits = [
    { icon: DollarSign, text: 'Early liquidity — fund your project immediately' },
    { icon: BarChart3, text: 'Data-backed verification — automate MRV with AI & sensors' },
    { icon: Globe, text: 'Global market access — reach buyers directly via blockchain' },
    { icon: Shield, text: 'Compliance-ready — align with Puro.earth, Isometric, and Article 6.4' },
    { icon: TrendingUp, text: 'Fair economics — shared upside, no upfront cost' },
  ];

  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Benefits for Project Developers
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Faster, Fairer, More Transparent Carbon Project Finance
        </p>

        <div className="space-y-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg text-slate-300 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>
      </SlideBody>
    </SlideLayout>
  );
}