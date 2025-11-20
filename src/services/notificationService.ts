/**
 * AI Compliance Scanner - Notification Service
 * 
 * Handles sending notifications via email, Slack, webhooks, etc.
 */

import { supabase } from '../lib/supabaseClient';

// ============================================================================
// TYPES
// ============================================================================

export interface NotificationRequest {
  userId?: string;
  email?: string;
  scanId?: string;
  companyId?: string;
  type: 'scan-complete' | 'high-risk-detected' | 'weekly-digest' | 'policy-changed' | 'lead-created';
  channel: 'email' | 'slack' | 'webhook' | 'in-app';
  subject?: string;
  body?: string;
  data?: any;
}

// ============================================================================
// MAIN NOTIFICATION FUNCTION
// ============================================================================

/**
 * Send a notification via specified channel
 */
export async function sendNotification(request: NotificationRequest): Promise<void> {
  console.log(`[Notifications] Sending ${request.type} via ${request.channel}`);
  
  try {
    // Log notification to database
    const { data: notification, error } = await supabase
      .from('compliance_notifications')
      .insert({
        user_id: request.userId,
        email: request.email,
        scan_id: request.scanId,
        company_id: request.companyId,
        notification_type: request.type,
        channel: request.channel,
        subject: request.subject,
        body: request.body,
        data: request.data,
        status: 'pending',
      })
      .select()
      .single();
    
    if (error) {
      console.error('[Notifications] Failed to log notification:', error);
      return;
    }
    
    // Send via appropriate channel
    switch (request.channel) {
      case 'email':
        await sendEmail(request, notification.id);
        break;
      case 'slack':
        await sendSlack(request, notification.id);
        break;
      case 'webhook':
        await sendWebhook(request, notification.id);
        break;
      case 'in-app':
        // Already logged to database
        await markNotificationSent(notification.id);
        break;
    }
    
  } catch (error) {
    console.error('[Notifications] Failed to send notification:', error);
  }
}

// ============================================================================
// EMAIL NOTIFICATIONS
// ============================================================================

/**
 * Send email notification
 * 
 * In production, this would use SendGrid, AWS SES, or similar
 */
async function sendEmail(request: NotificationRequest, notificationId: string): Promise<void> {
  try {
    // For now, just log (implement SendGrid in production)
    console.log(`[Email] Would send to ${request.email}:`);
    console.log(`Subject: ${request.subject}`);
    console.log(`Body: ${request.body}`);
    
    // In production:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: request.email,
      from: 'scans@beneficial.legal',
      subject: request.subject,
      html: request.body,
    });
    */
    
    await markNotificationSent(notificationId);
    
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    await markNotificationFailed(notificationId, error);
  }
}

/**
 * Generate scan complete email template
 */
