import React, { useState } from 'react';
import { Page } from '../../types';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  Facebook,
  Search,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  PieChart as PieChartIcon,
  ShieldAlert,
  ExternalLink,
  Layers,
  FileText,
  Stethoscope,
  Filter,
  Download,
  Info,
  CheckCircle2,
  Clock,
  LayoutDashboard
} from 'lucide-react';

export interface AnalyticsDashboardViewProps {
  onNavigate?: (page: Page, param?: string) => void;
  showDemoBadges?: boolean;
}

// Chart Mock Data
const trafficTrendData = [
  { month: 'Mar', google: 3200, facebook: 2100, direct: 1100, total: 6400 },
  { month: 'Apr', google: 4100, facebook: 2800, direct: 1350, total: 8250 },
  { month: 'May', google: 4900, facebook: 3400, direct: 1600, total: 9900 },
  { month: 'Jun', google: 5800, facebook: 4100, direct: 2100, total: 12000 },
  { month: 'Jul', google: 6400, facebook: 4800, direct: 2450, total: 13650 },
  { month: 'Aug', google: 6810, facebook: 5240, direct: 2800, total: 14850 }
];

const appointmentRequestsData = [
  { day: 'Mon', confirmed: 48, pending: 12, total: 60 },
  { day: 'Tue', confirmed: 54, pending: 15, total: 69 },
  { day: 'Wed', confirmed: 62, pending: 18, total: 80 },
  { day: 'Thu', confirmed: 58, pending: 14, total: 72 },
  { day: 'Fri', confirmed: 66, pending: 22, total: 88 },
  { day: 'Sat', confirmed: 72, pending: 25, total: 97 },
  { day: 'Sun', confirmed: 38, pending: 10, total: 48 }
];

const topServicesData = [
  { name: 'Veterinary Consultation', visits: 4250, appointments: 184 },
  { name: 'Preventive Vaccination', visits: 3820, appointments: 142 },
  { name: 'Digital X-Ray & Ultrasound', visits: 2910, appointments: 96 },
  { name: 'Soft Tissue Surgery', visits: 1840, appointments: 54 },
  { name: 'Emergency ICU Care', visits: 1420, appointments: 38 }
];

const trafficSourcesData = [
  { name: 'Google Search', value: 6810, color: '#38bdf8' },
  { name: 'Facebook Organic & Ads', value: 5240, color: '#1877f2' },
  { name: 'Direct / Local Maps', value: 1800, color: '#2dd4bf' },
  { name: 'WhatsApp & Referrals', value: 1000, color: '#22c55e' }
];

