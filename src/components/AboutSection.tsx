const AboutSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm text-foreground/40 uppercase tracking-wider mb-4">
              01 — ABOUT ME
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nice to meet you!
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Personal Info */}
            <div className="space-y-8">
              <div className="glass-card p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Arya Agni Pradana Firdaus
                  </h3>
                  <p className="text-primary font-medium text-lg mb-4">
                    Front End Engineer
                  </p>
                  <div className="flex items-center space-x-4 text-foreground/60">
                    <span>📍 Based in Indonesia</span>
                    <span>•</span>
                    <span>💼 1+ Years Experience</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-foreground/10">
                  <p className="text-foreground/40 text-sm mb-2">Also known as</p>
                  <p className="text-foreground font-medium">Arya Pradana</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {['Vue.js', 'React', 'Nuxt.js', 'Next.js', 'Magento', 'REST API', 'Figma', 'Adobe XD'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs rounded-full glass-card text-foreground/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - About Description */}
            <div className="space-y-6">
              <div className="glass-card p-8">
                <h4 className="text-xl font-semibold text-foreground mb-6">My Story</h4>
                <div className="space-y-4 text-foreground/70 leading-relaxed">
                  <p>
                    Front End Engineer with 1+ years of experience in Vue/React ecosystems, 
                    specializing in Nuxt.js and Next.js frameworks. I'm passionate about 
                    creating seamless user experiences and bringing designs to life.
                  </p>
                  <p>
                    Proficient in Magento development, REST API integration, and object-oriented 
                    programming. My daily workflow includes design tools like Figma, Adobe XD, 
                    and Photoshop for precise UI/UX implementation.
                  </p>
                  <p>
                    As a Linux enthusiast with a strong technical foundation in modern web 
                    development, I'm always exploring new technologies and best practices 
                    to deliver exceptional digital solutions.
                  </p>
                </div>
              </div>

              {/* Current Focus */}
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Currently</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-foreground/70">Building modern web applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-foreground/70">Exploring new frontend frameworks</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-foreground/70">Open to exciting opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;