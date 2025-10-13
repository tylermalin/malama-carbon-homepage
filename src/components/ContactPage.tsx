import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Users,
  Briefcase,
  HelpCircle,
  Handshake
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (section?: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `Contact Form: ${formData.inquiryType || 'General Inquiry'}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Inquiry Type: ${formData.inquiryType}

Message:
${formData.message}
    `.trim();
    
    const mailtoLink = `mailto:hello@malamalabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    // Show success message (optional - you could add a toast notification here)
    console.log('Opening email client with form data...');
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "General inquiries and support",
      contact: "hello@malamalabs.com",
      href: "mailto:hello@malamalabs.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      contact: "+1 (808) 555-0123",
      href: "tel:+18085550123"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters in Honolulu",
      contact: "1188 Bishop St, Honolulu, HI 96813",
      href: "https://maps.google.com"
    }
  ];

  const inquiryTypes = [
    { value: "partnership", label: "Partnership Opportunities", icon: Handshake },
    { value: "careers", label: "Careers & Hiring", icon: Briefcase },
    { value: "support", label: "Technical Support", icon: HelpCircle },
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "media", label: "Media & Press", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <section className="py-6 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => onNavigate()}
            className="hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 text-lg px-6 py-2">
              <MessageSquare className="w-5 h-5 mr-2" />
              Get in Touch
            </Badge>
            
            <h1 className="text-5xl md:text-6xl mb-6 text-primary leading-tight">
              Let's Start a
              <span className="block text-secondary">Conversation</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Whether you're a land steward interested in carbon credits, a developer looking to integrate 
              our platform, or an organization seeking partnership opportunities, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Multiple Ways to Connect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the method that works best for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 h-full border-2">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl mb-2 text-primary">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <a 
                    href={method.href}
                    className="text-secondary hover:text-secondary/80 transition-colors duration-300 font-medium"
                  >
                    {method.contact}
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-accent/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 bg-background">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-primary">Send Us a Message</CardTitle>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Your organization (optional)"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select 
                        value={formData.inquiryType} 
                        onValueChange={(value) => setFormData({...formData, inquiryType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <type.icon className="w-4 h-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your inquiry, project, or how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Quick Answers</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions before reaching out.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 border-2 h-full">
                <h3 className="text-xl mb-4 text-primary">For Project Developers</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium text-primary mb-1">How do I get started?</h4>
                    <p className="text-muted-foreground">Begin with our simple onboarding questionnaire to assess your land's carbon potential.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">What are the costs?</h4>
                    <p className="text-muted-foreground">No upfront costs. We take a small percentage of carbon credit sales once your project is verified.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">How long does verification take?</h4>
                    <p className="text-muted-foreground">Typically 3-6 months for initial verification, with ongoing monitoring throughout the project lifecycle.</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 border-2 h-full">
                <h3 className="text-xl mb-4 text-primary">For Partners & Developers</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium text-primary mb-1">Do you have an API?</h4>
                    <p className="text-muted-foreground">Yes, we offer comprehensive APIs for carbon data integration, project management, and verification workflows.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">Partnership opportunities?</h4>
                    <p className="text-muted-foreground">We work with carbon registries, technology providers, and environmental organizations. Contact us to discuss.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">Technical support?</h4>
                    <p className="text-muted-foreground">Our technical team provides comprehensive support for integration and troubleshooting.</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Our Locations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Based in Hawaiʻi with team members across the US and globally.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-2 bg-background">
                <h3 className="text-2xl mb-4 text-primary">Headquarters</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Mālama Carbon Labs</p>
                      <p className="text-muted-foreground">1188 Bishop Street, Suite 2508</p>
                      <p className="text-muted-foreground">Honolulu, HI 96813</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <p className="text-muted-foreground">+1 (808) 555-0123</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <p className="text-muted-foreground">hello@malamalabs.com</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-6">
                  Office hours: Monday - Friday, 8:00 AM - 5:00 PM HST
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-2 bg-background">
                <h3 className="text-2xl mb-4 text-primary">Distributed Team</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  While our headquarters are in Honolulu, our team spans across multiple locations 
                  to serve our global community of land stewards and partners.
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Honolulu, HI (Headquarters)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="text-muted-foreground">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-muted-foreground">New York, NY</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">Remote team members globally</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}