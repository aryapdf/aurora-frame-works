import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoDark from '@/assets/personal-logo-dark.png';
import logoWhite from '@/assets/personal-logo-light.png';

gsap.registerPlugin(ScrollTrigger);
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { ArrowUpRight, Grid3x3 } from "lucide-react";
import {useLanguage, useTheme} from "@/context/GlobalContext.tsx";


const PortfolioSection = () => {
  const {theme} = useTheme();

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
        start: "top 75%",
        end: "+=100%",
        scrub: 1,
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
      duration: 0.4,
    }, "-=0.8")
    .from(cardsRef.current || [], {
      y: 60,
      opacity: 0,
      duration: 0.4,
    }, "-=0.6");
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
  }, [currentPage, activeFilter, isSheetOpen]);

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
      projectGrid.style.opacity = '1';
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
      <section ref={sectionRef} id="projects" className="relative" style={{ paddingTop: 'clamp(5rem, 10vh, 6rem)' }}>
        <div className="container mx-auto" style={{ paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', paddingRight: 'clamp(1rem, 3vw, 1.5rem)' }}>
          <div ref={containerRef} className="backdrop-blur-xl bg-background/30 border border-foreground/10 rounded-3xl" style={{ padding: 'clamp(2rem, 6vw, 4rem)',  boxShadow: "0 8px 32px 0 rgba(0, 200, 255, 0.1)", }}>
            {/* Section Header */}
            <div ref={headerRef} className="text-left" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
              <div className="flex items-start justify-between" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                <div>
                  <p className="text-foreground/40 uppercase tracking-wider" style={{ 
                    fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                    marginBottom: 'clamp(1rem, 2vw, 1rem)'
                  }}>
                    {t('porto.section')}
                  </p>
                  <h2 className="text-foreground leading-relaxed font-bold" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
                    {t('porto.title')}
                  </h2>
                </div>

                {/* View All Button */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex border-none outline-none bg-transparent items-center rounded-full hover:bg-transparent text-foreground/80 hover:text-foreground"
                        style={{ 
                          fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                          gap: 'clamp(0.5rem, 1vw, 0.75rem)',
                          padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)'
                        }}
                    >
                      {t('porto.view_all')}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto flex flex-col">
                    <SheetHeader style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                      <SheetTitle style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>{t('porto.all_projects')}</SheetTitle>
                    </SheetHeader>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                      {filters.map((filter) => (
                          <Button
                              key={filter}
                              onClick={() => handleFilterChange(filter)}
                              disabled={isFilterChanging}
                              variant={activeFilter === filter ? "default" : "outline"}
                              size="sm"
                              className={`rounded-full ${
                                  activeFilter === filter
                                      ? "bg-primary text-primary-foreground"
                                      : "border-foreground/20 hover:bg-primary/10"
                              }`}
                              style={{ 
                                padding: 'clamp(0.375rem, 1vw, 0.5rem) clamp(1rem, 2vw, 1.25rem)',
                                fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)'
                              }}
                          >
                            {filter}
                          </Button>
                      ))}
                    </div>

                    {/* Project Grid */}
                    <div className="relative overflow-hidden flex-1" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                      <div
                          className="sheet-project-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300"
                          style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}
                      >
                        {isFilterChanging ? (
                            Array.from({length: itemsPerPage}, (_, index) => (
                                <Card key={`loading-${index}`} className="glass-card overflow-hidden">
                                  <CardContent className="p-0">
                                    <div
                                        className="bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse"/>
                                    <div style={{ padding: 'clamp(1rem, 2vw, 1.25rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                                      <div
                                          className="bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse rounded"
                                          style={{ height: 'clamp(1rem, 2vw, 1.25rem)', width: '75%' }}/>
                                      <div
                                          className="bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse rounded"
                                          style={{ height: 'clamp(0.75rem, 1.5vw, 1rem)', width: '50%' }}/>
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
                                    <div
                                        className="relative w-full aspect-video max-w-md mx-auto overflow-hidden bg-muted">
                                      <img
                                          src={project.image || (theme === "dark" ? logoDark : logoWhite)}
                                          alt={project.title}
                                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                          loading="lazy"
                                      />
                                    </div>

                                    <div style={{ padding: 'clamp(1rem, 2vw, 1.25rem)' }}>
                                      <div className="flex items-start justify-between" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors flex-1" style={{ fontSize: 'clamp(0.938rem, 1.5vw, 1rem)' }}>
                                          {project.title}
                                        </h3>
                                        <div
                                            className="rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform"
                                            style={{ width: 'clamp(1.5rem, 2.5vw, 1.75rem)', height: 'clamp(1.5rem, 2.5vw, 1.75rem)', marginLeft: 'clamp(0.5rem, 1vw, 0.75rem)' }}
                                        >
                                          <ArrowUpRight style={{ width: 'clamp(0.75rem, 1.2vw, 0.875rem)', height: 'clamp(0.75rem, 1.2vw, 0.875rem)' }} className="text-primary-foreground"/>
                                        </div>
                                      </div>
                                      <p className="text-foreground/60" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>{project.subcategory}</p>
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
            <div ref={cardsRef}  className="grid grid-cols-1" style={{ gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
              {featuredProjects.map((project) => (
                  <Card
                      key={project.id}
                      className="glass-card hover:glow-effect transition-all duration-500 group cursor-pointer overflow-hidden h-full"
                      onClick={() => handleProjectClick(project)}
                  >
                    <CardContent className="p-0 h-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                        {/* Left: Project Info */}
                        <div className="flex flex-col justify-between order-2 lg:order-1" style={{ padding: 'clamp(2rem, 6vw, 3rem)' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
                            <div>
                              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors" style={{ 
                                fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                                marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)'
                              }}>
                                {project.title}
                              </h3>
                              <p className="text-foreground/60" style={{ 
                                fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
                                marginBottom: 'clamp(1rem, 2vw, 1.25rem)'
                              }}>
                                {project.subcategory}
                              </p>
                              <p className="text-foreground/70 leading-relaxed hidden md:block" style={{ fontSize: 'clamp(0.938rem, 1.5vw, 1rem)' }}>
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Project Meta */}
                          <div className="flex items-center flex-wrap" style={{ gap: 'clamp(2rem, 4vw, 3rem)', marginTop: 'clamp(2rem, 4vw, 2.5rem)' }}>
                            {project.country && (
                                <div>
                                  <p className="text-primary font-medium" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)' }}>{project.country}</p>
                                  <p className="text-foreground/40" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>Country</p>
                                </div>
                            )}
                            {project.duration && (
                                <div>
                                  <p className="text-primary font-medium" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)' }}>{project.duration}</p>
                                  <p className="text-foreground/40" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>Time of working</p>
                                </div>
                            )}
                            <div>
                              <p className="text-primary font-medium" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)' }}>{project.year}</p>
                              <p className="text-foreground/40" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>Years</p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Project Image */}
                        <div className="relative aspect-[4/3] lg:h-full overflow-hidden order-1 lg:order-2 bg-muted">
                          <img
                              src={project.image || (theme === "dark" ? logoDark : logoWhite)}
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
            <DialogContent className="w-[90vw] sm:w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-foreground/10">
              {selectedProject && (
                  <>
                    <DialogHeader style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                      <DialogTitle className="font-bold text-foreground" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>
                        {selectedProject.title}
                      </DialogTitle>
                      <div className="flex items-center flex-wrap" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)', fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>
                    <span className="rounded-full bg-primary/10 text-primary" style={{ padding: 'clamp(0.25rem, 0.8vw, 0.375rem) clamp(0.75rem, 1.5vw, 1rem)' }}>
                      {selectedProject.category}
                    </span>
                        <span className="text-foreground/60">•</span>
                        <span className="text-foreground/60">{selectedProject.year}</span>
                      </div>
                    </DialogHeader>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)', marginTop: 'clamp(1.5rem, 3vw, 2rem)' }}>

                      {selectedProject.image && (
                          <div className="rounded-lg overflow-hidden bg-foreground/5 max-w-md mx-auto">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-auto object-contain"
                                loading="lazy"
                            />
                          </div>
                      )}


                      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(2rem, 4vw, 3rem)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
                          <div>
                            <h4 className="font-semibold text-foreground" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>Project Overview</h4>
                            <p className="text-foreground/70 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                              {selectedProject.description}
                            </p>
                          </div>

                          {selectedProject.technologies && (
                              <div>
                                <h4 className="font-semibold text-foreground" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>Technologies Used</h4>
                                <div className="flex flex-wrap" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                                  {selectedProject.technologies.map((tech) => (
                                      <span
                                          key={tech}
                                          className="rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 hover:glow-effect hover:border-transparent hover:bg-transparent hover:text-foreground"
                                          style={{ padding: 'clamp(0.25rem, 0.8vw, 0.375rem) clamp(0.75rem, 1.5vw, 1rem)', fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}
                                      >
                                        {tech}
                                      </span>
                                  ))}
                                </div>
                              </div>
                          )}

                          {selectedProject.links && (
                              <div>
                                <h4 className="font-semibold text-foreground" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>Links</h4>
                                <div className="flex flex-col" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                                  {selectedProject.links.map((tech) => (
                                      <span
                                          key={tech}
                                          className="rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 hover:glow-effect hover:border-transparent hover:bg-transparent hover:text-foreground cursor-pointer"
                                          style={{ padding: 'clamp(0.25rem, 0.8vw, 0.375rem) clamp(0.75rem, 1.5vw, 1rem)', fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}
                                          onClick={() => window.open(tech, '_blank')}
                                      >
                                        {tech}
                                      </span>
                                  ))}
                                </div>
                              </div>
                          )}

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
                          <div className="grid grid-cols-2" style={{ gap: 'clamp(1rem, 2vw, 1.25rem)' }}>
                            {selectedProject.country && (
                                <div>
                                  <p className="text-primary font-medium" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.375rem)' }}>{selectedProject.country}</p>
                                  <p className="text-foreground/40" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>Country</p>
                                </div>
                            )}
                            {selectedProject.duration && (
                                <div>
                                  <p className="text-primary font-medium" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.375rem)' }}>{selectedProject.duration}</p>
                                  <p className="text-foreground/40" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>Duration</p>
                                </div>
                            )}
                            <div>
                              <p className="text-primary font-medium" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.375rem)' }}>{selectedProject.year}</p>
                              <p className="text-foreground/40" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>Year</p>
                            </div>
                            <div>
                              <p className="text-primary font-medium" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.375rem)' }}>{selectedProject.category}</p>
                              <p className="text-foreground/40" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>Category</p>
                            </div>
                          </div>

                          {selectedProject.clientTestimonial && (
                              <div>
                                <h4 className="font-semibold text-foreground" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}></h4>
                                <blockquote className="italic text-foreground/70 border-l-4 border-primary rounded bg-foreground/5" style={{ paddingLeft: 'clamp(1rem, 2vw, 1.25rem)', padding: 'clamp(1rem, 2vw, 1.25rem)', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
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