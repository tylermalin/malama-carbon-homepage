import { SlideLayout, SlideHeadline, SlideBody, SlideVisual } from '../SlideLayout';
import { TrendingDown, AlertCircle } from 'lucide-react';

export function BuyersSlide01Problem() {
  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline className="text-red-400">
            The 99% Lockout
          </SlideHeadline>

          <SlideBody>
            <p className="mb-6 text-xl">
              99% of corporate buyers are locked out of early, high-quality carbon credit deals.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Elite Access Only</p>
                  <p className="text-slate-400 text-base">Only the largest corporations access offtake agreements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Fragmented Markets</p>
                  <p className="text-slate-400 text-base">Most buyers rely on brokers, intermediaries, or fragmented marketplaces</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Trust Crisis</p>
                  <p className="text-slate-400 text-base">Lack of transparency drives price inflation, greenwashing, and reputational risk</p>
                </div>
              </div>
            </div>
          </SlideBody>
        </div>

        <SlideVisual>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-primary">Market Access Crisis</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">Elite Buyers with Access</span>
                  <span className="text-emerald-400 font-bold">1%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '1%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">Locked Out</span>
                  <span className="text-red-400 font-bold">99%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: '99%' }} />
                </div>
              </div>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}
