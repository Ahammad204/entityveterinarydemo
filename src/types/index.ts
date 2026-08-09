export type Page = 'home' | 'about' | 'services' | 'doctors' | 'branches' | 'blog' | 'blog-detail' | 'shop' | 'shop-detail' | 'contact' | 'sitemap' | 'service-detail' | 'doctor-detail' | 'branch-detail' | 'appointment' | 'dashboard' | 'admin' | 'admin-analytics';

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  experienceYears?: number;
  education?: string; // e.g. "Information to be confirmed"
  certifications?: string; // e.g. "Information to be confirmed"
  isFounder?: boolean;
  statusNotice?: string; // e.g. "Fact Verified" vs "Information to be confirmed"
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetailData {
  overview: string;
  includes: string[];
  suitableFor: string[];
  petOwnerNotes: string[];
  faqs: ServiceFAQ[];
  seoTitle: string;
  seoMetaDescription: string;
  structuredDataJson: string;
}

export interface Service {
  id: string;
  title: string;
  category: 'clinical' | 'surgical' | 'preventive' | 'diagnostic' | 'emergency' | 'wellness' | 'boarding';
  shortDesc: string;
  fullDesc: string;
  icon: string; // Lucide icon name indicator
  image: string; // Unsplash hero image URL
  features: string[];
  isEmergency?: boolean;
  demoNotice?: string;
  detailData?: ServiceDetailData;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  area: string;
  city: string; // e.g. "Chattogram, Bangladesh"
  regionCategory: 'chattogram' | 'other';
  address: string; // Must be "Information to be confirmed"
  phone: string; // Must be "Information to be confirmed"
  emergencyPhone?: string; // Must be "Information to be confirmed"
  hours: string; // Must be "Information to be confirmed"
  status: 'main' | 'upcoming' | 'demo';
  features: string[];
  availableServices: string[]; // Service IDs
  availableDoctors: string[]; // Doctor IDs
  image: string;
  description?: string;
  cmsNotice?: string;
}

export type BlogCategory = 'Pet Health' | 'Nutrition' | 'Preventive Care' | 'Grooming' | 'Pet Parenting';

export interface BlogArticleSection {
  heading: string;
  body: string;
  bulletPoints?: string[];
}

export interface BlogArticleContent {
  introduction: string;
  sections: BlogArticleSection[];
  conclusion: string;
  disclaimer: string;
}

export interface BlogSEOData {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  structuredDataJson: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  image: string;
  demoNotice?: string;
  content?: BlogArticleContent;
  seo?: BlogSEOData;
}

export interface AppointmentFormState {
  ownerName: string;
  phone: string;
  email: string;
  petType: 'dog' | 'cat' | 'bird' | 'exotic' | 'other';
  petName: string;
  serviceId: string;
  branchId: string;
  doctorId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface PresentationSettings {
  showDemoBadges: boolean;
  activeLanguage: 'EN' | 'BN';
  presentationMode: boolean;
}

export type ShopCategory = 'Pet Food' | 'Supplements' | 'Grooming' | 'Accessories' | 'Healthcare Products';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ShopCategory;
  priceBdt: number; // Demo Price
  originalPriceBdt?: number;
  rating: number; // e.g. 4.8
  reviewCount: number;
  image: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  usageInstructions?: string;
  stockStatus: 'In Stock (Demo)' | 'Low Stock (Demo)';
  petType: 'Dogs & Cats' | 'Dogs' | 'Cats' | 'All Pets';
  demoNotice?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  deliveryNotes?: string;
  paymentMethod: 'cod' | 'bkash_nagad' | 'card_demo';
}
