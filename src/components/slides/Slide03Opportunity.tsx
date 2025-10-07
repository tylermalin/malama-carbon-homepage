import { SlideLayout, SlideHeadline, SlideBody, SlideVisual } from './SlideLayout';
import { Globe, TrendingUp, Building2 } from 'lucide-react';

export function Slide03Opportunity() {
  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            The $1 Trillion Carbon Market Needs Better Rails
          </SlideHeadline>

          <SlideBody>
            <p className="mb-6">
              Over 2,000 companies have net-zero pledges, yet less than 5% of credits meet compliance-grade standards.
            </p>
            <p className="mb-6">
              Mālama bridges this gap through verifiable, tokenized carbon removal.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">$1T</div>
                <div className="text-sm text-slate-400">Market Size by 2030</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">2,000+</div>
                <div className="text-sm text-slate-400">Net-Zero Pledges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">95%</div>
                <div className="text-sm text-slate-400">Unmet Demand</div>
              </div>
            </div>
          </SlideBody>
        </div>

        <SlideVisual>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-primary">Global Demand</h3>
              </div>
              <p className="text-slate-300">
                Fortune 500 companies need verifiable removal credits to meet 2030 climate targets
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-primary">Supply Gap</h3>
              </div>
              <p className="text-slate-300">
                Only 5% of current carbon credits meet compliance-grade verification standards
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-primary">Market Growth</h3>
              </div>
              <p className="text-slate-300">
                Voluntary carbon market projected to reach $100B+ annually by 2030
              </p>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}

