/**
 * Message History Table Component
 * Display all sent messages with filters and stats
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Mail,
  MailOpen,
  Archive,
  AlertCircle,
  Search,
  Filter,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  getAllMessages,
  getMessageStats,
  type AdminMessage,
  type MessageType,
  type MessageStatus
} from '../../lib/messaging';

const messageTypeLabels: Record<MessageType, string> = {
  general: 'General',
  project_update: 'Project Update',
  credit_availability: 'Credits Available',
  action_required: 'Action Required',
  announcement: 'Announcement'
};

const statusColors = {
  sent: 'bg-blue-100 text-blue-800',
  read: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  normal: 'bg-gray-100 text-gray-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

export function MessageHistoryTable() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<AdminMessage[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadMessages();
    loadStats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [messages, searchTerm, filterRole, filterStatus, filterType]);

  const loadMessages = async () => {
    setIsLoading(true);
    const result = await getAllMessages();
    if (result.success) {
      setMessages(result.data);
    }
    setIsLoading(false);
  };

  const loadStats = async () => {
    const result = await getMessageStats();
    if (result.success) {
      setStats(result.data);
    }
  };

  const applyFilters = () => {
    let filtered = [...messages];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(m =>
        m.subject.toLowerCase().includes(search) ||
        m.message.toLowerCase().includes(search) ||
        m.recipient_email?.toLowerCase().includes(search)
      );
    }

    // Role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter(m => m.recipient_role === filterRole);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(m => m.status === filterStatus);
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(m => m.message_type === filterType);
    }

    setFilteredMessages(filtered);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 mt-3">Loading messages...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Messages</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Unread</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.sent}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Read</p>
                  <p className="text-2xl font-bold text-green-600">{stats.read}</p>
                </div>
                <MailOpen className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Read Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.readRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Role Filter */}
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="PROJECT_DEVELOPER">Project Developers</SelectItem>
                <SelectItem value="TECHNOLOGY_DEVELOPER">Technology Developers</SelectItem>
                <SelectItem value="CREDIT_BUYER">Credit Buyers</SelectItem>
                <SelectItem value="PARTNER">Partners</SelectItem>
                <SelectItem value="ADVISOR">Advisors</SelectItem>
                <SelectItem value="INVESTOR">Investors</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="sent">Sent (Unread)</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="project_update">Project Update</SelectItem>
                <SelectItem value="credit_availability">Credits Available</SelectItem>
                <SelectItem value="action_required">Action Required</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Message History ({filteredMessages.length} messages)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Read</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No messages found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate">{message.subject}</div>
                      </TableCell>
                      <TableCell>
                        {message.recipient_email || message.recipient_role || 'All Users'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {messageTypeLabels[message.message_type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityColors[message.priority]}>
                          {message.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[message.status]}>
                          {message.status === 'sent' ? (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Unread
                            </>
                          ) : message.status === 'read' ? (
                            <>
                              <MailOpen className="w-3 h-3 mr-1" />
                              Read
                            </>
                          ) : (
                            <>
                              <Archive className="w-3 h-3 mr-1" />
                              Archived
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(message.sent_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>
                        {message.read_at ? (
                          new Date(message.read_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


