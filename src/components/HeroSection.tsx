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
      <section ref={sectionRef} className="relative overflow-hidden flex items-center" style={{ 
        minHeight: 'clamp(650px, 100vh, 1200px)',
        paddingTop: 'clamp(4rem, 10vh, 6rem)',
        paddingBottom: 'clamp(5rem, 12vh, 6rem)'
      }}>
        <div className="container mx-auto" style={{ paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', paddingRight: 'clamp(1rem, 3vw, 1.5rem)' }}>
          {/* Blurred background container */}
          <div ref={containerRef} className="backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl flex items-center" style={{ 
            padding: 'clamp(2rem, 6vw, 4rem)',
            minHeight: 'clamp(450px, 60vh, 600px)'
          }}>
            <div className="max-w-full" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
              {/* Profile Bubble */}
              <div ref={profileRef} className="inline-flex items-center glass-card rounded-full w-fit" style={{
                gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)'
              }}>
                <img
                    alt="personal_logo"
                    src="src/assets/personal-logo-full.png"
                    className="object-contain rounded-full"
                    style={{ width: 'clamp(1.5rem, 3vw, 2rem)', height: 'clamp(1.5rem, 3vw, 2rem)' }}
                />
                <span className="text-foreground/80" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>{t("hero.greeting")}</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-bold leading-tight text-foreground max-w-full" style={{ fontSize: 'clamp(1.875rem, 6vw, 4.5rem)' }}>
              <span
                  ref={nameRef}
                  className="block bg-gradient-to-r from-[#00C8FF] to-[#0072FF] bg-clip-text text-transparent font-bold leading-tight"
              >
                {t("hero.name")}
              </span>

                <span ref={textRef} className="inline-block" style={{ minHeight: '1.2em', marginTop: 'clamp(0.5rem, 1vw, 0)' }}>
                {displayedText}
                  <span className="opacity-0 pointer-events-none">A</span>
              </span>
              </h1>

              {/* CTA */}
              <div style={{ paddingTop: 'clamp(1rem, 2vw, 2rem)' }}>
                <button
                    ref={ctaRef}
                    className="group flex items-center text-foreground/60 hover:text-primary transition-colors"
                    style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                >
                  <span className="leading-relaxed">{t("hero.scroll")}</span>
                  <ArrowDown style={{ width: 'clamp(0.75rem, 1.2vw, 1rem)', height: 'clamp(0.75rem, 1.2vw, 1rem)' }} className="group-hover:translate-y-1 transition-transform flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;