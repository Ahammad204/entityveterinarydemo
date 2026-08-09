import React from 'react';
import { Product } from '../../types';
import { ShoppingBag, Star, Tag, Check, Sparkles } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  onSelect: (slug: string) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  showDemoBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  showDemoBadge = true
}) => {
  return (
    <div
      onClick={() => onSelect(product.slug)}
      className="group bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:border-teal-300 relative"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-700/80">
          {product.category}
        </span>

        {/* Demo Badge */}
        {showDemoBadge && (
          <span className="absolute top-3 right-3 bg-amber-500/90 text-amber-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs border border-amber-300 font-mono">
            Demo
          </span>
        )}

        {/* Pet Type Tag */}
        <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-xs text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
          {product.petType}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating & Stock */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] font-mono text-teal-700 font-medium">
              {product.stockStatus}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-bold font-display text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
              Demo Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-base font-extrabold text-slate-900 font-display">
                ৳ {product.priceBdt.toLocaleString()}
              </strong>
              {product.originalPriceBdt && (
                <span className="text-xs text-slate-400 line-through">
                  ৳ {product.originalPriceBdt.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className="px-3.5 py-2 rounded-xl bg-teal-900 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-95 shrink-0"
            title="Add to Demo Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-teal-300" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
