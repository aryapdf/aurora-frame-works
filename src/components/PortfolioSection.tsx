import { Card, CardContent } from "@/components/ui/card";
import moonwaveImage from "@/assets/moonwave-project.jpg";
import kraftqImage from "@/assets/kraftq-project.jpg";
import urbanexImage from "@/assets/urbanex-project.jpg";

const PortfolioSection = () => {
  const projects = [
    {
      title: "MoonWave - Crypto Investment Mobile Apps",
      description: "A sleek, intuitive mobile app designed for smart crypto investing. MoonWave helps users track their portfolio, explore real-time market data, and make informed decisions, all wrapped in a clean iOS, user-first experience.",
      country: "Germany",
      duration: "2 months",
      year: "2025",
      image: moonwaveImage,
      categories: ["Mobile App", "Fintech", "UI/UX"]
    },
    {
      title: "KraftQ - Creative Agency Logo and Brand Guideline",
      description: "A bold and modern visual identity crafted for KraftQ, a forward-thinking creative agency. The project included a dynamic logo system and comprehensive brand guidelines to ensure consistency across digital.",
      country: "Denmark", 
      duration: "1 month",
      year: "2025",
      image: kraftqImage,
      categories: ["Branding", "Logo Design", "Guidelines"]
    },
    {
      title: "Urbanex+ - Architecture Service Landing Page",
      description: "A clean and modern landing page designed for Urbanex+, showcasing architectural services with bold visuals, clear structure, and a user-focused layout that highlights expertise and inspires trust.",
      country: "Australia",
      duration: "3 months", 
      year: "2025",
      image: urbanexImage,
      categories: ["Web Design", "Architecture", "Landing Page"]
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-foreground/40 uppercase tracking-wider mb-4">
            02 — LATEST PROJECT
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            A glimpse into my latest work
          </h2>
        </div>

        {/* Project Cards */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="glass-card p-8 hover:glow-effect transition-all duration-500 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Project Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-primary font-medium text-lg mb-1">
                          {project.country}
                        </p>
                        <p className="text-foreground/40 text-sm">
                          Country
                        </p>
                      </div>
                      <div>
                        <p className="text-primary font-medium text-lg mb-1">
                          {project.duration}
                        </p>
                        <p className="text-foreground/40 text-sm">
                          Time of working
                        </p>
                      </div>
                      <div>
                        <p className="text-primary font-medium text-lg mb-1">
                          {project.year}
                        </p>
                        <p className="text-foreground/40 text-sm">
                          Years
                        </p>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                      {project.categories.map((category) => (
                        <span 
                          key={category}
                          className="px-3 py-1 text-xs rounded-full glass-card text-foreground/60"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="relative">
                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 glass-card hover:glow-effect transition-all duration-300 text-foreground hover:text-primary">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;