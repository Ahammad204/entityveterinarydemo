import React from 'react';
import { Page } from '../../types';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CLIENT_TECTONIC_NOTES } from '../../data/mockData';
import { 
  Stethoscope, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  ExternalLink, 
  Facebook, 
  Globe, 
  Calendar,
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';

export interface FooterProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <Container size="wide">
        {/* Pre-Footer Appointment Banner */}
        <div className="bg-gradient-to-r from-teal-900/80 via-slate-900 to-teal-950 border border-teal-800/80 rounded-2xl p-8 mb-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="verified" size="sm">
                Chattogram Veterinary Care
              </Badge>
              <Badge variant="demo" size="sm">Demo Concept</Badge>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Ready to schedule your pet’s consultation?
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Experience modern clinical diagnostics, compassionate surgery, and 24/7 emergency response at Entity Veterinary.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="lg"
              icon={Calendar}
              onClick={onOpenBooking}
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-700 text-white hover:bg-slate-800"
              onClick={() => onNavigate('contact')}
            >
              Contact Hospital
            </Button>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1 & 2: Entity Veterinary Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold font-display text-white tracking-tight">
                  ENTITY VETERINARY
                </h4>
                <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                  Hospital & Healthcare Center
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing compassionate, modern, and trustworthy veterinary healthcare across Chattogram, Bangladesh. Led by Dr. Partha (Co-Founder & CEO) and Dr. Aslam Hossain (COO).
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-amber-400 bg-amber-950/40 border border-amber-900/60 p-2.5 rounded-lg max-w-sm">
                <Info className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Client Demo Concept:</strong> Built by <strong>Tectonic</strong> to demonstrate digital UX strategy for Entity Veterinary Hospital.
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Navigation
            </h5>
            <ul className="space-y-2 text-sm">
              {['home', 'about', 'services', 'doctors', 'branches', 'appointment', 'dashboard', 'blog', 'shop', 'contact', 'sitemap'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => {
                      onNavigate(page as Page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-teal-400 transition-colors capitalize text-slate-400 hover:underline text-left"
                  >
                    {page === 'sitemap' ? 'Architecture & Sitemap' : page === 'appointment' ? 'Online Appointment' : page === 'dashboard' ? 'Pet Owner Portal' : page === 'shop' ? 'Demo Pet Shop' : page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Clinical Services */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Clinical Services
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>24/7 Emergency & Triage</li>
              <li>Veterinary Surgery & Anesthesia</li>
              <li>Vaccination & Wellness Care</li>
              <li>In-House Diagnostics & Imaging</li>
              <li>Pet Grooming & Dental Care</li>
              <li>Veterinary Pharmacy & Diets</li>
            </ul>
          </div>

          {/* Column 5: Official Links & Presence */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Official Presence
            </h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a
                href={CLIENT_TECTONIC_NOTES.officialLinks.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg text-slate-200 transition-colors border border-slate-700"
              >
                <Globe className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="truncate">entityveterinary.com</span>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
              </a>

              <a
                href={CLIENT_TECTONIC_NOTES.officialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg text-slate-200 transition-colors border border-slate-700"
              >
                <Facebook className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">Official Facebook Page</span>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
              </a>

              <a
                href={CLIENT_TECTONIC_NOTES.officialLinks.googleSites}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-2.5 rounded-lg text-slate-200 transition-colors border border-slate-700"
              >
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">Google Sites Presence</span>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Chattogram, Bangladesh</span>
              </p>
              <p className="text-slate-500 italic">
                Exact addresses & hotlines to be confirmed.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Tectonic Agency Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Entity Veterinary Hospital. Concept & Website Demo designed by{' '}
            <strong className="text-teal-400 font-semibold">Tectonic</strong>.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer" onClick={() => onNavigate('sitemap')}>
              Sitemap Architecture
            </span>
            <span>•</span>
            <span className="text-amber-400">Demo Content — Non-Production Concept</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
