import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface EmailVerificationSuccessProps {
  email: string;
  onContinue: () => void;
}

export function EmailVerificationSuccess({ email, onContinue }: EmailVerificationSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-emerald-200 shadow-2xl">
          <CardContent className="p-12 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Account Created Successfully! 🎉
            </h1>
            
            <p className="text-xl text-slate-700 mb-8">
              Thank you for joining Mālama Labs
            </p>

            {/* Email Verification Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                📧 Please Verify Your Email
              </h2>
              <p className="text-blue-800 mb-4">
                We've sent a verification email to:
              </p>
              <p className="text-blue-900 font-semibold mb-4 bg-white px-4 py-2 rounded border border-blue-300 break-all">
                {email}
              </p>
              <div className="space-y-2 text-blue-800">
                <p className="font-medium">📝 Next steps:</p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Open your email inbox</li>
                  <li>Look for an email from Mālama Labs</li>
                  <li>Click the "Verify Email Address" button</li>
                  <li>Sign in to access your dashboard</li>
                </ol>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <p className="text-slate-700 mb-2">
                <strong>Haven't received the email?</strong>
              </p>
              <p className="text-sm text-slate-600 mb-4">
                Check your spam folder or contact us for help
              </p>
              <a 
                href="mailto:aloha@malamalabs.com"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                aloha@malamalabs.com
              </a>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={onContinue}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg"
            >
              Continue to Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

