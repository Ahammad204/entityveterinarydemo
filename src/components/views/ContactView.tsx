import React, { useState } from 'react';
import { Page, Branch } from '../../types';
import { CLIENT_TECTONIC_NOTES, BRANCHES } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { CTASection } from '../layout/CTASection';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Facebook,
  Instagram,
  ExternalLink,
  Loader2,
  Calendar,
  Building2,
  Sparkles,
  ShieldAlert,
  Navigation,
  MessageSquare,
  User,
  HelpCircle,
  Check
} from 'lucide-react';

export interface ContactViewProps {
  onNavigate: (page: Page, param?: string) => void;
  onOpenBooking: () => void;
  showDemoBadges: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate,
  onOpenBooking,
  showDemoBadges
}) => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Selected Branch for Map Section
  const [selectedMapBranchId, setSelectedMapBranchId] = useState<string>(BRANCHES[0].id);

  const selectedMapBranch = BRANCHES.find((b) => b.id === selectedMapBranchId) || BRANCHES[0];

  // Form Validation Logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select or enter a message subject.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay for loading state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const { breadcrumbs } = getPageMetadata('contact');

  return (
    <div className="space-y-12 sm:space-y-16 py-6 animate-fade-in relative">
      {/* Breadcrumb Navigation */}
      <Container size="normal">
        <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
      </Container>

      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="normal" className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3 py-1 rounded border border-teal-800/80 font-mono">
                Client Support & Communications
              </span>
              {showDemoBadges && (
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/80">
                  Demo
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              Let's Talk About Your Pet's Care
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Whether you have questions regarding veterinary treatments, require surgical guidance, need assistance booking an appointment, or want to learn more about our branches in Chattogram, our dedicated clinical support team is here to assist you.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-400" />
                Entity Veterinary Hospital — Chattogram
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-teal-400" />
                entityveterinary.com
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. EMERGENCY CONTACT CTA BANNER */}
      <Container size="normal">
        <div className="bg-rose-50 border-2 border-rose-300/90 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-rose-950">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-sm shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded font-mono">
                  24/7 Triage Notice
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-rose-950">
                Pet Emergency Triage Guidance
              </h3>
              <p className="text-xs sm:text-sm text-rose-900 leading-relaxed max-w-2xl">
                If your companion is suffering from acute physical trauma, difficulty breathing, toxic substance ingestion, or severe weakness, proceed immediately to hospital triage.
              </p>
              <div className="pt-2 text-xs font-bold text-rose-800 font-mono bg-rose-100/80 p-2.5 rounded-xl border border-rose-200/80 inline-block">
                Emergency contact information to be confirmed.
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={onOpenBooking}
              icon={Calendar}
              iconPosition="left"
              className="bg-rose-800 hover:bg-rose-700 text-white font-bold"
            >
              Book Urgent Visit
            </Button>
          </div>
        </div>
      </Container>

      {/* 3. MAIN CONTACT FORM & SIDEBAR */}
      <Container size="normal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
                  Direct Client Message
                </span>
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900 mt-1">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill out the form below with your questions or consultation requests.
              </p>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                    Message Received (Demo)
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your inquiry regarding <strong>"{formData.subject}"</strong> has been recorded in this frontend demonstration.
                  </p>
                </div>

                {/* Submitted Summary Box */}
                <div className="bg-white p-4 rounded-xl border border-emerald-200 text-left text-xs space-y-1.5 font-mono text-slate-700 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name:</span>
                    <span className="font-bold text-slate-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-bold text-slate-900">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-bold text-slate-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subject:</span>
                    <span className="font-bold text-slate-900">{formData.subject}</span>
                  </div>
                </div>

                {/* Frontend Demo Notice */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-950 flex items-start gap-2 text-left max-w-md mx-auto font-medium">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Frontend Demonstration Note:</strong> This is a frontend presentation interface only. No actual email or SMS message was transmitted.
                  </span>
                </div>

                <div className="pt-2">
                  <Button variant="outline" size="sm" onClick={handleResetForm}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Tanvir Ahmed"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-slate-900 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-slate-300 focus:ring-teal-500 bg-white'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="+880 18XX-XXXXXX"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.phone
                            ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                            : 'border-slate-300 focus:ring-teal-500 bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-600 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="name@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                            : 'border-slate-300 focus:ring-teal-500 bg-white'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <HelpCircle className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Appointment Help">Appointment Booking Assistance</option>
                      <option value="Surgical Care Inquiry">Surgical & Anesthesia Services</option>
                      <option value="Pharmacy & Diet Questions">Pharmacy & Clinical Diets</option>
                      <option value="Feedback or Suggestion">Feedback or Suggestion</option>
                    </select>
                  </div>
                  {errors.subject && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Describe your inquiry or question regarding your pet..."
                    className={`w-full p-3.5 rounded-xl border text-xs text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.message
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-teal-500 bg-white'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  icon={isSubmitting ? Loader2 : Send}
                  iconPosition="right"
                  className="w-full justify-center bg-teal-900 hover:bg-teal-800 text-white font-bold"
                >
                  {isSubmitting ? 'Sending Demo Message...' : 'Send Message'}
                </Button>

                <p className="text-[10px] text-slate-400 text-center font-mono">
                  This form is a frontend demonstration only. No real emails are sent.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Hospital Details & Verified Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Verified Digital Channels Card */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono block">
                  Official Channels
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-1">
                  Entity Veterinary Hospital
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Connect with us through verified official web channels.
                </p>
              </div>

              {/* Verified Links List */}
              <div className="space-y-3 text-xs">
                {/* Official Website */}
                <a
                  href={CLIENT_TECTONIC_NOTES.officialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-800 hover:bg-slate-750 rounded-2xl border border-slate-700/80 text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-950 text-teal-400 rounded-xl border border-teal-800">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-white font-bold font-display">Official Website</strong>
                      <span className="text-[11px] text-slate-400 font-mono">entityveterinary.com</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-400 transition-colors" />
                </a>

                {/* Facebook Page */}
                <a
                  href={CLIENT_TECTONIC_NOTES.officialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-800 hover:bg-slate-750 rounded-2xl border border-slate-700/80 text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-950 text-sky-400 rounded-xl border border-sky-800">
                      <Facebook className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-white font-bold font-display">Facebook Page</strong>
                      <span className="text-[11px] text-slate-400 font-mono">Verified Facebook Handle</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
                </a>

                {/* Google Sites */}
                <a
                  href={CLIENT_TECTONIC_NOTES.officialLinks.googleSites}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-800 hover:bg-slate-750 rounded-2xl border border-slate-700/80 text-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-900 text-slate-300 rounded-xl border border-slate-700">
                      <Globe className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <strong className="block text-white font-bold font-display">Google Sites Portal</strong>
                      <span className="text-[11px] text-slate-400 font-mono">Official Info Hub</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-400 transition-colors" />
                </a>

                {/* Instagram Note */}
                <div className="p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/50 text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-950/60 text-pink-400 rounded-xl border border-pink-900/60">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-white text-xs font-bold">Instagram</strong>
                      <span className="text-[11px] text-slate-400">Official page pending client confirmation</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/80">
                    Pending
                  </span>
                </div>
              </div>

              {/* Tectonic Production Concept Note */}
              <div className="p-4 bg-teal-950/60 border border-teal-800/80 rounded-2xl space-y-1 text-xs text-teal-200">
                <strong className="font-bold block text-teal-300">Tectonic Communications System</strong>
                <p className="text-[11px] text-teal-200/90 leading-relaxed">
                  Designed for Entity Veterinary Hospital to integrate direct WhatsApp Business messaging, SMS appointment reminders, and automated client email notifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. BRANCH CONTACT CARDS */}
      <Container size="normal">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
              Hospital Locations
            </span>
            <h2 className="text-2xl font-bold font-display text-slate-900 mt-1">
              Branch Contact Cards
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
              Contact details for Entity Veterinary Hospital locations. Placeholders indicate details awaiting final client confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRANCHES.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5 flex flex-col justify-between hover:border-teal-300 transition-colors"
              >
                <div className="space-y-4">
                  {/* Top Branch Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 inline-block mb-1 font-mono">
                        {branch.area}
                      </span>
                      <h3 className="text-lg font-bold font-display text-slate-900 leading-snug">
                        {branch.name}
                      </h3>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0 font-mono ${
                        branch.status === 'main'
                          ? 'bg-slate-900 text-teal-300'
                          : branch.status === 'upcoming'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {branch.status === 'main' ? 'Main Hub' : branch.status === 'upcoming' ? 'Expansion' : 'Branch Node'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {branch.description}
                  </p>

                  {/* Contact Info List with Placeholders */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs font-mono">
                    <div className="flex items-start gap-2.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-sans font-semibold text-[11px]">Address:</strong>
                        <span className="text-slate-600">{branch.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-700">
                      <Phone className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-sans font-semibold text-[11px]">Phone:</strong>
                        <span className="text-slate-600">{branch.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-700">
                      <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-sans font-semibold text-[11px]">Opening Hours:</strong>
                        <span className="text-slate-600">{branch.hours}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-rose-800 bg-rose-50/80 p-2.5 rounded-xl border border-rose-200/80 font-sans text-[11px]">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Emergency Line:</strong>
                        <span>Emergency contact information to be confirmed.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate('branch-detail', branch.id)}
                    className="text-xs font-bold text-teal-800 hover:text-teal-900 hover:underline flex items-center gap-1"
                  >
                    <span>View Branch Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <Button
                    variant="outline"
                    size="xs"
                    onClick={onOpenBooking}
                    className="shrink-0 font-bold"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* 5. GOOGLE MAPS SECTION */}
      <Container size="normal">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
                  Location Map Preview
                </span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white mt-1">
                Hospital Google Maps Placeholders
              </h2>
            </div>

            {/* Branch Map Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {BRANCHES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedMapBranchId(b.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedMapBranchId === b.id
                      ? 'bg-teal-500 text-slate-950 font-extrabold shadow-2xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {b.area}
                </button>
              ))}
            </div>
          </div>

          {/* Map Frame Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Map Visual Placeholder */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative min-h-[320px] flex flex-col items-center justify-center p-8 text-center space-y-4 group">
              {/* Grid Background Effect */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#14b8a6 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Pin */}
              <div className="relative z-10 w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center border-2 border-teal-500/50 shadow-lg group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-teal-400 animate-bounce-subtle" />
              </div>

              <div className="relative z-10 max-w-md space-y-1">
                <span className="text-[10px] font-bold font-mono text-teal-400 uppercase tracking-widest block">
                  Map Location Placeholder
                </span>
                <h3 className="text-lg font-bold font-display text-white">
                  {selectedMapBranch.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedMapBranch.address}
                </p>
              </div>

              <div className="relative z-10 pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedMapBranch.name + ' Chattogram')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-2 shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Map Footer Note */}
              <span className="absolute bottom-3 right-3 text-[10px] text-slate-500 font-mono">
                Chattogram Coordinates Placeholder: 22.3569° N, 91.7832° E
              </span>
            </div>

            {/* Map Branch Sidebar Info */}
            <div className="lg:col-span-4 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 font-mono block">
                  Selected Location Details
                </span>

                <h4 className="text-base font-bold text-white font-display">
                  {selectedMapBranch.name}
                </h4>

                <div className="space-y-2 text-xs text-slate-300 font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">City / Region:</span>
                    <span className="text-white font-bold">{selectedMapBranch.city}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Address Placeholder:</span>
                    <span>{selectedMapBranch.address}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Phone:</span>
                    <span>{selectedMapBranch.phone}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Hours:</span>
                    <span>{selectedMapBranch.hours}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={onOpenBooking}
                icon={Calendar}
                iconPosition="left"
                className="w-full justify-center border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                Schedule Visit Here
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* 6. APPOINTMENT CTA SECTION */}
      <CTASection
        title="Book an Appointment"
        subtitle="Schedule a veterinary consultation, wellness checkup, spay/neuter service, or dental examination with our healthcare team."
        onBook={onOpenBooking}
        onContact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
};
