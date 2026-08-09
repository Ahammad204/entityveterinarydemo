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
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldAlert,
  Info,
  Pill,
  Activity,
  ChevronRight,
  Filter,
  Search,
  ExternalLink,
  X,
  Edit2,
  Bell,
  Download,
  Share2,
  Dog,
  Cat,
  Bird,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export interface DashboardViewProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string, branchId?: string) => void;
  showDemoBadges: boolean;
}

export interface DemoPet {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Exotic' | 'Other';
  breed: string;
  age: string;
  gender: 'Male (Neutered)' | 'Female (Spayed)' | 'Male' | 'Female';
  weight: string;
  microchip: string;
  image: string;
  lastVisit: string;
  vaccinationStatus: 'Up to Date' | 'Booster Due' | 'Pending Checkup';
}

export interface DemoAppointment {
  id: string;
  petName: string;
  serviceTitle: string;
  branchName: string;
  date: string;
  time: string;
  doctorName: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes: string;
}

export interface DemoMedicalRecord {
  id: string;
  date: string;
  petName: string;
  doctorName: string;
  serviceTitle: string;
  diagnosis: string;
  notes: string;
  vitalSigns: string;
  statusBadge: string;
}

export interface DemoPrescription {
  id: string;
  date: string;
  petName: string;
  doctorName: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  status: 'Active Demo' | 'Completed' | 'Archived';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenBooking,
  showDemoBadges
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pets' | 'appointments' | 'records' | 'prescriptions' | 'profile'>('overview');
  const [appointmentFilter, setAppointmentFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [recordPetFilter, setRecordPetFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isAddPetOpen, setIsAddPetOpen] = useState<boolean>(false);
  const [selectedPetDetail, setSelectedPetDetail] = useState<DemoPet | null>(null);

  // Profile Edit State
  const [ownerProfile, setOwnerProfile] = useState({
    name: 'Tanvir Ahmed',
    phone: '+880 1711-987654',
    email: 'tanvir.ahmed@example.com',
    preferredBranch: 'Entity Veterinary Hospital — Main Hospital (Chattogram)',
    emergencyContact: '+880 1819-123456',
    smsNotifications: true,
    emailReports: true,
    whatsappAlerts: true
  });

  // State: Demo Pets
  const [pets, setPets] = useState<DemoPet[]>([
    {
      id: 'pet-1',
      name: 'Milo',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: '2 Years 4 Months',
      gender: 'Male (Neutered)',
      weight: '28.5 kg',
      microchip: 'CHIP-982000412389',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
      lastVisit: '15 Jul 2026',
      vaccinationStatus: 'Up to Date'
    },
    {
      id: 'pet-2',
      name: 'Coco',
      species: 'Cat',
      breed: 'Persian Cross',
      age: '1 Year 2 Months',
      gender: 'Female (Spayed)',
      weight: '3.8 kg',
      microchip: 'CHIP-982000412990',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
      lastVisit: '02 Jun 2026',
      vaccinationStatus: 'Booster Due'
    }
  ]);

  // Form State for Add Pet
  const [newPetForm, setNewPetForm] = useState<{
    name: string;
    species: 'Dog' | 'Cat' | 'Bird' | 'Exotic' | 'Other';
    breed: string;
    age: string;
    gender: 'Male (Neutered)' | 'Female (Spayed)' | 'Male' | 'Female';
    weight: string;
    image: string;
  }>({
    name: '',
    species: 'Dog',
    breed: '',
    age: '1 Year',
    gender: 'Male',
    weight: '5 kg',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600'
  });

  // State: Demo Appointments
  const [appointments, setAppointments] = useState<DemoAppointment[]>([
    {
      id: 'app-101',
      petName: 'Milo',
      serviceTitle: 'Veterinary Consultation & Wellness Check',
      branchName: 'Main Hospital — Chattogram',
      date: '09 Aug 2026',
      time: '10:00 AM',
      doctorName: 'Dr. Partha Sarathi Barua',
      status: 'upcoming',
      notes: 'Routine health checkup and annual DHPP booster vaccination.'
    },
    {
      id: 'app-102',
      petName: 'Coco',
      serviceTitle: 'Professional Grooming & Dental Cleanse',
      branchName: 'Agrabad Satellite Node',
      date: '02 Jun 2026',
      time: '03:00 PM',
      doctorName: 'Grooming Specialist Desk',
      status: 'completed',
      notes: 'Full coat bath, nail trimming, and ear hygiene flush completed.'
    },
    {
      id: 'app-103',
      petName: 'Milo',
      serviceTitle: 'Diagnostic Radiology & Blood Work',
      branchName: 'Main Hospital — Chattogram',
      date: '15 May 2026',
      time: '11:30 AM',
      doctorName: 'Dr. Ananya Rahman',
      status: 'completed',
      notes: 'Abdominal ultrasound and CBC panel. All results within normal range.'
    },
    {
      id: 'app-104',
      petName: 'Coco',
      serviceTitle: 'Preventive Vaccination Booster',
      branchName: 'Nasirabad Clinic Node',
      date: '10 Jan 2026',
      time: '02:00 PM',
      doctorName: 'Dr. Partha Sarathi Barua',
      status: 'cancelled',
      notes: 'Cancelled due to owner schedule conflict. Rescheduled to June.'
    }
  ]);

  // State: Demo Medical Records
  const [medicalRecords] = useState<DemoMedicalRecord[]>([
    {
      id: 'med-01',
      date: '15 Jul 2026',
      petName: 'Milo',
      doctorName: 'Dr. Partha Sarathi Barua',
      serviceTitle: 'Routine Consultation & Dermatology Check',
      diagnosis: 'Mild allergic dermatitis on paws. Prescribed anti-itch wash.',
      notes: 'Weight stable at 28.5kg. Heart sounds clear. Ears free of infection.',
      vitalSigns: 'Temp: 38.4°C • HR: 90 bpm • Weight: 28.5 kg',
      statusBadge: 'Demo medical record'
    },
    {
      id: 'med-02',
      date: '02 Jun 2026',
      petName: 'Coco',
      doctorName: 'Grooming & Hygiene Desk',
      serviceTitle: 'Grooming & Hygiene Evaluation',
      diagnosis: 'Clean coat condition, minor tartar accumulation on molars.',
      notes: 'Recommended dental gel or soft brushing twice weekly.',
      vitalSigns: 'Temp: 38.2°C • HR: 120 bpm • Weight: 3.8 kg',
      statusBadge: 'Demo medical record'
    },
    {
      id: 'med-03',
      date: '15 May 2026',
      petName: 'Milo',
      doctorName: 'Dr. Ananya Rahman',
      serviceTitle: 'Diagnostic Imaging & CBC Panel',
      diagnosis: 'CBC blood panel normal. No abdominal fluid accumulation detected.',
      notes: 'Patient well-hydrated. Liver and renal values optimal.',
      vitalSigns: 'Temp: 38.5°C • HR: 88 bpm • Weight: 28.2 kg',
      statusBadge: 'Demo medical record'
    }
  ]);

  // State: Demo Prescriptions
  const [prescriptions] = useState<DemoPrescription[]>([
    {
      id: 'rx-201',
      date: '15 Jul 2026',
      petName: 'Milo',
      doctorName: 'Dr. Partha Sarathi Barua',
      medication: 'Cefalexin Veterinary Suspension 250mg',
      dosage: '5ml orally twice daily',
      frequency: 'Every 12 hours with meal',
      duration: '7 Days',
      status: 'Active Demo'
    },
    {
      id: 'rx-202',
      date: '15 May 2026',
      petName: 'Milo',
      doctorName: 'Dr. Ananya Rahman',
      medication: 'Probiotic Digest Supplement Gel',
      dosage: '2ml once daily',
      frequency: 'Morning after feeding',
      duration: '14 Days',
      status: 'Completed'
    }
  ]);

  // Handle Add Pet
  const handleAddPetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetForm.name.trim()) return;

