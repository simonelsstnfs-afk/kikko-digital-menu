export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-[#141A0F] border-b border-zinc-900 pt-16 pb-8 mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#141A0F] to-[#141A0F]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <img src="/logo-kikko.png" alt="Kikko Restaurante Pizzeria Italiano" className="mx-auto w-[280px] md:w-[400px] h-auto mb-6 drop-shadow-xl" />
        <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-8 font-light">
          Ingredientes frescos, masa madre de fermentación lenta y nuestro horno de leña tradicional.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#carta"
            className="px-8 py-3.5 bg-[#C2410C] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-orange-700 transition-colors w-full sm:w-auto shadow-lg"
          >
            Ver la Carta
          </a>
        </div>
      </div>
    </section>
  );
}
