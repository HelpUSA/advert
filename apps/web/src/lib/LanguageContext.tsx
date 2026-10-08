'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['pt'];
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt',
  setLanguage: () => {},
  t: translations.pt,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('helpus_language') as Language;
      if (saved && (saved === 'pt' || saved === 'en' || saved === 'es')) {
        setLanguageState(saved);
      }
    } catch {
      // Ignora erro de localStorage
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('helpus_language', lang);
    } catch {
      // Ignora erro
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
