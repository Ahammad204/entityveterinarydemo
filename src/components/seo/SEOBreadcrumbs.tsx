import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../../config/seoConfig';
import { Page } from '../../types';

export interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (page: Page, param?: string) => void;
  className?: string;
}

export const SEOBreadcrumbs: React.FC<SEOBreadcrumbsProps> = ({
  items,
  onNavigate,
  className = ''
}) => {
  if (!items || items.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    if (url === '/') {
      onNavigate('home');
      return;
    }

    const segments = url.split('/').filter(Boolean);
    const mainRoute = segments[0];
    const param = segments[1];

    if (mainRoute === 'services') {
      if (param) onNavigate('service-detail', param);
      else onNavigate('services');
    } else if (mainRoute === 'doctors') {
      if (param) onNavigate('doctor-detail', param);
      else onNavigate('doctors');
    } else if (mainRoute === 'branches') {
      if (param) onNavigate('branch-detail', param);
      else onNavigate('branches');
    } else if (mainRoute === 'blog') {
      if (param) onNavigate('blog-detail', param);
      else onNavigate('blog');
    } else if (mainRoute === 'shop') {
      if (param) onNavigate('shop-detail', param);
      else onNavigate('shop');
    } else if (mainRoute === 'about') {
      onNavigate('about');
    } else if (mainRoute === 'contact') {
      onNavigate('contact');
    } else if (mainRoute === 'sitemap') {
      onNavigate('sitemap');
    } else if (mainRoute === 'appointment') {
      onNavigate('appointment');
    } else if (mainRoute === 'dashboard') {
      onNavigate('dashboard');
    } else {
      onNavigate('home');
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-2.5 my-4 text-xs font-medium text-slate-600 ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 list-none m-0 p-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}

              {isLast ? (
                <span className="text-teal-900 font-bold truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  onClick={(e) => handleLinkClick(e, item.url)}
                  className="text-slate-600 hover:text-teal-700 transition-colors inline-flex items-center gap-1 font-semibold hover:underline"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{item.name}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
