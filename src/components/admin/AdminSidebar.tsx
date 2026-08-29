'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home as HomeIcon, Folder as FolderIcon, FlaskConical as BeakerIcon, LogOut as ArrowRightOnRectangleIcon, BarChart3 as ChartBarIcon, Plus as PlusIcon, Eye as EyeIcon, FileText as DocumentTextIcon, Users as UserGroupIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  {
    name: 'Dashboard',  
    href: '/admin/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Projects',
    href: '/admin/projects',
    icon: FolderIcon,
  },
  {
    name: 'Research',
    href: '/admin/research',
    icon: BeakerIcon,
  },
  {
    name: 'Admin Management',
    href: '/admin/management',
    icon: UserGroupIcon,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: ChartBarIcon,
  },
];

const quickActions = [
  {
    name: 'Add Project',
    href: '/admin/projects/new',
    icon: PlusIcon,
    description: 'Create new project'
  },
  {
    name: 'Add Research Content',
    href: '/admin/research/new',
    icon: DocumentTextIcon,
    description: 'Publish new research article'
  },
  {
    name: 'View Website',
    href: '/',
    icon: EyeIcon,
    description: 'Visit the public website'
  },
];

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-10 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-200 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200 bg-white">
            <Link href="/admin/dashboard">
              <span className="text-xl font-bold text-primary-600 cursor-pointer">
                SquareServer<span className="text-gray-900">Tech</span>
                <span className="block text-xs text-gray-500 font-normal">Admin Panel</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {/* Main Navigation */}
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`flex-shrink-0 w-5 h-5 mr-4 ${
                        isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="px-2 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="group flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                    onClick={() => setSidebarOpen(false)}
                    target={action.href === '/' ? '_blank' : undefined}
                  >
                    <action.icon className="flex-shrink-0 w-5 h-5 mr-4 text-gray-400 group-hover:text-green-600" />
                    <div className="flex-1">
                      <div className="font-medium">{action.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-green-600">
                        {action.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          
          {/* User info and logout */}
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center mb-4 px-2">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-600 truncate">{user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-4 text-gray-400" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}