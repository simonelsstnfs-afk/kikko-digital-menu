/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationForm from './components/ReservationForm';
import GoogleReviewCTA from './components/GoogleReviewCTA';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import AdminErrorBoundary from './components/admin/AdminErrorBoundary';
import { MenuDataProvider } from './context/MenuDataContext';

function AppContent() {
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/admin' || hash === '#admin';
  });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdminView(path === '/admin' || hash === '#admin');
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  useEffect(() => {
    if (!isAdminView && window.location.hash && window.location.hash !== '#admin') {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [isAdminView]);

  if (isAdminView) {
    const handleBack = () => {
      window.history.pushState({}, '', '/');
      setIsAdminView(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <AdminErrorBoundary onBackToMenu={handleBack}>
        <AdminPanel onBackToMenu={handleBack} />
      </AdminErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 font-sans selection:bg-white/20 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <ReservationForm />
        <GoogleReviewCTA />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <MenuDataProvider>
      <AppContent />
    </MenuDataProvider>
  );
}
