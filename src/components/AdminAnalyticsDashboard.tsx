/**
 * Admin Analytics Dashboard
 * Comprehensive analytics view for admin users
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Users, 
  MousePointer, 
  FileText, 
  TrendingUp,
  Eye,
  AlertCircle,
  Mail,
  Briefcase,
  Calendar,
  Download,
  RefreshCw,
  BarChart3,
  Activity,
  Globe,
  Zap
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AdminAnalyticsDashboardProps {
  onNavigate: () => void;
  user: any;
}

interface MetricCard {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  color: string;
}

export function AdminAnalyticsDashboard({ onNavigate, user }: AdminAnalyticsDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30'); // days
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    dailyActiveUsers: 0,
    totalPageViews: 0,
    totalCTAClicks: 0,
    totalPresentationClicks: 0,
    totalContactSubmissions: 0,
    totalOnboardingSubmissions: 0,
    totalAdvisoryApplications: 0,
    totalProjects: 0,
    totalErrors: 0,
  });
  
  const [topPages, setTopPages] = useState<any[]>([]);
  const [topCTAs, setTopCTAs] = useState<any[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [presentationStats, setPresentationStats] = useState<any[]>([]);
  const [referralStats, setReferralStats] = useState<any[]>([]);
  const [errorStats, setErrorStats] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const daysAgo = parseInt(timeRange);
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - daysAgo);
      const isoDate = dateThreshold.toISOString();

      if (!supabase) {
        console.log('Supabase not configured - showing demo data');
        loadDemoData();
        return;
      }

      // Fetch all metrics in parallel
      const [
        usersData,
        pageViewsData,
        ctaClicksData,
        presentationClicksData,
        contactData,
        onboardingData,
        advisoryData,
        projectsData,
        errorsData,
        topPagesData,
        topCTAsData,
        presentationStatsData,
        referralData,
      ] = await Promise.all([
        // Total users
        supabase.from('user_profiles').select('*', { count: 'exact', head: true }),
        
        // Page views
        supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', isoDate),
        
        // CTA clicks
        supabase.from('cta_clicks').select('*', { count: 'exact', head: true }).gte('created_at', isoDate),
        
        // Presentation clicks
        supabase.from('presentation_clicks').select('*', { count: 'exact', head: true }).gte('created_at', isoDate),
        
        // Contact submissions
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).gte('created_at', isoDate),
        
        // Onboarding submissions
        supabase.from('onboarding_submissions').select('*', { count: 'exact', head: true }).gte('completed_at', isoDate),
        
        // Advisory applications
        supabase.from('advisory_applications').select('*', { count: 'exact', head: true }).gte('created_at', isoDate),
        
        // Projects
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        
        // Errors
        supabase.from('error_logs').select('*', { count: 'exact', head: true }).gte('created_at', isoDate),
        
        // Top pages
        supabase.rpc('get_top_pages', { days: daysAgo }).limit(10),
        
        // Top CTAs
        supabase.from('cta_clicks')
          .select('button_label, button_location, page_name')
          .gte('created_at', isoDate)
          .limit(1000),
        
        // Presentation stats
        supabase.from('presentation_clicks')
          .select('deck_key')
          .gte('created_at', isoDate),
        
        // Referral performance
        supabase.from('referral_performance').select('*').limit(10),
      ]);

      // Process the data
      setMetrics({
        totalUsers: usersData.count || 0,
        dailyActiveUsers: 0, // Would need to calculate from page_views
        totalPageViews: pageViewsData.count || 0,
        totalCTAClicks: ctaClicksData.count || 0,
        totalPresentationClicks: presentationClicksData.count || 0,
        totalContactSubmissions: contactData.count || 0,
        totalOnboardingSubmissions: onboardingData.count || 0,
        totalAdvisoryApplications: advisoryData.count || 0,
        totalProjects: projectsData.count || 0,
        totalErrors: errorsData.count || 0,
      });

      // Process top CTAs
      if (topCTAsData.data) {
        const ctaCounts: any = {};
        topCTAsData.data.forEach((cta: any) => {
          const key = `${cta.button_label}|${cta.button_location}`;
          if (!ctaCounts[key]) {
            ctaCounts[key] = { ...cta, count: 0 };
          }
          ctaCounts[key].count++;
        });
        const sortedCTAs = Object.values(ctaCounts)
          .sort((a: any, b: any) => b.count - a.count)
          .slice(0, 10);
        setTopCTAs(sortedCTAs);
      }

      // Process presentation stats
      if (presentationStatsData.data) {
        const deckCounts: any = {};
        presentationStatsData.data.forEach((click: any) => {
          if (!deckCounts[click.deck_key]) {
            deckCounts[click.deck_key] = 0;
          }
          deckCounts[click.deck_key]++;
        });
        const stats = Object.entries(deckCounts).map(([deck, count]) => ({
          deck_key: deck,
          clicks: count
        }));
        setPresentationStats(stats);
      }

      // Set other data
      setReferralStats(referralData.data || []);

      // Fetch recent contact submissions
      const recentData = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      setRecentSubmissions(recentData.data || []);

    } catch (error) {
      console.error('Error loading analytics:', error);
      loadDemoData();
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoData = () => {
    // Demo data for when Supabase is not available
    setMetrics({
      totalUsers: 0,
      dailyActiveUsers: 0,
      totalPageViews: 0,
      totalCTAClicks: 0,
      totalPresentationClicks: 0,
      totalContactSubmissions: 0,
      totalOnboardingSubmissions: 0,
      totalAdvisoryApplications: 0,
      totalProjects: 0,
      totalErrors: 0,
    });
    setIsLoading(false);
  };

  const exportData = async (tableName: string) => {
    if (!supabase) {
      alert('Supabase not configured');
      return;
    }

    try {
      const { data, error } = await supabase.from(tableName).select('*');
      
      if (error) throw error;

      // Convert to CSV
      if (data && data.length > 0) {
        const headers = Object.keys(data[0]);
        const csvContent = [
          headers.join(','),
          ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
        ].join('\n');

        // Download
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tableName}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data');
    }
  };

  const metricCards: MetricCard[] = [
    {
      title: 'Total Users',
      value: metrics.totalUsers,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Page Views',
      value: metrics.totalPageViews.toLocaleString(),
      change: `Last ${timeRange} days`,
      icon: Eye,
      color: 'text-green-500',
    },
    {
      title: 'CTA Clicks',
      value: metrics.totalCTAClicks.toLocaleString(),
      change: `Last ${timeRange} days`,
      icon: MousePointer,
      color: 'text-purple-500',
    },
    {
      title: 'Presentations Opened',
      value: metrics.totalPresentationClicks,
      change: `Last ${timeRange} days`,
      icon: FileText,
      color: 'text-orange-500',
    },
    {
      title: 'Contact Submissions',
      value: metrics.totalContactSubmissions,
      change: `Last ${timeRange} days`,
      icon: Mail,
      color: 'text-emerald-500',
    },
    {
      title: 'Onboarding Complete',
      value: metrics.totalOnboardingSubmissions,
      change: `Last ${timeRange} days`,
      icon: Briefcase,
      color: 'text-indigo-500',
    },
    {
      title: 'Advisory Applications',
      value: metrics.totalAdvisoryApplications,
      change: `Last ${timeRange} days`,
      icon: Users,
      color: 'text-pink-500',
    },
    {
      title: 'Projects Created',
      value: metrics.totalProjects,
      icon: Activity,
      color: 'text-teal-500',
    },
    {
      title: 'Errors Logged',
      value: metrics.totalErrors,
      change: `Last ${timeRange} days`,
      icon: AlertCircle,
      color: 'text-red-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onNavigate} className="hover:bg-slate-100">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">Admin View - {user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="bg-emerald-500">
                <Globe className="w-4 h-4 mr-1" />
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Time Range:</span>
            {['7', '30', '90', '365'].map((days) => (
              <Button
                key={days}
                variant={timeRange === days ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(days)}
              >
                {days === '365' ? '1 Year' : `${days} Days`}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadAnalytics}
            className="hover:scale-105 transition-transform"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metricCards.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-3xl font-bold mt-2">{metric.value}</p>
                      {metric.change && (
                        <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
                      )}
                    </div>
                    <div className={`p-3 rounded-full bg-slate-100 ${metric.color}`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Presentation Stats */}
        {presentationStats.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Presentation Engagement
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData('presentation_clicks')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {presentationStats.map((stat, index) => {
                  const deckNames: any = {
                    'SAFE_ROUND': 'Investor SAFE Round',
                    'BUYERS': 'CO₂.0 for Carbon Credit Buyers',
                    'PROJECTS': 'CO₂.0 for Project Developers'
                  };
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">{deckNames[stat.deck_key] || stat.deck_key}</span>
                      </div>
                      <Badge variant="secondary">{stat.clicks} clicks</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top CTAs */}
        {topCTAs.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Top Call-to-Actions
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportData('cta_clicks')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCTAs.map((cta: any, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div>
                      <p className="font-medium">{cta.button_label}</p>
                      <p className="text-sm text-muted-foreground">
                        {cta.button_location} • {cta.page_name}
                      </p>
                    </div>
                    <Badge>{cta.count} clicks</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Contact Submissions */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Recent Contact Submissions
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('contact_submissions')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentSubmissions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No submissions yet. Data will appear here as users submit the contact form.
              </p>
            ) : (
              <div className="space-y-4">
                {recentSubmissions.map((submission: any) => (
                  <div key={submission.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{submission.name}</p>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                      </div>
                      <Badge variant="secondary">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                    {submission.company && (
                      <p className="text-sm text-muted-foreground mb-1">
                        Company: {submission.company}
                      </p>
                    )}
                    {submission.inquiry_type && (
                      <Badge variant="outline" className="mb-2">
                        {submission.inquiry_type}
                      </Badge>
                    )}
                    <p className="text-sm mt-2 p-3 bg-slate-50 rounded">
                      {submission.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referral Performance */}
        {referralStats.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Referral Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {referralStats.map((ref: any, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">?ref={ref.referral_code}</p>
                      <p className="text-sm text-muted-foreground">
                        {ref.unique_visitors} visitors • {ref.total_interactions} interactions
                      </p>
                    </div>
                    <Badge>{ref.presentation_opens} presentations</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export All Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Export Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'contact_submissions',
                'presentation_clicks',
                'slide_views',
                'page_views',
                'cta_clicks',
                'onboarding_submissions',
                'advisory_applications',
                'projects',
                'user_profiles',
                'form_abandonments',
                'error_logs',
              ].map((table) => (
                <Button
                  key={table}
                  variant="outline"
                  onClick={() => exportData(table)}
                  className="justify-start hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {table.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

