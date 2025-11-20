/**
 * AI Compliance Scanner - Main Landing Page
 * 
 * Free scan landing page for lead generation
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, FileCheck, AlertTriangle, CheckCircle, Mail } from 'lucide-react';
import { startComplianceScan, getScanProgress } from '../../services/complianceOrchestratorService';

export const ComplianceScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!domain) {
      setError('Please enter a domain');
      return;
    }

    setIsScanning(true);

    try {
      // Start the scan
      const result = await startComplianceScan({
        domain: cleanDomain(domain),
        contactEmail: email || undefined,
        scanType: 'api',
      });

      // Redirect to results page
      navigate(`/compliance/scan/${result.scanId}`);
      
    } catch (err) {
      console.error('Scan failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to start scan');
      setIsScanning(false);
    }
  };

  const cleanDomain = (input: string): string => {
    return input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Compliance Scanner</h1>
                <p className="text-sm text-gray-600">by Beneficial Legal</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Is Your AI Startup <span className="text-blue-600">Legally Protected</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get a free 60-second compliance check for your website. 
            Identify AI disclosure gaps, privacy policy issues, and GDPR/CCPA risks instantly.
          </p>

          {/* Scan Form */}
          <form onSubmit={handleStartScan} className="mt-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="space-y-4">
                <div>
                  <label htmlFor="domain" className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Your Website URL *
                  </label>
                  <input
                    id="domain"
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com or https://example.com"
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isScanning}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Email (optional - for full report)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isScanning}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isScanning}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isScanning ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Scan Now - Free</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            ✓ No credit card required  •  ✓ Results in 60 seconds  •  ✓ 500+ startups scanned
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FileCheck className="h-8 w-8 text-blue-600" />}
            title="Privacy Policy Analysis"
            description="Check for missing GDPR and CCPA requirements"
          />
          <FeatureCard
            icon={<AlertTriangle className="h-8 w-8 text-orange-600" />}
            title="AI Disclosure Check"
            description="Verify AI/ML use is properly disclosed"
          />
          <FeatureCard
            icon={<CheckCircle className="h-8 w-8 text-green-600" />}
            title="Instant Risk Score"
            description="Get a 0-10 compliance risk assessment"
          />
          <FeatureCard
            icon={<Mail className="h-8 w-8 text-purple-600" />}
            title="Actionable Report"
            description="Receive specific fixes and templates"
          />
        </div>

        {/* Social Proof */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-6">Trusted by startups from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-2xl font-bold text-gray-400">Y Combinator</div>
            <div className="text-2xl font-bold text-gray-400">Techstars</div>
            <div className="text-2xl font-bold text-gray-400">500 Startups</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24 bg-white rounded-2xl shadow-xl p-12 border border-gray-200">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step
              number="1"
              title="Enter Your URL"
              description="We scan your website, privacy policy, and terms of service"
            />
            <Step
              number="2"
              title="AI Analysis"
              description="Our AI reviews content against GDPR, CCPA, and AI Act requirements"
            />
            <Step
              number="3"
              title="Get Your Report"
              description="Receive a risk score and specific recommendations in 60 seconds"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Need Help Fixing Issues?</h3>
          <p className="text-xl mb-8 opacity-90">
            Our legal team can help you become compliant in days, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Book Free Consultation
            </button>
            <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
              View Pricing
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FAQ
              question="Is this really free?"
              answer="Yes! The basic scan and risk score are completely free. You can optionally upgrade to get detailed templates and legal support."
            />
            <FAQ
              question="How accurate is the scan?"
              answer="Our AI-powered scanner has 85%+ accuracy and is trained on GDPR, CCPA, and EU AI Act requirements. However, it's not legal advice - we recommend consulting an attorney for final review."
            />
            <FAQ
              question="What if I'm not using AI?"
              answer="That's fine! The scanner checks general privacy compliance too (GDPR, CCPA, cookies, etc). Every website needs these policies."
            />
            <FAQ
              question="How long does it take?"
              answer="Most scans complete in 60-90 seconds. Complex sites with many pages might take up to 2 minutes."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Beneficial Legal. This tool provides informational analysis only and does not constitute legal advice.
          </p>
          <div className="mt-4 space-x-6">
            <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Step: React.FC<{ number: string; title: string; description: string }> = ({
  number,
  title,
  description,
}) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
      {number}
    </div>
    <h4 className="font-bold text-lg mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FAQ: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <h4 className="font-bold text-lg mb-2 text-gray-900">{question}</h4>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default ComplianceScannerPage;

