'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home as HomeIcon, Folder as FolderIcon, FlaskConical as BeakerIcon, LogOut as ArrowRightOnRectangleIcon, BarChart3 as ChartBarIcon, Plus as PlusIcon, Globe as GlobeIcon, FileText as DocumentTextIcon, Users as UserGroupIcon, MessageSquare as MessageSquareIcon, Inbox as InboxIcon } from 'lucide-react';
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
    name: 'Chatbot',
    href: '/admin/chatbot',
    icon: MessageSquareIcon,
  },
  {
    name: 'Chat Leads',
    href: '/admin/chatbot/leads',
    icon: InboxIcon,
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
  },
  {
    name: 'Add Research',
    href: '/admin/research/new',
    icon: DocumentTextIcon,
  },
  {
    name: 'View Website',
    href: '/',
    icon: GlobeIcon,
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
        <div className="fixed inset-0 z-20 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-slate-800/80 flex-shrink-0">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-900/40">
                SS
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-semibold text-white tracking-wide">
                  SquareServer
                </span>
                <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <h3 className="px-3 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Overview
              </h3>
              <div className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
                        isActive
                          ? 'bg-teal-500/10 text-teal-400'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-teal-400" />
                      )}
                      <item.icon
                        className={`flex-shrink-0 w-[18px] h-[18px] ${
                          isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions Section */}
            <div>
              <h3 className="px-3 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="space-y-1">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-800/70 hover:text-white transition-colors duration-150"
                    onClick={() => setSidebarOpen(false)}
                    target={action.href === '/' ? '_blank' : undefined}
                  >
                    <action.icon className="flex-shrink-0 w-[18px] h-[18px] text-slate-500 group-hover:text-slate-300" />
                    {action.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* User info and logout */}
          <div className="border-t border-slate-800/80 p-3 flex-shrink-0">
            <div className="flex items-center gap-3 px-2 py-2 mb-1 rounded-lg">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors duration-150"
            >
              <ArrowRightOnRectangleIcon className="w-[18px] h-[18px]" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
