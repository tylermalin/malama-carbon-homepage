/**
 * AI Compliance Scanner - Orchestrator Service
 * 
 * This service coordinates the entire compliance scanning workflow:
 * scraping → analysis → reporting → notifications
 */

import { supabase } from '../lib/supabaseClient';
import { scrapeCompanyWebsite, isValidDomain, checkDomainReachable } from './complianceScraperService';
import { analyzeCompliance } from './complianceAnalyzerService';

// ============================================================================
// TYPES
// ============================================================================

export interface StartScanRequest {
  domain: string;
  companyName?: string;
  industry?: string;
  contactEmail?: string;
  userId?: string;
  scanType?: 'manual' | 'scheduled' | 'api' | 'bulk';
}

export interface ScanProgress {
  scanId: string;
  status: string;
  progress: number; // 0-100
  message: string;
  estimatedTimeRemaining?: number; // seconds
}

export interface CompleteScanResult {
  scanId: string;
  companyId: string;
  success: boolean;
  riskScore: number;
  riskLevel: string;
  issuesFound: number;
  reportUrl: string;
  error?: string;
}

// ============================================================================
// MAIN ORCHESTRATION
// ============================================================================

/**
 * Start a complete compliance scan workflow
 */
export async function startComplianceScan(request: StartScanRequest): Promise<CompleteScanResult> {
  console.log(`[Orchestrator] Starting scan for ${request.domain}`);
  
  try {
    // 1. Validate domain
    if (!isValidDomain(request.domain)) {
      throw new Error('Invalid domain format');
    }
    
    // 2. Check if domain is reachable
    const isReachable = await checkDomainReachable(request.domain);
    if (!isReachable) {
      throw new Error('Domain is not reachable. Please check the URL and try again.');
    }
    
    // 3. Create or get company record
    const company = await getOrCreateCompany({
      domain: request.domain,
      name: request.companyName || extractCompanyNameFromDomain(request.domain),
      industry: request.industry,
      contactEmail: request.contactEmail,
      createdBy: request.userId,
    });
    
    // 4. Create scan record
    const scan = await createScan({
      companyId: company.id,
      userId: request.userId,
      scanType: request.scanType || 'manual',
    });
    
    // 5. Start async scanning and analysis
    // In production, this would be queued to a background job
    processScanAsync(scan.id, company, request).catch(error => {
      console.error('[Orchestrator] Background scan failed:', error);
      updateScanError(scan.id, error);
    });
    
    // 6. Return scan started response
    return {
      scanId: scan.id,
      companyId: company.id,
      success: true,
      riskScore: 0,
      riskLevel: 'pending',
      issuesFound: 0,
      reportUrl: `/compliance/reports/${scan.id}`,
    };
    
  } catch (error) {
    console.error('[Orchestrator] Failed to start scan:', error);
    throw error;
  }
}

/**
 * Process scan asynchronously (background job)
 */
async function processScanAsync(
  scanId: string,
  company: any,
  request: StartScanRequest
): Promise<void> {
  
  const startTime = Date.now();
  
  try {
    // Update status to queued
    await updateScanStatus(scanId, 'queued');
    
    // Step 1: Scrape website
    console.log(`[Orchestrator] Scraping ${company.domain}...`);
    const scrapeResult = await scrapeCompanyWebsite({
      domain: company.domain,
      companyName: company.name,
      scanId,
    });
    
    if (!scrapeResult.success || scrapeResult.pages.length === 0) {
      throw new Error(scrapeResult.error || 'No pages could be scraped');
    }
    
    console.log(`[Orchestrator] Scraped ${scrapeResult.pages.length} pages`);
    
    // Step 2: Analyze compliance
    console.log(`[Orchestrator] Analyzing compliance...`);
    const analysisResult = await analyzeCompliance({
      scanId,
      companyName: company.name,
      domain: company.domain,
      industry: company.industry,
      pages: scrapeResult.pages,
      detectedTechnologies: scrapeResult.detectedTechnologies,
    });
    
    if (!analysisResult.success) {
      throw new Error(analysisResult.error || 'Analysis failed');
    }
    
    console.log(`[Orchestrator] Analysis complete. Risk score: ${analysisResult.overallRiskScore}`);
    
    // Step 3: Calculate duration
    const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
    await updateScanDuration(scanId, durationSeconds);
    
    // Step 4: Send notifications if high risk
    if (analysisResult.riskLevel === 'high' || analysisResult.riskLevel === 'critical') {
      await sendHighRiskNotification(scanId, company, analysisResult);
    }
    
    console.log(`[Orchestrator] Scan ${scanId} completed successfully in ${durationSeconds}s`);
    
  } catch (error) {
    console.error(`[Orchestrator] Scan ${scanId} failed:`, error);
    await updateScanError(scanId, error);
    throw error;
  }
}

/**
 * Get scan progress
 */
