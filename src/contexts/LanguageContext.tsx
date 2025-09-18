import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Simple translations object - in a real app, you'd load this from files
const translations = {
  en: {
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.proposal': 'Proposal',
    'nav.contact': 'Contact',
    'lang.english': 'English',
    'lang.indonesian': 'Bahasa Indonesia',
  },
  id: {
    'nav.work': 'Karya',
    'nav.experience': 'Pengalaman',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.proposal': 'Proposal',
    'nav.contact': 'Kontak',
    'lang.english': 'English',
    'lang.indonesian': 'Bahasa Indonesia',
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Update document language attribute
    document.documentElement.lang = language;
    
    // Save to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};