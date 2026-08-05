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
              href="#footer"
              className="text-zinc-400 hover:text-white font-medium text-xs sm:text-sm uppercase tracking-widest transition-colors"
            >
              {t('menuReviews')}
            </a>
            <a
              href="#reservas"
              className="px-6 sm:px-8 py-2.5 bg-[#C2410C] text-white text-xs sm:text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-orange-700 transition-colors shadow-lg whitespace-nowrap"
            >
              {t('btnBookTable')}
            </a>
          </div>

          {/* Selector de idioma */}
          <div className="flex items-center justify-center gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-[10px] sm:text-xs font-semibold tracking-widest transition-colors uppercase ${
                  language === lang.code ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
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
