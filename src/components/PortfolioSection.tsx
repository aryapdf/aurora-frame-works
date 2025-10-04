import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUpRight, Grid3x3 } from "lucide-react";
import projectsData from "@/data/projects.json";
import useEmblaCarousel from "embla-carousel-react";
import {useLanguage} from "@/contexts/LanguageContext.tsx";

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFilterChanging, setIsFilterChanging] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const itemsPerPage = 6;
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(containerRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
    .from(headerRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    }, "-=0.6")
    .from(cardsRef.current?.children || [], {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    }, "-=0.4");
  }, { scope: sectionRef });

  const filters = ["All", "Fullstack", "Front-End", "Back-End"];
  const { t } = useLanguage();
  const projects = [...t("porto.projects")].reverse();

  // Featured projects (first 3)
  const featuredProjects = projects.slice(0, 3);

  const filteredProjects = activeFilter === "All"
      ? projects
      : projects.filter(project => project.category === activeFilter);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
    setDisplayedProjects(currentProjects);
  }, [isSheetOpen]);

  const handleFilterChange = async (filter) => {
    if (isFilterChanging) return;
    setIsFilterChanging(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setActiveFilter(filter);
    setCurrentPage(1);
    const newFilteredProjects = filter === "All"
        ? projects
        : projects.filter(project => project.category === filter);
    const newProjects = newFilteredProjects.slice(0, itemsPerPage);
    setDisplayedProjects(newProjects);
    setIsFilterChanging(false);
  };

  const handlePageChange = async (page) => {
    if (isPageChanging || page === currentPage) return;
    setIsPageChanging(true);
    const direction = page > currentPage ? "left" : "right";
    const projectGrid = document.querySelector('.sheet-project-grid') as HTMLElement;
    if (projectGrid) {
      projectGrid.style.transform = `translateX(${direction === "left" ? "-100%" : "100%"})`;
      projectGrid.style.opacity = '0';
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    const startIndex = (page - 1) * itemsPerPage;
    const newProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
    setDisplayedProjects(newProjects);
    setCurrentPage(page);
    if (projectGrid) {
      projectGrid.style.transition = 'none';
      projectGrid.style.transform = `translateX(${direction === "left" ? "100%" : "-100%"})`;
    }
    setTimeout(() => {
      if (projectGrid) {
        projectGrid.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        projectGrid.style.transform = 'translateX(0%)';
        projectGrid.style.opacity = '1';
      }
    }, 50);
    setTimeout(() => {
      setIsPageChanging(false);
    }, 300);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
      <section ref={sectionRef} id="projects" className="pt-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Blurred background container */}
          <div ref={containerRef} className="backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl p-8 sm:p-12 lg:p-16">
            {/* Section Header */}
            <div ref={headerRef} className="text-left mb-12">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs sm:text-sm text-foreground/40 uppercase tracking-wider mb-4">
                    {t('porto.section')}
                  </p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-foreground leading-relaxed font-bold">
                    {t('porto.title')}
                  </h2>
                </div>

                {/* View All Button */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex text-sm lg:text-lg border-none outline-none bg-transparent items-center gap-2 rounded-full px-6 hover:bg-transparent text-foreground/80 hover:text-foreground"
                    >
                      {/*<Grid3x3 className="w-4 h-4" />*/}
                      {t('porto.view_all')}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto flex flex-col">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="text-2xl">{t('porto.all_projects')}</SheetTitle>
                    </SheetHeader>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {filters.map((filter) => (
                          <Button
                              key={filter}
                              onClick={() => handleFilterChange(filter)}
                              disabled={isFilterChanging}
                              variant={activeFilter === filter ? "default" : "outline"}
                              size="sm"
                              className={`rounded-full px-4 ${
                                  activeFilter === filter
                                      ? "bg-primary text-primary-foreground"
                                      : "border-foreground/20 hover:bg-primary/10"
                              }`}
                          >
                            {filter}
                          </Button>
                      ))}
                    </div>

                    {/* Project Grid */}
                    <div className="relative mb-8 overflow-hidden flex-1">
                      <div
                          className="sheet-project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300"
                          style={{ transform: 'translateX(0%)', opacity: 1 }}
                      >
                        {isFilterChanging ? (
                            Array.from({ length: itemsPerPage }, (_, index) => (
                                <Card key={`loading-${index}`} className="glass-card overflow-hidden">
                                  <CardContent className="p-0">
                                    <div className="bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse" />
                                    <div className="p-4 space-y-2">
                                      <div className="h-4 bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse rounded w-3/4" />
                                      <div className="h-3 bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse rounded w-1/2" />
                                    </div>
                                  </CardContent>
                                </Card>
                            ))
                        ) : (
                            displayedProjects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="glass-card hover:glow-effect transition-all duration-300 group cursor-pointer overflow-hidden"
                                    onClick={() => handleProjectClick(project)}
                                >
                                  <CardContent className="flex flex-col p-0">
                                    <div className="relative w-full aspect-video overflow-hidden bg-muted">
                                      <img
                                          src={project.image || "src/assets/personal-logo-full.png"}
                                          alt={project.title}
                                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                    <div className="p-4">
                                      <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex-1">
                                          {project.title}
                                        </h3>
                                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center ml-2 group-hover:scale-110 transition-transform">
                                          <ArrowUpRight className="w-3.5 h-3.5 text-primary-foreground" />
                                        </div>
                                      </div>
                                      <p className="text-foreground/60 text-xs">{project.subcategory}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                            ))
                        )}
                      </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                  onClick={() => handlePageChange(currentPage - 1)}
                                  className={`${
                                      currentPage === 1 || isPageChanging
                                          ? "pointer-events-none opacity-50"
                                          : "cursor-pointer hover:bg-primary/10"
                                  }`}
                              />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                      onClick={() => handlePageChange(page)}
                                      isActive={currentPage === page}
                                      className={`cursor-pointer ${
                                          isPageChanging ? "pointer-events-none opacity-50" : "hover:bg-primary/10"
                                      }`}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                              <PaginationNext
                                  onClick={() => handlePageChange(currentPage + 1)}
                                  className={`${
                                      currentPage === totalPages || isPageChanging
                                          ? "pointer-events-none opacity-50"
                                          : "cursor-pointer hover:bg-primary/10"
                                  }`}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Featured Projects - Large Cards */}
            <div ref={cardsRef} className="grid grid-cols-1 gap-6 lg:gap-8">
              {featuredProjects.map((project) => (
                  <Card
                      key={project.id}
                      className="glass-card hover:glow-effect transition-all duration-500 group cursor-pointer overflow-hidden h-full"
                      onClick={() => handleProjectClick(project)}
                  >
                    <CardContent className="p-0 h-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                        {/* Left: Project Info */}
                        <div className="p-8 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                                {project.title}
                              </h3>
                              <p className="text-foreground/60 text-base lg:text-lg mb-4">
                                {project.subcategory}
                              </p>
                              <p className="text-foreground/70 leading-relaxed">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Project Meta */}
                          <div className="flex items-center gap-8 mt-8 text-sm">
                            {project.country && (
                                <div>
                                  <p className="text-primary font-medium text-lg">{project.country}</p>
                                  <p className="text-foreground/40">Country</p>
                                </div>
                            )}
                            {project.duration && (
                                <div>
                                  <p className="text-primary font-medium text-lg">{project.duration}</p>
                                  <p className="text-foreground/40">Time of working</p>
                                </div>
                            )}
                            <div>
                              <p className="text-primary font-medium text-lg">{project.year}</p>
                              <p className="text-foreground/40">Years</p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Project Image */}
                        <div className="relative aspect-[4/3] lg:h-full overflow-hidden order-1 lg:order-2 bg-muted">
                          <img
                              src={project.image || 'src/assets/personal-logo-full.png'}
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>

          {/* Project Detail Modal */}
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-foreground/10">
              {selectedProject && (
                  <>
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="text-2xl font-bold text-foreground">
                        {selectedProject.title}
                      </DialogTitle>
                      <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {selectedProject.category}
                    </span>
                        <span className="text-foreground/60">•</span>
                        <span className="text-foreground/60">{selectedProject.year}</span>
                      </div>
                    </DialogHeader>

                    <div className="space-y-6 mt-6">

                      {selectedProject.image && (
                          <div className="aspect-[12/8] rounded-lg overflow-hidden bg-foreground/5">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                          </div>
                      )}


                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground mb-3">Project Overview</h4>
                            <p className="text-foreground/70 leading-relaxed">
                              {selectedProject.description}
                            </p>
                          </div>

                          {selectedProject.technologies && (
                              <div>
                                <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProject.technologies.map((tech) => (
                                      <span
                                          key={tech}
                                          className="px-3 py-1 text-xs rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 hover:glow-effect hover:border-transparent hover:bg-transparent hover:text-foreground "
                                      >
                                        {tech}
                                      </span>
                                  ))}
                                </div>
                              </div>
                          )}

                          {selectedProject.links && (
                              <div>
                                <h4 className="text-lg font-semibold text-foreground mb-3">Links</h4>
                                <div className="flex flex-col gap-2">
                                  {selectedProject.links.map((tech) => (
                                      <span
                                          key={tech}
                                          className="px-3 py-1 text-xs rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 hover:glow-effect hover:border-transparent hover:bg-transparent hover:text-foreground cursor-pointer"
                                          onClick={() => window.open(tech, '_blank')}
                                      >
                                        {tech}
                                      </span>
                                  ))}
                                </div>
                              </div>
                          )}

                        </div>

                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            {selectedProject.country && (
                                <div>
                                  <p className="text-primary font-medium text-lg mb-1">{selectedProject.country}</p>
                                  <p className="text-foreground/40 text-sm">Country</p>
                                </div>
                            )}
                            {selectedProject.duration && (
                                <div>
                                  <p className="text-primary font-medium text-lg mb-1">{selectedProject.duration}</p>
                                  <p className="text-foreground/40 text-sm">Duration</p>
                                </div>
                            )}
                            <div>
                              <p className="text-primary font-medium text-lg mb-1">{selectedProject.year}</p>
                              <p className="text-foreground/40 text-sm">Year</p>
                            </div>
                            <div>
                              <p className="text-primary font-medium text-lg mb-1">{selectedProject.category}</p>
                              <p className="text-foreground/40 text-sm">Category</p>
                            </div>
                          </div>

                          {selectedProject.clientTestimonial && (
                              <div>
                                <h4 className="text-lg font-semibold text-foreground mb-3"></h4>
                                <blockquote className="italic text-foreground/70 border-l-4 border-primary pl-4 bg-foreground/5 p-4 rounded">
                                  "{selectedProject.clientTestimonial}"
                                </blockquote>
                              </div>
                          )}
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