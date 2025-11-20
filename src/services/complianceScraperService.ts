/**
 * AI Compliance Scanner - Web Scraping Service
 * 
 * This service handles intelligent web scraping of startup websites
 * to extract compliance-related content for analysis.
 */

import { supabase } from '../lib/supabaseClient';

// ============================================================================
// TYPES
// ============================================================================

export interface ScrapeTarget {
  domain: string;
  companyName: string;
  scanId: string;
}

export interface ScrapeResult {
  success: boolean;
  pages: ScrapedPage[];
  detectedTechnologies: string[];
  error?: string;
}

export interface ScrapedPage {
  url: string;
  pageType: 'homepage' | 'privacy' | 'terms' | 'legal' | 'about' | 'ai-policy' | 'cookies' | 'security' | 'other';
  rawHtml: string;
  parsedText: string;
  wordCount: number;
  statusCode: number;
  responseTimeMs: number;
  metadata: {
    title?: string;
    description?: string;
    scripts: string[];
    externalDomains: string[];
    forms: number;
    cookies: string[];
  };
  detectedTechnologies: string[];
  detectedTracking: boolean;
}

// ============================================================================
// SCRAPER CONFIGURATION
// ============================================================================

const SCRAPER_CONFIG = {
  timeout: 30000, // 30 seconds
  userAgent: 'ComplianceScanner/1.0 (Beneficial Legal; +https://beneficial.legal/scanner)',
  maxRetries: 3,
  retryDelay: 2000,
  respectRobotsTxt: true,
  rateLimit: 1000, // 1 request per second
};

// Common URL patterns for compliance pages
const PAGE_PATTERNS = {
  privacy: [
    '/privacy',
    '/privacy-policy',
    '/privacypolicy',
    '/privacy.html',
    '/legal/privacy',
    '/policies/privacy',
  ],
  terms: [
    '/terms',
    '/terms-of-service',
    '/tos',
    '/terms-and-conditions',
    '/legal/terms',
    '/terms.html',
  ],
  legal: [
    '/legal',
    '/legal-notice',
    '/compliance',
    '/policies',
  ],
  about: [
    '/about',
    '/about-us',
    '/company',
    '/team',
  ],
  aiPolicy: [
    '/ai-policy',
    '/ai-disclosure',
    '/ai-use',
    '/artificial-intelligence',
  ],
  cookies: [
    '/cookies',
    '/cookie-policy',
    '/cookie-notice',
  ],
  security: [
    '/security',
    '/security-policy',
    '/data-security',
  ],
};