export async function getScanProgress(scanId: string): Promise<ScanProgress> {
  const { data, error } = await supabase
    .from('compliance_scans')
    .select('status, started_at, scraping_started_at, analyzing_started_at, completed_at')
    .eq('id', scanId)
    .single();
  
  if (error || !data) {
    throw new Error('Scan not found');
  }
  
  // Calculate progress based on status
  let progress = 0;
  let message = 'Initializing...';
  let estimatedTimeRemaining: number | undefined;
  
  switch (data.status) {
    case 'pending':
    case 'queued':
      progress = 5;
      message = 'Waiting in queue...';
      estimatedTimeRemaining = 90;
      break;
    case 'scraping':
      progress = 30;
      message = 'Scraping website...';
      estimatedTimeRemaining = 60;
      break;
    case 'analyzing':
      progress = 70;
      message = 'Analyzing compliance...';
      estimatedTimeRemaining = 30;
      break;
    case 'complete':
      progress = 100;
      message = 'Scan complete!';
      estimatedTimeRemaining = 0;
      break;
    case 'failed':
      progress = 100;
      message = 'Scan failed';
      estimatedTimeRemaining = 0;
      break;
  }
  
  return {
    scanId,
    status: data.status,
    progress,
    message,
    estimatedTimeRemaining,
  };
}

/**
 * Get full scan results
 */
export async function getScanResults(scanId: string): Promise<any> {
  // Get scan with company info
  const { data: scan, error: scanError } = await supabase
    .from('compliance_scans')
    .select(`
      *,
      company:compliance_companies(*)
    `)
    .eq('id', scanId)
    .single();
  
  if (scanError || !scan) {
    throw new Error('Scan not found');
  }
  
  // Get findings
  const { data: findings, error: findingsError } = await supabase
    .from('compliance_findings')
    .select('*')
    .eq('scan_id', scanId)
    .order('severity', { ascending: false })
    .order('score', { ascending: false });
  
  if (findingsError) {
    console.error('Failed to load findings:', findingsError);
  }
  
  // Get scraped pages summary
  const { data: pages } = await supabase
    .from('compliance_scraped_pages')
    .select('url, page_type, word_count, detected_technologies')
    .eq('scan_id', scanId);
  
  // Group findings by category
  const findingsByCategory: Record<string, any[]> = {};
  for (const finding of findings || []) {
    if (!findingsByCategory[finding.category]) {
      findingsByCategory[finding.category] = [];
    }
    findingsByCategory[finding.category].push(finding);
  }
  
  // Count issues by severity
  const issueCounts = {
    critical: findings?.filter(f => f.severity === 'critical').length || 0,
    high: findings?.filter(f => f.severity === 'high').length || 0,
    medium: findings?.filter(f => f.severity === 'medium').length || 0,
    low: findings?.filter(f => f.severity === 'low').length || 0,
  };
  
  return {
    scan,
    company: scan.company,
    findings: findings || [],
    findingsByCategory,
    issueCounts,
    pages: pages || [],
    summary: {
      totalIssues: findings?.length || 0,
      ...issueCounts,
      riskScore: scan.overall_risk_score,
      riskLevel: scan.risk_level,
      pagesScanned: pages?.length || 0,
      completedAt: scan.completed_at,
      duration: scan.duration_seconds,
    },
  };
}

/**
 * Get all scans for a user
 */
