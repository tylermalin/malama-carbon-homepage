import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { UserPlus, Wifi, BarChart3, Coins, FileText } from 'lucide-react';

export function ProjectsSlide04HowItWorks() {
  const steps = [
    { 
      icon: UserPlus, 
      title: 'Sign Up & Define Scope', 
      desc: 'Work with our team to establish your measurement plan'
    },
    { 
      icon: Wifi, 
      title: 'Deploy Sensors & Connect', 
      desc: 'Integrate IoT and satellite feeds through Universal dMRV network'
    },
    { 
      icon: BarChart3, 
      title: 'Automated Analysis', 
      desc: 'AI-driven models assess permanence, additionality, and leakage'
    },
    { 
      icon: Coins, 
      title: 'Receive LCO₂ Tokens', 
      desc: 'Access early liquidity based on validated metrics'
    },
    { 
      icon: FileText, 
      title: 'Full Verification', 
      desc: 'LCO₂ converts into verified VCO₂ credits upon certification'
    },
  ];

  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        How It Works
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          From Project Setup to Verified Credits — All in One Platform
        </p>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SlideBody>
    </SlideLayout>
  );
}