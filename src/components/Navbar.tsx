import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Carta', href: '#carta' },
    { name: 'Reservas', href: '#reservas' },
    { name: 'Reseñas', href: '#footer' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[var(--color-kikko-dark)]/80 backdrop-blur-xl z-50 border-b border-zinc-900 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/logo.png" alt="Kikko" className="h-10 w-auto object-contain brightness-0 invert" />
            <span className="hidden font-serif text-2xl font-bold text-white tracking-widest uppercase">Kikko</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-400 hover:text-white font-medium text-xs uppercase tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservas"
              className="px-6 py-2.5 bg-[var(--color-kikko-terracotta)] text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-orange-700 transition-colors"
            >
              Reservar
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-kikko-dark)]/95 backdrop-blur-3xl shadow-xl fixed inset-0 top-20 bottom-0 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-sm uppercase tracking-widest font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white border-b border-zinc-900/50"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
                <a
                href="#reservas"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-4 bg-[var(--color-kikko-terracotta)] text-white text-sm uppercase tracking-widest font-bold rounded-xl hover:bg-orange-700 transition-colors"
              >
                Reservar Mesa
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
