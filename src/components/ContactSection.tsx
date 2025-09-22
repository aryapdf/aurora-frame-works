import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Send } from "lucide-react";

const ContactSection = () => {
  const { t } = useLanguage();

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

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
            <div className="h-px bg-border flex-1 max-w-24"></div>
            <span className="text-xs sm:text-sm text-primary font-medium tracking-wider">{t("contact.section")}</span>
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
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Talk to me */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8">
              {t("contact.talk_to_me")}
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Email Card */}
              <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:glow-effect transition-all duration-300">
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
              <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:glow-effect transition-all duration-300">
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
            </div>
          </div>

          {/* Write me your project */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8">
              {t("contact.write_project")}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  {t("contact.form.name")}
                </label>
                <Input 
                  placeholder={t("contact.form.name_placeholder")}
                  required
                  className="bg-card/50 border-border/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  {t("contact.form.email")}
                </label>
                <Input 
                  type="email"
                  placeholder={t("contact.form.email_placeholder")}
                  required
                  className="bg-card/50 border-border/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  {t("contact.form.subject")}
                </label>
                <Input 
                  placeholder={t("contact.form.subject_placeholder")}
                  required
                  className="bg-card/50 border-border/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-2">
                  {t("contact.form.project")}
                </label>
                <Textarea 
                  placeholder={t("contact.form.project_placeholder")}
                  required
                  rows={6}
                  className="bg-card/50 border-border/50 resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                {t("contact.form.send")}
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;