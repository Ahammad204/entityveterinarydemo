import React, { useState } from 'react';
import { Page, Service } from '../../types';
import { SERVICES } from '../../data/mockData';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceCard } from '../cards/ServiceCard';
import { CTASection } from '../layout/CTASection';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  Stethoscope,
  Activity,
  ShieldCheck,
  Sparkles,
  Pill,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Home
} from 'lucide-react';

export interface ServicesViewProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: (serviceId?: string) => void;
  onSelectServiceDetail: (serviceId: string) => void;
  showDemoBadges: boolean;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectServiceDetail,
  showDemoBadges
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Services', icon: Stethoscope },
    { id: 'clinical', label: 'Consultations', icon: Stethoscope },
    { id: 'diagnostic', label: 'Diagnostics', icon: Activity },
    { id: 'surgical', label: 'Surgery', icon: Stethoscope },
    { id: 'preventive', label: 'Preventive Care', icon: ShieldCheck },
    { id: 'wellness', label: 'Grooming & Hygiene', icon: Sparkles },
    { id: 'boarding', label: 'Pet Boarding', icon: Home },
    { id: 'emergency', label: '24/7 Emergency', icon: AlertCircle }
  ];

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  const featuredServices = SERVICES.filter(
    (s) => s.id === 'emergency-care' || s.id === 'surgical-care'
  );

  const globalFaqs = [
    {
      q: 'What services does Entity Veterinary Hospital offer in Chattogram?',
      a: 'Entity Veterinary Hospital offers a full spectrum of veterinary care including clinical consultations, diagnostic imaging (digital X-ray and ultrasound), soft tissue and emergency surgery, vaccinations, pet grooming, and pet boarding.'
    },
    {
      q: 'How do I schedule an appointment for my pet?',
      a: 'You can book an appointment online using the "Book Appointment" button on this website, select your preferred service and branch, or contact our reception directly.'
    },
    {
      q: 'What should I do if my pet has an emergency after hours?',
      a: 'For urgent medical emergencies, visit our emergency care department or call our hotline. Our critical care unit handles acute trauma, respiratory distress, and toxemia.'
    },
    {
      q: 'Are the service descriptions verified or demo content?',
      a: 'All detailed service descriptions and equipment listings are presented as Tectonic client demo content for Entity Veterinary Hospital. Specific operational details should be verified directly with hospital administration.'
    }
  ];

  const { breadcrumbs } = getPageMetadata('services');

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
                Entity Veterinary Care Scope
              </span>
              {showDemoBadges && (
                <span className="text-xs text-amber-300 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded font-medium">
                  💡 Service Architecture Demo
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
              Comprehensive Veterinary Care for Your Companion
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              From routine consultations and preventive immunizations to advanced diagnostics, sterile surgery, grooming, and boarding — explore Entity Veterinary Hospital's services engineered for pet wellbeing in Chattogram.
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
                  const elem = document.getElementById('services-catalog');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white border-slate-700 hover:bg-slate-800 hover:text-white"
              >
                Explore All Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FEATURED SERVICES SPOTLIGHT */}
      <section>
        <Container size="normal">
          <SectionHeading
            eyebrow="Specialized Excellence"
            title="Featured Clinical Capabilities"
            subtitle="Explore our flagship surgical and critical care departments designed for complex veterinary needs."
            showDemoBadge={showDemoBadges}
            demoNotice="Featured clinical services demo spotlight"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredServices.map((feat) => (
              <Card key={feat.id} className="p-0 overflow-hidden border-slate-200/90 hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div className="relative h-56 w-full">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
                  
                  <div className="absolute top-4 right-4">
                    {feat.isEmergency ? (
                      <Badge variant="emergency" size="sm">24/7 Emergency</Badge>
                    ) : (
                      <Badge variant="teal" size="sm">Featured Service</Badge>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block mb-1">
                      {feat.category}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white">
                      {feat.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feat.fullDesc}
                  </p>

                  <div className="space-y-2">
                    {feat.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectServiceDetail(feat.id)}
                      fullWidth
                    >
                      Learn More
                    </Button>
                    <Button
                      variant={feat.isEmergency ? 'emergency' : 'primary'}
                      size="sm"
                      onClick={() => onOpenBooking(feat.id)}
                      icon={ArrowRight}
                      iconPosition="right"
                      fullWidth
                    >
                      Book Service
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. SERVICE CATEGORIES & FULL CATALOG */}
      <section id="services-catalog" className="scroll-mt-24">
        <Container size="normal">
          <SectionHeading
            eyebrow="Service Catalog"
            title="Browse Services by Category"
            subtitle="Filter our complete list of clinical, surgical, preventive, grooming, and boarding services."
            showDemoBadge={showDemoBadges}
            demoNotice="Full service scope catalog demonstrated"
          />

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={(id) => onOpenBooking(id)}
                onSelectDetail={(id) => onSelectServiceDetail(id)}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. FAQ PREVIEW */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <Container size="normal">
          <SectionHeading
            eyebrow="Pet Owner Guidance"
            title="Frequently Asked Questions About Services"
            subtitle="Common questions regarding consultations, surgical preparation, and pet appointments at Entity Veterinary Hospital."
            showDemoBadge={showDemoBadges}
            demoNotice="Standard client FAQ preview"
          />

          <div className="max-w-3xl mx-auto space-y-3">
            {globalFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-teal-600 shrink-0" />
                    {faq.q}
                  </span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. APPOINTMENT CTA */}
      <CTASection
        title="Your Pet Deserves the Right Care"
        subtitle="Schedule a consultation or contact Entity Veterinary Hospital to speak with our clinical staff today."
        onBook={() => onOpenBooking()}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
