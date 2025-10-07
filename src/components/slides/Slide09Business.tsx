import { SlideLayout, SlideHeadline, SlideSubtitle, SlideVisual } from './SlideLayout';
import { DollarSign, Coins, Server, Shield } from 'lucide-react';

export function Slide09Business() {
  const revenueStreams = [
    {
      icon: DollarSign,
      title: 'Platform Fees',
      description: 'Transaction fees on LCO₂/VCO₂ trading',
      percentage: '35%',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: Coins,
      title: 'Token Issuance',
      description: 'Fees for minting and converting tokens',
      percentage: '30%',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Server,
      title: 'MRV Licensing',
      description: 'SaaS subscriptions for dMRV platform',
      percentage: '25%',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Insurance Premiums',
      description: 'Risk coverage and verification guarantees',
      percentage: '10%',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <SlideLayout>
      <div className="text-center mb-12">
        <SlideHeadline>
          SaaS Economics, Infrastructure-Scale Impact
        </SlideHeadline>
        <SlideSubtitle>
          Mālama earns revenue through platform fees, token issuance, carbon credit brokerage, and MRV licensing
        </SlideSubtitle>
      </div>

      <SlideVisual>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {revenueStreams.map((stream, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:scale-105 transition-transform"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stream.color} rounded-2xl flex items-center justify-center`}>
                <stream.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">{stream.percentage}</div>
                <h3 className="text-lg font-bold text-primary mb-2">{stream.title}</h3>
                <p className="text-sm text-slate-400">{stream.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
            <div className="text-3xl font-bold text-primary mb-2">70-80%</div>
            <div className="text-emerald-400 font-semibold mb-2">Gross Margins</div>
            <p className="text-sm text-slate-400">Software-driven revenue with minimal COGS</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <div className="text-3xl font-bold text-primary mb-2">$100B+</div>
            <div className="text-blue-400 font-semibold mb-2">TAM by 2030</div>
            <p className="text-sm text-slate-400">Voluntary carbon market expansion</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="text-3xl font-bold text-primary mb-2">$50-150</div>
            <div className="text-purple-400 font-semibold mb-2">Price per Ton</div>
            <p className="text-sm text-slate-400">Durable removal premium pricing</p>
          </div>
        </div>
      </SlideVisual>
    </SlideLayout>
  );
}

