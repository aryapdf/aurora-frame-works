import { useLanguage } from "@/context/GlobalContext";
import personalLogo from "@/assets/personal-logo-t.png";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(contentRef.current?.children || [], {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: footerRef });

  const smoothScrollTo = (targetId: string) => {
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} className="bg-background/95 backdrop-blur-sm border-t border-border/10 py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={personalLogo} 
                alt="Arya Pradana Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-foreground">
                Arya Pradana
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Thanks for stopping by. Whether you're here to explore my work or start a new project, 
              I'm always open to great ideas and conversations.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => smoothScrollTo("projects")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t("nav.projects")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => smoothScrollTo("experience")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t("nav.experience")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => smoothScrollTo("about")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t("nav.about")}
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => smoothScrollTo("contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t("nav.contact")}
                </button>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/aryaagni" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/aryaagni" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/aryaagni" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 Arya Pradana. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            Designed and developed by Arya Pradana.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;