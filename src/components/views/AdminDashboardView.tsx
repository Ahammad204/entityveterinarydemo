import React, { useState } from 'react';
import { Page } from '../../types';
import { SERVICES, BRANCHES, DOCTORS, BLOG_POSTS, DEMO_PRODUCTS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AnalyticsDashboardView } from './AnalyticsDashboardView';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Dog,
  Stethoscope,
  Building2,
  Package,
  ShoppingBag,
  FileText,
  Share2,
  Star,
  Settings,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Edit2,
  Eye,
  Check,
  Send,
  Bell,
  LogOut,
  ChevronDown
} from 'lucide-react';

export interface AdminDashboardViewProps {
  onNavigate: (page: Page, param?: string) => void;
  showDemoBadges?: boolean;
}

export type AdminSidebarTab =
  | 'dashboard'
  | 'analytics'
  | 'appointments'
  | 'patients'
  | 'pets'
  | 'doctors'
  | 'branches'
  | 'services'
  | 'products'
  | 'orders'
  | 'blog'
  | 'social'
  | 'reviews'
  | 'settings';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onNavigate,
  showDemoBadges = true
}) => {
  const [activeTab, setActiveTab] = useState<AdminSidebarTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filters State
  const [appointmentFilter, setAppointmentFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');
  const [blogTabFilter, setBlogTabFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [socialTabFilter, setSocialTabFilter] = useState<'all' | 'draft' | 'scheduled' | 'published'>('all');
  const [reviewTabFilter, setReviewTabFilter] = useState<'all' | 'new' | 'replied' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Interactive States
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  // Demo Data Collections
  const [demoAppointments, setDemoAppointments] = useState([
    {
      id: 'APP-901',
      pet: 'Milo',
      species: 'Dog (Golden Retriever)',
      owner: 'Tanvir Ahmed',
      phone: '+880 1711-987654',
      service: 'Veterinary Consultation & Wellness',
      doctor: 'Dr. Partha Sarathi Barua',
      branch: 'Main Hospital (Chattogram)',
      date: 'Today, 10:30 AM',
      status: 'confirmed'
    },
    {
      id: 'APP-902',
      pet: 'Coco',
      species: 'Cat (Persian)',
      owner: 'Nusrat Jahan',
      phone: '+880 1819-223344',
      service: 'Preventive Vaccination Booster',
      doctor: 'Dr. Md. Aslam Hossain',
      branch: 'Agrabad Satellite Node',
      date: 'Today, 11:45 AM',
      status: 'pending'
    },
    {
      id: 'APP-903',
      pet: 'Rocky',
      species: 'Dog (German Shepherd)',
      owner: 'Kazi Mahbub',
      phone: '+880 1912-556677',
      service: 'Digital Radiology & Diagnostic Imaging',
      doctor: 'Dr. Partha Sarathi Barua',
      branch: 'Main Hospital (Chattogram)',
      date: 'Today, 02:15 PM',
      status: 'confirmed'
    },
    {
      id: 'APP-904',
      pet: 'Simba',
      species: 'Cat (Domestic Shorthair)',
      owner: 'Farhana Kabir',
      phone: '+880 1677-889900',
      service: 'Soft Tissue & Orthopedic Surgery',
      doctor: 'Dr. Md. Aslam Hossain',
      branch: 'Main Hospital (Chattogram)',
      date: 'Today, 04:00 PM',
      status: 'pending'
    },
    {
      id: 'APP-905',
      pet: 'Luna',
      species: 'Dog (Beagle)',
      owner: 'Sabbir Rahman',
      phone: '+880 1755-112233',
      service: 'Emergency Triage & ICU Care',
      doctor: 'On-Call Emergency Team',
      branch: 'Main Hospital (Chattogram)',
      date: 'Yesterday, 08:30 PM',
      status: 'completed'
    }
  ]);

  const demoPatients = [
    { id: 'PAT-01', owner: 'Tanvir Ahmed', phone: '+880 1711-987654', pets: 'Milo (Dog)', lastVisit: '09 Aug 2026', totalVisits: 5 },
    { id: 'PAT-02', owner: 'Nusrat Jahan', phone: '+880 1819-223344', pets: 'Coco (Cat)', lastVisit: '02 Aug 2026', totalVisits: 3 },
    { id: 'PAT-03', owner: 'Kazi Mahbub', phone: '+880 1912-556677', pets: 'Rocky (Dog), Bella (Dog)', lastVisit: '28 Jul 2026', totalVisits: 8 },
    { id: 'PAT-04', owner: 'Farhana Kabir', phone: '+880 1677-889900', pets: 'Simba (Cat)', lastVisit: '20 Jul 2026', totalVisits: 2 },
    { id: 'PAT-05', owner: 'Sabbir Rahman', phone: '+880 1755-112233', pets: 'Luna (Dog)', lastVisit: '15 Jul 2026', totalVisits: 4 }
  ];

  const demoPets = [
    { id: 'PET-101', pet: 'Milo', species: 'Dog', breed: 'Golden Retriever', owner: 'Tanvir Ahmed', lastVisit: '09 Aug 2026', status: 'Healthy' },
    { id: 'PET-102', pet: 'Coco', species: 'Cat', breed: 'Persian Cross', owner: 'Nusrat Jahan', lastVisit: '02 Aug 2026', status: 'Vaccination Due' },
    { id: 'PET-103', pet: 'Rocky', species: 'Dog', breed: 'German Shepherd', owner: 'Kazi Mahbub', lastVisit: '28 Jul 2026', status: 'X-Ray Follow-up' },
    { id: 'PET-104', pet: 'Simba', species: 'Cat', breed: 'Domestic Shorthair', owner: 'Farhana Kabir', lastVisit: '20 Jul 2026', status: 'Pre-Surgical' },
    { id: 'PET-105', pet: 'Luna', species: 'Dog', breed: 'Beagle', owner: 'Sabbir Rahman', lastVisit: '15 Jul 2026', status: 'Post-Emergency' }
  ];

  const demoBlogPosts = [
    { id: 'B-01', title: 'Monsoon Pet Care Guide: Humidity & Fungal Infection Prevention', category: 'Pet Health', author: 'Dr. Partha Barua', status: 'published', date: '02 Aug 2026', views: '1,240' },
    { id: 'B-02', title: 'Essential Vaccinations for Puppies & Kittens in Chattogram', category: 'Preventive Care', author: 'Dr. Aslam Hossain', status: 'published', date: '25 Jul 2026', views: '980' },
    { id: 'B-03', title: 'Managing Canine Heat Stroke in Warm Weather', category: 'Emergency Care', author: 'Dr. Partha Barua', status: 'draft', date: 'Draft (Modified 07 Aug)', views: '-' },
    { id: 'B-04', title: 'Nutritional Guidelines for Senior Cats in Bangladesh', category: 'Nutrition', author: 'Veterinary Clinical Team', status: 'scheduled', date: 'Scheduled for 15 Aug', views: '-' }
  ];

  const demoSocialPosts = [
    { id: 'SOC-01', platform: 'Facebook', title: 'Monsoon Paw Care Tips for Chattogram Pet Owners', status: 'published', scheduledTime: '02 Aug 2026, 10:00 AM', engagement: '215 Likes • 64 Shares', url: 'https://www.facebook.com/share/19JJaRpM7w/' },
    { id: 'SOC-02', platform: 'Facebook & Instagram', title: 'New Digital Imaging Suite Operational at Main Hospital', status: 'published', scheduledTime: '06 Aug 2026, 04:00 PM', engagement: '142 Likes • 28 Shares', url: 'https://www.facebook.com/share/19JJaRpM7w/' },
    { id: 'SOC-03', platform: 'Facebook', title: 'Warning Signs of Dehydration in Summer Heat', status: 'scheduled', scheduledTime: '12 Aug 2026, 09:30 AM', engagement: 'Scheduled', url: 'https://www.facebook.com/share/19JJaRpM7w/' },
    { id: 'SOC-04', platform: 'Facebook & WhatsApp', title: 'Emergency Triage Guidance for Chattogram Pet Parents', status: 'draft', scheduledTime: 'Draft Post', engagement: 'Draft', url: 'https://www.facebook.com/share/19JJaRpM7w/' }
  ];

  const demoReviews = [
    { id: 'REV-01', owner: 'Tanvir Ahmed', pet: 'Milo (Dog)', rating: 5, date: '08 Aug 2026', text: 'Dr. Partha diagnosed Milo\'s paw skin irritation immediately. Excellent hospital facilities and caring staff at Chattogram Main Hospital.', status: 'new', reply: '' },
    { id: 'REV-02', owner: 'Nusrat Jahan', pet: 'Coco (Cat)', rating: 5, date: '04 Aug 2026', text: 'Prompt vaccination service at Agrabad node. Clean environment and gentle vet care.', status: 'replied', reply: 'Thank you Nusrat! We are happy to serve Coco.' },
    { id: 'REV-03', owner: 'Kazi Mahbub', pet: 'Rocky (Dog)', rating: 4, date: '01 Aug 2026', text: 'Digital X-ray facilities are top quality. Highly recommended veterinary hospital in Chattogram.', status: 'pending', reply: '' }
  ];

  const demoOrders = [
    { id: 'ORD-8801', customer: 'Tanvir Ahmed', items: 'Royal Canin Adult Kibble 3kg x 1', total: '৳ 3,450', payment: 'bKash (Paid)', status: 'Processing' },
    { id: 'ORD-8802', customer: 'Nusrat Jahan', items: 'Veterinary Skin Supplement Chew x 2', total: '৳ 1,800', payment: 'Cash on Delivery', status: 'Dispatched' },
    { id: 'ORD-8803', customer: 'Farhana Kabir', items: 'Prescription Urinary Care Cat Kibble x 1', total: '৳ 2,950', payment: 'Card (Paid)', status: 'Delivered' }
  ];

  const demoMessages = [
    { id: 'MSG-01', sender: 'Tanvir Ahmed', subject: 'Post-consultation medication query for Milo', time: '10 mins ago', unread: true },
    { id: 'MSG-02', sender: 'Farhana Kabir', subject: 'Inquiry regarding surgical prep for Simba', time: '1 hour ago', unread: true },
    { id: 'MSG-03', sender: 'Sabbir Rahman', subject: 'Follow-up appointment scheduling question', time: '3 hours ago', unread: false }
  ];

  // Actions
  const handleApproveAppointment = (id: string) => {
    setDemoAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'confirmed' } : app))
    );
  };

  const handleSendReply = () => {
    if (!selectedReview) return;
    setReplySuccess(true);
    setTimeout(() => {
      setSelectedReview(null);
      setReplyText('');
      setReplySuccess(false);
    }, 1500);
  };

  const sidebarMenuItems: Array<{ id: AdminSidebarTab; label: string; icon: any; count?: number }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Marketing Analytics', icon: BarChart3 },
    { id: 'appointments', label: 'Appointments', icon: Calendar, count: demoAppointments.filter(a => a.status === 'pending').length },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'pets', label: 'Pets', icon: Dog },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'branches', label: 'Branches', icon: Building2 },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'orders', label: 'Orders', icon: TrendingUp },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'social', label: 'Social Content', icon: Share2 },
    { id: 'reviews', label: 'Reviews', icon: Star, count: demoReviews.filter(r => r.status === 'new').length },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Demo Admin Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-2.5 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm" icon={<Sparkles className="w-3 h-3 text-teal-700" />}>
            Tectonic Agency Prototype
          </Badge>
          <span className="text-slate-300 font-medium">
            <strong>DEMO ADMIN DASHBOARD</strong> — Future Digital Operations Platform Concept for Entity Veterinary Hospital.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="demo" size="sm">Frontend Demo • No Auth Needed</Badge>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onNavigate('home')}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            ← Exit to Public Site
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 shrink-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold font-display">
                EV
              </div>
              <div>
                <strong className="text-sm font-bold text-white block font-display">Entity Vet Admin</strong>
                <span className="text-[10px] text-slate-400 font-mono">Chattogram Operations</span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-none">
            {sidebarMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-950 text-teal-300' : 'bg-teal-500/20 text-teal-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-teal-300">
                DR
              </div>
              <div className="overflow-hidden">
                <strong className="text-white text-xs block truncate font-display">Dr. Partha Barua</strong>
                <span className="text-[10px] text-slate-400 block truncate">Chief Veterinary Officer</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-950">
          {/* Top Bar Header */}
          <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-4 sm:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white font-display capitalize">
                  {activeTab.replace('-', ' ')}
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Digital Management Platform Prototype • Entity Veterinary Hospital
                </p>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patients, pets, orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="relative p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-400" />
                </button>

                <Button
                  variant="primary"
                  size="xs"
                  icon={Plus}
                  onClick={() => setActiveTab('appointments')}
                  className="hidden sm:inline-flex"
                >
                  New Booking
                </Button>
              </div>
            </div>
          </header>

          {/* Main View Content Switching */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
            {/* TAB ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="animate-fade-in">
                <AnalyticsDashboardView onNavigate={onNavigate} />
              </div>
            )}

            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in">
                {/* 6 Metric Cards Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {[
                    { label: "Today's Appointments", value: '14', meta: '4 Pending', icon: Calendar, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
                    { label: 'Pending Requests', value: '5', meta: 'Requires Review', icon: Clock, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                    { label: 'Total Registered Pets', value: '1,428', meta: '+24 this week', icon: Dog, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                    { label: 'Active Services', value: '12', meta: 'Clinical & Surgical', icon: Stethoscope, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                    { label: 'Recent Shop Orders', value: '38', meta: '৳ 124,500 total', icon: ShoppingBag, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
                    { label: 'Recent Messages', value: '9', meta: '3 Unread', icon: MessageSquare, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' }
                  ].map((stat, idx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={idx} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-mono">{stat.label}</span>
                          <div className={`p-1.5 rounded-lg border ${stat.color}`}>
                            <StatIcon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="text-2xl font-extrabold font-display text-white">
                          {stat.value}
                        </div>
                        <span className="text-[10px] text-teal-400 font-mono block">{stat.meta}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Main Dashboard Grid: Appointments & Messages */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Today's Appointments Queue */}
                  <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h2 className="text-base font-bold font-display text-white">Today's Appointment Schedule</h2>
                        <p className="text-xs text-slate-400">Live queue across Chattogram branches</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('appointments')}
                        className="text-xs text-teal-400 hover:underline font-mono"
                      >
                        View All ({demoAppointments.length}) →
                      </button>
                    </div>

                    <div className="overflow-x-auto scrollbar-thin">
                      <table className="w-full text-left text-xs font-mono min-w-[650px]">
                        <thead>
                          <tr className="text-slate-400 border-b border-slate-800 pb-2">
                            <th className="pb-3">Pet & Owner</th>
                            <th className="pb-3">Service</th>
                            <th className="pb-3">Doctor</th>
                            <th className="pb-3">Time</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-200">
                          {demoAppointments.slice(0, 4).map((app) => (
                            <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                              <td className="py-3">
                                <strong className="text-white font-sans block">{app.pet}</strong>
                                <span className="text-[11px] text-slate-400">{app.owner}</span>
                              </td>
                              <td className="py-3 max-w-[180px] truncate">{app.service}</td>
                              <td className="py-3 text-slate-300">{app.doctor}</td>
                              <td className="py-3 text-teal-300">{app.date}</td>
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                  app.status === 'confirmed'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : app.status === 'pending'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {app.status}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                {app.status === 'pending' ? (
                                  <button
                                    onClick={() => handleApproveAppointment(app.id)}
                                    className="px-2.5 py-1 bg-teal-500 text-slate-950 hover:bg-teal-400 rounded text-[11px] font-bold transition-all"
                                  >
                                    Approve
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setSelectedAppointment(app)}
                                    className="text-slate-400 hover:text-white"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right Side Column: Recent Orders & Messages */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Recent Orders */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h3 className="text-sm font-bold font-display text-white">Recent Shop Orders</h3>
                        <button onClick={() => setActiveTab('orders')} className="text-xs text-teal-400 hover:underline">
                          View Orders →
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {demoOrders.map((ord) => (
                          <div key={ord.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-teal-300 font-bold">{ord.id}</span>
                              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/50">
                                {ord.status}
                              </span>
                            </div>
                            <p className="text-white font-medium truncate">{ord.items}</p>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                              <span>{ord.customer}</span>
                              <strong className="text-white">{ord.total}</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Patient Messages */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h3 className="text-sm font-bold font-display text-white">Patient Inquiries</h3>
                        <span className="text-[10px] text-teal-400 font-mono">3 Unread</span>
                      </div>

                      <div className="space-y-2">
                        {demoMessages.map((msg) => (
                          <div key={msg.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <strong className="text-white font-display">{msg.sender}</strong>
                              <span className="text-[10px] text-slate-400 font-mono">{msg.time}</span>
                            </div>
                            <p className="text-slate-300 text-[11px] leading-snug">{msg.subject}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: APPOINTMENTS TABLE */}
            {activeTab === 'appointments' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Appointments Management</h2>
                    <p className="text-xs text-slate-400">View and manage clinical appointments across branches</p>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {(['all', 'confirmed', 'pending', 'completed', 'cancelled'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setAppointmentFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all capitalize ${
                          appointmentFilter === st
                            ? 'bg-teal-500 text-slate-950 shadow-xs'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs font-mono min-w-[650px]">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 pb-2">
                        <th className="pb-3">Pet</th>
                        <th className="pb-3">Owner & Phone</th>
                        <th className="pb-3">Service</th>
                        <th className="pb-3">Doctor</th>
                        <th className="pb-3">Branch</th>
                        <th className="pb-3">Date / Time</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {demoAppointments
                        .filter(a => appointmentFilter === 'all' || a.status === appointmentFilter)
                        .map((app) => (
                          <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3">
                              <strong className="text-white font-sans block">{app.pet}</strong>
                              <span className="text-[10px] text-slate-400">{app.species}</span>
                            </td>
                            <td className="py-3">
                              <span className="text-slate-200 block font-sans">{app.owner}</span>
                              <span className="text-[10px] text-teal-400">{app.phone}</span>
                            </td>
                            <td className="py-3 max-w-[160px] truncate">{app.service}</td>
                            <td className="py-3 text-slate-300">{app.doctor}</td>
                            <td className="py-3 text-slate-400">{app.branch}</td>
                            <td className="py-3 text-teal-300 font-bold">{app.date}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                app.status === 'confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : app.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="py-3 text-right space-x-2">
                              {app.status === 'pending' && (
                                <button
                                  onClick={() => handleApproveAppointment(app.id)}
                                  className="px-2 py-1 bg-teal-500 text-slate-950 hover:bg-teal-400 rounded text-[10px] font-bold"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedAppointment(app)}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px]"
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: PATIENTS SECTION */}
            {activeTab === 'patients' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Registered Pet Owners (Patients)</h2>
                    <p className="text-xs text-slate-400">Master owner profiles & linked pets directory</p>
                  </div>
                  <Button variant="primary" size="xs" icon={Plus}>Add Owner Profile</Button>
                </div>

                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs font-mono min-w-[650px]">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 pb-2">
                        <th className="pb-3">Owner Name</th>
                        <th className="pb-3">Phone Number</th>
                        <th className="pb-3">Registered Pets</th>
                        <th className="pb-3">Last Visit</th>
                        <th className="pb-3 text-right">Total Visits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {demoPatients.map((pat) => (
                        <tr key={pat.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3">
                            <strong className="text-white font-sans block">{pat.owner}</strong>
                            <span className="text-[10px] text-slate-400">{pat.id}</span>
                          </td>
                          <td className="py-3 text-teal-300">{pat.phone}</td>
                          <td className="py-3 text-slate-300 font-sans">{pat.pets}</td>
                          <td className="py-3 text-slate-400">{pat.lastVisit}</td>
                          <td className="py-3 text-right font-bold text-teal-400">{pat.totalVisits} Visits</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: PETS SECTION */}
            {activeTab === 'pets' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Registered Pets Directory</h2>
                    <p className="text-xs text-slate-400">Species, breeds, owner linkage, and health status</p>
                  </div>
                  <Button variant="primary" size="xs" icon={Plus}>Register Pet</Button>
                </div>

                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs font-mono min-w-[650px]">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 pb-2">
                        <th className="pb-3">Pet Name</th>
                        <th className="pb-3">Species & Breed</th>
                        <th className="pb-3">Owner</th>
                        <th className="pb-3">Last Visit</th>
                        <th className="pb-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {demoPets.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3">
                            <strong className="text-white font-sans text-sm block">{p.pet}</strong>
                            <span className="text-[10px] text-slate-400">{p.id}</span>
                          </td>
                          <td className="py-3 text-slate-300">
                            {p.species} • <span className="text-slate-400">{p.breed}</span>
                          </td>
                          <td className="py-3 text-teal-300 font-sans">{p.owner}</td>
                          <td className="py-3 text-slate-400">{p.lastVisit}</td>
                          <td className="py-3 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30">
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: DOCTORS SECTION */}
            {activeTab === 'doctors' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Veterinary Medical Staff</h2>
                    <p className="text-xs text-slate-400">Clinical leadership & attending veterinarians in Chattogram</p>
                  </div>
                  <Button variant="primary" size="xs" icon={Plus}>Add Doctor</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DOCTORS.map((doc) => (
                    <div key={doc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 flex items-start gap-4">
                      <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-white font-display text-sm">{doc.name}</strong>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                            {doc.statusNotice || 'Fact Verified'}
                          </span>
                        </div>
                        <span className="text-xs text-teal-300 block font-mono">{doc.role}</span>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{doc.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: BRANCHES SECTION */}
            {activeTab === 'branches' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Hospital Branches Management</h2>
                    <p className="text-xs text-slate-400">Main hospital & satellite clinical nodes</p>
                  </div>
                  <Button variant="primary" size="xs" icon={Plus}>Add Branch Node</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BRANCHES.map((b) => (
                    <div key={b.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <strong className="text-white font-display text-base">{b.name}</strong>
                        <span className="text-[10px] font-mono text-teal-300 bg-teal-950 px-2.5 py-1 rounded border border-teal-800">
                          {b.area}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{b.description}</p>
                      <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                        <div>📍 Address: <span className="text-amber-300 font-bold">{b.address}</span></div>
                        <div>📞 Phone: <span className="text-amber-300 font-bold">{b.phone}</span></div>
                        <div>🕒 Hours: <span className="text-teal-300">{b.hours}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: SERVICES SECTION */}
            {activeTab === 'services' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Clinical & Surgical Services Directory</h2>
                    <p className="text-xs text-slate-400">Active medical offerings at Entity Veterinary Hospital</p>
                  </div>
                  <Button variant="primary" size="xs" icon={Plus}>Add Service</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map((srv) => (
                    <div key={srv.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-white font-display text-sm">{srv.title}</strong>
                        <span className="text-[10px] uppercase font-mono font-bold text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                          {srv.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">{srv.shortDesc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: PRODUCTS SECTION */}
            {activeTab === 'products' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Pet Shop Inventory Catalog</h2>
                    <p className="text-xs text-slate-400">Manage products, pricing, stock levels, and pet categories</p>
                  </div>
                  <Button variant="primary" size="xs" icon={Plus}>Add Product</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DEMO_PRODUCTS.map((prod) => (
                    <div key={prod.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-4">
                      <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                      <div className="space-y-1 flex-1">
                        <strong className="text-white font-display text-sm block">{prod.name}</strong>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="text-teal-300 font-bold">৳ {prod.priceBdt}</span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                            {prod.stockStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: ORDERS SECTION */}
            {activeTab === 'orders' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">E-Commerce Orders Queue</h2>
                    <p className="text-xs text-slate-400">Order processing, payments, and delivery fulfillment</p>
                  </div>
                </div>

                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs font-mono min-w-[650px]">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 pb-2">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Items</th>
                        <th className="pb-3">Total BDT</th>
                        <th className="pb-3">Payment</th>
                        <th className="pb-3 text-right">Fulfillment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {demoOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 font-bold text-teal-300">{ord.id}</td>
                          <td className="py-3 text-white font-sans">{ord.customer}</td>
                          <td className="py-3 text-slate-300">{ord.items}</td>
                          <td className="py-3 text-white font-bold">{ord.total}</td>
                          <td className="py-3 text-slate-400">{ord.payment}</td>
                          <td className="py-3 text-right">
                            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 10: BLOG SECTION */}
            {activeTab === 'blog' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Educational Content & Blog CMS</h2>
                    <p className="text-xs text-slate-400">Manage published articles, drafts, and scheduled posts</p>
                  </div>

                  {/* Blog Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {(['all', 'published', 'draft', 'scheduled'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setBlogTabFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all capitalize ${
                          blogTabFilter === st
                            ? 'bg-teal-500 text-slate-950 shadow-xs'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {demoBlogPosts
                    .filter(b => blogTabFilter === 'all' || b.status === blogTabFilter)
                    .map((post) => (
                      <div key={post.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              post.status === 'published' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                              post.status === 'draft' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            }`}>
                              {post.status}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">{post.category}</span>
                          </div>
                          <strong className="text-white font-display text-sm block">{post.title}</strong>
                          <p className="text-xs text-slate-400">Author: {post.author} • Date: {post.date}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Button variant="outline" size="xs" icon={Edit2} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            Edit Article
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 11: SOCIAL CONTENT SECTION */}
            {activeTab === 'social' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold font-display text-white">Social Media Manager</h2>
                      <Badge variant="demo" size="sm">Demo Social Content</Badge>
                    </div>
                    <p className="text-xs text-slate-400">Manage Facebook posts, scheduled outreach, and engagement</p>
                  </div>

                  {/* Social Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {(['all', 'draft', 'scheduled', 'published'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setSocialTabFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all capitalize ${
                          socialTabFilter === st
                            ? 'bg-teal-500 text-slate-950 shadow-xs'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {demoSocialPosts
                    .filter(s => socialTabFilter === 'all' || s.status === socialTabFilter)
                    .map((post) => (
                      <div key={post.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                              Demo Social Content
                            </span>
                            <span className="text-xs text-teal-300 font-mono">{post.platform}</span>
                          </div>
                          <strong className="text-white font-display text-sm block">{post.title}</strong>
                          <p className="text-xs text-slate-400">Scheduled: {post.scheduledTime} • Metric: {post.engagement}</p>
                        </div>

                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all shrink-0"
                        >
                          <span>Facebook Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 12: REVIEWS SECTION */}
            {activeTab === 'reviews' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Pet Owner Reviews & Feedback</h2>
                    <p className="text-xs text-slate-400">Monitor and respond to customer reviews</p>
                  </div>

                  {/* Review Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {(['all', 'new', 'replied', 'pending'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setReviewTabFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all capitalize ${
                          reviewTabFilter === st
                            ? 'bg-teal-500 text-slate-950 shadow-xs'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {demoReviews
                    .filter(r => reviewTabFilter === 'all' || r.status === reviewTabFilter)
                    .map((rev) => (
                      <div key={rev.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <strong className="text-white font-display text-sm">{rev.owner}</strong>
                            <span className="text-xs text-slate-400 font-mono block">{rev.pet} • {rev.date}</span>
                          </div>

                          <div className="flex items-center gap-1 text-amber-400">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-900 p-3 rounded-xl border border-slate-800">
                          "{rev.text}"
                        </p>

                        {rev.reply ? (
                          <div className="p-3 bg-teal-950/60 rounded-xl border border-teal-800/60 text-xs space-y-1">
                            <span className="text-[10px] font-mono text-teal-300 font-bold block">Hospital Response:</span>
                            <p className="text-teal-100">{rev.reply}</p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end">
                            <Button
                              variant="outline"
                              size="xs"
                              icon={MessageSquare}
                              onClick={() => setSelectedReview(rev)}
                              className="border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                              Reply to Review
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 13: SETTINGS SECTION */}
            {activeTab === 'settings' && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 animate-fade-in max-w-3xl">
                <div>
                  <h2 className="text-lg font-bold font-display text-white">Platform & Branch Configuration</h2>
                  <p className="text-xs text-slate-400">System settings for Entity Veterinary Hospital Chattogram</p>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <strong className="text-white block font-display text-sm font-sans">Hospital Profile & Branding</strong>
                    <p className="text-slate-400 font-sans">Entity Veterinary Hospital — Main Hospital (Chattogram)</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <strong className="text-white block font-display text-sm font-sans">Automated Alerts & Notifications</strong>
                    <div className="space-y-1 text-slate-300">
                      <div>✓ SMS Appointment Reminders (Chattogram Telecom)</div>
                      <div>✓ WhatsApp Consultation Confirmation Alerts</div>
                      <div>✓ Automated Pre-Visit Preparation Guidelines</div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <strong className="text-white block font-display text-sm font-sans">Verified Information Governance</strong>
                    <p className="text-slate-400 font-sans">
                      All address and contact placeholders are strictly governed by Fact-Verified rules to prevent misinformation before official client confirmation.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Review Reply Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <strong className="text-white font-display text-sm">Reply to {selectedReview.owner}</strong>
              <button onClick={() => setSelectedReview(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {replySuccess ? (
              <div className="p-4 bg-emerald-950 text-emerald-300 rounded-xl border border-emerald-800 text-xs font-mono text-center">
                ✓ Reply posted successfully to review feed!
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  "{selectedReview.text}"
                </p>
                <textarea
                  rows={3}
                  placeholder="Type official veterinary hospital response..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="outline" size="xs" onClick={() => setSelectedReview(null)} className="border-slate-800 text-slate-400">
                    Cancel
                  </Button>
                  <Button variant="primary" size="xs" icon={Send} onClick={handleSendReply}>
                    Send Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <strong className="text-white font-display text-sm">Appointment Details ({selectedAppointment.id})</strong>
              <button onClick={() => setSelectedAppointment(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div>🐾 Pet: <strong className="text-white font-sans">{selectedAppointment.pet}</strong> ({selectedAppointment.species})</div>
              <div>👤 Owner: <strong className="text-white font-sans">{selectedAppointment.owner}</strong></div>
              <div>📞 Phone: <span className="text-teal-400">{selectedAppointment.phone}</span></div>
              <div>🩺 Service: <span className="text-white">{selectedAppointment.service}</span></div>
              <div>👨‍⚕️ Doctor: <span className="text-teal-300">{selectedAppointment.doctor}</span></div>
              <div>🏢 Branch: <span className="text-slate-400">{selectedAppointment.branch}</span></div>
              <div>🕒 Date: <span className="text-teal-300">{selectedAppointment.date}</span></div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <Button variant="primary" size="xs" onClick={() => setSelectedAppointment(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
