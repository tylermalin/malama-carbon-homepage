import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { X, Mail, CheckCircle } from 'lucide-react';

interface LaunchUpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LaunchUpdatesModal({ isOpen, onClose }: LaunchUpdatesModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.consent) return;
    
    // Store locally
    const existingEmails = JSON.parse(localStorage.getItem('launchUpdates') || '[]');
    const updatedEmails = [...existingEmails, { email: formData.email, date: new Date().toISOString() }];
    localStorage.setItem('launchUpdates', JSON.stringify(updatedEmails));
    
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ email: '', consent: false });
    }, 2000);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md"
          >
            <Card className="border-none shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold text-primary">
                  Get Launch Updates
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      You're on the list!
                    </h3>
                    <p className="text-muted-foreground">
                      We'll notify you when Mālama Carbon launches.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => updateFormData('consent', checked as boolean)}
                      />
                      <Label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed">
                        I agree to receive updates from Mālama Labs about the platform launch and carbon removal opportunities.
                      </Label>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={!formData.email || !formData.consent}
                        className="flex-1"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Subscribe
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
