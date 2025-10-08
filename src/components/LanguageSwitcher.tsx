import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

  // Mobile version - Sheet
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
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
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto rounded-t-3xl">
          <div className="py-4 space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 text-left text-lg transition-colors hover:bg-muted/50 flex items-center gap-3 rounded-lg ${
                  language === lang.code ? 'bg-muted/30 text-primary' : 'text-foreground/80'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop version - Dropdown
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

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 glass-card border border-border/50 rounded-md shadow-lg z-50 overflow-hidden">
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
      )}
    </div>
  );
};

export default LanguageSwitcher;