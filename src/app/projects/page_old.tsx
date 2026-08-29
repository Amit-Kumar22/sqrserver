'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, ArrowRight as ArrowRightIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'ongoing' | 'planned';
  startDate: string;
  endDate?: string;
  featured: boolean;
  externalUrl?: string; // Add external URL field
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
  { value: 'research-development', label: 'Research and Development' },
];

const statusColors = {
  completed: 'bg-green-100 text-green-800 border border-green-200',
  ongoing: 'bg-teal-100 text-teal-800 border border-teal-200',
  planned: 'bg-purple-100 text-purple-800 border border-purple-200',
};

export default function ProjectsPage() {
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

  const fetchProjects = useCallback(async (category = '', page = 1) => {
    try {
      setLoading(true);
      
      // Handle IT Solutions category with mock data
      if (category === 'it-solutions') {
        const mockProjects: Project[] = [
          {
            _id: 'hiprotech-website',
            title: 'Hiprotech Website',
            description: 'A comprehensive digital platform for Hiprotech showcasing innovative technology solutions and services. Built with modern web technologies to deliver exceptional user experience.',
            technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
            category: 'it-solutions',
            status: 'completed',
            startDate: '2023-06-01',
            endDate: '2023-08-15',
            featured: true,
            externalUrl: 'https://hiprotech.org/'
          },
          {
            _id: 'hiprotech-ecommerce',
            title: 'Hiprotech E-commerce Website',
            description: 'A robust e-commerce platform for Hiprotech enabling seamless online shopping experience with advanced product management and secure payment integration.',
            technologies: ['Next.js', 'React', 'Node.js', 'MongoDB'],
            category: 'it-solutions',
            status: 'completed',
            startDate: '2023-09-01',
            endDate: '2023-11-30',
            featured: true,
            externalUrl: 'https://shop.hiprotech.org/'
          },
          {
            _id: 'Yen-Universal',
            title: 'Yen-Universal Website',
            description: '“Connecting innovation with purpose.” A dynamic website for Yen-Universal highlighting their mission to drive technological advancements for social good.',
            technologies: ['Next.js', 'React', 'Node.js', 'MongoDB'],
            category: 'it-solutions',
            status: 'completed',
            startDate: '2023-09-01',
            endDate: '2023-11-30',
            featured: true,
            externalUrl: 'https://yenuniversal.org/'
          }
        ];
        
        setProjects(mockProjects);
        setPagination({
          total: mockProjects.length,
          page: 1,
          limit: 12,
          totalPages: 1
        });
        setLoading(false);
        return;
      }
      
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
      setProjects(data.projects);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
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
    setIsDropdownOpen(false); // Close dropdown after selection
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
    });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-100 min-h-screen relative">
      {/* Header Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Our Work
              </span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our portfolio of completed and ongoing technology solutions 
              across various domains and industries.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mt-12">
            <div className="flex justify-center mb-6">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center justify-between px-6 py-3 min-w-52 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    selectedCategory === '' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-emerald-200 hover:border-emerald-300 shadow-md hover:shadow-lg'
                  }`}
                >
                  <span>{getSelectedCategoryLabel()}</span>
                  <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 z-10">
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
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-600 border-t-transparent"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No projects found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <div key={project._id} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[project.status]
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Project Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Project Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {formatDate(project.startDate)}
                    </div>
                    {project.externalUrl ? (
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 group-hover:translate-x-1 transition-all duration-300"
                      >
                        Visit Site
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={`/projects/${project._id}`}
                        className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 group-hover:translate-x-1 transition-all duration-300"
                      >
                        View Details
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-sm text-gray-600">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                  >
                    Previous
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                          pagination.page === pageNum
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}