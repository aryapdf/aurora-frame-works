import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import skill icons
import htmlIcon from "@/assets/tools/html-icon.svg";
import reactIcon from "@/assets/tools/react-icon.png";
import vueIcon from "@/assets/tools/vue-icon.png";
import antdIcon from "@/assets/tools/antd-icon.svg";
import magentoIcon from "@/assets/tools/magento-icon.svg";

interface Skill {
  id: string;
  name: string;
  icon: string;
}

const skills: Skill[] = [
  { id: "html", name: "HTML/CSS/JS", icon: htmlIcon },
  { id: "react", name: "React/Next/TS", icon: reactIcon },
  { id: "vue", name: "Vue/Nuxt", icon: vueIcon },
  { id: "antd", name: "ANTD", icon: antdIcon },
  { id: "magento", name: "Magento", icon: magentoIcon },
];

const ExpertiseSection = () => {
  const { t } = useLanguage();
  const [activeSkill, setActiveSkill] = useState<string>("html");

  const expertiseData = t("expertise");
  const activeData = expertiseData.skills.find((s: any) => s.id === activeSkill);

  return (
    <section id="expertise" className="relative min-h-screen py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-3 sm:mb-4 tracking-wider">
            {expertiseData.section}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {expertiseData.title}
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Section - Skill Icons */}
          <div className="lg:col-span-3">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill.id)}
                  className={`
                    group flex-shrink-0 p-6 rounded-2xl border-2 transition-all duration-300
                    ${
                      activeSkill === skill.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-background/80"
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`
                      w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl transition-transform duration-300
                      ${activeSkill === skill.id ? "scale-110" : "group-hover:scale-105"}
                    `}>
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className={`
                      text-xs sm:text-sm font-medium transition-colors duration-300 text-center
                      ${activeSkill === skill.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}
                    `}>
                      {skill.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - Skill Details */}
          <div className="lg:col-span-9">
            <div className="backdrop-blur-xl bg-background/50 border border-foreground/10 rounded-3xl p-6 sm:p-8 lg:p-10">
              {activeData && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Title and Experience Time */}
                  <div className="border-b border-border/50 pb-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                      {activeData.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">{activeData.experience}</span>
                    </div>
                  </div>

                  {/* Detail of Experience */}
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground/90">
                      {expertiseData.experienceLabel}
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {activeData.detail}
                    </p>
                  </div>

                  {/* Projects Done */}
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-foreground/90">
                      {expertiseData.projectsLabel}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeData.projects.map((project: any, index: number) => (
                        <div
                          key={index}
                          className="group p-4 sm:p-5 rounded-xl border border-border/50 bg-background/30 hover:bg-background/60 hover:border-primary/50 transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors duration-300">
                                {project.name}
                              </h5>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                              </p>
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
