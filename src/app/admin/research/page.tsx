'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Plus as PlusIcon, Pencil as PencilIcon, Trash2 as TrashIcon, Eye as EyeIcon, Calendar as CalendarIcon, User as UserIcon } from 'lucide-react';

interface ResearchContent {
  _id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  published: boolean;
  author: string;
  publishedDate?: string;
  createdAt: string;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'artificial-intelligence', label: 'Artificial Intelligence' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'Internet of Things' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'cloud-computing', label: 'Cloud Computing' },
  { value: 'other', label: 'Other' },
];

export default function AdminResearchPage() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [research, setResearch] = useState<ResearchContent[]>([]);
  const [loadingResearch, setLoadingResearch] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchResearch = useCallback(async () => {
    try {
      setLoadingResearch(true);
      const params = new URLSearchParams({ limit: '100', all: 'true' });
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      
      const response = await fetch(`/api/research?${params}`);
      if (response.ok) {
        const data = await response.json();
        setResearch(data.research);
      } else {
        toast.error('Failed to fetch research content');
      }
    } catch (error) {
      console.error('Error fetching research:', error);
      toast.error('Failed to load research content');
    } finally {
      setLoadingResearch(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (user) {
      fetchResearch();
    }
  }, [user, selectedCategory, fetchResearch]);

  const handleDeleteResearch = async (researchId: string) => {
    try {
      const response = await fetch(`/api/research/${researchId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('Research content deleted successfully');
        fetchResearch();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete research content');
      }
    } catch (error) {
      console.error('Error deleting research:', error);
      toast.error('Failed to delete research content');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const filteredResearch = research.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <AdminHeader setSidebarOpen={setSidebarOpen} title="Research Management" />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">All Research Content</h2>
              <p className="text-sm text-gray-600">Manage your research publications</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link href="/admin/research/new" className="btn-primary">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Research
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="card-compact mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search research content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="w-full sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Research List */}
          {loadingResearch ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredResearch.length === 0 ? (
            <div className="card-compact text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery || selectedCategory ? 'No research content found' : 'No research content yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedCategory 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first research article to get started'
                }
              </p>
              <Link href="/admin/research/new" className="btn-primary">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Research
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredResearch.map((item) => (
                <div key={item._id} className="card-compact">
                  {/* Research Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
                        item.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  {/* Research Summary */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {item.summary}
                  </p>
                  
                  {/* Category and Tags */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
                        {categories.find(c => c.value === item.category)?.label || item.category}
                      </span>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            +{item.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Research Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <UserIcon className="h-3 w-3 mr-1" />
                      {item.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {item.published && item.publishedDate 
                        ? formatDate(item.publishedDate) 
                        : formatDate(item.createdAt)
                      }
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/research/${item._id}/edit`}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded hover:bg-primary-200"
                      >
                        <PencilIcon className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                      {item.published && (
                        <a
                          href={`/research#${item._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                        >
                          <EyeIcon className="w-3 h-3 mr-1" />
                          View
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => setDeleteConfirm(item._id)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                    >
                      <TrashIcon className="w-3 h-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setDeleteConfirm(null)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <TrashIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Research Content
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this research content? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDeleteResearch(deleteConfirm)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}