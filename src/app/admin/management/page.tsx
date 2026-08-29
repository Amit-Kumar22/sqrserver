'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Users as UserGroupIcon, CheckCircle2 as CheckCircleIcon, XCircle as XCircleIcon, Clock as ClockIcon, Eye as EyeIcon, User as UserIcon, Mail as EnvelopeIcon, CalendarDays as CalendarDaysIcon, ShieldCheck as ShieldCheckIcon, CheckCircle2 as CheckCircleIconSolid, XCircle as XCircleIconSolid } from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  const fetchAdmins = async (status?: string) => {
    try {
      setLoading(true);
      const url = status && status !== 'all' ? `/api/admin/management?status=${status}` : '/api/admin/management';
      const response = await fetch(url);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch admins');
      }
      
      const data = await response.json();
      setAdmins(data.admins);
    } catch (error: any) {
      console.error('Fetch admins error:', error);
      toast.error(error.message || 'Failed to load admin accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(selectedStatus);
  }, [selectedStatus]);

  const handleApproval = async (adminId: string, action: 'approve' | 'reject') => {
    try {
      setActionLoading(adminId);
      
      const response = await fetch(`/api/admin/management/${adminId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Failed to ${action} admin`);
      }
      
      const data = await response.json();
      toast.success(data.message);
      
      // Refresh the admin list
      await fetchAdmins(selectedStatus);
      
      // Close modal if open
      setSelectedAdmin(null);
    } catch (error: any) {
      console.error(`Admin ${action} error:`, error);
      toast.error(error.message || `Failed to ${action} admin`);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        icon: ClockIcon,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        text: 'Pending'
      },
      approved: {
        icon: CheckCircleIcon,
        color: 'bg-green-100 text-green-800 border-green-200',
        text: 'Approved'
      },
      rejected: {
        icon: XCircleIcon,
        color: 'bg-red-100 text-red-800 border-red-200',
        text: 'Rejected'
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredAdmins = admins.filter(admin => {
    if (selectedStatus === 'all') return true;
    return admin.approvalStatus === selectedStatus;
  });

  const getStatusCounts = () => {
    return {
      all: admins.length,
      pending: admins.filter(a => a.approvalStatus === 'pending').length,
      approved: admins.filter(a => a.approvalStatus === 'approved').length,
      rejected: admins.filter(a => a.approvalStatus === 'rejected').length,
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage admin account requests and permissions
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => fetchAdmins(selectedStatus)}
            disabled={loading}
            className="btn-primary"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All Admins', count: statusCounts.all },
            { key: 'pending', label: 'Pending', count: statusCounts.pending },
            { key: 'approved', label: 'Approved', count: statusCounts.approved },
            { key: 'rejected', label: 'Rejected', count: statusCounts.rejected },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStatus(tab.key as typeof selectedStatus)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                selectedStatus === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  selectedStatus === tab.key
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Admin List */}
      {filteredAdmins.length === 0 ? (
        <div className="text-center py-12">
          <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No admins found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedStatus === 'all' 
              ? 'No admin accounts exist yet.'
              : `No ${selectedStatus} admin accounts found.`}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredAdmins.map((admin) => (
              <li key={admin.id}>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {admin.name}
                        </div>
                        <div className="ml-2">
                          {getStatusBadge(admin.approvalStatus)}
                        </div>
                        {!admin.isVerified && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            Unverified Email
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center mt-1">
                        <EnvelopeIcon className="h-4 w-4 mr-1" />
                        {admin.email}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <CalendarDaysIcon className="h-4 w-4 mr-1" />
                        Requested: {formatDate(admin.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedAdmin(admin)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View Details
                    </button>
                    
                    {admin.approvalStatus === 'pending' && admin.isVerified && (
                      <>
                        <button
                          onClick={() => handleApproval(admin.id, 'approve')}
                          disabled={actionLoading === admin.id}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading === admin.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b border-white mr-1"></div>
                          ) : (
                            <CheckCircleIconSolid className="h-4 w-4 mr-1" />
                          )}
                          Approve
                        </button>
                        
                        <button
                          onClick={() => handleApproval(admin.id, 'reject')}
                          disabled={actionLoading === admin.id}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading === admin.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b border-white mr-1"></div>
                          ) : (
                            <XCircleIconSolid className="h-4 w-4 mr-1" />
                          )}
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Admin Details Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 mr-2 text-primary-600" />
                  Admin Account Details
                </h3>
                <button
                  onClick={() => setSelectedAdmin(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAdmin.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAdmin.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedAdmin.approvalStatus)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Verified</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.isVerified ? (
                        <span className="text-green-600 flex items-center">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center">
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          No
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Request Date</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedAdmin.createdAt)}</p>
                  </div>
                  
                  {selectedAdmin.approvedBy && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Approved By</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedAdmin.approvedBy}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Approved Date</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedAdmin.approvedAt && formatDate(selectedAdmin.approvedAt)}
                        </p>
                      </div>
                    </>
                  )}
                  
                  {selectedAdmin.rejectedBy && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Rejected By</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedAdmin.rejectedBy}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Rejected Date</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedAdmin.rejectedAt && formatDate(selectedAdmin.rejectedAt)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                
                {selectedAdmin.approvalStatus === 'pending' && selectedAdmin.isVerified && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleApproval(selectedAdmin.id, 'approve')}
                        disabled={actionLoading === selectedAdmin.id}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === selectedAdmin.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b border-white mr-2"></div>
                        ) : (
                          <CheckCircleIconSolid className="h-5 w-5 mr-2" />
                        )}
                        Approve Account
                      </button>
                      
                      <button
                        onClick={() => handleApproval(selectedAdmin.id, 'reject')}
                        disabled={actionLoading === selectedAdmin.id}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === selectedAdmin.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b border-white mr-2"></div>
                        ) : (
                          <XCircleIconSolid className="h-5 w-5 mr-2" />
                        )}
                        Reject Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}