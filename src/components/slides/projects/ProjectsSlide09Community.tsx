import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { Users, TrendingUp, Shield, Globe } from 'lucide-react';

export function ProjectsSlide09Community() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Empowering Communities
      </SlideHeadline>

      <SlideBody>
        <p className="mb-12 text-slate-300 text-center text-xl leading-relaxed">
          Mālama's tools are designed for <strong className="text-emerald-400">inclusion</strong> — enabling smallholders, 
          Indigenous stewards, and local developers to:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <TrendingUp className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Retain More Value</h3>
            <p className="text-slate-400">
              Capture the full value of their land and labor without expensive intermediaries
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Build Trust</h3>
            <p className="text-slate-400">
              Access transparent data tools that build trust with funders and buyers
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <Globe className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-3">Connect Globally</h3>
            <p className="text-slate-400">
              Connect directly to climate finance and international buyers
            </p>
          </div>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 text-center">
          <Users className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <p className="text-lg text-slate-300 italic">
            "Climate solutions work best when they work for everyone"
          </p>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}