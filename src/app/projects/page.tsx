'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, ArrowRightIcon, ChevronDownIcon, PhotoIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface Project {
  _id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  technologies: string[];
  category: string;
  subcategory: string;
  status: 'completed' | 'ongoing' | 'planned';
  startDate: string;
  endDate?: string;
  featured: boolean;
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  externalUrl?: string;
}

interface ProjectsResponse {
  projects: Project[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'it-solutions', label: 'IT Solutions' },
  { value: 'research-development', label: 'Research & Development' },
];

const statusColors = {
  completed: 'bg-green-100 text-green-800 border border-green-200',
  ongoing: 'bg-teal-100 text-teal-800 border border-teal-200',
  planned: 'bg-purple-100 text-purple-800 border border-purple-200',
};

const categoryLabels = {
  'it-solutions': 'IT Solutions',
  'research-development': 'Research & Development',
};

const subcategoryLabels = {
  'web-development': 'Web Development',
  'mobile-app': 'Mobile Apps',
  'desktop-app': 'Desktop Apps',
  'ai-ml': 'AI & Machine Learning',
  'blockchain': 'Blockchain',
  'iot': 'Internet of Things',
  'cybersecurity': 'Cybersecurity',
  'cloud-solutions': 'Cloud Solutions',
  'system-integration': 'System Integration',
  'other': 'Other',
};

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });

  // Initialize category from URL params
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam && categories.find(cat => cat.value === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const fetchProjects = useCallback(async (category = '', page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      
      if (category) {
        params.append('category', category);
      }
      
      const response = await fetch(`/api/projects?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data: ProjectsResponse = await response.json();
      setProjects(data.projects || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // don&apos;t show error toast for empty projects - just log it
      setProjects([]);
      setPagination({
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchProjects(selectedCategory, 1);
  }, [selectedCategory, fetchProjects]);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, page: 1 }));
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getSelectedCategoryLabel = () => {
    const category = categories.find(cat => cat.value === selectedCategory);
    return category ? category.label : 'All Categories';
  };

  const handlePageChange = (newPage: number) => {
    fetchProjects(selectedCategory, newPage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-purple-800 overflow-hidden shadow-xl">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          {/* Dashboard UI Elements */}
          <div className="absolute top-8 right-16 w-16 h-16 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 animate-float">
            <div className="p-3">
              <div className="w-4 h-4 bg-teal-400 rounded mb-1"></div>
              <div className="w-8 h-1 bg-white/40 rounded"></div>
              <div className="w-6 h-1 bg-white/30 rounded mt-1"></div>
            </div>
          </div>

          <div className="absolute bottom-16 right-24 w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 animate-float delay-500">
            <div className="p-2">
              <div className="w-2 h-6 bg-gradient-to-t from-emerald-400 to-teal-400 rounded-sm mx-auto"></div>
            </div>
          </div>

          <div className="absolute top-20 left-16 w-14 h-14 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 animate-float delay-700">
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 border-2 border-purple-400 rounded-full relative">
                <div className="absolute inset-1 bg-purple-400/40 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-16 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-6">
                <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                IT Solutions Portfolio
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Our Digital
                <span className="block bg-gradient-to-r from-emerald-300 to-purple-300 bg-clip-text text-transparent">
                  Solutions & Projects
                </span>
              </h1>

              <p className="text-lg text-teal-100/90 leading-relaxed mb-8 max-w-xl">
                Showcasing our portfolio of 
                <span className="font-semibold text-emerald-300"> innovative technology solutions </span>
                across IT Services and Research & Development initiatives.
              </p>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <button className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 group">
                  <span>View Projects</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center text-emerald-300 text-sm">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse mr-2"></div>
                  18+ Projects Delivered
                </div>
              </div>
            </div>

            {/* Right - Visual Element */}
            <div className="lg:flex justify-end hidden">
              <div className="relative">
                {/* Dashboard Mockup */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-80 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-white/60 text-sm">Projects Dashboard</div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-3 rounded-lg">
                        <div className="text-emerald-300 text-xs font-medium">Active</div>
                        <div className="text-white text-lg font-bold">12</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg">
                        <div className="text-purple-300 text-xs font-medium">Completed</div>
                        <div className="text-white text-lg font-bold">24</div>
                      </div>
                    </div>

                    {/* Project List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white text-sm font-medium">E-Commerce Platform</div>
                          <div className="text-white/60 text-xs">Web Development</div>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white text-sm font-medium">AI Analytics Tool</div>
                          <div className="text-white/60 text-xs">Machine Learning</div>
                        </div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-purple-400/20 rounded-3xl blur-xl opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-emerald-50 to-transparent z-15"></div>
      </section>

      {/* Projects Section */}
      <section className="relative">
        <div className="container-custom py-4 md:py-6">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center justify-between px-6 py-3 min-w-52 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedCategory === '' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 shadow-md hover:shadow-lg hover:bg-emerald-50 border border-gray-200'
                  }`}
                >
                  <span>{getSelectedCategoryLabel()}</span>
                  <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-2">
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          onClick={() => handleCategoryChange(category.value)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition-colors ${
                            selectedCategory === category.value
                              ? 'bg-emerald-50 text-emerald-600 font-medium'
                              : 'text-gray-600'
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Individual category buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 shadow-md hover:shadow-lg hover:bg-emerald-50 border border-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-500"></div>
            </div>
          ) : !projects || projects.length === 0 ? (
            <div className="text-center py-8">
              <div className="relative p-6 rounded-2xl bg-white shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No projects found
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedCategory ? 
                    `No projects available in the ${getSelectedCategoryLabel()} category yet.` : 
                    'No projects available yet.'
                  }
                </p>
                <p className="text-xs text-gray-500">
                  Add projects through the Admin Panel to see them here.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Projects Grid */}
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <article key={project._id} className="group relative">
                    <div className="relative rounded-2xl bg-white border border-gray-100 group-hover:border-transparent shadow-sm group-hover:shadow-xl group-hover:shadow-emerald-900/5 group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      {/* Project Image */}
                      {project.images && project.images.length > 0 ? (
                        <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              if (target.parentElement) {
                                target.parentElement.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  </div>
                                `;
                              }
                            }}
                          />
                          {project.images.length > 1 && (
                            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                              +{project.images.length - 1}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <PhotoIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      
                      <div className="p-4">
                        {/* Project Header */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors mb-1">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                {categoryLabels[project.category as keyof typeof categoryLabels] || project.category}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                {subcategoryLabels[project.subcategory as keyof typeof subcategoryLabels] || project.subcategory}
                              </span>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${statusColors[project.status]}`}>
                            {project.status}
                          </span>
                        </div>
                        
                        {/* Project Description */}
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="mb-2">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-700"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Project Meta */}
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span className="truncate">Started: {formatDate(project.startDate)}</span>
                          {project.endDate && (
                            <span className="ml-2 truncate">
                              • Completed: {formatDate(project.endDate)}
                            </span>
                          )}
                        </div>
                        
                        {/* Project Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                          <Link
                            href={`/projects/${project._id}`}
                            className="inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            View Details
                            <ArrowRightIcon className="ml-1 h-3 w-3" />
                          </Link>
                          
                          {/* External Project Link */}
                          {project.externalUrl && (
                            <a
                              href={project.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
                            >
                              <ArrowTopRightOnSquareIcon className="h-3 w-3 mr-1" />
                              Live Site
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                            pagination.page === pageNum
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                              : 'text-gray-600 bg-white border border-gray-300 hover:bg-emerald-50 hover:border-emerald-300 shadow-sm'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-500"></div>
      </div>
    }>
      <ProjectsPageContent />
    </Suspense>
  );
}