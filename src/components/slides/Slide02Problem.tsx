import { SlideLayout, SlideHeadline, SlideBody, SlideVisual } from './SlideLayout';
import { TrendingDown, AlertCircle } from 'lucide-react';

export function Slide02Problem() {
  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline className="text-red-400">
            Carbon markets are broken.
          </SlideHeadline>

          <SlideBody>
            <p className="mb-6">
              Billions are being spent on unverifiable offsets that lack transparency, consistency, and permanence.
            </p>
            <p className="mb-6">
              The world needs trustable infrastructure—not just promises.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Low Integrity</p>
                  <p className="text-slate-400 text-base">85% of credits fail rigorous verification</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">No Transparency</p>
                  <p className="text-slate-400 text-base">Manual processes, delayed reporting, zero real-time data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">High Costs</p>
                  <p className="text-slate-400 text-base">Developers lose 40-60% of value to middlemen</p>
                </div>
              </div>
            </div>
          </SlideBody>
        </div>

        <SlideVisual>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-primary">Integrity Crisis</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">Verified Credits</span>
                  <span className="text-red-400 font-bold">15%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300">Unverifiable/Low Quality</span>
                  <span className="text-red-400 font-bold">85%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
            <p className="mt-6 text-slate-400 text-sm">
              Source: Nature, Science, Carbon Market Watch (2024)
            </p>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}

