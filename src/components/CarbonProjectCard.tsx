import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Award, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Activity, 
  Zap, 
  Target, 
  Users, 
  Leaf, 
  Shield, 
  Brain, 
  Database,
  Clock,
  DollarSign,
  ChevronRight,
  BarChart3,
  Gauge,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Heart,
  Bookmark,
  Share2
} from 'lucide-react';

interface CarbonProjectCardProps {
  project: {
    id: string;
    name: string;
    developer: {
      name: string;
      logo?: string;
      verified: boolean;
    };
    type: 'biochar' | 'afforestation' | 'soil_carbon' | 'wetlands' | 'direct_air_capture';
    location: {
      country: string;
      region: string;
      coordinates?: { lat: number; lng: number };
    };
    images: string[];
    description: string;
    
    // Certification & Standards
    certifications: Array<{
      standard: string;
      status: 'verified' | 'pending' | 'in_progress';
      certifier: string;
      date?: string;
    }>;
    
    // Project Metrics
    metrics: {
      totalCORCs: number;
      estimatedCORCs: number;
      permanenceRating: number; // 1-100
      projectDuration: number; // years
      startDate: string;
      verificationDate?: string;
    };
    
    // dMRV Data
    dMRV: {
      activeSensors: number;
      dataPoints: number;
      aiAccuracy: number; // percentage
      lastUpdate: string;
      monitoringType: string[];
    };
    
    // Financial
    pricing: {
      currentPrice: number;
      currency: string;
      minimumPurchase: number;
      earlyLiquidity?: number; // percentage
    };
    
    // Status
    status: 'active' | 'planning' | 'completed' | 'paused';
    fundingProgress: number; // percentage
    
    // Additional Data
    keywords: string[];
    sustainabilityGoals: string[];
    riskFactors?: string[];
  };
  variant?: 'default' | 'compact' | 'detailed';
  onInvest?: (projectId: string) => void;
  onLearnMore?: (projectId: string) => void;
  onBookmark?: (projectId: string) => void;
}

