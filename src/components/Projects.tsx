import { ExternalLink, Github, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  title: string;
  description: string;
  stack: string[];
  from: string;
  to: string | "Present";
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    title: "E-commerce REST API",
    description:
      "A fully-featured REST API for an e-commerce platform with product management, cart operations, and order processing.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
    from: "2024-10",
    to: "Present",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "JWT Authentication System",
    description:
      "Secure authentication & authorization microservice with JWT tokens, refresh flows, and role-based access control.",
    stack: ["Java", "Spring Security", "JWT", "MySQL"],
    from: "2024-07",
    to: "2024-09",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "Dockerized Microservice",
    description:
      "A containerized microservice architecture with service discovery, API gateway, and centralized logging.",
    stack: ["Docker", "Spring Cloud", "Nginx", "PostgreSQL"],
    from: "2024-04",
    to: "2024-06",
    githubUrl: "#",
    demoUrl: "#",
  },
  {
    title: "Memory Leak Investigation",
    description:
      "An educational demo showcasing common Java memory leak patterns, profiling techniques, and resolution strategies.",
    stack: ["Java", "JVM", "VisualVM", "JProfiler"],
    from: "2024-01",
    to: "2024-03",
    githubUrl: "#",
    demoUrl: "#",
  },
];

const formatDateRange = (from: string, to: string | "Present", locale: string, presentText: string) => {
  const formatMonth = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  };

  const fromFormatted = formatMonth(from);
  const toFormatted = to === "Present" ? presentText : formatMonth(to);
  
  return `${fromFormatted} - ${toFormatted}`;
};

const calculateDuration = (from: string, to: string | "Present", t: any) => {
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
  
  if (months < 1) return t.projects.lessThanMonth;
  if (months === 1) return `1 ${t.projects.month}`;
  if (months < 12) return `${months} ${t.projects.months}`;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) return `${years} ${years === 1 ? t.projects.year : t.projects.years}`;
  return `${years} ${t.projects.year}${years > 1 ? "s" : ""} ${remainingMonths} ${t.projects.month === "month" ? "mo" : "th"}`;
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useLanguage();
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Container for card and connector */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center gap-0 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Date Column - Push away from center */}
        <div
          className={`md:flex-1 flex ${
            isEven ? "md:justify-end md:pr-12" : "md:justify-start md:pl-12"
          } mb-4 md:mb-0`}
        >
          <motion.div 
            className="inline-flex flex-col gap-1"
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/30 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 ${
                isEven ? "flex-row-reverse" : ""
              }`}
            >
              <Calendar size={16} className="text-primary flex-shrink-0" />
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {formatDateRange(project.from, project.to, t.date.locale, t.projects.present)}
              </span>
            </div>
            <span className={`text-xs text-muted-foreground px-4 ${isEven ? "text-right" : "text-left"}`}>
              {calculateDuration(project.from, project.to, t)}
            </span>
          </motion.div>
        </div>

        {/* Center Timeline Connector (Desktop Only) */}
        <div className="hidden md:flex items-center justify-center relative z-20">
          {/* Horizontal connector line */}
          <div className={`absolute w-10 h-0.5 bg-gradient-to-${isEven ? "l" : "r"} from-border/60 to-transparent ${isEven ? "right-full" : "left-full"}`} />
          
          {/* Animated Connector dot */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(var(--primary-rgb, 139 92 246) / 0.4)",
                "0 0 0 8px rgba(var(--primary-rgb, 139 92 246) / 0)",
                "0 0 0 0 rgba(var(--primary-rgb, 139 92 246) / 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
            className="w-4 h-4 rounded-full bg-primary border-[3px] border-background shadow-lg shadow-primary/40 relative z-20"
          />
          
          {/* Horizontal connector line */}
          <div className={`absolute w-10 h-0.5 bg-gradient-to-${isEven ? "r" : "l"} from-border/60 to-transparent ${isEven ? "left-full" : "right-full"}`} />
        </div>

        {/* Project Card - Push away from center */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className={`md:flex-1 w-full ${
            isEven ? "md:pl-12" : "md:pr-12"
          }`}
        >
          <div className="group rounded-2xl border border-border/50 bg-card backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-300 relative z-10">
            {/* Placeholder Image */}
            <div className="rounded-xl bg-gradient-to-br from-accent via-accent/80 to-accent/50 h-44 mb-5 flex items-center justify-center overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-300">
              <span className="text-xs text-muted-foreground font-medium">{t.projects.preview}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 blur-2xl" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-accent/60 px-3 py-1.5 text-xs font-medium text-accent-foreground border border-border/50 hover:border-primary/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href={project.githubUrl}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent hover:border-primary/30 transition-all duration-200"
              >
                <Github size={16} /> {t.projects.code}
              </a>
              <a
                href={project.demoUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
              >
                <ExternalLink size={16} /> {t.projects.demo}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  
  // Sort projects by start date (newest first)
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.from);
    const dateB = new Date(b.from);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            {t.projects.title}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-20">
            {t.projects.heading}
          </h2>
        </SectionReveal>

        {/* Timeline Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Enhanced Vertical Timeline Line (Desktop Only - Background Layer) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2" style={{ zIndex: 0 }}>
            {/* Outer glow */}
            <div className="absolute inset-0 w-1 bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-sm -left-0.5" />
            
            {/* Main line */}
            <div className="absolute inset-0 w-0.5 bg-gradient-to-b from-border/40 via-border/80 to-border/40" />
            
            {/* Inner highlight */}
            <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent left-0" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-20 md:space-y-24 relative" style={{ zIndex: 1 }}>
            {sortedProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
