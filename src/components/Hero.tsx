import { useLanguage } from '../LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden min-h-[100dvh] pt-28 pb-12 bg-[url('/pizzas_1785956040596.jpg')] bg-fixed bg-cover bg-center border-b border-zinc-900"
    >
      {/* Overlay para oscurecer la imagen de fondo */}
      <div className="absolute inset-0 bg-zinc-950/75"></div>

      {/* Content Card (Liquid Glass) */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto w-full">
        <div className="bg-zinc-950/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-3xl p-8 md:p-12 flex flex-col items-center">
          <img 
            src="/logo-kikko.png" 
            alt="Kikko Restaurante Pizzeria Italiano" 
            className="w-[260px] md:w-[380px] h-auto mb-6 drop-shadow-2xl" 
          />
          
          <p className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto mb-8 font-light leading-relaxed">
            {t('digitalMenuHeroSub')}
          </p>
          
          <a
            href="#carta"
            className="px-8 py-3.5 bg-[#C2410C] text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-900/50 hover:-translate-y-1 inline-block"
          >
            {t('digitalMenuBtn')}
          </a>
        </div>
      </div>
    </section>
  );
}
