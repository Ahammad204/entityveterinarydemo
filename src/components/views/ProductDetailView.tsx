import React, { useState } from 'react';
import { Page, Product, CartItem } from '../../types';
import { DEMO_PRODUCTS } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ProductCard } from '../cards/ProductCard';
import { CTASection } from '../layout/CTASection';
import { SEOBreadcrumbs } from '../seo/SEOBreadcrumbs';
import { getPageMetadata } from '../../config/seoConfig';
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Plus,
  Minus,
  Tag,
  Package,
  Info,
  Check
} from 'lucide-react';

export interface ProductDetailViewProps {
  slug: string;
  onNavigate: (page: Page, param?: string) => void;
  onAddToCart: (product: Product, quantity: number, e: React.MouseEvent) => void;
  onOpenCart: () => void;
  showDemoBadges: boolean;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  slug,
  onNavigate,
  onAddToCart,
  onOpenCart,
  showDemoBadges
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Find product by slug or id
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || DEMO_PRODUCTS[0];

  if (!product) {
    return (
      <Container size="normal" className="py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-display">Product Not Found</h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          The requested demo product could not be found.
        </p>
        <Button variant="primary" onClick={() => onNavigate('shop')}>
          Return to Demo Shop Catalog
        </Button>
      </Container>
    );
  }

  // Related products in same category or other items
  const relatedProducts = DEMO_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || DEMO_PRODUCTS.length <= 4)
  ).slice(0, 3);

  const handleAddToCart = (e: React.MouseEvent) => {
    onAddToCart(product, quantity, e);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const { breadcrumbs } = getPageMetadata('shop-detail', { shopSlug: product.slug });

  return (
    <div className="space-y-12 py-8 animate-fade-in">
      {/* Top Navigation & Breadcrumbs */}
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
              onClick={() => onNavigate('shop')}
              className="hover:text-teal-700 transition-colors font-medium whitespace-nowrap"
            >
              Demo Shop (/shop)
            </button>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-xs font-mono text-[11px]">
              /shop/{product.slug}
            </span>
          </div>

          <Button
            variant="outline"
            size="xs"
            onClick={() => onNavigate('shop')}
            icon={ArrowLeft}
            iconPosition="left"
            className="shrink-0"
          >
            All Products
          </Button>
        </div>
      </Container>

      {/* DEMO NOTICE BANNER */}
      <Container size="normal">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
            <span>
              <strong>Demo Concept Notice:</strong> This is a fictional product for demonstration. No medical claims or real sales are implied.
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded border border-amber-300 shrink-0">
            CONCEPT_ONLY
          </span>
        </div>
      </Container>

      {/* PRODUCT HERO DETAIL SECTION */}
      <Container size="normal">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Product Image */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 shadow-2xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                {product.category}
              </span>
              <span className="absolute top-4 right-4 bg-amber-500 text-amber-950 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded font-mono">
                Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-400 text-center font-mono">
              Entity Veterinary Hospital Fictional E-Commerce Media
            </p>
          </div>

          {/* Right Column: Title, Pricing, Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  Suitable for: {product.petType}
                </span>

                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
                {product.name}
              </h1>

              {/* Price Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Demo Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <strong className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                      ৳ {product.priceBdt.toLocaleString()}
                    </strong>
                    {product.originalPriceBdt && (
                      <span className="text-sm text-slate-400 line-through">
                        ৳ {product.originalPriceBdt.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Status</span>
                  <span className="text-xs font-bold font-mono text-teal-700">
                    {product.stockStatus}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {product.shortDesc}
              </p>
            </div>

            {/* Quantity & Add to Cart Controls */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-bold font-mono text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAddToCart}
                  icon={addedSuccess ? Check : ShoppingBag}
                  iconPosition="left"
                  className={`flex-1 justify-center font-bold ${
                    addedSuccess
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-teal-900 hover:bg-teal-800 text-white'
                  }`}
                >
                  {addedSuccess ? 'Added to Demo Cart!' : `Add to Demo Cart (৳ ${(product.priceBdt * quantity).toLocaleString()})`}
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={onOpenCart}
                  className="shrink-0"
                >
                  View Cart
                </Button>
              </div>
            </div>

            {/* Additional Specs */}
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1 font-mono">
              <p>Demo SKU: EVH-PROD-{product.id.toUpperCase()}</p>
              <p>Category: {product.category}</p>
              <p>Delivery Area: Chattogram City & Bangladesh Express</p>
            </div>
          </div>
        </div>
      </Container>

      {/* FULL DESCRIPTION & BENEFITS SECTION */}
      <Container size="normal">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-700" />
              Product Overview & Key Specifications
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {product.fullDesc}
            </p>
          </div>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Key Features & Benefits
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Usage Instructions */}
          {product.usageInstructions && (
            <div className="space-y-2 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Recommended Usage Instructions
              </h3>
              <p className="text-xs text-slate-600 bg-teal-50/60 p-4 rounded-xl border border-teal-200/80 leading-relaxed font-medium">
                {product.usageInstructions}
              </p>
            </div>
          )}
        </div>
      </Container>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="bg-slate-50/80 py-12 border-y border-slate-200/80">
          <Container size="normal" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Explore More Demo Products
                </span>
                <h2 className="text-2xl font-bold font-display text-slate-900 mt-1">
                  Related Demo Products
                </h2>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('shop')}
              >
                All Shop Items
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard
                  key={relProd.id}
                  product={relProd}
                  onSelect={(targetSlug) => onNavigate('shop-detail', targetSlug)}
                  onAddToCart={(p, e) => {
                    e.stopPropagation();
                    onAddToCart(p, 1, e);
                  }}
                  showDemoBadge={showDemoBadges}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA SECTION */}
      <CTASection
        title="Consult Entity Veterinary Doctors for Prescription Diets"
        subtitle="Schedule an appointment to get custom dietary recommendations for your companion."
        onBook={() => onNavigate('appointment')}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
