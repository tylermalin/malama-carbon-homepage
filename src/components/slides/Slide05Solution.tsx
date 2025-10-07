import { SlideLayout, SlideHeadline, SlideBody, SlideVisual } from './SlideLayout';
import { Satellite, Cpu, Database, CheckCircle } from 'lucide-react';

export function Slide05Solution() {
  return (
    <SlideLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SlideHeadline className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Universal dMRV Platform
          </SlideHeadline>

          <SlideBody>
            <p className="mb-6">
              Our system unifies IoT sensors, satellite data, and AI models to automate Measurement, Reporting, and Verification (MRV)—enabling real-time, compliance-grade certification.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Automated Data Collection</p>
                  <p className="text-slate-400 text-base">IoT sensors + satellite imagery capture carbon metrics 24/7</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">AI-Powered Verification</p>
                  <p className="text-slate-400 text-base">Machine learning validates permanence and additionality</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary font-semibold">Blockchain Certification</p>
                  <p className="text-slate-400 text-base">Immutable audit trail for compliance and transparency</p>
                </div>
              </div>
            </div>
          </SlideBody>
        </div>

        <SlideVisual>
          <div className="relative">
            {/* Flow diagram */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-4">
                  <Satellite className="w-8 h-8 text-blue-400" />
                  <div>
                    <h4 className="text-primary font-bold mb-1">1. Data Collection</h4>
                    <p className="text-slate-300 text-sm">Sensors + Satellite Monitoring</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-emerald-500" />
              </div>

              <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30">
                <div className="flex items-center gap-4">
                  <Cpu className="w-8 h-8 text-emerald-400" />
                  <div>
                    <h4 className="text-primary font-bold mb-1">2. AI Analysis</h4>
                    <p className="text-slate-300 text-sm">Verification + Risk Modeling</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-blue-500" />
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-4">
                  <Database className="w-8 h-8 text-blue-400" />
                  <div>
                    <h4 className="text-primary font-bold mb-1">3. Credit Issuance</h4>
                    <p className="text-slate-300 text-sm">On-Chain Certification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlideVisual>
      </div>
    </SlideLayout>
  );
}