const topBlogArticles = [
  {
    title: 'Monsoon Pet Care Guide: Humidity & Fungal Infection Prevention',
    category: 'Pet Health',
    readers: '2,410',
    shares: '128',
    conversions: '48 Appointments'
  },
  {
    title: 'Essential Vaccinations for Puppies & Kittens in Chattogram',
    category: 'Preventive Care',
    readers: '1,890',
    shares: '94',
    conversions: '36 Appointments'
  },
  {
    title: '5 Warning Signs of Dehydration in Summer Heat',
    category: 'Emergency Care',
    readers: '1,420',
    shares: '72',
    conversions: '24 Appointments'
  },
  {
    title: 'Nutritional Guidelines for Senior Cats in Bangladesh',
    category: 'Nutrition',
    readers: '980',
    shares: '41',
    conversions: '14 Appointments'
  }
];

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  onNavigate,
  showDemoBadges = true
}) => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '12m'>('30d');

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* Top Header & Tectonic Capability Notice */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent" size="sm" icon={<BarChart3 className="w-3.5 h-3.5 text-teal-700" />}>
              Tectonic Digital Analytics Capability
            </Badge>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/60">
              Demo Data
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Digital Marketing & Patient Analytics
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Demonstrating the integrated digital analytics reporting architecture Tectonic can deliver for Entity Veterinary Hospital. View simulated patient acquisition funnels, social media traffic flow, and clinical demand trends.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '30d' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '90d' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Last 90 Days
            </button>
            <button
              onClick={() => setTimeRange('12m')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '12m' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              1 Year
            </button>
          </div>

          {onNavigate && (
            <Button
              variant="outline"
              size="sm"
              icon={LayoutDashboard}
              onClick={() => onNavigate('admin')}
              className="border-slate-700 text-slate-200 hover:bg-slate-800"
            >
              Admin Main View
            </Button>
          )}
        </div>
      </div>

      {/* MANDATORY DISCLAIMER NOTE BOX */}
      <div className="p-4 sm:p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm text-amber-200 shadow-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-300 font-display block text-sm">
              Demo Analytics Disclaimer
            </strong>
            <p className="text-amber-200/90 leading-relaxed font-sans">
              "Demo analytics — actual data requires Google Analytics, Search Console, Meta and appointment system integration."
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono bg-amber-900/60 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-700/60 shrink-0">
          Sample Reporting Framework
        </span>
      </div>

      {/* 4 CORE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: 'Website Visits',
            value: '14,850',
            change: '+18.4%',
            subtext: 'vs previous 30 days',
            icon: Users,
            color: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
          },
          {
            title: 'Enquiries',
            value: '186',
            change: '+12.1%',
            subtext: 'Contact & WhatsApp messages',
            icon: MessageSquare,
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
          },
          {
            title: 'Appointments',
            value: '412',
            change: '+24.5%',
            subtext: 'Online booking requests',
            icon: Calendar,
            color: 'text-teal-400 bg-teal-500/10 border-teal-500/20'
          },
          {
            title: 'Conversion Rate',
            value: '2.77%',
            change: '+0.4%',
            subtext: 'Visits to booked appointments',
            icon: TrendingUp,
            color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
          }
        ].map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{kpi.title}</span>
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                  Demo Data
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <span className="text-3xl font-extrabold font-display text-white">
                  {kpi.value}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {kpi.change}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
                <span>{kpi.subtext}</span>
                <div className={`p-1 rounded-lg border ${kpi.color}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic Sources Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-sky-400" />
              <strong className="text-sm font-bold text-white font-display">Google Search Traffic</strong>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
              Demo Data
            </span>
          </div>
          <div className="text-2xl font-extrabold font-display text-sky-400">
            6,810 Clicks <span className="text-xs text-slate-400 font-normal font-sans">(45.8% of total)</span>
          </div>
          <p className="text-xs text-slate-400">High intent local queries: "vet in Chattogram", "pet hospital near me"</p>
        </div>

        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Facebook className="w-4 h-4 text-blue-400" />
              <strong className="text-sm font-bold text-white font-display">Facebook Social Traffic</strong>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
              Demo Data
            </span>
          </div>
          <div className="text-2xl font-extrabold font-display text-blue-400">
            5,240 Clicks <span className="text-xs text-slate-400 font-normal font-sans">(35.3% of total)</span>
          </div>
          <p className="text-xs text-slate-400">Educational pet care posts & page link referrals in Chattogram</p>
        </div>

        <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <strong className="text-sm font-bold text-white font-display">Appointment Requests</strong>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
              Demo Data
            </span>
          </div>
          <div className="text-2xl font-extrabold font-display text-teal-300">
            412 Bookings <span className="text-xs text-slate-400 font-normal font-sans">(38% from articles)</span>
          </div>
          <p className="text-xs text-slate-400">Direct online appointment funnel from website educational content</p>
        </div>
      </div>

      {/* RECHARTS SECTION 1: TRAFFIC TREND & APPOINTMENTS TREND */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Traffic Growth Trend */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold font-display text-white">Monthly Traffic Sources Trend</h2>
              <p className="text-xs text-slate-400">Google Search vs Facebook Social vs Direct Traffic</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/60 self-start sm:self-auto">
              Demo Data
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1877f2" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1877f2" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="google" name="Google Search" stroke="#38bdf8" fillOpacity={1} fill="url(#colorGoogle)" strokeWidth={2} />
                <Area type="monotone" dataKey="facebook" name="Facebook Social" stroke="#1877f2" fillOpacity={1} fill="url(#colorFacebook)" strokeWidth={2} />
                <Area type="monotone" dataKey="direct" name="Direct / Maps" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorDirect)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Appointment Requests by Day */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold font-display text-white">Weekly Appointment Demand</h2>
              <p className="text-xs text-slate-400">Confirmed vs Pending bookings by day</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/60 self-start sm:self-auto">
              Demo Data
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentRequestsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="confirmed" name="Confirmed Bookings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending Review" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECHARTS SECTION 2: TOP SERVICES & TRAFFIC SOURCES DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 3: Top Clinical Services */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold font-display text-white">Top Clinical Services Demand</h2>
              <p className="text-xs text-slate-400">Page views vs actual appointment bookings</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/60 self-start sm:self-auto">
              Demo Data
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topServicesData} margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="visits" name="Page Views" fill="#0284c7" radius={[0, 4, 4, 0]} />
                <Bar dataKey="appointments" name="Booked Appointments" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Traffic Sources Share (Pie / Donut) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold font-display text-white">Traffic Source Breakdown</h2>
              <p className="text-xs text-slate-400">Channel distribution by total visits</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/60 self-start sm:self-auto">
              Demo Data
            </span>
          </div>

          <div className="h-72 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOP EDUCATIONAL ARTICLES & LEAD GENERATION */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold font-display text-white">Top Performing Educational Content</h2>
            <p className="text-xs text-slate-400">Articles that drive organic traffic & patient appointments</p>
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/60 self-start sm:self-auto">
            Demo Data
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs font-mono min-w-[650px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="pb-3">Article Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Monthly Readers</th>
                <th className="pb-3">Social Shares</th>
                <th className="pb-3 text-right">Direct Appointment Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {topBlogArticles.map((art, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 font-sans font-bold text-white max-w-[320px] truncate">{art.title}</td>
                  <td className="py-3 text-teal-300">{art.category}</td>
                  <td className="py-3 text-slate-300">{art.readers} Readers</td>
                  <td className="py-3 text-sky-400">{art.shares} Shares</td>
                  <td className="py-3 text-right font-bold text-emerald-400">{art.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INTEGRATION STATUS ROADMAP & TECHNICAL NOTE */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>Tectonic Analytics Integration Plan</span>
            </h2>
            <p className="text-xs text-slate-400">
              Technical dependencies required to activate live production data for Entity Veterinary Hospital.
            </p>
          </div>
          <span className="text-xs font-mono text-teal-300 bg-teal-950 px-3 py-1 rounded border border-teal-800">
            Implementation Roadmap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              service: 'Google Analytics 4 (GA4)',
              purpose: 'Traffic tracking, user journeys, event telemetry',
              status: 'Ready for Tag Setup',
              color: 'text-sky-400 bg-sky-950/80 border-sky-800/60'
            },
            {
              service: 'Meta Pixel & API',
              purpose: 'Facebook social post clicks & ad conversions',
              status: 'Ready for Pixel ID',
              color: 'text-blue-400 bg-blue-950/80 border-blue-800/60'
            },
            {
              service: 'Google Search Console',
              purpose: 'Search term rankings, local Chattogram SEO',
              status: 'Ready for Verification',
              color: 'text-teal-400 bg-teal-950/80 border-teal-800/60'
            },
            {
              service: 'Hospital HMS API',
              purpose: 'Automated appointment conversion logging',
              status: 'Ready for Webhook',
              color: 'text-purple-400 bg-purple-950/80 border-purple-800/60'
            }
          ].map((item, index) => (
            <div key={index} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-xs text-white font-display">{item.service}</strong>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{item.purpose}</p>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border inline-block ${item.color}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
