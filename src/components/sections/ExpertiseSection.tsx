import { useState, useRef } from "react";
import { useLanguage } from "@/context/GlobalContext.tsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Import skill icons
import reactIcon from "@/assets/tools/react-icon.png";
import vueIcon from "@/assets/tools/vue-icon.png";
import antdIcon from "@/assets/tools/antd-icon.svg";
import magentoIcon from "@/assets/tools/magento-icon.svg";
import backendIcon from "@/assets/tools/back-end-icon.svg";

interface Skill {
  id: string;
  name: string;
  icon: string;
}

const skills: Skill[] = [
  { id: "react", name: "React/Next/TS", icon: reactIcon },
  { id: "vue", name: "Vue/Nuxt", icon: vueIcon },
  { id: "antd", name: "ANTD", icon: antdIcon },
  { id: "magento", name: "Magento", icon: magentoIcon },
  { id: "backend", name: "Back-End", icon: backendIcon },
];

const ExpertiseSection = () => {
  const { t } = useLanguage();
  const [activeSkill, setActiveSkill] = useState<string>("react");
  const expertiseSectionRef = useRef<HTMLElement>(null);
  const expertiseHeaderRef = useRef<HTMLDivElement>(null);
  const skillsNavRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const handleSkillClick = (skillId: string) => {
    setActiveSkill(skillId);
    const skillIndex = skills.findIndex(s => s.id === skillId);
    const scrollProgress = skillIndex / (skills.length - 1);
    const trigger = ScrollTrigger.getById('expertise-scroll');
    if (trigger) {
      const scrollDistance = trigger.end - trigger.start;
      const targetScroll = trigger.start + (scrollDistance * scrollProgress);
      gsap.to(window, { scrollTo: targetScroll, duration: 0, ease: "none" });
    }
  };

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: expertiseSectionRef.current,
        start: "top 50%",
        end: "+=35%",
        // markers: true,
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    })
    .from(expertiseHeaderRef.current, { y: 40, opacity: 0, duration: 0.4 })
    .from(skillsNavRef.current, { x: -60, opacity: 0, duration: 0.8 }, "+=0.4")
    .from(detailRef.current, { x: 60, opacity: 0, duration: 0.8 }, "<");

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'expertise-scroll',
        trigger: expertiseSectionRef.current,
        start: "top top",
        end: "+=400%",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    skills.forEach((skill, index) => {
      tl.to({}, {
        duration: 1,
        onStart: () => setActiveSkill(skill.id),
        onReverseComplete: () => {
          if (index > 0) {
            setActiveSkill(skills[index - 1].id)
          }
        }
      })
    })
  }, { scope: expertiseSectionRef });

  const expertiseData = t("expertise");
  const activeData = expertiseData.skills.find((s: any) => s.id === activeSkill);

  return (
      <section ref={expertiseSectionRef} id="expertise" className="relative min-h-screen max-h-screen overflow-hidden" style={{ paddingTop: 'clamp(5rem, 10vh, 6rem)', paddingBottom: 'clamp(5rem, 10vh, 6rem)' }}>
        <div className="container mx-auto h-full flex flex-col" style={{ paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', paddingRight: 'clamp(1rem, 3vw, 1.5rem)' }}>
          <div ref={expertiseHeaderRef} className="flex-shrink-0" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <p className="font-mono text-muted-foreground tracking-wider" style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)', marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
              {expertiseData.section}
            </p>
            <h2 className="font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
              {expertiseData.title}
            </h2>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-12 flex-1 items-stretch min-h-0" style={{ gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <div ref={skillsNavRef} className="md:col-span-2 flex flex-col md:h-full">
              <div className="flex justify-start md:flex-col md:justify-between overflow-x-auto md:overflow-y-auto md:flex-1 border-b border-border/30" style={{ gap: 'clamp(0.25rem, 1vw, 1.25rem)', paddingBottom: '0' }}>
                {skills.map((skill) => (
                    <button
                        key={skill.id}
                        onClick={() => handleSkillClick(skill.id)}
                        className={`group relative flex items-center border-2 transition-all duration-300 md:w-full flex-shrink-0 md:flex-1 md:justify-center rounded-xl md:rounded-2xl ${
                            activeSkill === skill.id
                                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-background/80"
                        }`}
                        style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)', padding: 'clamp(0.625rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)' }}
                    >
                      <div className="flex md:flex-col items-center" style={{ gap: 'clamp(0, 1.5vw, 0.75rem)' }}>
                        <div className={`flex items-center justify-center rounded-xl transition-transform duration-300 flex-shrink-0 ${activeSkill === skill.id ? "scale-110" : "group-hover:scale-105"}`} style={{ width: 'clamp(1.25rem, 8vw, 4rem)', height: 'clamp(1.25rem, 8vw, 4rem)' }}>
                          <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain rounded-xl" />
                        </div>
                      </div>
                    </button>
                ))}
              </div>
            </div>

            <div ref={detailRef} className="md:col-span-10 flex flex-col h-full min-h-0">
              <div className="backdrop-blur-xl bg-background/50 border border-foreground/10 rounded-2xl md:rounded-3xl flex-1 flex flex-col overflow-hidden" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
                {activeData && (
                    <div className="flex flex-col flex-1 min-h-0">
                      <div className="border-b border-border/50 flex-shrink-0" style={{ paddingBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                        <h3 className="font-bold" style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)', marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                          {activeData.title}
                        </h3>
                        <div className="flex items-center text-muted-foreground" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)', fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{activeData.experience}</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0" style={{ paddingTop: 'clamp(1rem, 2vw, 1.5rem)', paddingBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                        <h4 className="font-semibold text-foreground/90" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)' }}>
                          {expertiseData.experienceLabel}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                          {activeData.detail}
                        </p>
                      </div>

                      <h4 className="font-semibold text-foreground/90" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                        {expertiseData.projectsLabel}
                      </h4>
                      <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-1 xl:grid-cols-2" style={{ gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                          {activeData.projects.map((project: any, index: number) => (
                              <div key={index} className="group rounded-xl border border-border/50 bg-background/30 hover:bg-background/60 hover:border-primary/50 transition-all duration-300" style={{ padding: 'clamp(1rem, 2vw, 1.25rem)' }}>
                                <div className="flex items-start" style={{ gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                                  <div className="flex-shrink-0 rounded-full bg-primary" style={{ width: 'clamp(0.5rem, 1vw, 0.625rem)', height: 'clamp(0.5rem, 1vw, 0.625rem)', marginTop: 'clamp(0.5rem, 1vw, 0.625rem)' }}/>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-semibold group-hover:text-primary transition-colors duration-300" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.375rem)' }}>
                                      {project.name}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ExpertiseSection;