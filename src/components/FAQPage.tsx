import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Separator } from './ui/separator';
import { 
  ArrowLeft,
  HelpCircle,
  Users,
  Sprout,
  Zap,
  DollarSign,
  Shield,
  MessageSquare
} from 'lucide-react';

interface FAQPageProps {
  onNavigate: (section?: string) => void;
  onContact?: () => void;
}

export function FAQPage({ onNavigate, onContact }: FAQPageProps) {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: Sprout,
      color: "primary",
      faqs: [
        {
          question: "How do I know if my land is suitable for carbon credits?",
          answer: "Our platform assesses various factors including soil type, vegetation, land use history, and local climate conditions. Most agricultural land, forests, and degraded areas have carbon sequestration potential. Start with our free assessment tool to get an initial evaluation."
        },
        {
          question: "What documentation do I need to get started?",
          answer: "You'll need proof of land ownership or management rights (such as a deed, lease agreement, or TMK documentation), basic land use information, and any existing environmental assessments. Our team will guide you through the specific requirements during onboarding."
        },
        {
          question: "How long does the onboarding process take?",
          answer: "Initial assessment typically takes 1-2 weeks. Full project setup and verification can take 3-6 months depending on project complexity, size, and verification requirements. We'll provide a detailed timeline during your consultation."
        },
        {
          question: "Do I need any specific equipment or technology?",
          answer: "No specialized equipment is required initially. Our dMRV system can work with smartphone data collection for smaller projects. For larger operations, we may recommend specific sensors or monitoring equipment, which can often be included in project financing."
        }
      ]
    },
    {
      title: "Carbon Credits & Markets",
      icon: DollarSign,
      color: "secondary",
      faqs: [
        {
          question: "How are carbon credits priced and sold?",
          answer: "Carbon credit prices vary based on project type, verification standard, vintage, and market demand. Our platform provides real-time pricing data and connects you with multiple buyers. We help optimize pricing strategies to maximize your returns while maintaining market competitiveness."
        },
        {
          question: "What's the difference between voluntary and compliance carbon markets?",
          answer: "Voluntary markets serve companies making voluntary climate commitments, while compliance markets serve regulated entities with mandatory emission reduction requirements. Our platform supports both markets, helping you access the best pricing and buyer options."
        },
        {
          question: "How do you verify carbon sequestration claims?",
          answer: "We use third-party verification through established standards like Verra VCS, Gold Standard, and PURO. Our dMRV system provides continuous monitoring and data collection to support verification processes, ensuring transparency and credibility."
        },
        {
          question: "What happens if my project doesn't perform as expected?",
          answer: "Our platform includes risk management tools and insurance options. We provide ongoing monitoring and adaptive management recommendations to optimize performance. If credits need to be replaced due to reversals, we work with you on solutions including insurance payouts or replacement credits."
        }
      ]
    },
    {
      title: "Technology & Platform",
      icon: Zap,
      color: "accent",
      faqs: [
        {
          question: "How does the dMRV (digital Monitoring, Reporting, Verification) system work?",
          answer: "Our dMRV system combines IoT sensors, satellite data, and AI analysis to continuously monitor carbon sequestration activities. Data is automatically recorded on blockchain for transparency and fed to verification bodies, reducing costs and increasing accuracy compared to traditional MRV methods."
        },
        {
          question: "Is my data secure and private?",
          answer: "Yes, we use enterprise-grade security measures including encryption, blockchain recording, and secure data storage. You maintain ownership of your data and control who has access. All data handling complies with privacy regulations and industry best practices."
        },
        {
          question: "Can I integrate with other farm management systems?",
          answer: "Our platform offers APIs and integrations with major farm management systems, IoT platforms, and carbon registries. We can often integrate with existing systems you're already using to minimize disruption to your operations."
        },
        {
          question: "Do you support mobile access?",
          answer: "Yes, our platform includes mobile-friendly interfaces for data collection, project monitoring, and dashboard access. Field data can be collected using smartphone apps, making it accessible for users regardless of technical experience."
        }
      ]
    },
    {
      title: "Financial & Legal",
      icon: Shield,
      color: "green-500",
      faqs: [
        {
          question: "What are the costs involved?",
          answer: "We operate on a success-based model with no upfront costs for most projects. Our fees are a small percentage of carbon credit sales only after successful verification and sale. Development costs, verification fees, and equipment may be financed through advance credit sales."
        },
        {
          question: "How do advance payments work?",
          answer: "Qualified projects can receive 5-60% of expected carbon credit value upfront to cover project costs and provide early revenue. This is secured against future credit delivery, helping overcome the typical financing barriers in carbon projects."
        },
        {
          question: "What legal agreements are required?",
          answer: "Standard agreements include project development agreements, carbon rights assignments, and buyer contracts. Our legal team works with you to ensure all agreements protect your interests while meeting market standards. We explain all terms in plain language."
        },
        {
          question: "How are taxes handled on carbon credit income?",
          answer: "Carbon credit income is generally treated as regular business income for tax purposes, but specific treatment can vary by jurisdiction and situation. We recommend consulting with a tax professional familiar with carbon markets in your area for personalized advice."
        }
      ]
    }
  ];

  const generalFaqs = [
    {
      question: "What makes Mālama Carbon different from other carbon credit platforms?",
      answer: "We combine traditional Hawaiian land stewardship wisdom with cutting-edge technology, focus on community empowerment, offer transparent blockchain verification, and provide upfront financing options. Our platform is designed specifically for land stewards, not just large corporations."
    },
    {
      question: "Do you work internationally or just in Hawaii?",
      answer: "While we started in Hawaii, we're expanding globally. Our technology platform supports projects worldwide, though specific programs and partnerships may vary by region. Contact us to discuss opportunities in your area."
    },
    {
      question: "How do I contact support if I have issues?",
      answer: "Our support team is available via email, phone, and in-platform messaging. We provide onboarding support, technical assistance, and ongoing project guidance. Response times are typically within 24 hours for general inquiries and faster for urgent issues."
    }
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
              <HelpCircle className="w-5 h-5 mr-2" />
              Frequently Asked Questions
            </Badge>
            
            <h1 className="text-5xl md:text-6xl mb-6 text-primary leading-tight">
              Questions &
              <span className="block text-secondary">Answers</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Find answers to common questions about Mālama Carbon, our platform, 
              and how carbon credit generation works for land stewards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <Card className="border-2 overflow-hidden">
                <CardHeader className={`bg-${category.color}/5 border-b border-border/50`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${category.color} rounded-full flex items-center justify-center`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-primary">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="px-6 py-4 text-left hover:bg-accent/20">
                          <span className="text-lg text-primary">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* General FAQs */}
      <section className="py-20 px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">General Questions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Common questions about Mālama Carbon and our approach to carbon markets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 bg-background">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {generalFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`general-${index}`}>
                      <AccordionTrigger className="px-6 py-4 text-left hover:bg-accent/20">
                        <span className="text-lg text-primary">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 text-center border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h2 className="text-3xl mb-4 text-primary">Still Have Questions?</h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Can't find what you're looking for? Our team is here to help with personalized 
                answers to your specific questions about carbon credits, our platform, or your project.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={onContact}
                  className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate()}
                  className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Button>
              </div>

              <Separator className="my-8" />
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <h4 className="font-medium text-primary mb-2">Email Support</h4>
                  <p className="text-muted-foreground">support@malama.co</p>
                  <p className="text-muted-foreground">24-hour response time</p>
                </div>
                
                <div className="text-center">
                  <h4 className="font-medium text-primary mb-2">Phone Support</h4>
                  <p className="text-muted-foreground">+1 (808) 555-0123</p>
                  <p className="text-muted-foreground">Mon-Fri, 8AM-5PM HST</p>
                </div>
                
                <div className="text-center">
                  <h4 className="font-medium text-primary mb-2">Live Chat</h4>
                  <p className="text-muted-foreground">Available in platform</p>
                  <p className="text-muted-foreground">Real-time assistance</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}