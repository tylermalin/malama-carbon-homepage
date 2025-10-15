/**
 * Messaging System - Helper Functions
 * Admin-to-user communication
 */

import { supabase } from './supabaseClient';

export type MessageType = 'general' | 'project_update' | 'credit_availability' | 'action_required' | 'announcement';
export type MessagePriority = 'normal' | 'high' | 'urgent';
export type MessageStatus = 'sent' | 'read' | 'archived';

export interface AdminMessage {
  id: number;
  subject: string;
  message: string;
  message_type: MessageType;
  priority: MessagePriority;
  sent_by: string;
  sent_at: string;
  recipient_user_id?: string;
  recipient_role?: string;
  recipient_email?: string;
  status: MessageStatus;
  read_at?: string;
  archived_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MessageTemplate {
  id: number;
  name: string;
  subject: string;
  message: string;
  role?: string;
  message_type: MessageType;
  is_active: boolean;
}

export interface SendMessageParams {
  subject: string;
  message: string;
  message_type: MessageType;
  priority: MessagePriority;
  recipient_user_id?: string;
  recipient_role?: string;
  recipient_email?: string;
}

/**
 * Send a message to a user or role
 */
export async function sendMessage(params: SendMessageParams, sentBy: string) {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('admin_messages')
      .insert({
        subject: params.subject,
        message: params.message,
        message_type: params.message_type,
        priority: params.priority,
        sent_by: sentBy,
        recipient_user_id: params.recipient_user_id,
        recipient_role: params.recipient_role,
        recipient_email: params.recipient_email,
        status: 'sent'
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Message sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send message:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send message to multiple users
 */
export async function sendBulkMessage(
  params: Omit<SendMessageParams, 'recipient_user_id'>,
  userIds: string[],
  sentBy: string
) {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' };
    }

    const messages = userIds.map(userId => ({
      subject: params.subject,
      message: params.message,
      message_type: params.message_type,
      priority: params.priority,
      sent_by: sentBy,
      recipient_user_id: userId,
      recipient_role: params.recipient_role,
      status: 'sent' as MessageStatus
    }));

    const { data, error } = await supabase
      .from('admin_messages')
      .insert(messages)
      .select();

    if (error) {
      console.error('Error sending bulk messages:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Sent ${data?.length || 0} messages`);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send bulk messages:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get messages for current user
 */
export async function getUserMessages(userId: string, includeArchived = false) {
  try {
    if (!supabase) {
      return { success: false, data: [], error: 'Supabase not configured' };
    }

    let query = supabase
      .from('admin_messages')
      .select('*')
      .or(`recipient_user_id.eq.${userId},recipient_role.in.(SELECT role FROM user_roles WHERE user_id = '${userId}')`)
      .order('sent_at', { ascending: false });

    if (!includeArchived) {
      query = query.neq('status', 'archived');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching user messages:', error);
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Failed to get user messages:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get unread message count for user
 */
export async function getUnreadCount(userId: string) {
  try {
    if (!supabase) {
      return { success: false, count: 0, error: 'Supabase not configured' };
    }

    const { count, error } = await supabase
      .from('admin_messages')
      .select('*', { count: 'exact', head: true })
      .or(`recipient_user_id.eq.${userId},recipient_role.in.(SELECT role FROM user_roles WHERE user_id = '${userId}')`)
      .eq('status', 'sent');

    if (error) {
      console.error('Error fetching unread count:', error);
      return { success: false, count: 0, error: error.message };
    }

    return { success: true, count: count || 0 };
  } catch (error) {
    console.error('Failed to get unread count:', error);
    return { success: false, count: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: number) {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('admin_messages')
      .update({
        status: 'read',
        read_at: new Date().toISOString()
      })
      .eq('id', messageId)
      .eq('status', 'sent')
      .select()
      .single();

    if (error) {
      console.error('Error marking message as read:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to mark message as read:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Archive message
 */
export async function archiveMessage(messageId: number) {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('admin_messages')
      .update({
        status: 'archived',
        archived_at: new Date().toISOString()
      })
      .eq('id', messageId)
      .select()
      .single();

    if (error) {
      console.error('Error archiving message:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to archive message:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get all messages (admin view)
 */
export async function getAllMessages(filters?: {
  role?: string;
  status?: MessageStatus;
  messageType?: MessageType;
}) {
  try {
    if (!supabase) {
      return { success: false, data: [], error: 'Supabase not configured' };
    }

    let query = supabase
      .from('admin_messages')
      .select('*')
      .order('sent_at', { ascending: false });

    if (filters?.role) {
      query = query.eq('recipient_role', filters.role);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.messageType) {
      query = query.eq('message_type', filters.messageType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching all messages:', error);
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Failed to get all messages:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get message templates
 */
export async function getMessageTemplates(role?: string) {
  try {
    if (!supabase) {
      return { success: false, data: [], error: 'Supabase not configured' };
    }

    let query = supabase
      .from('message_templates')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (role) {
      query = query.or(`role.eq.${role},role.is.null`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching templates:', error);
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Failed to get templates:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Replace template placeholders with actual values
 */
export function replaceTemplatePlaceholders(
  template: string,
  values: Record<string, string>
): string {
  let result = template;
  
  Object.entries(values).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    result = result.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return result;
}

/**
 * Get message statistics (admin)
 */
export async function getMessageStats() {
  try {
    if (!supabase) {
      return { success: false, data: null, error: 'Supabase not configured' };
    }

    const { data: messages, error } = await supabase
      .from('admin_messages')
      .select('*');

    if (error) {
      console.error('Error fetching message stats:', error);
      return { success: false, data: null, error: error.message };
    }

    const stats = {
      total: messages?.length || 0,
      sent: messages?.filter(m => m.status === 'sent').length || 0,
      read: messages?.filter(m => m.status === 'read').length || 0,
      archived: messages?.filter(m => m.status === 'archived').length || 0,
      byType: {
        general: messages?.filter(m => m.message_type === 'general').length || 0,
        project_update: messages?.filter(m => m.message_type === 'project_update').length || 0,
        credit_availability: messages?.filter(m => m.message_type === 'credit_availability').length || 0,
        action_required: messages?.filter(m => m.message_type === 'action_required').length || 0,
        announcement: messages?.filter(m => m.message_type === 'announcement').length || 0,
      },
      readRate: messages?.length 
        ? ((messages.filter(m => m.status === 'read').length / messages.length) * 100).toFixed(1)
        : '0'
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Failed to get message stats:', error);
    return { success: false, data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}


