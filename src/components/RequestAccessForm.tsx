import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { X, Send } from 'lucide-react';

interface RequestAccessFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  portalType: 'investor' | 'advisory';
}

export function RequestAccessForm({ isOpen, onClose, onSuccess, portalType }: RequestAccessFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `${portalType === 'investor' ? 'Investor' : 'Advisory Board'} Portal Access Request`;
    const body = `
Name: ${formData.name}
Title: ${formData.title}
Company: ${formData.company}

Message:
${formData.message}
    `.trim();
    
    const mailtoLink = `mailto:tyler@malamalabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    // Redirect to home after a brief delay
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg"
      >
        <Card className="border-2 border-emerald-500/20 shadow-2xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-200">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Request Access
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Tell us about yourself and we'll get you access
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Your full name"
                  required
                  className="mt-1.5 bg-white border-gray-300 text-gray-900"
                />
              </div>
              
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                  Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="Your role or position"
                  required
                  className="mt-1.5 bg-white border-gray-300 text-gray-900"
                />
              </div>
              
              <div>
                <Label htmlFor="company" className="text-sm font-semibold text-gray-700">
                  Company *
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="Your organization"
                  required
                  className="mt-1.5 bg-white border-gray-300 text-gray-900"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                  Tell Us How We Can Help *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateFormData('message', e.target.value)}
                  placeholder="Share your interest in Mālama Labs and what you'd like to discuss..."
                  required
                  rows={4}
                  className="mt-1.5 bg-white border-gray-300 text-gray-900"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!formData.name || !formData.title || !formData.company || !formData.message}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white border-2 border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2 text-white" />
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
