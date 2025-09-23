import { useState, useEffect } from "react";
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
import projectsData from "@/data/projects.json";

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFilterChanging, setIsFilterChanging] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const itemsPerPage = 6;

  const filters = ["All", "Landing Page", "App Design", "SaaS Product", "Dashboard"];
  const projects = projectsData.projects;

  const filteredProjects = activeFilter === "All"
      ? projects
      : projects.filter(project => project.category === activeFilter);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // Initialize displayed projects
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
    setDisplayedProjects(currentProjects);
  }, []);

  const handleFilterChange = async (filter) => {
    if (isFilterChanging) return;

    setIsFilterChanging(true);

    // Wait for loading state
    await new Promise(resolve => setTimeout(resolve, 800));

    setActiveFilter(filter);
    setCurrentPage(1);

    // Calculate new projects
    const newFilteredProjects = filter === "All"
        ? projects
        : projects.filter(project => project.category === filter);
    const newProjects = newFilteredProjects.slice(0, itemsPerPage);
    setDisplayedProjects(newProjects);

    // Re-enable filter buttons
    setIsFilterChanging(false);
  };

  const handlePageChange = async (page) => {
    if (isPageChanging || page === currentPage) return;

    setIsPageChanging(true);
    const direction = page > currentPage ? "left" : "right";
    setSlideDirection(direction);

    // Slide out current projects
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
      projectGrid.style.transform = `translateX(${direction === "left" ? "-100%" : "100%"})`;
      projectGrid.style.opacity = '0';
    }

    // Wait for slide out animation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Update projects and page
    const startIndex = (page - 1) * itemsPerPage;
    const newProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
    setDisplayedProjects(newProjects);
    setCurrentPage(page);

    // Prepare for slide in from opposite direction
    if (projectGrid) {
      projectGrid.style.transition = 'none';
      projectGrid.style.transform = `translateX(${direction === "left" ? "100%" : "-100%"})`;
    }

    // Wait a frame then slide in
    setTimeout(() => {
      if (projectGrid) {
        projectGrid.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        projectGrid.style.transform = 'translateX(0%)';
        projectGrid.style.opacity = '1';
      }
    }, 50);

    // Re-enable pagination
    setTimeout(() => {
      setIsPageChanging(false);
    }, 300);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
  };

  return (
      <section id="projects" className="pt-24 relative overflow-hidden">
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
                    disabled={isFilterChanging}
                    variant={activeFilter === filter ? "default" : "outline"}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                        activeFilter === filter
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-transparent border border-foreground/20 text-foreground hover:bg-primary/10"
                    } ${isFilterChanging ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {filter}
                </Button>
            ))}
          </div>

          {/* Project Grid Container */}
          <div className="relative max-w-7xl mx-auto mb-12 overflow-hidden">
            <div
                className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-400 ease-out"
                style={{ transform: 'translateX(0%)', opacity: 1 }}
            >
              {isFilterChanging ? (
                  // Loading skeleton cards
                  Array.from({ length: itemsPerPage }, (_, index) => (
                      <Card
                          key={`loading-${index}`}
                          className="glass-card overflow-hidden"
                      >
                        <CardContent className="p-0">
                          {/* Loading Image Skeleton */}
                          <div className="aspect-[4/3] bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse">
                          </div>

                          {/* Loading Content Skeleton */}
                          <div className="p-6 space-y-3">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 space-y-2">
                                <div className="h-5 bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse rounded-md w-3/4"></div>
                                <div className="h-4 bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse rounded-md w-1/2"></div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10 animate-pulse ml-3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                  ))
              ) : (
                  displayedProjects.map((project, index) => (
                      <Card
                          key={`${project.id}-${activeFilter}-${currentPage}`}
                          className="project-card glass-card hover:glow-effect transition-all duration-500 group cursor-pointer overflow-hidden"
                          style={{
                            opacity: 1,
                            transform: 'translateY(0px)',
                            transition: 'all 0.3s ease-out'
                          }}
                          onClick={() => handleProjectClick(project)}
                      >
                        <CardContent className="p-0">
                          {/* Project Image */}
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  ))
              )}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={`${
                              currentPage === 1 || isPageChanging
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer hover:bg-primary/10"
                          } transition-all duration-200`}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className={`cursor-pointer transition-all duration-200 ${
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
                          } transition-all duration-200`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
          )}

          {/* Project Detail Modal */}
          <Dialog open={!!selectedProject} onOpenChange={handleModalClose}>
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
                      {/* Project Image */}
                      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-foreground/5">
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

                          {selectedProject.technologies && (
                              <div>
                                <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedProject.technologies.map((tech) => (
                                      <span
                                          key={tech}
                                          className="px-3 py-1 text-xs rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70"
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
                                  <p className="text-primary font-medium text-lg mb-1">
                                    {selectedProject.country}
                                  </p>
                                  <p className="text-foreground/40 text-sm">
                                    Country
                                  </p>
                                </div>
                            )}
                            {selectedProject.duration && (
                                <div>
                                  <p className="text-primary font-medium text-lg mb-1">
                                    {selectedProject.duration}
                                  </p>
                                  <p className="text-foreground/40 text-sm">
                                    Duration
                                  </p>
                                </div>
                            )}
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

                          {selectedProject.clientTestimonial && (
                              <div>
                                <h4 className="text-lg font-semibold text-foreground mb-3">Client Testimonial</h4>
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