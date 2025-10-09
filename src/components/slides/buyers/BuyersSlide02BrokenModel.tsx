import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { X } from 'lucide-react';

export function BuyersSlide02BrokenModel() {
  const problems = [
    { model: 'Broker-led Offtakes', issue: 'Expensive middlemen (20–50% markup)' },
    { model: 'Marketplace Platforms', issue: 'Fragmented, inconsistent data' },
    { model: 'Voluntary Registries', issue: 'Long delays, poor visibility' },
    { model: 'Buyers', issue: 'Pay premiums for unverifiable impact' },
  ];

  return (
    <SlideLayout>
      <SlideHeadline className="text-red-400">
        The Old Model is Broken
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Carbon buying today is costly, opaque, and inefficient
        </p>

        <div className="space-y-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 flex items-center gap-4"
            >
              <X className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-lg text-primary mb-1">{problem.model}</div>
                <div className="text-slate-400">{problem.issue}</div>
              </div>
            </div>
          ))}
        </div>
      </SlideBody>
    </SlideLayout>
  );
}
