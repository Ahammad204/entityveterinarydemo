import React, { useState, useMemo } from 'react';
import { Page, ShopCategory, Product, CartItem } from '../../types';
import { DEMO_PRODUCTS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ProductCard } from '../cards/ProductCard';
import { CTASection } from '../layout/CTASection';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  ShoppingBag,
  Search,
  Filter,
  Sparkles,
  ShieldAlert,
  Tag,
  Building2,
  Package,
  Layers,
  CreditCard,
  Truck,
  RotateCcw,
  Check
} from 'lucide-react';

export interface ShopViewProps {
  onNavigate: (page: Page, param?: string) => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onOpenCart: () => void;
  showDemoBadges: boolean;
}

const CATEGORIES: ('All' | ShopCategory)[] = [
  'All',
  'Pet Food',
  'Supplements',
  'Grooming',
  'Accessories',
  'Healthcare Products'
];

export const ShopView: React.FC<ShopViewProps> = ({
  onNavigate,
  cartItems,
  onAddToCart,
  onOpenCart,
  showDemoBadges
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ShopCategory>('All');
  const [selectedPetType, setSelectedPetType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'All' && prod.category !== selectedCategory) {
        return false;
      }
      // Pet Type filter
      if (selectedPetType !== 'All') {
        if (selectedPetType === 'Dogs' && prod.petType !== 'Dogs' && prod.petType !== 'Dogs & Cats' && prod.petType !== 'All Pets') {
          return false;
        }
        if (selectedPetType === 'Cats' && prod.petType !== 'Cats' && prod.petType !== 'Dogs & Cats' && prod.petType !== 'All Pets') {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchDesc = prod.shortDesc.toLowerCase().includes(q);
        const matchCat = prod.category.toLowerCase().includes(q);
        return matchName || matchDesc || matchCat;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.priceBdt - b.priceBdt;
      if (sortBy === 'priceDesc') return b.priceBdt - a.priceBdt;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedPetType, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPetType('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const { breadcrumbs } = getPageMetadata('shop');

  return (
    <div className="space-y-12 py-6 animate-fade-in relative">
      {/* Breadcrumb Navigation */}
      <Container size="normal">
        <SEOBreadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
      </Container>

      {/* 1. SHOP HERO BANNER */}
      <section className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="normal" className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-300 bg-teal-950 px-3.5 py-1 rounded-md border border-teal-800 shadow-2xs font-mono">
                Demo Concept
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/90 border border-amber-800 px-3 py-1 rounded-md">
                E-Commerce Storefront Prototype
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              Online Pet Product Store Concept
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Demonstrating how Tectonic can integrate an online pet shop for Entity Veterinary Hospital. Browse fictional demo products across pet food, supplements, grooming, accessories, and healthcare products.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-teal-400" />
                {DEMO_PRODUCTS.length} Fictional Demo Products
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-400" />
                Tectonic Integration Architecture Preview
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. EXPLICIT DEMO CONCEPT NOTICE */}
      <Container size="normal">
        <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-amber-950">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              <strong className="text-sm font-bold uppercase tracking-wider block text-amber-900 font-display">
                Demo Concept Notice
              </strong>
              <p className="text-slate-800 leading-relaxed">
                This section is a concept only. Do not assume Entity Veterinary currently operates an e-commerce business. All prices are fictional demo prices and do not contain medical claims or real transactional processing.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={onOpenCart}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-2xs"
            >
              <ShoppingBag className="w-4 h-4 text-teal-400" />
              <span>Demo Cart ({totalCartCount})</span>
            </button>
          </div>
        </div>
      </Container>

      {/* 3. CATEGORIES & SEARCH CONTROLS */}
      <Container size="normal">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-6">
          {/* Search, Sort, Pet Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search demo products (kibble, shampoo, supplements)..."
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

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Pet Type Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Pet:</span>
                <select
                  value={selectedPetType}
                  onChange={(e) => setSelectedPetType(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none"
                >
                  <option value="All">All Pets</option>
                  <option value="Dogs">Dogs Only</option>
                  <option value="Cats">Cats Only</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none"
                >
                  <option value="featured">Featured Demo</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {(selectedCategory !== 'All' || selectedPetType !== 'All' || searchQuery !== '' || sortBy !== 'featured') && (
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
              Categories (Demo Concept):
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
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

      {/* 4. PRODUCT GRID */}
      <Container size="normal">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
              <span>Demo Catalog ({filteredProducts.length})</span>
              {selectedCategory !== 'All' && (
                <span className="text-xs text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 font-sans">
                  Category: {selectedCategory}
                </span>
              )}
            </h2>

            <span className="text-xs text-slate-400 font-mono">
              Fictional Prices & Specs
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelect={(slug) => onNavigate('shop-detail', slug)}
                  onAddToCart={(p, e) => {
                    e.stopPropagation();
                    onAddToCart(p, e);
                  }}
                  showDemoBadge={showDemoBadges}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 font-display">No Products Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No products matched your selected category, pet type, or search query.
              </p>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Clear Search & Filters
              </Button>
            </div>
          )}
        </div>
      </Container>

      {/* 5. TECTONIC E-COMMERCE INTEGRATION ARCHITECTURE SECTION */}
      <Container size="normal">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 font-mono">
                System Integration Architecture
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              How Tectonic Can Later Integrate E-Commerce & Pharmacy Operations
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              While this section is currently a demonstration concept, Tectonic's application architecture is designed for full-stack integration with clinical inventory systems, local payment providers, and courier fulfillment networks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            {/* 1. Ecommerce */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <strong className="text-slate-100 block font-bold text-sm">1. E-Commerce Front-End</strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                High-speed responsive store with instant filtering, product search, and pet health categories.
              </p>
            </div>

            {/* 2. Inventory */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
                <Layers className="w-4 h-4" />
              </div>
              <strong className="text-slate-100 block font-bold text-sm">2. Pharmacy Inventory</strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Real-time stock synchronization with Entity Veterinary Hospital's central pharmacy database.
              </p>
            </div>

            {/* 3. Orders */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
                <Package className="w-4 h-4" />
              </div>
              <strong className="text-slate-100 block font-bold text-sm">3. Clinical Orders</strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Order routing directly to hospital clinical staff and prescription validation workflows.
              </p>
            </div>

            {/* 4. Payments */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <strong className="text-slate-100 block font-bold text-sm">4. Secure Payments</strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Integration with bKash, Nagad, Visa, and Cash-on-Delivery options in Bangladesh.
              </p>
            </div>

            {/* 5. Delivery */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
                <Truck className="w-4 h-4" />
              </div>
              <strong className="text-slate-100 block font-bold text-sm">5. Local Delivery</strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Automated dispatch to Chattogram city express couriers and home delivery tracking.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* 6. CALL TO ACTION SECTION */}
      <CTASection
        title="Need Specific Prescription Diets or Medical Supplies?"
        subtitle="Consult Entity Veterinary Hospital clinical staff directly or schedule a veterinary consultation."
        onBook={() => onNavigate('appointment')}
        onContact={() => onNavigate('contact')}
      />

      {/* FLOATING CART BUTTON (MOBILE & DESKTOP) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce-subtle">
          <button
            onClick={onOpenCart}
            className="px-5 py-3 rounded-full bg-slate-900 text-white font-bold text-xs shadow-2xl border border-slate-700 flex items-center gap-3 hover:bg-slate-800 transition-transform active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-teal-400" />
              <span className="absolute -top-2 -right-2 bg-teal-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {totalCartCount}
              </span>
            </div>
            <span>View Demo Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};
