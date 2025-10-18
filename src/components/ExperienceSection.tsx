import { useLanguage } from "@/context/GlobalContext";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ExperienceSection = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "+=50%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });

    tl.from(headerRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" })
    .from(timelineRef.current?.children || [], { y: 50, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.4");
  }, { scope: sectionRef });

  const experiences = t("experience.positions") as Array<{
    title: string; company: string; location: string; period: string; duration?: string; description?: string; skills?: string[];
  }>;

  return (
      <section ref={sectionRef} id="experience" className="relative" style={{ paddingTop: 'clamp(5rem, 10vh, 6rem)' }}>
        <div className="container mx-auto" style={{ paddingLeft: 'clamp(1.5rem, 3vw, 2rem)', paddingRight: 'clamp(1.5rem, 3vw, 2rem)' }}>
          <div ref={headerRef} className="max-w-6xl mx-auto" style={{ marginBottom: 'clamp(3rem, 6vw, 4rem)' }}>
            <div className="flex items-center" style={{ gap: 'clamp(1rem, 2vw, 1.5rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <span className="text-center w-full text-foreground/40 uppercase tracking-wider" style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)', marginBottom: 'clamp(1rem, 2vw, 1.25rem)' }}>{t("experience.section")}</span>
              <div className="h-px bg-border flex-1"></div>
            </div>
            <h2 className="text-center font-bold text-foreground leading-tight" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              {t("experience.title")}
            </h2>
            <p className="text-center text-foreground/70 leading-relaxed max-w-full" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)' }}>
              {t("experience.description")}
            </p>
          </div>

          <div ref={timelineRef} className="max-w-full mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.25rem)' }}>
            {experiences.map((exp, index) => (
                <Collapsible key={index} open={openItems.includes(index)} onOpenChange={(isOpen) => {
                  setOpenItems(prev => isOpen ? [...prev, index] : prev.filter(i => i !== index));
                }}>
                  <div className="glass-card rounded-xl overflow-hidden hover:glow-effect transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex flex-col md:flex-row md:items-center justify-between hover:bg-card/20 transition-all duration-300 cursor-pointer group" style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors" style={{ fontSize: 'clamp(1.063rem, 2vw, 1.5rem)', marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                            {exp.title}
                          </h3>
                          <p className="text-foreground/60" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                            {exp.company} — {exp.location}
                          </p>
                        </div>
                        <div className="flex items-center" style={{ gap: 'clamp(0.75rem, 1.5vw, 1rem)', marginTop: 'clamp(0.75rem, 0, 0)', marginLeft: 'clamp(0, 2vw, 2rem)' }}>
                          <span className="text-primary font-medium tracking-wide" style={{ fontSize: 'clamp(0.938rem, 1.5vw, 1.125rem)' }}>
                            {exp.period}
                          </span>
                          <ChevronDown style={{ height: 'clamp(1.125rem, 2vw, 1.25rem)', width: 'clamp(1.125rem, 2vw, 1.25rem)' }} className={`text-foreground/60 transition-transform duration-500 ease-in-out ${openItems.includes(index) ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    {exp.description && (
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                          <div className="border-t border-border/30" style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', paddingTop: 'clamp(1rem, 2vw, 1.25rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.25rem)' }}>
                            <div>
                              <p className="text-foreground/70 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                                {exp.description}
                              </p>
                            </div>
                            {exp.skills && exp.skills.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-foreground/80" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 0.938rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>Skills:</h4>
                                  <div className="flex flex-wrap" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                                    {exp.skills.map((skill, skillIndex) => (
                                        <span key={skillIndex} className="bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors" style={{ padding: 'clamp(0.25rem, 0.8vw, 0.375rem) clamp(0.75rem, 1.5vw, 1rem)', fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>
                                          {skill}
                                        </span>
                                    ))}
                                  </div>
                                </div>
                            )}
                          </div>
                        </CollapsibleContent>
                    )}
                  </div>
                </Collapsible>
            ))}
          </div>
        </div>
      </section>
  );
};

export default ExperienceSection;