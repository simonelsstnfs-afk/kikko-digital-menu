import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from './translations';
import { trackEvent } from './utils/analytics';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['es']) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = localStorage.getItem('kikko_preferred_lang');
      if (saved === 'es' || saved === 'en' || saved === 'it') {
        return saved as Language;
      }
    } catch {
      // Ignorar errores de acceso a almacenamiento
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.language) {
        const browserLang = navigator.language.slice(0, 2).toLowerCase();
        if (browserLang === 'es' || browserLang === 'en' || browserLang === 'it') {
          return browserLang as Language;
        }
      }
    } catch {
      // Ignorar errores de navigator
    }
  }
  return 'es';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    trackEvent('language_changed', { lang });
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('kikko_preferred_lang', lang);
      } catch {
        // Ignorar errores de acceso a almacenamiento
      }
    }
  };

  const t = (key: keyof typeof translations['es']) => {
    return translations[language][key] || translations['es'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
