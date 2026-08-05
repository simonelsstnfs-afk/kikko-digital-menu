export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-[#141A0F] border-b border-zinc-900 min-h-[calc(100dvh-5rem)] py-8 mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#141A0F] to-[#141A0F]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <img src="/logo-kikko.png" alt="Kikko Restaurante Pizzeria Italiano" className="mx-auto w-[280px] md:w-[400px] h-auto mb-0 drop-shadow-xl" />
        <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-8 font-light px-4">
          Ingredientes frescos, masa madre de fermentación lenta y nuestro horno de leña tradicional.
        </p>
        <div className="flex justify-center">
          <a
            href="#carta"
            className="px-8 py-3 bg-[#C2410C] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-orange-700 transition-colors shadow-lg inline-block"
          >
            Ver la Carta
          </a>
        </div>
      </div>
    </section>
  );
}
