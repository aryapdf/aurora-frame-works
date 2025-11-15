import Header from "@/components/layout/Header.tsx";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection.tsx";
import ExpertiseSection from "@/components/sections/ExpertiseSection.tsx";
import ExperienceSection from "@/components/sections/ExperienceSection.tsx";
import ContactSection from "@/components/sections/ContactSection.tsx";
import Footer from "@/components/layout/Footer.tsx";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    useEffect(() => {
        gsap.config({ force3D: true });
        ScrollTrigger.refresh();
        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    useEffect(() => {
        const refreshPage = () => {
            const body = document.querySelector('body');
            if (body) {
                body.style.opacity = '0';
                window.scrollTo(0, 0);
                setTimeout(() => body.style.opacity = '1', 100);
            }
        };

        window.addEventListener('beforeunload', refreshPage);
        window.addEventListener('load', refreshPage);

        return () => {
            window.removeEventListener('beforeunload', refreshPage);
            window.removeEventListener('load', refreshPage);
        };
    }, []);

    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <AboutSection />
            <PortfolioSection />
            <ExpertiseSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Index;