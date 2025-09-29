import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const AboutSection = () => {
  const { t } = useLanguage();
  const swiperRef = useRef(null);

  const companies = [
    { name: "SGT", logo: "src/assets/logos/summitglobal-logo.png" },
    { name: "Infinix", logo: "src/assets/logos/infinix-logo.png" },
    { name: "Xclub", logo: "src/assets/logos/xclub-logo.png" },
    { name: "Xpark", logo: "src/assets/logos/xpark-logo.png" },
    { name: "2Sweet", logo: "src/assets/logos/2sweet-logo.svg" },
  ];

  // Duplicate companies for seamless loop effect
  const duplicatedCompanies = [...companies, ...companies];

  return (
      <section id="about" className="pt-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="w-full">
            {/* Company Logos Carousel */}
            <div className="mb-8 sm:mb-12 lg:mb-16 w-full overflow-hidden">
              <div className="">
                <Swiper
                    ref={swiperRef}
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView="auto"
                    loop={true}
                    autoplay={{
                      delay: 0,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: false,
                      reverseDirection: false,
                    }}
                    speed={5000}
                    allowTouchMove={false}
                    breakpoints={{
                      320: {
                        slidesPerView: 4,
                        spaceBetween: 100,
                      },
                      640: {
                        slidesPerView: 4,
                        spaceBetween: 150,
                      },
                      768: {
                        slidesPerView: 5,
                        spaceBetween: 180,
                      },
                      1024: {
                        slidesPerView: 6,
                        spaceBetween: 200,
                      },
                    }}
                    className="company-logos-swiper"
                >
                  {duplicatedCompanies.map((company, index) => (
                      <SwiperSlide key={`${company.name}-${index}`} className="!w-auto">
                        <div className="flex items-center justify-center py-4 group cursor-pointer">
                          <img
                              src={company.logo}
                              alt={`${company.name} logo`}
                              className="h-8 md:h-16 lg:h-24 w-auto filter grayscale opacity-60 transition-all duration-300 group-hover:filter-none group-hover:opacity-100 rounded-lg overflow-hidden"
                          />
                        </div>
                      </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Section Header */}
            <div className="text-left mb-6 sm:mb-8 lg:mb-12 max-w-6xl">
              <p className="text-xs sm:text-sm text-foreground/40 uppercase tracking-wider mb-4 sm:mb-6 lg:mb-8">
                {t("about.section")}
              </p>

              {/* Main Content */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-foreground leading-tight sm:leading-relaxed">
                  {t("about.title")}
                </h2>

                <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground/60 leading-relaxed max-w-4xl">
                  {t("about.description")}
                </p>

                {/* Current Job */}
                <div className="pt-3 sm:pt-4 lg:pt-6">
                  <div className="flex items-start sm:items-center space-x-2 text-foreground/60">
                    <p className="text-sm sm:text-base lg:text-lg">
                      {t("about.current_job")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .company-logos-swiper {
            overflow: visible !important;
          }

          .company-logos-swiper .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}</style>
      </section>
  );
};

export default AboutSection;