import React, { useState } from 'react';
import { CartItem, OrderCustomerInfo } from '../../types';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  MapPin,
  User,
  Phone,
  Mail,
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  Building2
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart
}) => {
  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Chattogram',
    deliveryNotes: '',
    paymentMethod: 'cod'
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.priceBdt * item.quantity, 0);
  const deliveryFee = 60; // Chattogram city demo fee
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `EVH-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
    onClearCart();
  };

  const handleDone = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-400" />
            <div>
              <h2 className="text-lg font-bold font-display text-white">
                {isSubmitted ? 'Demo Order Submitted' : 'Demo Checkout Concept'}
              </h2>
              <span className="text-xs text-teal-300 font-mono block">
                Entity Veterinary Hospital E-commerce Preview
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
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center gap-2 text-xs text-amber-950 font-medium">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Demo Concept Notice:</strong> This checkout flow is for demonstration purposes only. Do not assume Entity Veterinary currently operates an e-commerce business. No real payment or delivery is initiated.
          </span>
        </div>

        {/* Modal Content */}
        {isSubmitted ? (
          /* SUCCESS SCREEN */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-4 border-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-bold font-mono text-teal-700 uppercase tracking-wider block">
                Demo Reference #{orderId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Demo Order Submitted
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you for testing the e-commerce demo concept for Entity Veterinary Hospital.
              </p>
            </div>

            {/* Architecture Capability Box */}
            <div className="bg-slate-900 text-white text-left p-6 rounded-2xl border border-slate-800 space-y-3 max-w-xl mx-auto">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                How Tectonic Integrates E-Commerce Production Architecture
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                In full implementation, this flow seamlessly connects:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  <strong>Real-Time Inventory:</strong> Sync with hospital pharmacy stock
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  <strong>Payment Gateway:</strong> Local bKash, Nagad, Card APIs
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  <strong>Order Management:</strong> Clinical pharmacy routing
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  <strong>Delivery Logistics:</strong> Local courier integration
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="md" onClick={handleDone} className="bg-teal-800 hover:bg-teal-700 text-white font-bold">
                Return to Shop
              </Button>
            </div>
          </div>
        ) : (
          /* FORM & CHECKOUT LAYOUT */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Customer & Delivery Info */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Customer Information */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
                    <User className="w-4 h-4 text-teal-700" />
                    1. Customer Information
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 18XX-XXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tanvir@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
                    <MapPin className="w-4 h-4 text-teal-700" />
                    2. Delivery Address (Demo)
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City / District *</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      >
                        <option value="Chattogram">Chattogram (Main Service Area)</option>
                        <option value="Dhaka">Dhaka District</option>
                        <option value="Sylhet">Sylhet District</option>
                        <option value="Other">Other Region in Bangladesh</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Street Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="House no, road name, neighborhood, Chattogram..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
                    <CreditCard className="w-4 h-4 text-teal-700" />
                    3. Demo Payment Method
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* COD */}
                    <label
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.paymentMethod === 'cod'
                          ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="mt-0.5 text-teal-700 focus:ring-teal-500"
                      />
                      <div>
                        <strong className="text-slate-900 block font-bold">Cash on Delivery (COD)</strong>
                        <span className="text-[11px] text-slate-500 block">Pay cash upon home delivery</span>
                      </div>
                    </label>

                    {/* Online Payment */}
                    <label
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.paymentMethod === 'bkash_nagad'
                          ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bkash_nagad"
                        checked={formData.paymentMethod === 'bkash_nagad'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'bkash_nagad' })}
                        className="mt-0.5 text-teal-700 focus:ring-teal-500"
                      />
                      <div>
                        <strong className="text-slate-900 block font-bold">Online Payment (Demo)</strong>
                        <span className="text-[11px] text-slate-500 block">bKash / Nagad / Visa / Mastercard</span>
                      </div>
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    Note: No real payment gateway is connected in this demo concept.
                  </p>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 font-display border-b border-slate-200 pb-2">
                    Demo Order Summary ({items.length} items)
                  </h3>

                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 block truncate">{item.product.name}</span>
                            <span className="text-slate-500 text-[11px]">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-slate-900 shrink-0">
                          ৳ {(item.product.priceBdt * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Demo Subtotal</span>
                      <span className="font-mono font-bold text-slate-900">৳ {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Demo Delivery Fee</span>
                      <span className="font-mono font-bold text-slate-900">৳ {deliveryFee}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-slate-900">
                      <span>Demo Total</span>
                      <span className="font-mono text-teal-800">৳ {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center bg-teal-800 hover:bg-teal-700 text-white font-bold"
                  >
                    Submit Demo Order
                  </Button>

                  <p className="text-[10px] text-center text-slate-400">
                    Demonstration submit only.
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
