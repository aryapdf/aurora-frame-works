import { useRef } from "react";
import { useLanguage } from "@/context/GlobalContext.tsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const { t } = useLanguage();
    const aboutSectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: aboutSectionRef.current,
                start: 'top 50%',
                end: '+=35%',
                scrub: 1,
                toggleActions: 'play none none reverse',
            },
        }).from(aboutSectionRef.current, { y: 40, opacity: 0, duration: 0.4 });
    }, []);

    return (
        <section ref={aboutSectionRef} id="about" className="relative">
            <div className="container mx-auto flex items-center justify-center h-screen" style={{
                paddingLeft: 'clamp(1rem, 3vw, 1.5rem)',
                paddingRight: 'clamp(1rem, 3vw, 1.5rem)',
                paddingTop: 'clamp(5rem, 10vh, 6rem)'
            }}>
                <div className="w-full h-fit backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl" style={{
                    padding: 'clamp(2rem, 6vw, 4rem)',
                    boxShadow: "0 8px 32px 0 rgba(0, 200, 255, 0.1)",
                }}>
                    <p className="text-foreground/40 uppercase tracking-wider" style={{
                        fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                        marginBottom: 'clamp(1rem, 3vw, 2rem)'
                    }}>
                        {t("about.section")}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vw, 2rem)' }}>
                        <h2 className="font-normal text-foreground" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)', lineHeight: 1.25 }}>
                            {t("about.title")}
                        </h2>

                        <p className="text-foreground/60 max-w-4xl" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)', lineHeight: 1.25 }}>
                            {t("about.description")}
                        </p>

                        <p className="text-foreground/60" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', paddingTop: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                            {t("about.current_job")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;