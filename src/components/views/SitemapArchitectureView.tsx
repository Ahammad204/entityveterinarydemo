import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import {
  getPageMetadata,
  getWebSiteSchema,
  getOrganizationSchema,
  getVeterinaryCareSchema,
  getServiceSchema,
  getArticleSchema,
  getProductSchema,
  getBreadcrumbSchema
} from '../../config/seoConfig';
import { SERVICES as VETERINARY_SERVICES, BLOG_POSTS, DEMO_PRODUCTS as SHOP_PRODUCTS, BRANCHES } from '../../data/mockData';
import {
  Compass,
  FileCode,
  Globe,
  Code,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Sparkles,
  Layers,
  MapPin,
  ShieldCheck,
  FileText,
  Bot
} from 'lucide-react';

export interface SitemapArchitectureViewProps {
  onNavigate?: (page: any, param?: string) => void;
}

export const SitemapArchitectureView: React.FC<SitemapArchitectureViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'robots' | 'schemas' | 'audit'>('visual');
  const [selectedSchemaType, setSelectedSchemaType] = useState<'VeterinaryCare' | 'LocalBusiness' | 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Article' | 'Service'>('VeterinaryCare');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const { breadcrumbs } = getPageMetadata('sitemap');

  const sitemapXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://entityveterinary.com/</loc><lastmod>2026-08-08</lastmod><priority>1.0</priority></url>
  <url><loc>https://entityveterinary.com/about</loc><lastmod>2026-08-08</lastmod><priority>0.8</priority></url>
  <url><loc>https://entityveterinary.com/services</loc><lastmod>2026-08-08</lastmod><priority>0.9</priority></url>
  <url><loc>https://entityveterinary.com/services/veterinary-consultation</loc><lastmod>2026-08-08</lastmod><priority>0.85</priority></url>
  <url><loc>https://entityveterinary.com/doctors</loc><lastmod>2026-08-08</lastmod><priority>0.8</priority></url>
  <url><loc>https://entityveterinary.com/branches</loc><lastmod>2026-08-08</lastmod><priority>0.9</priority></url>
  <url><loc>https://entityveterinary.com/branches/branch-chattogram-main</loc><lastmod>2026-08-08</lastmod><priority>0.85</priority></url>
  <url><loc>https://entityveterinary.com/blog</loc><lastmod>2026-08-08</lastmod><priority>0.8</priority></url>
  <url><loc>https://entityveterinary.com/blog/monsoon-pet-care-chattogram</loc><lastmod>2026-08-08</lastmod><priority>0.7</priority></url>
  <url><loc>https://entityveterinary.com/shop</loc><lastmod>2026-08-08</lastmod><priority>0.8</priority></url>
  <url><loc>https://entityveterinary.com/contact</loc><lastmod>2026-08-08</lastmod><priority>0.9</priority></url>
  <url><loc>https://entityveterinary.com/appointment</loc><lastmod>2026-08-08</lastmod><priority>0.9</priority></url>
  <url><loc>https://entityveterinary.com/sitemap</loc><lastmod>2026-08-08</lastmod><priority>0.5</priority></url>
</urlset>`;

  const robotsTxtContent = `# Entity Veterinary Hospital - Technical SEO Configuration
# Domain: entityveterinary.com | Chattogram, Bangladesh

User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /checkout/
Disallow: /admin/