export function CarbonProjectCard({ 
  project, 
  variant = 'default',
  onInvest,
  onLearnMore,
  onBookmark 
}: CarbonProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'biochar': return Leaf;
      case 'afforestation': return Users;
      case 'soil_carbon': return Target;
      case 'wetlands': return Activity;
      case 'direct_air_capture': return Zap;
      default: return Leaf;
    }
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'biochar': return 'bg-green-500';
      case 'afforestation': return 'bg-emerald-500';
      case 'soil_carbon': return 'bg-amber-500';
      case 'wetlands': return 'bg-blue-500';
      case 'direct_air_capture': return 'bg-purple-500';
      default: return 'bg-primary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'planning': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'paused': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCertificationStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'in_progress': return AlertCircle;
      default: return Info;
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(project.id);
  };

  const ProjectTypeIcon = getProjectTypeIcon(project.type);

  if (variant === 'compact') {
    return (
      <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-2 hover:border-primary/20 bg-gradient-to-br from-background via-background to-accent/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${getProjectTypeColor(project.type)} rounded-xl flex items-center justify-center`}>
                <ProjectTypeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary leading-tight">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.developer.name}</p>
              </div>
            </div>
            <Badge className={getStatusColor(project.status)} variant="outline">
              {project.status}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">CORCs Available</p>
              <p className="font-semibold">
                {project.metrics.totalCORCs > 0 ? project.metrics.totalCORCs.toLocaleString() : 'Coming Soon'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <p className="font-semibold">
                {project.pricing.currentPrice > 0 ? `$${project.pricing.currentPrice}/${project.pricing.currency}` : 'TBD'}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => onLearnMore?.(project.id)}
            className="w-full group-hover:gap-3 transition-all duration-300"
            size="sm"
          >
            Coming Soon
            <ChevronRight className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-700 hover:scale-[1.01] border-2 hover:border-primary/20 bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden">
      {/* Hero Image Section */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={project.images[currentImageIndex] || project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Image Overlay with Key Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Top Right Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-9 h-9 p-0 bg-background/90 backdrop-blur-sm"
                  onClick={handleBookmark}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-primary' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isBookmarked ? 'Remove bookmark' : 'Bookmark project'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-9 h-9 p-0 bg-background/90 backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Top Left Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getStatusColor(project.status)} backdrop-blur-sm font-medium`}>
            <Activity className="w-3 h-3 mr-1" />
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
        
        {/* Bottom Left Project Type */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-2">
            <div className={`w-6 h-6 ${getProjectTypeColor(project.type)} rounded-full flex items-center justify-center`}>
              <ProjectTypeIcon className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium capitalize">{project.type.replace('_', ' ')}</span>
          </div>
        </div>
        
        {/* Image Pagination Dots */}
        {project.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-primary leading-tight">{project.name}</h3>
              {project.developer.verified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified Developer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="font-medium text-foreground">{project.developer.name}</span>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{project.location.region}, {project.location.country}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>
        </div>

        {/* Fast Facts Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Total CORCs</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {project.metrics.totalCORCs > 0 ? project.metrics.totalCORCs.toLocaleString() : 'Coming Soon'}
            </p>
            <p className="text-xs text-muted-foreground">Available credits</p>
          </div>
          
          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-4 border border-secondary/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">Price</span>
            </div>
            <p className="text-2xl font-bold text-secondary">
              {project.pricing.currentPrice > 0 ? `$${project.pricing.currentPrice}` : 'TBD'}
            </p>
            <p className="text-xs text-muted-foreground">per {project.pricing.currency}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl p-4 border border-green-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Permanence</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{project.metrics.permanenceRating}%</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl p-4 border border-blue-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">AI Accuracy</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {project.dMRV.aiAccuracy > 0 ? `${project.dMRV.aiAccuracy}%` : 'Pre-certification underway'}
            </p>
            <p className="text-xs text-muted-foreground">dMRV confidence</p>
          </div>
        </div>

        {/* Certification Standards */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Certification Standards
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.certifications.map((cert, index) => {
              const StatusIcon = getCertificationStatusIcon(cert.status);
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-background/50">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-5 h-5 ${
                      cert.status === 'verified' ? 'text-green-500' :
                      cert.status === 'pending' ? 'text-orange-500' : 'text-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium">{cert.standard}</p>
                      <p className="text-sm text-muted-foreground">{cert.certifier}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={
                    cert.status === 'verified' ? 'border-green-500 text-green-500' :
                    cert.status === 'pending' ? 'border-orange-500 text-orange-500' : 'border-blue-500 text-blue-500'
                  }>
                    {cert.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* dMRV Technology Section */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Mālama dMRV Process
          </h4>
          <div className="bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl p-6 border border-accent/20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold text-primary">{project.dMRV.activeSensors}</p>
                <p className="text-sm text-muted-foreground">Active Sensors</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-8 h-8 text-secondary-foreground" />
                </div>
                <p className="text-2xl font-bold text-secondary">{project.dMRV.dataPoints.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Data Points</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gauge className="w-8 h-8 text-white" />
                </div>
                <p className="text-2xl font-bold text-green-600">{project.dMRV.aiAccuracy}%</p>
                <p className="text-sm text-muted-foreground">AI Accuracy</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-bold text-blue-600">Real-time</p>
                <p className="text-sm text-muted-foreground">Monitoring</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground">Monitoring Types:</span>
              {project.dMRV.monitoringType.map((type, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline & Key Dates */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Project Timeline
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
              <span className="font-medium">Project Start</span>
              <span className="text-sm text-muted-foreground">{new Date(project.metrics.startDate).toLocaleDateString()}</span>
            </div>
            {project.metrics.verificationDate && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
                <span className="font-medium">Credits Verified</span>
                <span className="text-sm text-muted-foreground">{new Date(project.metrics.verificationDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
              <span className="font-medium">Duration</span>
              <span className="text-sm text-muted-foreground">{project.metrics.projectDuration} years</span>
            </div>
          </div>
        </div>

        {/* Keywords & Sustainability Goals */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            Sustainability Impact
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">Project Keywords</p>
              <div className="flex flex-wrap gap-2">
                {project.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">SDG Alignment</p>
              <div className="flex flex-wrap gap-2">
                {project.sustainabilityGoals.map((goal, index) => (
                  <Badge key={index} className="text-xs bg-green-100 text-green-800 border-green-200">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Funding Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Funding Progress
            </h4>
            <span className="font-semibold text-primary">{project.fundingProgress}%</span>
          </div>
          <Progress value={project.fundingProgress} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Minimum purchase: {project.pricing.minimumPurchase} {project.pricing.currency}</span>
            {project.pricing.earlyLiquidity && (
              <span>Early liquidity: {project.pricing.earlyLiquidity}%</span>
            )}
          </div>
        </div>

        {/* Risk Factors (if any) */}
        {project.riskFactors && project.riskFactors.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Risk Considerations
            </h4>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <ul className="space-y-2">
                {project.riskFactors.map((risk, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            onClick={() => onInvest?.(project.id)}
            className="flex-1 hover:scale-105 transition-transform duration-300"
            size="lg"
            disabled
          >
            <Heart className="w-5 h-5 mr-2" />
            COMING SOON
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 hover:scale-105 transition-transform duration-300"
            size="lg"
            disabled
          >
            More Projects Coming Soon
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}