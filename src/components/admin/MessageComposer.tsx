/**
 * Message Composer Component
 * For admins to send messages to users
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { Send, Loader2, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import {
  sendMessage,
  sendBulkMessage,
  getMessageTemplates,
  replaceTemplatePlaceholders,
  type MessageType,
  type MessagePriority,
  type MessageTemplate
} from '../../lib/messaging';
import { supabase } from '../../lib/supabaseClient';

interface MessageComposerProps {
  adminEmail: string;
  prefilledRecipientId?: string;
  prefilledRecipientEmail?: string;
  onMessageSent?: () => void;
}

interface UserProfile {
  user_id: string;
  email: string;
  full_name?: string;
}

export function MessageComposer({
  adminEmail,
  prefilledRecipientId,
  prefilledRecipientEmail,
  onMessageSent
}: MessageComposerProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('general');
  const [priority, setPriority] = useState<MessagePriority>('normal');
  const [recipientType, setRecipientType] = useState<'individual' | 'role' | 'all'>('individual');
  const [selectedUserId, setSelectedUserId] = useState(prefilledRecipientId || '');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadUsers();
    loadTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id.toString() === selectedTemplate);
      if (template) {
        setSubject(template.subject);
        setMessage(template.message);
        setMessageType(template.message_type);
        if (template.role) {
          setRecipientType('role');
          setSelectedRole(template.role);
        }
      }
    }
  }, [selectedTemplate, templates]);

  const loadUsers = async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, email, full_name')
      .order('full_name');

    if (!error && data) {
      setUsers(data);
    }
  };

  const loadTemplates = async () => {
    const result = await getMessageTemplates();
    if (result.success) {
      setTemplates(result.data);
    }
  };

  const handleSend = async () => {
    setSendStatus('idle');
    setErrorMessage('');

    // Validation
    if (!subject.trim()) {
      setErrorMessage('Subject is required');
      setSendStatus('error');
      return;
    }
    if (!message.trim()) {
      setErrorMessage('Message is required');
      setSendStatus('error');
      return;
    }

    if (recipientType === 'individual' && !selectedUserId) {
      setErrorMessage('Please select a recipient');
      setSendStatus('error');
      return;
    }

    if (recipientType === 'role' && !selectedRole) {
      setErrorMessage('Please select a role');
      setSendStatus('error');
      return;
    }

    setIsSending(true);

    try {
      let result;

      if (recipientType === 'individual') {
        // Send to individual user
        const selectedUser = users.find(u => u.user_id === selectedUserId);
        result = await sendMessage(
          {
            subject,
            message,
            message_type: messageType,
            priority,
            recipient_user_id: selectedUserId,
            recipient_email: selectedUser?.email
          },
          adminEmail
        );
      } else if (recipientType === 'role') {
        // Send to all users with this role
        result = await sendMessage(
          {
            subject,
            message,
            message_type: messageType,
            priority,
            recipient_role: selectedRole
          },
          adminEmail
        );
      } else {
        // Send to all users
        const allUserIds = users.map(u => u.user_id);
        result = await sendBulkMessage(
          {
            subject,
            message,
            message_type: messageType,
            priority
          },
          allUserIds,
          adminEmail
        );
      }

      if (result.success) {
        setSendStatus('success');
        // Reset form
        setTimeout(() => {
          setSubject('');
          setMessage('');
          setMessageType('general');
          setPriority('normal');
          setSelectedUserId('');
          setSelectedRole('');
          setSelectedTemplate('');
          setSendStatus('idle');
          onMessageSent?.();
        }, 2000);
      } else {
        setSendStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSendStatus('error');
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Compose Message
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Template Selector */}
        <div className="space-y-2">
          <Label>Message Template (Optional)</Label>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a template..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">-- No template --</SelectItem>
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id.toString()}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {template.name}
                    {template.role && (
                      <Badge variant="secondary" className="text-xs ml-2">
                        {template.role}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recipient Type */}
        <div className="space-y-2">
          <Label>Send To</Label>
          <Select
            value={recipientType}
            onValueChange={(value: 'individual' | 'role' | 'all') => setRecipientType(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual User</SelectItem>
              <SelectItem value="role">All Users in a Role</SelectItem>
              <SelectItem value="all">All Users</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recipient Selection */}
        {recipientType === 'individual' && (
          <div className="space-y-2">
            <Label>Select User</Label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a user..." />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.user_id} value={user.user_id}>
                    {user.full_name || user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {recipientType === 'role' && (
          <div className="space-y-2">
            <Label>Select Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PROJECT_DEVELOPER">Project Developers</SelectItem>
                <SelectItem value="TECHNOLOGY_DEVELOPER">Technology Developers</SelectItem>
                <SelectItem value="CREDIT_BUYER">Credit Buyers</SelectItem>
                <SelectItem value="PARTNER">Partners</SelectItem>
                <SelectItem value="ADVISOR">Advisors</SelectItem>
                <SelectItem value="INVESTOR">Investors</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {recipientType === 'all' && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              This message will be sent to all {users.length} users
            </p>
          </div>
        )}

        {/* Message Type */}
        <div className="space-y-2">
          <Label>Message Type</Label>
          <Select value={messageType} onValueChange={(value: MessageType) => setMessageType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="project_update">Project Update</SelectItem>
              <SelectItem value="credit_availability">Credit Availability</SelectItem>
              <SelectItem value="action_required">Action Required</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select value={priority} onValueChange={(value: MessagePriority) => setPriority(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label>Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter message subject..."
          />
        </div>

        {/* Message Body */}
        <div className="space-y-2">
          <Label>Message</Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            rows={8}
          />
          <p className="text-xs text-gray-500">
            Tip: Use placeholders like {'{name}'}, {'{project_name}'}, {'{cal_link}'} in templates
          </p>
        </div>

        {/* Status Messages */}
        {sendStatus === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">Message sent successfully!</span>
          </div>
        )}

        {sendStatus === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-800">{errorMessage}</span>
          </div>
        )}

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={isSending}
          className="w-full"
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}


