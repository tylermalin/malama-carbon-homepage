import { SlideLayout, SlideHeadline, SlideBody, SlideVisual } from './SlideLayout';
import { ArrowRight, Coins, CheckCircle2 } from 'lucide-react';

export function Slide07Tokens() {
  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline>
            LCO₂ → VCO₂ Lifecycle
          </SlideHeadline>

          <SlideBody>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-bold text-blue-400">LCO₂ (Liquid Carbon)</h3>
                </div>
                <p className="text-slate-300 mb-2">
                  Pre-finance tokenized carbon futures
                </p>
                <p className="text-sm text-slate-400">
                  Enables early project financing before verification is complete
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500" />
                  <ArrowRight className="w-6 h-6 text-emerald-400" />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xl font-bold text-slate-300">dMRV Verification</h3>
                </div>
                <p className="text-slate-300 mb-2">
                  Automated monitoring confirms sequestration
                </p>
                <p className="text-sm text-slate-400">
                  Real-time data validation through IoT + satellite + AI
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500" />
                  <ArrowRight className="w-6 h-6 text-green-400" />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xl font-bold text-emerald-400">VCO₂ (Verified Carbon)</h3>
                </div>
                <p className="text-slate-300 mb-2">
                  Verified carbon credits issued on-chain
                </p>
                <p className="text-sm text-slate-400">
                  Compliance-grade, tradable, and liquid
                </p>
              </div>
            </div>
          </SlideBody>
        </div>

        <SlideVisual>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-primary mb-6">Key Benefits</h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-primary font-bold mb-2">Early Financing</h4>
                <p className="text-slate-400 text-sm">
                  Developers access capital immediately through LCO₂ pre-sales
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="text-primary font-bold mb-2">Maintained Liquidity</h4>
                <p className="text-slate-400 text-sm">
                  Buyers can trade LCO₂ tokens during verification period
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-primary font-bold mb-2">Risk Mitigation</h4>
                <p className="text-slate-400 text-sm">
                  Insurance reserve covers verification shortfalls
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-primary font-bold mb-2">Compliance Grade</h4>
                <p className="text-slate-400 text-sm">
                  VCO₂ meets Article 6.4, Verra, and Gold Standard requirements
                </p>
              </div>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}

