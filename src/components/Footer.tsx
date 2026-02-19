import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </p>

      <p className="text-xs text-muted-foreground">
        Built with React & Tailwind CSS
      </p>

      <div className="flex items-center gap-4">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Github size={16} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Linkedin size={16} />
        </a>
        <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
          <Mail size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
