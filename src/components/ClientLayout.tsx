'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChunkErrorHandler from '@/components/ChunkErrorHandler';
import AIChatbot from '@/components/AIChatbot';
import { Toaster } from 'react-hot-toast';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Admin routes render their own chrome (AdminSidebar/AdminHeader) and Toaster
    return (
      <>
        <ChunkErrorHandler />
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <ChunkErrorHandler />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AIChatbot />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151',
            fontSize: '14px',
          },
        }}
      />
    </div>
  );
}