    const newPet: DemoPet = {
      id: `pet-${Date.now()}`,
      name: newPetForm.name,
      species: newPetForm.species,
      breed: newPetForm.breed || 'Mixed / Unknown',
      age: newPetForm.age,
      gender: newPetForm.gender,
      weight: newPetForm.weight,
      microchip: `CHIP-982000${Math.floor(100000 + Math.random() * 900000)}`,
      image: newPetForm.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
      lastVisit: 'Not visited yet',
      vaccinationStatus: 'Pending Checkup'
    };

    setPets((prev) => [newPet, ...prev]);
    setIsAddPetOpen(false);
    setNewPetForm({
      name: '',
      species: 'Dog',
      breed: '',
      age: '1 Year',
      gender: 'Male',
      weight: '5 kg',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600'
    });
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((app) => {
    if (appointmentFilter !== 'all' && app.status !== appointmentFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        app.petName.toLowerCase().includes(q) ||
        app.serviceTitle.toLowerCase().includes(q) ||
        app.branchName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Medical Records
  const filteredRecords = medicalRecords.filter((rec) => {
    if (recordPetFilter !== 'all' && rec.petName.toLowerCase() !== recordPetFilter.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rec.petName.toLowerCase().includes(q) ||
        rec.serviceTitle.toLowerCase().includes(q) ||
        rec.diagnosis.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const nextUpcomingAppointment = appointments.find((a) => a.status === 'upcoming');

  return (
    <div className="space-y-12 py-8">
      {/* 1. DASHBOARD HERO HEADER */}
      <section className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 p-8 sm:p-12 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="normal" className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded border border-teal-800">
                  Patient Health Portal Concept
                </span>
                {showDemoBadges && (
                  <span className="text-xs text-amber-300 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded font-mono">
                    💡 Simulated Pet Owner Dashboard
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Welcome back, {ownerProfile.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Demonstrating how Entity Veterinary Hospital can offer pet owners a centralized digital hub for appointments, medical history, registered pet profiles, and prescription tracking.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  {ownerProfile.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                  {ownerProfile.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-400" />
                  Primary Node: Chattogram Main
                </span>
              </div>
            </div>

            {/* Quick Action Buttons in Header */}
            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <Button
                variant="primary"
                size="md"
                onClick={() => onOpenBooking()}
                icon={Calendar}
                iconPosition="left"
                className="bg-teal-600 hover:bg-teal-500 text-white shadow-md"
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsAddPetOpen(true)}
                icon={Plus}
                iconPosition="left"
                className="text-white border-slate-700 hover:bg-slate-800"
              >
                Add New Pet
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. DEMO DISCLAIMER BANNER */}
      <Container size="normal">
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-amber-950 shadow-2xs">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block text-amber-900 mb-0.5">
                Frontend Prototype — Tectonic Concept Demonstration
              </span>
              <p className="text-slate-700 leading-relaxed">
                This dashboard displays mock pet records, appointment histories, and prescriptions designed to show what a full digital portal for Entity Veterinary Hospital would look like. No real backend database or authentication is currently connected.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-amber-900 bg-amber-100 px-3 py-1 rounded border border-amber-300 shrink-0 self-start sm:self-center">
            SYSTEM_STATUS: DEMO_MODE
          </span>
        </div>
      </Container>

      {/* 3. NAVIGATION TABS */}
      <Container size="normal">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'pets', label: `My Pets (${pets.length})`, icon: HeartHandshake },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
            { id: 'records', label: 'Medical Records', icon: FileText },
            { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
            { id: 'profile', label: 'Owner Profile', icon: User }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </Container>

      {/* 4. TAB CONTENTS */}
      <Container size="normal">
        {/* ==================== TAB 1: OVERVIEW ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Grid: Next Appointment & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Appointment Highlight */}
              <div className="lg:col-span-2 bg-gradient-to-br from-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-teal-800 shadow-lg space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Calendar className="w-48 h-48 text-white" />
                </div>

                <div className="flex items-center justify-between border-b border-teal-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                      Next Scheduled Visit
                    </span>
                  </div>
                  <span className="text-xs font-mono text-teal-200 bg-teal-950 px-2.5 py-0.5 rounded border border-teal-800">
                    STATUS: CONFIRMED
                  </span>
                </div>

                {nextUpcomingAppointment ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-teal-200 uppercase font-semibold">Pet Patient</span>
                      <h3 className="text-2xl font-bold font-display text-white">
                        {nextUpcomingAppointment.petName} — {nextUpcomingAppointment.serviceTitle}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-200 bg-slate-950/50 p-4 rounded-2xl border border-teal-800/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Date: <strong>{nextUpcomingAppointment.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Time: <strong>{nextUpcomingAppointment.time}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Branch: <strong>{nextUpcomingAppointment.branchName}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Doctor: <strong>{nextUpcomingAppointment.doctorName}</strong></span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 italic bg-teal-950/40 p-3 rounded-xl border border-teal-800/40">
                      "{nextUpcomingAppointment.notes}"
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-300">No upcoming appointments scheduled.</p>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onOpenBooking()}
                    icon={Calendar}
                    iconPosition="left"
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                  >
                    Reschedule / New Booking
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('appointments')}
                    className="text-teal-200 border-teal-700 hover:bg-teal-950"
                  >
                    View All Appointments
                  </Button>
                </div>
              </div>

              {/* Quick Summary Cards */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-2xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                    <span>Registered Pets</span>
                    <HeartHandshake className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 font-display">{pets.length}</span>
                    <span className="text-xs text-slate-500 font-medium">Pets in profile</span>
                  </div>
                  <div className="flex -space-x-2 pt-1">
                    {pets.map((p) => (
                      <img
                        key={p.id}
                        src={p.image}
                        alt={p.name}
                        className="w-9 h-9 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-2xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                    <span>Medical History</span>
                    <FileText className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 font-display">{medicalRecords.length}</span>
                    <span className="text-xs text-slate-500 font-medium">Demonstration records</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Last checkup: {medicalRecords[0]?.date || 'N/A'}
                  </p>
                </div>

                <div className="bg-teal-50 border border-teal-200 p-5 rounded-3xl space-y-2 text-xs text-teal-900">
                  <span className="font-bold flex items-center gap-1.5 text-teal-900 uppercase">
                    <Zap className="w-4 h-4 text-teal-600" />
                    24/7 Clinical Emergency
                  </span>
                  <p className="text-slate-700">
                    Chattogram Main Hospital operates round-the-clock emergency triage.
                  </p>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onNavigate('contact')}
                    className="mt-1 text-teal-800 border-teal-300 hover:bg-teal-100"
                  >
                    Contact Emergency Desk
                  </Button>
                </div>
              </div>
            </div>

            {/* Pet Profiles Summary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    Your Pet Profiles
                  </h3>
                  <p className="text-xs text-slate-500">Manage registered pets, age, species, and checkup history.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddPetOpen(true)}
                  icon={Plus}
                  iconPosition="left"
                >
                  Add Pet
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mb-1">
                          {pet.species} • {pet.breed}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 font-display">{pet.name}</h4>
                        <p className="text-xs text-slate-500">{pet.age} • {pet.gender}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Weight</span>
                        <strong>{pet.weight}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Vaccination</span>
                        <strong className="text-teal-700">{pet.vaccinationStatus}</strong>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPetDetail(pet);
                        setActiveTab('pets');
                      }}
                      className="w-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs"
                    >
                      View Pet Profile
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-600" />
                Recent Activity & Logs
              </h3>

              <div className="space-y-3">
                {[
                  {
                    date: '08 Aug 2026',
                    title: 'Demo Appointment Scheduled',
                    desc: 'Appointment request logged for Milo at Chattogram Main Hospital.',
                    badge: 'Booking'
                  },
                  {
                    date: '15 Jul 2026',
                    title: 'Clinical Consultation Record',
                    desc: 'Dr. Partha completed checkup for Milo. Mild allergic dermatitis notes recorded.',
                    badge: 'Medical'
                  },
                  {
                    date: '02 Jun 2026',
                    title: 'Grooming & Hygiene Care',
                    desc: 'Coco completed spa bath and ear hygiene service at Agrabad Satellite Node.',
                    badge: 'Grooming'
                  }
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 text-xs">{act.title}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">{act.date}</span>
                      </div>
                      <p className="text-slate-600">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: MY PETS ==================== */}
        {activeTab === 'pets' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  My Registered Pets
                </h2>
                <p className="text-xs text-slate-500">
                  Manage patient profiles, microchips, age, species, and medical logs.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setIsAddPetOpen(true)}
                icon={Plus}
                iconPosition="left"
              >
                Add New Pet
              </Button>
            </div>

            {/* Pets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {pet.species}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                            {pet.microchip}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold font-display text-slate-900">
                          {pet.name}
                        </h3>

                        <p className="text-xs text-slate-600 font-medium">
                          {pet.breed} • {pet.gender}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Age</span>
                        <strong className="text-slate-800">{pet.age}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Weight</span>
                        <strong className="text-slate-800">{pet.weight}</strong>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Vaccination</span>
                        <strong className="text-teal-700">{pet.vaccinationStatus}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenBooking(undefined, undefined, undefined)}
                      icon={Calendar}
                      iconPosition="left"
                      className="text-xs"
                    >
                      Book Visit
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setRecordPetFilter(pet.name);
                        setActiveTab('records');
                      }}
                      icon={FileText}
                      iconPosition="left"
                      className="text-xs text-slate-700"
                    >
                      Medical Records
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: APPOINTMENTS ==================== */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Appointment History & Schedule
                </h2>
                <p className="text-xs text-slate-500">
                  Track upcoming, completed, and cancelled demo appointment requests.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => onOpenBooking()}
                icon={Calendar}
                iconPosition="left"
              >
                Book New Appointment
              </Button>
            </div>

            {/* Appointment Status Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setAppointmentFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      appointmentFilter === st
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter appointments..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>
            </div>

            {/* Appointment Cards */}
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            app.status === 'upcoming'
                              ? 'bg-teal-50 text-teal-800 border-teal-200'
                              : app.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {app.status} (DEMO)
                          </span>
                          <span className="text-xs text-slate-400 font-mono">#{app.id}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 font-display mt-1">
                          {app.petName} — {app.serviceTitle}
                        </h3>
                      </div>

                      <div className="text-left sm:text-right text-xs text-slate-600">
                        <span className="font-bold text-slate-900 block text-sm">{app.date}</span>
                        <span>{app.time}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>Branch: <strong>{app.branchName}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>Clinician: <strong>{app.doctorName}</strong></span>
                      </div>
                    </div>

                    {app.notes && (
                      <p className="text-xs text-slate-600 italic">
                        "{app.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No Appointments Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No appointments match your current filter or search criteria.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 4: MEDICAL RECORDS ==================== */}
        {activeTab === 'records' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Electronic Health Records (Demo)
                </h2>
                <p className="text-xs text-slate-500">
                  Clinical consultation history, diagnoses, and vital signs.
                </p>
              </div>

              <span className="text-xs font-mono text-teal-800 bg-teal-50 px-3 py-1 rounded border border-teal-200 self-start sm:self-center">
                Demo medical record dataset
              </span>
            </div>

            {/* Pet Filter for Records */}
            <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase px-2">Filter Pet:</span>
              <button
                onClick={() => setRecordPetFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  recordPetFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                All Pets
              </button>
              {pets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setRecordPetFilter(p.name)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    recordPetFilter === p.name ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Medical Records List */}
            <div className="space-y-4">
              {filteredRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                        {rec.statusBadge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{rec.date}</span>
                    </div>

                    <span className="text-xs font-bold text-slate-700">
                      Pet: <strong className="text-teal-700">{rec.petName}</strong>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      {rec.serviceTitle}
                    </h3>
                    <p className="text-xs text-slate-500">Attending Clinician: <strong>{rec.doctorName}</strong></p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <p><strong>Clinical Diagnosis:</strong> {rec.diagnosis}</p>
                    <p><strong>Doctor Notes:</strong> {rec.notes}</p>
                    <p className="text-teal-800 font-mono pt-1">
                      <strong>Vitals recorded:</strong> {rec.vitalSigns}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: PRESCRIPTIONS ==================== */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-display flex items-center gap-2">
                <Pill className="w-6 h-6 text-teal-600" />
                Veterinary Prescriptions (Demo)
              </h2>
              <p className="text-xs text-slate-500">
                Prescription records placeholder interface.
              </p>
            </div>

            {/* Mandatory Placeholder Banner as requested */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 text-center space-y-4 shadow-lg">
              <div className="w-16 h-16 bg-teal-950 rounded-2xl border border-teal-800 flex items-center justify-center mx-auto text-teal-400">
                <Pill className="w-8 h-8" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-xl font-bold font-display text-white">
                  Prescription information will appear here.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In production, this module will dynamically fetch active veterinary electronic prescriptions, dosage reminders, and pharmaceutical refill requests from Entity's hospital database.
                </p>
              </div>

              <span className="inline-block text-[11px] font-mono text-amber-300 bg-amber-950/90 px-3 py-1 rounded border border-amber-800">
                ⚠️ FOR DEMONSTRATION ONLY — NOT A REAL MEDICAL PRESCRIPTION
              </span>
            </div>

            {/* Demo Prescriptions Table */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Historical Demo Prescriptions
              </h3>

              <div className="space-y-3">
                {prescriptions.map((rx) => (
                  <div key={rx.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 text-sm">{rx.medication}</strong>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                        {rx.status}
                      </span>
                    </div>
                    <p className="text-slate-600">Dosage: {rx.dosage} • {rx.frequency} ({rx.duration})</p>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200">
                      <span>Pet: {rx.petName} • Doctor: {rx.doctorName}</span>
                      <span>Date: {rx.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: OWNER PROFILE ==================== */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Pet Owner Profile
              </h2>
              <p className="text-xs text-slate-500">
                Manage owner contact details, primary branch preferences, and alert settings.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Owner Full Name</label>
                  <input
                    type="text"
                    value={ownerProfile.name}
                    onChange={(e) => setOwnerProfile({ ...ownerProfile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Phone Number</label>
                    <input
                      type="text"
                      value={ownerProfile.phone}
                      onChange={(e) => setOwnerProfile({ ...ownerProfile, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={ownerProfile.email}
                      onChange={(e) => setOwnerProfile({ ...ownerProfile, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Preferred Hospital Node</label>
                  <input
                    type="text"
                    disabled
                    value={ownerProfile.preferredBranch}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Notification & Confirmation Preferences
                </h4>

                {[
                  { key: 'smsNotifications', label: 'SMS Appointment Reminders' },
                  { key: 'whatsappAlerts', label: 'WhatsApp Diagnostic Alerts' },
                  { key: 'emailReports', label: 'Email Medical Summaries' }
                ].map((pref) => (
                  <label key={pref.key} className="flex items-center justify-between text-xs text-slate-700 font-medium cursor-pointer">
                    <span>{pref.label}</span>
                    <input
                      type="checkbox"
                      checked={(ownerProfile as any)[pref.key]}
                      onChange={(e) => setOwnerProfile({ ...ownerProfile, [pref.key]: e.target.checked })}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                    />
                  </label>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 italic">Changes saved locally in demo state</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert('Demo profile settings saved!')}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* 5. ADD PET MODAL */}
      {isAddPetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-teal-600" />
                Register New Pet Profile
              </h3>
              <button
                onClick={() => setIsAddPetOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPetSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Pet Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rocky / Luna"
                  value={newPetForm.name}
                  onChange={(e) => setNewPetForm({ ...newPetForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Species</label>
                  <select
                    value={newPetForm.species}
                    onChange={(e) => setNewPetForm({ ...newPetForm, species: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Exotic">Exotic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Breed</label>
                  <input
                    type="text"
                    placeholder="e.g. Beagle / Siamese"
                    value={newPetForm.breed}
                    onChange={(e) => setNewPetForm({ ...newPetForm, breed: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Age</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Year"
                    value={newPetForm.age}
                    onChange={(e) => setNewPetForm({ ...newPetForm, age: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Weight</label>
                  <input
                    type="text"
                    placeholder="e.g. 12 kg"
                    value={newPetForm.weight}
                    onChange={(e) => setNewPetForm({ ...newPetForm, weight: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddPetOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  Save Pet Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. CALL TO ACTION */}
      <CTASection
        title="Schedule Your Next Clinical Visit"
        subtitle="Entity Veterinary Hospital offers seamless online booking across all satellite and central hospital locations."
        onBook={() => onOpenBooking()}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
