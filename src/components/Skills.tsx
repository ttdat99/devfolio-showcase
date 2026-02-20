import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { fetchSkills, fallbackSkills, type SkillCategory } from "@/data/commonsData";
import { LayoutGrid, Network } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "tree";

const Skills = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<SkillCategory[]>(fallbackSkills);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      const skills = await fetchSkills();
      setCategories(skills);
      setLoading(false);
    };

    loadSkills();
  }, []);
  
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">{t.skills.title}</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {t.skills.heading}
              </h2>
            </div>
            
            {/* View mode toggle */}
            <div className="flex gap-2 border border-border rounded-lg p-1 bg-card">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                type="button"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("tree")}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  viewMode === "tree"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                type="button"
              >
                <Network className="w-4 h-4" />
                <span className="hidden sm:inline">Tree</span>
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* List View */}
        {viewMode === "list" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <SectionReveal key={cat.category}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-xl border border-border bg-card p-6 h-full"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-4">{cat.category}</h3>
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
        )}

        {/* Tree View */}
        {viewMode === "tree" && (
          <div className="space-y-6">
            {categories.map((cat) => (
              <SectionReveal key={cat.category}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary rounded-full" />
                    {cat.category}
                  </h3>
                  <div className="pl-6 space-y-2">
                    {cat.skills.map((skill, idx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-px bg-border" />
                          <div className="w-2 h-2 rounded-full bg-primary/50" />
                        </div>
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