export function generateScanCompleteEmail(data: {
  companyName: string;
  domain: string;
  riskScore: number;
  riskLevel: string;
  issuesCount: number;
  scanUrl: string;
}): { subject: string; body: string } {
  const riskEmoji = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢',
  }[data.riskLevel] || '⚪';
  
  const subject = `Compliance Scan Complete: ${data.companyName} - ${data.riskLevel.toUpperCase()} Risk`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .score-box { background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${riskEmoji} Compliance Scan Complete</h1>
      <p style="margin: 0; opacity: 0.9;">Your website compliance analysis is ready</p>
    </div>
    
    <div class="content">
      <h2>Hi there,</h2>
      <p>We've completed the compliance scan for <strong>${data.companyName}</strong> (${data.domain}).</p>
      
      <div class="score-box">
        <h3 style="margin-top: 0;">Overall Risk Score</h3>
        <p style="font-size: 48px; font-weight: bold; margin: 10px 0; color: #667eea;">
          ${data.riskScore.toFixed(1)} / 10
        </p>
        <p style="font-size: 18px; color: #666; text-transform: uppercase; font-weight: bold;">
          ${riskEmoji} ${data.riskLevel} Risk
        </p>
      </div>
      
      <p><strong>Issues Found:</strong> ${data.issuesCount}</p>
      
      <p>Your report includes:</p>
      <ul>
        <li>Detailed risk breakdown by category</li>
        <li>GDPR, CCPA, and AI Act compliance status</li>
        <li>Specific recommendations for each issue</li>
        <li>Ready-to-use policy templates</li>
      </ul>
      
      <center>
        <a href="${data.scanUrl}" class="button">View Full Report →</a>
      </center>
      
      <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 5px; border-left: 4px solid #ffc107;">
        <p style="margin: 0;"><strong>⚠️ Important:</strong> This analysis is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for legal guidance.</p>
      </div>
      
      <p style="margin-top: 30px;">Need help fixing these issues? Our legal team can help you become compliant in days.</p>
      
      <p>Best regards,<br>
      <strong>The Beneficial Legal Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© 2025 Beneficial Legal. All rights reserved.</p>
      <p>This email was sent because you requested a compliance scan at beneficial.legal</p>
    </div>
  </div>
</body>
</html>
  `.trim();
  
  return { subject, body };
}

/**
 * Generate weekly digest email
 */
export function generateWeeklyDigestEmail(data: {
  userName?: string;
  scansThisWeek: number;
  highRiskCount: number;
  topCompany?: string;
  topRiskScore?: number;
  dashboardUrl: string;
}): { subject: string; body: string } {
  const subject = `Your Weekly Compliance Update - ${data.scansThisWeek} Scans Completed`;
  
  const body = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .stat-box { display: inline-block; background: white; border: 2px solid #e5e7eb; padding: 15px 25px; margin: 10px; border-radius: 8px; text-align: center; }
    .stat-number { font-size: 32px; font-weight: bold; color: #667eea; }
    .stat-label { font-size: 14px; color: #666; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <h2>📊 Your Weekly Compliance Summary</h2>
    ${data.userName ? `<p>Hi ${data.userName},</p>` : '<p>Hi there,</p>'}
    
    <p>Here's your compliance activity for the past 7 days:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <div class="stat-box">
        <div class="stat-number">${data.scansThisWeek}</div>
        <div class="stat-label">Scans Completed</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${data.highRiskCount}</div>
        <div class="stat-label">High Risk Found</div>
      </div>
    </div>
    
    ${data.topCompany ? `
    <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h3 style="margin-top: 0;">⚠️ Company Needing Attention</h3>
      <p><strong>${data.topCompany}</strong><br>
      Risk Score: ${data.topRiskScore?.toFixed(1)}/10</p>
    </div>
    ` : ''}
    
    <p style="margin-top: 30px;">
      <a href="${data.dashboardUrl}" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        View Full Dashboard →
      </a>
    </p>
    
    <p style="margin-top: 30px; color: #666; font-size: 14px;">
      Stay compliant,<br>
      The Beneficial Team
    </p>
  </div>
</body>
</html>
  `.trim();
  
  return { subject, body };
}

// ============================================================================
// SLACK NOTIFICATIONS
// ============================================================================

/**
 * Send Slack notification
 */
async function sendSlack(request: NotificationRequest, notificationId: string): Promise<void> {
  try {
    // Get webhook URL from subscription or user settings
    const webhookUrl = request.data?.slackWebhookUrl;
    
    if (!webhookUrl) {
      console.log('[Slack] No webhook URL configured');
      return;
    }
    
    const message = formatSlackMessage(request);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    
    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }
    
    await markNotificationSent(notificationId);
    
  } catch (error) {
    console.error('[Slack] Failed to send:', error);
    await markNotificationFailed(notificationId, error);
  }
}

/**
 * Format Slack message
 */
function formatSlackMessage(request: NotificationRequest): any {
  switch (request.type) {
    case 'high-risk-detected':
      return {
        text: '🚨 High Risk Compliance Issue Detected',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🚨 High Risk Detected',
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Company:*\n${request.data?.companyName}`,
              },
              {
                type: 'mrkdwn',
                text: `*Risk Score:*\n${request.data?.riskScore}/10`,
              },
              {
                type: 'mrkdwn',
                text: `*Issues:*\n${request.data?.issuesCount}`,
              },
              {
                type: 'mrkdwn',
                text: `*Level:*\n${request.data?.riskLevel?.toUpperCase()}`,
              },
            ],
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'View Report',
                },
                url: request.data?.scanUrl,
              },
            ],
          },
        ],
      };
      
    case 'scan-complete':
      return {
        text: `✅ Scan complete for ${request.data?.companyName}`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Compliance scan complete*\n${request.data?.companyName} - Risk Score: ${request.data?.riskScore}/10`,
            },
          },
        ],
      };
      
    default:
      return {
        text: request.body || 'New notification',
      };
  }
}

