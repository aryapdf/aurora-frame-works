import vscodeIcon from "@/assets/tools/vscode-icon.png";
import reactIcon from "@/assets/tools/react-icon.png";
import vueIcon from "@/assets/tools/vue-icon.png";
import figmaIcon from "@/assets/tools/figma-icon.png";
import nuxtIcon from "@/assets/tools/nuxt-icon.png";
import gitIcon from "@/assets/tools/git-icon.png";

const ExperienceSection = () => {
  const tools = [
    { name: "VS Code", icon: vscodeIcon },
    { name: "React", icon: reactIcon },
    { name: "Vue.js", icon: vueIcon },
    { name: "Figma", icon: figmaIcon },
    { name: "Nuxt.js", icon: nuxtIcon },
    { name: "Git", icon: gitIcon }
  ];

  const experiences = [
    {
      title: "Frontend Developer Intern",
      company: "Local Web Agency",
      location: "Jakarta, Indonesia",
      period: "2022 — 2023"
    },
    {
      title: "Junior Frontend Developer",
      company: "Tech Startup",
      location: "Jakarta, Indonesia", 
      period: "2023 — 2024"
    },
    {
      title: "Frontend Engineer",
      company: "Summit Global Technology",
      location: "Jakarta, Indonesia",
      period: "2024 — Present"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Tool Icons */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={tool.name}
                className="w-16 h-16 md:w-20 md:h-20 glass-card rounded-2xl flex items-center justify-center hover:glow-effect transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={tool.icon} 
                  alt={tool.name}
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-primary font-medium tracking-wider">03 — EXPERIENCE</span>
            <div className="h-px bg-border flex-1"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Experience that shapes modern web solutions
          </h2>
          
          <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl">
            With dedication to continuous learning and hands-on experience in modern web development, 
            I specialize in creating responsive, user-centric applications using cutting-edge technologies 
            and frameworks in the Vue.js and React ecosystems.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-border/30 last:border-b-0 hover:bg-card/20 transition-all duration-300 rounded-lg px-4"
              style={{ animationDelay: `${(index + tools.length) * 0.1}s` }}
            >
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  {exp.title}
                </h3>
                <p className="text-foreground/60 text-sm md:text-base">
                  {exp.company} — {exp.location}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-8">
                <span className="text-primary font-medium text-lg tracking-wide">
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