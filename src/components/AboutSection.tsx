import { useLanguage } from "@/contexts/LanguageContext";
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
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
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

  const companies = [
    { name: "SGT", logo: "src/assets/logos/summitglobal-logo.png" },
    { name: "Infinix", logo: "src/assets/logos/infinix-logo.png" },
    { name: "Xclub", logo: "src/assets/logos/xclub-logo.png" },
    { name: "Xpark", logo: "src/assets/logos/xpark-logo.png" },
    { name: "2Sweet", logo: "src/assets/logos/2sweet-logo.svg" },
  ];

  return (
      <section ref={sectionRef} id="about" className="relative">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-center h-screen pt-24">
          <div ref={containerRef} className="w-full h-fit flex flex-col justify-center items-center backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl p-8 sm:p-12 lg:p-16">
            {/* Company Logos Carousel */}
            {/*<div className="mb-8 sm:mb-12 lg:mb-16 w-full relative overflow-hidden">*/}
            {/*  /!* Scrolling container *!/*/}
            {/*  <div className="flex gap-8 sm:gap-10 lg:gap-16 animate-scroll">*/}
            {/*    /!* Duplicate the companies array for seamless loop *!/*/}
            {/*    {[...companies, ...companies, ...companies].map((company, index) => (*/}
            {/*        <div*/}
            {/*            key={`${company.name}-${index}`}*/}
            {/*            className="flex-shrink-0 flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-muted/50 border border-foreground/5 backdrop-blur-sm"*/}
            {/*        >*/}
            {/*          <img*/}
            {/*              src={company.logo}*/}
            {/*              alt={`${company.name} logo`}*/}
            {/*              className="h-8 sm:h-10 w-auto filter grayscale opacity-60 rounded-lg overflow-hidden"*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* Section Header */}
            <div className="text-left mb-6 sm:mb-8 lg:mb-12 max-w-full">
              <p ref={headerRef} className="text-xs sm:text-sm text-foreground/40 uppercase tracking-wider mb-4 sm:mb-6 lg:mb-8">
                {t("about.section")}
              </p>

              {/* Main Content */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h2
                    ref={titleRef}
                    className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-foreground leading-relaxed sm:leading-relaxed lg:leading-relaxed"
                    style={{lineHeight: 1.25}}
                >
                  {t("about.title")}
                </h2>

                <p
                    ref={descRef}
                    className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground/60 leading-relaxed sm:leading-relaxed lg:leading-loose max-w-4xl"
                    style={{lineHeight: 1.25}}
                >
                  {t("about.description")}
                </p>

                {/* Current Job */}
                <div ref={jobRef} className="pt-3 sm:pt-4 lg:pt-6">
                  <div className="flex items-start sm:items-center space-x-2 text-foreground/60">
                    <p className="text-sm sm:text-base lg:text-lg leading-normal">
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