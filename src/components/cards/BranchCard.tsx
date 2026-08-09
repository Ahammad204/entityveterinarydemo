import React from 'react';
import { Branch } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, Phone, Clock, AlertTriangle, ExternalLink, ShieldCheck, Calendar, ArrowRight, Building2 } from 'lucide-react';

export interface BranchCardProps {
  branch: Branch;
  onSelectBranch: (branchId: string) => void;
  onSelectBranchDetail?: (branchId: string) => void;
  showDemoBadge?: boolean;
}

export const BranchCard: React.FC<BranchCardProps> = ({
  branch,
  onSelectBranch,
  onSelectBranchDetail,
  showDemoBadge = true
}) => {
  const handleOpenGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${branch.name}, ${branch.area}, ${branch.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card hoverable className="flex flex-col h-full overflow-hidden border-slate-200/90 shadow-sm hover:shadow-md transition-all">
      {/* Header Image */}
      <div className="relative h-52 -mx-6 -mt-6 mb-5 bg-slate-900 overflow-hidden group">
        <img
          src={branch.image}
          alt={branch.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {branch.status === 'main' ? (
            <Badge variant="verified" size="sm" icon={<ShieldCheck className="w-3 h-3 text-emerald-700" />}>
              Main Hospital Hub
            </Badge>
          ) : branch.status === 'upcoming' ? (
            <Badge variant="accent" size="sm" icon={<Building2 className="w-3 h-3 text-teal-700" />}>
              Future CMS Branch Node
            </Badge>
          ) : (
            <Badge variant="demo" size="sm">
              Demo Regional Clinic
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block mb-0.5">
            {branch.area} — {branch.city}
          </span>
          <h3 className="text-lg font-bold font-display text-white line-clamp-1">{branch.name}</h3>
        </div>
      </div>

      {/* Content Details */}
      <div className="space-y-3.5 mb-5 text-sm text-slate-600 flex-1">
        {/* Location & Address */}
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">Location & Street Address</span>
            <span className="text-xs text-slate-600">{branch.address}</span>
          </div>
        </div>

        {/* Phone & Contact */}
        <div className="flex items-start gap-2.5">
          <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-slate-800 block uppercase tracking-wider">Phone Contact</span>
            <div className="flex flex-wrap items-center gap-x-3 text-slate-700">
              <span>Primary: <strong className="text-slate-800">{branch.phone}</strong></span>
              {branch.emergencyPhone && (
                <span className="text-red-600 font-semibold">Emergency: {branch.emergencyPhone}</span>
              )}
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-slate-800 block uppercase tracking-wider">Opening Hours</span>
            <span className="text-slate-700 font-medium">{branch.hours}</span>
          </div>
        </div>

        {/* Available Services */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
            Available Services at Branch
          </span>
          <div className="flex flex-wrap gap-1.5">
            {branch.features.map((feat, i) => (
              <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200/60">
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info Notice */}
      {showDemoBadge && (
        <div className="mb-4 bg-amber-50/90 border border-amber-200 p-2.5 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-950">Information to be confirmed:</strong>
            Address, hotline, and operating hours subject to final Entity Veterinary database sync.
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenGoogleMaps}
            icon={ExternalLink}
            iconPosition="left"
            className="flex-1 text-slate-700 hover:text-slate-900 bg-white"
          >
            Google Maps
          </Button>

          {onSelectBranchDetail && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectBranchDetail(branch.id)}
              icon={ArrowRight}
              iconPosition="right"
              className="flex-1 text-teal-700 border-teal-200 hover:bg-teal-50 bg-white"
            >
              Branch Details
            </Button>
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onSelectBranch(branch.id)}
          icon={Calendar}
          iconPosition="left"
          fullWidth
        >
          Book Appointment at Branch
        </Button>
      </div>
    </Card>
  );
};
