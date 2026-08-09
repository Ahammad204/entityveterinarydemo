import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, Calendar, ArrowRight, User, Share2, Facebook, MessageCircle, Copy, Check } from 'lucide-react';

export interface BlogCardProps {
  post: BlogPost;
  onReadMore?: (postId: string) => void;
  showDemoBadge?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore, showDemoBadge = true }) => {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://entityveterinary.com';
  const shareUrl = `${baseUrl}/blog/${post.slug || post.id}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`${post.title} | Entity Veterinary Hospital`);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card hoverable className="flex flex-col h-full overflow-hidden border-slate-200/90 group">
      <div className="relative h-48 -mx-6 -mt-6 mb-4 bg-slate-100 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-xs">
            {post.category}
          </span>
        </div>

        {/* Quick Share Icons Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs p-1 rounded-xl border border-slate-700 opacity-90 hover:opacity-100 transition-opacity">
          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Share on Facebook"
            className="p-1.5 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <Facebook className="w-3.5 h-3.5 fill-current" />
          </a>
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Share on WhatsApp"
            className="p-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </a>
          <button
            onClick={handleCopy}
            title="Copy Article Link"
            className="p-1.5 text-slate-300 hover:text-teal-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 mb-2.5">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {post.readTime}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display mb-2 line-clamp-2">
        {post.title}
      </h3>

      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
        <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <User className="w-3.5 h-3.5 text-slate-400" />
          {post.author}
        </span>

        <button
          onClick={() => onReadMore?.(post.slug || post.id)}
          className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {showDemoBadge && post.demoNotice && (
        <div className="mt-3 pt-2 border-t border-dashed border-slate-200">
          <Badge variant="demo" size="sm">
            💡 {post.demoNotice}
          </Badge>
        </div>
      )}
    </Card>
  );
};
