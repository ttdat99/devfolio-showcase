import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, Building2, Github, ExternalLink, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchProjects, fallbackProjects, getProjectById } from "@/data/projectsData";
import { useLanguage } from "@/contexts/LanguageContext";

const isValidUrl = (url?: string): boolean => {
  return !!url && url.trim() !== "" && url.trim() !== "#";
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Fetch projects from Google Sheets
  const { data: projects = fallbackProjects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const project = id ? getProjectById(id, projects) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-accent rounded w-32 mb-8"></div>
            <div className="h-12 bg-accent rounded w-3/4 mb-4"></div>
            <div className="flex gap-4 mb-8">
              <div className="h-10 bg-accent rounded w-24"></div>
              <div className="h-10 bg-accent rounded w-24"></div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="h-6 bg-accent rounded w-32 mb-4"></div>
              <div className="h-4 bg-accent rounded mb-2"></div>
              <div className="h-4 bg-accent rounded mb-2"></div>
              <div className="h-4 bg-accent rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">{t.projects.projectNotFound}</h1>
          <p className="text-muted-foreground mb-8">
            {t.projects.projectNotFoundDesc}
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            {t.projects.backToHome}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate duration
  const calculateDuration = (from: string, to: string | "Present") => {
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
    return `${years} ${years === 1 ? t.projects.year : t.projects.years} ${remainingMonths} ${t.projects.months}`;
  };

  // Format date range
  const formatDateRange = (from: string, to: string | "Present") => {
    const formatMonth = (dateStr: string) => {
      const [year, month] = dateStr.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString(t.date.locale, { month: "short", year: "numeric" });
    };

    const fromFormatted = formatMonth(from);
    const toFormatted = to === "Present" ? t.projects.present : formatMonth(to);
    
    return `${fromFormatted} – ${toFormatted}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t.projects.backToHome}
          </motion.button>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="inline-flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <span>{formatDateRange(project.from, project.to)}</span>
              </div>
              
              <div className="inline-flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <span>{calculateDuration(project.from, project.to)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {(isValidUrl(project.githubUrl) || isValidUrl(project.demoUrl)) && (
              <div className="flex flex-wrap gap-3">
                {isValidUrl(project.githubUrl) && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-accent hover:border-primary/30 transition-all duration-200"
                  >
                    <Github size={18} />
                    {t.projects.code}
                  </a>
                )}
                
                {isValidUrl(project.demoUrl) && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                  >
                    <ExternalLink size={18} />
                    {t.projects.demo}
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t.projects.overview}
              </h2>
              <div 
                className="html-content text-foreground leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: project.fullDescription || project.description }}
              />
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t.projects.projectInfo}
              </h2>
              
              <div className="grid gap-6 sm:grid-cols-2">
                {project.customer && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.projects.customer}
                      </p>
                      <p className="font-medium text-foreground">{project.customer}</p>
                    </div>
                  </div>
                )}
                
                {project.teamSize && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.projects.teamSize}
                      </p>
                      <p className="font-medium text-foreground">
                        {project.teamSize} {t.projects.members}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t.projects.technologies}
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {project.stack.split(',').map((tech) => (
                  <span
                    key={tech.trim()}
                    className="inline-flex items-center rounded-lg bg-accent/60 border border-border/50 px-4 py-2.5 text-sm font-medium text-accent-foreground hover:border-primary/30 hover:bg-accent transition-all duration-200"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
