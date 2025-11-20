/**
 * AI Compliance Scanner - Scan Results Page
 * 
 * Displays detailed compliance scan results with findings and recommendations
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Mail,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { getScanResults, getScanProgress, generateOutreachEmail } from '../../services/complianceOrchestratorService';

export const ScanResultsPage: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('Initializing...');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!scanId) return;

    // Poll for progress until complete
    const pollProgress = async () => {
      try {
        const progressData = await getScanProgress(scanId);
        setProgress(progressData.progress);
        setProgressMessage(progressData.message);

        if (progressData.status === 'complete') {
          setScanning(false);
          await loadResults();
        } else if (progressData.status === 'failed') {
          setScanning(false);
          setError('Scan failed. Please try again.');
          setLoading(false);
        } else {
          // Continue polling
          setTimeout(pollProgress, 2000);
        }
      } catch (err) {
        console.error('Failed to get progress:', err);
        setTimeout(pollProgress, 3000);
      }
    };

    pollProgress();
  }, [scanId]);

  const loadResults = async () => {
    if (!scanId) return;

    try {
      const data = await getScanResults(scanId);
      setResults(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load results:', err);
      setError('Failed to load scan results');
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-2">Scan Failed</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => navigate('/compliance')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (scanning || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
              <Shield className="h-10 w-10 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Scanning Your Website</h2>
            <p className="text-gray-600 mb-8">{progressMessage}</p>

            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{progress}% complete</p>

            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              <div className={`p-3 rounded-lg ${progress > 20 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                ✓ Scraping pages
              </div>
              <div className={`p-3 rounded-lg ${progress > 60 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {progress > 60 ? '✓' : '...'} Analyzing
              </div>
              <div className={`p-3 rounded-lg ${progress === 100 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {progress === 100 ? '✓' : '...'} Generating report
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results) return null;

  const { scan, company, findings, findingsByCategory, issueCounts, summary } = results;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/compliance')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Scanner
            </button>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Mail className="h-4 w-4" />
                <span>Email Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <a
                href={`https://${company.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center space-x-1"
              >
                <span>{company.domain}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Scanned {new Date(scan.completed_at).toLocaleString()}
                </span>
                {company.industry && <span>Industry: {company.industry}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Risk Score Card */}
        <div className={`rounded-lg border-2 p-8 mb-6 ${getRiskColor(scan.risk_level)}`}>
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2 uppercase">{scan.risk_level} Risk</h2>
            <div className="text-6xl font-bold mb-2">
              {scan.overall_risk_score.toFixed(1)} / 10
            </div>
            <p className="text-lg">Overall Compliance Risk Score</p>
          </div>
        </div>

        {/* Risk Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Critical Issues"
            value={issueCounts.critical}
            color="red"
            icon={<XCircle />}
          />
          <StatCard
            label="High Priority"
            value={issueCounts.high}
            color="orange"
            icon={<AlertTriangle />}
          />
          <StatCard
            label="Medium Priority"
            value={issueCounts.medium}
            color="yellow"
            icon={<AlertTriangle />}
          />
          <StatCard
            label="Low Priority"
            value={issueCounts.low}
            color="green"
            icon={<CheckCircle />}
          />
        </div>

        {/* Compliance Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Compliance Status by Jurisdiction</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ComplianceStatusCard
              jurisdiction="GDPR (EU)"
              compliant={scan.gdpr_compliant}
              score={scan.gdpr_score}
            />
            <ComplianceStatusCard
              jurisdiction="CCPA (California)"
              compliant={scan.ccpa_compliant}
              score={scan.ccpa_score}
            />
            <ComplianceStatusCard
              jurisdiction="EU AI Act"
              compliant={scan.ai_act_compliant}
              score={scan.ai_act_score}
            />
          </div>
        </div>

        {/* Findings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-6">Detailed Findings</h3>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Issues ({findings.length})
            </button>
            {Object.keys(findingsByCategory).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {formatCategoryName(category)} ({findingsByCategory[category].length})
              </button>
            ))}
          </div>

          {/* Findings List */}
          <div className="space-y-4">
            {(selectedCategory ? findingsByCategory[selectedCategory] : findings).map(
              (finding: any, index: number) => (
                <FindingCard key={finding.id} finding={finding} index={index} />
              )
            )}
          </div>

          {findings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-xl font-semibold">No Issues Found!</p>
              <p>Your website appears to be compliant.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        {issueCounts.critical + issueCounts.high > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help Fixing These Issues?</h3>
            <p className="text-lg mb-6 opacity-90">
              Our legal team can help you become compliant in days. Get expert guidance and ready-to-use templates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                Book Free Consultation
              </button>
              <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
                Get Detailed Fix Guide ($99)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components
const StatCard: React.FC<{ label: string; value: number; color: string; icon: React.ReactNode }> = ({
  label,
  value,
  color,
  icon,
}) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-200 text-red-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    green: 'bg-green-50 border-green-200 text-green-700',
  };

  return (
    <div className={`rounded-lg border p-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

const ComplianceStatusCard: React.FC<{ jurisdiction: string; compliant: boolean; score: number }> = ({
  jurisdiction,
  compliant,
  score,
}) => (
  <div className={`rounded-lg border-2 p-4 ${compliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold">{jurisdiction}</span>
      {compliant ? (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ) : (
        <XCircle className="h-5 w-5 text-red-600" />
      )}
    </div>
    <div className="text-2xl font-bold mb-1">{score.toFixed(1)} / 10</div>
    <div className={`text-sm font-medium ${compliant ? 'text-green-700' : 'text-red-700'}`}>
      {compliant ? 'Compliant' : 'Non-Compliant'}
    </div>
  </div>
);

const FindingCard: React.FC<{ finding: any; index: number }> = ({ finding, index }) => {
  const [expanded, setExpanded] = useState(false);

  const severityColors = {
    critical: 'border-red-200 bg-red-50',
    high: 'border-orange-200 bg-orange-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-green-200 bg-green-50',
  };

  return (
    <div className={`border-l-4 rounded-lg p-6 ${severityColors[finding.severity as keyof typeof severityColors]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white">
              {finding.severity}
            </span>
            <span className="text-xs text-gray-500">{formatCategoryName(finding.category)}</span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">{finding.title}</h4>
          <p className="text-gray-700">{finding.description}</p>
        </div>
      </div>

      {finding.gdpr_articles?.length > 0 && (
        <div className="mb-3 text-sm">
          <span className="font-semibold">GDPR References: </span>
          <span className="text-gray-600">{finding.gdpr_articles.join(', ')}</span>
        </div>
      )}

      {finding.is_blocking && (
        <div className="mb-3 px-3 py-2 bg-red-100 border border-red-300 rounded text-sm text-red-800">
          <strong>⚠️ Blocking Issue:</strong> This may prevent product launch or cause legal action
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
        {expanded ? '− Hide' : '+ Show'} Recommendations
      </button>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <h5 className="font-semibold mb-2">Recommended Actions:</h5>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            {finding.recommendations.map((rec: string, idx: number) => (
              <li key={idx}>{rec}</li>
            ))}
          </ol>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Fix Difficulty: </span>
              <span className="capitalize">{finding.fix_difficulty.replace('-', ' ')}</span>
            </div>
            <div>
              <span className="font-semibold">Estimated Time: </span>
              <span>{finding.estimated_fix_time}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function formatCategoryName(category: string): string {
  const names: Record<string, string> = {
    ai: 'AI Disclosure',
    gdpr: 'GDPR Privacy',
    ccpa: 'CCPA Privacy',
    consent: 'Consent Management',
    security: 'Data Security',
    aiact: 'AI Act High-Risk',
  };
  return names[category] || category.toUpperCase();
}

export default ScanResultsPage;

