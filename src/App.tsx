/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationForm from './components/ReservationForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 font-sans selection:bg-white/20 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <ReservationForm />
      </main>
      <Footer />
    </div>
  );
}
