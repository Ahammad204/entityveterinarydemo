import React from 'react';
import { DoctorPortalPage } from '../types';
import { DEMO_SCHEDULE } from '../data/demoData';
import { Clock, MapPin, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface SchedulePageProps {
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — Schedule is for demonstration.</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-extrabold text-slate-900">Weekly Schedule</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your working days and hours</p>
        </div>
        <div className="divide-y divide-slate-100">
          {DEMO_SCHEDULE.map(day => (
            <div key={day.day} className={`px-6 py-4 flex items-center gap-4 ${!day.isAvailable ? 'bg-slate-50' : ''}`}>
              <div className="w-24 shrink-0">
                <p className="text-sm font-bold text-slate-900">{day.day}</p>
              </div>
              <div className="flex-1">
                {day.isAvailable ? (
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((slot, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-xs font-semibold text-teal-800">{slot.startTime} — {slot.endTime}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">Off Day</span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600">{day.branch}</span>
              </div>
              <div className="shrink-0">
                {day.isAvailable ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-slate-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">Schedule Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Default Appointment Duration</label>
            <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>15 minutes</option>
              <option>20 minutes</option>
              <option selected>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Branch</label>
            <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option selected>Main Hospital — Chattogram</option>
              <option>North Clinic — Chattogram</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Max Patients / Day</label>
            <input type="number" defaultValue={20} className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>
        <button className="mt-4 px-5 py-2.5 text-sm font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
          Save Schedule Settings
        </button>
      </div>
    </div>
  );
};
