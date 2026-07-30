'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  const { loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any): Promise<boolean> => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/admin/projects');
        return true;
      } else {
        const errorData = await response.json();
        console.error('Create project error:', errorData);
        return false;
      }
    } catch (error) {
      console.error('Create project error:', error);
      return false;
    }
  };

  const handleCancel = () => {
    router.push('/admin/projects');
  };

  if (loading) {
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
        <AdminHeader setSidebarOpen={setSidebarOpen} title="Add New Project" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <ProjectForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEditing={false}
            />
          </div>
        </main>
      </div>
    </div>
  );
}