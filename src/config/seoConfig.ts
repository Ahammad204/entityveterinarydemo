import { CLIENT_TECTONIC_NOTES, BRANCHES, SERVICES, DOCTORS, BLOG_POSTS, DEMO_PRODUCTS } from '../data/mockData';
const VETERINARY_SERVICES = SERVICES;
const SHOP_PRODUCTS = DEMO_PRODUCTS;
import { Page, Service, Doctor, Branch, BlogPost, Product } from '../types';

export const SITE_SEO_CONFIG = {
  siteName: 'Entity Veterinary Hospital',
  domain: 'entityveterinary.com',
  baseUrl: 'https://entityveterinary.com',
  defaultTitle: 'Entity Veterinary Hospital | Veterinary Clinic & Pet Care in Chattogram',
  titleTemplate: '%s | Entity Veterinary Hospital',
  defaultDescription:
    'Leading veterinary hospital in Chattogram, Bangladesh. Providing veterinary consultation, surgery, vaccination, diagnostics, and 24/7 emergency triage for pets.',
  defaultOgImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1200',
  locale: 'en_BD',
  twitterHandle: '@EntityVet',
  verifiedLinks: CLIENT_TECTONIC_NOTES.officialLinks
};

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string[];
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// Generates canonical URL from route
export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_SEO_CONFIG.baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
};

// --- STRUCTURED DATA SCHEMAS (JSON-LD) ---

// 1. WebSite Schema
export const getWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_SEO_CONFIG.baseUrl}/#website`,
    url: SITE_SEO_CONFIG.baseUrl,
    name: SITE_SEO_CONFIG.siteName,
    description: SITE_SEO_CONFIG.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: SITE_SEO_CONFIG.siteName,
      url: SITE_SEO_CONFIG.baseUrl
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_SEO_CONFIG.baseUrl}/services?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
};

// 2. Organization Schema
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_SEO_CONFIG.baseUrl}/#organization`,
    name: SITE_SEO_CONFIG.siteName,
    url: SITE_SEO_CONFIG.baseUrl,
    logo: SITE_SEO_CONFIG.defaultOgImage,
    sameAs: [
      SITE_SEO_CONFIG.verifiedLinks.website,
      SITE_SEO_CONFIG.verifiedLinks.facebook,
      SITE_SEO_CONFIG.verifiedLinks.googleSites
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: 'Information to be confirmed',
      contactType: 'customer service',
      areaServed: 'Chattogram, Bangladesh',
      availableLanguage: ['English', 'Bengali'],
      hoursAvailable: 'Hours to be confirmed'
    }
  };
};

// 3. VeterinaryCare / LocalBusiness Schema (strict NO fake info rules)
export const getVeterinaryCareSchema = (branch?: Branch) => {
  const branchName = branch ? `${branch.name} - Entity Veterinary Hospital` : SITE_SEO_CONFIG.siteName;
  const branchUrl = branch ? `${SITE_SEO_CONFIG.baseUrl}/branches/${branch.id}` : `${SITE_SEO_CONFIG.baseUrl}/contact`;

  return {
    '@context': 'https://schema.org',
    '@type': ['VeterinaryCare', 'LocalBusiness'],
    '@id': `${branchUrl}/#localbusiness`,
    name: branchName,
    url: branchUrl,
    image: branch?.image || SITE_SEO_CONFIG.defaultOgImage,
    description: branch?.description || SITE_SEO_CONFIG.defaultDescription,
    
    // VERIFIED DATA ONLY OR CLEARLY MARKED PLACEHOLDERS
    address: {
      '@type': 'PostalAddress',
      addressLocality: branch?.city || 'Chattogram',
      addressRegion: 'Chattogram Division',
      addressCountry: 'BD',
      streetAddress: branch?.address || 'Street address to be confirmed - Chattogram, Bangladesh'
    },
    telephone: branch?.phone || 'Phone contact to be confirmed',
    openingHours: branch?.hours || 'Opening hours to be confirmed',
    
    priceRange: '৳৳',
    
    // Note: No fake GPS or fake ratings invented
    geo: {
      '@type': 'GeoCoordinates',
      description: 'GPS coordinates pending location verification - Chattogram, Bangladesh'
    },
    
    parentOrganization: {
      '@type': 'Organization',
      name: SITE_SEO_CONFIG.siteName,
      url: SITE_SEO_CONFIG.baseUrl
    },
    
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Veterinary Services',
      itemListElement: VETERINARY_SERVICES.slice(0, 5).map((s, index) => ({
        '@type': 'OfferCatalog',
        name: s.title,
        position: index + 1
      }))
    }
  };
};

