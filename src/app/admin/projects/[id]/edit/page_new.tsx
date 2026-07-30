'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ProjectForm from '@/components/admin/ProjectForm';
import { toast } from 'react-hot-toast';

export default function EditProjectPage() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      if (!params.id || !user) return;
      
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        
        if (response.ok) {
          const data = await response.json();
          setProject(data.project);
        } else {
          toast.error('Failed to load project');
          router.push('/admin/projects');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project');
        router.push('/admin/projects');
      } finally {
        setLoadingProject(false);
      }
    };

    fetchProject();
  }, [params.id, user, router]);

  const handleSubmit = async (data: any): Promise<boolean> => {
    try {
      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
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
        console.error('Update project error:', errorData);
        return false;
      }
    } catch (error) {
      console.error('Update project error:', error);
      return false;
    }
  };

  const handleCancel = () => {
    router.push('/admin/projects');
  };

  if (loading || loadingProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <AdminHeader setSidebarOpen={setSidebarOpen} title="Project Not Found" />
          
          <main className="flex-1 overflow-y-auto p-6">
            <div className="card-compact text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Not Found</h3>
              <p className="text-gray-600 mb-6">The project you are trying to edit does not exist or has been removed.</p>
              <button
                onClick={() => router.push('/admin/projects')}
                className="btn-primary"
              >
                Back to Projects
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <AdminHeader setSidebarOpen={setSidebarOpen} title="Edit Project" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <ProjectForm
              initialData={project}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEditing={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}