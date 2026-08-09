import React, { useState } from 'react';
import { Page, BlogPost } from '../../types';
import { BLOG_POSTS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { BlogCard } from '../cards/BlogCard';
import { CTASection } from '../layout/CTASection';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { BlogSocialShare } from '../social/BlogSocialShare';
import { getPageMetadata } from '../../config/seoConfig';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  BookOpen,
  Search,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Code2,
  ExternalLink,
  Globe,
  Tag,
  Stethoscope,
  Copy,
  Check
} from 'lucide-react';

export interface BlogDetailViewProps {
  slug: string;
  onNavigate: (page: Page, param?: string) => void;
  onOpenBooking: () => void;
  showDemoBadges: boolean;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
  showDemoBadges
}) => {
  const [showSeoInspector, setShowSeoInspector] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Find article by slug or id
  const article = BLOG_POSTS.find((post) => post.slug === slug || post.id === slug) || BLOG_POSTS[0];

  if (!article) {
    return (
      <Container size="normal" className="py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Article Not Found</h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          The requested educational article could not be found or has been moved.
        </p>
        <Button variant="primary" onClick={() => onNavigate('blog')}>
          Return to Pet Care Resources
        </Button>
      </Container>
    );
  }

  // Related articles in same category or other posts
  const relatedArticles = BLOG_POSTS.filter(
    (post) => post.id !== article.id && (post.category === article.category || BLOG_POSTS.length <= 3)
  ).slice(0, 3);

  const handleCopyJson = () => {
    if (article.seo?.structuredDataJson) {
      navigator.clipboard.writeText(article.seo.structuredDataJson);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const { breadcrumbs } = getPageMetadata('blog-detail', { blogSlug: article.slug });

  return (
    <div className="space-y-12 py-8 animate-fade-in">
      {/* Top Breadcrumb & SEO Inspector Toggle */}
      <Container size="normal">
        <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-teal-700 transition-colors font-medium whitespace-nowrap"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-teal-700 transition-colors font-medium whitespace-nowrap"
            >
              Pet Care Resources (/blog)
            </button>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-xs font-mono text-[11px]">
              /blog/{article.slug}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowSeoInspector(!showSeoInspector)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                showSeoInspector
                  ? 'bg-slate-900 text-teal-300 border-slate-800'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-teal-600" />
              <span>{showSeoInspector ? 'Hide SEO Metadata' : 'Inspect Organic SEO & Schema'}</span>
            </button>

            <Button
              variant="outline"
              size="xs"
              onClick={() => onNavigate('blog')}
              icon={ArrowLeft}
              iconPosition="left"
            >
              All Articles
            </Button>
          </div>
        </div>
      </Container>

      {/* ARTICLE HERO SECTION */}
      <Container size="normal">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Category & Demo Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-900 text-teal-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border border-teal-800">
              {article.category}
            </span>
            {showDemoBadges && (
              <span className="text-xs text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded font-mono">
                💡 Demo Content — SEO Strategy Concept
              </span>
            )}
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-slate-600 leading-relaxed font-medium border-l-4 border-teal-600 pl-4 py-1 italic bg-slate-50/50 rounded-r-xl">
            "{article.excerpt}"
          </p>

          {/* Author Placeholder & Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3">
              <img
                src={article.authorAvatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'}
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-600 shadow-2xs shrink-0"
              />
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold block">Written & Verified By</span>
                <strong className="text-sm font-bold text-slate-900 block">{article.author}</strong>
                <span className="text-xs text-teal-700 font-medium">{article.authorRole || 'Veterinary Clinical Specialist'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Hero Featured Image */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md h-72 sm:h-96 lg:h-[420px] bg-slate-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1 rounded-lg border border-slate-700">
              Entity Veterinary Hospital Educational Media
            </div>
          </div>

          {/* Social Share Buttons */}
          <BlogSocialShare
            articleSlug={article.slug}
            articleTitle={article.title}
            articleExcerpt={article.excerpt}
          />
        </div>
      </Container>

      {/* MEDICAL ADVICE DISCLAIMER BOX */}
      <Container size="normal">
        <div className="max-w-4xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-start gap-3 text-amber-950">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="font-bold uppercase tracking-wider block text-amber-900">
              Educational & Local Search Strategy Disclaimer
            </span>
            <p className="text-slate-700 leading-relaxed">
              Medical Notice: The contents of this article are created for general pet parent education and search strategy demonstration. Do not present medical claims as verified Entity Veterinary advice. Content must not replace direct diagnosis, triage, or clinical care by a licensed veterinarian.
            </p>
          </div>
        </div>
      </Container>

      {/* SEO & STRUCTURED DATA INSPECTOR DRAWER (OPTIONAL TOGGLE) */}
      {showSeoInspector && article.seo && (
        <Container size="normal">
          <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold font-display text-white">
                  SEO & Structured Data Inspector Placeholder
                </h3>
              </div>
              <span className="text-xs font-mono text-teal-400 bg-teal-950 px-2.5 py-0.5 rounded border border-teal-800">
                SEO_STATUS: OPTIMIZED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Metadata Preview */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                  Search Engine Metadata (HTML Tags)
                </span>
                <div>
                  <span className="text-slate-500 font-mono block text-[10px]">Title Tag (&lt;title&gt;)</span>
                  <p className="font-bold text-slate-200 mt-0.5">{article.seo.metaTitle}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block text-[10px]">Meta Description</span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{article.seo.metaDescription}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-mono block text-[10px]">Canonical URL</span>
                  <p className="text-teal-300 font-mono text-[11px] mt-0.5">{article.seo.canonicalUrl}</p>
                </div>
              </div>

              {/* Open Graph Card Preview */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                  Open Graph Social Card (Facebook / WhatsApp / Twitter)
                </span>
                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                  <img src={article.seo.ogImage} alt="OG Preview" className="w-full h-28 object-cover" />
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">entityveterinary.com</span>
                    <strong className="text-slate-100 block truncate">{article.seo.ogTitle}</strong>
                    <p className="text-slate-400 line-clamp-2 text-[11px]">{article.seo.ogDescription}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* JSON-LD Schema Code Box */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Schema.org Structured Data (JSON-LD Placeholder)
                </span>
                <button
                  onClick={handleCopyJson}
                  className="text-xs text-teal-300 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 font-mono"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied JSON</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Schema</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="text-[11px] font-mono text-teal-300/90 bg-slate-900/90 p-3 rounded-xl overflow-x-auto border border-slate-800/80 leading-relaxed">
                {article.seo.structuredDataJson}
              </pre>
            </div>
          </div>
        </Container>
      )}

      {/* ARTICLE BODY CONTENT */}
      <Container size="normal">
        <article className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xs space-y-8 text-slate-800">
          {article.content ? (
            <div className="space-y-8 leading-relaxed">
              {/* Introduction */}
              <div className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {article.content.introduction}
              </div>

              {/* Sections */}
              {article.content.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3 pt-4 border-t border-slate-100">
                  <h2 className="text-2xl font-bold font-display text-slate-900">
                    {sec.heading}
                  </h2>

                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {sec.body}
                  </p>

                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <ul className="space-y-2 my-3 pl-2">
                      {sec.bulletPoints.map((bp, bidx) => (
                        <li key={bidx} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Conclusion */}
              <div className="bg-teal-50/70 border border-teal-200/80 p-6 rounded-2xl space-y-2">
                <h3 className="text-base font-bold text-teal-950 font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  Key Takeaway for Pet Parents
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {article.content.conclusion}
                </p>
              </div>

              {/* Content-to-Conversion Journey Banner */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold font-mono text-teal-300 uppercase tracking-wider">
                      Recommended Clinical Next Step
                    </span>
                  </div>
                  <Badge variant="demo" size="sm">Content → Service → Appointment</Badge>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <strong className="text-base font-bold font-display text-white block">
                      Preventive Vaccination & Clinical Screening
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Book a health check-up or dermatological screening with Dr. Partha or Dr. Aslam Hossain at Entity Veterinary Hospital.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onNavigate('service-detail', 'preventive-vaccination')}
                      className="border-slate-700 text-slate-200 hover:bg-slate-800"
                    >
                      View Service
                    </Button>
                    <Button
                      variant="primary"
                      size="xs"
                      icon={Calendar}
                      onClick={() => onOpenBooking('preventive-vaccination')}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Footer Author Bio Box */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <img
                    src={article.authorAvatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'}
                    alt={article.author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-teal-600 shrink-0"
                  />
                  <div>
                    <strong className="text-slate-900 font-bold block">{article.author}</strong>
                    <p className="text-xs text-slate-500">{article.authorRole}</p>
                    <p className="text-[11px] text-teal-700 font-medium mt-0.5">Entity Veterinary Clinical Contributor</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenBooking}
                  icon={Calendar}
                  iconPosition="left"
                  className="shrink-0"
                >
                  Book Doctor Consultation
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-slate-600">Full article content is being loaded...</p>
          )}
        </article>
      </Container>

      {/* RELATED ARTICLES SECTION */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-50/80 py-12 border-y border-slate-200/80">
          <Container size="normal" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Expand Your Knowledge
                </span>
                <h2 className="text-2xl font-bold font-display text-slate-900 mt-1">
                  Related Pet Healthcare Articles
                </h2>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('blog')}
              >
                View All Articles
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relPost) => (
                <BlogCard
                  key={relPost.id}
                  post={relPost}
                  onReadMore={(targetSlug) => onNavigate('blog-detail', targetSlug)}
                  showDemoBadge={showDemoBadges}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA SECTION */}
      <CTASection
        title="Have Questions About Your Pet's Health?"
        subtitle="Book a consultation with Entity Veterinary doctors for personalized advice and clinical evaluation."
        onBook={onOpenBooking}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
