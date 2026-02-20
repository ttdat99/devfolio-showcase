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
          <div className="space-y-10">
            {categories.map((cat, catIndex) => (
              <SectionReveal key={cat.category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="relative"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full shadow-lg shadow-primary/20" />
                      <h3 className="text-lg font-bold text-foreground tracking-tight">
                        {cat.category}
                      </h3>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                    <span className="text-xs font-medium text-muted-foreground bg-accent px-3 py-1 rounded-full">
                      {cat.skills.length} {cat.skills.length === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>

                  {/* Skills Tree - Fixed Axis Layout */}
                  <div className="relative">
                    {/* Define tree axis at exactly 24px from left */}
                    <div className="absolute left-[24px] top-0 bottom-0 w-0 h-full" /> {/* Visual axis marker (invisible) */}
                    
                    {/* Vertical connector line - Centered on axis (24px - 1px = 23px) */}
                    <div className="absolute left-[23px] top-0 bottom-6 w-[2px] bg-gradient-to-b from-border via-border/60 to-transparent" />
                    
                    {/* Skills container with precise left padding (24px + 12px gap + 8px dot + 16px spacing = 60px) */}
                    <div className="pl-[60px] space-y-4">
                      {cat.skills.map((skill, idx) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: catIndex * 0.1 + idx * 0.03 }}
                          whileHover={{ x: 6 }}
                          className="relative group h-10 flex items-center"
                        >
                          {/* Node dot - Positioned exactly on axis (24px center - 4px radius = 20px left) */}
                          <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full bg-border border-[2.5px] border-background group-hover:bg-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/40 transition-all duration-200 z-10" 
                               style={{ left: 'calc(-60px + 20px)' }} />
                          
                          {/* Horizontal connector line - From axis (24px) to dot edge (24px + 12px = 36px) */}
                          <div className="absolute left-[-36px] top-1/2 -translate-y-1/2 w-[36px] h-[2px] bg-border group-hover:bg-primary/50 transition-colors duration-200" />
                          
                          {/* Skill card - Mathematically aligned height */}
                          <div className="w-full rounded-lg border border-border/60 bg-card/50 backdrop-blur-sm px-4 h-10 flex items-center shadow-sm hover:shadow-md hover:border-primary/30 hover:bg-card transition-all duration-200 cursor-default">
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                              {skill}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
