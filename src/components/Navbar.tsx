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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Selector de idioma */}
        <div className="absolute left-4 sm:left-6 inset-y-0 flex items-center gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`text-xs font-semibold tracking-wider transition-colors ${
                language === lang.code ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center h-20 gap-8 sm:gap-12 pl-16 sm:pl-0">
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
      </div>
    </nav>
  );
}
