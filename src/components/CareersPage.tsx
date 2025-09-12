import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Zap,
  Heart,
  Globe,
  Code,
  BarChart3,
  Leaf,
  Send
} from 'lucide-react';

interface CareersPageProps {
  onNavigate: (section?: string) => void;
}

export function CareersPage({ onNavigate }: CareersPageProps) {
  const jobOpenings = [
    {
      title: "Senior Blockchain Engineer",
      department: "Engineering",
      location: "Remote / Honolulu, HI",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Build and scale our blockchain infrastructure for carbon credit verification and trading. Work with Ethereum, smart contracts, and decentralized systems.",
      requirements: [
        "5+ years blockchain development experience",
        "Expertise in Solidity and Web3 technologies",
        "Experience with DeFi protocols preferred",
        "Strong understanding of consensus mechanisms"
      ],
      skills: ["Blockchain", "Solidity", "Web3", "DeFi", "Smart Contracts"]
    },
    {
      title: "Carbon Market Analyst",
      department: "Business Development",
      location: "Remote / New York, NY",
      type: "Full-time", 
      salary: "$80k - $110k",
      description: "Analyze carbon market trends, develop pricing strategies, and build relationships with carbon credit buyers. Drive our market intelligence and strategy.",
      requirements: [
        "3+ years experience in carbon markets or environmental finance",
        "Strong analytical and financial modeling skills",
        "Knowledge of voluntary and compliance carbon markets",
        "Excellent communication and presentation skills"
      ],
      skills: ["Carbon Markets", "Financial Analysis", "Market Research", "Strategy"]
    },
    {
      title: "Community Partnership Manager",
      department: "Partnerships",
      location: "Honolulu, HI",
      type: "Full-time",
      salary: "$70k - $95k", 
      description: "Build relationships with land stewards, community organizations, and local partners. Help expand our network of carbon sequestration projects across Hawaii and beyond.",
      requirements: [
        "Experience in community engagement or partnership development",
        "Strong relationship-building and communication skills",
        "Knowledge of Hawaiian culture and land stewardship preferred",
        "Willingness to travel and work directly with communities"
      ],
      skills: ["Community Relations", "Partnership Development", "Cultural Competency", "Project Management"]
    },
    {
      title: "IoT Systems Developer",
      department: "Engineering", 
      location: "Remote / San Francisco, CA",
      type: "Full-time",
      salary: "$100k - $130k",
      description: "Develop and maintain our IoT sensor networks for carbon monitoring. Work on embedded systems, data collection, and edge computing solutions.",
      requirements: [
        "3+ years IoT or embedded systems development",
        "Experience with sensor hardware and data collection",
        "Knowledge of edge computing and wireless protocols",
        "Python, C++, or similar programming languages"
      ],
      skills: ["IoT", "Embedded Systems", "Sensors", "Edge Computing", "Python"]
    },
    {
      title: "Product Designer",
      department: "Product",
      location: "Remote / San Francisco, CA", 
      type: "Full-time",
      salary: "$90k - $120k",
      description: "Design user experiences for land stewards and carbon credit buyers. Create intuitive interfaces for complex environmental data and marketplace functionality.",
      requirements: [
        "4+ years product design experience",
        "Strong portfolio of web and mobile design work",
        "Experience with design systems and component libraries",
        "Knowledge of data visualization and dashboard design"
      ],
      skills: ["UI/UX Design", "Design Systems", "Data Visualization", "Prototyping"]
    },
    {
      title: "Climate Science Researcher",
      department: "Science",
      location: "Remote / UC Davis",
      type: "Contract",
      salary: "$60k - $80k",
      description: "Research and validate carbon sequestration methodologies. Work with our science team to improve measurement and verification protocols.",
      requirements: [
        "PhD in climate science, environmental science, or related field",
        "Experience with carbon cycle research",
        "Published research in peer-reviewed journals",
        "Knowledge of soil carbon and biochar systems preferred"
      ],
      skills: ["Climate Science", "Research", "Data Analysis", "Soil Carbon", "Biochar"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness stipends."
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Market-rate salaries, equity participation, and performance bonuses. Annual compensation reviews."
    },
    {
      icon: Clock,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours. Unlimited PTO and family leave policies."
    },
    {
      icon: Zap,
      title: "Professional Growth",
      description: "Learning stipends, conference attendance, and mentorship programs. Career development support."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Work on solutions that directly address climate change and support local communities worldwide."
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Collaborate with passionate, diverse team members who are experts in their fields."
    }
  ];

  const values = [
    {
      title: "Mālama ʻĀina",
      description: "Care for the land and environment in everything we do"
    },
    {
      title: "Community First",
      description: "Prioritize community needs and empowerment"
    },
    {
      title: "Radical Transparency",
      description: "Open communication and honest feedback"
    },
    {
      title: "Continuous Learning", 
      description: "Always growing and improving together"
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
              <Briefcase className="w-5 h-5 mr-2" />
              Join Our Mission
            </Badge>
            
            <h1 className="text-5xl md:text-6xl mb-6 text-primary leading-tight">
              Build the Future of
              <span className="block text-secondary">Carbon Removal</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Join a diverse team of technologists, scientists, and community builders working to democratize 
              access to carbon markets while empowering land stewards worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Why Join Mālama Carbon?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Be part of a mission-driven team building technology that creates real environmental and social impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300 h-full border-2">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl mb-3 text-primary">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 px-6 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Current Openings</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore opportunities to make a meaningful impact in climate technology.
            </p>
          </motion.div>

          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 hover:shadow-lg transition-shadow duration-300 bg-background">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl text-primary">{job.title}</CardTitle>
                          <Badge variant="outline">{job.department}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="hover:scale-105 transition-transform duration-300 lg:self-start"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{job.description}</p>
                    
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-primary mb-3">Requirements</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-primary mb-3">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our work and shape our culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-2 h-full">
                  <h3 className="text-xl mb-3 text-primary">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-6 text-primary">Application Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our hiring process is designed to be transparent, respectful, and give you a clear picture of the role and our team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-foreground">1</span>
              </div>
              <h3 className="text-lg mb-3 text-primary">Apply</h3>
              <p className="text-muted-foreground">Submit your application with resume and cover letter</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-secondary-foreground">2</span>
              </div>
              <h3 className="text-lg mb-3 text-primary">Screen</h3>
              <p className="text-muted-foreground">Brief phone or video call to discuss the role and your background</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-accent-foreground">3</span>
              </div>
              <h3 className="text-lg mb-3 text-primary">Interview</h3>
              <p className="text-muted-foreground">In-depth interviews with team members and technical assessments</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">4</span>
              </div>
              <h3 className="text-lg mb-3 text-primary">Decision</h3>
              <p className="text-muted-foreground">Reference checks and offer discussion</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* No Current Fit */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 text-center border-2 bg-primary/5">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-secondary-foreground" />
              </div>
              
              <h2 className="text-3xl mb-4 text-primary">Don't See a Perfect Fit?</h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                We're always interested in connecting with passionate people who share our mission. 
                Send us your resume and tell us how you'd like to contribute to our work.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send General Application
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate()}
                  className="text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Learn About Our Team
                </Button>
              </div>

              <Separator className="my-8" />
              
              <p className="text-sm text-muted-foreground">
                <strong>Equal Opportunity Employer:</strong> Mālama Carbon is committed to creating a diverse 
                and inclusive workplace. We welcome applications from all qualified candidates regardless of 
                race, gender, age, religion, sexual orientation, or any other protected characteristic.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}