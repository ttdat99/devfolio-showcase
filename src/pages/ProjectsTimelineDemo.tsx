import { useState } from "react";
import ProjectsTimeline from "@/components/ProjectsTimeline";
import { fallbackProjects, Project } from "@/data/projectsData";

/**
 * Standalone demo page for testing the ProjectsTimeline component
 * 
 * Usage: Add this to your router or navigate to it to see the timeline in action
 */
const ProjectsTimelineDemo = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    console.log("Project clicked:", project.title);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-foreground">
            ProjectsTimeline Demo
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            A reusable vertical timeline component with smooth animations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Project Timeline
              </h2>
              <p className="text-sm text-muted-foreground">
                Click on any project to see details. Scroll to see animations.
              </p>
            </div>

            <ProjectsTimeline
              projects={fallbackProjects}
              onProjectClick={handleProjectClick}
              showGithubButton={true}
              showDemoButton={true}
            />
          </div>

          {/* Sidebar - Selected Project Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Selected Project
              </h3>
              
              {selectedProject ? (
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {selectedProject.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedProject.fullDescription || selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Project ID:</span>
                      <span className="font-mono text-foreground">{selectedProject.id}</span>
                    </div>
                    
                    {selectedProject.customer && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Customer:</span>
                        <span className="text-foreground">{selectedProject.customer}</span>
                      </div>
                    )}
                    
                    {selectedProject.teamSize && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Team Size:</span>
                        <span className="text-foreground">{selectedProject.teamSize}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-foreground">
                        {selectedProject.from} → {selectedProject.to}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.split(",").map((tech) => (
                        <span
                          key={tech.trim()}
                          className="px-2 py-1 rounded bg-accent text-xs font-medium text-accent-foreground"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    Click on a project to see its details here
                  </p>
                </div>
              )}

              {/* Component Info */}
              <div className="mt-8 rounded-xl border border-border bg-card/50 p-6">
                <h4 className="font-semibold text-foreground mb-3 text-sm">
                  Component Features
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>✓ Vertical timeline layout</li>
                  <li>✓ Newest projects first</li>
                  <li>✓ Smooth scroll animations</li>
                  <li>✓ Responsive design</li>
                  <li>✓ Dark mode compatible</li>
                  <li>✓ Framer Motion powered</li>
                  <li>✓ TypeScript support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="text-sm text-muted-foreground text-center">
            <p>
              Built with React 18, TailwindCSS, Framer Motion, and lucide-react
            </p>
            <p className="mt-2">
              See <code className="px-2 py-1 rounded bg-accent text-accent-foreground font-mono text-xs">
                PROJECTSTIMELINE_README.md
              </code> for full documentation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsTimelineDemo;
