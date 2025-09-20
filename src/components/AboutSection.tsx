import { useLanguage } from "@/contexts/LanguageContext";
import vueIcon from "@/assets/tools/vue-icon.png";
import reactIcon from "@/assets/tools/react-icon.png";
import nuxtIcon from "@/assets/tools/nuxt-icon.png";
import figmaIcon from "@/assets/tools/figma-icon.png";
import vscodeIcon from "@/assets/tools/vscode-icon.png";
import gitIcon from "@/assets/tools/git-icon.png";

const AboutSection = () => {
  const { t } = useLanguage();
  
  const techStack = [
    { name: "Vue.js", icon: vueIcon },
    { name: "React", icon: reactIcon },
    { name: "Nuxt.js", icon: nuxtIcon },
    { name: "Figma", icon: figmaIcon },
    { name: "VS Code", icon: vscodeIcon },
    { name: "Git", icon: gitIcon }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl">
          {/* Section Header */}
          <div className="text-left mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm text-foreground/40 uppercase tracking-wider mb-6 sm:mb-8">
              {t("about.section")}
            </p>
            
            {/* Main Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-foreground leading-relaxed">
                  {t("about.title")}
                </h2>
                
                <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed">
                  {t("about.description")}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="py-6 sm:py-8">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 max-w-2xl">
                  {techStack.map((tech, index) => (
                    <div 
                      key={tech.name}
                      className="flex items-center justify-center p-3 sm:p-4 glass-card hover:glow-effect transition-all duration-300 rounded-lg"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <img 
                        src={tech.icon} 
                        alt={tech.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Job */}
              <div className="pt-6 sm:pt-8">
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