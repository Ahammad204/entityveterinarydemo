import React from 'react';
import { DoctorPortalPage } from '../types';
import { DEMO_NOTIFICATIONS } from '../data/demoData';
import { Bell, Calendar, Clock, Syringe, FlaskConical, MessageSquare, CheckCircle2, AlertTriangle } from 'lucide-react';

interface NotificationsPageProps {
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'follow-up': return <Clock className="w-4 h-4" />;
      case 'vaccination': return <Syringe className="w-4 h-4" />;
      case 'lab-report': return <FlaskConical className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'follow-up': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'vaccination': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'lab-report': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'message': return 'bg-slate-50 text-slate-600 border-slate-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — Notifications are for demonstration.</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Notifications</h2>
            <p className="text-xs text-slate-500 mt-0.5">{DEMO_NOTIFICATIONS.filter(n => !n.read).length} unread</p>
          </div>
          <button className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Mark All Read
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {DEMO_NOTIFICATIONS.map(notif => (
            <div
              key={notif.id}
              onClick={() => notif.patientId && onNavigate('patient-detail', notif.patientId)}
              className={`px-6 py-4 flex items-start gap-4 transition-colors ${notif.patientId ? 'cursor-pointer hover:bg-slate-50' : ''} ${!notif.read ? 'bg-teal-50/30' : ''}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${getColor(notif.type)}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-bold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</p>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
