import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Facebook, 
  Share2, 
  ExternalLink, 
  MessageCircle, 
  Calendar, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Bell, 
  Heart,
  ArrowRight
} from 'lucide-react';

export interface SocialSectionProps {
  onNavigate?: (page: string, param?: string) => void;
  onOpenBooking?: (serviceId?: string, doctorId?: string) => void;
  showDemoBadge?: boolean;
}

export const SocialSection: React.FC<SocialSectionProps> = ({
  onNavigate,
  onOpenBooking,
  showDemoBadge = true
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'latest' | 'educational' | 'tips' | 'clinic'>('all');

  const facebookUrl = 'https://www.facebook.com/share/19JJaRpM7w/';

  const demoPosts = [
    {
      id: 'post-1',
      category: 'latest',
      categoryLabel: 'Latest Updates',
      icon: Bell,
      title: 'New Diagnostic Imaging Suite Operational at Chattogram Main Branch',
      date: 'Aug 06, 2026',
      summary: 'Entity Veterinary Hospital has upgraded its radiology department with high-resolution digital X-Ray and color Doppler ultrasound for fast, accurate non-invasive diagnostics.',
      hashtags: '#ChattogramVet #DigitalXRay #EntityVeterinary',
      likes: 142,
      shares: 28,
      linkedType: 'service',
      targetParam: 'digital-xray-ultrasound',
      actionLabel: 'Explore Imaging Service'
    },
    {
      id: 'post-2',
      category: 'educational',
      categoryLabel: 'Educational Content',
      icon: FileText,
      title: 'Monsoon Pet Care Guide: Humidity & Fungal Infection Prevention',
      date: 'Aug 02, 2026',
      summary: 'Monsoon rain in Chattogram brings high humidity levels that increase skin and ear infection risks for dogs and cats. Read our comprehensive care protocol.',
      hashtags: '#PetCareTips #MonsoonCare #VeterinaryAdvice',
      likes: 215,
      shares: 64,
      linkedType: 'blog',
      targetParam: 'monsoon-pet-care-chattogram',
      actionLabel: 'Read Website Article'
    },
    {
      id: 'post-3',
      category: 'tips',
      categoryLabel: 'Pet Care Tips',
      icon: Heart,
      title: '5 Warning Signs of Dehydration in Summer & Monsoon Heat',
      date: 'Jul 28, 2026',
      summary: 'Recognize loss of skin elasticity, dry gums, and lethargy early. Ensure clean drinking water and electrolyte replacement for pets in warm humid conditions.',
      hashtags: '#DogHealth #CatCare #HydrationAlert',
      likes: 189,
      shares: 42,
      linkedType: 'service',
      targetParam: 'preventive-vaccination',
      actionLabel: 'Book Preventive Screening'
    },
    {
      id: 'post-4',
      category: 'clinic',
      categoryLabel: 'Clinic Updates',
      icon: ShieldCheck,
      title: 'Clinical Leadership Update: Dr. Partha & Dr. Aslam Conduct Emergency Workshop',
      date: 'Jul 20, 2026',
      summary: 'Our clinical team completed specialized triage and soft-tissue surgery protocols to maintain 24/7 emergency readiness across Chattogram branches.',
      hashtags: '#VetLeadership #EmergencyCare #ChattogramHospitals',
      likes: 310,
      shares: 85,
      linkedType: 'doctor',
      targetParam: 'dr-partha',
      actionLabel: 'Meet Clinical Team'
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? demoPosts 
    : demoPosts.filter(p => p.category === activeCategory);

  const handleCardAction = (post: typeof demoPosts[0]) => {
    if (!onNavigate) return;
    if (post.linkedType === 'blog') {
      onNavigate('blog-detail', post.targetParam);
    } else if (post.linkedType === 'service') {
      onNavigate('service-detail', post.targetParam);
    } else if (post.linkedType === 'doctor') {
      onNavigate('doctor-detail', post.targetParam);
    }
  };

  return (
    <section className="bg-slate-900 text-white py-12 sm:py-16 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="normal" className="relative z-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" size="sm" icon={<Share2 className="w-3.5 h-3.5 text-teal-700" />}>
                Social Media & Community Hub
              </Badge>
              <Badge variant="demo" size="sm">Demo Social Content</Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Stay Connected with Entity Veterinary Hospital
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore our latest clinical updates, pet care advice, and community alerts shared on social media. All entries below represent sample posts created to demonstrate social media integration.
            </p>
          </div>

          {/* Primary Requirement Facebook CTA */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/30 shrink-0 group"
          >
            <Facebook className="w-5 h-5 fill-current" />
            <span>Follow Entity Veterinary on Facebook</span>
            <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Categories Tab Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          {[
            { id: 'all', label: 'All Updates' },
            { id: 'latest', label: 'Latest Updates' },
            { id: 'educational', label: 'Educational Content' },
            { id: 'tips', label: 'Pet Care Tips' },
            { id: 'clinic', label: 'Clinic Updates' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat.id
                  ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md shadow-teal-500/20'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Demo Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => {
            const CategoryIcon = post.icon;
            return (
              <div
                key={post.id}
                className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-md group"
              >
                <div className="space-y-3">
                  {/* Post Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-slate-800 text-teal-400 rounded-lg">
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-teal-300 font-mono">
                        {post.categoryLabel}
                      </span>
                    </div>

                    {/* Mandated Label */}
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-800/60 px-2.5 py-1 rounded-md">
                      Demo Social Content
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-teal-300 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {post.summary}
                  </p>

                  <span className="text-xs text-sky-400 font-mono block">
                    {post.hashtags}
                  </span>
                </div>

                {/* Card Footer & Action */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5 text-teal-400" />
                      {post.shares}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCardAction(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white transition-colors"
                  >
                    <span>{post.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              All social media posts shown here are strictly designated as <strong>"Demo Social Content"</strong> for architectural integration testing.
            </span>
          </div>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-white font-bold underline underline-offset-4 shrink-0 flex items-center gap-1"
          >
            <span>Visit Official Facebook Page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </Container>
    </section>
  );
};
