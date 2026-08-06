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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-3">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-6 sm:gap-12">
            <a
              href="#resenas"
              className="px-6 sm:px-8 py-2.5 border border-white text-white hover:bg-white hover:text-zinc-950 text-xs sm:text-sm uppercase tracking-widest font-semibold rounded-full transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] whitespace-nowrap"
            >
              {t('menuReviews')}
            </a>
            <a
              href="#reservas"
              className="px-6 sm:px-8 py-2.5 border border-white text-white hover:bg-white hover:text-zinc-950 text-xs sm:text-sm uppercase tracking-widest font-semibold rounded-full transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] whitespace-nowrap"
            >
              {t('btnBookTable')}
            </a>
          </div>

          {/* Selector de idioma */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/60 rounded-full shadow-sm backdrop-blur-md">
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
