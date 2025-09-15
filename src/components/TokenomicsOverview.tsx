import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Coins, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Globe,
  Zap
} from 'lucide-react';

export function TokenomicsOverview() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-primary font-bold">
            Tokenomics Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Credits You Can Trust — A transparent, two-stage credit system that bridges early funding with verified compliance
          </p>
        </motion.div>

        {/* LC02 → VC02 Lifecycle */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl mb-4 text-primary font-bold">
              LC02 → VC02 Lifecycle
            </h3>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* LC02 Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">LC02: Liquid Carbon Credits</CardTitle>
                  <Badge className="w-fit mx-auto bg-primary/10 text-primary border-primary/20">
                    Early-Stage Pre-Finance
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        Early-stage, pre-finance carbon credits that provide upfront capital to developers when they need it most.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        Transparent and tradable, but clearly labeled as "awaiting full verification."
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        Enables immediate project funding without waiting years for certification.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* VC02 Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl text-secondary">VC02: Verified Carbon Credits</CardTitle>
                  <Badge className="w-fit mx-auto bg-secondary/10 text-secondary border-secondary/20">
                    Compliance-Grade
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        Compliance-grade, fully validated credits backed by continuous MRV data and blockchain immutability.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        Aligned with Article 6.4 of the Paris Agreement, accepted across voluntary and compliance markets.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        Guaranteed integrity through full MRV validation and regulatory compliance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Why This Matters */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl mb-4 text-primary font-bold">
              Why This Matters
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our two-stage model solves the biggest challenge in carbon markets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="border-none bg-card/80 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Immediate Funding</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    LC02 enables projects to raise capital early, without waiting years for certification.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="border-none bg-card/80 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Guaranteed Integrity</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    LC02 automatically transitions into VC02 only after full MRV validation, ensuring the highest level of trust and compliance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="border-none bg-card/80 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Market Confidence</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Buyers can act quickly while knowing their credits will always meet regulatory and institutional standards.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Result */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                Result: A faster, more trustworthy path
              </h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                From climate action in the field to recognized carbon credits in the market — 
                bridging the gap between immediate impact and long-term verification.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
