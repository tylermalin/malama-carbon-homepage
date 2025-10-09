import { SlideLayout, SlideHeadline, SlideBody } from '../SlideLayout';
import { ExternalLink, Video, Calendar, Mail, Lock } from 'lucide-react';
import { Button } from '../../ui/button';

export function ProjectsSlide10Closing() {
  return (
    <SlideLayout>
      <SlideHeadline className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
        Join Mālama's Developer Network
      </SlideHeadline>

      <SlideBody>
        <p className="mb-8 text-slate-300 text-center text-xl">
          Build, Verify, and Finance the Next Generation of Carbon Projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Video className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Watch Overview</h3>
            <p className="text-xs text-slate-400 mb-4">5-min introduction</p>
            <Button 
              onClick={() => window.open('https://youtu.be/nAYsgyyh7cc?si=VdeTGcOkYCdpvOjO', '_blank')}
              size="sm"
              className="w-full"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Watch
            </Button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Calendar className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Book Session</h3>
            <p className="text-xs text-slate-400 mb-4">Schedule with team</p>
            <Button 
              onClick={() => window.open('https://calendar.app.google/PjPddjUkZjdxHPqr8', '_blank')}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Book
            </Button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Mail className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Email Us</h3>
            <p className="text-xs text-slate-400 mb-4">Direct contact</p>
            <Button 
              onClick={() => window.location.href = 'mailto:tyler@malamalabs.com'}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Email
            </Button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Lock className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-primary mb-2">Investor Portal</h3>
            <p className="text-xs text-slate-400 mb-4">Code: malama2025</p>
            <Button 
              onClick={() => window.location.href = '/investors'}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Access
            </Button>
          </div>
        </div>

        <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 text-center mb-8">
          <h3 className="text-2xl font-bold text-emerald-400 mb-3">Zero Upfront Costs</h3>
          <p className="text-lg text-slate-300">
            Mālama only earns when your project generates revenue — aligning our success with yours
          </p>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-2">🌐 www.malamalabs.com</p>
          <p className="text-lg text-slate-400">📧 tyler@malamalabs.com</p>
        </div>
      </SlideBody>
    </SlideLayout>
  );
}