// 4. Service Schema
export const getServiceSchema = (service: Service) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_SEO_CONFIG.baseUrl}/services/${service.id}/#service`,
    name: service.title,
    serviceType: service.category,
    description: service.fullDesc,
    provider: {
      '@type': 'VeterinaryCare',
      name: SITE_SEO_CONFIG.siteName,
      url: SITE_SEO_CONFIG.baseUrl,
      areaServed: 'Chattogram, Bangladesh'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Chattogram, Bangladesh'
    },
    termsOfService: `${SITE_SEO_CONFIG.baseUrl}/terms`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: 'Consultation quote upon inquiry',
      availability: 'https://schema.org/InStock'
    }
  };
};

// 5. Article Schema (Blog)
export const getArticleSchema = (post: BlogPost) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_SEO_CONFIG.baseUrl}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: '2026-08-01',
    dateModified: '2026-08-08',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole || 'Veterinary Contributor',
      worksFor: {
        '@type': 'Organization',
        name: SITE_SEO_CONFIG.siteName
      }
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: SITE_SEO_CONFIG.defaultOgImage
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_SEO_CONFIG.baseUrl}/blog/${post.slug}`
    }
  };
};

// 6. Product Schema (Shop)
export const getProductSchema = (product: Product) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_SEO_CONFIG.baseUrl}/shop/${product.slug}/#product`,
    name: product.name,
    image: [product.image],
    description: product.fullDesc,
    brand: {
      '@type': 'Brand',
      name: 'Clinical Pet Care'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: product.priceBdt,
      availability: 'https://schema.org/InStock',
      url: `${SITE_SEO_CONFIG.baseUrl}/shop/${product.slug}`
    }
  };
};

