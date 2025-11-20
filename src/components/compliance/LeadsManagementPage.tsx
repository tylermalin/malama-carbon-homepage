/**
 * AI Compliance Scanner - Leads Management Page
 * 
 * CRM for managing leads generated from compliance scans
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Filter,
  Search,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { generateOutreachEmail } from '../../services/complianceOrchestratorService';

interface Lead {
  id: string;
  company: any;
  scan: any;
  status: string;
  lead_score: number;
  contact_email: string;
  contact_name: string;
  first_scan_at: string;
  last_scan_at: string;
  total_scans: number;
  contacted_at: string | null;
  notes: string | null;
  created_at: string;
}

export const LeadsManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'qualified'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showOutreachModal, setShowOutreachModal] = useState(false);
  const [outreachEmail, setOutreachEmail] = useState('');

  useEffect(() => {
    loadLeads();
  }, [filter]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('compliance_leads')
        .select(`
          *,
          company:compliance_companies(*),
          scan:compliance_scans(*)
        `)
        .order('lead_score', { ascending: false })
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const updates: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };

      if (newStatus === 'contacted' && !leads.find(l => l.id === leadId)?.contacted_at) {
        updates.contacted_at = new Date().toISOString();
      }

      if (newStatus === 'converted') {
        updates.converted_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('compliance_leads')
        .update(updates)
        .eq('id', leadId);

      if (error) throw error;

      // Reload leads
      await loadLeads();
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const saveNotes = async (leadId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('compliance_leads')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const handleGenerateOutreach = async (lead: Lead) => {
    try {
      const email = await generateOutreachEmail(lead.scan.id);
      setOutreachEmail(email);
      setSelectedLead(lead);
      setShowOutreachModal(true);
    } catch (error) {
      console.error('Failed to generate email:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      responded: 'bg-purple-100 text-purple-800',
      qualified: 'bg-green-100 text-green-800',
      'meeting-scheduled': 'bg-indigo-100 text-indigo-800',
      'proposal-sent': 'bg-orange-100 text-orange-800',
      converted: 'bg-green-500 text-white',
      lost: 'bg-gray-100 text-gray-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const filteredLeads = leads.filter(lead =>
    !searchTerm ||
    lead.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.contacted_at).length,
    converted: leads.filter(l => l.status === 'converted').length,
    avgScore: leads.length > 0
      ? Math.round(leads.reduce((sum, l) => sum + (l.lead_score || 0), 0) / leads.length)
      : 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
                <p className="text-sm text-gray-600">Track and convert compliance scan leads</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/compliance/dashboard')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={<Users className="h-6 w-6 text-blue-600" />}
            label="Total Leads"
            value={stats.total.toString()}
          />
          <StatCard
            icon={<Clock className="h-6 w-6 text-yellow-600" />}
            label="New"
            value={stats.new.toString()}
          />
          <StatCard
            icon={<Mail className="h-6 w-6 text-purple-600" />}
            label="Contacted"
            value={stats.contacted.toString()}
          />
          <StatCard
            icon={<CheckCircle className="h-6 w-6 text-green-600" />}
            label="Converted"
            value={stats.converted.toString()}
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
            label="Avg Score"
            value={`${stats.avgScore}%`}
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'new'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                New
              </button>
              <button
                onClick={() => setFilter('contacted')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'contacted'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Contacted
              </button>
              <button
                onClick={() => setFilter('qualified')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'qualified'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Qualified
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
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
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{lead.company?.name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <span>{lead.company?.domain}</span>
                          {lead.company?.domain && (
                            <a
                              href={`https://${lead.company.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        {lead.contact_email && (
                          <div className="text-xs text-gray-400 mt-1">{lead.contact_email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(lead.lead_score)}`}>
                        {lead.lead_score}/100
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {lead.scan?.risk_level && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{lead.scan.overall_risk_score?.toFixed(1)}</span>
                          <span className="text-xs text-gray-500 uppercase">{lead.scan.risk_level}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(lead.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="responded">Responded</option>
                        <option value="qualified">Qualified</option>
                        <option value="meeting-scheduled">Meeting Scheduled</option>
                        <option value="proposal-sent">Proposal Sent</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {lead.contacted_at
                        ? new Date(lead.contacted_at).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => navigate(`/compliance/scan/${lead.scan?.id}`)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Scan
                      </button>
                      <button
                        onClick={() => handleGenerateOutreach(lead)}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        Email
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outreach Modal */}
      {showOutreachModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold">Outreach Email</h3>
              <p className="text-sm text-gray-600">{selectedLead.company?.name}</p>
            </div>
            <div className="p-6">
              <textarea
                value={outreachEmail}
                onChange={(e) => setOutreachEmail(e.target.value)}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowOutreachModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(outreachEmail);
                  alert('Email copied to clipboard!');
                  updateLeadStatus(selectedLead.id, 'contacted');
                  setShowOutreachModal(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Copy & Mark Contacted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
  </div>
);

export default LeadsManagementPage;

