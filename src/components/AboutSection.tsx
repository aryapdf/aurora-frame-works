import { useLanguage } from "@/contexts/LanguageContext";
import googleLogo from "@/assets/logos/google-logo.png";
import youtubeLogo from "@/assets/logos/youtube-logo.png";
import chevroletLogo from "@/assets/logos/chevrolet-logo.png";
import slackLogo from "@/assets/logos/slack-logo.png";
import spotifyLogo from "@/assets/logos/spotify-logo.png";
import hboLogo from "@/assets/logos/hbo-logo.png";

const AboutSection = () => {
  const { t } = useLanguage();
  
  const companies = [
    { name: "Google", logo: googleLogo },
    { name: "YouTube", logo: youtubeLogo },
    { name: "Chevrolet", logo: chevroletLogo },
    { name: "Slack", logo: slackLogo },
    { name: "Spotify", logo: spotifyLogo },
    { name: "HBO", logo: hboLogo }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl">
          {/* Company Logos */}
          <div className="mb-12 sm:mb-16">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 opacity-40">
              {companies.map((company, index) => (
                <div 
                  key={company.name}
                  className="flex items-center justify-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="h-6 sm:h-8 object-contain filter brightness-0 invert opacity-60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section Header */}
          <div className="text-left mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm text-foreground/40 uppercase tracking-wider mb-6 sm:mb-8">
              {t("about.section")}
            </p>
            
            {/* Main Content */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-relaxed">
                {t("about.title")}
              </h2>
              
              <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed max-w-3xl">
                {t("about.description")}
              </p>

              {/* Current Job */}
              <div className="pt-4 sm:pt-6">
                <div className="flex items-start sm:items-center space-x-2 text-foreground/60">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 sm:mt-0 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg">
                    {t("about.current_job")}
                  </p>
                </div>
                <p className="text-sm sm:text-base text-foreground/40 ml-4 mt-2 leading-relaxed">
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