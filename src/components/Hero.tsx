export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-zinc-950 border-b border-zinc-900 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950 to-zinc-950"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h2 className="text-zinc-500 font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
          Restaurante Pizzeria Italiano
        </h2>
        <img src="/logo-kikko.png" alt="Kikko Restaurante Pizzeria Italiano" className="mx-auto w-[280px] md:w-[400px] h-auto mb-6 drop-shadow-xl" />
        <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-10 font-light">
          Ingredientes frescos, masa madre de fermentación lenta y nuestro horno de leña tradicional.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#carta"
            className="px-8 py-3.5 bg-white text-zinc-950 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-colors w-full sm:w-auto"
          >
            Ver la Carta
          </a>
        </div>
      </div>
    </section>
  );
}
