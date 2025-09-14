import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Footer } from './Footer';
import { ArrowLeft, Mail, MapPin, Shield, Users, FileText, Clock, AlertTriangle } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (section?: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => onNavigate()}
            className="mb-8 hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl mb-6 text-primary font-medium">
              Mālama Labs Incorporated Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Last Updated: September 14, 2025
            </p>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Protected
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            
            {/* Introduction */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  1. Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  At <strong>Mālama Labs Incorporated</strong>, d/b/a Mālama Labs Incorporated ("us", "we", "our" or the "Company") we value your privacy and the importance of safeguarding your data. This Privacy Policy (the "Policy") describes our privacy practices for the activities set out below. As per your rights, we inform you how we collect, store, access, and otherwise process information relating to individuals. In this Policy, personal data ("Personal Data") refers to any information that on its own, or in combination with other available information, can identify an individual.
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Regulatory Compliance</h3>
                  <p className="mb-3">We are committed to protecting your privacy in accordance with the highest level of privacy regulation. As such, we follow the obligations under the below regulations:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Canada's Personal Information Protection and Electronic Documents Act (PIPEDA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Quebec Law 25</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>EU's General Data Protection Regulation (GDPR)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Brazil's Data Protection Legislation (LGPD)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>California's Consumer Privacy Act (CCPA/CPRA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Colorado Privacy Act (CPA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Virginia Consumer Data Protection Act (VCDPA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Connecticut Data Privacy Act (CTDPA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Utah Consumer Privacy Act (UCPA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Texas Data Privacy and Security Act (TDPSA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Oregon Consumer Privacy Act (OCPA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Montana Consumer Data Privacy Act</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Delaware Personal Data Privacy Act</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Nebraska Data Privacy Law</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>New Hampshire Data Privacy Act</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>New Jersey Data Privacy Act</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Minnesota Consumer Data Privacy Act</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Maryland Online Consumer Protection Act</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>South Africa's Protection of Personal Information Act (POPIA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Switzerland's Federal Act on Data Protection (FADP)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Saudi Arabia's Personal Data Protection Law (PDPL)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Scope</h3>
                  <p>This policy applies to the Mālama Labs Incorporated websites, domains, applications, services, and products.</p>
                  <p className="mt-3">This Policy does not apply to third-party applications, websites, products, services or platforms that may be accessed through (non-Mālama Labs Incorporated) links that we may provide to you. These sites are owned and operated independently from us, and they have their own separate privacy and data collection practices.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Processing Activities</h3>
                  <p>This Policy applies when you interact with us by doing any of the following:</p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li>Make use of our application and services as an authorized user</li>
                    <li>Visit any of our websites that link to this Privacy Statement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Personal Data Collection */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  2. Personal Data We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">What Personal Data We Collect</h3>
                  <p className="mb-3">When you make a purchase, or attempt to make a purchase, we collect the following types of Personal Data:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Account Information</strong> such as your name, email address, and password</li>
                    <li><strong>Payment Information</strong> such as your billing address, phone number, credit card, debit card or other payment method</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">How We Collect Your Personal Data</h3>
                  <p className="mb-3">We collect Personal Data from the following sources:</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">From You</h4>
                      <p className="mb-2">You may give us your Account Information, Payment Information, and other data by filling in forms, using our products or services, or corresponding with us. This includes when you:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Create an account or purchase products on our website</li>
                        <li>Use our products or services</li>
                        <li>Create content through our products or services</li>
                        <li>Express interest in our products or services</li>
                        <li>Download software and/or our mobile application</li>
                        <li>Subscribe to our newsletter</li>
                        <li>Complete a voluntary market research survey</li>
                        <li>Contact us with an inquiry or to report a problem</li>
                        <li>Log in to our website via social media</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">Automated Technologies</h4>
                      <p>As you interact with our website, we may automatically collect Device Data about your equipment, Usage Data about your browsing actions and patterns, and Contact Data where tasks remain uncompleted. We collect this data using cookies, server logs and other similar technologies.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">Third Parties</h4>
                      <p>We may receive Personal Data about you from various third parties, including analytics providers, social media platforms, and service providers.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Purpose and Legal Basis for Processing</h3>
                  <p>We collect and use your Personal Data with your consent to provide, maintain, and develop our products and services and understand how to improve them. Where we process your Personal Data to provide a product or service, we do so because it is necessary to perform contractual obligations.</p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  3. Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">What are Cookies?</h3>
                  <p>A cookie is a small file with information that your browser stores on your device. Information in this file is typically shared with the owner of the site in addition to potential partners and third parties to that business.</p>
                </div>
                <div className="bg-muted/20 rounded-lg p-4">
                  <p className="font-medium text-primary">We do not use cookies.</p>
                </div>
              </CardContent>
            </Card>

            {/* Data Rights */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  4. Your Rights for Your Personal Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Depending on your geographical location and citizenship, your rights are subject to local data privacy regulations. These rights may include:</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Right to Access</h4>
                    <p className="text-sm">You have the right to learn whether we are processing your Personal Data and to request a copy of the Personal Data we are processing about you.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Right to Rectification</h4>
                    <p className="text-sm">You have the right to have incomplete or inaccurate Personal Data that we process about you rectified.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Right to be Forgotten (Right to Erasure)</h4>
                    <p className="text-sm">You have the right to request that we delete Personal Data that we process about you, unless we need to retain such data in order to comply with a legal obligation.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Right to Restriction of Processing</h4>
                    <p className="text-sm">You have the right to restrict our processing of your Personal Data under certain circumstances.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Right to Portability</h4>
                    <p className="text-sm">You have the right to obtain Personal Data we hold about you, in a structured, electronic format, and to transmit such Personal Data to another data controller.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Right to Opt Out</h4>
                    <p className="text-sm">You have the right to opt out of the processing of your Personal Data for purposes of targeted advertising, the sale of Personal Data, and/or profiling.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Right to Objection</h4>
                    <p className="text-sm">Where the legal justification for our processing of your Personal Data is our legitimate interest, you have the right to object to such processing.</p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">How to Exercise Your Rights</h4>
                  <p className="text-sm">You can make a request to exercise any of these rights by contacting our privacy team using the information in the "Contact Us" section below. For your own privacy and security, we may require you to prove your identity before providing the requested information.</p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  5. How We Keep Your Data Safe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We have appropriate organizational safeguards and security measures in place to protect your Personal Data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">The communication between your browser and our website uses a secure encrypted connection wherever your Personal Data is involved.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">We require any third party who is contracted to process your Personal Data on our behalf to have security measures in place to protect your data.</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">In the unfortunate event of a Personal Data breach, we will notify you and any applicable regulator when we are legally required to do so.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  6. Children's Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>We do not knowingly collect Personal Data from children under the age of 16 years.</p>
              </CardContent>
            </Card>

            {/* Changes */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  7. Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>We may modify this Policy at any time. If we make changes to this Policy then we will post an updated version of this Policy at this website. When using our services, you will be asked to review and accept our Privacy Policy. In this manner, we may record your acceptance and notify you of any future changes to this Policy.</p>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card className="border-none bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  8. Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>To request a copy for your information, unsubscribe from our email list, request for your data to be deleted, or ask a question about your data privacy, we've made the process simple:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-primary">Email Us</p>
                        <a href="mailto:compliance@malamacarbon.com" className="text-primary hover:underline">
                          compliance@malamacarbon.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-primary">Write to Us</p>
                        <div className="text-sm text-muted-foreground">
                          <p>Data Privacy Officer of Mālama Labs Incorporated</p>
                          <p>505 E Kuiaha Rd.</p>
                          <p>Haiku-Pauwela, HI 96708</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-3">Data Request Form</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use our secure form to submit data requests, including access, correction, deletion, or portability requests.
                    </p>
                    <Button className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Make a Data Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
