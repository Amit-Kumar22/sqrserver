'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  subcategory: string;
  status: 'completed' | 'ongoing' | 'planned';
  startDate: string;
  endDate?: string;
  featured: boolean;
  createdAt: string;
  images: string[];
}

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  ongoing: 'bg-teal-100 text-teal-800',
  planned: 'bg-gray-100 text-gray-800',
};

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'it-solutions', label: 'IT Solutions' },
  { value: 'research-development', label: 'Research & Development' },
];

const subcategories = [
  { value: '', label: 'All Subcategories' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile Apps' },
  { value: 'desktop-app', label: 'Desktop Apps' },
  { value: 'ai-ml', label: 'AI & ML' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'IoT' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'cloud-solutions', label: 'Cloud Solutions' },
  { value: 'system-integration', label: 'System Integration' },
  { value: 'other', label: 'Other' },
];

export default function AdminProjectsPage() {
  const { user, loading, initialized } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const params = new URLSearchParams({ limit: '100' });
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      if (selectedSubcategory) {
        params.append('subcategory', selectedSubcategory);
      }
      
      const response = await fetch(`/api/projects?${params}`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      } else {
        toast.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user, selectedCategory, selectedSubcategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('Project deleted successfully');
        fetchProjects();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
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
        <AdminHeader setSidebarOpen={setSidebarOpen} title="Projects Management" />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">All Projects</h2>
              <p className="text-sm text-gray-600">Manage your project portfolio</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <button
                onClick={async () => {
                  if (confirm('Are you sure you want to delete ALL projects? This cannot be undone!')) {
                    try {
                      const response = await fetch('/api/projects/clear', { method: 'DELETE' });
                      if (response.ok) {
                        toast.success('All projects cleared successfully');
                        fetchProjects();
                      } else {
                        toast.error('Failed to clear projects');
                      }
                    } catch {
                      toast.error('Error clearing projects');
                    }
                  }
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg hover:bg-red-200 transition-colors"
              >
                Clear All
              </button>
              <Link href="/admin/projects/new" className="btn-primary">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Project
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="card-compact mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="w-full sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory(''); // Reset subcategory when category changes
                  }}
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-48">
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="input-field"
                >
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.value} value={subcategory.value}>
                      {subcategory.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Projects List */}
          {loadingProjects ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="card-compact text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery || selectedCategory ? 'No projects found' : 'No projects yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedCategory 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first project to get started'
                }
              </p>
              <Link href="/admin/projects/new" className="btn-primary">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Project
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <div key={project._id} className="card-compact">
                  {/* Project Image */}
                  {project.images && project.images.length > 0 ? (
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                              <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          `;
                        }}
                      />
                      {project.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          +{project.images.length - 1}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                      <PhotoIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {project.title}
                      {project.featured && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[project.status]
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Project Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary-50 text-primary-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Project Meta */}
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    Started: {formatDate(project.startDate)}
                    {project.endDate && (
                      <span className="ml-3">
                        • Completed: {formatDate(project.endDate)}
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/projects/${project._id}/edit`}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded hover:bg-primary-200"
                      >
                        <PencilIcon className="w-3 h-3 mr-1" />
                        Edit
                      </Link>
                      <Link
                        href={`/projects/${project._id}`}
                        target="_blank"
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <EyeIcon className="w-3 h-3 mr-1" />
                        View
                      </Link>
                    </div>
                    <button
                      onClick={() => setDeleteConfirm(project._id)}
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
                    Delete Project
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this project? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDeleteProject(deleteConfirm)}
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