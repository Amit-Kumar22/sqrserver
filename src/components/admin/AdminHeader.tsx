'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu as Bars3Icon, ChevronDown, Globe as GlobeIcon, LogOut as LogOutIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  title: string;
}

export default function AdminHeader({ setSidebarOpen, title }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800/80">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center min-w-0">
          <button
            type="button"
            className="lg:hidden p-2 -ml-2 mr-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/70"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Admin
            </p>
            <h1 className="text-lg font-semibold text-white truncate">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm text-slate-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>

          <div className="hidden md:block w-px h-6 bg-slate-800" />

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800/70 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-xs">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-200 max-w-[140px] truncate">
                {user?.name || 'Admin'}
              </span>
              <ChevronDown className={`hidden sm:block h-4 w-4 text-slate-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    href="/"
                    target="_blank"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <GlobeIcon className="h-4 w-4 text-gray-400" />
                    View Website
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
