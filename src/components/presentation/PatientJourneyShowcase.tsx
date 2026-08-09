import React from 'react';
import { Page } from '../../types';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Compass,
  Stethoscope,
  Users,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export interface PatientJourneyShowcaseProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string) => void;
  showDemoBadges?: boolean;
}

export const PatientJourneyShowcase: React.FC<PatientJourneyShowcaseProps> = ({
  onNavigate,
  onOpenBooking,
  showDemoBadges = true
}) => {
  const steps = [
    {
      number: '01',
      id: 'discover',
      title: 'Discover',
      subtitle: 'Entity Veterinary Care',
      desc: 'Explore our 24/7 emergency response, hospital facilities, and clinical healthcare standards.',
      icon: Compass,
      actionLabel: 'Discover Hospital',
      action: () => onNavigate('about'),
      badgeText: 'Verified Leadership'
    },
    {
      number: '02',
      id: 'services',
      title: 'Explore Services',
      subtitle: 'Clinical Capabilities',
      desc: 'Browse specialized care options including surgeries, diagnostics, ICU, and routine wellness.',
      icon: Stethoscope,
      actionLabel: 'View All Services',
      action: () => onNavigate('services'),
      badgeText: 'Catalog Preview'
    },
    {
      number: '03',
      id: 'team',
      title: 'Meet the Team',
      subtitle: 'Doctors & Leadership',
      desc: 'Get to know Dr. Partha, Dr. Aslam Hossain, and our qualified veterinary medical team.',
      icon: Users,
      actionLabel: 'Meet Clinical Team',
      action: () => onNavigate('doctors'),
      badgeText: 'Doctor Bios'
    },
    {
      number: '04',
      id: 'branch',
      title: 'Choose Branch',
      subtitle: 'Chattogram Locations',
      desc: 'Locate hospital branches across Chattogram equipped with diagnostics and pet care suites.',
      icon: MapPin,
      actionLabel: 'Find Locations',
      action: () => onNavigate('branches'),
      badgeText: 'Info to be confirmed'
    },
    {
      number: '05',
      id: 'booking',
      title: 'Book Appointment',
      subtitle: 'Instant Scheduling',
      desc: 'Schedule consultations online with step-by-step branch, doctor, and date selection.',
      icon: Calendar,
      actionLabel: 'Book Appointment',
      action: () => onOpenBooking(),
      badgeText: 'Live Booking Flow',
      highlighted: true
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-14 rounded-3xl mx-0 sm:mx-6 lg:mx-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide" className="relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="accent" size="sm" icon={<Sparkles className="w-3.5 h-3.5 text-teal-700" />}>
                Proposed Digital Experience Journey
              </Badge>
              {showDemoBadges && (
                <Badge variant="demo" size="sm">
                  Tectonic Client Presentation
                </Badge>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Designed for Pet Owners: The Patient Journey
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              A seamless 5-step digital path connecting pet owners in Chattogram directly with Entity Veterinary Hospital's healthcare services and clinical team.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={Calendar}
              onClick={() => onOpenBooking()}
              className="shadow-lg shadow-teal-600/30"
            >
              Start Online Booking
            </Button>
          </div>
        </div>

        {/* 5-Step Connected Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between space-y-4 group relative ${
                  step.highlighted
                    ? 'bg-gradient-to-b from-teal-950/90 to-slate-900 border-teal-500/60 shadow-lg shadow-teal-950/50'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/70 hover:border-slate-600'
                }`}
              >
                {/* Step Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/60">
                      Step {step.number}
                    </span>

                    {showDemoBadges && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {step.badgeText}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <div
                      className={`p-2.5 rounded-xl border shrink-0 ${
                        step.highlighted
                          ? 'bg-teal-500 text-slate-950 border-teal-400'
                          : 'bg-slate-900 text-teal-400 border-slate-700 group-hover:border-teal-500/50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold font-display text-white leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-teal-300/80 font-mono">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {step.desc}
                  </p>
                </div>

                {/* Step Action Button */}
                <div className="pt-3 border-t border-slate-700/50">
                  <button
                    onClick={step.action}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors focus:outline-none min-h-[38px] ${
                      step.highlighted
                        ? 'bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold'
                        : 'bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-950 border border-slate-700'
                    }`}
                  >
                    <span>{step.actionLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary Bar */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              <strong>Tectonic Architecture Proposal:</strong> Integrated web platform with WhatsApp Triage, HMS Webhooks, and Appointment Scheduling.
            </span>
          </div>

          <span className="text-[11px] font-mono text-amber-300 bg-amber-950/80 px-3 py-1 rounded border border-amber-800/60 shrink-0">
            Client Presentation Concept
          </span>
        </div>
      </Container>
    </section>
  );
};
