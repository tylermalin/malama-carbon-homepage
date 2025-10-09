import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { CheckCircle, X } from 'lucide-react';

export function BuyersSlide07MalamaDifference() {
  const comparisons = [
    { 
      feature: 'Transparency',
      traditional: 'Hidden project info',
      malama: 'Full on-chain data lineage',
    },
    { 
      feature: 'Pricing',
      traditional: 'Markups & opacity',
      malama: 'Transparent market pricing',
    },
    { 
      feature: 'Verification',
      traditional: 'Offline docs',
      malama: 'Real-time digital MRV',
    },
    { 
      feature: 'Access',
      traditional: 'Limited to elite buyers',
      malama: 'Open to all qualified participants',
    },
    { 
      feature: 'Liquidity',
      traditional: 'Manual resale',
      malama: 'Smart-contract-enabled trading',
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

        <div className="max-w-5xl mx-auto bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-slate-700/80 border-b-2 border-slate-600">
                <th className="p-5 font-bold text-lg text-primary text-left w-1/4"></th>
                <th className="p-5 font-bold text-lg text-red-400 border-l-2 border-slate-600 text-center w-3/8">
                  Traditional Broker
                </th>
                <th className="p-5 font-bold text-lg text-emerald-400 border-l-2 border-slate-600 text-center w-3/8">
                  Mālama Labs
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700/50 last:border-b-0 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="p-5 font-semibold text-slate-200 align-middle">
                    {row.feature}
                  </td>
                  <td className="p-5 border-l-2 border-slate-600 text-center align-middle">
                    <X className="w-6 h-6 text-red-400 mb-2 mx-auto" />
                    <div className="text-sm text-slate-400">{row.traditional}</div>
                  </td>
                  <td className="p-5 border-l-2 border-slate-600 text-center align-middle">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mb-2 mx-auto" />
                    <div className="text-sm text-slate-200 font-medium">{row.malama}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}