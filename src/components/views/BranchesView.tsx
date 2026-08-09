import React, { useState } from 'react';
import { Branch, Page } from '../../types';
import { BRANCHES } from '../../data/mockData';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { BranchCard } from '../cards/BranchCard';
import { CTASection } from '../layout/CTASection';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  MapPin,
  Building2,
  Database,
  ShieldCheck,
  AlertTriangle,
  Code,
  Layers,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Info
} from 'lucide-react';

export interface BranchesViewProps {
  onNavigate: (page: Page) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string, branchId?: string) => void;
  onSelectBranchDetail: (branchId: string) => void;
  showDemoBadges: boolean;
}

export const BranchesView: React.FC<BranchesViewProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectBranchDetail,
  showDemoBadges
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'chattogram' | 'other'>('all');
  const [showCmsArchitecture, setShowCmsArchitecture] = useState(false);

  // Filter branches based on active tab
  const filteredBranches = BRANCHES.filter((branch) => {
    if (activeFilter === 'chattogram') return branch.regionCategory === 'chattogram';
    if (activeFilter === 'other') return branch.regionCategory === 'other';
    return true;
  });

  const { breadcrumbs } = getPageMetadata('branches');

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
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/90 px-3 py-1 rounded border border-teal-800">
                Multi-Branch Management System
              </span>
              {showDemoBadges && (
                <span className="text-xs text-teal-300 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded font-mono">
                  🔌 CMS & Database Ready
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
              Entity Veterinary Hospital Locations
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Demonstrating a digital multi-branch architecture designed to connect central hospital facilities, satellite grooming clinics, and regional expansion nodes across Bangladesh.
            </p>

            {/* Quick Stats Bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800">
              <div>
                <span className="text-2xl font-black text-white font-display">4 Nodes</span>
                <span className="text-xs text-slate-400 block">Demonstration Network</span>
              </div>
              <div>
                <span className="text-2xl font-black text-teal-400 font-display">Chattogram</span>
                <span className="text-xs text-slate-400 block">Primary Hospital Hub</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-2xl font-black text-sky-400 font-display">100% Sync</span>
                <span className="text-xs text-slate-400 block">Central Booking Pipeline</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. DATABASE & CMS ARCHITECTURE BANNER */}
      <Container size="normal">
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-teal-400" />
                <h3 className="text-lg font-bold font-display text-white">
                  Headless CMS & Database Architecture Indicator
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                This multi-branch experience is constructed on a decoupled data schema. In production, each branch record dynamically fetches real-time hours, clinician rosters, and emergency status from Firestore, Cloud SQL, or a Headless CMS.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCmsArchitecture(!showCmsArchitecture)}
              icon={Code}
              iconPosition="left"
              className="text-teal-300 border-teal-800 hover:bg-slate-800 shrink-0 self-start md:self-center"
            >
              {showCmsArchitecture ? 'Hide CMS Schema' : 'Inspect CMS JSON Schema'}
            </Button>
          </div>

          {/* Expandable JSON Schema */}
          {showCmsArchitecture && (
            <div className="pt-4 border-t border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>// Branch Data Node Schema Model (JSON)</span>
                <span className="text-teal-400">STATUS: VALIDATED_SCHEMA</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl overflow-x-auto text-teal-300 text-[11px] leading-relaxed border border-slate-800">
{`{
  "branch_id": "branch-chattogram-main",
  "slug": "main-hospital-chattogram",
  "name": "Entity Veterinary Hospital — Main Hospital",
  "region_category": "chattogram",
  "status_notice": "Information to be confirmed",
  "data_sync": {
    "firestore_collection": "branches",
    "live_api_endpoint": "/api/v1/branches/main-hospital-chattogram",
    "cms_content_type": "veterinaryBranchNode"
  },
  "contact": {
    "street_address": "Information to be confirmed",
    "phone": "Information to be confirmed",
    "emergency_hotline": "Information to be confirmed"
  }
}`}
              </pre>
            </div>
          )}
        </div>
      </Container>

      {/* 3. FILTER TABS & BRANCH GRID */}
      <section>
        <Container size="normal">
          <SectionHeading
            eyebrow="Network Locations"
            title="Explore Entity Veterinary Hospital Branches"
            subtitle="Filter hospital hubs, satellite clinics, and regional expansion nodes across Bangladesh."
            showDemoBadge={showDemoBadges}
            demoNotice="All branch addresses, phone numbers, and hours marked 'Information to be confirmed'"
          />

          {/* Region Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Branches ({BRANCHES.length})
            </button>

            <button
              onClick={() => setActiveFilter('chattogram')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'chattogram'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Chattogram ({BRANCHES.filter((b) => b.regionCategory === 'chattogram').length})
            </button>

            <button
              onClick={() => setActiveFilter('other')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'other'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Other Locations ({BRANCHES.filter((b) => b.regionCategory === 'other').length})
            </button>
          </div>

          {/* Branch Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBranches.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                onSelectBranch={(branchId) => onOpenBooking(undefined, undefined, branchId)}
                onSelectBranchDetail={onSelectBranchDetail}
                showDemoBadge={showDemoBadges}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. FACTUAL GOVERNANCE & TRANSPARENCY NOTICE */}
      <Container size="normal">
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-amber-950">
            <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0" />
            <h3 className="text-lg font-bold font-display">
              Factual Governance & Data Verification Protocol
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Entity Veterinary Hospital strictly presents factual information. To ensure full compliance and avoid misleading pet owners, exact street addresses, telephone extensions, and emergency hotlines across all demonstration branch cards are designated as <strong>"Information to be confirmed"</strong> pending clinical board sign-off and database mapping.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium border-t border-amber-200/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              Centralized Appointment Routing
            </span>
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" />
              Transparent Contact Status
            </span>
            <span className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-slate-500" />
              CMS & Database Integration Ready
            </span>
          </div>
        </div>
      </Container>

      {/* 5. CALL TO ACTION */}
      <CTASection
        title="Connect with Your Nearest Entity Veterinary Location"
        subtitle="Book your appointment online with instant branch preselection or call our central clinical desk."
        onBook={() => onOpenBooking()}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
