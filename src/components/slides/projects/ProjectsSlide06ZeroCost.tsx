import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { X, CheckCircle } from 'lucide-react';

export function ProjectsSlide06ZeroCost() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Zero Upfront Costs
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Mālama only earns when your project generates revenue
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Model */}
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <X className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-semibold text-red-400">Traditional Consultancy</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">$50K–$200K upfront fees</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">Pay before any revenue</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">Consultant keeps fee regardless of outcome</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">High financial risk for developers</span>
              </li>
            </ul>
          </div>

          {/* Mālama Partnership */}
          <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
              <h3 className="text-2xl font-semibold text-emerald-400">Mālama Partnership</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300"><strong className="text-emerald-400">$0 upfront</strong> — no documentation fees</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">We co-develop your MRV plan & integrate sensors</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">Fees deducted <strong className="text-emerald-400">only when credits sell</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">Aligned incentives — we succeed when you succeed</span>
              </li>
            </ul>
          </div>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}