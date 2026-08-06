import { useLanguage } from '../LanguageContext';
import { Language } from '../translations';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'it', label: 'IT' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 transition-all" style={{ backgroundColor: 'rgba(20, 26, 15, 0.95)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">

          {/* Logo */}
          <a href="#" aria-label="Kikko inicio" className="flex-shrink-0">
            <img src="/logo-kikko.png" alt="Kikko" className="h-9 sm:h-11 w-auto drop-shadow-md" loading="eager" />
          </a>

          {/* CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#resenas"
              className="px-4 sm:px-6 py-2 border border-white/60 text-white hover:bg-white hover:text-zinc-950 text-[11px] sm:text-xs uppercase tracking-widest font-semibold rounded-full transition-colors whitespace-nowrap"
            >
              {t('menuReviews')}
            </a>
            <a
              href="#reservas"
              className="px-4 sm:px-6 py-2 bg-[#C2410C] text-white hover:bg-orange-700 text-[11px] sm:text-xs uppercase tracking-widest font-semibold rounded-full transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(194,65,12,0.4)]"
            >
              {t('btnBookTable')}
            </a>
          </div>

          {/* Selector de idioma */}
          <div className="flex items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/60 rounded-full shadow-sm backdrop-blur-md flex-shrink-0">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-[10px] sm:text-xs font-semibold tracking-widest transition-all uppercase px-2 py-1 rounded-full cursor-pointer ${
                  language === lang.code 
                    ? 'text-white bg-zinc-800 shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}
