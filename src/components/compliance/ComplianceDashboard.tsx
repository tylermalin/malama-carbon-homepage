/**
 * AI Compliance Scanner - Dashboard
 * 
 * Dashboard for viewing all scans and managing leads
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Search,
  BarChart3,
  Users,
  FileText,
  Plus,
  Filter,
  Download,
  AlertCircle,
} from 'lucide-react';
import { getUserScans } from '../../services/complianceOrchestratorService';
import { supabase } from '../../lib/supabaseClient';

export const ComplianceDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'high-risk' | 'recent'>('all');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadScans();
    }
  }, [user, filter]);

  const loadUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
    } else {
      // Redirect to login
      navigate('/login');
    }
  };

  const loadScans = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getUserScans(user.id);
      
      // Apply filters
      let filtered = data;
      if (filter === 'high-risk') {
        filtered = data.filter((s: any) => s.risk_level === 'high' || s.risk_level === 'critical');
      } else if (filter === 'recent') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = data.filter((s: any) => new Date(s.created_at) > weekAgo);
      }
      
      setScans(filtered);
    } catch (error) {
      console.error('Failed to load scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Complete</span>;
      case 'pending':
      case 'queued':
      case 'scraping':
      case 'analyzing':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Processing...</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Failed</span>;
      default:
        return null;
    }
  };

  // Calculate summary stats
  const stats = {
    total: scans.length,
    highRisk: scans.filter(s => s.risk_level === 'high' || s.risk_level === 'critical').length,
    avgScore: scans.length > 0
      ? (scans.reduce((sum, s) => sum + (s.overall_risk_score || 0), 0) / scans.length).toFixed(1)
      : '0.0',
    thisWeek: scans.filter(s => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(s.created_at) > weekAgo;
    }).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Compliance Scanner Dashboard</h1>
                <p className="text-sm text-gray-600">Monitor compliance scans and leads</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/compliance')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                <span>New Scan</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            label="Total Scans"
            value={stats.total.toString()}
            subtext="All time"
          />
          <StatCard
            icon={<AlertCircle className="h-6 w-6 text-red-600" />}
            label="High Risk"
            value={stats.highRisk.toString()}
            subtext="Needs attention"
          />
          <StatCard
            icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
            label="Avg Risk Score"
            value={stats.avgScore}
            subtext="Out of 10"
          />
          <StatCard
            icon={<Search className="h-6 w-6 text-green-600" />}
            label="This Week"
            value={stats.thisWeek.toString()}
            subtext="Recent scans"
          />
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({scans.length})
              </button>
              <button
                onClick={() => setFilter('high-risk')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'high-risk'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                High Risk
              </button>
              <button
                onClick={() => setFilter('recent')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'recent'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recent
              </button>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Scans Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Loading scans...
                  </td>
                </tr>
              ) : scans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No scans found. Click "New Scan" to get started.
                  </td>
                </tr>
              ) : (
                scans.map((scan) => (
                  <tr key={scan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{scan.company?.name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">{scan.company?.domain}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {scan.overall_risk_score ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">{scan.overall_risk_score.toFixed(1)}</span>
                          <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getRiskBadgeColor(scan.risk_level)}`}>
                            {scan.risk_level}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {scan.total_issues ? (
                        <div className="text-sm">
                          <span className="font-medium">{scan.total_issues} total</span>
                          {scan.critical_issues > 0 && (
                            <span className="ml-2 text-red-600">({scan.critical_issues} critical)</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(scan.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(scan.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/compliance/scan/${scan.id}`)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View Report →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
}> = ({ icon, label, value, subtext }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500">{subtext}</div>
  </div>
);

export default ComplianceDashboard;

