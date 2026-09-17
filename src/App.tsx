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
import DynamicIsland from './components/DynamicIsland';
import AdminPanel from './components/admin/AdminPanel';
import AdminErrorBoundary from './components/admin/AdminErrorBoundary';
import { MenuDataProvider } from './context/MenuDataContext';

import { useMenuData } from './context/MenuDataContext';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { isLoading, syncStatus, categories } = useMenuData();
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
    if (!isAdminView && !isLoading && window.location.hash && window.location.hash !== '#admin') {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [isAdminView, isLoading]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-[#C2410C] animate-spin mb-4" />
        <p className="text-zinc-400 font-serif tracking-wide">Cargando carta actualizada...</p>
      </div>
    );
  }

  if (syncStatus === 'error' && (!categories || categories.length === 0)) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="bg-[#141A0F] border border-red-900/40 p-6 rounded-2xl max-w-sm text-center">
          <p className="text-red-400 font-medium mb-2">Error de conexión</p>
          <p className="text-zinc-400 text-sm">No pudimos descargar la carta desde el servidor central. Por favor, recarga la página o inténtalo más tarde.</p>
        </div>
      </div>
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
      <DynamicIsland />
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
