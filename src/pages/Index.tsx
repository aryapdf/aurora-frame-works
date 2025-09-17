import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientShowcase from "@/components/ClientShowcase";
import PortfolioSection from "@/components/PortfolioSection";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ClientShowcase />
      <PortfolioSection />
      <FAQSection />
      <Newsletter />
    </div>
  );
};

export default Index;
