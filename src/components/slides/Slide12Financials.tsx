import { SlideLayout, SlideHeadline, SlideSubtitle, SlideVisual } from './SlideLayout';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export function Slide12Financials() {
  const projections = [
    { year: 'Year 1', revenue: '$788K', projects: 10, margin: '75%' },
    { year: 'Year 2', revenue: '$2.6M', projects: 30, margin: '78%' },
    { year: 'Year 3', revenue: '$6.2M', projects: 60, margin: '80%' },
    { year: 'Year 4', revenue: '$12.5M', projects: 100, margin: '81%' },
    { year: 'Year 5', revenue: '$22.7M', projects: 150, margin: '82%' }
  ];

  return (
    <SlideLayout>
      <div className="text-center mb-8">
        <SlideHeadline>
          Scalable Revenue Model
        </SlideHeadline>
        <SlideSubtitle>
          20x growth potential with SaaS margins and infrastructure-level expansion
        </SlideSubtitle>
      </div>

      <SlideVisual>
        {/* 5-Year Projections Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-primary">5-Year Financial Projections</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Year</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Revenue</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Projects</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-semibold">Gross Margin</th>
                </tr>
              </thead>
              <tbody>
                {projections.map((row, index) => (
                  <tr key={index} className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-primary font-semibold">{row.year}</td>
                    <td className="text-right py-3 px-4 text-emerald-400 font-bold">{row.revenue}</td>
                    <td className="text-right py-3 px-4 text-slate-300">{row.projects}</td>
                    <td className="text-right py-3 px-4 text-blue-400">{row.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold text-primary">$108K</div>
                <div className="text-sm text-slate-400">LTV per Project</div>
              </div>
            </div>
            <p className="text-xs text-slate-500">3-year customer lifetime value</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-primary">13.5x</div>
                <div className="text-sm text-slate-400">LTV / CAC Ratio</div>
              </div>
            </div>
            <p className="text-xs text-slate-500">$8K customer acquisition cost</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-primary">1.9mo</div>
                <div className="text-sm text-slate-400">Payback Period</div>
              </div>
            </div>
            <p className="text-xs text-slate-500">Rapid capital efficiency</p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
          <div className="text-center">
            <p className="text-slate-300">
              <span className="text-emerald-400 font-bold">Cash-Flow Positive by Year 2</span> • 
              <span className="text-blue-400 font-bold ml-2">$22.7M Revenue by Year 5</span> • 
              <span className="text-purple-400 font-bold ml-2">82% Gross Margin</span>
            </p>
          </div>
        </div>
      </SlideVisual>
    </SlideLayout>
  );
}

