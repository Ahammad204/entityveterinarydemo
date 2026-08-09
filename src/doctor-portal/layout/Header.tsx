import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DoctorPortalPage } from '../types';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  currentPage: DoctorPortalPage;
  onNavigate: (page: DoctorPortalPage) => void;
  notificationCount: number;
}

const PAGE_TITLES: Record<DoctorPortalPage, string> = {
  dashboard: 'Dashboard',
  patients: 'Patients',
  'patient-detail': 'Patient Record',
  consultation: 'Consultation',
  prescription: 'Prescription',
  appointments: 'Appointments',
  vaccinations: 'Vaccinations',
  'lab-reports': 'Lab Reports',
  schedule: 'My Schedule',
  profile: 'My Profile',
  notifications: 'Notifications',
};

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, notificationCount }) => {
  const { doctor } = useAuth();

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 hidden lg:block">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900">
            {getGreeting()}, {doctor?.name?.split(' ').slice(0, 2).join(' ')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {PAGE_TITLES[currentPage]} — Entity Veterinary Hospital
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patients, records..."
              className="pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white w-64 transition-all"
            />
          </div>

          {/* Notifications */}
          <button
            onClick={() => onNavigate('notifications')}
            className="relative p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200"
          >
            <Bell className="w-4.5 h-4.5 text-slate-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Avatar */}
          <img src={doctor?.avatar} alt={doctor?.name} className="w-9 h-9 rounded-full object-cover border-2 border-slate-200" />
        </div>
      </div>
    </header>
  );
};