export async function getUserScans(userId: string, limit = 50): Promise<any[]> {
  const { data, error } = await supabase
    .from('compliance_scans')
    .select(`
      *,
      company:compliance_companies(name, domain, industry)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Failed to load user scans:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Get public scan results (limited info)
 */
export async function getPublicScanResults(scanId: string): Promise<any> {
  const { data: scan, error } = await supabase
    .from('compliance_scans')
    .select(`
      id,
      overall_risk_score,
      risk_level,
      total_issues,
      critical_issues,
      high_issues,
      completed_at,
      company:compliance_companies(name, domain)
    `)
    .eq('id', scanId)
    .single();
  
  if (error || !scan) {
    throw new Error('Scan not found');
  }
  
  return scan;
}

// ============================================================================
// DATABASE HELPERS
// ============================================================================

/**
 * Get or create company record
 */
async function getOrCreateCompany(params: {
  domain: string;
  name: string;
  industry?: string;
  contactEmail?: string;
  createdBy?: string;
}): Promise<any> {
  
  // Try to find existing company
  const { data: existing } = await supabase
    .from('compliance_companies')
    .select('*')
    .eq('domain', params.domain)
    .is('deleted_at', null)
    .single();
  
  if (existing) {
    // Update last scanned
    await supabase
      .from('compliance_companies')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', existing.id);
    
    return existing;
  }
  
  // Create new company
  const { data: newCompany, error } = await supabase
    .from('compliance_companies')
    .insert({
      name: params.name,
      domain: params.domain,
      industry: params.industry,
      contact_email: params.contactEmail,
      created_by: params.createdBy,
    })
    .select()
    .single();
  
  if (error) {
    console.error('Failed to create company:', error);
    throw error;
  }
  
  return newCompany;
}

/**
 * Create scan record
 */
async function createScan(params: {
  companyId: string;
  userId?: string;
  scanType: string;
}): Promise<any> {
  
  const { data, error } = await supabase
    .from('compliance_scans')
    .insert({
      company_id: params.companyId,
      user_id: params.userId,
      scan_type: params.scanType,
      status: 'pending',
    })
    .select()
    .single();
  
  if (error) {
    console.error('Failed to create scan:', error);
    throw error;
  }
  
  return data;
}

/**
 * Update scan status
 */
async function updateScanStatus(scanId: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('compliance_scans')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', scanId);
  
  if (error) {
    console.error('Failed to update scan status:', error);
  }
}

/**
 * Update scan duration
 */
async function updateScanDuration(scanId: string, durationSeconds: number): Promise<void> {
  const { error } = await supabase
    .from('compliance_scans')
    .update({
      duration_seconds: durationSeconds,
      updated_at: new Date().toISOString(),
    })
    .eq('id', scanId);
  
  if (error) {
    console.error('Failed to update scan duration:', error);
  }
}

/**
 * Update scan with error
 */
async function updateScanError(scanId: string, error: any): Promise<void> {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  await supabase
    .from('compliance_scans')
    .update({
      status: 'failed',
      error_message: errorMessage,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', scanId);
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

/**
 * Send high-risk notification
 */
async function sendHighRiskNotification(scanId: string, company: any, analysisResult: any): Promise<void> {
  console.log(`[Orchestrator] Sending high-risk notification for ${company.name}`);
  
  // In production, this would send email via SendGrid or similar
  // For now, just log to database
  
  await supabase
    .from('compliance_notifications')
    .insert({
      scan_id: scanId,
      company_id: company.id,
      notification_type: 'high-risk-detected',
      channel: 'email',
      subject: `High Risk Detected: ${company.name}`,
      body: `Compliance scan for ${company.name} (${company.domain}) found ${analysisResult.categories.length} issues with a risk score of ${analysisResult.overallRiskScore}/10.`,
      data: {
        risk_score: analysisResult.overallRiskScore,
        risk_level: analysisResult.riskLevel,
        issues_count: analysisResult.categories.length,
      },
      status: 'pending',
    });
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Extract company name from domain
 */
function extractCompanyNameFromDomain(domain: string): string {
  // Remove protocol and www
  let name = domain.replace(/^https?:\/\//, '').replace(/^www\./, '');
  
  // Remove TLD
  name = name.split('.')[0];
  
  // Capitalize first letter
  name = name.charAt(0).toUpperCase() + name.slice(1);
  
  return name;
}

/**
 * Bulk scan multiple companies
 */
export async function bulkScanCompanies(
  domains: string[],
  userId?: string
): Promise<{ started: string[]; failed: Array<{ domain: string; error: string }> }> {
  
  const started: string[] = [];
  const failed: Array<{ domain: string; error: string }> = [];
  
  for (const domain of domains) {
    try {
      const result = await startComplianceScan({
        domain,
        userId,
        scanType: 'bulk',
      });
      started.push(result.scanId);
      
      // Rate limiting between scans
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      failed.push({
        domain,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
  
  return { started, failed };
}

/**
 * Re-scan existing company
 */
export async function rescanCompany(companyId: string, userId?: string): Promise<CompleteScanResult> {
  const { data: company, error } = await supabase
    .from('compliance_companies')
    .select('*')
    .eq('id', companyId)
    .single();
  
  if (error || !company) {
    throw new Error('Company not found');
  }
  
  return startComplianceScan({
    domain: company.domain,
    companyName: company.name,
    industry: company.industry,
    contactEmail: company.contact_email,
    userId,
    scanType: 'manual',
  });
}

/**
 * Delete scan
 */
export async function deleteScan(scanId: string, userId?: string): Promise<void> {
  // Verify ownership if userId provided
  if (userId) {
    const { data: scan } = await supabase
      .from('compliance_scans')
      .select('user_id')
      .eq('id', scanId)
      .single();
    
    if (scan && scan.user_id !== userId) {
      throw new Error('Unauthorized');
    }
  }
  
  // Delete scan (will cascade to findings and pages)
  const { error } = await supabase
    .from('compliance_scans')
    .delete()
    .eq('id', scanId);
  
  if (error) {
    throw error;
  }
}

/**
 * Export scan to PDF
 */
export async function exportScanToPDF(scanId: string): Promise<Blob> {
  // In production, this would generate a PDF using puppeteer or similar
  // For now, return a placeholder
  throw new Error('PDF export not yet implemented');
}

/**
 * Generate outreach email for lead
 */
export async function generateOutreachEmail(scanId: string): Promise<string> {
  const results = await getScanResults(scanId);
  
  const template = `
Subject: Quick Compliance Check for ${results.company.name}

Hi ${results.company.name} team,

I recently ran a quick compliance scan on ${results.company.domain} and noticed a few areas that might need attention.

Your compliance score: ${results.scan.overall_risk_score}/10 (${results.scan.risk_level} risk)

Key issues detected:
${results.findings.slice(0, 3).map((f: any) => `- ${f.title}`).join('\n')}

The good news? Most of these can be fixed quickly with the right templates and guidance.

I'd love to help you get these sorted. Would you be open to a quick 15-minute call to discuss?

Best regards,
[Your Name]
Beneficial Legal
`.trim();
  
  return template;
}