// ============================================================================
// WEBHOOK NOTIFICATIONS
// ============================================================================

/**
 * Send webhook notification
 */
async function sendWebhook(request: NotificationRequest, notificationId: string): Promise<void> {
  try {
    const webhookUrl = request.data?.webhookUrl;
    
    if (!webhookUrl) {
      console.log('[Webhook] No URL configured');
      return;
    }
    
    const payload = {
      type: request.type,
      timestamp: new Date().toISOString(),
      data: request.data,
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ComplianceScanner/1.0',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`Webhook error: ${response.statusText}`);
    }
    
    await markNotificationSent(notificationId);
    
  } catch (error) {
    console.error('[Webhook] Failed to send:', error);
    await markNotificationFailed(notificationId, error);
  }
}

// ============================================================================
// DATABASE HELPERS
// ============================================================================

/**
 * Mark notification as sent
 */
async function markNotificationSent(notificationId: string): Promise<void> {
  await supabase
    .from('compliance_notifications')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString(),
    })
    .eq('id', notificationId);
}

/**
 * Mark notification as failed
 */
async function markNotificationFailed(notificationId: string, error: any): Promise<void> {
  await supabase
    .from('compliance_notifications')
    .update({
      status: 'failed',
      error_message: error instanceof Error ? error.message : String(error),
    })
    .eq('id', notificationId);
}

// ============================================================================
// BATCH NOTIFICATIONS
// ============================================================================

/**
 * Send weekly digest to all subscribed users
 */
export async function sendWeeklyDigests(): Promise<void> {
  // Get all active subscriptions with weekly frequency
  const { data: subscriptions } = await supabase
    .from('compliance_subscriptions')
    .select(`
      *,
      user:auth.users(email),
      company:compliance_companies(*)
    `)
    .eq('active', true)
    .eq('frequency', 'weekly')
    .lt('next_scan_at', new Date().toISOString());
  
  if (!subscriptions) return;
  
  // Send digest to each user
  for (const sub of subscriptions) {
    try {
      // Get user's scan stats for the week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { data: scans } = await supabase
        .from('compliance_scans')
        .select('*')
        .eq('user_id', sub.user_id)
        .gte('created_at', weekAgo.toISOString());
      
      if (!scans || scans.length === 0) continue;
      
      const highRiskScans = scans.filter(s => s.risk_level === 'high' || s.risk_level === 'critical');
      const topRiskScan = [...scans].sort((a, b) => (b.overall_risk_score || 0) - (a.overall_risk_score || 0))[0];
      
      const { subject, body } = generateWeeklyDigestEmail({
        scansThisWeek: scans.length,
        highRiskCount: highRiskScans.length,
        topCompany: topRiskScan?.company?.name,
        topRiskScore: topRiskScan?.overall_risk_score,
        dashboardUrl: `${window.location.origin}/compliance/dashboard`,
      });
      
      await sendNotification({
        userId: sub.user_id,
        email: sub.user?.email,
        type: 'weekly-digest',
        channel: 'email',
        subject,
        body,
      });
      
    } catch (error) {
      console.error(`Failed to send digest for user ${sub.user_id}:`, error);
    }
  }
}

// ============================================================================
// NOTIFICATION PREFERENCES
// ============================================================================

/**
 * Get user notification preferences
 */
export async function getNotificationPreferences(userId: string): Promise<any> {
  const { data } = await supabase
    .from('compliance_subscriptions')
    .select('email_alerts, slack_webhook_url, webhook_url, alert_threshold')
    .eq('user_id', userId)
    .eq('active', true)
    .single();
  
  return data;
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(
  userId: string,
  preferences: {
    emailAlerts?: boolean;
    slackWebhookUrl?: string;
    webhookUrl?: string;
    alertThreshold?: 'all' | 'medium' | 'high' | 'critical';
  }
): Promise<void> {
  await supabase
    .from('compliance_subscriptions')
    .update({
      email_alerts: preferences.emailAlerts,
      slack_webhook_url: preferences.slackWebhookUrl,
      webhook_url: preferences.webhookUrl,
      alert_threshold: preferences.alertThreshold,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);
}

