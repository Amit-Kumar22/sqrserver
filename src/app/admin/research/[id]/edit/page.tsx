'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ResearchForm from '@/components/admin/ResearchForm';
import { toast } from 'react-hot-toast';

export default function EditResearchPage() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [research, setResearch] = useState(null);
  const [loadingResearch, setLoadingResearch] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchResearch = async () => {
      if (!params.id || !user) return;
      
      try {
        const response = await fetch(`/api/research/${params.id}?admin=true`);
        
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        
        if (response.ok) {
          const data = await response.json();
          setResearch(data.research);
        } else {
          toast.error('Failed to load research content');
          router.push('/admin/research');
        }
      } catch (error) {
        console.error('Error fetching research:', error);
        toast.error('Failed to load research content');
        router.push('/admin/research');
      } finally {
        setLoadingResearch(false);
      }
    };

    fetchResearch();
  }, [params.id, user, router]);

  const handleSubmit = async (data: any): Promise<boolean> => {
    try {
      const response = await fetch(`/api/research/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/admin/research');
        return true;
      } else {
        const errorData = await response.json();
        console.error('Update research error:', errorData);
        return false;
      }
    } catch (error) {
      console.error('Update research error:', error);
      return false;
    }
  };

  const handleCancel = () => {
    router.push('/admin/research');
  };

  if (loading || loadingResearch) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (notFound || !research) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <AdminHeader setSidebarOpen={setSidebarOpen} title="Research Not Found" />
          
          <main className="flex-1 overflow-y-auto p-6">
            <div className="card-compact text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Research Content Not Found</h3>
              <p className="text-gray-600 mb-6">The research content you&apos;re trying to edit doesn&apos;t exist or has been removed.</p>
              <button
                onClick={() => router.push('/admin/research')}
                className="btn-primary"
              >
                Back to Research
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
        <AdminHeader setSidebarOpen={setSidebarOpen} title="Edit Research" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <ResearchForm
              initialData={research}
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