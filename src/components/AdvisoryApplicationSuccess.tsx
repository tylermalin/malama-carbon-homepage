import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react';

interface AdvisoryApplicationSuccessProps {
  email: string;
  onClose: () => void;
}

export function AdvisoryApplicationSuccess({ email, onClose }: AdvisoryApplicationSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 border-gray-200 bg-white backdrop-blur-lg">
          <CardContent className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Application Submitted!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-6"
            >
              Thank you for your interest in joining the Malama Labs Advisory Board. 
              We'll review your application and get back to you within 5 business days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-lg p-4 mb-6"
            >
              <p className="text-gray-600 mb-2">
                We've sent a confirmation email to:
              </p>
              <p className="text-emerald-400 font-semibold text-lg">{email}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border-t border-gray-200 pt-6"
            >
              <p className="text-gray-600 mb-4">
                Questions in the meantime?
              </p>
              <Button
                onClick={() => window.open('mailto:tyler@malamalabs.com?subject=Advisory Board Application Follow-up', '_blank')}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email tyler@malamalabs.com
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Close
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
