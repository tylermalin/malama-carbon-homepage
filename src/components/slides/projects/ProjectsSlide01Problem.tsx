import { SlideLayout, SlideHeadline, SlideBody, SlideVisual } from '../SlideLayout';
import { Clock, AlertCircle } from 'lucide-react';

export function ProjectsSlide01Problem() {
  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline className="text-red-400">
            Projects Locked Out of Liquidity
          </SlideHeadline>

          <SlideBody>
            <p className="mb-6">
              High-impact carbon projects face long verification delays and limited financing.
            </p>
            <p className="mb-6 text-xl font-semibold text-slate-300">
              It can take 12–36 months before a project can issue and sell credits.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Verification Delays</p>
                  <p className="text-slate-400 text-base">Slow and expensive verification processes can take years</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Cash Flow Gap</p>
                  <p className="text-slate-400 text-base">Developers face months or years of zero cash flow before credits issue</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Limited Financing</p>
                  <p className="text-slate-400 text-base">Options limited to elite developers or complex offtake agreements</p>
                </div>
              </div>
            </div>
          </SlideBody>
        </div>

        <SlideVisual>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-primary">Time to Revenue</h3>
            </div>
            <div className="space-y-4 text-center">
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
                <div className="text-5xl font-bold text-red-400 mb-2">12-36</div>
                <div className="text-lg text-slate-300">Months to First Sale</div>
              </div>
              <div className="text-slate-400 text-sm italic">
                Zero cash flow during verification period
              </div>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}
