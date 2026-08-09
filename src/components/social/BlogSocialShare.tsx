import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Share2, MessageCircle, Copy, Check, Facebook, ExternalLink } from 'lucide-react';

export interface BlogSocialShareProps {
  articleSlug: string;
  articleTitle: string;
  articleExcerpt?: string;
  className?: string;
}

export const BlogSocialShare: React.FC<BlogSocialShareProps> = ({
  articleSlug,
  articleTitle,
  articleExcerpt = '',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://entityveterinary.com';
  const shareUrl = `${baseUrl}/blog/${articleSlug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`${articleTitle} | Entity Veterinary Hospital Chattogram`);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3 ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-bold font-display text-slate-800">
          <Share2 className="w-4 h-4 text-teal-600" />
          <span>Share Article with Pet Owners</span>
        </div>
        <Badge variant="demo" size="sm">Social Sharing</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Facebook Share */}
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all shadow-xs"
        >
          <Facebook className="w-4 h-4 fill-current" />
          <span>Facebook</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>

        {/* WhatsApp Share */}
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
          <ExternalLink className="w-3 h-3 opacity-80" />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
            copied
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-600" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
