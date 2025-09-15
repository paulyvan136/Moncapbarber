'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/loading';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  showSearch?: boolean;
}

export const DashboardLayout = ({ children, title, showSearch = true }: DashboardLayoutProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size="lg" />
      </div>
    );
  }

  if (!user) {
    return null; // This will be handled by the route protection
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="hidden md:flex md:w-64 md:flex-col">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <Header title={title} showSearch={showSearch} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};