import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import tylerHeadshot from '../assets/tyler headshopt.JPG';
import dominickHeadshot from '../assets/Dominick.png';
import jeffreyHeadshot from '../assets/jeffrey.jpeg';
import { 
  ArrowLeft,
  Users,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Award
} from 'lucide-react';

interface TeamPageProps {
  onNavigate: (section?: string) => void;
}

export function TeamPage({ onNavigate }: TeamPageProps) {
  const teamMembers = [
    {
      name: "Tyler Malin",
      role: "Co-Founder & CEO",
      bio: "Visionary leader with deep expertise in carbon markets and sustainable technology. Passionate about building solutions that bridge traditional land stewardship with cutting-edge climate technology.",
      education: "Environmental Science & Business",
      location: "Hawaiʻi",
      expertise: ["Carbon Markets", "Strategic Leadership", "Climate Technology"],
      image: tylerHeadshot
    },
    {
      name: "Dominick Garey",
      role: "Co-Founder & CTO",
      bio: "Technology innovator specializing in blockchain systems and digital measurement, reporting, and verification (dMRV) platforms. Expert in building scalable solutions for carbon credit verification and trading.",
      education: "Computer Science & Engineering",
      location: "Hawaiʻi",
      expertise: ["Blockchain Technology", "dMRV Systems", "Software Architecture"],
      image: dominickHeadshot
    },
    {
      name: "Jeffrey Wise",
      role: "Co-Founder & Head of Operations",
      bio: "Operations specialist with extensive experience in project management and sustainable business development. Focused on creating efficient systems that support carbon project implementation and community engagement.",
      education: "Business Administration & Environmental Studies",
      location: "Hawaiʻi",
      expertise: ["Operations Management", "Project Development", "Community Relations"],
      image: jeffreyHeadshot
    }
  ];

  const advisors = [
    {
      name: "Dr. Robert Jackson",
      role: "Scientific Advisor",
      organization: "Stanford Woods Institute",
      expertise: "Global carbon cycle research"
    },
    {
      name: "Nan Ransohoff",
      role: "Climate Markets Advisor", 
      organization: "Stripe Climate",
      expertise: "Carbon removal procurement"
    },
    {
      name: "Kathy Hannun",
      role: "Technology Advisor",
      organization: "Former President, Dandelion Energy",
      expertise: "Climate technology scaling"
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
              <Users className="w-5 h-5 mr-2" />
              Meet Our Team
            </Badge>
            
            <h1 className="text-5xl md:text-6xl mb-6 text-primary leading-tight">
              Meet Our Team
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Our founding team brings together diverse expertise in carbon markets, blockchain technology, 
              and sustainable operations to build innovative solutions for climate action and community impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Founding Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three passionate founders united by a shared vision for climate action and sustainable technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2">
                  <CardHeader className="text-center pb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                    <Badge variant="outline" className="mt-2">{member.role}</Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{member.education}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{member.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Linkedin className="w-4 h-4 text-primary" />
                      </button>
                      <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-20 px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Advisory Board</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              World-class advisors guiding our technology and market strategy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 bg-background border-2">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  
                  <h3 className="text-lg mb-1 text-primary">{advisor.name}</h3>
                  <Badge variant="outline" className="mb-3">{advisor.role}</Badge>
                  
                  <p className="text-sm text-muted-foreground mb-2">{advisor.organization}</p>
                  <p className="text-sm text-muted-foreground italic">{advisor.expertise}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Our Culture</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on Hawaiian values, powered by diverse perspectives, united by climate impact.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-2 bg-primary/5">
                <h3 className="text-2xl mb-6 text-primary">What We Believe</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary-foreground">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-1">Collective Impact</h4>
                      <p className="text-muted-foreground">Climate change requires collaboration. We succeed when our communities succeed.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-secondary-foreground">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-1">Continuous Learning</h4>
                      <p className="text-muted-foreground">We listen to land stewards, scientists, and communities to improve our solutions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-accent-foreground">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-1">Radical Transparency</h4>
                      <p className="text-muted-foreground">Open-source thinking, clear communication, and honest accountability.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-1">Long-term Thinking</h4>
                      <p className="text-muted-foreground">Building for the next seven generations, not just the next quarter.</p>
                    </div>
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
              <Card className="p-8 border-2 bg-secondary/5">
                <h3 className="text-2xl mb-6 text-primary">Join Our Mission</h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We're always looking for passionate people who share our commitment to climate action 
                  and community empowerment. Whether you're a technologist, scientist, business developer, 
                  or community organizer, there may be a place for you on our team.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-background rounded-lg border border-border/50">
                    <h4 className="font-medium text-primary mb-2">Current Openings</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Senior Blockchain Engineer</li>
                      <li>• Carbon Market Analyst</li>
                      <li>• Community Partnership Manager</li>
                      <li>• IoT Systems Developer</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={() => onNavigate()}
                    className="w-full hover:scale-105 transition-transform duration-300"
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    View All Positions
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-8 text-primary">
              Want to Connect?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Whether you're interested in joining our team, partnering with us, or learning 
              more about our mission, we'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate()}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <Mail className="w-6 h-6 mr-3" />
                Contact Us
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate()}
                className="text-xl px-10 py-6 hover:scale-105 transition-transform duration-300"
              >
                <Briefcase className="w-6 h-6 mr-3" />
                View Careers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}