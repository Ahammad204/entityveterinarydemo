import React, { useState } from 'react';
import { DoctorPortalPage } from '../types';
import { DEMO_PATIENTS } from '../data/demoData';
import { Search, Filter, Eye, Stethoscope, AlertTriangle } from 'lucide-react';

interface PatientsPageProps {
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

const SPECIES_FILTER = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

export const PatientsPage: React.FC<PatientsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('All');

  const filtered = DEMO_PATIENTS.filter(p => {
    const matchSearch = search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerPhone.includes(search) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchSpecies = speciesFilter === 'All' || p.species === speciesFilter;
    return matchSearch && matchSpecies;
  });

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — All patient records are fictional.</span>
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
              placeholder="Search by pet name, owner, phone, or ID..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <div className="flex gap-1.5 flex-wrap">
              {SPECIES_FILTER.map(s => (
                <button
                  key={s}
                  onClick={() => setSpeciesFilter(s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    speciesFilter === s
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((pat) => (
          <div key={pat.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
            <div className="p-5">
              <div className="flex items-start gap-4">
                <img src={pat.photo} alt={pat.name} className="w-14 h-14 rounded-xl object-cover border-2 border-slate-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-slate-900">{pat.name}</h3>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                      pat.status === 'critical' ? 'bg-red-100 text-red-700' :
                      pat.status === 'follow-up' ? 'bg-amber-100 text-amber-700' :
                      pat.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {pat.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{pat.species} • {pat.breed}</p>
                  <p className="text-xs text-slate-500">{pat.age} • {pat.gender} • {pat.weight}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Owner</span>
                  <span className="font-medium text-slate-700">{pat.ownerName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Last Visit</span>
                  <span className="font-medium text-slate-700">{pat.lastVisit}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Vaccination</span>
                  <span className={`font-semibold ${
                    pat.vaccinationStatus === 'up-to-date' ? 'text-emerald-600' :
                    pat.vaccinationStatus === 'due' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {pat.vaccinationStatus === 'up-to-date' ? 'Up to Date' :
                     pat.vaccinationStatus === 'due' ? 'Due' : 'Overdue'}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-5 pb-4 flex gap-2">
              <button
                onClick={() => onNavigate('patient-detail', pat.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> View Record
              </button>
              <button
                onClick={() => onNavigate('consultation', pat.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <Stethoscope className="w-3.5 h-3.5" /> Consult
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-slate-400">No patients found matching your search.</p>
        </div>
      )}
    </div>
  );
};
