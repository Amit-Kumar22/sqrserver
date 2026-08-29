'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { MessagesSquare as ChatBubbleLeftRightIcon, Mail as EnvelopeIcon, Phone as PhoneIcon, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp: string;
}

interface LeadInfo {
  name?: string;
  email?: string;
  phone?: string;
  projectRequirements?: string;
}

interface ChatLead {
  _id: string;
  sessionId: string;
  conversation: ChatMessage[];
  leadInfo: LeadInfo;
  status: 'active' | 'converted' | 'abandoned';
  source: string;
  ipAddress?: string;
  lastMessageAt: string;
  createdAt: string;
}

export default function ChatLeadsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState<ChatLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<ChatLead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const url = filterStatus === 'all'
        ? '/api/admin/chatbot/leads'
        : `/api/admin/chatbot/leads?status=${filterStatus}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setLeads(data.leads);
      } else {
        throw new Error(data.error || 'Failed to fetch leads');
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load chat leads');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/chatbot/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Lead status updated');
        fetchLeads();
        if (selectedLead?._id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus as any });
        }
      } else {
        throw new Error(data.error || 'Failed to update lead');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-teal-100 text-teal-800';
      case 'abandoned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <AdminHeader setSidebarOpen={setSidebarOpen} title="Chat Leads" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chat Leads</h1>
              <p className="text-gray-600 mt-1">View and manage chatbot conversations and leads</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex space-x-2">
          {['all', 'converted', 'active', 'abandoned'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filterStatus === status
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading chat leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No chat leads found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leads List */}
            <div className="lg:col-span-1 space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead._id}
                  onClick={() => setSelectedLead(lead)}
                  className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedLead?._id === lead._id ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(lead.lastMessageAt).toLocaleDateString()}
                    </span>
                  </div>

                  {lead.leadInfo.name && (
                    <div className="flex items-center text-sm text-gray-900 font-medium mb-1">
                      <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {lead.leadInfo.name}
                    </div>
                  )}

                  {lead.leadInfo.email && (
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {lead.leadInfo.email}
                    </div>
                  )}

                  {lead.leadInfo.phone && (
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {lead.leadInfo.phone}
                    </div>
                  )}

                  <div className="mt-2 text-xs text-gray-500">
                    {lead.conversation.length} messages • {lead.source}
                  </div>
                </div>
              ))}
            </div>

            {/* Lead Details */}
            <div className="lg:col-span-2">
              {selectedLead ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {/* Lead Info */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-900">Lead Information</h2>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => updateLeadStatus(selectedLead._id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="converted">Converted</option>
                        <option value="abandoned">Abandoned</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {selectedLead.leadInfo.name && (
                        <div>
                          <label className="text-xs text-gray-500">Name</label>
                          <p className="text-sm font-medium text-gray-900">{selectedLead.leadInfo.name}</p>
                        </div>
                      )}
                      {selectedLead.leadInfo.email && (
                        <div>
                          <label className="text-xs text-gray-500">Email</label>
                          <p className="text-sm font-medium text-gray-900">{selectedLead.leadInfo.email}</p>
                        </div>
                      )}
                      {selectedLead.leadInfo.phone && (
                        <div>
                          <label className="text-xs text-gray-500">Phone</label>
                          <p className="text-sm font-medium text-gray-900">{selectedLead.leadInfo.phone}</p>
                        </div>
                      )}
                      <div>
                        <label className="text-xs text-gray-500">Source</label>
                        <p className="text-sm font-medium text-gray-900 capitalize">{selectedLead.source}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Created At</label>
                        <p className="text-sm font-medium text-gray-900">{formatDate(selectedLead.createdAt)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Last Activity</label>
                        <p className="text-sm font-medium text-gray-900">{formatDate(selectedLead.lastMessageAt)}</p>
                      </div>
                    </div>

                    {selectedLead.leadInfo.projectRequirements && (
                      <div className="mt-4">
                        <label className="text-xs text-gray-500">Project Requirements</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedLead.leadInfo.projectRequirements}</p>
                      </div>
                    )}
                  </div>

                  {/* Conversation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation History</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {selectedLead.conversation.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              msg.sender === 'user'
                                ? 'bg-teal-600 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-900 rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{msg.message}</p>
                            <span className={`text-xs mt-1 block ${
                              msg.sender === 'user' ? 'text-teal-100' : 'text-gray-500'
                            }`}>
                              {formatDate(msg.timestamp)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a lead to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
          </div>
        </main>
      </div>
    </div>
  );
}
