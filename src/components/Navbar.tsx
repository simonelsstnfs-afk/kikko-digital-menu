export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 transition-all" style={{ backgroundColor: 'rgba(20, 26, 15, 0.95)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20 gap-12">
          <a
            href="#footer"
            className="text-zinc-400 hover:text-white font-medium text-sm md:text-base uppercase tracking-widest transition-colors"
          >
            Reseñas
          </a>
          <a
            href="#reservas"
            className="px-8 py-2.5 bg-[#C2410C] text-white text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-orange-700 transition-colors shadow-lg"
          >
            Reservar
          </a>
        </div>
      </div>
    </nav>
  );
}
