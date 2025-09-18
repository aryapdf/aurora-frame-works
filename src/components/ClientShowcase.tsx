const ClientShowcase = () => {
  const clients = [
    { name: "Google", logo: "Google" },
    { name: "YouTube", logo: "YouTube" },
    { name: "Chevrolet", logo: "CHEVROLET" },
    { name: "Slack", logo: "slack" },
    { name: "Spotify", logo: "Spotify" },
    { name: "HBO", logo: "HBO" }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Client Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {clients.map((client, index) => (
            <div 
              key={client.name}
              className="flex items-center justify-center p-4 glass-card hover:glow-effect transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-foreground/60 font-medium text-sm tracking-wide">
                {client.logo}
              </span>
            </div>
          ))}
        </div>

        {/* Experience Statement */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="text-6xl font-bold text-primary mb-4">1+</div>
          <p className="text-xl text-foreground/80 leading-relaxed">
            With 1+ years of experience in modern web development, I've worked with technologies like Vue.js, React, Nuxt.js, and Next.js to create engaging user experiences.
          </p>
          <p className="text-foreground/60 leading-relaxed">
            I consider myself a dedicated and passionate front end engineer, specializing in modern frameworks, responsive design, and seamless API integrations.
          </p>
          <div className="pt-8">
            <p className="text-sm text-foreground/40">
              *Currently exploring new opportunities.<br />
              Based in Indonesia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;