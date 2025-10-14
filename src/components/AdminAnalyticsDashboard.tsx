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
  Zap,
  Lock,
  Shield,
  LogIn,
  Image as ImageIcon,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  Send,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AdminAnalyticsDashboardProps {
  onNavigate: () => void;
  onShowGetStarted?: () => void;
  user: any;
}

interface MetricCard {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  color: string;
}

export function AdminAnalyticsDashboard({ onNavigate, onShowGetStarted, user }: AdminAnalyticsDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'images' | 'invite'>('analytics');
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
  
  // User Management
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  
  // Image Gallery
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  
  // Invite Users
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('PROJECT_DEVELOPER');
  const [inviteMessage, setInviteMessage] = useState('');

  // Check admin status on mount
  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      loadAnalytics();
      loadAllUsers();
      loadUploadedImages();
    }
  }, [timeRange, isAdmin]);

  useEffect(() => {
    if (isAdmin && activeTab === 'users') {
      loadAllUsers();
    }
  }, [activeTab, isAdmin]);

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

  const loadAllUsers = async () => {
    if (!supabase) return;

    try {
      // Get all users with full auth data
      const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();

      if (authError) {
        console.error('Error loading auth users:', authError);
        // Fallback to profiles if admin API fails
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (profilesError) throw profilesError;

        setAllUsers((profilesData || []).map(p => ({
          ...p,
          id: p.user_id,
          email: p.email || 'N/A'
        })));
        return;
      }

      // Get profiles for additional info
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*');

      // Get user_profiles for additional info
      const { data: userProfilesData } = await supabase
        .from('user_profiles')
        .select('*');

      // Merge auth data with profile data
      const mergedUsers = (authUsers || []).map(authUser => {
        const profile = (profilesData || []).find(p => p.user_id === authUser.id);
        const userProfile = (userProfilesData || []).find(up => up.user_id === authUser.id);
        return {
          id: authUser.id,
          email: authUser.email,
          email_confirmed_at: authUser.email_confirmed_at,
          last_sign_in_at: authUser.last_sign_in_at,
          created_at: authUser.created_at,
          ...profile,
          ...userProfile,
        };
      });

      setAllUsers(mergedUsers);
      console.log('✅ Loaded users from auth.users:', mergedUsers.length);
    } catch (error) {
      console.error('Error loading users:', error);
      setAllUsers([]);
    }
  };

  const loadUploadedImages = async () => {
    if (!supabase) return;

    try {
      // List all files from profile-images bucket
      const { data: profileImages, error: profileError } = await supabase
        .storage
        .from('profile-images')
        .list();

      if (profileError) throw profileError;

      // List all files from logos bucket
      const { data: logoImages, error: logoError } = await supabase
        .storage
        .from('logos')
        .list();

      if (logoError) throw logoError;

      // Combine and format
      const allImages = [
        ...(profileImages || []).map(img => ({
          ...img,
          bucket: 'profile-images',
          url: supabase.storage.from('profile-images').getPublicUrl(img.name).data.publicUrl
        })),
        ...(logoImages || []).map(img => ({
          ...img,
          bucket: 'logos',
          url: supabase.storage.from('logos').getPublicUrl(img.name).data.publicUrl
        }))
      ];

      setUploadedImages(allImages);
      console.log('✅ Loaded images:', allImages.length);
    } catch (error) {
      console.error('Error loading images:', error);
      setUploadedImages([]);
    }
  };

  const sendEmailToUser = async (userEmail: string, userName: string) => {
    if (!supabase) return;

    const customMessage = prompt(
      `Send magic link to ${userName} (${userEmail})?\n\nOptional: Add a personal message:`,
      'You have been invited to sign in to Mālama Labs.'
    );

    if (customMessage === null) return; // User cancelled

    try {
      // Send magic link using Supabase Auth
      const { error } = await supabase.auth.signInWithOtp({
        email: userEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) throw error;

      alert(`✅ Magic link sent to ${userEmail}`);
    } catch (error: any) {
      console.error('Error sending email:', error);
      alert(`❌ Failed to send email: ${error.message || 'Unknown error'}`);
    }
  };

  const deleteUser = async (userId: string, userEmail: string) => {
    if (!supabase || !confirm(`⚠️ Delete user ${userEmail}?\n\nThis will:\n- Delete their profile\n- Delete all their projects\n- Delete all their tasks\n\nThis action CANNOT be undone!`)) {
      return;
    }

    try {
      // Delete from auth.users (admin API)
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);

      if (authError) {
        console.error('Auth delete error:', authError);
        // Try deleting profile instead
        const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('user_id', userId);

        if (profileError) throw profileError;
      }

      alert('✅ User deleted successfully');
      loadAllUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      alert(`❌ Failed to delete user: ${error.message || 'Unknown error'}`);
    }
  };

  const deleteImage = async (bucketName: string, fileName: string) => {
    if (!supabase || !confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const { error } = await supabase
        .storage
        .from(bucketName)
        .remove([fileName]);

      if (error) throw error;

      alert('Image deleted successfully');
      loadUploadedImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const sendUserInvite = async () => {
    if (!supabase || !inviteEmail) {
      alert('Please enter an email address');
      return;
    }

    try {
      // Create a magic link invite (Supabase handles this)
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(inviteEmail, {
        data: {
          role: inviteRole,
          invite_message: inviteMessage
        }
      });

      if (error) throw error;

      alert(`Invitation sent to ${inviteEmail}!`);
      setInviteEmail('');
      setInviteMessage('');
    } catch (error: any) {
      console.error('Error sending invite:', error);
      // Fallback: create a record in a custom invites table
      try {
        const { error: insertError } = await supabase
          .from('user_invites')
          .insert({
            email: inviteEmail,
            role: inviteRole,
            message: inviteMessage,
            invited_by: user.email,
            status: 'pending'
          });

        if (insertError) throw insertError;

        alert(`Invitation record created for ${inviteEmail}. Note: Email may need to be sent manually.`);
        setInviteEmail('');
        setInviteMessage('');
      } catch (fallbackError) {
        alert('Failed to send invitation: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const checkAdminStatus = async () => {
    setIsCheckingAdmin(true);
    
    try {
      // First check if user is logged in
      if (!user) {
        setIsAdmin(false);
        setIsCheckingAdmin(false);
        return;
      }

      // Check if Supabase is configured
      if (!supabase) {
        console.warn('Supabase not configured - defaulting to non-admin');
        setIsAdmin(false);
        setIsCheckingAdmin(false);
        return;
      }

      // Query admin_users table to check if user is admin
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', user.email)
        .single();

      if (error) {
        console.warn('Error checking admin status:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!adminData);
      }
    } catch (error) {
      console.error('Error verifying admin access:', error);
      setIsAdmin(false);
    } finally {
      setIsCheckingAdmin(false);
    }
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

  // Show loading while checking admin status
  if (isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-4"
        >
          <Card className="shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground">
                You need to sign in with an admin account to access the analytics dashboard.
              </p>
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={onShowGetStarted}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In to Admin Account
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onNavigate}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Show access denied if user is logged in but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-4"
        >
          <Card className="shadow-2xl border-red-200">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 font-medium mb-2">
                  Admin Privileges Required
                </p>
                <p className="text-sm text-red-600">
                  Your account ({user.email}) does not have admin access to this dashboard.
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                If you believe you should have access, please contact an administrator.
              </p>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onNavigate}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Show loading while fetching analytics data
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

  // Show admin dashboard
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

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline-block mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'users'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline-block mr-2" />
              Users ({allUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'images'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ImageIcon className="w-4 h-4 inline-block mr-2" />
              Images ({uploadedImages.length})
            </button>
            <button
              onClick={() => setActiveTab('invite')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'invite'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserPlus className="w-4 h-4 inline-block mr-2" />
              Invite User
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analytics' && (
          <>
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
        </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Users</option>
                  <option value="verified">✅ Verified Email</option>
                  <option value="unverified">❌ Unverified Email</option>
                  <option value="PROJECT_DEVELOPER">Project Developers</option>
                  <option value="TECHNOLOGY_DEVELOPER">Tech Developers</option>
                  <option value="CREDIT_BUYER">Credit Buyers</option>
                  <option value="PARTNER">Partners</option>
                </select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Registered Users ({allUsers.filter(u => {
                      // Role filter
                      const roleMatch = userFilter === 'all' || 
                                       userFilter === 'verified' || 
                                       userFilter === 'unverified' || 
                                       u.role === userFilter;
                      
                      // Email verification filter
                      const emailVerifiedMatch = userFilter === 'all' || 
                                                 (userFilter === 'verified' && u.email_confirmed_at) ||
                                                 (userFilter === 'unverified' && !u.email_confirmed_at) ||
                                                 (userFilter !== 'verified' && userFilter !== 'unverified');
                      
                      // Search filter
                      const searchMatch = searchTerm === '' || 
                                         u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                         u.org_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                         u.email?.toLowerCase().includes(searchTerm.toLowerCase());
                      
                      return roleMatch && emailVerifiedMatch && searchMatch;
                    }).length})
                  </span>
                  <Button variant="outline" size="sm" onClick={loadAllUsers}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {allUsers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No users found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="text-left p-3 text-sm font-semibold text-gray-700">User</th>
                          <th className="text-left p-3 text-sm font-semibold text-gray-700">Email Status</th>
                          <th className="text-left p-3 text-sm font-semibold text-gray-700">Role</th>
                          <th className="text-left p-3 text-sm font-semibold text-gray-700">Last Sign In</th>
                          <th className="text-left p-3 text-sm font-semibold text-gray-700">Created</th>
                          <th className="text-right p-3 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers
                          .filter(u => {
                            // Role filter
                            const roleMatch = userFilter === 'all' || 
                                             userFilter === 'verified' || 
                                             userFilter === 'unverified' || 
                                             u.role === userFilter;
                            
                            // Email verification filter
                            const emailVerifiedMatch = userFilter === 'all' || 
                                                       (userFilter === 'verified' && u.email_confirmed_at) ||
                                                       (userFilter === 'unverified' && !u.email_confirmed_at) ||
                                                       (userFilter !== 'verified' && userFilter !== 'unverified');
                            
                            // Search filter
                            const searchMatch = searchTerm === '' || 
                                               u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                               u.org_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                               u.email?.toLowerCase().includes(searchTerm.toLowerCase());
                            
                            return roleMatch && emailVerifiedMatch && searchMatch;
                          })
                          .map((user) => (
                          <tr key={user.id} className="border-b hover:bg-slate-50 transition-colors">
                            <td className="p-3">
                              <div>
                                <p className="font-medium text-gray-900">{user.full_name || user.email || 'N/A'}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                {user.org_name || user.company_name ? (
                                  <p className="text-xs text-gray-400">{user.org_name || user.company_name}</p>
                                ) : null}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="space-y-1">
                                <Badge 
                                  variant={user.email_confirmed_at ? 'default' : 'destructive'}
                                  className={user.email_confirmed_at ? 'bg-green-500' : 'bg-yellow-500'}
                                >
                                  {user.email_confirmed_at ? '✅ Verified' : '❌ Unverified'}
                                </Badge>
                                {user.email_confirmed_at && (
                                  <p className="text-xs text-gray-500">
                                    {new Date(user.email_confirmed_at).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant={
                                user.role === 'PROJECT_DEVELOPER' ? 'default' :
                                user.role === 'CREDIT_BUYER' ? 'secondary' :
                                'outline'
                              }>
                                {user.role || 'No Profile'}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm text-gray-600">
                              {user.last_sign_in_at ? (
                                <div>
                                  <p>{new Date(user.last_sign_in_at).toLocaleDateString()}</p>
                                  <p className="text-xs text-gray-400">
                                    {new Date(user.last_sign_in_at).toLocaleTimeString()}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-gray-400">Never</span>
                              )}
                            </td>
                            <td className="p-3 text-sm text-gray-600">
                              {user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => sendEmailToUser(user.email, user.full_name || user.email)}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  title="Send magic link email"
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    const info = `User ID: ${user.id}\nName: ${user.full_name || 'N/A'}\nEmail: ${user.email}\nEmail Verified: ${user.email_confirmed_at ? 'Yes' : 'No'}\nRole: ${user.role || 'No profile'}\nOrganization: ${user.org_name || user.company_name || 'N/A'}\nCreated: ${user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}\nLast Sign In: ${user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}`;
                                    alert(info);
                                  }}
                                  title="View user details"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => deleteUser(user.id, user.email)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  title="Delete user (permanent)"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Uploaded Images</h2>
              <Button variant="outline" size="sm" onClick={loadUploadedImages}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Image Gallery ({uploadedImages.length} files)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedImages.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No images uploaded yet</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="border rounded-lg p-3 hover:border-primary transition-colors group">
                        <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                          <img 
                            src={image.url} 
                            alt={image.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.innerHTML = '<ImageIcon className="w-12 h-12 text-gray-400" />';
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-900 truncate" title={image.name}>
                            {image.name}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <Badge variant="secondary" className="text-xs">
                              {image.bucket}
                            </Badge>
                            <span>{image.metadata?.size ? `${(image.metadata.size / 1024).toFixed(1)}KB` : 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a 
                              href={image.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <Button variant="outline" size="sm" className="w-full text-xs">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </a>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => deleteImage(image.bucket, image.name)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Invite User Tab */}
        {activeTab === 'invite' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Invite New User</h2>
              <p className="text-gray-600">Send an invitation to join Mālama Labs</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Role *
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="PROJECT_DEVELOPER">Project Developer</option>
                    <option value="TECHNOLOGY_DEVELOPER">Technology Developer / Builder</option>
                    <option value="CREDIT_BUYER">Credit Buyer</option>
                    <option value="PARTNER">Partner / Collaborator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    placeholder="Add a personal note to your invitation..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> The invited user will receive an email with a magic link to set up their account 
                    as a <strong>{inviteRole.split('_').join(' ')}</strong>.
                  </p>
                </div>

                <Button 
                  onClick={sendUserInvite}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  disabled={!inviteEmail}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Invitation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Invitations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-4 text-sm">
                  Invitation history will appear here once the feature is fully configured with Supabase Auth.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

