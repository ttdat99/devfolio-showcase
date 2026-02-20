import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navLinks = [
    { label: t.nav.about, id: "about", type: "scroll" },
    { label: t.nav.skills, id: "skills", type: "scroll" },
    { label: t.nav.projects, id: "projects", type: "scroll" },
    { label: t.nav.blog, id: "blog", type: "page", path: "/blog" },
    { label: t.nav.contact, id: "contact", type: "scroll" },
  ];

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => setMounted(true), []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll when hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        const yOffset = -80;
        const y =
          el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
        setActive(id);
      }
    }
  }, [location]);

  // Set active based on current path
  useEffect(() => {
    if (location.pathname === "/blog") {
      setActive("blog");
    } else if (location.pathname === "/" && !location.hash) {
      setActive("hero");
    }
  }, [location.pathname]);

  const handleNavigate = (link) => {
    if (link.type === "page") {
      navigate(link.path);
      setActive(link.id);
    } else {
      navigate(`/#${link.id}`);
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold tracking-tight text-foreground"
        >
          dat<span className="text-gradient">.folio</span>
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => handleNavigate(l)}
                className={`text-sm transition-colors ${
                  active === l.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {mounted && (
            <>
              <button
                onClick={() => setLanguage(language === "en" ? "vi" : "en")}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Toggle language"
              >
                <Languages size={16} />
                <span>{language === "en" ? "ENG" : "VI"}</span>
              </button>
              
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => handleNavigate(l)}
                    className={`text-sm transition-colors ${
                      active === l.id
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              
              {/* Language Toggle for Mobile */}
              {mounted && (
                <li className="pt-2 border-t border-border">
                  <button
                    onClick={() => setLanguage(language === "en" ? "vi" : "en")}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Languages size={16} />
                    <span>{language === "en" ? "English" : "Tiếng Việt"}</span>
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
