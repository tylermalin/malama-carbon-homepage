import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { CheckCircle, X } from 'lucide-react';

export function BuyersSlide07MalamaDifference() {
  const comparisons = [
    { 
      feature: 'Transparency',
      traditional: 'Hidden project info',
      malama: 'Full on-chain data lineage',
      malamaWins: true
    },
    { 
      feature: 'Pricing',
      traditional: 'Markups & opacity',
      malama: 'Transparent market pricing',
      malamaWins: true
    },
    { 
      feature: 'Verification',
      traditional: 'Offline docs',
      malama: 'Real-time digital MRV',
      malamaWins: true
    },
    { 
      feature: 'Access',
      traditional: 'Limited to elite buyers',
      malama: 'Open to all qualified participants',
      malamaWins: true
    },
    { 
      feature: 'Liquidity',
      traditional: 'Manual resale',
      malama: 'Smart-contract-enabled trading',
      malamaWins: true
    },
  ];

  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        The Mālama Difference
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Integrity and Access, Not Intermediation
        </p>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-slate-700/50 border-b border-slate-600">
            <div className="p-4 font-semibold text-primary">Feature</div>
            <div className="p-4 font-semibold text-red-400 border-l border-slate-600">Traditional Broker</div>
            <div className="p-4 font-semibold text-emerald-400 border-l border-slate-600">Mālama Labs</div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-3 border-b border-slate-700/50 last:border-b-0"
            >
              <div className="p-4 font-medium text-slate-200">{row.feature}</div>
              <div className="p-4 border-l border-slate-600 flex items-center gap-2">
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-slate-400">{row.traditional}</span>
              </div>
              <div className="p-4 border-l border-slate-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm text-slate-200 font-medium">{row.malama}</span>
              </div>
            </div>
          ))}
        </div>
      </SlideBody>
    </SlideLayout>
  );
}