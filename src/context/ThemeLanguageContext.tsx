import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, translations, TranslationKey } from '../i18n/translations';

interface ThemeLanguageContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | null>(null);

const STORAGE_LANG_KEY = 'animation_studio_lang';
const STORAGE_THEME_KEY = 'animation_studio_theme';

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'ru' || saved === 'en') return saved;
    } catch (e) {
      // ignore
    }
    return 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      // ignore
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, language);
    } catch (e) {
      // ignore
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_THEME_KEY, theme);
    } catch (e) {
      // ignore
    }

    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }

    // Update meta theme-color for PWA & iOS Safari toolbar
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0b0d14');
    }
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const dict = translations[language] || translations.en;
    let text = (dict[key] || translations.en[key] || key) as string;

    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
      });
    }

    return text;
  };

  return (
    <ThemeLanguageContext.Provider
      value={{
        language,
        theme,
        setLanguage,
        setTheme,
        toggleTheme,
        t,
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => {
  const ctx = useContext(ThemeLanguageContext);
  if (!ctx) {
    throw new Error('useThemeLanguage must be used within ThemeLanguageProvider');
  }
  return ctx;
};
