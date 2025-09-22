import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  const companies = [
    "Google",
    "YouTube",
    "Chevrolet",
    "Slack",
    "Spotify",
    "HBO"
  ];

  return (
      <section id="about" className="pt-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="w-full">
            {/* Company Logos - Mobile Optimized */}
            <div className="mb-8 sm:mb-12 lg:mb-16 w-full overflow-hidden">
              {/* Mobile: Scrollable horizontal layout */}
              <div className="flex sm:hidden overflow-x-auto pb-2 -mx-4 px-4 gap-6 opacity-40">
                {companies.map((company, index) => (
                    <div
                        key={company}
                        className="flex items-center justify-center flex-shrink-0"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                  <span className="text-sm text-foreground/60 font-medium whitespace-nowrap">
                    {company}
                  </span>
                    </div>
                ))}
              </div>

              {/* Tablet and Desktop: Original layout */}
              <div className="hidden sm:flex justify-between items-center opacity-40">
                {companies.map((company, index) => (
                    <div
                        key={company}
                        className="flex items-center justify-center"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                  <span className="text-sm lg:text-base text-foreground/60 font-medium">
                    {company}
                  </span>
                    </div>
                ))}
              </div>
            </div>

            {/* Section Header */}
            <div className="text-left mb-6 sm:mb-8 lg:mb-12 max-w-4xl">
              <p className="text-xs sm:text-sm text-foreground/40 uppercase tracking-wider mb-4 sm:mb-6 lg:mb-8">
                {t("about.section")}
              </p>

              {/* Main Content */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-foreground leading-tight sm:leading-relaxed">
                  {t("about.title")}
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-foreground/60 leading-relaxed max-w-3xl">
                  {t("about.description")}
                </p>

                {/* Current Job */}
                <div className="pt-3 sm:pt-4 lg:pt-6">
                  <div className="flex items-start sm:items-center space-x-2 text-foreground/60">
                    <p className="text-sm sm:text-base lg:text-lg">
                      {t("about.current_job")}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/40 mt-1 sm:mt-2 leading-relaxed">
                    {t("about.job_details")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default AboutSection;