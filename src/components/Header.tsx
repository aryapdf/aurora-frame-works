import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage, useHeader } from "@/context/GlobalContext";
import logo from "@/assets/personal-logo-t.png"

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isHeaderVisible } = useHeader()

  const navItems = [
    { key: "nav.about", label: t("nav.about"), section: "about" },
    { key: "nav.projects", label: t("nav.projects"), section: "projects" },
    { key: "nav.expertise", label: t("nav.expertise"), section: "expertise" },
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
        <header className={`${isHeaderVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
          <div className={`hidden md:block fixed top-4 left-0 right-0 z-50 transition-all duration-300 bg-transparent `}>
            <div className="px-16 mx-auto"
            >
              <div className="flex items-center justify-between">

                {/* Logo */}
                <div
                    className={
                  `flex items-center rounded-full ${isScrolled ? 'glass-card' : 'n-glass-card'
                } 
                `} style={{gap: 'clamp(1.5rem, 3vw, 2rem)'}}>
                  <img
                      alt="personal_logo"
                      src={logo}
                      className="object-contain rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      style={{width: 'clamp(2.5rem, 4vw, 3.5rem)', height: 'clamp(2.5rem, 4vw, 3.5rem)'}}
                      onClick={() => smoothScrollTo("top")}
                  />
                </div>

                {/* Right side */}
                <div
                    className={
                      `flex items-center p-1 rounded-lg ${isScrolled ? 'glass-card' : 'n-glass-card'}`
                }
                     style={{gap: 'clamp(0.5rem, 1vw, 1rem)' }}>
                  <LanguageSwitcher/>
                  <ThemeToggle/>
                </div>
              </div>
            </div>
          </div>

          <div className={`
            hidden md:block fixed bottom-4 left-0 right-0 z-50 mx-auto w-fit transition-all duration-300 rounded-lg ${isScrolled ? 'glass-card' : 'n-glass-card'}`}
                  style={{padding: 'clamp(0.5rem, 1vw, 0.75rem) 0'}}>
            <div className="container w-fit"
                 style={{paddingLeft: 'clamp(1rem, 2vw, 1.5rem)', paddingRight: 'clamp(1rem, 2vw, 1.5rem)'}}>
              {/* Desktop Nav */}
              <nav className="flex items-center" style={{gap: 'clamp(1.5rem, 2.5vw, 2rem)'}}>
                {navItems.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => smoothScrollTo(item.section)}
                        className="text-foreground/80 hover:text-foreground transition-colors font-medium"
                        style={{fontSize: 'clamp(0.875rem, 1vw, 1rem)'}}
                    >
                      {item.label}
                    </button>
                ))}
              </nav>
            </div>
          </div>
        </header>


        {/* Mobile Header - Bottom */}
        <header
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-foreground/10 pb-safe">
          <div className="container mx-auto" style={{padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)'}}>
            <div className="flex items-center justify-between flex-row-reverse">
              {/* Hamburger Menu - Left */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground/80"
                          style={{width: 'clamp(2.25rem, 5vw, 2.5rem)', height: 'clamp(2.25rem, 5vw, 2.5rem)'}}>
                    <Menu style={{width: 'clamp(1.125rem, 3vw, 1.25rem)', height: 'clamp(1.125rem, 3vw, 1.25rem)'}}/>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto max-h-[80vh] rounded-t-3xl">
                  <nav className="flex flex-col space-y-1"
                       style={{paddingTop: 'clamp(1rem, 2vw, 1.5rem)', paddingBottom: 'clamp(1rem, 2vw, 1.5rem)'}}>
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => {
                              smoothScrollTo(item.section);
                              setOpen(false);
                            }}
                            className="text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors font-medium text-left rounded-lg"
                            style={{
                              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.25rem)'
                            }}
                        >
                          {item.label}
                        </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Theme and Language - Middle */}
              <div className="flex items-center" style={{ gap: 'clamp(0.5rem, 2vw, 0.75rem)' }}>
                <ThemeToggle />
                <LanguageSwitcher />
              </div>

              {/* Logo - Right */}
              <img 
                alt="personal_logo" 
                src={logo}
                className="object-contain rounded-full cursor-pointer hover:scale-105 transition-transform"
                style={{ width: 'clamp(2rem, 5vw, 2.5rem)', height: 'clamp(2rem, 5vw, 2.5rem)' }}
                onClick={() => smoothScrollTo("top")}
              />
            </div>
          </div>
        </header>
      </>
  );
};

export default Header;