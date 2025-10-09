import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { ArrowRight, CheckCircle, DollarSign, Shield } from 'lucide-react';

export function BuyersSlide05LCO2Advantage() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        The LCO₂ Advantage
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Buy Earlier. Save More. Drive Measurable Impact.
        </p>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">What is LCO₂?</h3>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            <strong className="text-emerald-400">Liquid Carbon (LCO₂)</strong> = Pre-financed, risk-adjusted carbon removal token that converts to <strong className="text-blue-400">Verified Carbon (VCO₂)</strong> after full MRV verification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <DollarSign className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h4 className="font-semibold text-primary mb-3">Discounted Pricing</h4>
            <p className="text-slate-400 text-sm">
              10–40% savings compared to spot credits
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h4 className="font-semibold text-primary mb-3">Pre-Finance Projects</h4>
            <p className="text-slate-400 text-sm">
              Enable transparent pre-finance for early-stage projects
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h4 className="font-semibold text-primary mb-3">Automatic Conversion</h4>
            <p className="text-slate-400 text-sm">
              Converts to VCO₂ after full MRV verification
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold text-lg">
            LCO₂
          </div>
          <ArrowRight className="w-8 h-8 text-emerald-400" />
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg">
            Verification
          </div>
          <ArrowRight className="w-8 h-8 text-emerald-400" />
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg">
            VCO₂
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}