import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUpRight } from "lucide-react";
import moonwaveImage from "@/assets/moonwave-project.jpg";
import kraftqImage from "@/assets/kraftq-project.jpg";
import urbanexImage from "@/assets/urbanex-project.jpg";

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const itemsPerPage = 6;

  const projects = [
    // Landing Page projects
    {
      id: 1,
      title: "Urbanex+ Architecture Service",
      description: "A clean and modern landing page designed for Urbanex+, showcasing architectural services with bold visuals, clear structure, and a user-focused layout that highlights expertise and inspires trust.",
      category: "Landing Page",
      subcategory: "Website/Landing Page",
      country: "Australia",
      duration: "3 months",
      year: "2025",
      image: urbanexImage,
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      clientTestimonial: "Outstanding work that perfectly captured our vision and brand identity."
    },
    {
      id: 2,
      title: "Coffee Shop Landing Page",
      description: "A warm and inviting landing page for a premium coffee shop, featuring elegant typography, beautiful imagery, and seamless user experience.",
      category: "Landing Page",
      subcategory: "Website/Landing Page",
      country: "USA",
      duration: "2 months",
      year: "2024",
      image: kraftqImage,
      technologies: ["Vue.js", "SCSS", "AOS"],
      clientTestimonial: "Increased our online orders by 150% within the first month."
    },
    {
      id: 3,
      title: "Fitness Studio Landing",
      description: "Modern, energetic landing page for a fitness studio with interactive elements and booking integration.",
      category: "Landing Page",
      subcategory: "Website/Landing Page", 
      country: "Canada",
      duration: "1.5 months",
      year: "2024",
      image: urbanexImage,
      technologies: ["Next.js", "Tailwind CSS", "Stripe"],
      clientTestimonial: "Professional design that boosted our membership sign-ups significantly."
    },
    {
      id: 4,
      title: "Tech Startup Landing",
      description: "Sleek and professional landing page for a B2B tech startup, focusing on conversion optimization.",
      category: "Landing Page",
      subcategory: "Website/Landing Page",
      country: "UK",
      duration: "2 months",
      year: "2024",
      image: moonwaveImage,
      technologies: ["React", "TypeScript", "Analytics"],
      clientTestimonial: "Achieved 40% higher conversion rate compared to our previous site."
    },
    {
      id: 5,
      title: "Restaurant Chain Landing",
      description: "Multi-location restaurant chain landing page with location finder and online ordering system.",
      category: "Landing Page", 
      subcategory: "Website/Landing Page",
      country: "Spain",
      duration: "4 months",
      year: "2024",
      image: kraftqImage,
      technologies: ["React", "Node.js", "Google Maps API"],
      clientTestimonial: "Streamlined our online presence across all locations perfectly."
    },
    {
      id: 6,
      title: "Medical Clinic Landing",
      description: "Professional healthcare landing page with appointment booking and patient portal integration.",
      category: "Landing Page",
      subcategory: "Website/Landing Page",
      country: "Germany",
      duration: "3 months", 
      year: "2024",
      image: urbanexImage,
      technologies: ["React", "Firebase", "HIPAA Compliance"],
      clientTestimonial: "Significantly improved patient engagement and booking efficiency."
    },

    // App Design projects  
    {
      id: 7,
      title: "MoonWave Crypto Investment",
      description: "A sleek, intuitive mobile app designed for smart crypto investing. MoonWave helps users track their portfolio, explore real-time market data, and make informed decisions.",
      category: "App Design",
      subcategory: "Mobile App",
      country: "Germany", 
      duration: "2 months",
      year: "2025",
      image: moonwaveImage,
      technologies: ["React Native", "Redux", "Crypto APIs"],
      clientTestimonial: "Exceptional UI/UX that made complex crypto data accessible to our users."
    },
    {
      id: 8,
      title: "Meditation & Wellness App",
      description: "Calming and intuitive meditation app with guided sessions, progress tracking, and personalized recommendations.",
      category: "App Design",
      subcategory: "Mobile App",
      country: "USA",
      duration: "3 months",
      year: "2024",
      image: kraftqImage,
      technologies: ["Flutter", "Firebase", "Audio Streaming"],
      clientTestimonial: "Beautiful, peaceful design that perfectly matches our brand values."
    },
    {
      id: 9,
      title: "Food Delivery App",
      description: "Modern food delivery app with real-time tracking, multiple payment options, and restaurant management.",
      category: "App Design",
      subcategory: "Mobile App",
      country: "France",
      duration: "4 months",
      year: "2024", 
      image: urbanexImage,
      technologies: ["React Native", "Node.js", "Payment Gateway"],
      clientTestimonial: "Outstanding app that increased our delivery orders by 300%."
    },
    {
      id: 10,
      title: "Fitness Tracking App",
      description: "Comprehensive fitness app with workout planning, nutrition tracking, and social features.",
      category: "App Design",
      subcategory: "Mobile App",
      country: "Australia",
      duration: "5 months",
      year: "2024",
      image: moonwaveImage,
      technologies: ["Swift", "HealthKit", "Core Data"],
      clientTestimonial: "Incredible attention to detail and user experience design."
    },
    {
      id: 11,
      title: "Language Learning App",
      description: "Interactive language learning app with gamification, speech recognition, and progress tracking.",
      category: "App Design",
      subcategory: "Mobile App",
      country: "Japan",
      duration: "6 months",
      year: "2024",
      image: kraftqImage,
      technologies: ["React Native", "AI/ML", "Speech API"],
      clientTestimonial: "Engaging design that makes learning languages fun and addictive."
    },
    {
      id: 12,
      title: "Banking Mobile App",
      description: "Secure and user-friendly banking app with advanced features and biometric authentication.",
      category: "App Design",
      subcategory: "Mobile App",
      country: "Singapore",
      duration: "8 months",
      year: "2024",
      image: urbanexImage,
      technologies: ["Flutter", "Biometrics", "Encryption"],
      clientTestimonial: "Professional design that instills trust and confidence in our users."
    },

    // SaaS Product projects
    {
      id: 13,
      title: "Project Management SaaS",
      description: "Comprehensive project management platform with team collaboration, time tracking, and reporting features.",
      category: "SaaS Product",
      subcategory: "Web Application",
      country: "USA",
      duration: "6 months",
      year: "2024",
      image: moonwaveImage,
      technologies: ["React", "Node.js", "PostgreSQL"],
      clientTestimonial: "Transformed how our team manages projects and collaborates."
    },
    {
      id: 14,
      title: "Customer Support SaaS",
      description: "Advanced customer support platform with ticketing system, live chat, and knowledge base.",
      category: "SaaS Product",
      subcategory: "Web Application", 
      country: "Canada",
      duration: "5 months",
      year: "2024",
      image: kraftqImage,
      technologies: ["Vue.js", "Socket.io", "MongoDB"],
      clientTestimonial: "Dramatically improved our customer satisfaction scores."
    },
    {
      id: 15,
      title: "Email Marketing SaaS",
      description: "Powerful email marketing platform with automation, analytics, and A/B testing capabilities.",
      category: "SaaS Product",
      subcategory: "Web Application",
      country: "UK",
      duration: "7 months",
      year: "2024",
      image: urbanexImage,
      technologies: ["React", "Python", "Redis"],
      clientTestimonial: "Excellent platform that boosted our email campaign performance."
    },
    {
      id: 16,
      title: "Inventory Management SaaS",
      description: "Smart inventory management system with real-time tracking, forecasting, and supplier integration.",
      category: "SaaS Product",
      subcategory: "Web Application",
      country: "Germany",
      duration: "8 months", 
      year: "2024",
      image: moonwaveImage,
      technologies: ["Angular", "Java Spring", "MySQL"],
      clientTestimonial: "Streamlined our entire supply chain management process."
    },
    {
      id: 17,
      title: "HR Management SaaS",
      description: "Complete HR management solution with employee onboarding, payroll, and performance tracking.",
      category: "SaaS Product",
      subcategory: "Web Application",
      country: "Netherlands",
      duration: "9 months",
      year: "2024",
      image: kraftqImage,
      technologies: ["React", "Django", "PostgreSQL"],
      clientTestimonial: "Revolutionary HR platform that simplified all our processes."
    },
    {
      id: 18,
      title: "Social Media Management SaaS",
      description: "All-in-one social media management platform with scheduling, analytics, and content creation tools.",
      category: "SaaS Product",
      subcategory: "Web Application",
      country: "Australia",
      duration: "6 months",
      year: "2024",
      image: urbanexImage,
      technologies: ["React", "Node.js", "Social Media APIs"],
      clientTestimonial: "Amazing tool that increased our social media engagement by 250%."
    },

    // Dashboard projects
    {
      id: 19,
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with customizable widgets, data visualization, and reporting features.",
      category: "Dashboard",
      subcategory: "Data Visualization",
      country: "USA",
      duration: "4 months",
      year: "2024", 
      image: moonwaveImage,
      technologies: ["React", "D3.js", "WebSocket"],
      clientTestimonial: "Incredibly insightful dashboard that transformed our decision-making."
    },
    {
      id: 20,
      title: "E-commerce Admin Dashboard",
      description: "Comprehensive admin dashboard for e-commerce management with sales tracking and inventory control.",
      category: "Dashboard",
      subcategory: "Admin Panel",
      country: "UK",
      duration: "5 months",
      year: "2024",
      image: kraftqImage,
      technologies: ["Vue.js", "Chart.js", "Express"],
      clientTestimonial: "Perfect admin panel that simplified our e-commerce operations."
    },
    {
      id: 21,
      title: "Financial Dashboard",
      description: "Advanced financial dashboard with portfolio tracking, risk analysis, and market data integration.",
      category: "Dashboard",
      subcategory: "Financial Analytics",
      country: "Switzerland",
      duration: "6 months",
      year: "2024",
      image: urbanexImage,
      technologies: ["React", "Python", "Financial APIs"],
      clientTestimonial: "Outstanding dashboard that gives us complete financial oversight."
    },
    {
      id: 22,
      title: "Healthcare Dashboard",
      description: "Medical dashboard for patient management, appointment scheduling, and health analytics.",
      category: "Dashboard",
      subcategory: "Healthcare Analytics",
      country: "Canada",
      duration: "7 months",
      year: "2024",
      image: moonwaveImage,
      technologies: ["React", "FHIR", "HL7"],
      clientTestimonial: "Exceptional healthcare dashboard that improved our patient care."
    },
    {
      id: 23,
      title: "Marketing Dashboard",
      description: "Marketing performance dashboard with campaign tracking, ROI analysis, and audience insights.",
      category: "Dashboard",
      subcategory: "Marketing Analytics",
      country: "Germany",
      duration: "4 months",
      year: "2024",
      image: kraftqImage,
      technologies: ["Angular", "Google Analytics API", "Charts"],
      clientTestimonial: "Game-changing dashboard for our marketing team's performance."
    },
    {
      id: 24,
      title: "KraftQ Brand Guidelines",
      description: "Comprehensive brand identity dashboard for managing brand assets, guidelines, and consistency.",
      category: "Dashboard",
      subcategory: "Brand Management",
      country: "Denmark",
      duration: "3 months",
      year: "2025",
      image: urbanexImage,
      technologies: ["React", "AWS S3", "Brand APIs"],
      clientTestimonial: "Perfect solution for maintaining brand consistency across teams."
    }
  ];

  const filters = ["All", "Landing Page", "App Design", "SaaS Product", "Dashboard"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section id="projects" className="pt-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-foreground/40 uppercase tracking-wider mb-4">
            02 — PORTFOLIO
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Digital Product Showcases
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "bg-transparent border border-foreground/20 text-foreground hover:bg-primary/10"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {currentProjects.map((project) => (
            <Card 
              key={project.id}
              className="glass-card hover:glow-effect transition-all duration-500 group cursor-pointer overflow-hidden"
              onClick={() => setSelectedProject(project)}
            >
              <CardContent className="p-0">
                {/* Project Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex-1">
                      {project.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-3 group-hover:scale-110 transition-transform duration-300">
                      <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <p className="text-foreground/60 text-sm mb-3">
                    {project.subcategory}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Project Detail Modal */}
        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Project Image */}
                  <div className="aspect-[16/10] rounded-lg overflow-hidden">
                    <img 
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Project Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Project Overview</h4>
                        <p className="text-foreground/70 leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech: string) => (
                            <span 
                              key={tech}
                              className="px-3 py-1 text-xs rounded-full glass-card text-foreground/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-primary font-medium text-lg mb-1">
                            {selectedProject.country}
                          </p>
                          <p className="text-foreground/40 text-sm">
                            Country
                          </p>
                        </div>
                        <div>
                          <p className="text-primary font-medium text-lg mb-1">
                            {selectedProject.duration}
                          </p>
                          <p className="text-foreground/40 text-sm">
                            Duration
                          </p>
                        </div>
                        <div>
                          <p className="text-primary font-medium text-lg mb-1">
                            {selectedProject.year}
                          </p>
                          <p className="text-foreground/40 text-sm">
                            Year
                          </p>
                        </div>
                        <div>
                          <p className="text-primary font-medium text-lg mb-1">
                            {selectedProject.category}
                          </p>
                          <p className="text-foreground/40 text-sm">
                            Category
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Client Testimonial</h4>
                        <blockquote className="italic text-foreground/70 border-l-4 border-primary pl-4">
                          "{selectedProject.clientTestimonial}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PortfolioSection;