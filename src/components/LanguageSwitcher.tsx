import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: t('lang.english'), flag: '🇺🇸' },
    { code: 'id', name: t('lang.indonesian'), flag: '🇮🇩' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as 'en' | 'id');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 text-foreground/80 hover:text-foreground transition-colors"
        aria-label="Switch language"
      >
        <span className="mr-2 text-sm">{currentLanguage?.flag}</span>
        <span className="text-xs font-medium uppercase">{language}</span>
        <ChevronDown 
          className={`ml-1 h-3 w-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      <div
          className={`absolute top-full right-0 mt-2 w-48 glass-card border border-border/50 rounded-md shadow-lg z-50 overflow-hidden transition-all duration-300 ${
              isOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2'
          }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-muted/50 flex items-center gap-3 ${
              language === lang.code ? 'bg-muted/30 text-primary' : 'text-foreground/80'
            }`}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;