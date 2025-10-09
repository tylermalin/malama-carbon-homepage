import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { DollarSign, TrendingUp, Coins, ArrowRight } from 'lucide-react';

export function ProjectsSlide05EarlyLiquidity() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Early Liquidity: LCO₂
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Finance Your Project Before Final Verification — Turn verified data into immediate working capital
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg text-slate-300">
              <strong className="text-emerald-400">Access 30–50%</strong> of your projected carbon credit value early
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg text-slate-300">
              <strong className="text-blue-400">Sell or stake LCO₂ tokens</strong> to raise funds and attract buyers
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg text-slate-300">
              <strong className="text-emerald-400">Use as collateral</strong> for loans or to fund equipment, labor, or validation costs
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg text-slate-300">
              As your project is verified, <strong className="text-emerald-400">tokens convert seamlessly into VCO₂ credits</strong>
            </p>
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}