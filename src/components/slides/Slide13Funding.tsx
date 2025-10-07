import { SlideLayout, SlideHeadline, SlideSubtitle, SlideVisual } from './SlideLayout';
import { DollarSign, TrendingUp, Users, Rocket } from 'lucide-react';

export function Slide13Funding() {
  const useOfFunds = [
    { category: 'Team', amount: '$480K', percentage: 40, description: 'Engineers, BD Rep, Operations Manager' },
    { category: 'Technology & Operations', amount: '$360K', percentage: 30, description: 'IoT deployment, satellite data, risk engine MVP' },
    { category: 'Sales & Marketing', amount: '$240K', percentage: 20, description: 'Developer outreach, partnerships, buyer acquisition' },
    { category: 'Working Capital', amount: '$120K', percentage: 10, description: 'Legal, runway buffer' }
  ];

  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Raising $1.2M SAFE Round
          </SlideHeadline>

          <SlideSubtitle>
            Fuel platform development and scale to 10 projects in Year 1
          </SlideSubtitle>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30">
              <div className="text-sm text-slate-400 mb-1">Instrument</div>
              <div className="text-xl font-bold text-emerald-400">SAFE</div>
              <div className="text-xs text-slate-500">Post-Money</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
              <div className="text-sm text-slate-400 mb-1">Valuation Cap</div>
              <div className="text-xl font-bold text-blue-400">$8M</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
              <div className="text-sm text-slate-400 mb-1">Discount</div>
              <div className="text-xl font-bold text-purple-400">20%</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-pink-500/30">
              <div className="text-sm text-slate-400 mb-1">Min Investment</div>
              <div className="text-xl font-bold text-pink-400">$25K</div>
            </div>
          </div>
        </div>

        <SlideVisual>
          <div className="space-y-6">
            {/* Use of Funds */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-primary mb-6">Use of Funds</h3>
              <div className="space-y-4">
                {useOfFunds.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 font-semibold">{item.category}</span>
                      <span className="text-emerald-400 font-bold">{item.amount}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 12-Month Milestones */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-bold text-primary">12-Month Milestones</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Close 10 projects → $788K revenue</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Deploy 10 IoT sensor networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Issue 7,000+ LCO₂ tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>First VCO₂ credits issue</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Expand beyond Hawai'i</span>
                </li>
              </ul>
            </div>

            {/* Series Seed Exit */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">18-Month Exit to Series Seed</div>
                <div className="text-xl font-bold text-blue-400">$2M at $10-12M post-money</div>
              </div>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}

