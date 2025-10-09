import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { Users, FileText, Link2, TrendingUp } from 'lucide-react';

export function BuyersSlide10PartnerNetwork() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Join the Mālama Partner Ecosystem
      </SlideHeadline>

      <SlideBody>
        <p className="mb-12 text-slate-300 text-center text-xl leading-relaxed">
          Earn referral benefits by introducing buyers, investors, and projects to Mālama. 
          We provide ready-to-use outreach materials, presentation decks, and branded referral links.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Users className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">Advisors</h3>
            <p className="text-sm text-slate-400">
              Connect your network with trusted carbon solutions
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">Buyers</h3>
            <p className="text-sm text-slate-400">
              Access high-integrity credits at fair prices
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <FileText className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">Developers</h3>
            <p className="text-sm text-slate-400">
              Get early liquidity and data infrastructure
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Link2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="font-semibold text-primary mb-2">Mālama Labs</h3>
            <p className="text-sm text-slate-400">
              Connecting all stakeholders transparently
            </p>
          </div>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-3">Become a Partner</h3>
          <p className="text-lg text-slate-300 mb-6">
            Ready-to-use materials, branded links, and shared success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/advisory'}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Join Advisory Network
            </button>
            <button
              onClick={() => window.location.href = 'mailto:tyler@malamalabs.com'}
              className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Contact Partnership Team
            </button>
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}