import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const categories = [
  {
    title: "Backend",
    skills: ["Java", "Spring Boot", "REST API", "JPA / Hibernate"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MySQL"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Linux", "Nginx"],
  },
];

const Skills = () => (
  <section id="skills" className="py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Skills</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12">
          Tools & technologies.
        </h2>
      </SectionReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <SectionReveal key={cat.title}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-xl border border-border bg-card p-6 h-full"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
