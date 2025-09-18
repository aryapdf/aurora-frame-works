import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t } = useLanguage();
  const navItems = [
    { key: "nav.work", label: t("nav.work") },
    { key: "nav.experience", label: t("nav.experience") },
    { key: "nav.blog", label: t("nav.blog") },
    { key: "nav.faq", label: t("nav.faq") },
    { key: "nav.proposal", label: t("nav.proposal") },
    { key: "nav.contact", label: t("nav.contact") }
  ];
  const [open, setOpen] = useState(false);

  return (
      <header className="fixed top-0 left-0 right-0 z-50 glass-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AA</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                  <a
                      key={item.key}
                      href={`#${item.key.split('.')[1]}`}
                      className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="text-foreground/80">
                <Search className="h-4 w-4" />
              </Button>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-64 p-6">
                    <nav className="flex flex-col space-y-4 mt-6">
                      {navItems.map((item) => (
                          <a
                              key={item.key}
                              href={`#${item.key.split('.')[1]}`}
                              onClick={() => setOpen(false)}
                              className="text-foreground/80 hover:text-foreground transition-colors text-base font-medium"
                          >
                            {item.label}
                          </a>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
