'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CalendarIcon, UserIcon, TagIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';

interface ResearchContent {
  _id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  author: string;
  publishedDate: string;
}

interface ResearchResponse {
  research: ResearchContent[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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

const researchAreas = [
  {
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Advancing AI capabilities through deep learning, neural networks, and intelligent automation systems.',
    highlights: ['Computer Vision', 'Natural Language Processing', 'Predictive Analytics', 'Neural Networks'],
  },
  {
    title: 'Blockchain & Distributed Systems',
    description: 'Exploring decentralized technologies, smart contracts, and distributed ledger applications.',
    highlights: ['Smart Contracts', 'DeFi Protocols', 'Consensus Algorithms', 'Cryptocurrency'],
  },
  {
    title: 'Cybersecurity & Privacy',
    description: 'Developing advanced security solutions and privacy-preserving technologies.',
    highlights: ['Zero Trust Architecture', 'Quantum Cryptography', 'Threat Detection', 'Privacy Engineering'],
  },
  {
    title: 'Internet of Things & Edge Computing',
    description: 'Creating intelligent connected systems and edge processing solutions.',
    highlights: ['Sensor Networks', 'Edge AI', 'Industrial IoT', 'Smart Cities'],
  },
];

export default function ResearchPage() {
  const [research, setResearch] = useState<ResearchContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 0,
  });

  const fetchResearch = useCallback(async (category = '', page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      
      if (category) {
        params.append('category', category);
      }
      
      const response = await fetch(`/api/research?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch research');
      }
      
      const data: ResearchResponse = await response.json();
      setResearch(data.research || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching research:', error);
      toast.error('Failed to load research content');
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchResearch(selectedCategory, 1);
  }, [selectedCategory, fetchResearch]);

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
    fetchResearch(selectedCategory, newPage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-100 min-h-screen">
      <PageHeader
        eyebrow="Innovation & Research"
        title={<>Research & <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Development</span></>}
        description="Pioneering technological innovations through cutting-edge research and development in emerging technologies and next-generation solutions."
        stats={['4 Active Research Areas', 'AI & ML · Blockchain · IoT']}
      />

      {/* Research Areas */}
      <section className="relative">
        <div className="container-custom py-4 md:py-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Our Research
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Focus Areas</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Exploring the frontiers of technology to create tomorrow&apos;s solutions.
            </p>
          </div>
          
          <div className="grid gap-5 lg:grid-cols-2">
            {researchAreas.map((area, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-white border border-gray-100 hover:border-transparent p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:text-white transition-all duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{area.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{area.description}</p>
                <div className="flex flex-wrap gap-1.5">
                    {area.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-emerald-200 group-hover:text-emerald-700 group-hover:bg-emerald-50/60 transition-colors duration-300"
                      >
                        {highlight}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Published Research */}
      <section className="bg-gradient-to-r from-emerald-100/50 to-teal-100/50 relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.3) 2px, transparent 2px)'
          }}></div>
        </div>
        <div className="container-custom py-4 md:py-6 relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Published
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Research</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Latest findings and insights from our research initiatives.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mb-8">
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
            
            {/* Individual category buttons (excluding All Categories) */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {categories.slice(1).map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
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
          ) : !research || research.length === 0 ? (
            <div className="text-center py-12">
              <div className="relative p-6 rounded-lg bg-white shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">No research published yet</h3>
                <p className="text-sm text-gray-600">Check back later for our latest research findings and innovations.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Research Articles Grid */}
              <div className="grid gap-6 lg:grid-cols-2">
                {research.map((article) => (
                  <article key={article._id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                    <div className="relative p-4 md:p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-emerald-400">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          {article.title}
                        </h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 ml-3 flex-shrink-0">
                          {article.category.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                      
                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex items-center mb-3">
                          <TagIcon className="h-4 w-4 text-emerald-500 mr-2" />
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Article Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-sm text-gray-500">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-emerald-500" />
                          <span className="text-gray-700">{article.author}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-emerald-500" />
                          <span>{formatDate(article.publishedDate)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-6 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                            pagination.page === pageNum
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                              : 'text-gray-600 bg-white border border-gray-300 hover:bg-emerald-50 hover:border-emerald-300 shadow-md'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="px-6 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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