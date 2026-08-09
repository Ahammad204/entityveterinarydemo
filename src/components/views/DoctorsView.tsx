import React from 'react';
import { Doctor, Page } from '../../types';
import { DOCTORS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { DoctorCard } from '../cards/DoctorCard';
import { CTASection } from '../layout/CTASection';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  Award,
  Calendar,
  CheckCircle2,
  Info,
  ShieldCheck,
  Stethoscope,
  Users,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export interface DoctorsViewProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string) => void;
  onSelectDoctorDetail: (doctorId: string) => void;
  showDemoBadges: boolean;
}

export const DoctorsView: React.FC<DoctorsViewProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectDoctorDetail,
  showDemoBadges
}) => {
  const leadershipDoctors = DOCTORS.filter((d) => d.id === 'dr-partha' || d.id === 'dr-aslam');
  const clinicalStaffDoctors = DOCTORS.filter((d) => d.id !== 'dr-partha' && d.id !== 'dr-aslam');
  const { breadcrumbs } = getPageMetadata('doctors');

  return (
    <div className="space-y-12 sm:space-y-16 py-6 animate-fade-in relative">
      {/* Breadcrumb Navigation */}
      <Container size="normal">
        <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
      </Container>

      {/* 1. HERO */}
      <section className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="normal" className="relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/90 px-3 py-1 rounded border border-teal-800">
                Entity Veterinary Clinical Leadership
              </span>
              {showDemoBadges && (
                <span className="text-xs text-amber-300 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded font-medium">
                  💡 Factual Governance Mode
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
              Meet the People Behind the Care
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Entity Veterinary Hospital is led by experienced healthcare executives and operational leaders dedicated to setting high standards in veterinary patient care across Chattogram.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onOpenBooking()}
                icon={Calendar}
                iconPosition="left"
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const elem = document.getElementById('leadership-section');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white border-slate-700 hover:bg-slate-800 hover:text-white"
              >
                Meet Executive Team
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. EXECUTIVE LEADERSHIP SECTION (MAIN PAGE HIGHLIGHT) */}
      <section id="leadership-section" className="scroll-mt-24">
        <Container size="normal">
          <SectionHeading
            eyebrow="Executive & Clinical Governance"
            title="Hospital Leadership Team"
            subtitle="Our founding officers guide patient care standards, hospital operations, and veterinary clinical excellence."
            showDemoBadge={showDemoBadges}
            demoNotice="Verified executive profiles"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookWithDoctor={(id) => onOpenBooking(undefined, id)}
                onViewProfile={(id) => onSelectDoctorDetail(id)}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. CLINICAL STAFF & PRACTITIONER PLACEHOLDERS */}
      <section className="bg-slate-50/80 py-12 border-y border-slate-200">
        <Container size="normal">
          <SectionHeading
            eyebrow="Clinical Care Units"
            title="Veterinary Practitioners & Staff"
            subtitle="Our clinical care associates and diagnostic staff provide daily outpatient services and diagnostic evaluations."
            showDemoBadge={showDemoBadges}
            demoNotice="Unverified details marked 'Information to be confirmed'"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clinicalStaffDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookWithDoctor={(id) => onOpenBooking(undefined, id)}
                onViewProfile={(id) => onSelectDoctorDetail(id)}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. TRANSPARENCY & FACTUAL GOVERNANCE NOTICE */}
      <Container size="normal">
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-amber-900">
            <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0" />
            <h3 className="text-lg font-bold font-display">
              Entity Veterinary Factual Standard Notice
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Entity Veterinary Hospital strictly presents factual information. In compliance with verified data standards, unconfirmed degree certifications, awards, and hospital affiliations are explicitly designated as <strong>"Information to be confirmed"</strong> pending administrative verification.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium border-t border-amber-200/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              Verified Executive Experience
            </span>
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" />
              Transparent Credential Status
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-slate-500" />
              Pending Degree Record Audits Marked Clearly
            </span>
          </div>
        </div>
      </Container>

      {/* 5. CALL TO ACTION */}
      <CTASection
        title="Connect with Our Veterinary Healthcare Team"
        subtitle="Schedule a consultation with Dr. Partha or Dr. Aslam Hossain, or visit our central Chattogram hospital branches."
        onBook={() => onOpenBooking()}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
