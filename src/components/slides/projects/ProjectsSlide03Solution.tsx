import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { Zap, TrendingUp, Shield } from 'lucide-react';

export function ProjectsSlide03Solution() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        The Mālama Solution: CO₂.0
      </SlideHeadline>

      <SlideBody>
        <p className="mb-12 text-slate-300 text-center text-xl">
          Early Liquidity + Verified Data = Climate Finance for All
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <Zap className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-3">Integrated dMRV</h3>
            <p className="text-slate-400">
              Digital measurement, reporting, and verification powered by sensors, satellite data, and AI
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-3">Risk-Adjusted Scoring</h3>
            <p className="text-slate-400">
              Liquidity Score based on verified inputs determines early financing eligibility
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <Shield className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-3">LCO₂ Tokens</h3>
            <p className="text-slate-400">
              Issue Liquid Carbon tokens before final certification — turn data into early-stage finance
            </p>
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}