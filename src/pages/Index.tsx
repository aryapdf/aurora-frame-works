import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Jumbotron from "@/components/Jumbotron.tsx";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll configuration
    gsap.config({
      force3D: true,
    });

    ScrollTrigger.refresh();

    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

    function refreshPage() {
        const body = document.querySelector('body')
        body.style.opacity = '0'
        window.scrollTo(0, 0);

        setTimeout(() => body.style.opacity = '1' , 100)
    }
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            refreshPage();
        });

        window.addEventListener('load', () => {
            refreshPage();
        });
    }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Jumbotron />
      <PortfolioSection />
      <ExpertiseSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
