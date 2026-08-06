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
          
          {/* Social Proof Pill */}
          <div className="relative z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-700/50 backdrop-blur-sm shadow-xl hover:bg-zinc-800/80 transition-colors cursor-default">
            <div className="flex items-center gap-1 text-[#FABB05]">
              <svg className="w-4 h-4 drop-shadow-[0_0_2px_rgba(250,187,5,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-sm font-bold text-white tracking-wide">4.7</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xs font-medium text-zinc-300 whitespace-nowrap">{t('heroZone')}</span>
            </div>
          </div>

          <img 
            src="/logo-kikko.png" 
            alt="Kikko Restaurante Pizzeria Italiano" 
            className="w-[260px] md:w-[380px] h-auto mb-6 -mt-8 md:-mt-12 drop-shadow-2xl relative z-10" 
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
