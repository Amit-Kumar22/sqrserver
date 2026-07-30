'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  ChatBubbleLeftRightIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const categories = [
  'pricing', 'timeline', 'services', 'technology', 'support', 
  'general', 'ecommerce', 'seo', 'mobile', 'redesign', 'contact'
];

export default function ChatbotManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    keywords: '',
    priority: 5,
    isActive: true
  });

  useEffect(() => {
    fetchFAQs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const url = filterCategory === 'all' 
        ? '/api/admin/faq' 
        : `/api/admin/faq?category=${filterCategory}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setFaqs(data.faqs);
      } else {
        throw new Error(data.error || 'Failed to fetch FAQs');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFAQ(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        keywords: faq.keywords.join(', '),
        priority: faq.priority,
        isActive: faq.isActive
      });
    } else {
      setEditingFAQ(null);
      setFormData({
        question: '',
        answer: '',
        category: 'general',
        keywords: '',
        priority: 5,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFAQ(null);
    setFormData({
      question: '',
      answer: '',
      category: 'general',
      keywords: '',
      priority: 5,
      isActive: true
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const keywordsArray = formData.keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    const payload = {
      ...formData,
      keywords: keywordsArray,
      ...(editingFAQ && { id: editingFAQ._id })
    };

    try {
      const response = await fetch('/api/admin/faq', {
        method: editingFAQ ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingFAQ ? 'FAQ updated successfully' : 'FAQ created successfully');
        handleCloseModal();
        fetchFAQs();
      } else {
        throw new Error(data.error || 'Failed to save FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast.error('Failed to save FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const response = await fetch(`/api/admin/faq?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        toast.success('FAQ deleted successfully');
        fetchFAQs();
      } else {
        throw new Error(data.error || 'Failed to delete FAQ');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
    }
  };

  const toggleActive = async (faq: FAQ) => {
    try {
      const response = await fetch('/api/admin/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: faq._id,
          isActive: !faq.isActive
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`FAQ ${!faq.isActive ? 'activated' : 'deactivated'}`);
        fetchFAQs();
      } else {
        throw new Error(data.error || 'Failed to update FAQ');
      }
    } catch (error) {
      console.error('Error toggling FAQ:', error);
      toast.error('Failed to update FAQ');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <AdminHeader setSidebarOpen={setSidebarOpen} title="Chatbot Management" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Chatbot Management</h1>
                <p className="text-gray-600 mt-1">Manage AI chatbot FAQs and responses</p>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add FAQ</span>
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filterCategory === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All ({faqs.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap capitalize transition-colors ${
                  filterCategory === cat
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading FAQs...</p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No FAQs found</p>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
            >
              Create your first FAQ
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                        faq.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {faq.category}
                      </span>
                      <span className="text-sm text-gray-500">Priority: {faq.priority}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 whitespace-pre-line">
                      {faq.answer.length > 200 
                        ? `${faq.answer.substring(0, 200)}...` 
                        : faq.answer
                      }
                    </p>
                    {faq.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {faq.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleActive(faq)}
                      className={`p-2 rounded-lg transition-colors ${
                        faq.isActive
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title={faq.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {faq.isActive ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : (
                        <XCircleIcon className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleOpenModal(faq)}
                      className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingFAQ ? 'Edit FAQ' : 'Create New FAQ'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question *
                  </label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer *
                  </label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="capitalize">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="cost, price, pricing, budget"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Active (visible to users)
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    {editingFAQ ? 'Update FAQ' : 'Create FAQ'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
        </main>
      </div>
    </div>
  );
}
