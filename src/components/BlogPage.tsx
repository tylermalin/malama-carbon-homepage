import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  BookOpen, 
  ExternalLink, 
  Calendar, 
  ArrowRight,
  User,
  TrendingUp,
  Lightbulb,
  Globe,
  Target
} from 'lucide-react';
import { WEFBlockchainBlogPost } from './blog/WEFBlockchainBlogPost';

interface BlogPageProps {
  onNavigate: (section?: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [viewingPost, setViewingPost] = React.useState<string | null>(null);

  // Handle viewing individual blog posts
  if (viewingPost === 'wef-blockchain-climate') {
    return <WEFBlockchainBlogPost onNavigate={() => setViewingPost(null)} />;
  }

  const featuredArticles = [
    {
      id: 'wef-blockchain-climate',
      title: "Blockchains and Climate: Lessons from the WEF White Paper",
      excerpt: "How blockchain infrastructure can accelerate credible climate action—and what barriers remain. An analysis of the World Economic Forum's latest research on scaling climate solutions.",
      category: "Policy & Standards",
      readTime: "8 min read",
      date: "Jan 2025",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY2xpbWF0ZSUyMGFjdGlvbnxlbnwxfHx8fDE3NTY5ODc5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Blockchain", "Climate Action", "WEF", "Policy"],
      featured: true,
      internal: true
    },
    {
      title: "Bridging the CDR Gap: Why the SBTi Net Zero Standard Must Expand Beyond Scope 1",
      excerpt: "Exploring how the Science Based Targets initiative (SBTi) can evolve to better address carbon dioxide removal (CDR) in corporate net-zero strategies, moving beyond traditional Scope 1 emissions.",
      url: "https://medium.com/@tylermalin/bridging-the-cdr-gap-why-the-sbti-net-zero-standard-must-expand-beyond-scope-1-a3cd695d6dc4",
      category: "Policy & Standards",
      readTime: "8 min read",
      date: "Dec 2024",
      image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwcmVuZXdhYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc1Njg5NjA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["SBTi", "Net Zero", "CDR", "Policy"],
      featured: true
    },
    {
      title: "Rethinking Carbon Removal: Mālama Labs' Commitment to Biochar Amidst DAC Challenges",
      excerpt: "An in-depth look at why Mālama Labs continues to champion biochar technology for carbon sequestration while the direct air capture (DAC) industry faces significant hurdles and market corrections.",
      url: "https://tylermalin.medium.com/rethinking-carbon-removal-mālama-labs-commitment-to-biochar-amidst-dac-challenges-a2b45eacf240",
      category: "Technology Deep Dive",
      readTime: "12 min read", 
      date: "Nov 2024",
      image: "https://images.unsplash.com/photo-1692397733387-632c32c500d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib24lMjByZW1vdmFsJTIwdGVjaG5vbG9neSUyMGJpb2NoYXJ8ZW58MXx8fHwxNzU2OTg3OTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Biochar", "DAC", "Technology", "Carbon Removal"],
      featured: true
    }
  ];

  const upcomingTopics = [
    {
      title: "The Future of dMRV in Carbon Markets",
      description: "How digital monitoring, reporting, and verification will transform carbon credit transparency",
      category: "Technology",
      icon: TrendingUp,
      status: "Coming Soon"
    },
    {
      title: "Blockchain's Role in Carbon Credit Integrity",
      description: "Exploring immutable ledger technology for transparent carbon credit tracking",
      category: "Blockchain",
      icon: Lightbulb,
      status: "In Draft"
    },
    {
      title: "Scaling Biochar: From Lab to Global Impact",
      description: "The practical challenges and opportunities in scaling biochar production worldwide",
      category: "Scaling",
      icon: Globe,
      status: "Research Phase"
    },
    {
      title: "Policy Framework for Durable CDR",
      description: "Analyzing regulatory needs for effective carbon dioxide removal policies",
      category: "Policy",
      icon: Target,
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 text-lg px-6 py-2">
              <BookOpen className="w-5 h-5 mr-2" />
              Mālama Insights
            </Badge>
            
            <h1 className="text-6xl md:text-7xl mb-8 text-primary leading-tight">
              Thought Leadership in
              <span className="block text-secondary">Carbon Removal</span>
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Deep insights into carbon sequestration technology, policy frameworks, 
              and the future of durable carbon removal. Written by our team of experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => window.open('https://medium.com/@tylermalin', '_blank')}
                className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
              >
                <User className="w-5 h-5 mr-2" />
                Follow on Medium
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate()}
                className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
              >
                Back to Platform
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6 text-primary">
              Featured Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In-depth analysis and insights from our CEO Tyler Malin on the 
              evolving landscape of carbon removal technology and policy.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-1 gap-12">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 group hover:border-primary/20">
                  <div className="lg:flex">
                    <div className="lg:w-1/2 relative overflow-hidden">
                      <ImageWithFallback 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="lg:w-1/2 p-8 lg:p-12">
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </div>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl mb-4 text-primary leading-tight">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => {
                          if (article.internal && article.id) {
                            setViewingPost(article.id);
                          } else if (article.url) {
                            window.open(article.url, '_blank');
                          }
                        }}
                        className="group-hover:gap-3 transition-all duration-300"
                      >
                        Read Full Article
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Spotlight */}
      <section className="py-20 px-6 bg-accent/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h2 className="text-4xl mb-6 text-primary">
              Tyler Malin, CEO & Founder
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Tyler brings deep expertise in carbon removal technology and sustainable 
              business practices. His writing explores the intersection of policy, 
              technology, and practical implementation in the carbon removal space.
            </p>
            
            <Button 
              size="lg" 
              onClick={() => window.open('https://medium.com/@tylermalin', '_blank')}
              className="hover:scale-105 transition-transform duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Follow Tyler on Medium
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Topics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6 text-primary">
              Upcoming Topics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay tuned for upcoming deep dives into cutting-edge topics 
              in carbon removal, policy, and technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 group hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <topic.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge 
                        variant="secondary"
                        className="text-xs"
                      >
                        {topic.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-primary">{topic.title}</CardTitle>
                    <Badge variant="outline" className="text-xs w-fit">
                      {topic.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-8 text-primary">
              Stay Updated
            </h2>
            
            <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
              Get notified when new articles are published and stay ahead 
              of the latest developments in carbon removal technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={() => window.open('mailto:hello@malama.co?subject=Blog Newsletter Signup', '_blank')}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <BookOpen className="w-6 h-6 mr-3" />
                Subscribe to Updates
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('https://medium.com/@tylermalin', '_blank')}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <ExternalLink className="w-6 h-6 mr-3" />
                Read on Medium
              </Button>
            </div>

            <div className="mt-12 p-6 bg-background/80 rounded-2xl border border-border/50">
              <p className="text-lg text-muted-foreground">
                <strong className="text-primary">Expert Insights Delivered.</strong> Join our 
                community of carbon removal professionals and stay informed on the latest trends.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}