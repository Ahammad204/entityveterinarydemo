import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DoctorPortalPage } from '../types';

interface DoctorPortalLayoutProps {
  children: React.ReactNode;
  currentPage: DoctorPortalPage;
  onNavigate: (page: DoctorPortalPage) => void;
  notificationCount: number;
}

export const DoctorPortalLayout: React.FC<DoctorPortalLayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  notificationCount
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} notificationCount={notificationCount} />
      <div className="lg:ml-64">
        <div className="lg:pt-0 pt-14">
          <Header currentPage={currentPage} onNavigate={onNavigate} notificationCount={notificationCount} />
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
