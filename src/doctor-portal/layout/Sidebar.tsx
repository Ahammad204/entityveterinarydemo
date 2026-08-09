import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DoctorPortalPage } from '../types';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Syringe,
  FlaskConical,
  Clock,
  User,
  Bell,
  LogOut,
  Menu,
  X,
  Stethoscope,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPage: DoctorPortalPage;
  onNavigate: (page: DoctorPortalPage) => void;
  notificationCount: number;
}

const NAV_ITEMS: { id: DoctorPortalPage; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
  { id: 'patients', label: 'Patients', icon: <Users className="w-5 h-5" /> },
  { id: 'vaccinations', label: 'Vaccinations', icon: <Syringe className="w-5 h-5" /> },
  { id: 'lab-reports', label: 'Lab Reports', icon: <FlaskConical className="w-5 h-5" /> },
  { id: 'schedule', label: 'My Schedule', icon: <Clock className="w-5 h-5" /> },
  { id: 'profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, notificationCount }) => {
  const { doctor, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (page: DoctorPortalPage) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">ENTITY VETERINARY</h1>
            <p className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">Doctor Portal</p>
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img src={doctor?.avatar} alt={doctor?.name} className="w-9 h-9 rounded-full object-cover border-2 border-teal-100" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{doctor?.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{doctor?.designation}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <span className={isActive ? 'text-teal-600' : 'text-slate-400'}>{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === 'notifications' && notificationCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                  {notificationCount}
                </span>
              )}
              {isActive && <ChevronRight className="w-4 h-4 text-teal-400" />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-200/80">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-slate-900">Doctor Portal</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-slate-100">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-40">
        {sidebarContent}
      </aside>
    </>
  );
};
