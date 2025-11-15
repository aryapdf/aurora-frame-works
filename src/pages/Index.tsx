import Header from "@/components/layout/Header.tsx";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection.tsx";
import ExpertiseSection from "@/components/sections/ExpertiseSection.tsx";
import ExperienceSection from "@/components/sections/ExperienceSection.tsx";
import ContactSection from "@/components/sections/ContactSection.tsx";
import Footer from "@/components/layout/Footer.tsx";
import {useEffect, useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useAssetPreloader} from "@/hooks/useAssetPreloader.ts";
import Preloader from "@/components/Preloader.tsx";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
    const [showContent, setShowContent] = useState(false)
    const { loading, progress } = useAssetPreloader({
        images: [
            "/assets/icon/next-js-icon.png",
            "/assets/icon/vue-icon.png",
            "/assets/icon/shadcn-ui-icon.png",
            "/assets/icon/magento-icon.png",
            "/assets/icon/bracket-icon.png"
        ]
    })

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
        <div className="relative flex flex-col w-screen min-h-screen" >
            <Preloader
                progress={progress}
                onComplete={() => setShowContent(true)}
            />
            {
                showContent && (
                    <div
                        className="min-h-screen"
                        style={{
                            opacity: loading ? 0 : 1
                        }}
                    >
                        <Header/>
                        <HeroSection/>
                        <AboutSection/>
                        <PortfolioSection/>
                        <ExpertiseSection/>
                        <ExperienceSection/>
                        <ContactSection/>
                        <Footer/>
                    </div>
                )
            }
        </div>

    );
};

export default Index;