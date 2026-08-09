/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Page, Product, CartItem } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PresentationHeader } from './components/layout/PresentationHeader';
import { AppointmentModal } from './components/modals/AppointmentModal';

import { SEOHead } from './components/seo/SEOHead';
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ServicesView } from './components/views/ServicesView';
import { ServiceDetailView } from './components/views/ServiceDetailView';
import { DoctorsView } from './components/views/DoctorsView';
import { DoctorDetailView } from './components/views/DoctorDetailView';
import { BranchesView } from './components/views/BranchesView';
import { BranchDetailView } from './components/views/BranchDetailView';
import { BlogView } from './components/views/BlogView';
import { BlogDetailView } from './components/views/BlogDetailView';
import { ShopView } from './components/views/ShopView';
import { ProductDetailView } from './components/views/ProductDetailView';
import { ContactView } from './components/views/ContactView';
import { AppointmentBookingView } from './components/views/AppointmentBookingView';
import { DashboardView } from './components/views/DashboardView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { AnalyticsDashboardView } from './components/views/AnalyticsDashboardView';
import { SitemapArchitectureView } from './components/views/SitemapArchitectureView';
import { CartDrawer } from './components/shop/CartDrawer';
import { CheckoutModal } from './components/shop/CheckoutModal';

export default function App() {
  const getInitialPage = (): Page => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/admin/analytics' || path.startsWith('/admin/analytics')) {
        return 'admin-analytics';
      }
      if (path === '/admin' || path.startsWith('/admin')) {
        return 'admin';
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage());
  const [selectedServiceDetailId, setSelectedServiceDetailId] = useState<string>('veterinary-consultation');
  const [selectedDoctorDetailId, setSelectedDoctorDetailId] = useState<string>('dr-partha');
  const [selectedBranchDetailId, setSelectedBranchDetailId] = useState<string>('branch-chattogram-main');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('monsoon-pet-care-chattogram');
  const [selectedShopSlug, setSelectedShopSlug] = useState<string>('premium-adult-dog-kibble-chicken-rice');
  
  // Cart & Checkout state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>('');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string>('');
  const [preselectedBranchId, setPreselectedBranchId] = useState<string>('');
  const [showDemoBadges, setShowDemoBadges] = useState(true);

  const handleOpenBooking = (serviceId?: string, doctorId?: string, branchId?: string) => {
    if (serviceId) setPreselectedServiceId(serviceId);
    if (doctorId) setPreselectedDoctorId(doctorId);
    if (branchId) setPreselectedBranchId(branchId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedServiceId('');
    setPreselectedDoctorId('');
    setPreselectedBranchId('');
  };

  const handleSelectServiceDetail = (serviceId: string) => {
    setSelectedServiceDetailId(serviceId);
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctorDetail = (doctorId: string) => {
    setSelectedDoctorDetailId(doctorId);
    setCurrentPage('doctor-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBranchDetail = (branchId: string) => {
    setSelectedBranchDetailId(branchId);
    setCurrentPage('branch-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: Page, param?: string) => {
    if (page === 'blog-detail' && param) {
      setSelectedBlogSlug(param);
    } else if (page === 'shop-detail' && param) {
      setSelectedShopSlug(param);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantityToAdd: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prev, { product, quantity: quantityToAdd }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onSelectServiceDetail={handleSelectServiceDetail}
            onSelectDoctorDetail={handleSelectDoctorDetail}
            onAddToCart={handleAddToCart}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'about':
        return (
          <AboutView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'services':
        return (
          <ServicesView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onSelectServiceDetail={handleSelectServiceDetail}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'service-detail':
        return (
          <ServiceDetailView
            serviceId={selectedServiceDetailId}
            onNavigate={handleNavigate}
            onSelectServiceDetail={handleSelectServiceDetail}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'doctors':
        return (
          <DoctorsView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onSelectDoctorDetail={handleSelectDoctorDetail}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'doctor-detail':
        return (
          <DoctorDetailView
            doctorId={selectedDoctorDetailId}
            onNavigate={handleNavigate}
            onSelectDoctorDetail={handleSelectDoctorDetail}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'branches':
        return (
          <BranchesView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onSelectBranchDetail={handleSelectBranchDetail}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'branch-detail':
        return (
          <BranchDetailView
            branchId={selectedBranchDetailId}
            onNavigate={handleNavigate}
            onSelectBranchDetail={handleSelectBranchDetail}
            onSelectServiceDetail={handleSelectServiceDetail}
            onSelectDoctorDetail={handleSelectDoctorDetail}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'blog':
        return (
          <BlogView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'blog-detail':
        return (
          <BlogDetailView
            slug={selectedBlogSlug}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'shop':
        return (
          <ShopView
            onNavigate={handleNavigate}
            cartItems={cartItems}
            onAddToCart={(prod, e) => handleAddToCart(prod, 1)}
            onOpenCart={() => setIsCartOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'shop-detail':
        return (
          <ProductDetailView
            slug={selectedShopSlug}
            onNavigate={handleNavigate}
            onAddToCart={(prod, qty, e) => handleAddToCart(prod, qty)}
            onOpenCart={() => setIsCartOpen(true)}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'contact':
        return (
          <ContactView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'appointment':
        return (
          <AppointmentBookingView
            onNavigate={handleNavigate}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'admin':
        return (
          <AdminDashboardView
            onNavigate={handleNavigate}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'admin-analytics':
        return (
          <AnalyticsDashboardView
            onNavigate={handleNavigate}
            showDemoBadges={showDemoBadges}
          />
        );
      case 'sitemap':
        return <SitemapArchitectureView onNavigate={handleNavigate} />;
      default:
        return (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            showDemoBadges={showDemoBadges}
          />
        );
    }
  };

  if (currentPage === 'admin' || currentPage === 'admin-analytics') {
    return (
      <>
        <SEOHead page="admin" />
        {currentPage === 'admin-analytics' ? (
          <AnalyticsDashboardView
            onNavigate={handleNavigate}
            showDemoBadges={showDemoBadges}
          />
        ) : (
          <AdminDashboardView
            onNavigate={handleNavigate}
            showDemoBadges={showDemoBadges}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-teal-500 selection:text-white overflow-x-hidden">
      {/* Dynamic SEO & Technical Metadata Manager */}
      <SEOHead
        page={currentPage}
        params={{
          serviceId: selectedServiceDetailId,
          doctorId: selectedDoctorDetailId,
          branchId: selectedBranchDetailId,
          blogSlug: selectedBlogSlug,
          shopSlug: selectedShopSlug
        }}
      />

      {/* Tectonic Client Presentation Bar */}
      <PresentationHeader
        currentPage={currentPage}
        onNavigate={handleNavigate}
        showDemoBadges={showDemoBadges}
        onToggleDemoBadges={() => setShowDemoBadges(!showDemoBadges)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Global Application Shell Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        showDemoBadges={showDemoBadges}
        onToggleDemoBadges={() => setShowDemoBadges(!showDemoBadges)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto">
        {renderCurrentView()}
      </main>

      {/* Global Application Shell Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Global Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={preselectedServiceId}
        preselectedDoctorId={preselectedDoctorId}
        preselectedBranchId={preselectedBranchId}
      />

      {/* Global Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Global Checkout Concept Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
