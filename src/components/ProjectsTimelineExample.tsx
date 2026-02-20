import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProjectsTimeline from "./ProjectsTimeline";
import SectionReveal from "./SectionReveal";
import { fetchProjects, fallbackProjects } from "@/data/projectsData";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Example usage of the ProjectsTimeline component
 * 
 * This component demonstrates how to integrate the reusable ProjectsTimeline
 * with data fetching, internationalization, and routing.
 */
const ProjectsTimelineExample = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Fetch projects from Google Sheets with fallback
  const { data: projects = fallbackProjects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section id="projects-timeline" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <SectionReveal>
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            {t.projects.title}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-16">
            {t.projects.heading}
          </h2>
        </SectionReveal>

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-4xl mx-auto space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className="pl-8 md:pl-12 animate-pulse"
              >
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="h-6 bg-accent/50 rounded w-48 mb-4" />
                  <div className="h-8 bg-accent/50 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-accent/50 rounded mb-2" />
                  <div className="h-4 bg-accent/50 rounded w-5/6 mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-accent/50 rounded w-20" />
                    <div className="h-6 bg-accent/50 rounded w-24" />
                    <div className="h-6 bg-accent/50 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        {!isLoading && (
          <ProjectsTimeline
            projects={projects}
            onProjectClick={(project) => navigate(`/projects/${project.id}`)}
            showGithubButton={true}
            showDemoButton={true}
            className="mt-8"
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsTimelineExample;
