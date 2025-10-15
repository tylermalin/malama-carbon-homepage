/**
 * Message Inbox Component
 * Displays admin messages to users in their dashboard
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Mail,
  MailOpen,
  AlertCircle,
  CheckCircle2,
  Info,
  TrendingUp,
  Archive,
  ChevronDown,
  ChevronUp,
  Clock
} from 'lucide-react';
import {
  getUserMessages,
  markMessageAsRead,
  archiveMessage,
  type AdminMessage
} from '../../lib/messaging';

interface MessageInboxProps {
  userId: string;
}

const messageTypeIcons = {
  general: Info,
  project_update: CheckCircle2,
  credit_availability: TrendingUp,
  action_required: AlertCircle,
  announcement: Mail
};

const messageTypeColors = {
  general: 'bg-blue-50 text-blue-700 border-blue-200',
  project_update: 'bg-green-50 text-green-700 border-green-200',
  credit_availability: 'bg-purple-50 text-purple-700 border-purple-200',
  action_required: 'bg-orange-50 text-orange-700 border-orange-200',
  announcement: 'bg-gray-50 text-gray-700 border-gray-200'
};

const priorityBadges = {
  normal: null,
  high: <Badge variant="secondary" className="bg-orange-100 text-orange-700">High Priority</Badge>,
  urgent: <Badge variant="destructive">Urgent</Badge>
};

export function MessageInbox({ userId }: MessageInboxProps) {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [expandedMessageId, setExpandedMessageId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    loadMessages();
  }, [userId, showArchived]);

  const loadMessages = async () => {
    setIsLoading(true);
    const result = await getUserMessages(userId, showArchived);
    if (result.success) {
      setMessages(result.data as AdminMessage[]);
    }
    setIsLoading(false);
  };

  const handleReadMessage = async (message: AdminMessage) => {
    if (expandedMessageId === message.id) {
      setExpandedMessageId(null);
      return;
    }

    setExpandedMessageId(message.id);

    // Mark as read if unread
    if (message.status === 'sent') {
      const result = await markMessageAsRead(message.id);
      if (result.success) {
        // Update local state
        setMessages(prev =>
          prev.map(m =>
            m.id === message.id
              ? { ...m, status: 'read' as const, read_at: new Date().toISOString() }
              : m
          )
        );
      }
    }
  };

  const handleArchive = async (messageId: number) => {
    const result = await archiveMessage(messageId);
    if (result.success) {
      // Remove from list if not showing archived
      if (!showArchived) {
        setMessages(prev => prev.filter(m => m.id !== messageId));
      } else {
        // Update local state
        setMessages(prev =>
          prev.map(m =>
            m.id === messageId
              ? { ...m, status: 'archived' as const, archived_at: new Date().toISOString() }
              : m
          )
        );
      }
      
      if (expandedMessageId === messageId) {
        setExpandedMessageId(null);
      }
    }
  };

  const unreadCount = messages.filter(m => m.status === 'sent').length;
  const activeMessages = messages.filter(m => m.status !== 'archived');

  if (isLoading) {
    return null;
  }

  // Don't show component if no messages
  if (messages.length === 0 && !showArchived) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Messages
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowArchived(!showArchived)}
        >
          <Archive className="w-4 h-4 mr-2" />
          {showArchived ? 'Hide' : 'Show'} Archived
        </Button>
      </div>

      {activeMessages.length === 0 && !showArchived ? (
        <Card className="border-gray-200">
          <CardContent className="p-8 text-center">
            <MailOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No messages</p>
            <p className="text-sm text-gray-400 mt-1">
              Your team will notify you here when there are updates
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {messages.map(message => {
              const Icon = messageTypeIcons[message.message_type];
              const isExpanded = expandedMessageId === message.id;
              const isUnread = message.status === 'sent';
              const colorClass = messageTypeColors[message.message_type];

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      isUnread ? 'border-l-4 border-l-primary shadow-sm' : 'border-gray-200'
                    } ${isExpanded ? 'ring-2 ring-primary/20' : ''}`}
                  >
                    <CardContent className="p-0">
                      {/* Message Header */}
                      <div
                        className="p-4 hover:bg-gray-50 transition-colors"
                        onClick={() => handleReadMessage(message)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-semibold ${isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {message.subject}
                                </h3>
                                {isUnread && (
                                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                                    New
                                  </Badge>
                                )}
                                {priorityBadges[message.priority]}
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(message.sent_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                              <span>From: {message.sent_by}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Message Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-gray-100 overflow-hidden"
                          >
                            <div className="p-4 bg-gray-50">
                              <div className="prose prose-sm max-w-none">
                                <p className="text-gray-700 whitespace-pre-wrap">
                                  {message.message}
                                </p>
                              </div>
                              <div className="mt-4 flex items-center gap-2">
                                {message.status !== 'archived' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleArchive(message.id)}
                                  >
                                    <Archive className="w-4 h-4 mr-2" />
                                    Archive
                                  </Button>
                                )}
                                {message.read_at && (
                                  <span className="text-xs text-gray-500">
                                    Read on {new Date(message.read_at).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}


