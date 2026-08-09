import React from 'react';
import { useAuth } from '../context/AuthContext';
import { DoctorPortalPage } from '../types';
import { Mail, Phone, MapPin, Award, Briefcase, Edit2, AlertTriangle } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: DoctorPortalPage, params?: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { doctor } = useAuth();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span className="text-xs font-semibold text-amber-800">Demo Data — Profile is for demonstration.</span>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-teal-600 to-teal-700 relative">
          <div className="absolute -bottom-10 left-6">
            <img src={doctor?.avatar} alt={doctor?.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg" />
          </div>
        </div>
        <div className="pt-14 px-6 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{doctor?.name}</h1>
              <p className="text-sm text-teal-600 font-semibold">{doctor?.designation}</p>
              <p className="text-xs text-slate-500 mt-0.5">{doctor?.specialization}</p>
            </div>
            <button className="px-4 py-2 text-xs font-bold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-1.5">
              <Edit2 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-extrabold text-slate-900 mb-4">Professional Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <Award className="w-4 h-4" />, label: 'Degree', value: doctor?.degree },
            { icon: <Briefcase className="w-4 h-4" />, label: 'Experience', value: `${doctor?.experienceYears} years` },
            { icon: <Award className="w-4 h-4" />, label: 'Registration No.', value: doctor?.registrationNo },
            { icon: <MapPin className="w-4 h-4" />, label: 'Branch', value: doctor?.branch },
            { icon: <Mail className="w-4 h-4" />, label: 'Email', value: doctor?.email },
            { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: doctor?.phone },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400">{item.icon}</span>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-xs font-bold text-slate-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-extrabold text-slate-900 mb-3">Biography</h2>
        <p className="text-sm text-slate-700 leading-relaxed">{doctor?.bio}</p>
      </div>
    </div>
  );
};
