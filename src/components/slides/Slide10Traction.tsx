import { SlideLayout, SlideHeadline, SlideBody, SlideVisual } from './SlideLayout';
import { TrendingUp, Users, MapPin, Zap } from 'lucide-react';

export function Slide10Traction() {
  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            From Pilot to Platform
          </SlideHeadline>

          <SlideBody>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">6 Active Projects</h3>
                </div>
                <p className="text-slate-400">
                  In development across Hawai'i and Pacific Northwest
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">875K Tons Annual</h3>
                </div>
                <p className="text-slate-400">
                  Combined carbon removal capacity across pipeline
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Strategic Partners</h3>
                </div>
                <p className="text-slate-400">
                  DIBS Hawaii, DHHL, AgEnergy, and regional governments
                </p>
              </div>
            </div>
          </SlideBody>
        </div>

        <SlideVisual>
          <div className="space-y-4">
            {/* Timeline */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-primary mb-6">Milestone Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full" />
                    <div className="w-0.5 h-full bg-gradient-to-b from-emerald-500 to-blue-500 mt-2" />
                  </div>
                  <div className="pb-8">
                    <div className="text-emerald-400 font-bold mb-1">Q1 2025</div>
                    <div className="text-primary font-semibold mb-1">First Project Launch</div>
                    <div className="text-sm text-slate-400">AgEnergy Kawaihae online</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    <div className="w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 mt-2" />
                  </div>
                  <div className="pb-8">
                    <div className="text-blue-400 font-bold mb-1">Q2 2025</div>
                    <div className="text-primary font-semibold mb-1">dMRV Platform Beta</div>
                    <div className="text-sm text-slate-400">Platform rollout to 3 projects</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-purple-500 rounded-full" />
                    <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-pink-500 mt-2" />
                  </div>
                  <div className="pb-8">
                    <div className="text-purple-400 font-bold mb-1">Q3-Q4 2025</div>
                    <div className="text-primary font-semibold mb-1">Token Launch</div>
                    <div className="text-sm text-slate-400">LCO₂ presales begin</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-pink-500 rounded-full" />
                  </div>
                  <div>
                    <div className="text-pink-400 font-bold mb-1">2026</div>
                    <div className="text-primary font-semibold mb-1">Full Platform Scale</div>
                    <div className="text-sm text-slate-400">Expand to 20+ projects globally</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map indicator */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-primary font-bold">Geographic Focus</div>
                  <div className="text-sm text-slate-400">Hawai'i → Pacific NW → Global</div>
                </div>
              </div>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}

