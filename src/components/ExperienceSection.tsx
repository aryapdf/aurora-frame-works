import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import vscodeIcon from "@/assets/tools/vscode-icon.png";
import reactIcon from "@/assets/tools/react-icon.png";
import vueIcon from "@/assets/tools/vue-icon.png";
import figmaIcon from "@/assets/tools/figma-icon.png";
import nuxtIcon from "@/assets/tools/nuxt-icon.png";
import gitIcon from "@/assets/tools/git-icon.png";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ExperienceSection = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

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
    duration?: string;
    description?: string;
    skills?: string[];
  }>;

  return (
      <section id="experience" className="pt-24 relative">
        <div className="container mx-auto px-6">
          {/* Tool Icons */}
          <div className="flex justify-center mb-12 sm:mb-16 w-full">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 w-full">
              {tools.map((tool, index) => (
                  <div
                      key={tool.name}
                      className="w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 p-8 glass-card rounded-xl sm:rounded-2xl flex items-center justify-center hover:glow-effect transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img
                        src={tool.icon}
                        alt={tool.name}
                        className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
              ))}
            </div>
          </div>

          {/* Section Header */}
          <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <span className="text-center w-full text-sm text-foreground/40 uppercase tracking-wider mb-4">{t("experience.section")}</span>
              <div className="h-px bg-border flex-1"></div>
            </div>

            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              {t("experience.title")}
            </h2>

            <p className="text-center text-base sm:text-lg text-foreground/70 leading-relaxed max-w-full">
              {t("experience.description")}
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="max-w-full mx-auto space-y-4">
            {experiences.map((exp, index) => (
                <Collapsible
                    key={index}
                    open={openItems.includes(index)}
                    onOpenChange={(isOpen) => {
                      setOpenItems(prev =>
                          isOpen
                              ? [...prev, index]
                              : prev.filter(i => i !== index)
                      );
                    }}
                >
                  <div
                      className="glass-card rounded-xl overflow-hidden hover:glow-effect transition-all duration-300"
                      style={{ animationDelay: `${(index + tools.length) * 0.1}s` }}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-6 hover:bg-card/20 transition-all duration-300 cursor-pointer group">
                        <div className="flex-1 text-left">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-foreground/60 text-sm sm:text-base">
                            {exp.company} — {exp.location}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 mt-3 md:mt-0 md:ml-8">
                      <span className="text-primary font-medium text-md sm:text-lg md:text-1xl tracking-wide">
                        {exp.period}
                      </span>
                          <ChevronDown className={`h-5 w-5 text-foreground/60 transition-transform duration-500 ease-in-out ${
                              openItems.includes(index) ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    {exp.description && (
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 border-t border-border/30">
                            <div className="pt-4">
                              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
                                {exp.description}
                              </p>
                            </div>

                            {exp.skills && exp.skills.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground/80 mb-3">Skills:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {exp.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1 text-xs sm:text-sm bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                                        >
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