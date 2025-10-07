import { SlideLayout, SlideHeadline, SlideSubtitle, SlideVisual } from './SlideLayout';
import { Leaf, Shield, Zap } from 'lucide-react';

export function Slide04Mission() {
  return (
    <SlideLayout className="text-center">
      <div>
        <SlideHeadline>
          Turning Nature-Based Impact into Verified, Investable Climate Solutions
        </SlideHeadline>

        <SlideSubtitle>
          Mālama Labs builds digital and physical infrastructure that converts measurable carbon removal into durable, tradable assets.
        </SlideSubtitle>

        <SlideVisual className="mt-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Nature-Based</h3>
              <p className="text-slate-300">
                Real carbon removal through biochar, rock weathering, and regenerative practices
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Verified</h3>
              <p className="text-slate-300">
                Automated dMRV ensures compliance-grade measurement and reporting
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Investable</h3>
              <p className="text-slate-300">
                Tokenized credits enable early financing and liquid markets
              </p>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}

