import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { TrendingDown, CheckCircle } from 'lucide-react';

export function BuyersSlide08CaseStudy() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Case Study
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Verified Impact, Lower Cost
        </p>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8 text-center">
          <h3 className="text-xl font-semibold text-primary mb-4">Fortune 1000 Buyer</h3>
          <p className="text-lg text-slate-300 mb-6">
            Pre-purchased <strong className="text-emerald-400">1,000 tons</strong> of biochar carbon removal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 text-center">
            <div className="text-sm text-red-400 font-medium mb-2">Spot Market</div>
            <div className="text-5xl font-bold text-red-400 mb-2">$180</div>
            <div className="text-sm text-slate-400">/ton</div>
            <div className="mt-4 text-2xl font-bold text-red-400">$180,000</div>
            <div className="text-xs text-slate-500 mt-1">Total Cost</div>
          </div>

          <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8 text-center">
            <div className="text-sm text-emerald-400 font-medium mb-2">LCO₂ Price</div>
            <div className="text-5xl font-bold text-emerald-400 mb-2">$125</div>
            <div className="text-sm text-slate-400">/ton</div>
            <div className="mt-4 text-2xl font-bold text-emerald-400">$125,000</div>
            <div className="text-xs text-slate-500 mt-1">Total Cost</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
            <TrendingDown className="w-10 h-10 mx-auto mb-2" />
            <div className="text-4xl font-bold mb-1">31%</div>
            <div className="text-sm">Cost Savings</div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center">
            <CheckCircle className="w-10 h-10 mx-auto mb-2" />
            <div className="text-xl font-bold mb-1">Auto-Converted to VCO₂</div>
            <div className="text-sm">with on-chain proof</div>
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}