// 7. BreadcrumbList Schema
export const getBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_SEO_CONFIG.baseUrl}${item.url}`
    }))
  };
};

// --- DEFAULT PAGE METADATA RESOLVER ---

export const getPageMetadata = (
  page: Page,
  params?: {
    serviceId?: string;
    doctorId?: string;
    branchId?: string;
    blogSlug?: string;
    shopSlug?: string;
  }
): { meta: PageMetadata; breadcrumbs: BreadcrumbItem[]; schemas: object[] } => {
  const baseBreadcrumbs: BreadcrumbItem[] = [{ name: 'Home', url: '/' }];

  switch (page) {
    case 'home':
      return {
        meta: {
          title: SITE_SEO_CONFIG.defaultTitle,
          description: SITE_SEO_CONFIG.defaultDescription,
          canonicalUrl: getCanonicalUrl('/'),
          ogType: 'website',
          keywords: ['veterinary hospital chattogram', 'vet clinic chattogram', 'pet doctor chattogram', 'pet surgery chattogram']
        },
        breadcrumbs: [],
        schemas: [getWebSiteSchema(), getOrganizationSchema(), getVeterinaryCareSchema()]
      };

    case 'about':
      return {
        meta: {
          title: 'About Us | Entity Veterinary Hospital Chattogram',
          description:
            'Learn about Entity Veterinary Hospital in Chattogram, Bangladesh. Our clinical team, facilities, mission, and dedication to compassionate animal care.',
          canonicalUrl: getCanonicalUrl('/about'),
          ogType: 'website',
          keywords: ['about entity veterinary', 'chattogram vet hospital history', 'veterinary team chattogram']
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'About Us', url: '/about' }],
        schemas: [getOrganizationSchema(), getBreadcrumbSchema([...baseBreadcrumbs, { name: 'About Us', url: '/about' }])]
      };

    case 'services':
      return {
        meta: {
          title: 'Veterinary Services in Chattogram | Clinical, Surgical & Wellness Care',
          description:
            'Comprehensive veterinary services in Chattogram including health consultations, surgeries, pet vaccinations, digital X-rays, ultrasonic scaling, and emergency triage.',
          canonicalUrl: getCanonicalUrl('/services'),
          ogType: 'website',
          keywords: ['vet services chattogram', 'pet surgery chattogram', 'dog vaccination chattogram', 'cat neuter chattogram']
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Services', url: '/services' }],
        schemas: [
          getOrganizationSchema(),
          getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Services', url: '/services' }])
        ]
      };

    case 'service-detail': {
      const service = VETERINARY_SERVICES.find((s) => s.id === params?.serviceId) || VETERINARY_SERVICES[0];
      const crumbs = [...baseBreadcrumbs, { name: 'Services', url: '/services' }, { name: service.title, url: `/services/${service.id}` }];
      return {
        meta: {
          title: `${service.title} | Entity Veterinary Hospital Chattogram`,
          description: service.fullDesc.slice(0, 155),
          canonicalUrl: getCanonicalUrl(`/services/${service.id}`),
          ogType: 'website',
          ogImage: service.image,
          keywords: [service.title.toLowerCase(), 'chattogram pet care', service.category]
        },
        breadcrumbs: crumbs,
        schemas: [getServiceSchema(service), getBreadcrumbSchema(crumbs)]
      };
    }

    case 'doctors':
      return {
        meta: {
          title: 'Veterinary Surgeons & Medical Team | Entity Veterinary Hospital',
          description:
            'Meet our qualified veterinary surgeons and medical officers at Entity Veterinary Hospital Chattogram. Led by Founder Dr. Partha Sarathi Chanda.',
          canonicalUrl: getCanonicalUrl('/doctors'),
          ogType: 'website'
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Medical Team', url: '/doctors' }],
        schemas: [getOrganizationSchema(), getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Medical Team', url: '/doctors' }])]
      };

    case 'doctor-detail': {
      const doctor = DOCTORS.find((d) => d.id === params?.doctorId) || DOCTORS[0];
      const crumbs = [...baseBreadcrumbs, { name: 'Medical Team', url: '/doctors' }, { name: doctor.name, url: `/doctors/${doctor.id}` }];
      return {
        meta: {
          title: `${doctor.name} - ${doctor.title} | Entity Veterinary Hospital`,
          description: doctor.bio.slice(0, 155),
          canonicalUrl: getCanonicalUrl(`/doctors/${doctor.id}`),
          ogType: 'profile',
          ogImage: doctor.image
        },
        breadcrumbs: crumbs,
        schemas: [getOrganizationSchema(), getBreadcrumbSchema(crumbs)]
      };
    }

    case 'branches':
      return {
        meta: {
          title: 'Hospital Branches in Chattogram | Entity Veterinary Hospital',
          description:
            'Find Entity Veterinary Hospital locations across Chattogram, Bangladesh. View opening hours, addresses, and emergency triage information.',
          canonicalUrl: getCanonicalUrl('/branches'),
          ogType: 'website'
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Hospital Branches', url: '/branches' }],
        schemas: [
          getOrganizationSchema(),
          getVeterinaryCareSchema(),
          getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Hospital Branches', url: '/branches' }])
        ]
      };

    case 'branch-detail': {
      const branch = BRANCHES.find((b) => b.id === params?.branchId) || BRANCHES[0];
      const crumbs = [...baseBreadcrumbs, { name: 'Hospital Branches', url: '/branches' }, { name: branch.name, url: `/branches/${branch.id}` }];
      return {
        meta: {
          title: `${branch.name} | Entity Veterinary Hospital Chattogram`,
          description: `${branch.name} location in Chattogram, Bangladesh. Contact details, opening hours, and available veterinary services.`,
          canonicalUrl: getCanonicalUrl(`/branches/${branch.id}`),
          ogType: 'website',
          ogImage: branch.image
        },
        breadcrumbs: crumbs,
        schemas: [getVeterinaryCareSchema(branch), getBreadcrumbSchema(crumbs)]
      };
    }

    case 'blog':
      return {
        meta: {
          title: 'Pet Care Blog & Educational Guides | Entity Veterinary Hospital',
          description:
            'Expert veterinary articles, seasonal pet health guides, nutrition tips, and preventive care advice for dogs and cats in Chattogram.',
          canonicalUrl: getCanonicalUrl('/blog'),
          ogType: 'website'
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Blog', url: '/blog' }],
        schemas: [getOrganizationSchema(), getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Blog', url: '/blog' }])]
      };

    case 'blog-detail': {
      const post = BLOG_POSTS.find((p) => p.slug === params?.blogSlug) || BLOG_POSTS[0];
      const crumbs = [...baseBreadcrumbs, { name: 'Blog', url: '/blog' }, { name: post.title, url: `/blog/${post.slug}` }];
      return {
        meta: {
          title: `${post.title} | Entity Veterinary Blog`,
          description: post.excerpt,
          canonicalUrl: getCanonicalUrl(`/blog/${post.slug}`),
          ogType: 'article',
          ogImage: post.image
        },
        breadcrumbs: crumbs,
        schemas: [getArticleSchema(post), getBreadcrumbSchema(crumbs)]
      };
    }

    case 'shop':
      return {
        meta: {
          title: 'Pet Healthcare Shop & Clinical Diets | Entity Veterinary',
          description:
            'Browse veterinary-recommended pet foods, supplements, skin grooming products, and healthcare supplies available at Entity Veterinary Hospital.',
          canonicalUrl: getCanonicalUrl('/shop'),
          ogType: 'website'
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Shop', url: '/shop' }],
        schemas: [getOrganizationSchema(), getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Shop', url: '/shop' }])]
      };

    case 'shop-detail': {
      const product = SHOP_PRODUCTS.find((p) => p.slug === params?.shopSlug) || SHOP_PRODUCTS[0];
      const crumbs = [...baseBreadcrumbs, { name: 'Shop', url: '/shop' }, { name: product.name, url: `/shop/${product.slug}` }];
      return {
        meta: {
          title: `${product.name} | Entity Veterinary Shop`,
          description: product.shortDesc,
          canonicalUrl: getCanonicalUrl(`/shop/${product.slug}`),
          ogType: 'website',
          ogImage: product.image
        },
        breadcrumbs: crumbs,
        schemas: [getProductSchema(product), getBreadcrumbSchema(crumbs)]
      };
    }

    case 'contact':
      return {
        meta: {
          title: 'Contact Us & Emergency Triage | Entity Veterinary Hospital',
          description:
            'Get in touch with Entity Veterinary Hospital in Chattogram. View contact options, direct message form, emergency triage notices, and location maps.',
          canonicalUrl: getCanonicalUrl('/contact'),
          ogType: 'website'
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Contact Us', url: '/contact' }],
        schemas: [
          getOrganizationSchema(),
          getVeterinaryCareSchema(),
          getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Contact Us', url: '/contact' }])
        ]
      };

    case 'appointment':
      return {
        meta: {
          title: 'Book a Veterinary Appointment | Entity Veterinary Hospital',
          description:
            'Schedule a consultation, vaccination, or surgical assessment for your pet with Entity Veterinary Hospital in Chattogram, Bangladesh.',
          canonicalUrl: getCanonicalUrl('/appointment'),
          ogType: 'website'
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Book Appointment', url: '/appointment' }],
        schemas: [getOrganizationSchema(), getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Book Appointment', url: '/appointment' }])]
      };

    case 'dashboard':
      return {
        meta: {
          title: 'Pet Care Portal & Records | Entity Veterinary Hospital',
          description: 'Client dashboard and pet health management portal for Entity Veterinary Hospital.',
          canonicalUrl: getCanonicalUrl('/dashboard'),
          ogType: 'website',
          noIndex: true
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Dashboard', url: '/dashboard' }],
        schemas: [getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Dashboard', url: '/dashboard' }])]
      };

    case 'admin':
      return {
        meta: {
          title: 'DEMO Admin Dashboard Prototype | Entity Veterinary Operations',
          description: 'Future Digital Management Platform Prototype for Entity Veterinary Hospital Chattogram created by Tectonic agency.',
          canonicalUrl: getCanonicalUrl('/admin'),
          ogType: 'website',
          noIndex: true
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Admin Operations', url: '/admin' }],
        schemas: [getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Admin Operations', url: '/admin' }])]
      };

    case 'sitemap':
      return {
        meta: {
          title: 'Sitemap & Technical SEO Blueprint | Entity Veterinary Hospital',
          description:
            'Explore the complete technical SEO architecture, XML sitemap structure, robots.txt directives, and JSON-LD structured data matrix for Entity Veterinary Hospital.',
          canonicalUrl: getCanonicalUrl('/sitemap'),
          ogType: 'website'
        },
        breadcrumbs: [...baseBreadcrumbs, { name: 'Sitemap & Technical SEO', url: '/sitemap' }],
        schemas: [getOrganizationSchema(), getBreadcrumbSchema([...baseBreadcrumbs, { name: 'Sitemap & Technical SEO', url: '/sitemap' }])]
      };

    default:
      return {
        meta: {
          title: SITE_SEO_CONFIG.defaultTitle,
          description: SITE_SEO_CONFIG.defaultDescription,
          canonicalUrl: getCanonicalUrl('/')
        },
        breadcrumbs: [],
        schemas: [getWebSiteSchema(), getOrganizationSchema()]
      };
  }
};
