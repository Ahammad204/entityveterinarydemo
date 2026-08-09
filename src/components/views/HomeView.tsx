import React from 'react';
import { Page } from '../../types';
import { DOCTORS, SERVICES, BRANCHES, BLOG_POSTS, DEMO_PRODUCTS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ServiceCard } from '../cards/ServiceCard';
import { DoctorCard } from '../cards/DoctorCard';
import { BranchCard } from '../cards/BranchCard';
import { BlogCard } from '../cards/BlogCard';
import { ProductCard } from '../cards/ProductCard';
import { CTASection } from '../layout/CTASection';
import { SocialSection } from '../social/SocialSection';
import { ContentConversionJourney } from '../social/ContentConversionJourney';
import { PatientJourneyShowcase } from '../presentation/PatientJourneyShowcase';
import { 
  Stethoscope, 
  ShieldCheck, 
  Calendar, 
  PhoneCall, 
  Award, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  Activity,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';

export interface HomeViewProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string) => void;
  onSelectServiceDetail?: (serviceId: string) => void;
  onSelectDoctorDetail?: (doctorId: string) => void;
  onAddToCart?: (product: any, e: React.MouseEvent) => void;
  showDemoBadges: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectServiceDetail,
  onSelectDoctorDetail,
  onAddToCart,
  showDemoBadges
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* Hero Section - Client Demo Presentation */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent" size="sm" icon={<Sparkles className="w-3.5 h-3.5 text-teal-700" />}>
                  Proposed Solution by Tectonic
                </Badge>
                <Badge variant="verified" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />}>
                  ENTITY VETERINARY
                </Badge>
                {showDemoBadges && (
                  <Badge variant="demo" size="sm">
                    Concept Presentation
                  </Badge>
                )}
              </div>

              {/* Exact Brand Communication Required */}
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold font-mono text-teal-400 uppercase tracking-widest block">
                  ENTITY VETERINARY • Chattogram
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.12]">
                  Professional Veterinary Care
                </h1>
                <p className="text-lg sm:text-2xl font-display font-medium text-teal-200 pt-1">
                  A modern digital experience for pet owners.
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Combining advanced clinical diagnostics, surgical suite capabilities, 24/7 emergency care, and an effortless online appointment booking flow.
              </p>

              {/* Verified Leadership Pill */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 max-w-xl backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400 shrink-0" />
                  <span><strong>Dr. Partha</strong> (Co-Founder & CEO)</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400 shrink-0" />
                  <span><strong>Dr. Aslam Hossain</strong> (COO)</span>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Calendar}
                  onClick={() => onOpenBooking()}
                  className="shadow-lg shadow-teal-600/30 font-bold"
                >
                  Book Appointment Online
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-700 text-white hover:bg-slate-800"
                  icon={PhoneCall}
                  onClick={() => onNavigate('contact')}
                >
                  Emergency Contact
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Advanced Operating Suites
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  In-House Diagnostics & Imaging
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  24/7 Emergency Response
                </span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800"
                  alt="Entity Veterinary Clinical Care"
                  className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-300 font-mono">
                      Clinical Digital Proposal
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display">Entity Veterinary Hospital</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Dedicated to medical excellence, compassionate care, and transparent patient communication for pet owners across Chattogram.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PROMINENT USER JOURNEY SHOWCASE */}
      <PatientJourneyShowcase
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
        showDemoBadges={showDemoBadges}
      />

      {/* Verified Executive Leadership Section */}
      <section>
        <Container size="normal">
          <SectionHeading
            eyebrow="Leadership & Trust"
            title="Guided by Experienced Healthcare Leadership"
            subtitle="Meet the founders driving veterinary excellence and compassionate patient care in Chattogram."
            demoNotice="Executive bios verified — additional staff details to be confirmed"
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

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onNavigate('doctors')}
            >
              View Full Clinical Team & Specialists
            </Button>
          </div>
        </Container>
      </section>

      {/* Services Overview Section */}
      <section className="bg-slate-100/70 py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-slate-200/80">
        <Container size="normal">
          <SectionHeading
            eyebrow="Clinical Capabilities"
            title="Comprehensive Veterinary Services"
            subtitle="From routine preventive health checkups to advanced surgical procedures and emergency critical care."
            demoNotice="Full service scope catalog demonstrated for client review"
            showDemoBadge={showDemoBadges}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={(id) => onOpenBooking(id)}
                onSelectDetail={onSelectServiceDetail}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="primary"
              size="lg"
              icon={Calendar}
              onClick={() => onOpenBooking()}
            >
              Schedule a Clinical Consultation
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section>
        <Container size="normal">
          <SectionHeading
            eyebrow="Pet Shop & Supplies"
            title="Featured Demo Products"
            subtitle="Browse veterinary-recommended pet foods, supplements, grooming supplies, and healthcare products."
            demoNotice="Fictional e-commerce catalog for concept demonstration"
            showDemoBadge={showDemoBadges}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEMO_PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(slug) => onNavigate('shop')}
                onAddToCart={(prod, e) => onAddToCart?.(prod, e)}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="primary"
              size="lg"
              icon={ShoppingBag}
              onClick={() => onNavigate('shop')}
            >
              Browse Full Pet Shop
            </Button>
          </div>
        </Container>
      </section>

      {/* Executive Leadership Section */}
      <section className="bg-slate-50/80 py-12 border-y border-slate-200">
        <Container size="normal">
          <SectionHeading
            eyebrow="Executive Leadership"
            title="Hospital Executive Leadership"
            subtitle="Meet the founding officers guiding clinical standards and hospital operations at Entity Veterinary Hospital."
            showDemoBadge={showDemoBadges}
            demoNotice="Verified executive profiles"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DOCTORS.filter((d) => d.id === 'dr-partha' || d.id === 'dr-aslam').map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookWithDoctor={(id) => onOpenBooking(undefined, id)}
                onViewProfile={(id) => {
                  if (onSelectDoctorDetail) {
                    onSelectDoctorDetail(id);
                  } else {
                    onNavigate('doctors');
                  }
                }}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="md"
              icon={Users}
              onClick={() => onNavigate('doctors')}
            >
              Meet Full Healthcare & Clinical Team
            </Button>
          </div>
        </Container>
      </section>
      <section>
        <Container size="normal">
          <div className="bg-gradient-to-r from-red-900 via-slate-900 to-red-950 text-white rounded-2xl p-8 border border-red-800/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-800/60 rounded-xl text-red-300 shrink-0 border border-red-700">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-300 block mb-1">
                  24/7 Emergency Triage & Trauma Care
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  Pet experiencing an acute medical emergency?
                </h3>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">
                  Immediate stabilization, oxygen therapy, trauma repair, and critical monitoring available at Entity Veterinary.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Button
                variant="emergency"
                size="lg"
                icon={PhoneCall}
                onClick={() => alert("Emergency Hotline Demo: In production, this dials Entity Veterinary 24/7 Triage Desk immediately.")}
              >
                Call Emergency Hotline
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Hospital Branches Section */}
      <section>
        <Container size="normal">
          <SectionHeading
            eyebrow="Multiple Branch Support"
            title="Accessible Locations Across Chattogram"
            subtitle="Convenient hospital access with dedicated surgical suites, pharmacy, and pet care amenities."
            demoNotice="Branch addresses and phone numbers to be confirmed"
            showDemoBadge={showDemoBadges}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRANCHES.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                onSelectBranch={() => onOpenBooking()}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Social Media Integration & Community Hub Section */}
      <SocialSection
        onNavigate={onNavigate as any}
        onOpenBooking={onOpenBooking}
        showDemoBadge={showDemoBadges}
      />

      {/* Content-to-Conversion Journey Showcase */}
      <Container size="normal">
        <ContentConversionJourney
          onNavigate={onNavigate as any}
          onOpenBooking={onOpenBooking}
        />
      </Container>

      {/* Educational Blog Highlights */}
      <section className="bg-white py-12 rounded-3xl border border-slate-200">
        <Container size="normal">
          <SectionHeading
            eyebrow="Educational Content & Local Visibility"
            title="Pet Health & Care Insights"
            subtitle="Empowering Chattogram pet owners with expert veterinary advice, seasonal health alerts, and care guides."
            demoNotice="Sample educational content demonstrated"
            showDemoBadge={showDemoBadges}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onReadMore={() => onNavigate('blog')}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onNavigate('blog')}
            >
              Explore All Health Articles
            </Button>
          </div>
        </Container>
      </section>

      {/* Final Call to Action */}
      <CTASection
        title="Experience Compassionate, Modern Veterinary Care"
        subtitle="Schedule your pet's appointment today with Entity Veterinary Hospital in Chattogram."
        onBook={() => onOpenBooking()}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
