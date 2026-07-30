'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  title: string;
}

export default function AdminHeader({ setSidebarOpen, title }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <h1 className="ml-4 lg:ml-0 text-xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </header>
  );
}