# Dynamic XML Sitemap Reference
Sitemap: https://entityveterinary.com/sitemap.xml`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const getSelectedSchemaJson = () => {
    switch (selectedSchemaType) {
      case 'VeterinaryCare':
      case 'LocalBusiness':
        return getVeterinaryCareSchema(BRANCHES[0]);
      case 'Organization':
        return getOrganizationSchema();
      case 'WebSite':
        return getWebSiteSchema();
      case 'BreadcrumbList':
        return getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Veterinary Consultation', url: '/services/veterinary-consultation' }
        ]);
      case 'Article':
        return getArticleSchema(BLOG_POSTS[0]);
      case 'Service':
        return getServiceSchema(VETERINARY_SERVICES[0]);
      default:
        return getVeterinaryCareSchema();
    }
  };

  return (
    <div className="space-y-12 py-8 animate-fade-in">
      <Container size="normal">
        {onNavigate && <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />}
      </Container>

      {/* Hero Banner */}
      <section className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 p-8 sm:p-12 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <Container size="normal" className="relative z-10">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="accent" size="sm" icon={<Sparkles className="w-3 h-3 text-teal-700" />}>
                Tectonic SEO Framework
              </Badge>
              <Badge variant="demo" size="sm">Technical SEO & Local Search</Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              Sitemap Architecture & Technical SEO Hub
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Demonstrating full technical SEO compliance for Entity Veterinary Hospital in Chattogram. Features page-specific meta tags, Open Graph card tags, dynamic XML sitemaps, robots.txt directives, and structured JSON-LD schema placeholders.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation Tabs */}
      <Container size="normal">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 mb-8">
          {[
            { id: 'visual', label: '1. Visual URL Architecture', icon: Compass },
            { id: 'xml', label: '2. sitemap.xml', icon: Globe },
            { id: 'robots', label: '3. robots.txt', icon: Bot },
            { id: 'schemas', label: '4. JSON-LD Schemas', icon: Code },
            { id: 'audit', label: '5. Technical SEO Checklist', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-teal-900 text-white shadow-md shadow-teal-900/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Visual URL Architecture */}
        {activeTab === 'visual' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900">
                  Visual Site Hierarchy & Crawl Tree
                </h2>
                <p className="text-xs text-slate-500">
                  Search engine friendly structure designed for crawlability and local user intent.
                </p>
              </div>
              <Badge variant="verified">100% Crawlable</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1: Core Navigation */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono block">
                  Core Pages (High Priority)
                </span>
                <ul className="space-y-2 text-xs font-mono text-slate-800">
                  <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span>/ (Home)</span>
                    <span className="text-[10px] text-teal-700 font-bold">Priority 1.0</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span>/services</span>
                    <span className="text-[10px] text-teal-700 font-bold">Priority 0.9</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span>/branches</span>
                    <span className="text-[10px] text-teal-700 font-bold">Priority 0.9</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span>/contact</span>
                    <span className="text-[10px] text-teal-700 font-bold">Priority 0.9</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                    <span>/appointment</span>
                    <span className="text-[10px] text-teal-700 font-bold">Priority 0.9</span>
                  </li>
                </ul>
              </div>

              {/* Pillar 2: Service Intent URLs */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono block">
                  Service Detail URLs (Intent SEO)
                </span>
                <ul className="space-y-2 text-xs font-mono text-slate-800">
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/services/veterinary-consultation</span>
                  </li>
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/services/soft-tissue-orthopedic-surgery</span>
                  </li>
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/services/preventive-vaccination</span>
                  </li>
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/services/digital-xray-ultrasound</span>
                  </li>
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/services/emergency-triage-icu</span>
                  </li>
                </ul>
              </div>

              {/* Pillar 3: Local Search & Content */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono block">
                  Local Search & Article Nodes
                </span>
                <ul className="space-y-2 text-xs font-mono text-slate-800">
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/branches/branch-chattogram-main</span>
                  </li>
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/doctors/dr-partha</span>
                  </li>
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/blog/monsoon-pet-care-chattogram</span>
                  </li>
                  <li className="p-2 bg-white rounded-lg border border-slate-200">
                    <span>/shop/premium-adult-dog-kibble-chicken-rice</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: sitemap.xml */}
        {activeTab === 'xml' && (
          <div className="bg-slate-950 text-slate-200 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-teal-400 font-bold block">XML Sitemap Standard</span>
                <h2 className="text-lg font-bold text-white">/public/sitemap.xml</h2>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleCopy(sitemapXmlContent, 'xml')}
                icon={copiedTab === 'xml' ? Check : Copy}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                {copiedTab === 'xml' ? 'Copied XML!' : 'Copy XML'}
              </Button>
            </div>
            <pre className="text-xs overflow-x-auto p-4 bg-slate-900/90 rounded-2xl border border-slate-800 leading-relaxed text-teal-300">
              {sitemapXmlContent}
            </pre>
          </div>
        )}

        {/* Tab 3: robots.txt */}
        {activeTab === 'robots' && (
          <div className="bg-slate-950 text-slate-200 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-teal-400 font-bold block">Robot Exclusion Standard</span>
                <h2 className="text-lg font-bold text-white">/public/robots.txt</h2>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleCopy(robotsTxtContent, 'robots')}
                icon={copiedTab === 'robots' ? Check : Copy}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                {copiedTab === 'robots' ? 'Copied Robots.txt!' : 'Copy robots.txt'}
              </Button>
            </div>
            <pre className="text-xs overflow-x-auto p-4 bg-slate-900/90 rounded-2xl border border-slate-800 leading-relaxed text-amber-300">
              {robotsTxtContent}
            </pre>
          </div>
        )}

        {/* Tab 4: JSON-LD Schemas */}
        {activeTab === 'schemas' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900">
                  JSON-LD Structured Data Inspector
                </h2>
                <p className="text-xs text-slate-500">
                  Generates Schema.org markup dynamically for search engine rich results.
                </p>
              </div>

              {/* Schema Type Switcher */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  'VeterinaryCare',
                  'LocalBusiness',
                  'Organization',
                  'WebSite',
                  'BreadcrumbList',
                  'Article',
                  'Service'
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedSchemaType(type as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                      selectedSchemaType === type
                        ? 'bg-teal-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated JSON-LD Preview Box */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-400 font-bold">
                  Target Schema: {selectedSchemaType}
                </span>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleCopy(JSON.stringify(getSelectedSchemaJson(), null, 2), 'schema')}
                  icon={copiedTab === 'schema' ? Check : Copy}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800"
                >
                  {copiedTab === 'schema' ? 'Copied JSON!' : 'Copy Schema'}
                </Button>
              </div>

              <pre className="text-xs text-emerald-400 overflow-x-auto p-4 bg-slate-900/90 rounded-xl border border-slate-800 leading-relaxed max-h-[400px]">
                {JSON.stringify(getSelectedSchemaJson(), null, 2)}
              </pre>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-sans leading-relaxed">
                <strong className="text-teal-300 block mb-0.5">Verification Rule Applied:</strong>
                All structured data tags strictly adhere to verified information standards. Unconfirmed addresses, opening hours, phone numbers, GPS coordinates, or review metrics use explicitly marked placeholders or are omitted to prevent misinformation.
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Technical SEO Checklist */}
        {activeTab === 'audit' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900">
                Technical SEO & Local Search Audit Checklist
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                A summary of implementation features across the Entity Veterinary Hospital web application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Page-Specific Title Tags', desc: 'Unique title rendered dynamically on every route via SEOHead manager.' },
                { title: 'Meta Descriptions', desc: 'Targeted descriptions under 160 characters describing page content.' },
                { title: 'Canonical URLs', desc: 'Clean self-referencing canonical links pointing to entityveterinary.com.' },
                { title: 'Open Graph Metadata', desc: 'og:title, og:description, og:image, and og:type tags for social sharing.' },
                { title: 'Twitter / X Cards', desc: 'twitter:card summary_large_image tags for rich preview rendering.' },
                { title: 'robots.txt Configuration', desc: 'Configured in /public/robots.txt with sitemap location declared.' },
                { title: 'sitemap.xml Generator', desc: 'Full XML sitemap located in /public/sitemap.xml with priority weighting.' },
                { title: 'Semantic HTML5 Markup', desc: '<header>, <main>, <section>, <article>, <aside>, <footer> element structure.' },
                { title: 'Heading Hierarchy', desc: 'Strict single h1 per page with logical h2 and h3 nesting.' },
                { title: 'Descriptive Image Alt Text', desc: 'Contextual alt tags across all hero banners, doctor avatars, and product images.' },
                { title: 'Internal Cross-Linking', desc: 'Direct internal linking between services, doctors, branches, blog posts, and contact.' },
                { title: 'JSON-LD Structured Data', desc: 'VeterinaryCare, LocalBusiness, Organization, WebSite, Article, Service, and Breadcrumbs.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block font-display">{item.title}</strong>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
