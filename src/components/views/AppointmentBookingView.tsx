import React, { useState } from 'react';
import { Page } from '../../types';
import { SERVICES, BRANCHES, DOCTORS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CTASection } from '../layout/CTASection';
import {
  User,
  HeartHandshake,
  Stethoscope,
  Building2,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Info,
  Loader2,
  Download,
  Copy,
  Check,
  MapPin,
  RefreshCw,
  Dog,
  Cat,
  Bird,
  HelpCircle,
  Zap
} from 'lucide-react';

export interface AppointmentBookingViewProps {
  onNavigate: (page: Page) => void;
  showDemoBadges: boolean;
}

export interface DetailedBookingFormState {
  // Step 1: Owner
  ownerName: string;
  phone: string;
  email: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';

  // Step 2: Pet
  petName: string;
  petType: 'dog' | 'cat' | 'bird' | 'exotic' | 'other';
  petAge: string;
  petGender: 'male' | 'female' | 'neutered' | 'unknown';

  // Step 3: Service
  serviceId: string;

  // Step 4: Branch
  branchId: string;

  // Step 5: Date & Time
  preferredDate: string;
  preferredTime: string;

  // Step 6: Reason
  notes: string;
}

const STEPS = [
  { id: 1, title: 'Pet Owner', short: 'Owner', icon: User, desc: 'Contact Details' },
  { id: 2, title: 'Pet Information', short: 'Pet', icon: HeartHandshake, desc: 'Pet Species & Age' },
  { id: 3, title: 'Select Service', short: 'Service', icon: Stethoscope, desc: 'Clinical Service' },
  { id: 4, title: 'Select Branch', short: 'Branch', icon: Building2, desc: 'Hospital Branch' },
  { id: 5, title: 'Date & Time', short: 'Schedule', icon: CalendarIcon, desc: 'Slot Selection' },
  { id: 6, title: 'Reason for Visit', short: 'Reason', icon: FileText, desc: 'Clinical Notes' },
  { id: 7, title: 'Confirmation', short: 'Summary', icon: CheckCircle2, desc: 'Demo Request' }
];

const TIME_SLOTS = [
  { time: '09:00 AM', period: 'Morning', status: 'available' },
  { time: '10:00 AM', period: 'Morning', status: 'available' },
  { time: '11:30 AM', period: 'Morning', status: 'available' },
  { time: '02:00 PM', period: 'Afternoon', status: 'available' },
  { time: '03:30 PM', period: 'Afternoon', status: 'available' },
  { time: '04:30 PM', period: 'Afternoon', status: 'available' },
  { time: '06:00 PM', period: 'Evening', status: 'available' },
  { time: '07:30 PM', period: 'Evening', status: 'available' }
];

