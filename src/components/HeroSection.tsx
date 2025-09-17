import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Target, Zap } from "lucide-react";

const HeroSection = () => {
  const floatingCards = [
    {
      icon: Lightbulb,
      title: "Why great UX starts with asking the right questions",
      description: "Effective design begins by understanding user needs and pain points through meaningful research and insights.",
      readTime: "Read time: 3"
    },
    {
      icon: Target,
      title: "Scaling design systems without the chaos",
      description: "Building consistent design systems requires careful planning and systematic approaches to maintain quality.",
      readTime: "Read time: 4"
    },
    {
      icon: Zap,
      title: "Leading design without losing the craft",
      description: "Balancing leadership responsibilities while staying connected to hands-on design work and creative process.",
      readTime: "Read time: 5"
    }
  ];

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent"></div>
              </div>
              <span className="text-foreground/60">Hi, I'm Anders!</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Anders Antonsen,</span>
              <br />
              visual designer who build a useful and eye pleasing design
            </h1>
            
            <Button 
              size="lg" 
              className="glow-effect hover:shadow-lg transition-all duration-300"
            >
              Scroll down to see the portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Floating Cards */}
          <div className="hidden lg:block relative">
            <div className="space-y-6">
              {floatingCards.map((card, index) => (
                <Card 
                  key={index}
                  className={`glass-card hover:glow-effect transition-all duration-500 cursor-pointer animate-float`}
                  style={{ animationDelay: `${index * 2}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <card.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-sm text-foreground/60 leading-relaxed">
                          {card.description}
                        </p>
                        <span className="text-xs text-primary">{card.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;