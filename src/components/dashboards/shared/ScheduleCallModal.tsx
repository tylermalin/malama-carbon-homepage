import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, Calendar, CheckCircle } from 'lucide-react';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleCallModal({ isOpen, onClose }: ScheduleCallModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    organization: '',
    preferredTime: '',
    calendlyLink: 'https://calendly.com/malama/intro'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ email: '', organization: '', preferredTime: '', calendlyLink: 'https://calendly.com/malama/intro' });
    }, 2000);
  };

  const updateFormData = (field: string, value: string) => {
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
                  Schedule a Call
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
                      We'll confirm shortly. Mahalo.
                    </h3>
                    <p className="text-muted-foreground">
                      Our team will reach out to schedule your call.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Your email *
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
                    
                    <div>
                      <Label htmlFor="organization" className="text-sm font-medium">
                        Your organization
                      </Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => updateFormData('organization', e.target.value)}
                        placeholder="Company or organization name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="preferredTime" className="text-sm font-medium">
                        Preferred time
                      </Label>
                      <Input
                        id="preferredTime"
                        value={formData.preferredTime}
                        onChange={(e) => updateFormData('preferredTime', e.target.value)}
                        placeholder="e.g., Weekday mornings, Afternoons"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="calendlyLink" className="text-sm font-medium">
                        Calendly or meeting link
                      </Label>
                      <Input
                        id="calendlyLink"
                        value={formData.calendlyLink}
                        onChange={(e) => updateFormData('calendlyLink', e.target.value)}
                        placeholder="https://calendly.com/malama/intro"
                        className="mt-1"
                      />
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
                        disabled={!formData.email}
                        className="flex-1"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Call
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
