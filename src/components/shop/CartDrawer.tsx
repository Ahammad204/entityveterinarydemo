import React from 'react';
import { CartItem } from '../../types';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.priceBdt * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 60 : 0; // Demo Chattogram delivery fee
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-400" />
              <div>
                <h2 className="text-base font-bold font-display text-white">Demo Shopping Cart</h2>
                <span className="text-[10px] text-teal-300 font-mono block">
                  ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Demo Concept Warning Banner */}
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center gap-2 text-xs text-amber-950 font-medium">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Demo Concept:</strong> Fictional cart for digital strategy preview. No real transaction occurs.
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-500 py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 font-display">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore our demo pet food, supplements, grooming products, and accessories catalog.
                  </p>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3.5 relative group"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-teal-700 block">
                      {item.product.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 truncate font-display">
                      {item.product.name}
                    </h4>
                    <span className="text-xs font-extrabold text-slate-900 font-mono block">
                      ৳ {item.product.priceBdt.toLocaleString()} (Demo)
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors ml-auto"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-slate-200 space-y-4 shadow-lg">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Demo Subtotal</span>
                  <span className="font-mono font-bold text-slate-900">৳ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Demo Delivery (Chattogram City)</span>
                  <span className="font-mono font-bold text-slate-900">৳ {deliveryFee}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
                  <span>Estimated Demo Total</span>
                  <span className="font-mono text-base text-teal-800">৳ {total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={onProceedToCheckout}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full justify-center bg-teal-800 hover:bg-teal-700 text-white font-bold"
              >
                Proceed to Demo Checkout
              </Button>

              <p className="text-[10px] text-center text-slate-400">
                This is a concept demonstration for Entity Veterinary Hospital.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
