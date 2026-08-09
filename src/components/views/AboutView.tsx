import React from 'react';
import { Page } from '../../types';
import { DOCTORS, CLIENT_TECTONIC_NOTES } from '../../data/mockData';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { DoctorCard } from '../cards/DoctorCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CTASection } from '../layout/CTASection';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import { 
  Award, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  Facebook, 
  Stethoscope,
  Building2,
  Users
} from 'lucide-react';

export interface AboutViewProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string) => void;
  showDemoBadges: boolean;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onOpenBooking,
  showDemoBadges
}) => {
  const { breadcrumbs } = getPageMetadata('about');

  return (
    <div className="space-y-12 sm:space-y-16 py-6 animate-fade-in relative">
      {/* Breadcrumb Navigation */}
      <Container size="normal">
        <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
      </Container>

      {/* Header Banner */}
      <section className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-800">
        <Container size="normal" className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="verified" size="sm">
                Fact Verified Leadership
              </Badge>
              <Badge variant="demo" size="sm">Chattogram, Bangladesh</Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              About Entity Veterinary Hospital
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Dedicated to delivering international-grade veterinary medical standards, surgical precision, and compassionate animal care across Chattogram and Bangladesh.
            </p>
          </div>
        </Container>
      </section>

      {/* Leadership Showcase */}
      <section>
        <Container size="normal">
          <SectionHeading
            eyebrow="Executive Leadership"
            title="Co-Founders & Leadership Team"
            subtitle="Meet the leaders establishing a new benchmark in veterinary hospital operations and clinical care."
            demoNotice="Verified factual leadership profiles"
            showDemoBadge={showDemoBadges}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DOCTORS.filter(d => d.isFounder || d.statusNotice === 'Fact Verified').map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookWithDoctor={(id) => onOpenBooking(undefined, id)}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Core Hospital Values */}
      <section className="bg-slate-100/80 py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-slate-200">
        <Container size="normal">
          <SectionHeading
            eyebrow="Our Clinical Philosophy"
            title="Pillars of Patient Care & Client Trust"
            subtitle="Every diagnosis, treatment, and surgical procedure is guided by five core principles."
            showDemoBadge={false}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">Clinical Quality & Safety</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sterile surgical suites, monitored anesthesia, and standardized medical protocols for optimal patient safety.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">Compassionate Handling</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Low-stress examination techniques designed to keep dogs, cats, and exotic pets comfortable during care.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">Modern Diagnostics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Rapid in-house blood work, digital imaging, and ultrasonography for quick, accurate disease identification.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Official Presence Integration */}
      <section>
        <Container size="normal">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Official Digital Footprint
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                Connect with Entity Veterinary Online
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Access official announcements, pet care updates, and hospital details across official channels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href={CLIENT_TECTONIC_NOTES.officialLinks.website}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Globe className="w-5 h-5 text-teal-600" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
                </div>
                <span className="text-sm font-bold text-slate-900 block font-display">Existing Website</span>
                <span className="text-xs text-slate-500 truncate block">entityveterinary.com</span>
              </a>

              <a
                href={CLIENT_TECTONIC_NOTES.officialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Facebook className="w-5 h-5 text-sky-600" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </div>
                <span className="text-sm font-bold text-slate-900 block font-display">Facebook Community</span>
                <span className="text-xs text-slate-500 truncate block">Official Page</span>
              </a>

              <a
                href={CLIENT_TECTONIC_NOTES.officialLinks.googleSites}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-xl transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Globe className="w-5 h-5 text-amber-600" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </div>
                <span className="text-sm font-bold text-slate-900 block font-display">Google Sites Page</span>
                <span className="text-xs text-slate-500 truncate block">Official Information</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Schedule a Consultation with Entity Veterinary"
        subtitle="Experience modern, compassionate animal care tailored for Chattogram pet owners."
        onBook={() => onOpenBooking()}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
