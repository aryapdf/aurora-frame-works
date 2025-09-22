import { useLanguage } from "@/contexts/LanguageContext";
import vscodeIcon from "@/assets/tools/vscode-icon.png";
import reactIcon from "@/assets/tools/react-icon.png";
import vueIcon from "@/assets/tools/vue-icon.png";
import figmaIcon from "@/assets/tools/figma-icon.png";
import nuxtIcon from "@/assets/tools/nuxt-icon.png";
import gitIcon from "@/assets/tools/git-icon.png";

const ExperienceSection = () => {
  const { t } = useLanguage();
  
  const tools = [
    { name: "VS Code", icon: vscodeIcon },
    { name: "React", icon: reactIcon },
    { name: "Vue.js", icon: vueIcon },
    { name: "Figma", icon: figmaIcon },
    { name: "Nuxt.js", icon: nuxtIcon },
    { name: "Git", icon: gitIcon }
  ];

  const experiences = t("experience.positions") as Array<{
    title: string;
    company: string;
    location: string;
    period: string;
  }>;

  return (
    <section id="experience" className="pt-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Tool Icons */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
            {tools.map((tool, index) => (
              <div 
                key={tool.name}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 glass-card rounded-xl sm:rounded-2xl flex items-center justify-center hover:glow-effect transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={tool.icon} 
                  alt={tool.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-primary font-medium tracking-wider">{t("experience.section")}</span>
            <div className="h-px bg-border flex-1"></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {t("experience.title")}
          </h2>
          
          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-3xl">
            {t("experience.description")}
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between py-4 sm:py-6 border-b border-border/30 last:border-b-0 hover:bg-card/20 transition-all duration-300 rounded-lg px-2 sm:px-4"
              style={{ animationDelay: `${(index + tools.length) * 0.1}s` }}
            >
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2">
                  {exp.title}
                </h3>
                <p className="text-foreground/60 text-sm sm:text-base">
                  {exp.company} — {exp.location}
                </p>
              </div>
              
              <div className="mt-3 md:mt-0 md:ml-8">
                <span className="text-primary font-medium text-base sm:text-lg tracking-wide">
                  {exp.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;