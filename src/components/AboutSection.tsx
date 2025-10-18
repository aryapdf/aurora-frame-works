import { useLanguage } from "@/context/GlobalContext";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const jobRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.from(containerRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
    .from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
    }, "-=0.6")
    .from(titleRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    }, "-=0.4")
    .from(descRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    }, "-=0.6")
    .from(jobRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
    }, "-=0.4");
  }, { scope: sectionRef });

  return (
      <section ref={sectionRef} id="about" className="relative">
        <div className="container mx-auto flex items-center justify-center h-screen" style={{ 
          paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', 
          paddingRight: 'clamp(1rem, 3vw, 1.5rem)',
          paddingTop: 'clamp(5rem, 10vh, 6rem)'
        }}>
          <div ref={containerRef} className="w-full h-fit flex flex-col justify-center items-center backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl" style={{ 
            padding: 'clamp(2rem, 6vw, 4rem)'
          }}>
            {/* Section Header */}
            <div className="text-left max-w-full" style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
              <p ref={headerRef} className="text-foreground/40 uppercase tracking-wider" style={{ 
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                marginBottom: 'clamp(1rem, 3vw, 2rem)'
              }}>
                {t("about.section")}
              </p>

              {/* Main Content */}
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

                {/* Current Job */}
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
  );
};

export default AboutSection;