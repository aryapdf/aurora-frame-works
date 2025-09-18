const AboutSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-left mb-16">
            <p className="text-sm text-foreground/40 uppercase tracking-wider mb-8">
              01 — GET TO KNOW ME
            </p>
            
            {/* Main Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-relaxed">
                  With over 1+ years of experience in modern web development, I've 
                  worked with technologies like Vue.js, React, Nuxt.js, Next.js, Magento, 
                  REST API integration, Figma, Adobe XD, and Photoshop to create seamless 
                  user experiences.
                </h2>
                
                <p className="text-xl text-foreground/60 leading-relaxed">
                  I consider myself a dedicated and passionate front end engineer, 
                  specializing in modern frameworks, responsive design, and seamless 
                  API integrations with strong technical foundation in web development.
                </p>
              </div>

              {/* Current Job */}
              <div className="pt-8">
                <div className="flex items-center space-x-2 text-foreground/60">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p className="text-lg">
                    Currently working at Summit Global Technology (Indonesia).
                  </p>
                </div>
                <p className="text-foreground/40 ml-4 mt-2">
                  Official partner with Transsion Group (Infinix) includes Xpark E-Commerce, 
                  Xclub Social media, Karmaserve and FitHub. Based in Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;