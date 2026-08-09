import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../../types';
import { Container } from '../ui/Container';
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
  HeartPulse,
  LayoutDashboard,
  Shield,
  User,
  ChevronDown
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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: Array<{ id: Page; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'branches', label: 'Branches' },
    { id: 'blog', label: 'Blog' },
    { id: 'shop', label: 'Demo Shop' },
    { id: 'appointment', label: 'Online Booking' },
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
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onToggleDemoBadges}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded transition-colors flex items-center gap-1 border border-slate-700"
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
        <Container size="wide" className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none min-h-[44px] shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-600/20 group-hover:bg-teal-700 transition-colors shrink-0">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="hidden sm:block">
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
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 xl:px-3 py-2 text-[13px] font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80'
                      : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Side: User Dropdown */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-fade-in z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Portals</p>
                  </div>
                  <button
                    onClick={() => { handleNavClick('dashboard'); setUserDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    Pet Portal
                  </button>
                  <button
                    onClick={() => { handleNavClick('admin'); setUserDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    Admin Portal
                  </button>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <a
                      href="/doctor/login"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
                    >
                      <HeartPulse className="w-4 h-4 text-amber-500" />
                      Doctor Portal
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl animate-fade-in max-h-[85vh] overflow-y-auto">
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

            {/* Mobile Portals Section */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2">Portals</p>
              <button
                onClick={() => { handleNavClick('dashboard'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500" />
                Pet Portal
              </button>
              <button
                onClick={() => { handleNavClick('admin'); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Shield className="w-4 h-4 text-slate-500" />
                Admin Portal
              </button>
              <a
                href="/doctor/login"
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors"
              >
                <HeartPulse className="w-4 h-4 text-amber-500" />
                Doctor Portal
              </a>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors mt-3"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
