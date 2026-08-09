import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DoctorPortalPage, AppointmentStatus } from '../types';
import { DEMO_APPOINTMENTS } from '../data/demoData';
import { Calendar, Filter, Eye, Play, Clock, AlertTriangle } from 'lucide-react';

interface AppointmentsPageProps {
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

type TabFilter = 'today' | 'upcoming' | 'completed' | 'cancelled';

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ onNavigate }) => {
  const { doctor } = useAuth();
  const [activeTab, setActiveTab] = useState<TabFilter>('today');
  const today = '2026-08-09';

  const myAppointments = DEMO_APPOINTMENTS.filter(a => a.doctorId === doctor?.id);

  const filtered = myAppointments.filter(a => {
    switch (activeTab) {
      case 'today': return a.date === today;
      case 'upcoming': return a.date > today;
      case 'completed': return a.status === 'completed';
      case 'cancelled': return a.status === 'cancelled';
      default: return true;
    }
  });

  const tabs: { id: TabFilter; label: string; count: number }[] = [
    { id: 'today', label: "Today", count: myAppointments.filter(a => a.date === today).length },
    { id: 'upcoming', label: 'Upcoming', count: myAppointments.filter(a => a.date > today).length },
    { id: 'completed', label: 'Completed', count: myAppointments.filter(a => a.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: myAppointments.filter(a => a.status === 'cancelled').length },
  ];

  const statusColor = (s: AppointmentStatus) => {
    switch (s) {
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'waiting': return 'bg-amber-100 text-amber-700';
      case 'in-progress': return 'bg-teal-100 text-teal-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — All appointments are fictional.</span>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="border-b border-slate-100 px-4 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-100 rounded-full">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No appointments in this category.</p>
            </div>
          ) : (
            filtered.map(apt => (
              <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                <div className="text-center shrink-0 w-16">
                  <p className="text-sm font-bold text-slate-900">{apt.time}</p>
                  <p className="text-[10px] text-slate-500">{apt.date}</p>
                </div>
                <img src={apt.patientPhoto} alt={apt.patientName} className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900">{apt.patientName}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">{apt.species}</span>
                  </div>
                  <p className="text-xs text-slate-500">Owner: {apt.ownerName}</p>
                  <p className="text-xs text-slate-500">{apt.reason} • {apt.service}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${statusColor(apt.status)}`}>
                  {apt.status}
                </span>
                <div className="shrink-0 flex items-center gap-1.5">
                  {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                    <button onClick={() => onNavigate('consultation', apt.patientId)} className="px-3 py-1.5 text-[11px] font-bold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1">
                      <Play className="w-3 h-3" /> Start
                    </button>
                  )}
                  <button onClick={() => onNavigate('patient-detail', apt.patientId)} className="px-3 py-1.5 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1">
                    <Eye className="w-3 h-3" /> View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
