import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DoctorPortalPage, PrescriptionMedicine } from '../types';
import { DEMO_PATIENTS } from '../data/demoData';
import { ArrowLeft, Plus, Trash2, Save, Printer, Download, Pill, AlertTriangle } from 'lucide-react';

interface PrescriptionPageProps {
  patientId: string;
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

export const PrescriptionPage: React.FC<PrescriptionPageProps> = ({ patientId, onNavigate }) => {
  const { doctor } = useAuth();
  const patient = DEMO_PATIENTS.find(p => p.id === patientId) || DEMO_PATIENTS[0];
  const [diagnosis, setDiagnosis] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const removeMedicine = (index: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const updateMedicine = (index: number, field: keyof PrescriptionMedicine, value: string) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Mode — Prescription is for demonstration only.</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <button onClick={() => onNavigate('patient-detail', patientId)} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Patient
        </button>
        <div className="flex items-center gap-4">
          <img src={patient.photo} alt={patient.name} className="w-14 h-14 rounded-xl object-cover border-2 border-slate-100" />
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">Digital Prescription</h1>
            <p className="text-sm text-slate-500">{patient.name} — {patient.species} • {patient.breed} • {patient.age} • {patient.gender} • {patient.weight}</p>
            <p className="text-xs text-slate-500">Owner: {patient.ownerName} • {patient.ownerPhone}</p>
          </div>
        </div>
      </div>

      {/* Prescription Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Doctor & Patient Header */}
        <div className="text-center pb-4 border-b-2 border-slate-900">
          <h2 className="text-lg font-extrabold text-slate-900">ENTITY VETERINARY HOSPITAL</h2>
          <p className="text-xs text-slate-500">Chattogram, Bangladesh</p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-slate-600">
            <span>{doctor?.name}</span>
            <span>•</span>
            <span>{doctor?.degree}</span>
            <span>•</span>
            <span>Reg: {doctor?.registrationNo}</span>
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Diagnosis</label>
          <input value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="Enter diagnosis..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all" />
        </div>

        {/* Medicines */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Pill className="w-4 h-4 text-teal-600" /> Prescribed Medicines
            </h3>
            <button onClick={addMedicine} className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Medicine
            </button>
          </div>
          <div className="space-y-4">
            {medicines.map((med, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 space-y-3 relative">
                {medicines.length > 1 && (
                  <button onClick={() => removeMedicine(i)} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <p className="text-xs font-bold text-slate-400">Medicine #{i + 1}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Medicine Name</label>
                    <input value={med.name} onChange={e => updateMedicine(i, 'name', e.target.value)} placeholder="e.g. Amoxicillin" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Dosage</label>
                    <input value={med.dosage} onChange={e => updateMedicine(i, 'dosage', e.target.value)} placeholder="e.g. 250 mg" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Frequency</label>
                    <input value={med.frequency} onChange={e => updateMedicine(i, 'frequency', e.target.value)} placeholder="e.g. 2 times daily" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Duration</label>
                    <input value={med.duration} onChange={e => updateMedicine(i, 'duration', e.target.value)} placeholder="e.g. 5 days" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Instructions</label>
                  <input value={med.instructions} onChange={e => updateMedicine(i, 'instructions', e.target.value)} placeholder="e.g. Give after food" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Special Instructions</label>
          <textarea value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} rows={3} placeholder="Dietary restrictions, activity limitations, monitoring notes..." className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all resize-none" />
        </div>

        {/* Follow-up */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Follow-up Date</label>
          <input type="date" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <button className="px-5 py-2.5 text-sm font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Prescription
        </button>
        <button className="px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Printer className="w-4 h-4" /> Print Prescription
        </button>
        <button className="px-5 py-2.5 text-sm font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>
    </div>
  );
};
