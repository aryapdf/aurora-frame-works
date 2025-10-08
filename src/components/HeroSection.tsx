import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { t } = useLanguage();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = t("hero.roles") as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.from(containerRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 1,
    })
    .from(profileRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.4,
    }, "-=0.9")
    .from(nameRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.4,
    }, "-=0.7")
    .from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.4,
    }, "-=0.5")
    .from(ctaRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.4,
    }, "-=0.3");

  }, { scope: sectionRef });

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 30 : 50);

    return () => clearTimeout(timeout);
  }, [currentTextIndex, displayedText, isDeleting, texts]);

  return (
      <section ref={sectionRef} className="min-h-screen md:min-h-screen pt-20 pb-24 md:pb-0 relative overflow-hidden flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Blurred background container */}
          <div ref={containerRef} className="backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl p-8 sm:p-12 lg:p-16 min-h-[600px] md:min-h-0 flex items-center">
            <div className="max-w-full space-y-6 sm:space-y-8">
              {/* Profile Bubble */}
              <div ref={profileRef} className="inline-flex items-center space-x-2 sm:space-x-3 glass-card px-3 sm:px-4 py-2 rounded-full">
                <img
                    alt="personal_logo"
                    src="src/assets/personal-logo-full.png"
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded-full"
                />
                <span className="text-foreground/80 text-xs sm:text-sm">{t("hero.greeting")}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-foreground max-w-full">
              <span
                  ref={nameRef}
                  className="block bg-gradient-to-r from-[#00C8FF] to-[#0072FF] bg-clip-text text-transparent font-bold leading-tight"
              >
                {t("hero.name")}
              </span>

                <span ref={textRef} className="inline-block min-h-[1.2em] mt-2 sm:mt-0">
                {displayedText}
                  <span className="opacity-0 pointer-events-none">A</span>
              </span>
              </h1>

              {/* CTA */}
              <div className="pt-4 sm:pt-8">
                <button
                    ref={ctaRef}
                    className="group flex items-center space-x-2 text-foreground/60 hover:text-primary transition-colors text-sm sm:text-base">
                  <span className="leading-relaxed">{t("hero.scroll")}</span>
                  <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-y-1 transition-transform flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;