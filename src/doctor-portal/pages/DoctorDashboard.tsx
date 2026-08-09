import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DoctorPortalPage } from '../types';
import { DEMO_APPOINTMENTS, DEMO_PATIENTS, DEMO_VACCINATIONS } from '../data/demoData';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  AlertTriangle,
  ArrowRight,
  Play,
  Eye,
  Stethoscope,
  Activity,
  FileText
} from 'lucide-react';

interface DoctorDashboardProps {
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onNavigate }) => {
  const { doctor } = useAuth();

  const today = '2026-08-09';
  const todayAppointments = DEMO_APPOINTMENTS.filter(a => a.date === today && a.doctorId === doctor?.id);
  const waitingPatients = todayAppointments.filter(a => a.status === 'waiting');
  const completedToday = 2;
  const followUpsDue = DEMO_VACCINATIONS.filter(v => {
    const due = new Date(v.nextDueDate);
    const now = new Date(today);
    const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 30 && diff > 0;
  }).length;

  const stats = [
    { label: "Today's Appointments", value: todayAppointments.length, icon: <Calendar className="w-5 h-5" />, color: 'bg-teal-50 text-teal-600 border-teal-200' },
    { label: 'Waiting Patients', value: waitingPatients.length, icon: <Clock className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { label: 'Completed Today', value: completedToday, icon: <CheckCircle2 className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { label: 'Follow-ups Due', value: followUpsDue, icon: <AlertTriangle className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600 border-orange-200' },
  ];

  const recentPatients = DEMO_PATIENTS.filter(p => p.assignedDoctor === doctor?.id).slice(0, 4);

  const upcomingFollowUps = [
    { patient: 'Bruno', reason: 'Hip joint recheck', due: '15 Aug 2026', daysLeft: 6 },
    { patient: 'Bella', reason: 'Asthma recheck', due: '10 Aug 2026', daysLeft: 1 },
    { patient: 'Tommy', reason: 'Ear infection follow-up', due: '20 Aug 2026', daysLeft: 11 },
  ];

  return (
    <div className="space-y-6">
      {/* Demo Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — All patient records and appointments are fictional for demonstration purposes.</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-xl border p-5 ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{stat.label}</p>
                <p className="text-3xl font-extrabold mt-1">{stat.value}</p>
              </div>
              <div className="opacity-60">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments Timeline */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Today's Appointments</h2>
              <p className="text-xs text-slate-500 mt-0.5">{todayAppointments.length} appointments scheduled</p>
            </div>
            <button onClick={() => onNavigate('appointments')} className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {todayAppointments.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No appointments today</p>
            ) : (
              todayAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                  {/* Time */}
                  <div className="text-center shrink-0 w-16">
                    <p className="text-sm font-bold text-slate-900">{apt.time}</p>
                  </div>

                  {/* Patient Photo */}
                  <img src={apt.patientPhoto} alt={apt.patientName} className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shrink-0" />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{apt.patientName}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">{apt.species}</span>
                    </div>
                    <p className="text-xs text-slate-500">Owner: {apt.ownerName}</p>
                    <p className="text-xs text-slate-500">{apt.reason}</p>
                  </div>

                  {/* Status */}
                  <div className="shrink-0">
                    {apt.status === 'waiting' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                        Waiting
                      </span>
                    )}
                    {apt.status === 'confirmed' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        Confirmed
                      </span>
                    )}
                    {apt.status === 'in-progress' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 border border-teal-200">
                        In Progress
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    <button
                      onClick={() => onNavigate('consultation', apt.patientId)}
                      className="px-3 py-1.5 text-[11px] font-bold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" /> Start
                    </button>
                    <button
                      onClick={() => onNavigate('patient-detail', apt.patientId)}
                      className="px-3 py-1.5 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Follow-up Reminders */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-extrabold text-slate-900">Follow-up Reminders</h2>
            </div>
            <div className="p-4 space-y-3">
              {upcomingFollowUps.map((fu, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${fu.daysLeft <= 2 ? 'bg-red-500 animate-pulse' : fu.daysLeft <= 7 ? 'bg-amber-500' : 'bg-teal-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">{fu.patient} — {fu.reason}</p>
                    <p className="text-[10px] text-slate-500">Due: {fu.due} ({fu.daysLeft} days)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900">Recent Patients</h2>
              <button onClick={() => onNavigate('patients')} className="text-xs font-semibold text-teal-600 hover:text-teal-700">
                View All
              </button>
            </div>
            <div className="p-4 space-y-2">
              {recentPatients.map((pat) => (
                <button
                  key={pat.id}
                  onClick={() => onNavigate('patient-detail', pat.id)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                >
                  <img src={pat.photo} alt={pat.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900">{pat.name}</p>
                    <p className="text-[10px] text-slate-500">{pat.breed} • {pat.species}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    pat.status === 'critical' ? 'bg-red-500' :
                    pat.status === 'follow-up' ? 'bg-amber-500' :
                    pat.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-sm font-extrabold text-slate-900 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => onNavigate('patients')} className="flex items-center gap-2 p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold hover:bg-teal-100 transition-colors">
                <Users className="w-4 h-4" /> Patients
              </button>
              <button onClick={() => onNavigate('appointments')} className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors">
                <Calendar className="w-4 h-4" /> Appointments
              </button>
              <button onClick={() => onNavigate('vaccinations')} className="flex items-center gap-2 p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition-colors">
                <Activity className="w-4 h-4" /> Vaccinations
              </button>
              <button onClick={() => onNavigate('lab-reports')} className="flex items-center gap-2 p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold hover:bg-orange-100 transition-colors">
                <FileText className="w-4 h-4" /> Lab Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
