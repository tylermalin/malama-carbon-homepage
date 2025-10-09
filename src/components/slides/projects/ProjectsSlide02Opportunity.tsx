import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { TrendingUp, Globe, Users } from 'lucide-react';

export function ProjectsSlide02Opportunity() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        The Opportunity
      </SlideHeadline>

      <SlideBody>
        <p className="mb-12 text-slate-300 text-center text-xl">
          Small and community-led projects represent the largest untapped potential
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <TrendingUp className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Supply Gap</h3>
            <p className="text-slate-400">
              Demand for high-integrity carbon credits exceeds verified supply
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Infrastructure Gap</h3>
            <p className="text-slate-400">
              Local projects often lack data infrastructure, verification support, and pre-finance
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <Users className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Impact Opportunity</h3>
            <p className="text-slate-400">
              Bridging this gap accelerates climate action, jobs, and resilience
            </p>
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}