import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = ["Front End Engineer", "Back End Engineer", "Linux Enthusiast", "Musician"];

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 30 : 50);

    return () => clearTimeout(timeout);
  }, [currentTextIndex, displayedText, isDeleting, texts]);

  return (
      <section className="min-h-screen pt-20 relative overflow-hidden flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-full space-y-8 animate-fade-in">
            {/* Profile Bubble */}
            <div className="inline-flex items-center space-x-3 glass-card px-4 py-2 rounded-full">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">AP</span>
              </div>
              <span className="text-foreground/80 text-sm">Hi, there!</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl font-bold leading-tight text-foreground max-w-full">
              Arya Pradana,<br />
              <span className="inline-block min-h-[1.2em]">
              {displayedText} <span className={"opacity-0 pointer-events-none"}>A</span>
              </span>
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