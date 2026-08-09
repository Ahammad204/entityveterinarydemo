import React, { useState } from 'react';
import { Page, Service } from '../../types';
import { SERVICES } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ServiceCard } from '../cards/ServiceCard';
import { CTASection } from '../layout/CTASection';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Info,
  Code,
  Share2,
  Search,
  Sparkles,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

export interface ServiceDetailViewProps {
  serviceId: string;
  onNavigate: (page: Page) => void;
  onSelectServiceDetail: (serviceId: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  showDemoBadges: boolean;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  serviceId,
  onNavigate,
  onSelectServiceDetail,
  onOpenBooking,
  showDemoBadges
}) => {
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [seoTab, setSeoTab] = useState<'preview' | 'meta' | 'schema'>('preview');

  // Related services (exclude current service)
  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  const detail = service.detailData || {
    overview: service.fullDesc,
    includes: service.features,
    suitableFor: ['Pets of all ages requiring professional veterinary oversight.'],
    petOwnerNotes: ['Please bring previous medical history and arrive 10 minutes before your scheduled slot.'],
    faqs: [
      {
        question: `How do I book a ${service.title} appointment?`,
        answer: 'Select "Book Appointment" anywhere on this page to choose your preferred date, branch, and veterinarian.'
      }
    ],
    seoTitle: `${service.title} Services in Chattogram | Entity Veterinary Hospital`,
    seoMetaDescription: `${service.shortDesc} Book an appointment with Entity Veterinary Hospital in Chattogram.`,
    structuredDataJson: JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'VeterinaryCare',
        name: service.title,
        provider: {
          '@type': 'VeterinaryCare',
          name: 'Entity Veterinary Hospital',
          address: 'Chattogram, Bangladesh'
        }
      },
      null,
      2
    )
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const { breadcrumbs } = getPageMetadata('service-detail', { serviceId });

  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* Top Navigation Breadcrumb */}
      <Container size="normal">
        <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="flex items-center justify-between gap-4 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('services')}
            icon={ArrowLeft}
            iconPosition="left"
            className="text-slate-600 hover:text-slate-900"
          >
            Back to All Services
          </Button>

          {showDemoBadges && (
            <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
              <span>💡 Tectonic Landing Page Architecture Demo</span>
            </span>
          )}
        </div>
      </Container>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-950/90 px-3 py-1 rounded-md border border-teal-800">
                {service.category}
              </span>
              {service.isEmergency && (
                <Badge variant="emergency" size="sm">
                  24/7 Emergency Service
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {service.shortDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant={service.isEmergency ? 'emergency' : 'primary'}
                size="lg"
                onClick={() => onOpenBooking(service.id)}
                icon={Calendar}
                iconPosition="left"
              >
                Book {service.title}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('contact')}
                className="text-white border-slate-700 hover:bg-slate-800 hover:text-white"
              >
                Inquire & Location
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full min-h-[320px] relative bg-slate-800">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/90 via-slate-900/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* Non-Medical Disclaimer Banner */}
      <Container size="normal">
        <div className="bg-blue-50 border border-blue-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-blue-900 text-xs sm:text-sm leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-blue-950 mb-0.5">
              Informational Service Overview (No Medical Diagnosis Provided)
            </span>
            <span>
              This content is for general information and demonstration of Entity Veterinary Hospital's services. It does not replace direct clinical examination by a licensed veterinarian.
            </span>
          </div>
        </div>
      </Container>

      {/* Main Service Content Grid */}
      <Container size="normal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Service Overview */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
                <Stethoscope className="w-4 h-4" />
                <span>Clinical Overview</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Service Details & Scope
              </h2>
              <p className="text-slate-700 text-base leading-relaxed bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                {detail.overview}
              </p>
            </div>

            {/* 2. What This Service Includes */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                What This Service Includes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.includes.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200/70 p-4 rounded-xl flex items-start gap-3 text-sm text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Who It May Be Suitable For */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <Info className="w-5 h-5 text-sky-600" />
                Who It May Be Suitable For
              </h3>
              <ul className="space-y-2.5 bg-sky-50/50 border border-sky-100 p-6 rounded-2xl">
                {detail.suitableFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. What Pet Owners Should Know */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                What Pet Owners Should Know
              </h3>
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-6 space-y-3 text-sm text-slate-800">
                {detail.petOwnerNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-amber-700 font-bold">0{idx + 1}.</span>
                    <p className="leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Frequently Asked Questions */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-teal-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {detail.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 text-base flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {openFaqIndex === idx ? (
                        <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Tectonic SEO & Metadata Architecture Showcase */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded border border-teal-800">
                    Tectonic Technical SEO Engine
                  </span>
                  <h4 className="text-lg font-bold text-white font-display mt-1">
                    SEO Landing Page Metadata
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setSeoTab('preview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      seoTab === 'preview'
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    OG Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeoTab('meta')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      seoTab === 'meta'
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Meta Tags
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeoTab('schema')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      seoTab === 'schema'
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    JSON-LD Schema
                  </button>
                </div>
              </div>

              {seoTab === 'preview' && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-400 font-medium block">
                    Simulated Facebook / Open Graph Social Share Card:
                  </span>
                  <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 max-w-lg mx-auto">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-44 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4 space-y-1">
                      <span className="text-[10px] text-teal-400 uppercase tracking-widest font-mono">
                        entityveterinary.com
                      </span>
                      <h5 className="font-bold text-white text-sm">
                        {detail.seoTitle}
                      </h5>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {detail.seoMetaDescription}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {seoTab === 'meta' && (
                <div className="space-y-3 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-slate-300">
                  <p className="text-teal-400">&lt;title&gt;{detail.seoTitle}&lt;/title&gt;</p>
                  <p className="text-sky-300">&lt;meta name="description" content="{detail.seoMetaDescription}" /&gt;</p>
                  <p className="text-emerald-300">&lt;meta property="og:title" content="{detail.seoTitle}" /&gt;</p>
                  <p className="text-emerald-300">&lt;meta property="og:type" content="article" /&gt;</p>
                  <p className="text-emerald-300">&lt;meta property="og:image" content="{service.image}" /&gt;</p>
                  <p className="text-purple-300">&lt;link rel="canonical" href="https://entityveterinary.com/services/{service.id}" /&gt;</p>
                </div>
              )}

              {seoTab === 'schema' && (
                <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 text-teal-300 overflow-x-auto">
                  {detail.structuredDataJson}
                </pre>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Action Card */}
            <Card className="p-6 space-y-5 sticky top-24 border-teal-200/80 bg-gradient-to-b from-teal-50/50 to-white">
              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                  Ready to Book?
                </span>
                <h4 className="text-xl font-bold text-slate-900 font-display">
                  Schedule {service.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Select a convenient branch in Chattogram and receive confirmation from our team.
                </p>
              </div>

              <Button
                variant={service.isEmergency ? 'emergency' : 'primary'}
                size="md"
                onClick={() => onOpenBooking(service.id)}
                icon={Calendar}
                iconPosition="left"
                fullWidth
              >
                Book Appointment
              </Button>

              <div className="pt-3 border-t border-slate-200 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Verified Clinical Staff</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Sanitized Operating Suites</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Central Chattogram Locations</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      {/* Related Services */}
      <section className="bg-slate-100/70 py-12 border-t border-slate-200">
        <Container size="normal">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
                Explore Additional Care Options
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Related Veterinary Services
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((relService) => (
                <ServiceCard
                  key={relService.id}
                  service={relService}
                  onBook={(id) => onOpenBooking(id)}
                  onSelectDetail={(id) => onSelectServiceDetail(id)}
                  showDemoBadge={showDemoBadges}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final Appointment CTA */}
      <CTASection
        title={`Your Pet Deserves the Right ${service.title}`}
        subtitle="Contact Entity Veterinary Hospital to schedule a consultation or request emergency assistance."
        onBook={() => onOpenBooking(service.id)}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
