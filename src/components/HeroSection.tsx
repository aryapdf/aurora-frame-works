import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-20 relative overflow-hidden flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl space-y-8 animate-fade-in">
          {/* Profile Bubble */}
          <div className="inline-flex items-center space-x-3 glass-card px-4 py-2 rounded-full">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">AA</span>
            </div>
            <span className="text-foreground/80 text-sm">Hi, thereeee!</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-foreground">
            Anders Antonsen,<br />
            visual designer who build a useful<br />
            and eye pleasing design
          </h1>
          
          {/* CTA */}
          <div className="pt-8">
            <button className="group flex items-center space-x-2 text-foreground/60 hover:text-primary transition-colors">
              <span>Scroll down to see the portfolio</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;