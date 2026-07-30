'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';
import {
  FolderIcon,
  BeakerIcon,
  EyeIcon,
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  totalResearch: number;
  publishedResearch: number;
}

interface Project {
  id: string;
  title: string;
  status: string;
  category?: string;
  createdAt?: string;
  // Add other project properties as needed
}

interface Research {
  id: string;
  title: string;
  // Add other research properties as needed
}

interface RecentProject {
  _id: string;
  title: string;
  status: string;
  startDate: string;
}

export default function AdminDashboard() {
  const { user, loading, initialized } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    totalResearch: 0,
    publishedResearch: 0,
  });
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  console.log('Dashboard: user:', user, 'loading:', loading);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch projects for stats
        const projectsResponse = await fetch('/api/projects?limit=100');
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          const projects = projectsData.projects;
          
          setStats(prev => ({
            ...prev,
            totalProjects: projects.length,
            completedProjects: projects.filter((p: Project) => p.status === 'completed').length,
            ongoingProjects: projects.filter((p: Project) => p.status === 'ongoing').length,
          }));
          
          // Set recent projects (latest 5)
          setRecentProjects(projects.slice(0, 5));
        }
        
        // Fetch research for stats
        const researchResponse = await fetch('/api/research?all=true&limit=100');
        if (researchResponse.ok) {
          const researchData = await researchResponse.json();
          const research = researchData.research;
          
          setStats(prev => ({
            ...prev,
            totalResearch: research.length,
            publishedResearch: research.filter((r: Research & {published?: boolean}) => r.published).length,
          }));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Only redirect if auth check is complete and definitely no user
  useEffect(() => {
    console.log('Dashboard: Checking auth - loading:', loading, 'initialized:', initialized, 'user:', !!user);
    if (initialized && !loading && !user) {
      console.log('Dashboard: No user authenticated, redirecting to login');
      router.replace('/admin/login');
    }
  }, [loading, initialized, user, router]);

  // Show loading until auth is initialized and determined
  if (!initialized || loading) {
    console.log('Dashboard: Showing loading state - initialized:', initialized, 'loading:', loading);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show loading if no user but We&apos;re still checking auth
  if (!user) {
    console.log('Dashboard: No user found, should redirect to login');
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderIcon,
      color: 'bg-teal-500',
      link: '/admin/projects',
    },
    {
      title: 'Completed Projects',
      value: stats.completedProjects,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      link: '/admin/projects',
    },
    {
      title: 'Ongoing Projects',
      value: stats.ongoingProjects,
      icon: ClockIcon,
      color: 'bg-yellow-500',
      link: '/admin/projects',
    },
    {
      title: 'Research Articles',
      value: stats.totalResearch,
      icon: BeakerIcon,
      color: 'bg-purple-500',
      link: '/admin/research',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Project',
      description: 'Create a new project entry',
      href: '/admin/projects/new',
      icon: PlusIcon,
      color: 'bg-primary-600',
    },
    {
      title: 'Add Research Content',
      description: 'Publish new research article',
      href: '/admin/research/new',
      icon: PlusIcon,
      color: 'bg-green-600',
    },
    {
      title: 'View Website',
      description: 'Visit the public website',
      href: '/',
      icon: EyeIcon,
      color: 'bg-gray-600',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <AdminHeader setSidebarOpen={setSidebarOpen} title="Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h2>
            <p className="text-gray-600">Here&apos;s What&apos;s happening with your projects and research.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {statCards.map((stat, index) => (
              <Link key={index} href={stat.link}>
                <div className="card-compact hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {loadingData ? '...' : stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Quick Actions */}
            <div className="card-compact">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`flex-shrink-0 rounded-md p-2 ${action.color}`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div className="card-compact">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
                <Link
                  href="/admin/projects"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  View all
                </Link>
              </div>
              
              {loadingData ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
                    </div>
                  ))}
                </div>
              ) : recentProjects.length === 0 ? (
                <p className="text-sm text-gray-500">No projects yet. Create your first project!</p>
              ) : (
                <div className="space-y-3">
                  {recentProjects.map((project) => (
                    <div key={project._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{project.title}</p>
                        <p className="text-xs text-gray-500 capitalize">{project.status}</p>
                      </div>
                      <Link
                        href={`/admin/projects/${project._id}`}
                        className="text-sm text-primary-600 hover:text-primary-500"
                      >
                        Edit
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
