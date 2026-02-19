import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => setMounted(true), []);

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

  const handleNavigate = (id) => {
    navigate(`/#${id}`);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => handleNavigate("hero")}
          className="text-xl font-bold tracking-tight text-foreground"
        >
          dev<span className="text-gradient">.folio</span>
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => handleNavigate(l.id)}
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
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
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
                    onClick={() => handleNavigate(l.id)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
