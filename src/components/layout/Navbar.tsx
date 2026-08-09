import React, { useState } from 'react';
import { Page } from '../../types';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  PhoneCall, 
  MapPin, 
  Menu, 
  X, 
  Calendar, 
  Stethoscope, 
  Sparkles, 
  Info,
  ChevronRight,
  ShieldCheck,
  Globe,
  HeartPulse
} from 'lucide-react';

export interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenBooking: (serviceId?: string) => void;
  showDemoBadges: boolean;
  onToggleDemoBadges: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  showDemoBadges,
  onToggleDemoBadges
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: Page; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'branches', label: 'Branches' },
    { id: 'blog', label: 'Blog' },
    { id: 'shop', label: 'Demo Shop' },
    { id: 'appointment', label: 'Online Booking' },
    { id: 'dashboard', label: 'Pet Portal' },
    { id: 'admin', label: 'Admin (Demo)' },
    { id: 'contact', label: 'Contact' },
    { id: 'sitemap', label: 'Architecture' }
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-2xs">
      {/* Top Utility & Emergency Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
        <Container size="wide" className="flex flex-wrap items-center justify-between gap-2">
          {/* Left: Location & Emergency */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Chattogram, Bangladesh</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-4 text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>24/7 Emergency Triage:</span>
              <span className="text-red-400 font-bold">[Hotline TBC]</span>
            </div>
          </div>

          {/* Right: Tectonic Presentation Controls */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onToggleDemoBadges}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded transition-colors flex items-center gap-1 border border-slate-700"
              title="Toggle 'Demo Content' and 'Information to be confirmed' markers"
            >
              <Info className="w-3 h-3 text-amber-400" />
              <span>Demo Labels: {showDemoBadges ? 'ON' : 'OFF'}</span>
            </button>

            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/80">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Concept by Tectonic</span>
            </span>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <div className="py-3.5">
        <Container size="wide" className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none min-h-[44px]"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-600/20 group-hover:bg-teal-700 transition-colors shrink-0">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight font-display group-hover:text-teal-700 transition-colors">
                  ENTITY VETERINARY
                </span>
                <Badge variant="verified" size="sm" className="hidden lg:inline-flex">
                  Hospital
                </Badge>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide truncate max-w-[180px] sm:max-w-none">
                Premier Animal Healthcare • Chattogram
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isSpecial = item.id === 'sitemap';

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80'
                      : isSpecial
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 text-xs italic'
                      : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="/doctor/login"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              Doctor Portal
            </a>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick('contact')}
              className="bg-white"
            >
              Contact Us
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Calendar}
              onClick={() => onOpenBooking()}
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl animate-fade-in max-h-[80vh] overflow-y-auto">
          <Container className="py-4 space-y-3">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl text-left transition-colors ${
                      isActive
                        ? 'bg-teal-600 text-white font-bold'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <a
                href="/doctor/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
              >
                <HeartPulse className="w-4 h-4" />
                Doctor Portal (Demo)
              </a>

              <Button
                variant="primary"
                size="lg"
                icon={Calendar}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                fullWidth
              >
                Book Appointment
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavClick('contact')}
                fullWidth
                className="bg-white"
              >
                Contact Us
              </Button>

              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between text-xs text-red-800 mt-2">
                <span className="font-semibold">24/7 Emergency Triage</span>
                <span className="font-bold text-red-700">[Hotline TBC]</span>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
