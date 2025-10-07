import { SlideLayout, SlideHeadline, SlideSubtitle, SlideVisual } from './SlideLayout';
import { User, Briefcase, Code } from 'lucide-react';

export function Slide11Team() {
  const team = [
    {
      name: 'Tyler Malin',
      role: 'Founder & CEO',
      image: 'https://www.malamalabs.com/assets/tyler%20headshopt-DZ_QfwmG.JPG',
      icon: Briefcase,
      background: 'Legal, Blockchain, Climate Strategy',
      highlight: 'Serial entrepreneur with 20+ years building marketplaces. 2 successful exits.'
    },
    {
      name: 'Dominick Garey',
      role: 'CTO',
      image: 'https://www.malamalabs.com/assets/Dominick-BASZ3WWg.png',
      icon: Code,
      background: 'Blockchain & dMRV Architecture',
      highlight: 'Full-stack architect with deep Web3 expertise and enterprise-grade infrastructure.'
    },
    {
      name: 'Jeffrey Wise',
      role: 'COO',
      image: 'https://www.malamalabs.com/assets/jeffrey-BXTnCr7s.jpeg',
      icon: User,
      background: 'Operations & Scaling',
      highlight: 'Hawai\'i agriculture & sustainability leader. Deep community relationships.'
    }
  ];

  return (
    <SlideLayout>
      <div className="text-center mb-12">
        <SlideHeadline>
          Experienced Builders Bridging Climate and Technology
        </SlideHeadline>
        <SlideSubtitle>
          Carbon Science + Web3 Infrastructure + Operational Execution
        </SlideSubtitle>
      </div>

      <SlideVisual>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all hover:scale-105"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-500/30">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                <div className="text-emerald-400 font-semibold mb-3">{member.role}</div>
                <div className="text-sm text-slate-400 mb-3">{member.background}</div>
                <p className="text-xs text-slate-500 italic">{member.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20">
            <h3 className="text-lg font-bold text-primary mb-4">Why This Team Wins</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span><strong>Geographic Advantage:</strong> Building from Hawai&apos;i with on-ground project access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span><strong>Proven Execution:</strong> Tyler's 2 exits demonstrate ability to scale and navigate markets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span><strong>Technical Depth:</strong> Production infrastructure with real blockchain, AI, and IoT integration</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <h3 className="text-lg font-bold text-primary mb-4">Key Hires (Next 12 Months)</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-start">
                <span className="text-slate-300">VP Carbon Markets</span>
                <span className="text-blue-400 text-xs">Q2 2026</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-300">Chief Scientist</span>
                <span className="text-blue-400 text-xs">Q3 2026</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-300">2 Engineers</span>
                <span className="text-blue-400 text-xs">Q1 2026</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-300">1 BD Rep</span>
                <span className="text-blue-400 text-xs">Q1 2026</span>
              </div>
            </div>
          </div>
        </div>
      </SlideVisual>
    </SlideLayout>
  );
}

