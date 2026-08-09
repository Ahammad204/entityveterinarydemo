import React, { useState } from 'react';
import { DoctorPortalPage } from '../types';
import { DEMO_PATIENTS } from '../data/demoData';
import { ArrowLeft, Save, Pill, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ConsultationPageProps {
  patientId: string;
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

export const ConsultationPage: React.FC<ConsultationPageProps> = ({ patientId, onNavigate }) => {
  const patient = DEMO_PATIENTS.find(p => p.id === patientId) || DEMO_PATIENTS[0];
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    chiefComplaint: '',
    symptoms: '',
    temperature: '',
    weight: patient.weight,
    heartRate: '',
    respiratoryRate: '',
    clinicalExamination: '',
    diagnosis: '',
    treatmentPlan: '',
    additionalNotes: '',
    followUpDate: '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Mode — Consultation data is not persisted.</span>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-800">Consultation saved successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <button onClick={() => onNavigate('patient-detail', patientId)} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Patient Record
        </button>
        <div className="flex items-center gap-4">
          <img src={patient.photo} alt={patient.name} className="w-14 h-14 rounded-xl object-cover border-2 border-slate-100" />
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">New Consultation</h1>
            <p className="text-sm text-slate-500">{patient.name} — {patient.species} • {patient.breed} • Owner: {patient.ownerName}</p>
          </div>
        </div>
      </div>

      {/* Consultation Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Patient Information */}
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">1</span>
            Patient Information
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Pet</p>
              <p className="text-xs font-bold text-slate-900">{patient.name}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Species</p>
              <p className="text-xs font-bold text-slate-900">{patient.species}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Breed</p>
              <p className="text-xs font-bold text-slate-900">{patient.breed}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Weight</p>
              <p className="text-xs font-bold text-slate-900">{patient.weight}</p>
            </div>
          </div>
        </div>

        {/* Chief Complaint & Symptoms */}
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">2</span>
            Chief Complaint & Symptoms
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Chief Complaint *</label>
              <input value={form.chiefComplaint} onChange={e => update('chiefComplaint', e.target.value)} placeholder="Main reason for visit..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Symptoms</label>
              <textarea value={form.symptoms} onChange={e => update('symptoms', e.target.value)} rows={3} placeholder="Describe observed symptoms..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all resize-none" />
            </div>
          </div>
        </div>

        {/* Vital Signs */}
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">3</span>
            Vital Signs
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Temperature', field: 'temperature', placeholder: '38.5°C' },
              { label: 'Weight', field: 'weight', placeholder: 'kg' },
              { label: 'Heart Rate', field: 'heartRate', placeholder: 'bpm' },
              { label: 'Respiratory Rate', field: 'respiratoryRate', placeholder: 'rpm' },
            ].map(v => (
              <div key={v.field}>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{v.label}</label>
                <input value={(form as any)[v.field]} onChange={e => update(v.field, e.target.value)} placeholder={v.placeholder} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Examination */}
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">4</span>
            Clinical Examination
          </h2>
          <textarea value={form.clinicalExamination} onChange={e => update('clinicalExamination', e.target.value)} rows={4} placeholder="Physical examination findings, auscultation, palpation results..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all resize-none" />
        </div>

        {/* Diagnosis */}
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">5</span>
            Diagnosis
          </h2>
          <textarea value={form.diagnosis} onChange={e => update('diagnosis', e.target.value)} rows={2} placeholder="Primary diagnosis..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all resize-none" />
        </div>

        {/* Treatment Plan */}
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">6</span>
            Treatment Plan
          </h2>
          <textarea value={form.treatmentPlan} onChange={e => update('treatmentPlan', e.target.value)} rows={4} placeholder="Medications, procedures, home care instructions..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all resize-none" />
        </div>

        {/* Additional Notes & Follow-up */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Notes</label>
            <textarea value={form.additionalNotes} onChange={e => update('additionalNotes', e.target.value)} rows={3} placeholder="Any additional observations..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Follow-up Date</label>
            <input type="date" value={form.followUpDate} onChange={e => update('followUpDate', e.target.value)} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <button onClick={handleSave} className="px-5 py-2.5 text-sm font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Consultation
        </button>
        <button onClick={() => onNavigate('prescription', patientId)} className="px-5 py-2.5 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
          <Pill className="w-4 h-4" /> Save & Create Prescription
        </button>
        <button onClick={() => { handleSave(); onNavigate('patient-detail', patientId); }} className="px-5 py-2.5 text-sm font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Complete Consultation
        </button>
      </div>
    </div>
  );
};