export const AppointmentBookingView: React.FC<AppointmentBookingViewProps> = ({
  onNavigate,
  showDemoBadges
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitProgress, setSubmitProgress] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [bookingReference, setBookingReference] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Default initial date: tomorrow
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [form, setForm] = useState<DetailedBookingFormState>({
    ownerName: '',
    phone: '',
    email: '',
    preferredContact: 'phone',
    petName: '',
    petType: 'dog',
    petAge: '2 Years',
    petGender: 'male',
    serviceId: SERVICES[0].id,
    branchId: BRANCHES[0].id,
    preferredDate: tomorrowStr,
    preferredTime: '10:00 AM',
    notes: ''
  });

  // Handle Input Changes
  const updateField = <K extends keyof DetailedBookingFormState>(
    field: K,
    value: DetailedBookingFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!form.ownerName.trim()) newErrors.ownerName = 'Pet owner name is required.';
      if (!form.phone.trim()) newErrors.phone = 'Contact phone number is required.';
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (step === 2) {
      if (!form.petName.trim()) newErrors.petName = 'Pet name is required.';
      if (!form.petAge.trim()) newErrors.petAge = 'Pet age is required.';
    }

    if (step === 3) {
      if (!form.serviceId) newErrors.serviceId = 'Please select a clinical service.';
    }

    if (step === 4) {
      if (!form.branchId) newErrors.branchId = 'Please select a hospital branch.';
    }

    if (step === 5) {
      if (!form.preferredDate) newErrors.preferredDate = 'Please pick a preferred date.';
      if (!form.preferredTime) newErrors.preferredTime = 'Please select a time slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step Navigation
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 6) {
        // Trigger simulated submission
        simulateSubmission();
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, 7));
        window.scrollTo({ top: 150, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Simulated Submission with Progress
  const simulateSubmission = () => {
    setIsSubmitting(true);
    setSubmitProgress('Connecting to Entity Veterinary digital network...');

    setTimeout(() => {
      setSubmitProgress('Validating branch schedule & clinician availability...');
      setTimeout(() => {
        setSubmitProgress('Securing demo appointment reservation token...');
        setTimeout(() => {
          const randomRef = `EVH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
          setBookingReference(randomRef);
          setIsSubmitting(false);
          setCurrentStep(7);
          window.scrollTo({ top: 150, behavior: 'smooth' });
        }, 800);
      }, 700);
    }, 700);
  };

  const handleCopyReference = () => {
    if (bookingReference) {
      navigator.clipboard.writeText(bookingReference);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleResetForm = () => {
    setForm({
      ownerName: '',
      phone: '',
      email: '',
      preferredContact: 'phone',
      petName: '',
      petType: 'dog',
      petAge: '2 Years',
      petGender: 'male',
      serviceId: SERVICES[0].id,
      branchId: BRANCHES[0].id,
      preferredDate: tomorrowStr,
      preferredTime: '10:00 AM',
      notes: ''
    });
    setErrors({});
    setCurrentStep(1);
    setBookingReference('');
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Selected Service and Branch data
  const selectedServiceObj = SERVICES.find((s) => s.id === form.serviceId) || SERVICES[0];
  const selectedBranchObj = BRANCHES.find((b) => b.id === form.branchId) || BRANCHES[0];

  return (
    <div className="space-y-12 py-8">
      {/* 1. HERO HEADER */}
      <section className="bg-slate-900 text-white rounded-3xl mx-0 sm:mx-6 lg:mx-8 p-6 sm:p-12 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="normal" className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded border border-teal-800">
                Interactive Portal Feature
              </span>
              {showDemoBadges && (
                <span className="text-xs text-amber-300 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded font-mono">
                  💡 Frontend Demo Flow
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              Online Appointment System
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Demonstrating how Entity Veterinary Hospital can manage patient check-ins, service routing, and multi-branch booking via a structured digital wizard.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-teal-300 font-mono">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Concept created by Tectonic — Built to extend standard healthcare web portals</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. MULTI-STEP PROGRESS BAR */}
      <Container size="normal">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
            <span>Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}</span>
            <span className="text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
              {STEPS[currentStep - 1].desc}
            </span>
          </div>

          {/* Desktop & Tablet Step Bar */}
          <div className="hidden md:grid grid-cols-7 gap-2">
            {STEPS.map((s) => {
              const IconComp = s.icon;
              const isCompleted = currentStep > s.id;
              const isActive = currentStep === s.id;

              return (
                <button
                  key={s.id}
                  disabled={s.id > currentStep && currentStep !== 7}
                  onClick={() => {
                    if (s.id < currentStep && currentStep !== 7) {
                      setCurrentStep(s.id);
                    }
                  }}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md ring-2 ring-teal-500'
                      : isCompleted
                      ? 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 cursor-pointer'
                      : 'bg-slate-50 text-slate-400 border border-slate-200/60 opacity-60'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 text-xs font-bold ${
                    isActive
                      ? 'bg-white text-teal-800'
                      : isCompleted
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.id}
                  </div>
                  <span className="text-[11px] font-bold line-clamp-1">{s.short}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Step Bar */}
          <div className="md:hidden space-y-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-full transition-all duration-300"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>{STEPS[currentStep - 1].title}</span>
              <span>{currentStep} / {STEPS.length}</span>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. WIZARD STEP FORM CONTAINER */}
      <Container size="normal">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* ================= STEP 1: PET OWNER ================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                  Step 1 — Contact Information
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <User className="w-6 h-6 text-teal-600" />
                  Pet Owner Details
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Please enter your contact details so the Entity Veterinary hospital desk can confirm your appointment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pet Owner Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.ownerName}
                    onChange={(e) => updateField('ownerName', e.target.value)}
                    placeholder="e.g. Tanvir Ahmed / Sarah Rahman"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      errors.ownerName
                        ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                        : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
                    }`}
                  />
                  {errors.ownerName && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.ownerName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+880 1711-XXXXXX"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="owner@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        errors.email
                          ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                          : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Preferred Confirmation Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'phone', label: 'Phone Call', icon: Phone },
                      { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                      { id: 'email', label: 'Email', icon: Mail }
                    ].map((m) => {
                      const IconC = m.icon;
                      const isSelected = form.preferredContact === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => updateField('preferredContact', m.id as any)}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-teal-50 border-teal-600 text-teal-800 shadow-2xs ring-1 ring-teal-500'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <IconC className={`w-4 h-4 ${isSelected ? 'text-teal-700' : 'text-slate-500'}`} />
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: PET INFORMATION ================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                  Step 2 — Patient Profile
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <HeartHandshake className="w-6 h-6 text-teal-600" />
                  Pet Patient Details
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Tell us about your pet so our clinical team can prepare appropriate diagnostic or consultation equipment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pet Name */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pet Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.petName}
                    onChange={(e) => updateField('petName', e.target.value)}
                    placeholder="e.g. Milo / Coco / Rocky"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      errors.petName
                        ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                        : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
                    }`}
                  />
                  {errors.petName && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.petName}
                    </p>
                  )}
                </div>

                {/* Pet Species / Type */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pet Category / Species <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { id: 'dog', label: 'Dog', icon: Dog },
                      { id: 'cat', label: 'Cat', icon: Cat },
                      { id: 'bird', label: 'Bird', icon: Bird },
                      { id: 'exotic', label: 'Exotic Pet', icon: Zap },
                      { id: 'other', label: 'Other Species', icon: HelpCircle }
                    ].map((t) => {
                      const IconComp = t.icon;
                      const isSelected = form.petType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => updateField('petType', t.id as any)}
                          className={`p-3.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-teal-700 text-white border-teal-700 shadow-md ring-2 ring-teal-500'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <IconComp className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-teal-600'}`} />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pet Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.petAge}
                    onChange={(e) => updateField('petAge', e.target.value)}
                    placeholder="e.g. 6 Months / 3 Years"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      errors.petAge
                        ? 'border-red-400 bg-red-50/50 focus:ring-red-400'
                        : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
                    }`}
                  />
                  {errors.petAge && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.petAge}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pet Gender / Neutered Status
                  </label>
                  <select
                    value={form.petGender}
                    onChange={(e) => updateField('petGender', e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="male">Male (Intact)</option>
                    <option value="female">Female (Intact)</option>
                    <option value="neutered">Neutered / Spayed</option>
                    <option value="unknown">Not sure / Unspecified</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: SELECT SERVICE ================= */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                  Step 3 — Healthcare Service
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-teal-600" />
                  Select Service Required
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Choose from Entity Veterinary Hospital's core clinical, diagnostic, grooming, or boarding services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  const isSelected = form.serviceId === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => updateField('serviceId', s.id)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-600 shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded border border-teal-200 inline-block">
                            {s.category}
                          </span>
                          <h3 className="font-bold text-slate-900 font-display text-base">
                            {s.title}
                          </h3>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {s.shortDesc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                        {s.features.slice(0, 2).map((feat, idx) => (
                          <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-200">
                            • {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.serviceId && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.serviceId}
                </p>
              )}
            </div>
          )}

          {/* ================= STEP 4: SELECT BRANCH ================= */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                  Step 4 — Hospital Branch Node
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-teal-600" />
                  Select Entity Veterinary Branch
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Select your preferred branch location. All branch details are maintained in Entity Veterinary demo dataset.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BRANCHES.map((b) => {
                  const isSelected = form.branchId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => updateField('branchId', b.id)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block ${
                            isSelected
                              ? 'bg-teal-950 text-teal-300 border-teal-800'
                              : 'bg-teal-50 text-teal-800 border-teal-200'
                          }`}>
                            {b.area} — {b.city}
                          </span>
                          <h3 className={`font-bold font-display text-base ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {b.name}
                          </h3>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-teal-400 border-teal-400 text-slate-950' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className={`text-xs space-y-1.5 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>{b.address}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>{b.hours}</span>
                        </div>
                      </div>

                      <div className={`pt-2 border-t text-[11px] font-medium flex flex-wrap gap-1 ${
                        isSelected ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-500'
                      }`}>
                        {b.features.slice(0, 3).map((feat, i) => (
                          <span key={i} className={`px-2 py-0.5 rounded ${isSelected ? 'bg-slate-800 text-teal-300' : 'bg-slate-100'}`}>
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.branchId && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.branchId}
                </p>
              )}
            </div>
          )}

          {/* ================= STEP 5: DATE & TIME ================= */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                  Step 5 — Schedule Selection
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-teal-600" />
                  Preferred Date & Time Slot
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Select your preferred appointment date and available clinical time window.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Date Picker */}
                <div className="md:col-span-5 space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Select Appointment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={tomorrowStr}
                    value={form.preferredDate}
                    onChange={(e) => updateField('preferredDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
                  />
                  <p className="text-xs text-slate-500">
                    💡 <strong>Note:</strong> Appointments can be requested starting from tomorrow.
                  </p>
                </div>

                {/* Time Slot Grid */}
                <div className="md:col-span-7 space-y-3">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Select Time Window <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = form.preferredTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => updateField('preferredTime', slot.time)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isSelected
                              ? 'bg-teal-700 text-white border-teal-700 font-bold shadow-md ring-2 ring-teal-500'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium'
                          }`}
                        >
                          <div className="text-xs font-bold">{slot.time}</div>
                          <div className={`text-[10px] ${isSelected ? 'text-teal-200' : 'text-slate-400'}`}>
                            {slot.period}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6: REASON FOR VISIT ================= */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                  Step 6 — Clinical Context
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                  <FileText className="w-6 h-6 text-teal-600" />
                  Reason for Visit & Notes
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Write a short description of symptoms, vaccination history, or special requests for your pet.
                </p>
              </div>

              <div className="space-y-4">
                <textarea
                  rows={5}
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder="e.g. Milo needs annual booster vaccination and skin checkup. Experiencing mild itching on left ear..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium transition-all focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
                />

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 uppercase tracking-wider block">
                    Review Before Submitting Demo Request:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                    <p>• <strong>Pet Owner:</strong> {form.ownerName} ({form.phone})</p>
                    <p>• <strong>Pet:</strong> {form.petName} ({form.petType.toUpperCase()})</p>
                    <p>• <strong>Service:</strong> {selectedServiceObj.title}</p>
                    <p>• <strong>Branch:</strong> {selectedBranchObj.name}</p>
                    <p>• <strong>Date & Time:</strong> {form.preferredDate} at {form.preferredTime}</p>
                  </div>
                </div>
              </div>

              {/* Submitting Progress Indicator */}
              {isSubmitting && (
                <div className="bg-teal-900 text-white p-5 rounded-2xl border border-teal-800 space-y-3 animate-pulse">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 text-teal-300 animate-spin shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm font-display text-white">
                        Processing Demo Appointment Request
                      </h4>
                      <p className="text-xs text-teal-200">{submitProgress}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 7: CONFIRMATION & SUMMARY ================= */}
          {currentStep === 7 && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-emerald-50 border-2 border-emerald-300/80 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-200 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300 inline-block mb-1">
                        Request Received
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-display">
                        Appointment Request Submitted
                      </h2>
                    </div>
                  </div>

                  <div className="bg-white border border-emerald-300 px-4 py-2.5 rounded-2xl text-center self-stretch sm:self-auto">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Reference Token</span>
                    <span className="text-base font-black font-mono text-emerald-800">{bookingReference}</span>
                  </div>
                </div>

                {/* Detailed Summary Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-emerald-200/90 shadow-2xs">
                  {/* Left Column: Owner & Pet */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Pet Owner Information
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">{form.ownerName}</h4>
                      <p className="text-xs text-slate-600">Phone: <strong>{form.phone}</strong></p>
                      {form.email && <p className="text-xs text-slate-600">Email: {form.email}</p>}
                      <p className="text-xs text-slate-600">Preferred Contact: <strong className="capitalize">{form.preferredContact}</strong></p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Pet Patient Profile
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">{form.petName}</h4>
                      <p className="text-xs text-slate-600 capitalize">Species: {form.petType} • Age: {form.petAge}</p>
                      <p className="text-xs text-slate-600 capitalize">Gender: {form.petGender}</p>
                    </div>
                  </div>

                  {/* Right Column: Service, Branch & Schedule */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Requested Clinical Service
                      </span>
                      <h4 className="font-bold text-teal-800 text-base">{selectedServiceObj.title}</h4>
                      <p className="text-xs text-slate-600">{selectedServiceObj.shortDesc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Hospital Branch Node
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">{selectedBranchObj.name}</h4>
                      <p className="text-xs text-slate-600">{selectedBranchObj.area} — {selectedBranchObj.city}</p>
                      <p className="text-xs text-slate-600 mt-1">Schedule: <strong>{form.preferredDate}</strong> at <strong>{form.preferredTime}</strong></p>
                    </div>
                  </div>

                  {/* Notes */}
                  {form.notes && (
                    <div className="md:col-span-2 pt-3 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Owner Clinical Note
                      </span>
                      <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 italic">
                        "{form.notes}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Explicit Disclaimer */}
                <div className="bg-amber-100/80 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-950">Frontend Demo Disclaimer:</strong>
                    Your appointment request has been processed in demonstration mode. This is a frontend prototype built by Tectonic for Entity Veterinary Hospital. No actual calendar slot or clinical doctor shift has been finalized.
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyReference}
                    icon={copiedCode ? Check : Copy}
                    iconPosition="left"
                    className="bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                  >
                    {copiedCode ? 'Reference Copied!' : 'Copy Reference Code'}
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleResetForm}
                    icon={RefreshCw}
                    iconPosition="left"
                  >
                    Book Another Demo Appointment
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate('home')}
                    className="text-slate-700 hover:text-slate-900"
                  >
                    Return to Home Overview
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP NAVIGATION BUTTONS (Steps 1 to 6) ================= */}
          {currentStep < 7 && (
            <div className="pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              {currentStep > 1 ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  icon={ArrowLeft}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={isSubmitting}
                icon={currentStep === 6 ? Sparkles : ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                {isSubmitting
                  ? 'Processing...'
                  : currentStep === 6
                  ? 'Submit Demo Request'
                  : 'Next Step'}
              </Button>
            </div>
          )}
        </div>
      </Container>

      {/* 4. CALL TO ACTION */}
      <CTASection
        title="Need Instant Emergency Assistance?"
        subtitle="Entity Veterinary Hospital operates 24/7 triage teams in Chattogram for critical emergency cases."
        onBook={() => setCurrentStep(1)}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
