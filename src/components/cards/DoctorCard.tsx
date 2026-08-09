import React from 'react';
import { Doctor } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckCircle2, Info, Award, Calendar, ArrowRight, User } from 'lucide-react';

export interface DoctorCardProps {
  doctor: Doctor;
  onBookWithDoctor: (doctorId: string) => void;
  onViewProfile?: (doctorId: string) => void;
  showDemoBadge?: boolean;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onBookWithDoctor,
  onViewProfile,
  showDemoBadge = true
}) => {
  const isVerified = doctor.statusNotice === 'Fact Verified';

  return (
    <Card hoverable className="flex flex-col h-full overflow-hidden border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-64 -mx-6 -mt-6 mb-5 bg-slate-100 overflow-hidden group">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {doctor.isFounder && (
            <Badge variant="accent" size="sm" icon={<Award className="w-3 h-3 text-teal-700" />}>
              Co-Founder
            </Badge>
          )}
          {isVerified ? (
            <Badge variant="verified" size="sm" icon={<CheckCircle2 className="w-3 h-3 text-emerald-700" />}>
              Fact Verified
            </Badge>
          ) : (
            <Badge variant="tbc" size="sm" icon={<Info className="w-3 h-3 text-slate-500" />}>
              Information to be confirmed
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-xs font-semibold text-teal-300 block mb-0.5 uppercase tracking-wider">
            {doctor.title}
          </span>
          <h3 className="text-xl font-bold font-display text-white">{doctor.name}</h3>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2.5 py-1 rounded-md inline-block border border-teal-100">
            {doctor.role}
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-4 flex-1">
          "{doctor.bio}"
        </p>

        <div className="mb-5 space-y-2">
          <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
            Key Areas & Focus
          </span>
          <div className="flex flex-wrap gap-1.5">
            {doctor.specialties.map((spec, i) => (
              <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-200/60">
                {spec}
              </span>
            ))}
          </div>
        </div>

        {showDemoBadge && !isVerified && (
          <div className="mb-4 bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Verification Status:</span>
              <p>Additional credentials & degree information to be confirmed.</p>
            </div>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2">
          {onViewProfile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(doctor.id)}
              icon={User}
              iconPosition="left"
              className="flex-1 bg-white"
            >
              View Profile
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => onBookWithDoctor(doctor.id)}
            icon={Calendar}
            iconPosition="left"
            className="flex-1"
          >
            Book Slot
          </Button>
        </div>
      </div>
    </Card>
  );
};
