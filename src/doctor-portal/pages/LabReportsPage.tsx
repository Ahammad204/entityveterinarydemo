import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DoctorPortalPage } from '../types';
import { DEMO_LAB_REPORTS } from '../data/demoData';
import { FlaskConical, Search, AlertTriangle, Upload, Eye } from 'lucide-react';

interface LabReportsPageProps {
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

export const LabReportsPage: React.FC<LabReportsPageProps> = ({ onNavigate }) => {
  const { doctor } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'reviewed'>('all');

  const myReports = DEMO_LAB_REPORTS.filter(r => r.doctorId === doctor?.id);

  const filtered = myReports.filter(r => {
    const matchSearch = search === '' ||
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.testName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — All lab reports are fictional.</span>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient or test name..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-1.5">
            {(['all', 'pending', 'completed', 'reviewed'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                  statusFilter === s ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Laboratory Reports</h2>
            <p className="text-xs text-slate-500 mt-0.5">{filtered.length} reports</p>
          </div>
          <button className="px-4 py-2 text-xs font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" /> Upload Report
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map(report => (
            <div key={report.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900">{report.testName}</p>
                  <p className="text-xs text-slate-500">Patient: {report.patientName} • {report.date}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                  report.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                  report.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{report.status}</span>
                <button
                  onClick={() => onNavigate('patient-detail', report.patientId)}
                  className="px-3 py-1.5 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 shrink-0"
                >
                  <Eye className="w-3 h-3" /> View
                </button>
              </div>
              {report.results && (
                <pre className="mt-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg whitespace-pre-wrap border border-slate-100 max-h-32 overflow-y-auto">{report.results}</pre>
              )}
              {report.interpretation && (
                <p className="mt-2 text-xs text-teal-700 font-medium italic">Interpretation: {report.interpretation}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
