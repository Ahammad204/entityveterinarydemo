import React from 'react';
import { Branch, Page } from '../../types';
import { BRANCHES, SERVICES, DOCTORS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CTASection } from '../layout/CTASection';
import { DoctorCard } from '../cards/DoctorCard';
import { ServiceCard } from '../cards/ServiceCard';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Building2,
  AlertTriangle,
  ExternalLink,
  Stethoscope,
  Users,
  Database,
  Navigation,
  CheckCircle2,
  Info
} from 'lucide-react';

export interface BranchDetailViewProps {
  branchId: string;
  onNavigate: (page: Page) => void;
  onSelectBranchDetail: (branchId: string) => void;
  onSelectServiceDetail?: (serviceId: string) => void;
  onSelectDoctorDetail?: (doctorId: string) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string, branchId?: string) => void;
  showDemoBadges: boolean;
}

export const BranchDetailView: React.FC<BranchDetailViewProps> = ({
  branchId,
  onNavigate,
  onSelectBranchDetail,
  onSelectServiceDetail,
  onSelectDoctorDetail,
  onOpenBooking,
  showDemoBadges
}) => {
  const branch = BRANCHES.find((b) => b.id === branchId || b.slug === branchId) || BRANCHES[0];

  // Resolve available services and doctors at this branch
  const availableServicesList = SERVICES.filter((s) => branch.availableServices.includes(s.id));
  const availableDoctorsList = DOCTORS.filter((d) => branch.availableDoctors.includes(d.id));
  const otherBranches = BRANCHES.filter((b) => b.id !== branch.id);

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${branch.name}, ${branch.area}, ${branch.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const { breadcrumbs } = getPageMetadata('branch-detail', { branchId: branch.id });

  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* 1. TOP BREADCRUMB & CMS BADGE */}
      <Container size="normal">
        <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('branches')}
            icon={ArrowLeft}
            iconPosition="left"
            className="text-slate-600 hover:text-slate-900"
          >
            Back to All Hospital Branches
          </Button>

          {showDemoBadges && (
            <span className="text-xs bg-slate-900 text-teal-300 border border-slate-700 px-3 py-1.5 rounded-full font-mono flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>CMS Branch Node: {branch.id}</span>
            </span>
          )}
        </div>
      </Container>

      {/* 2. MAIN BRANCH HERO SECTION */}
      <Container size="normal">
        <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Image & Quick Stats */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-6 z-10">
                <div className="flex flex-wrap items-center gap-2">
                  {branch.status === 'main' ? (
                    <Badge variant="verified" size="sm" icon={<ShieldCheck className="w-3 h-3 text-emerald-700" />}>
                      Main Hospital Hub
                    </Badge>
                  ) : branch.status === 'upcoming' ? (
                    <Badge variant="accent" size="sm" icon={<Building2 className="w-3 h-3 text-teal-700" />}>
                      Future Node Concept
                    </Badge>
                  ) : (
                    <Badge variant="demo" size="sm">
                      Regional Branch Node
                    </Badge>
                  )}
                </div>

                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl group">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs text-teal-300 font-bold uppercase tracking-wider">
                    {branch.area}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded border border-teal-800/80 inline-block">
                    {branch.city}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                    {branch.name}
                  </h1>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">
                    {branch.description}
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800 z-10 space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onOpenBooking(undefined, undefined, branch.id)}
                  icon={Calendar}
                  iconPosition="left"
                  fullWidth
                >
                  Book Appointment at {branch.area}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleOpenGoogleMaps}
                  icon={ExternalLink}
                  iconPosition="left"
                  fullWidth
                  className="text-white border-slate-700 hover:bg-slate-800 hover:text-white"
                >
                  Open in Google Maps
                </Button>
              </div>
            </div>

            {/* Right: Branch Info & Placeholder Notice */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-slate-50/50">
              {/* Essential Branch Information Grid */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-600" />
                  Branch Contact & Location Specifications
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Street Address */}
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      Street Address
                    </span>
                    <p className="text-sm font-semibold text-slate-900">
                      {branch.address}
                    </p>
                  </div>

                  {/* Telephone Line */}
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-teal-600" />
                      General Phone Contact
                    </span>
                    <p className="text-sm font-semibold text-slate-900">
                      {branch.phone}
                    </p>
                  </div>

                  {/* Emergency Hotline */}
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-red-600" />
                      Emergency Hotline
                    </span>
                    <p className="text-sm font-semibold text-red-600">
                      {branch.emergencyPhone || 'Information to be confirmed'}
                    </p>
                  </div>

                  {/* Operating Schedule */}
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-600" />
                      Operating Schedule
                    </span>
                    <p className="text-sm font-semibold text-slate-900">
                      {branch.hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strict Notice Box */}
              <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-5 space-y-2 text-amber-950">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Branch Information Standard Notice:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  In accordance with Entity VeterinaryHospital factual governance, specific street numbers, hotline extensions, and clinical shift schedules for <strong>{branch.name}</strong> are marked <strong>"Information to be confirmed"</strong> until live database deployment.
                </p>
              </div>

              {/* CMS & Database Connectivity Technical Bar */}
              <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 space-y-3 font-mono text-xs border border-slate-800">
                <div className="flex items-center justify-between text-teal-400 font-bold border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-teal-400" />
                    CMS Data Schema Representation
                  </span>
                  <span className="text-[10px] bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800">
                    STATUS: READY_FOR_SYNC
                  </span>
                </div>
                <div className="text-slate-400 space-y-1 text-[11px] leading-relaxed">
                  <p>• <strong>Node ID:</strong> {branch.id}</p>
                  <p>• <strong>Slug Route:</strong> /branches/{branch.slug}</p>
                  <p>• <strong>Available Service Relational Keys:</strong> [{branch.availableServices.join(', ')}]</p>
                  <p>• <strong>Assigned Clinician Keys:</strong> [{branch.availableDoctors.join(', ')}]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. MAP PLACEHOLDER SECTION */}
      <Container size="normal">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Geographic Navigation
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                <Navigation className="w-6 h-6 text-teal-600" />
                Interactive Map Location
              </h2>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenGoogleMaps}
              icon={ExternalLink}
              iconPosition="left"
            >
              Open in Google Maps
            </Button>
          </div>

          {/* Map Graphic Container */}
          <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center text-center p-6 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            <div className="relative z-10 max-w-md space-y-4 text-white">
              <div className="w-16 h-16 bg-teal-500/20 border border-teal-400/40 rounded-full flex items-center justify-center mx-auto text-teal-300 animate-pulse">
                <MapPin className="w-8 h-8 text-teal-400" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-display">{branch.name}</h3>
                <p className="text-xs text-slate-300 font-mono mt-1">
                  GPS Coordinates: Information to be confirmed for live GIS / Google Maps API integration
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-xs text-slate-300">
                💡 <strong>Interactive Map Integration:</strong> Connected directly to live Google Maps location query for user route calculation.
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. SERVICES AVAILABLE AT THIS BRANCH */}
      <section className="bg-slate-50/80 py-12 border-y border-slate-200">
        <Container size="normal">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                  Branch Clinical Capabilities
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                  Services Available at {branch.area}
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('services')}
              >
                View All Hospital Services
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableServicesList.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelectService={() => onOpenBooking(service.id, undefined, branch.id)}
                  onSelectServiceDetail={onSelectServiceDetail}
                  showDemoBadge={showDemoBadges}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. DOCTORS & CLINICAL STAFF AT THIS BRANCH */}
      <Container size="normal">
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
              Assigned Clinical Staff
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-600" />
              Doctors & Clinicians Available at {branch.area}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {availableDoctorsList.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookWithDoctor={(docId) => onOpenBooking(undefined, docId, branch.id)}
                onViewProfile={onSelectDoctorDetail}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* 6. OTHER NETWORK BRANCHES */}
      <section className="bg-slate-100/70 py-12 border-t border-slate-200">
        <Container size="normal">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Explore Other Locations
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                Other Entity Veterinary Hospital Branches
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherBranches.map((otherBranch) => (
                <Card key={otherBranch.id} hoverable className="flex flex-col justify-between p-5 border-slate-200">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
                      {otherBranch.city}
                    </span>
                    <h3 className="font-bold text-slate-900 font-display text-base">{otherBranch.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{otherBranch.address}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectBranchDetail(otherBranch.id)}
                      fullWidth
                    >
                      View Branch
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. APPOINTMENT CTA */}
      <CTASection
        title={`Book an Appointment at ${branch.name}`}
        subtitle="Schedule a consultation with our veterinary clinicians or contact our central desk for guidance."
        onBook={() => onOpenBooking(undefined, undefined, branch.id)}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
