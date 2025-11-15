// path : src/components/Jumbotron.tsx

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ArrowDown } from "lucide-react";
import {useLanguage, useHeader, useTheme} from "@/context/GlobalContext.tsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from '@/assets/personal-logo-t.png';
import logoDark from '@/assets/personal-logo-dark.png';
import logoWhite from '@/assets/personal-logo-light.png';

gsap.registerPlugin(ScrollTrigger);

const Jumbotron = () => {
    const { t } = useLanguage();
    const { showHeader, hideHeader, toggleHeader } = useHeader();
    const { theme } = useTheme();

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [animationComplete, setAnimationComplete] = useState(false);

    const texts = t("hero.roles") as string[];

    // Hero refs
    const heroSectionRef = useRef<HTMLElement>(null);
    const heroContainerRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);

    // About refs
    const aboutSectionRef = useRef<HTMLElement>(null);
    const aboutContainerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const jobRef = useRef<HTMLDivElement>(null);

    // Glass shards refs
    const glassShardRefs = useRef<HTMLDivElement[]>([]);

    // Welcome Animation
    useEffect(() => {
        if (!showWelcome) return;

        document.body.style.overflow = "hidden";
        hideHeader();

        const particles = [];
        const particleCount = 100;

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
                box-shadow: 0 0 ${size * 2}px rgba(0, 200, 255, 0.8);
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

        tl.to("#welcome-bg", {
            opacity: 1,
            duration: 0.3
        })
            .from("#welcome-logo", {
                scale: 0,
                rotation: -180,
                opacity: 0,
                duration: 1,
                ease: "back.out(2)"
            }, "+=0.3")
            .to("#welcome-logo", {
                scale: 1.1,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            })
            .from("#welcome-text", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3")
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

        tl.from(heroContainerRef.current, {
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

    }, { dependencies: [animationComplete] });

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
                                boxShadow: "0 0 80px rgba(0, 200, 255, 0.8), 0 0 120px rgba(0, 200, 255, 0.5)",
                                zIndex: 100
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Glass Shards Overlay */}
            <div style={{position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000}}>
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        ref={(el) => el && (glassShardRefs.current[i] = el)}
                        style={{
                            position: "absolute",
                            width: `${gsap.utils.random(100, 250)}px`,
                            height: `${gsap.utils.random(100, 250)}px`,
                            left: `${gsap.utils.random(0, 100)}%`,
                            top: `${gsap.utils.random(0, 100)}%`,
                            background: "linear-gradient(135deg, rgba(0, 200, 255, 0.1), rgba(0, 114, 255, 0.05))",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: `${gsap.utils.random(10, 30)}px`,
                            transform: `rotate(${gsap.utils.random(-45, 45)}deg)`,
                            opacity: 0,
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section
                ref={heroSectionRef}
                className="relative overflow-hidden flex items-center"
                style={{
                    minHeight: 'clamp(650px, 100vh, 1200px)',
                    paddingTop: 'clamp(4rem, 10vh, 6rem)',
                    paddingBottom: 'clamp(5rem, 12vh, 6rem)',
                    opacity: animationComplete ? 1 : 0
                }}
            >
                <div className="container mx-auto" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 3rem)', paddingRight: 'clamp(1.5rem, 5vw, 3rem)' }}>
                    <div ref={heroContainerRef} className="backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl flex items-center" style={{
                        padding: 'clamp(2rem, 6vw, 4rem)',
                        minHeight: 'clamp(450px, 100vh, 720px)',
                        boxShadow: "0 0 30px rgba(0, 200, 255, 0.2), 0 0 60px rgba(0, 200, 255, 0.1)"
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

            {/* About Section */}
            <section ref={aboutSectionRef} id="about" className="relative">
                <div className="container mx-auto flex items-center justify-center h-screen" style={{
                    paddingLeft: 'clamp(1rem, 3vw, 1.5rem)',
                    paddingRight: 'clamp(1rem, 3vw, 1.5rem)',
                    paddingTop: 'clamp(5rem, 10vh, 6rem)'
                }}>
                    <div
                        ref={aboutContainerRef}
                        className="w-full h-fit flex flex-col justify-center items-center backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl"
                        style={{
                            padding: 'clamp(2rem, 6vw, 4rem)',
                            boxShadow: "0 8px 32px 0 rgba(0, 200, 255, 0.1)",
                        }}
                    >
                        <div className="text-left max-w-full" style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
                            <p ref={headerRef} className="text-foreground/40 uppercase tracking-wider" style={{
                                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                                marginBottom: 'clamp(1rem, 3vw, 2rem)'
                            }}>
                                {t("about.section")}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vw, 2rem)' }}>
                                <h2
                                    ref={titleRef}
                                    className="font-normal text-foreground leading-relaxed"
                                    style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)', lineHeight: 1.25 }}
                                >
                                    {t("about.title")}
                                </h2>

                                <p
                                    ref={descRef}
                                    className="text-foreground/60 leading-relaxed max-w-4xl"
                                    style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)', lineHeight: 1.25 }}
                                >
                                    {t("about.description")}
                                </p>

                                <div ref={jobRef} style={{ paddingTop: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                                    <div className="flex items-start sm:items-center text-foreground/60" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                                        <p className="leading-normal" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}>
                                            {t("about.current_job")}
                                        </p>
                                    </div>
                                </div>
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

export default Jumbotron;