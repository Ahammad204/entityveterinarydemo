import React, { useState } from 'react';
import { DoctorPortalPage } from '../types';
import { DEMO_PATIENTS, DEMO_MEDICAL_RECORDS, DEMO_PRESCRIPTIONS, DEMO_VACCINATIONS, DEMO_LAB_REPORTS, DEMO_APPOINTMENTS } from '../data/demoData';
import { ArrowLeft, Phone, Mail, Edit2, Calendar, FileText, Syringe, FlaskConical, ClipboardList, Pill, AlertTriangle } from 'lucide-react';

interface PatientDetailPageProps {
  patientId: string;
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

type Tab = 'overview' | 'history' | 'prescriptions' | 'vaccinations' | 'lab-reports' | 'documents' | 'appointments';

export const PatientDetailPage: React.FC<PatientDetailPageProps> = ({ patientId, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const patient = DEMO_PATIENTS.find(p => p.id === patientId) || DEMO_PATIENTS[0];
  const records = DEMO_MEDICAL_RECORDS.filter(r => r.patientId === patient.id);
  const prescriptions = DEMO_PRESCRIPTIONS.filter(p => p.patientId === patient.id);
  const vaccinations = DEMO_VACCINATIONS.filter(v => v.patientId === patient.id);
  const labReports = DEMO_LAB_REPORTS.filter(l => l.patientId === patient.id);
  const appointments = DEMO_APPOINTMENTS.filter(a => a.patientId === patient.id);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'history', label: 'Medical History', icon: <FileText className="w-4 h-4" />, count: records.length },
    { id: 'prescriptions', label: 'Prescriptions', icon: <Pill className="w-4 h-4" />, count: prescriptions.length },
    { id: 'vaccinations', label: 'Vaccinations', icon: <Syringe className="w-4 h-4" />, count: vaccinations.length },
    { id: 'lab-reports', label: 'Lab Reports', icon: <FlaskConical className="w-4 h-4" />, count: labReports.length },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" />, count: appointments.length },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — All records are fictional for demonstration.</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <button onClick={() => onNavigate('patients')} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Patients
        </button>

        <div className="flex flex-col sm:flex-row items-start gap-5">
          <img src={patient.photo} alt={patient.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-extrabold text-slate-900">{patient.name}</h1>
              <span className="text-sm text-slate-500">{patient.species} • {patient.breed} • {patient.gender} • {patient.age}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {patient.ownerPhone}</span>
              {patient.ownerEmail && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {patient.ownerEmail}</span>}
              <span className="font-semibold text-slate-800">Owner: {patient.ownerName}</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('consultation', patient.id)}
            className="px-4 py-2.5 text-xs font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Edit2 className="w-3.5 h-3.5" /> Start Consultation
          </button>
        </div>

        {/* Quick Info */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Blood Group', value: patient.bloodGroup || 'N/A' },
            { label: 'Weight', value: patient.weight },
            { label: 'Allergies', value: patient.allergies || 'None' },
            { label: 'Chronic Conditions', value: patient.chronicConditions || 'None' },
            { label: 'Vaccination', value: patient.vaccinationStatus === 'up-to-date' ? 'Up to Date' : patient.vaccinationStatus === 'due' ? 'Due' : 'Overdue' },
            { label: 'Microchip ID', value: patient.microchipId || 'N/A' },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-4 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold bg-slate-100 rounded-full">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Patient Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-2">Last Visit</p>
                  <p className="text-sm text-slate-900">{patient.lastVisit}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-2">Assigned Doctor</p>
                  <p className="text-sm text-slate-900">{patient.assignedDoctor === 'doc-sarah' ? 'Dr. Sarah Ahmed' : patient.assignedDoctor === 'doc-partha' ? 'Dr. Partha Sarathi Chanda' : 'Dr. Aslam Hossain'}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-2">Patient Status</p>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                    patient.status === 'critical' ? 'bg-red-100 text-red-700' :
                    patient.status === 'follow-up' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>{patient.status}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-2">Total Visits</p>
                  <p className="text-sm text-slate-900">{records.length + appointments.filter(a => a.status === 'completed').length} consultations</p>
                </div>
              </div>
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {records.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No medical records found.</p>
              ) : records.map(rec => (
                <div key={rec.id} className="border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{rec.date}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${rec.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{rec.status}</span>
                  </div>
                  <div><p className="text-[10px] font-semibold text-slate-400 uppercase">Chief Complaint</p><p className="text-xs text-slate-700">{rec.chiefComplaint}</p></div>
                  <div><p className="text-[10px] font-semibold text-slate-400 uppercase">Diagnosis</p><p className="text-xs text-slate-700 font-medium">{rec.diagnosis}</p></div>
                  <div><p className="text-[10px] font-semibold text-slate-400 uppercase">Treatment Plan</p><p className="text-xs text-slate-700 whitespace-pre-line">{rec.treatmentPlan}</p></div>
                  {rec.temperature && (
                    <div className="flex gap-4 text-xs text-slate-600">
                      <span>Temp: {rec.temperature}</span>
                      {rec.weight && <span>Weight: {rec.weight}</span>}
                      {rec.heartRate && <span>HR: {rec.heartRate}</span>}
                      {rec.respiratoryRate && <span>RR: {rec.respiratoryRate}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              {prescriptions.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No prescriptions found.</p>
              ) : prescriptions.map(rx => (
                <div key={rx.id} className="border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Prescription — {rx.date}</span>
                    <button onClick={() => onNavigate('prescription', rx.id)} className="text-xs font-semibold text-teal-600 hover:text-teal-700">View Full</button>
                  </div>
                  <p className="text-xs text-slate-600">Diagnosis: <span className="font-semibold text-slate-800">{rx.diagnosis}</span></p>
                  <div className="space-y-2">
                    {rx.medicines.map((med, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <Pill className="w-4 h-4 text-teal-500 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{med.name}</p>
                          <p className="text-[10px] text-slate-500">{med.dosage} • {med.frequency} • {med.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vaccinations Tab */}
          {activeTab === 'vaccinations' && (
            <div className="space-y-3">
              {vaccinations.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No vaccination records found.</p>
              ) : vaccinations.map(vac => (
                <div key={vac.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
                    <Syringe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{vac.vaccineName}</p>
                    <p className="text-xs text-slate-500">Given: {vac.dateGiven} • Dose: {vac.dose}</p>
                    <p className="text-xs text-slate-500">Batch: {vac.batchNumber}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase">Next Due</p>
                    <p className="text-xs font-bold text-slate-900">{vac.nextDueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lab Reports Tab */}
          {activeTab === 'lab-reports' && (
            <div className="space-y-3">
              {labReports.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No lab reports found.</p>
              ) : labReports.map(report => (
                <div key={report.id} className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900">{report.testName}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${report.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : report.status === 'reviewed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{report.status}</span>
                  </div>
                  <p className="text-xs text-slate-500">{report.date} • {report.doctorName}</p>
                  {report.results && <pre className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg whitespace-pre-wrap border border-slate-100">{report.results}</pre>}
                  {report.interpretation && <p className="text-xs text-teal-700 font-medium italic">Interpretation: {report.interpretation}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-3">
              {appointments.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No appointments found.</p>
              ) : appointments.map(apt => (
                <div key={apt.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl">
                  <div className="text-center shrink-0 w-14">
                    <p className="text-sm font-bold text-slate-900">{apt.time}</p>
                    <p className="text-[10px] text-slate-500">{apt.date}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">{apt.reason}</p>
                    <p className="text-xs text-slate-500">{apt.service} • {apt.branch}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    apt.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    apt.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    apt.status === 'waiting' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>{apt.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
