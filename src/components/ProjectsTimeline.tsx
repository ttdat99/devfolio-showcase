import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, Github, Users, Building2 } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectsTimelineProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  showGithubButton?: boolean;
  showDemoButton?: boolean;
  className?: string;
}

const formatDate = (dateStr: string): string => {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const formatDateRange = (from: string, to: string | "Present"): string => {
  const fromFormatted = formatDate(from);
  const toFormatted = to === "Present" ? "Present" : formatDate(to);
  return `${fromFormatted} - ${toFormatted}`;
};

const calculateDuration = (from: string, to: string | "Present"): string => {
  const [fromYear, fromMonth] = from.split("-").map(Number);
  
  let toYear: number, toMonth: number;
  if (to === "Present") {
    const now = new Date();
    toYear = now.getFullYear();
    toMonth = now.getMonth() + 1;
  } else {
    [toYear, toMonth] = to.split("-").map(Number);
  }
  
  const months = (toYear - fromYear) * 12 + (toMonth - fromMonth);
  
  if (months < 1) return "< 1 month";
  if (months === 1) return "1 month";
  if (months < 12) return `${months} months`;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) return `${years} ${years === 1 ? "year" : "years"}`;
  return `${years} ${years === 1 ? "year" : "years"} ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
};

const isValidUrl = (url?: string): boolean => {
  return !!url && url.trim() !== "" && url.trim() !== "#";
};

const TimelineItem = ({ 
  project, 
  index,
  onProjectClick,
  showGithubButton = true,
  showDemoButton = true
}: { 
  project: Project; 
  index: number;
  onProjectClick?: (project: Project) => void;
  showGithubButton?: boolean;
  showDemoButton?: boolean;
}) => {
  const hasGithub = showGithubButton && isValidUrl(project.githubUrl);
  const hasDemoLink = showDemoButton && isValidUrl(project.demoUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      {/* Timeline connector line */}
      <div className="absolute left-[11px] md:left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-border via-border/60 to-transparent" />
      
      {/* Timeline dot with pulse animation */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.15 }}
        className="absolute left-0 md:left-2 top-2 z-10"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(var(--primary-rgb, 139 92 246) / 0.4)",
              "0 0 0 8px rgba(var(--primary-rgb, 139 92 246) / 0)",
              "0 0 0 0 rgba(var(--primary-rgb, 139 92 246) / 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary border-4 border-background shadow-lg"
        />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={() => onProjectClick?.(project)}
        className={`group rounded-xl border border-border/60 bg-card backdrop-blur-sm p-6 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 ${
          onProjectClick ? "cursor-pointer" : ""
        }`}
      >
        {/* Date header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {formatDateRange(project.from, project.to)}
            </span>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {calculateDuration(project.from, project.to)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Additional metadata */}
        {(project.customer || project.teamSize) && (
          <div className="flex flex-wrap gap-3 mb-4">
            {project.customer && (
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="w-3.5 h-3.5" />
                <span>{project.customer}</span>
              </div>
            )}
            {project.teamSize && (
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span>{project.teamSize} {project.teamSize === 1 ? "member" : "members"}</span>
              </div>
            )}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.split(",").map((tech) => (
            <span
              key={tech.trim()}
              className="px-3 py-1 rounded-md bg-accent/60 text-xs font-medium text-accent-foreground border border-border/50 hover:border-primary/30 transition-colors"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        {(hasGithub || hasDemoLink) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent hover:border-primary/30 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
            {hasDemoLink && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const ProjectsTimeline = ({ 
  projects, 
  onProjectClick,
  showGithubButton = true,
  showDemoButton = true,
  className = ""
}: ProjectsTimelineProps) => {
  // Sort projects by start date (newest first)
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.from);
    const dateB = new Date(b.from);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className={`relative max-w-4xl mx-auto ${className}`}>
      {sortedProjects.map((project, index) => (
        <TimelineItem
          key={project.id}
          project={project}
          index={index}
          onProjectClick={onProjectClick}
          showGithubButton={showGithubButton}
          showDemoButton={showDemoButton}
        />
      ))}
    </div>
  );
};

export default ProjectsTimeline;
