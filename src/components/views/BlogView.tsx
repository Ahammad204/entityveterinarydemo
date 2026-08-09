import React, { useState, useMemo } from 'react';
import { Page, BlogCategory, BlogPost } from '../../types';
import { BLOG_POSTS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';
import { BlogCard } from '../cards/BlogCard';
import { CTASection } from '../layout/CTASection';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  Search,
  Filter,
  BookOpen,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Globe,
  Tag,
  Clock,
  RotateCcw
} from 'lucide-react';

export interface BlogViewProps {
  onNavigate: (page: Page, param?: string) => void;
  onOpenBooking: () => void;
  showDemoBadges: boolean;
}

const ALL_CATEGORIES: ('All' | BlogCategory)[] = [
  'All',
  'Pet Health',
  'Nutrition',
  'Preventive Care',
  'Grooming',
  'Pet Parenting'
];

export const BlogView: React.FC<BlogViewProps> = ({
  onNavigate,
  onOpenBooking,
  showDemoBadges
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'readTime'>('newest');

  // Filter & Search Logic
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // Category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(query);
        const inExcerpt = post.excerpt.toLowerCase().includes(query);
        const inCategory = post.category.toLowerCase().includes(query);
        const inAuthor = post.author.toLowerCase().includes(query);
        return inTitle || inExcerpt || inCategory || inAuthor;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'readTime') {
        const aMin = parseInt(a.readTime) || 0;
        const bMin = parseInt(b.readTime) || 0;
        return aMin - bMin;
      }
      return 0; // Default order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('newest');
  };

  const { breadcrumbs } = getPageMetadata('blog');

  return (
    <div className="space-y-12 py-6 animate-fade-in">
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
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded border border-teal-800">
                Educational Content & Local Search Strategy
              </span>
              {showDemoBadges && (
                <span className="text-xs text-amber-300 bg-amber-950/80 border border-amber-800 px-2.5 py-0.5 rounded font-mono">
                  💡 Organic Traffic Engine Concept
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              Pet Care Resources
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Demonstrating how Tectonic can help Entity Veterinary Hospital capture organic search traffic, establish healthcare authority, and empower pet owners across Chattogram with reliable companion wellness guides.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-teal-400" />
                Targeted Local Search Optimization (SEO)
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-400" />
                {BLOG_POSTS.length} Educational Articles Available
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. DEMO & MEDICAL DISCLAIMER NOTICE */}
      <Container size="normal">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-amber-950 shadow-2xs">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block text-amber-900 mb-0.5">
                Non-Verified Advice Disclaimer & Strategy Demonstration
              </span>
              <p className="text-slate-700 leading-relaxed">
                Do not present medical claims as verified Entity Veterinary advice. All educational articles in this portal are created as demonstration content for local search strategy and patient education. Always consult a licensed veterinarian for specific pet medical diagnosis.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-amber-900 bg-amber-100 px-3 py-1 rounded border border-amber-300 shrink-0 self-start sm:self-center">
            CONTENT_TYPE: DEMO_ARTICLES
          </span>
        </div>
      </Container>

      {/* 3. SEARCH & CATEGORY FILTER INTERFACE */}
      <Container size="normal">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-6">
          {/* Top Bar: Search input & Sort dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by keyword, topic, or author..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorting & Reset */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none"
                >
                  <option value="newest">Featured & Recent</option>
                  <option value="readTime">Shortest Read Time</option>
                </select>
              </div>

              {(selectedCategory !== 'All' || searchQuery !== '' || sortBy !== 'newest') && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Browse by Category:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {ALL_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Tag className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* 4. ARTICLES GRID */}
      <Container size="normal">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
              <span>Articles ({filteredPosts.length})</span>
              {selectedCategory !== 'All' && (
                <span className="text-xs text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 font-sans">
                  Category: {selectedCategory}
                </span>
              )}
            </h2>

            <span className="text-xs text-slate-400 font-mono">
              Entity Veterinary Knowledge Hub
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onReadMore={(slug) => onNavigate('blog-detail', slug)}
                  showDemoBadge={showDemoBadges}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 font-display">No Articles Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No articles matched your selected category or search keywords.
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Clear Search & Filters
              </Button>
            </div>
          )}
        </div>
      </Container>

      {/* 5. ORGANIC SEO STRATEGY CONCEPT HIGHLIGHT */}
      <Container size="normal">
        <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  How Tectonic Content Strategy Drives Local Growth
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Building Organic Search Traffic for Entity Veterinary
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                By publishing structured educational articles addressing local pet owner queries (monsoon care, vaccination schedules, feline nutrition in Chattogram), Entity Veterinary ranks naturally for high-intent search terms on Google.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={onOpenBooking}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shrink-0"
            >
              Book Clinical Consultation
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-teal-300 block font-mono text-sm">1. High-Intent Traffic</strong>
              <p className="text-slate-400">Captures pet parents actively searching for health symptoms and vaccine schedules.</p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-teal-300 block font-mono text-sm">2. Patient Trust & Authority</strong>
              <p className="text-slate-400">Establishes Entity doctors as trusted clinical leaders in Chattogram.</p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-teal-300 block font-mono text-sm">3. Seamless Conversion</strong>
              <p className="text-slate-400">Directly links educational articles to online doctor appointment booking.</p>
            </div>
          </div>
        </div>
      </Container>

      {/* 6. CALL TO ACTION SECTION */}
      <CTASection
        title="Have Questions About Your Pet's Health?"
        subtitle="Book a consultation with Entity Veterinary doctors for personalized advice and expert clinical care."
        onBook={onOpenBooking}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
