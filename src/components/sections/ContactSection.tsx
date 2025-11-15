import { useLanguage } from "@/context/GlobalContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Mail, MessageCircle, Send, Github, Linkedin } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "+=50%",
        scrub: 1,
        toggleActions: "play none none reverse",
        // markers: true,
      },
    });

    tl.from(headerRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(cardsRef.current, {
      y: 50,
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    }, "-=0.4");
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleEmailClick = () => {
    window.open("mailto:aryaagnipradana@gmail.com", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/6281368899879", "_blank");
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/aryapdf", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://linkedin.com/in/aryaagnipradana", "_blank");
  };

  return (
      <section ref={sectionRef} id="contact" className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div ref={headerRef} className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
              <div className="h-px bg-border flex-1 max-w-24"></div>
              <span className="text-sm text-foreground/40 uppercase tracking-wider ">{t("contact.section")}</span>
              <div className="h-px bg-border flex-1 max-w-24"></div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4 leading-tight">
              {t("contact.title")}
            </h2>

            <p className="text-sm sm:text-base text-foreground/60 mb-8 sm:mb-12">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* Contact Content */}
          <div className="max-w-6xl mx-auto">
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 sm:gap-6">
              {/* Email Card */}
              <div className="flex-1 glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:glow-effect transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  {t("contact.email")}
                </h4>
                <p className="text-foreground/60 text-sm sm:text-base mb-4">
                  aryaagnipradana@gmail.com
                </p>
                <Button
                    variant="ghost"
                    onClick={handleEmailClick}
                    className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                >
                  {t("contact.mail_me")} →
                </Button>
              </div>

              {/* WhatsApp Card */}
              <div className="flex-1 glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:glow-effect transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  {t("contact.whatsapp")}
                </h4>
                <p className="text-foreground/60 text-sm sm:text-base mb-4">
                  +62 813 6889 9879
                </p>
                <Button
                    variant="ghost"
                    onClick={handleWhatsAppClick}
                    className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                >
                  {t("contact.text_me")} →
                </Button>
              </div>

              {/* GitHub Card */}
              <div className="flex-1 glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:glow-effect transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Github className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  GitHub
                </h4>
                <p className="text-foreground/60 text-sm sm:text-base mb-4">
                  View my projects
                </p>
                <Button
                    variant="ghost"
                    onClick={handleGitHubClick}
                    className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                >
                  Visit Profile →
                </Button>
              </div>

              {/* LinkedIn Card */}
              <div className="flex-1 glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:glow-effect transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Linkedin className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  LinkedIn
                </h4>
                <p className="text-foreground/60 text-sm sm:text-base mb-4">
                  Connect with me
                </p>
                <Button
                    variant="ghost"
                    onClick={handleLinkedInClick}
                    className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                >
                  Connect →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ContactSection;