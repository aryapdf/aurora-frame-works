import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  const companies = [
    { name: "SGT", logo: "src/assets/logos/summitglobal-logo.png" },
    { name: "Infinix", logo: "src/assets/logos/infinix-logo.png" },
    { name: "Xclub", logo: "src/assets/logos/xclub-logo.png" },
    { name: "Xpark", logo: "src/assets/logos/xpark-logo.png" },
    { name: "2Sweet", logo: "src/assets/logos/2sweet-logo.svg" },
  ];

  return (
      <section id="about" className="relative">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-center h-screen pt-24">
          <div className="w-full h-fit flex flex-col justify-center items-center backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl p-8 sm:p-12 lg:p-16">
            {/* Company Logos Grid */}
            {/*<div className="mb-8 sm:mb-12 lg:mb-16 w-full">*/}
            {/*  <div className="flex flex-wrap items-center justify-between gap-8 sm:gap-12 lg:gap-16">*/}
            {/*    {companies.map((company) => (*/}
            {/*        <div*/}
            {/*            key={company.name}*/}
            {/*            className="flex items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-110"*/}
            {/*        >*/}
            {/*          <img*/}
            {/*              src={company.logo}*/}
            {/*              alt={`${company.name} logo`}*/}
            {/*              className="h-16 md:h-24 lg:h-32 w-auto filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 overflow-hidden rounded-xl"*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* Section Header */}
            <div className="text-left mb-6 sm:mb-8 lg:mb-12 max-w-full">
              <p className="text-xs sm:text-sm text-foreground/40 uppercase tracking-wider mb-4 sm:mb-6 lg:mb-8">
                {t("about.section")}
              </p>

              {/* Main Content */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h2
                    className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-foreground leading-relaxed sm:leading-relaxed lg:leading-relaxed"
                    style={{lineHeight: 1.25}}
                >
                  {t("about.title")}
                </h2>

                <p
                    className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground/60 leading-relaxed sm:leading-relaxed lg:leading-loose max-w-4xl"
                    style={{lineHeight: 1.25}}
                >
                  {t("about.description")}
                </p>

                {/* Current Job */}
                <div className="pt-3 sm:pt-4 lg:pt-6">
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