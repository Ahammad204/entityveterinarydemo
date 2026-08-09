import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Facebook, 
  FileText, 
  Stethoscope, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  TrendingUp,
  MousePointerClick
} from 'lucide-react';

export interface ContentConversionJourneyProps {
  onNavigate?: (page: string, param?: string) => void;
  onOpenBooking?: (serviceId?: string, doctorId?: string) => void;
  className?: string;
}

export const ContentConversionJourney: React.FC<ContentConversionJourneyProps> = ({
  onNavigate,
  onOpenBooking,
  className = ''
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: 'Facebook Post',
      subtitle: 'Social Awareness & Engagement',
      icon: Facebook,
      color: 'bg-blue-600 text-white',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      demoBadge: 'Demo Social Content',
      headline: 'Monsoon Pet Care Alert for Chattogram Pet Parents!',
      body: 'Did you know monsoon humidity increases paw fungal infections by 40% in Chattogram? Read our latest vet care guide to safeguard your pet.',
      ctaText: 'Read Full Guide on Website →',
      meta: 'Targeted Local Outreach • 2,400+ Impressions in Chattogram'
    },
    {
      step: 2,
      title: 'Website Article',
      subtitle: 'Educational Value & Clinical Authority',
      icon: FileText,
      color: 'bg-teal-700 text-white',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-200',
      demoBadge: 'Organic Educational Content',
      headline: 'Monsoon Pet Care Guide: Humidity & Fungal Prevention',
      body: 'Detailed clinical guide explaining monsoon skin hygiene, ear cleaning protocols, and signs of fungal infections written by Dr. Partha & Dr. Aslam Hossain.',
      ctaText: 'View Preventive Dermatology Service →',
      meta: 'Average Read Time: 3.5 Mins • High Local Engagement'
    },
    {
      step: 3,
      title: 'Related Service',
      subtitle: 'Targeted Clinical Recommendation',
      icon: Stethoscope,
      color: 'bg-emerald-700 text-white',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      demoBadge: 'Verified Clinical Service',
      headline: 'Preventive Vaccination & Dermatology Care',
      body: 'Specialized dermatological screening, skin scrapings, and allergy management conducted at Chattogram Main Branch & Agrabad Branch.',
      ctaText: 'Schedule Clinical Evaluation →',
      meta: 'Led by Senior Veterinarians • Available 7 Days a Week'
    },
    {
      step: 4,
      title: 'Appointment',
      subtitle: 'Patient Conversion & Hospital Care',
      icon: Calendar,
      color: 'bg-slate-900 text-white',
      badgeColor: 'bg-slate-100 text-slate-900 border-slate-300',
      demoBadge: 'Instant Online Booking',
      headline: 'Confirmed Veterinary Appointment at Entity Hospital',
      body: 'Pet owner selects preferred branch, time slot, and attending doctor. Receives instant SMS confirmation and automated pre-visit instructions.',
      ctaText: 'Open Appointment Scheduler',
      meta: '38% Conversion Rate from Educational Article Traffic'
    }
  ];

  const handleStepAction = (stepNumber: number) => {
    setActiveStep(stepNumber);
    if (stepNumber === 1) {
      window.open('https://www.facebook.com/share/19JJaRpM7w/', '_blank', 'noopener,noreferrer');
    } else if (stepNumber === 2) {
      if (onNavigate) onNavigate('blog-detail', 'monsoon-pet-care-chattogram');
    } else if (stepNumber === 3) {
      if (onNavigate) onNavigate('service-detail', 'preventive-vaccination');
    } else if (stepNumber === 4) {
      if (onOpenBooking) onOpenBooking('preventive-vaccination');
    }
  };

  return (
    <div className={`bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="sm" icon={<TrendingUp className="w-3.5 h-3.5 text-teal-700" />}>
              Content-to-Conversion Strategy
            </Badge>
            <Badge variant="demo" size="sm">Demo Social Content</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Social Media to Patient Conversion Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            How educational social posts connect pet owners with evidence-based articles, relevant clinical services, and direct appointment bookings.
          </p>
        </div>

        <a
          href="https://www.facebook.com/share/19JJaRpM7w/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all shadow-md shrink-0"
        >
          <Facebook className="w-4 h-4 fill-current" />
          <span>Follow Entity Veterinary on Facebook</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* Visual Flow Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const isSelected = activeStep === item.step;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`cursor-pointer transition-all duration-300 rounded-2xl p-5 border relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/95 border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/30 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              {/* Step Badge & Arrow */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    Step 0{item.step}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono text-teal-400 font-semibold uppercase block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-base font-bold text-white font-display mt-0.5">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.body}
                </p>

                {/* Post snippet card for Step 1 */}
                {item.step === 1 && (
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-blue-900/50 space-y-1.5">
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50 inline-block">
                      Demo Social Content
                    </span>
                    <p className="text-[11px] text-slate-200 font-medium leading-snug">
                      "{item.headline}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  {isSelected ? 'Currently Viewing' : 'Click to test'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStepAction(item.step);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span>Test Step</span>
                  <MousePointerClick className="w-3 h-3" />
                </button>
              </div>

              {!isLast && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-teal-500/70">
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Step Detail Simulator Box */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <strong className="text-sm text-white font-display">
              Funnel Active Step Inspection: {steps[activeStep - 1].title}
            </strong>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60">
            {steps[activeStep - 1].demoBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h4 className="text-base font-bold text-teal-300 font-display">
              {steps[activeStep - 1].headline}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {steps[activeStep - 1].body}
            </p>
            <p className="text-xs font-mono text-slate-400 pt-1">
              📊 Performance Metric: <span className="text-teal-400">{steps[activeStep - 1].meta}</span>
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-stretch justify-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => handleStepAction(activeStep)}
              className="w-full justify-center shadow-lg shadow-teal-500/20"
            >
              {steps[activeStep - 1].ctaText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