// Technology detection patterns
const TECH_PATTERNS = {
  analytics: {
    'google-analytics': /google-analytics\.com|gtag\(|ga\(/,
    'segment': /cdn\.segment\.com/,
    'mixpanel': /mixpanel\.com/,
    'amplitude': /amplitude\.com/,
    'heap': /heapanalytics\.com/,
  },
  ai: {
    'openai': /openai\.com|api\.openai\.com/,
    'anthropic': /anthropic\.com|claude\.ai/,
    'cohere': /cohere\.ai/,
    'huggingface': /huggingface\.co/,
    'replicate': /replicate\.com/,
  },
  payments: {
    'stripe': /stripe\.com|js\.stripe\.com/,
    'paypal': /paypal\.com/,
    'square': /squareup\.com/,
  },
  marketing: {
    'facebook-pixel': /facebook\.com\/tr|fbq\(/,
    'linkedin-insight': /linkedin\.com\/px/,
    'twitter-pixel': /twitter\.com\/i\/adsct/,
    'tiktok-pixel': /tiktok\.com\/i18n\/pixel/,
  },
  chat: {
    'intercom': /intercom\.io/,
    'drift': /drift\.com/,
    'zendesk': /zendesk\.com/,
  },
};

// ============================================================================
// SCRAPING FUNCTIONS
// ============================================================================

/**
 * Main scraper entry point
 */
export async function scrapeCompanyWebsite(target: ScrapeTarget): Promise<ScrapeResult> {
  console.log(`[Scraper] Starting scrape for ${target.domain}`);
  
  try {
    // Update scan status
    await updateScanStatus(target.scanId, 'scraping');
    
    const pages: ScrapedPage[] = [];
    const allTechnologies = new Set<string>();
    
    // 1. Scrape homepage first
    const homepage = await scrapePage(target.domain, '/', 'homepage');
    if (homepage.success && homepage.data) {
      pages.push(homepage.data);
      homepage.data.detectedTechnologies.forEach(tech => allTechnologies.add(tech));
    }
    
    // 2. Discover and scrape compliance pages
    const discoveredUrls = await discoverCompliancePages(target.domain, homepage.data?.parsedText || '');
    
    for (const { url, type } of discoveredUrls) {
      const page = await scrapePage(target.domain, url, type);
      if (page.success && page.data) {
        pages.push(page.data);
        page.data.detectedTechnologies.forEach(tech => allTechnologies.add(tech));
      }
      
      // Rate limiting
      await sleep(SCRAPER_CONFIG.rateLimit);
    }
    
    // 3. Save to database
    await saveScrapedPages(target.scanId, pages);
    
    return {
      success: true,
      pages,
      detectedTechnologies: Array.from(allTechnologies),
    };
    
  } catch (error) {
    console.error(`[Scraper] Error scraping ${target.domain}:`, error);
    await updateScanStatus(target.scanId, 'failed', error instanceof Error ? error.message : 'Unknown error');
    
    return {
      success: false,
      pages: [],
      detectedTechnologies: [],
      error: error instanceof Error ? error.message : 'Unknown scraping error',
    };
  }
}

/**
 * Scrape a single page
 */
async function scrapePage(
  domain: string,
  path: string,
  pageType: ScrapedPage['pageType']
): Promise<{ success: boolean; data?: ScrapedPage; error?: string }> {
  const url = normalizeUrl(domain, path);
  console.log(`[Scraper] Fetching ${url}`);
  
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': SCRAPER_CONFIG.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
      signal: AbortSignal.timeout(SCRAPER_CONFIG.timeout),
    });
    
    const responseTimeMs = Date.now() - startTime;
    
    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    
    const rawHtml = await response.text();
    const parsedText = extractTextFromHtml(rawHtml);
    const metadata = extractMetadata(rawHtml);
    const detectedTechnologies = detectTechnologies(rawHtml);
    
    return {
      success: true,
      data: {
        url,
        pageType,
        rawHtml,
        parsedText,
        wordCount: parsedText.split(/\s+/).length,
        statusCode: response.status,
        responseTimeMs,
        metadata,
        detectedTechnologies,
        detectedTracking: detectedTechnologies.some(tech => 
          ['google-analytics', 'segment', 'mixpanel', 'facebook-pixel'].includes(tech)
        ),
      },
    };
    
  } catch (error) {
    console.error(`[Scraper] Failed to fetch ${url}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown fetch error',
    };
  }
}

/**
 * Discover compliance-related pages on the website
 */
async function discoverCompliancePages(
  domain: string,
  homepageContent: string
): Promise<Array<{ url: string; type: ScrapedPage['pageType'] }>> {
  const discovered: Array<{ url: string; type: ScrapedPage['pageType'] }> = [];
  
  // Try common URL patterns
  for (const [type, patterns] of Object.entries(PAGE_PATTERNS)) {
    for (const pattern of patterns) {
      const url = normalizeUrl(domain, pattern);
      
      // Quick HEAD request to check if page exists
      try {
        const response = await fetch(url, { 
          method: 'HEAD',
          signal: AbortSignal.timeout(5000),
        });
        
        if (response.ok) {
          discovered.push({
            url: pattern,
            type: type as ScrapedPage['pageType'],
          });
          break; // Found one for this type, move to next
        }
      } catch {
        // Page doesn't exist, continue
      }
    }
  }
  
  // Parse homepage content for links
  const linkMatches = homepageContent.matchAll(/href=["']([^"']+)["']/g);
  for (const match of linkMatches) {
    const href = match[1].toLowerCase();
    
    // Check if link looks like a compliance page
    if (href.includes('privacy') && !discovered.some(d => d.type === 'privacy')) {
      discovered.push({ url: href, type: 'privacy' });
    } else if ((href.includes('terms') || href.includes('tos')) && !discovered.some(d => d.type === 'terms')) {
      discovered.push({ url: href, type: 'terms' });
    } else if (href.includes('legal') && !discovered.some(d => d.type === 'legal')) {
      discovered.push({ url: href, type: 'legal' });
    } else if (href.includes('cookie') && !discovered.some(d => d.type === 'cookies')) {
      discovered.push({ url: href, type: 'cookies' });
    }
  }
  
  return discovered;
}

/**
 * Extract plain text from HTML
 */
function extractTextFromHtml(html: string): string {
  // Remove scripts and styles
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Extract metadata from HTML
 */
function extractMetadata(html: string): ScrapedPage['metadata'] {
  const metadata: ScrapedPage['metadata'] = {
    scripts: [],
    externalDomains: [],
    forms: 0,
    cookies: [],
  };
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }
  
  // Extract meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (descMatch) {
    metadata.description = descMatch[1].trim();
  }
  
  // Extract script sources
  const scriptMatches = html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi);
  for (const match of scriptMatches) {
    metadata.scripts.push(match[1]);
    
    // Extract domain
    try {
      const url = new URL(match[1]);
      if (!metadata.externalDomains.includes(url.hostname)) {
        metadata.externalDomains.push(url.hostname);
      }
    } catch {
      // Invalid URL, skip
    }
  }
  
  // Count forms
  metadata.forms = (html.match(/<form/gi) || []).length;
  
  // Look for cookie mentions
  const cookieMatches = html.matchAll(/document\.cookie|setCookie|Cookie\(/gi);
  metadata.cookies = Array.from(new Set(cookieMatches)).map(m => m[0]);
  
  return metadata;
}

/**
 * Detect technologies used on the page
 */
function detectTechnologies(html: string): string[] {
  const detected: string[] = [];
  
  for (const [category, patterns] of Object.entries(TECH_PATTERNS)) {
    for (const [tech, regex] of Object.entries(patterns)) {
      if (regex.test(html)) {
        detected.push(tech);
      }
    }
  }
  
  return detected;
}

/**
 * Normalize URL
 */
function normalizeUrl(domain: string, path: string): string {
  // Remove protocol if present
  domain = domain.replace(/^https?:\/\//, '');
  
  // Remove trailing slash
  domain = domain.replace(/\/$/, '');
  
  // Add https protocol
  const baseUrl = `https://${domain}`;
  
  // Handle absolute URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Handle relative URLs
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  return baseUrl + path;
}

// ============================================================================
// DATABASE OPERATIONS
// ============================================================================

/**
 * Save scraped pages to database
 */
async function saveScrapedPages(scanId: string, pages: ScrapedPage[]): Promise<void> {
  const records = pages.map(page => ({
    scan_id: scanId,
    url: page.url,
    page_type: page.pageType,
    raw_html: page.rawHtml.substring(0, 50000), // Limit size
    parsed_text: page.parsedText.substring(0, 50000),
    word_count: page.wordCount,
    status_code: page.statusCode,
    response_time_ms: page.responseTimeMs,
    metadata: page.metadata,
    detected_technologies: page.detectedTechnologies,
    detected_tracking: page.detectedTracking,
    scrape_success: true,
  }));
  
  const { error } = await supabase
    .from('compliance_scraped_pages')
    .insert(records);
  
  if (error) {
    console.error('[Scraper] Failed to save pages:', error);
    throw error;
  }
  
  console.log(`[Scraper] Saved ${pages.length} pages to database`);
}

/**
 * Update scan status
 */
async function updateScanStatus(
  scanId: string,
  status: string,
  errorMessage?: string
): Promise<void> {
  const updates: any = {
    status,
    updated_at: new Date().toISOString(),
  };
  
  if (status === 'scraping') {
    updates.scraping_started_at = new Date().toISOString();
  }
  
  if (errorMessage) {
    updates.error_message = errorMessage;
  }
  
  const { error } = await supabase
    .from('compliance_scans')
    .update(updates)
    .eq('id', scanId);
  
  if (error) {
    console.error('[Scraper] Failed to update scan status:', error);
  }
}

// ============================================================================
// UTILITIES
// ============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if domain is reachable
 */
export async function checkDomainReachable(domain: string): Promise<boolean> {
  const url = normalizeUrl(domain, '/');
  
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(10000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Validate domain format
 */
export function isValidDomain(domain: string): boolean {
  const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return domainRegex.test(cleanDomain);
}

