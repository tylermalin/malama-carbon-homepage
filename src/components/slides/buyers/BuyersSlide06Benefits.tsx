import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { CheckCircle, TrendingDown, Shield, Activity, Globe } from 'lucide-react';

export function BuyersSlide06Benefits() {
  const benefits = [
    { icon: CheckCircle, text: 'Early access to verified projects' },
    { icon: Shield, text: 'Transparent, real-time data and risk scoring' },
    { icon: TrendingDown, text: 'Lower cost per ton (20–40% savings)' },
    { icon: Activity, text: 'On-chain traceability and audit-ready reports' },
    { icon: Globe, text: 'Seamless ESG & SDG integration' },
  ];

  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        For Buyers, This Means
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Trusted Access to Transparent, Affordable Climate Action
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