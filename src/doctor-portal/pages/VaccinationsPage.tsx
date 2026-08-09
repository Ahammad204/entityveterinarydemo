import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DoctorPortalPage } from '../types';
import { DEMO_VACCINATIONS, DEMO_PATIENTS } from '../data/demoData';
import { Syringe, Search, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

interface VaccinationsPageProps {
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

export const VaccinationsPage: React.FC<VaccinationsPageProps> = ({ onNavigate }) => {
  const { doctor } = useAuth();
  const [search, setSearch] = useState('');
  const [showOverdue, setShowOverdue] = useState(false);

  const myVaccinations = DEMO_VACCINATIONS.filter(v => {
    const patient = DEMO_PATIENTS.find(p => p.id === v.patientId);
    return patient?.assignedDoctor === doctor?.id;
  });

  const filtered = myVaccinations.filter(v => {
    const patient = DEMO_PATIENTS.find(p => p.id === v.patientId);
    const matchSearch = search === '' || v.vaccineName.toLowerCase().includes(search.toLowerCase()) || patient?.name.toLowerCase().includes(search.toLowerCase());
    const matchOverdue = !showOverdue || new Date(v.nextDueDate) < new Date('2026-08-09');
    return matchSearch && matchOverdue;
  });

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — All vaccination records are fictional.</span>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vaccine name or patient..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={() => setShowOverdue(!showOverdue)}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              showOverdue ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {showOverdue ? 'Show All' : 'Show Overdue Only'}
          </button>
        </div>
      </div>

      {/* Vaccination List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-extrabold text-slate-900">Vaccination Records</h2>
          <p className="text-xs text-slate-500 mt-0.5">{filtered.length} records found</p>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map(vac => {
            const patient = DEMO_PATIENTS.find(p => p.id === vac.patientId);
            const isOverdue = new Date(vac.nextDueDate) < new Date('2026-08-09');
            return (
              <div key={vac.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isOverdue ? 'bg-red-50 border border-red-200' : 'bg-purple-50 border border-purple-200'}`}>
                  <Syringe className={`w-5 h-5 ${isOverdue ? 'text-red-600' : 'text-purple-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900">{vac.vaccineName}</p>
                    {isOverdue && <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700">Overdue</span>}
                  </div>
                  <p className="text-xs text-slate-500">Patient: {patient?.name} ({patient?.species})</p>
                  <p className="text-xs text-slate-500">Given: {vac.dateGiven} • Dose: {vac.dose} • Batch: {vac.batchNumber}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Next Due</p>
                  <p className={`text-xs font-bold ${isOverdue ? 'text-red-600' : 'text-slate-900'}`}>{vac.nextDueDate}</p>
                  <p className="text-[10px] text-slate-500">By: {vac.administeredBy}</p>
                </div>
                <button
                  onClick={() => onNavigate('patient-detail', vac.patientId)}
                  className="px-3 py-1.5 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors shrink-0"
                >
                  View Patient
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
