import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Plus, 
  MapPin, 
  Leaf, 
  Activity, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Zap,
  Award,
  Loader2,
  AlertCircle,
  User,
  Building2,
  Mail,
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { projectAPI } from '../utils/supabase/client';

interface Project {
  id: string;
  name: string;
  location: string;
  projectType: string;
  description: string;
  status: string;
  created_at: string;
  carbonSequestered: number;
  sensorsDeployed: number;
  biocharsProduced: number;
  creditsIssued: number;
}

interface ProjectDashboardProps {
  user: {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  };
}

export function ProjectDashboard({ user }: ProjectDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(true);
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);

  // User profile data (would come from database in production)
  const [userProfile, setUserProfile] = useState({
    name: user.name,
    email: user.email,
    company: 'Sample Company', // Would load from database
    profileTypes: ['Project Developer'], // Would load from database
    registrationDate: new Date().toLocaleDateString(),
    industry: 'Carbon Markets', // Would load from database
  });

  // New project form state
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    projectType: '',
    description: ''
  });

  const projectTypes = [
    'Biochar Production',
    'Reforestation',
    'Soil Carbon Enhancement',
    'Regenerative Agriculture',
    'Coastal Restoration'
  ];

  // Load user projects
  useEffect(() => {
    loadProjects();
  }, [user]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await projectAPI.getUserProjects(user.accessToken);
      
      if (error) {
        setError(error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      setError('Failed to load projects');
      console.error('Load projects error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError('');

    try {
      console.log('Creating project with access token:', user.accessToken);
      console.log('Project data:', newProject);
      
      const { data, error } = await projectAPI.createProject(newProject, user.accessToken);
      
      if (error) {
        console.error('Project creation API error:', error);
        setError(error);
        return;
      }

      console.log('Project created successfully:', data);
      setProjects(prev => [data.project, ...prev]);
      setNewProject({ name: '', location: '', projectType: '', description: '' });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Create project error:', error);
      setError('Failed to create project');
    } finally {
      setIsCreating(false);
    }
  };

  const getTotalStats = () => {
    return {
      totalCarbon: projects.reduce((sum, p) => sum + p.carbonSequestered, 0),
      totalSensors: projects.reduce((sum, p) => sum + p.sensorsDeployed, 0),
      totalBiochar: projects.reduce((sum, p) => sum + p.biocharsProduced, 0),
      totalCredits: projects.reduce((sum, p) => sum + p.creditsIssued, 0)
    };
  };

  const stats = getTotalStats();

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading your projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* User Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary/5 via-background to-secondary/5 border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{userProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">User Profile</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfileDetails(!showProfileDetails)}
                  className="hover:scale-105 transition-transform"
                >
                  {showProfileDetails ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Show Details
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <AnimatePresence>
              {showProfileDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{userProfile.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Company</p>
                          <p className="font-medium">{userProfile.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Registered Since</p>
                          <p className="font-medium">{userProfile.registrationDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-2">Profile Types</p>
                          <div className="flex flex-wrap gap-2">
                            {userProfile.profileTypes.map((type, index) => (
                              <Badge key={index} variant="default" className="text-sm">
                                {type}
                              </Badge>
                            ))}
                          </div>
                          <Dialog open={isAddProfileModalOpen} onOpenChange={setIsAddProfileModalOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-3 hover:scale-105 transition-transform"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Profile Type
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add New Profile Type</DialogTitle>
                                <DialogDescription>
                                  Register for additional profile types to access more features and dashboards.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-1 gap-4">
                                  {['Project Developer', 'Carbon Credit Buyer', 'Land Steward', 'Industry Partner'].map((type) => (
                                    <Card
                                      key={type}
                                      className={`p-4 cursor-pointer hover:border-primary transition-all ${
                                        userProfile.profileTypes.includes(type) ? 'opacity-50 pointer-events-none' : ''
                                      }`}
                                      onClick={() => {
                                        if (!userProfile.profileTypes.includes(type)) {
                                          setUserProfile({
                                            ...userProfile,
                                            profileTypes: [...userProfile.profileTypes, type]
                                          });
                                          setIsAddProfileModalOpen(false);
                                        }
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h4 className="font-semibold">{type}</h4>
                                          <p className="text-sm text-muted-foreground">
                                            {type === 'Project Developer' && 'Create and manage carbon projects'}
                                            {type === 'Carbon Credit Buyer' && 'Purchase verified carbon credits'}
                                            {type === 'Land Steward' && 'Manage land-based carbon sequestration'}
                                            {type === 'Industry Partner' && 'Collaborate on carbon solutions'}
                                          </p>
                                        </div>
                                        {userProfile.profileTypes.includes(type) && (
                                          <Badge variant="secondary">Active</Badge>
                                        )}
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Industry</p>
                          <p className="font-medium">{userProfile.industry}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        <motion.div 
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary">
              Welcome back, {user.name}
            </h2>
            <p className="text-xl text-muted-foreground">
              Track and manage your carbon removal projects
            </p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="hover:scale-105 transition-transform duration-300">
                <Plus className="w-5 h-5 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Carbon Project</DialogTitle>
                <DialogDescription>
                  Fill out the form below to create a new carbon removal project and start tracking your environmental impact.
                </DialogDescription>
              </DialogHeader>
              
              {error && (
                <Alert className="border-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="Enter project name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    required
                    disabled={isCreating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-location">Location</Label>
                  <Input
                    id="project-location"
                    placeholder="e.g., Maui, Hawaii"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    required
                    disabled={isCreating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Select 
                    value={newProject.projectType} 
                    onValueChange={(value) => setNewProject({ ...newProject, projectType: value })}
                    required
                    disabled={isCreating}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">Description (Optional)</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Describe your carbon removal project"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    disabled={isCreating}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isCreating}>
                  {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Project
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Carbon Sequestered</p>
                    <p className="text-2xl font-medium text-primary">
                      {stats.totalCarbon.toFixed(1)} tCO₂
                    </p>
                  </div>
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Sensors</p>
                    <p className="text-2xl font-medium text-primary">{stats.totalSensors}</p>
                  </div>
                  <Activity className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-none bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Biochar Produced</p>
                    <p className="text-2xl font-medium text-primary">
                      {stats.totalBiochar.toFixed(1)} tons
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-accent-foreground" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-none bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Credits Issued</p>
                    <p className="text-2xl font-medium text-primary">{stats.totalCredits}</p>
                  </div>
                  <Award className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl mb-2 text-primary">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first carbon removal project to start tracking your impact
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              Create Your First Project
            </Button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <Card className="border-none bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-primary">{project.name}</CardTitle>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{project.location}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium">{project.projectType}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="text-center">
                            <p className="text-lg font-medium text-primary">
                              {project.carbonSequestered.toFixed(1)}
                            </p>
                            <p className="text-xs text-muted-foreground">tCO₂ sequestered</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-lg font-medium text-secondary">
                              {project.creditsIssued}
                            </p>
                            <p className="text-xs text-muted-foreground">Credits issued</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-muted">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(project.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}