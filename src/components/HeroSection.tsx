import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import {useLanguage, useHeader, useTheme} from "@/context/GlobalContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from '@/assets/personal-logo-t.png';
import logoDark from '@/assets/personal-logo-dark.png';
import logoWhite from '@/assets/personal-logo-light.png';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { t } = useLanguage();
  const { showHeader, hideHeader, toggleHeader } = useHeader();
  const { theme } = useTheme();

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  const texts = t("hero.roles") as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Welcome Animation
  useEffect(() => {
    if (!showWelcome) return;

    // Disable scroll
    document.body.style.overflow = "hidden";
    hideHeader();

    const particles = [];
    const particleCount = 100;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "welcome-particle";

      const size = gsap.utils.random(4, 40);
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, #00C8FF, #0072FF);
        border-radius: 50%;
        z-index: 99;
        left: 50%;
        top: 50%;
        opacity: 0;
      `;

      document.getElementById("welcome-bg")?.appendChild(particle);
      particles.push(particle);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setShowWelcome(false);
        setAnimationComplete(true);
        document.body.style.overflow = "auto";
        showHeader();
        particles.forEach(p => p.remove());
      }
    });

    // Animation sequence
    tl.to("#welcome-bg", {
      opacity: 1,
      duration: 0.3
    })
        // Logo appears
        .from("#welcome-logo", {
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 1,
          ease: "back.out(2)"
        }, "+=0.3")
        // Logo pulse
        .to("#welcome-logo", {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1
        })
        // Text appears
        .from("#welcome-text", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3")
        // Particles explode
        .to(".welcome-particle", {
          x: (i) => gsap.utils.random(-.5 * window.innerWidth, .5 * window.innerWidth),
          y: (i) => gsap.utils.random(-.5 * window.innerHeight, .5 * window.innerHeight),
          opacity: 1,
          scale: gsap.utils.random(0.5, 1.5),
          duration: 1.2,
          ease: "power2.out",
          stagger: {
            amount: 0.3,
            from: "center"
          }
        }, "+=0.2")
        // Everything fades
        .to("#welcome-bg", {
          opacity: 0,
          scale: 1.1,
          duration: 0.6
        }, "-=0.4")
        .to(".welcome-particle", {
          opacity: 0,
          scale: 0,
          duration: 0.4
        }, "-=0.6");

    return () => {
      tl.kill();
      particles.forEach(p => p.remove());
      document.body.style.overflow = "auto";
    };
  }, [showWelcome, hideHeader, showHeader]);

  // Hero animation
  useGSAP(() => {
    if (!animationComplete) return;

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

  }, { scope: sectionRef, dependencies: [animationComplete] });

  // Typewriter effect
  useEffect(() => {
    if (!animationComplete) return;

    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 30 : 50);

    return () => clearTimeout(timeout);
  }, [currentTextIndex, displayedText, isDeleting, texts, animationComplete]);

  return (
      <>
        {/* Welcome Animation */}
        {showWelcome && (
            <div
                id="welcome-container"
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 9999,
                  pointerEvents: "none"
                }}
            >
              <div
                  id="welcome-bg"
                  style={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                    opacity: 0
                  }}
              >
                <img
                    id="welcome-logo"
                    src={theme === 'dark' ? logoDark : logoWhite}
                    alt="Logo"
                    style={{
                      width: "clamp(80px, 15vw, 150px)",
                      height: "clamp(80px, 15vw, 150px)",
                      borderRadius: "50%",
                      boxShadow: "0 0 60px rgba(0, 200, 255, 0.5)",
                      zIndex: 100
                    }}
                />

                {/*<h1*/}
                {/*    id="welcome-text"*/}
                {/*    style={{*/}
                {/*      fontSize: "clamp(2rem, 6vw, 4rem)",*/}
                {/*      fontWeight: "bold",*/}
                {/*      background: "linear-gradient(135deg, #00C8FF, #0072FF, #00C8FF)",*/}
                {/*      backgroundSize: "200% 200%",*/}
                {/*      WebkitBackgroundClip: "text",*/}
                {/*      WebkitTextFillColor: "transparent",*/}
                {/*      animation: "gradient-shift 3s ease infinite",*/}
                {/*      textAlign: "center"*/}
                {/*    }}*/}
                {/*>*/}
                {/*  {t("hero.greeting")}*/}
                {/*</h1>*/}
              </div>
            </div>
        )}

        {/* Hero Section */}
        <section
            ref={sectionRef}
            className="relative overflow-hidden flex items-center"
            style={{
              minHeight: 'clamp(650px, 100vh, 1200px)',
              paddingTop: 'clamp(4rem, 10vh, 6rem)',
              paddingBottom: 'clamp(5rem, 12vh, 6rem)',
              opacity: animationComplete ? 1 : 0
            }}
        >
          <div className="container mx-auto" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 3rem)', paddingRight: 'clamp(1.5rem, 5vw, 3rem)' }}>
            <div ref={containerRef} className="backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl flex items-center" style={{
              padding: 'clamp(2rem, 6vw, 4rem)',
              minHeight: 'clamp(450px, 100vh, 720px)'
            }}>
              <div className="max-w-full" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
                <div ref={profileRef} className="inline-flex items-center glass-card rounded-full w-fit" style={{
                  gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                  padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)'
                }}>
                  <img
                      alt="personal_logo"
                      src={theme === 'dark' ? logoDark : logoWhite}
                      className="object-contain rounded-full"
                      style={{ width: 'clamp(1.5rem, 3vw, 2rem)', height: 'clamp(1.5rem, 3vw, 2rem)'}}
                  />
                  <span className="text-foreground/80" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>{t("hero.greeting")}</span>
                </div>

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

        <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      </>
  );
};

export default HeroSection;