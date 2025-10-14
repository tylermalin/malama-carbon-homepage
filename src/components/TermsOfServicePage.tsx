import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Footer } from './Footer';
import { ArrowLeft, Mail, Shield, Users, FileText, Clock, AlertTriangle, Scale, Ban, Gavel } from 'lucide-react';

interface TermsOfServicePageProps {
  onNavigate: (section?: string) => void;
}

export function TermsOfServicePage({ onNavigate }: TermsOfServicePageProps) {
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
              MĀLAMA LABS INC. – TERMS & CONDITIONS OF USE
            </h1>
            <div className="text-lg text-muted-foreground space-y-1">
              <p>Effective Date: October 1, 2025</p>
              <p>Last Updated: October 13, 2025</p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mt-4">
              <Scale className="w-4 h-4 mr-2" />
              Legal Agreement
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            
            {/* Acceptance of Terms */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  1. ACCEPTANCE OF TERMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Mālama Labs Inc., a Delaware Corporation ("Mālama Labs," "we," "our," or "us") provides online services to you subject to the following Terms of Use ("Terms of Use"), which may be updated by us from time to time. Updates will be noted on this website. In addition, when using, registering, and/or signing up for particular Mālama Labs services, you and Mālama Labs shall be subject to any posted guidelines or rules applicable to such services. All such guidelines or rules are hereby incorporated by reference into these Terms of Use.
                </p>
                <p>
                  By using our website or services, you agree that you are at least 18 years old and have the legal authority to enter into a binding contract. If you do not agree with all of these Terms, you are expressly prohibited from using the site or services and must discontinue use immediately.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  <p className="text-sm font-medium text-amber-900">
                    <strong>Important:</strong> These Terms include an agreement to resolve disputes through binding arbitration and a waiver of the right to pursue claims on a class basis, as set forth in Section 14 ("Dispute Resolution – Binding Arbitration and Waiver of Class Claims").
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  2. SERVICES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Mālama Labs provides online platforms, resources, data systems, and related services (collectively, the "Services"), which we continually improve and expand. Unless explicitly stated otherwise, any new features that augment or enhance the current Services shall be subject to these Terms of Use.
                </p>
                <p>
                  You understand and agree that the Services are provided "AS IS" and that Mālama Labs assumes no responsibility for the timeliness, deletion, mis-delivery, or failure to store any user communications or personalization settings. Mālama Labs reserves the right to modify, suspend, or discontinue the Services (or any part thereof) at any time without notice. Mālama Labs shall not be liable to you or to any third party for any such action.
                </p>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  3. PRIVACY POLICY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Registration data and certain other information about you are subject to our Privacy Policy. For more information, please review our full Privacy Policy at <a href="/privacy-policy" className="text-primary hover:underline font-medium">https://malamalabs.com/privacy-policy</a>.
                </p>
              </CardContent>
            </Card>

            {/* Use of Service */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Ban className="w-6 h-6" />
                  4. USE OF SERVICE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You agree to use the Services only as intended by Mālama Labs and to refrain from any misuse, including but not limited to the following prohibited actions:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Uploading, posting, or transmitting unlawful, abusive, obscene, or otherwise objectionable content</li>
                  <li>Harming minors</li>
                  <li>Impersonating any person or entity, including a Mālama Labs employee</li>
                  <li>Uploading or transmitting unauthorized or infringing content</li>
                  <li>Sending unsolicited advertising ("spam")</li>
                  <li>Introducing viruses or harmful code</li>
                  <li>Interfering with the Services or connected networks</li>
                  <li>Accessing or collecting personal data about others without authorization</li>
                </ul>
                <div className="bg-primary/5 rounded-lg p-4 mt-4">
                  <p className="text-sm">Mālama Labs reserves the right to remove any content that violates these Terms or is otherwise objectionable, and to cooperate with law enforcement where required.</p>
                </div>
              </CardContent>
            </Card>

            {/* Indemnification */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  5. INDEMNIFICATION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  You agree to indemnify, defend, and hold harmless Mālama Labs, its affiliates, officers, employees, and agents from any loss, liability, claim, or demand, including reasonable attorneys' fees, made by any third party due to or arising out of (1) your use of the Services, (2) your breach of these Terms, or (3) your violation of any rights of another.
                </p>
              </CardContent>
            </Card>

            {/* No Resale of Service */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Ban className="w-6 h-6" />
                  6. NO RESALE OF SERVICE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services for commercial purposes without Mālama Labs' express written consent.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  7. TERMINATION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Mālama Labs may, in its sole discretion, terminate your access to the Services if it believes you have violated these Terms. Mālama Labs may also discontinue providing the Services, in whole or in part, at any time without notice. You agree that Mālama Labs shall not be liable for any termination or suspension of your access.
                </p>
              </CardContent>
            </Card>

            {/* Dealings with Third Parties */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  8. DEALINGS WITH THIRD PARTIES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your correspondence or business dealings with advertisers or merchants found on or through the Services are solely between you and such third parties. Mālama Labs shall not be liable for any loss or damage incurred as a result of such dealings.
                </p>
              </CardContent>
            </Card>

            {/* Links */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  9. LINKS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  The Services may contain links to other websites. Mālama Labs is not responsible for the availability or accuracy of such external sites or resources and does not endorse them. You acknowledge that Mālama Labs shall not be liable for any damages resulting from your use of or reliance on any such external content.
                </p>
              </CardContent>
            </Card>

            {/* Proprietary Rights */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  10. PROPRIETARY RIGHTS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  All proprietary rights in the Services and any software used in connection with the Services are owned or licensed by Mālama Labs. The website design, text, graphics, logos, and arrangement thereof are the exclusive property of Mālama Labs. You may not copy, modify, distribute, or create derivative works from the Services or software without written authorization from Mālama Labs.
                </p>
              </CardContent>
            </Card>

            {/* Disclaimer of Warranties */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  11. DISCLAIMER OF WARRANTIES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Your use of the Services is at your sole risk. The Services are provided "AS IS" and "AS AVAILABLE." Mālama Labs expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p>Mālama Labs makes no warranty that:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>The Services will meet your requirements</li>
                  <li>The Services will be uninterrupted, timely, secure, or error-free</li>
                  <li>The results from using the Services will be accurate or reliable</li>
                  <li>Any errors will be corrected</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  12. LIMITATION OF LIABILITY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  To the maximum extent permitted by law, Mālama Labs shall not be liable for any indirect, incidental, special, consequential, or exemplary damages (including lost profits, goodwill, or data) arising out of or related to your use of the Services.
                </p>
                <div className="bg-primary/5 rounded-lg p-4">
                  <p className="font-medium">
                    Our total liability to you for any claim shall not exceed the greater of (1) the amount paid by you in the six (6) months preceding the event or (2) one hundred dollars ($100).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trademarks */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  13. TRADEMARKS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  "Mālama Labs," "Mālama Labs Inc.," and associated logos are trademarks of Mālama Labs Inc. You may not use these marks without prior written permission. Mālama Labs respects the intellectual property of others. Claims of copyright infringement should be sent to <a href="mailto:contact@malamalabs.com" className="text-primary hover:underline">contact@malamalabs.com</a>.
                </p>
              </CardContent>
            </Card>

            {/* Dispute Resolution */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Gavel className="w-6 h-6" />
                  14. DISPUTE RESOLUTION – BINDING ARBITRATION AND WAIVER OF CLASS CLAIMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You and Mālama Labs agree to resolve all disputes arising out of or related to these Terms through binding arbitration, administered by the American Arbitration Association under its Commercial Arbitration Rules.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  <p className="font-medium text-amber-900">You agree to waive any right to participate in a class action or representative proceeding.</p>
                </div>
                <p>
                  Any arbitration hearings will take place in Los Angeles County, California, unless otherwise mutually agreed.
                </p>
                <p className="text-sm text-muted-foreground">
                  This section does not preclude either party from seeking injunctive relief or filing a claim for intellectual property infringement in court.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="border-none bg-card/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Scale className="w-6 h-6" />
                  15. GOVERNING LAW AND MISCELLANEOUS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  These Terms of Use constitute the entire agreement between you and Mālama Labs and supersede any prior agreements. They are governed by the laws of the State of Delaware, without regard to its conflict-of-law principles.
                </p>
                <p className="text-sm text-muted-foreground">
                  Section headings are for convenience only and have no legal effect.
                </p>
                <p className="text-sm text-muted-foreground">
                  © 2025 Mālama Labs Inc. All Rights Reserved.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-none bg-gradient-to-r from-primary/5 to-secondary/5 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  CONTACT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">Mālama Labs Inc.</p>
                <p>Email: <a href="mailto:contact@malamalabs.com" className="text-primary hover:underline">contact@malamalabs.com</a></p>
                <p>Address: 505 E Kuiaha Rd, Haiku, HI 96708</p>
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

