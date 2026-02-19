import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground mb-8">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4">
            Hi, I'm <span className="text-gradient">Your Name</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground font-medium mb-4">
            Backend Developer · Java & Spring Boot
          </p>

          <p className="max-w-xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed mb-10">
            I build scalable backend systems and create technical content about
            software engineering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              View Projects <ArrowRight size={16} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              <Mail size={16} /> Contact Me
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
