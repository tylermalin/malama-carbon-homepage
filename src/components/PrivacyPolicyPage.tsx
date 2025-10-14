import React from 'react';
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
              MĀLAMA LABS INC. – PRIVACY POLICY
            </h1>
            <div className="text-lg text-muted-foreground space-y-1">
              <p>Effective Date: October 1, 2025</p>
              <p>Last Updated: October 13, 2025</p>
            </div>
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
                  1. INTRODUCTION
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Mālama Labs Inc., a Delaware Corporation ("Mālama Labs," "we," "our," or "us"), is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website (<a href="https://malamalabs.com" className="text-primary hover:underline">https://malamalabs.com</a>) or use our related digital services (collectively, the "Services").
                </p>
                <p>
                  By using our Services, you consent to the practices described in this Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  2. INFORMATION WE COLLECT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We collect both personal and non-personal information to provide and improve our Services.</p>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">2.1 Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Name, email address, and contact information</li>
                    <li>Organization or company name</li>
                    <li>Account credentials (if applicable)</li>
                    <li>Payment information (when applicable)</li>
                    <li>Any information voluntarily submitted through forms or correspondence</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">2.2 Automatically Collected Information</h3>
                  <p className="mb-2">When you access our website, we may automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>IP address, browser type, and operating system</li>
                    <li>Device identifiers and access times</li>
                    <li>Pages viewed, time spent, and referring URLs</li>
                    <li>Cookies and tracking technologies (see Cookie Policy)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">2.3 Third-Party Data</h3>
                  <p>We may receive information from third-party service providers, such as analytics tools, payment processors, or public databases.</p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  3. HOW WE USE YOUR INFORMATION
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We use collected data to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide, operate, and maintain our Services</li>
                  <li>Improve user experience and website functionality</li>
                  <li>Communicate with you (support, updates, marketing)</li>
                  <li>Process payments and fulfill service obligations</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
                <div className="bg-primary/5 rounded-lg p-4 mt-4">
                  <p className="font-medium text-primary">We do not sell or rent your personal information.</p>
                </div>
              </CardContent>
            </Card>

            {/* Sharing and Disclosure */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  4. SHARING AND DISCLOSURE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We may share your information only with:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Service providers performing operational functions (hosting, analytics, payment processing)</li>
                  <li>Legal authorities when required by law, subpoena, or legal process</li>
                  <li>Affiliates and partners assisting in service delivery (under confidentiality agreements)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  5. DATA RETENTION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>We retain personal data for as long as necessary to fulfill the purposes outlined here or as required by law. Users may request deletion of their data at any time (see Section 8).</p>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  6. DATA SECURITY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We implement technical and organizational measures to protect your data from unauthorized access, loss, or misuse. However, no internet-based service can guarantee absolute security.</p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  7. YOUR RIGHTS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Depending on your jurisdiction (e.g., GDPR, CCPA), you may have the right to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access, correct, or delete your data</li>
                  <li>Object to or restrict processing</li>
                  <li>Withdraw consent at any time</li>
                  <li>Request data portability</li>
                </ul>
                <div className="bg-primary/5 rounded-lg p-4 mt-4">
                  <p>To exercise these rights, contact <a href="mailto:privacy@malamalabs.com" className="text-primary hover:underline font-medium">privacy@malamalabs.com</a>.</p>
                </div>
              </CardContent>
            </Card>

            {/* International Data Transfers */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  8. INTERNATIONAL DATA TRANSFERS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your data may be processed in the United States or other jurisdictions where data protection laws differ. Mālama Labs ensures appropriate safeguards for such transfers.</p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  9. CHILDREN'S PRIVACY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our Services are not directed to individuals under 18. We do not knowingly collect information from minors.</p>
              </CardContent>
            </Card>

            {/* Changes to This Policy */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  10. CHANGES TO THIS POLICY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>We may update this Privacy Policy from time to time. Changes will be posted with a new "Last Updated" date. Continued use of our Services signifies your acceptance of the revised policy.</p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-none bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  11. CONTACT INFORMATION
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>For privacy-related inquiries, please contact:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-primary">Mālama Labs Inc.</p>
                      <p className="text-sm">Email: <a href="mailto:privacy@malamalabs.com" className="text-primary hover:underline">privacy@malamalabs.com</a></p>
                      <p className="text-sm text-muted-foreground">Address: [Insert Business Address]</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Policy */}
            <div className="border-t-4 border-primary/20 pt-12 mt-12">
              <h2 className="text-3xl md:text-4xl mb-6 text-primary font-medium text-center">
                MĀLAMA LABS INC. – COOKIE POLICY
              </h2>
              <p className="text-center text-muted-foreground mb-8">Effective Date: October 1, 2025</p>
            </div>

            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  1. WHAT ARE COOKIES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cookies are small text files placed on your device by websites you visit. They help us improve functionality, security, and user experience.</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  2. HOW WE USE COOKIES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We use cookies for:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Essential Operations:</strong> Enable core site features like security and session management.</li>
                  <li><strong>Analytics:</strong> Track usage patterns to improve the website (Google Analytics, Plausible, etc.).</li>
                  <li><strong>Preferences:</strong> Remember your settings, such as language or region.</li>
                  <li><strong>Marketing (optional):</strong> Deliver personalized content and measure campaign effectiveness.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  3. MANAGING COOKIES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You can control cookies through your browser settings:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Block or delete existing cookies</li>
                  <li>Opt out of analytics tracking</li>
                  <li>Receive alerts before new cookies are placed</li>
                </ul>
                <div className="bg-muted/20 rounded-lg p-4 mt-4">
                  <p className="text-sm"><strong>Note:</strong> Disabling certain cookies may affect site functionality.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  4. THIRD-PARTY COOKIES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Some cookies originate from third-party providers integrated into our site (e.g., analytics, payment processors, video embeds). These providers have their own privacy policies.</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  5. UPDATES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>We may update this Cookie Policy as our practices evolve. Updates will be posted on this page with a revised effective date.</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  CONTACT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">Mālama Labs Inc.</p>
                <p>Email: <a href="mailto:privacy@malamalabs.com" className="text-primary hover:underline">privacy@malamalabs.com</a></p>
                <p>Website: <a href="https://malamalabs.com" className="text-primary hover:underline">https://malamalabs.com</a></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer 
        onShowDocumentation={() => {}}
        onShowBlog={() => {}}
        onShowPlatform={() => {}}
        onShowHowItWorks={() => {}}
        onShowAbout={() => {}}
        onShowTeam={() => {}}
        onShowContact={() => {}}
        onShowCareers={() => {}}
        onShowFAQ={() => {}}
        onShowPrivacyPolicy={() => {}}
        onShowTermsOfService={() => {}}
        onShowCookiePolicy={() => {}}
        onShowCarbonStudio={() => {}}
        onShowCarbonProtocols={() => {}}
        onShowDMRVEngine={() => {}}
        onShowFinancials={() => {}}
        onShowInvestor={() => {}}
        onShowAdvisory={() => {}}
      />
    </div>
  );
}
