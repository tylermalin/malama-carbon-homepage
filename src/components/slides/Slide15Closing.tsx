import { motion } from 'motion/react';
import { SlideLayout, SlideHeadline, SlideSubtitle } from './SlideLayout';
import { Button } from '../ui/button';
import { ArrowRight, Leaf, Mail, Download } from 'lucide-react';

interface Slide15ClosingProps {
  onShowInvestor: () => void;
}

export function Slide15Closing({ onShowInvestor }: Slide15ClosingProps) {
  const handleDownloadPDF = () => {
    // Create a link to trigger download
    const link = document.createElement('a');
    link.href = '/Malama_Labs_Investor_Presentation_2025.pdf';
    link.download = 'Malama_Labs_Co2.0_Investor_Presentation.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SlideLayout className="text-center">
      <div className="relative">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-2xl mb-8">
            <Leaf className="w-12 h-12 text-primary" />
          </div>
        </motion.div>

        <SlideHeadline>
          Join Us in Building the Future of Carbon Integrity
        </SlideHeadline>

        <SlideSubtitle>
          Mālama Labs is creating a transparent, verifiable, and investable carbon economy. Together, we can turn climate action into enduring value.
        </SlideSubtitle>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 space-y-6"
        >
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30">
              <div className="text-3xl font-bold text-emerald-400 mb-2">$1.2M</div>
              <div className="text-sm text-slate-400">SAFE Round</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400 mb-2">$8M</div>
              <div className="text-sm text-slate-400">Valuation Cap</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <div className="text-3xl font-bold text-purple-400 mb-2">20%</div>
              <div className="text-sm text-slate-400">Discount</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              onClick={onShowInvestor}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-primary text-lg px-8 py-6"
            >
              Request Investor Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={() => window.location.href = 'mailto:tyler@malamalabs.com'}
              variant="outline"
              size="lg"
              className="bg-slate-100 border-slate-300 hover:bg-slate-200 text-primary text-lg px-8 py-6"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              size="lg"
              className="bg-slate-50 border-emerald-500/30 hover:bg-emerald-50 text-primary text-base px-6 py-4"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Presentation (PDF)
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12"
          >
            <p className="text-slate-500 text-sm mb-2">Tyler Malin, CEO & Co-Founder</p>
            <p className="text-slate-400">tyler@malamalabs.com</p>
            <p className="text-slate-500 text-xs mt-4">Mālama Labs Inc. · 2025</p>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}

