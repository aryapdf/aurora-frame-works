import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = [
    { key: "nav.about", label: t("nav.about"), section: "about" },
    { key: "nav.projects", label: t("nav.projects"), section: "projects" },
    { key: "nav.experience", label: t("nav.experience"), section: "experience" },
    { key: "nav.contact", label: t("nav.contact"), section: "contact" }
  ];
  const [open, setOpen] = useState(false);

  const smoothScrollTo = (elementId: string) => {
    if (elementId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <>
        {/* Desktop Header - Top */}
        <header className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'glass-card' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-8">
                <img 
                  alt="personal_logo" 
                  src="src/assets/personal-logo.png" 
                  className="w-14 h-14 object-contain rounded-full cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => smoothScrollTo("top")}
                />

                {/* Desktop Nav */}
                <nav className="flex items-center space-x-8">
                  {navItems.map((item) => (
                      <button
                          key={item.key}
                          onClick={() => smoothScrollTo(item.section)}
                          className="text-foreground/80 hover:text-foreground transition-colors text-base font-medium"
                      >
                        {item.label}
                      </button>
                  ))}
                </nav>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-2 md:space-x-4">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header - Bottom */}
        <header className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-foreground/10 pb-safe">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Hamburger Menu - Left */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground/80">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto max-h-[80vh] rounded-t-3xl">
                  <nav className="flex flex-col space-y-1 py-4">
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => {
                              smoothScrollTo(item.section);
                              setOpen(false);
                            }}
                            className="text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors text-lg font-medium text-left px-4 py-3 rounded-lg"
                        >
                          {item.label}
                        </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Theme and Language - Middle */}
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>

              {/* Logo - Right */}
              <img 
                alt="personal_logo" 
                src="src/assets/personal-logo.png" 
                className="w-10 h-10 object-contain rounded-full cursor-pointer hover:scale-105 transition-transform"
                onClick={() => smoothScrollTo("top")}
              />
            </div>
          </div>
        </header>
      </>
  );
};

export default Header;