import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // Tự động scroll khi có hash
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero dark:bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-hero-light dark:bg-gradient-hero" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4">
            {t.hero.greeting} <span className="text-gradient">{t.hero.name}</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/#projects")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {t.hero.viewProjects} <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate("/#contact")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <Mail size={16} /> {t.hero.contactMe}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
