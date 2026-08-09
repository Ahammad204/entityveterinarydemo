import React from 'react';
import { Doctor, Page } from '../../types';
import { DOCTORS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CTASection } from '../layout/CTASection';
import { DoctorCard } from '../cards/DoctorCard';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Info,
  ShieldCheck,
  Award,
  GraduationCap,
  Briefcase,
  Building2,
  Stethoscope,
  Sparkles
} from 'lucide-react';

export interface DoctorDetailViewProps {
  doctorId: string;
  onNavigate: (page: Page) => void;
  onSelectDoctorDetail: (doctorId: string) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string) => void;
  showDemoBadges: boolean;
}

export const DoctorDetailView: React.FC<DoctorDetailViewProps> = ({
  doctorId,
  onNavigate,
  onSelectDoctorDetail,
  onOpenBooking,
  showDemoBadges
}) => {
  const doctor = DOCTORS.find((d) => d.id === doctorId || d.slug === doctorId) || DOCTORS[0];
  const isVerified = doctor.statusNotice === 'Fact Verified';
  const { breadcrumbs } = getPageMetadata('doctor-detail', { doctorId: doctor.id });

  // Other doctors for navigation
  const otherDoctors = DOCTORS.filter((d) => d.id !== doctor.id);

  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* Top Breadcrumb Navigation */}
      <Container size="normal">
        <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="flex items-center justify-between gap-4 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('doctors')}
            icon={ArrowLeft}
            iconPosition="left"
            className="text-slate-600 hover:text-slate-900"
          >
            Back to Team Overview
          </Button>

          {showDemoBadges && (
            <span className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
              <span>💡 Verification Architecture Active</span>
            </span>
          )}
        </div>
      </Container>

      {/* Main Profile Hero Section */}
      <Container size="normal">
        <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Photo & Quick Status */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-6 z-10">
                <div className="flex flex-wrap items-center gap-2">
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

                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto lg:mx-0 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-2 text-center lg:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded border border-teal-800/80 inline-block">
                    {doctor.title}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                    {doctor.name}
                  </h1>
                  <p className="text-sm text-slate-300 font-medium">
                    {doctor.role}
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800 z-10 space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onOpenBooking(undefined, doctor.id)}
                  icon={Calendar}
                  iconPosition="left"
                  fullWidth
                >
                  Book Appointment with {doctor.name}
                </Button>
              </div>
            </div>

            {/* Right Column: Detailed Profile Info & Verification Matrix */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-slate-50/50">
              {/* Biography */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
                  <Stethoscope className="w-4 h-4" />
                  <span>Executive & Clinical Biography</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  About {doctor.name}
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-slate-700 leading-relaxed text-base shadow-sm">
                  "{doctor.bio}"
                </div>
              </div>

              {/* Areas of Expertise */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  Areas of Responsibility & Focus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.specialties.map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 p-3.5 rounded-xl flex items-center gap-2.5 text-sm font-medium text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strict Verification Matrix (Degrees, Certifications, Affiliations) */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                    Credentials & Academic History
                  </h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-mono">
                    Strict Compliance Mode
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Academic Degrees */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      Academic Degrees
                    </span>
                    <p className="text-sm font-semibold text-slate-800">
                      {doctor.education || 'Information to be confirmed'}
                    </p>
                  </div>

                  {/* Certifications */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-slate-400" />
                      Specialist Certifications
                    </span>
                    <p className="text-sm font-semibold text-slate-800">
                      {doctor.certifications || 'Information to be confirmed'}
                    </p>
                  </div>

                  {/* Experience Record */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      Documented Management Experience
                    </span>
                    <p className="text-sm font-semibold text-slate-800">
                      {doctor.experienceYears
                        ? `${doctor.experienceYears}+ Years in Healthcare Management`
                        : 'Information to be confirmed'}
                    </p>
                  </div>

                  {/* Hospital Affiliations */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      External Hospital Affiliations
                    </span>
                    <p className="text-sm font-semibold text-slate-800">
                      Information to be confirmed
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    <strong>Factual Governance Standard:</strong> Entity Veterinary Hospital strictly presents verified information. Fields marked "Information to be confirmed" are pending clinical board documentation review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Additional Team Members */}
      <section className="bg-slate-100/70 py-12 border-t border-slate-200">
        <Container size="normal">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Explore Leadership & Team
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Other Leadership & Staff Members
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherDoctors.map((otherDoc) => (
                <DoctorCard
                  key={otherDoc.id}
                  doctor={otherDoc}
                  onBookWithDoctor={(id) => onOpenBooking(undefined, id)}
                  onViewProfile={(id) => onSelectDoctorDetail(id)}
                  showDemoBadge={showDemoBadges}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Appointment CTA */}
      <CTASection
        title={`Book an Appointment with ${doctor.name}`}
        subtitle="Contact Entity Veterinary Hospital to schedule a consultation with our executive healthcare leadership."
        onBook={() => onOpenBooking(undefined, doctor.id)}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
