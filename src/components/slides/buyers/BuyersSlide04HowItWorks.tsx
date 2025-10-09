import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { Search, BarChart3, DollarSign, CheckCircle, Target } from 'lucide-react';

export function BuyersSlide04HowItWorks() {
  const steps = [
    { icon: Search, title: 'Discover', desc: 'Browse pre-verified carbon projects on Mālama' },
    { icon: BarChart3, title: 'Review', desc: 'Real-time data and methodology-based risk scores' },
    { icon: DollarSign, title: 'Pre-Purchase', desc: 'Buy LCO₂ tokens (discounted early access)' },
    { icon: CheckCircle, title: 'Convert', desc: 'LCO₂ automatically converts to VCO₂ after verification' },
    { icon: Target, title: 'Retire', desc: 'Retire credits instantly with on-chain proof' },
  ];

  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        How It Works
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          From Data to Verified Credits — A Transparent Lifecycle
        </p>

        {/* First row - 3 steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {steps.slice(0, 3).map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Second row - 2 steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {steps.slice(3, 5).map((step, index) => {
            const IconComponent = step.icon;
            const actualIndex = index + 3;
            return (
              <div key={actualIndex} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {actualIndex + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </SlideBody>
    </SlideLayout>
  );
}
