/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationForm from './components/ReservationForm';
import GoogleReviewCTA from './components/GoogleReviewCTA';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

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
