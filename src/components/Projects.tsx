import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const projects = [
  {
    title: "E-commerce REST API",
    description:
      "A fully-featured REST API for an e-commerce platform with product management, cart operations, and order processing.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
  },
  {
    title: "JWT Authentication System",
    description:
      "Secure authentication & authorization microservice with JWT tokens, refresh flows, and role-based access control.",
    stack: ["Java", "Spring Security", "JWT", "MySQL"],
  },
  {
    title: "Dockerized Microservice",
    description:
      "A containerized microservice architecture with service discovery, API gateway, and centralized logging.",
    stack: ["Docker", "Spring Cloud", "Nginx", "PostgreSQL"],
  },
  {
    title: "Memory Leak Investigation",
    description:
      "An educational demo showcasing common Java memory leak patterns, profiling techniques, and resolution strategies.",
    stack: ["Java", "JVM", "VisualVM", "JProfiler"],
  },
];

const Projects = () => (
  <section id="projects" className="py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Projects</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12">
          Selected work.
        </h2>
      </SectionReveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <SectionReveal key={p.title}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group rounded-xl border border-border bg-card p-6 flex flex-col h-full"
            >
              {/* Placeholder image area */}
              <div className="rounded-lg bg-accent h-40 mb-5 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Preview</span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Github size={14} /> Code
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={14} /> Demo
                </a>
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
