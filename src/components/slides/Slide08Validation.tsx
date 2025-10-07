import { SlideLayout, SlideHeadline, SlideBody, SlideVisual } from './SlideLayout';
import { Building2, CheckCircle, MapPin } from 'lucide-react';

export function Slide08Validation() {
  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline>
            Proven Models, Growing Demand
          </SlideHeadline>

          <SlideBody>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold mb-1">Established Frameworks</p>
                  <p className="text-slate-400">
                    Modeled after Puro.earth, Isometric, and Article 6.4 compliance standards
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold mb-1">Strategic Partnerships</p>
                  <p className="text-slate-400">
                    Collaborations with DIBS Hawaii, DHHL, and AgEnergy for pilot deployments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold mb-1">First Project</p>
                  <p className="text-slate-400">
                    AgEnergy Kawaihae Biochar Facility—7,500 tons annual capacity
                  </p>
                </div>
              </div>
            </div>
          </SlideBody>
        </div>

        <SlideVisual>
          <div className="space-y-6">
            {/* Featured Project */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-emerald-400" />
                <h3 className="text-2xl font-bold text-primary">AgEnergy Kawaihae</h3>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">Hawai'i Island, HI</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-emerald-400">7,500</div>
                  <div className="text-sm text-slate-400">Tons/Year</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">$1.1M</div>
                  <div className="text-sm text-slate-400">Annual Revenue</div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <div className="text-xs text-slate-500 mb-1">Verification Phase</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">75%</span>
                </div>
              </div>
            </div>

            {/* Pipeline */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <h4 className="text-lg font-bold text-primary mb-4">Active Pipeline</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Projects</span>
                  <span className="text-emerald-400 font-bold">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Annual Capacity</span>
                  <span className="text-emerald-400 font-bold">875K tons</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Projected Revenue</span>
                  <span className="text-emerald-400 font-bold">$131M</span>
                </div>
              </div>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}

