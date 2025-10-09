import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { CheckCircle, Shield, TrendingUp } from 'lucide-react';

export function BuyersSlide03CO2Solution() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Introducing CO₂.0
      </SlideHeadline>

      <SlideBody>
        <p className="mb-12 text-slate-300 text-center text-xl">
          A transparent, blockchain-powered ecosystem for trusted climate credits
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">Risk Transparency</h3>
            <p className="text-slate-400">
              Connect directly to verified projects with full risk transparency
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">Early Access</h3>
            <p className="text-slate-400">
              Buy early-stage Liquid Carbon (LCO₂) tokens at fair, risk-adjusted prices
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">On-Chain Tracking</h3>
            <p className="text-slate-400">
              Track every ton from issuance to retirement on blockchain
            </p>
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}
