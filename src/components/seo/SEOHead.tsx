import React, { useEffect } from 'react';
import { Page } from '../../types';
import { getPageMetadata, SITE_SEO_CONFIG } from '../../config/seoConfig';

export interface SEOHeadProps {
  page: Page;
  params?: {
    serviceId?: string;
    doctorId?: string;
    branchId?: string;
    blogSlug?: string;
    shopSlug?: string;
  };
}

export const SEOHead: React.FC<SEOHeadProps> = ({ page, params }) => {
  const { meta, schemas } = getPageMetadata(page, params);

  useEffect(() => {
    // 1. Update Document Title
    document.title = meta.title;

    // Helper to update or create meta tag
    const setMetaTag = (nameAttr: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Meta Description & Keywords
    setMetaTag('name', 'description', meta.description);
    if (meta.keywords && meta.keywords.length > 0) {
      setMetaTag('name', 'keywords', meta.keywords.join(', '));
    }

    // Robots directive
    if (meta.noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow');
    }

    // 3. Canonical URL
    setLinkTag('canonical', meta.canonicalUrl);

    // 4. Open Graph Metadata
    setMetaTag('property', 'og:title', meta.ogTitle || meta.title);
    setMetaTag('property', 'og:description', meta.ogDescription || meta.description);
    setMetaTag('property', 'og:url', meta.canonicalUrl);
    setMetaTag('property', 'og:image', meta.ogImage || SITE_SEO_CONFIG.defaultOgImage);
    setMetaTag('property', 'og:type', meta.ogType || 'website');
    setMetaTag('property', 'og:site_name', SITE_SEO_CONFIG.siteName);
    setMetaTag('property', 'og:locale', SITE_SEO_CONFIG.locale);

    // 5. Twitter / X Metadata
    setMetaTag('name', 'twitter:card', meta.twitterCard || 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.ogTitle || meta.title);
    setMetaTag('name', 'twitter:description', meta.ogDescription || meta.description);
    setMetaTag('name', 'twitter:image', meta.ogImage || SITE_SEO_CONFIG.defaultOgImage);
    setMetaTag('name', 'twitter:site', SITE_SEO_CONFIG.twitterHandle);

    // 6. JSON-LD Dynamic Structured Data Script Tag
    const scriptId = 'tectonic-seo-jsonld';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (scriptElement) {
      scriptElement.remove(); // Clean up existing
    }

    if (schemas && schemas.length > 0) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      scriptElement.text = JSON.stringify(schemas, null, 2);
      document.head.appendChild(scriptElement);
    }

    return () => {
      // Cleanup script tag on unmount if needed
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [page, JSON.stringify(params), meta]);

  return null; // This component renders directly into head via side effects
};
