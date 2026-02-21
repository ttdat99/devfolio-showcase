import { Mail, Github, Linkedin, Send } from "lucide-react";
import SectionReveal from "./SectionReveal";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only — no submission
    alert(t.contact.successMessage);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">{t.contact.title}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t.contact.heading}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg">
            {t.contact.subtitle}
          </p>
        </SectionReveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  {t.contact.name}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  {t.contact.email}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Send size={16} /> {t.contact.send}
              </button>
            </form>
          </SectionReveal>

          <SectionReveal>
            <div className="space-y-6">
              <a
                href="mailto:ttdat.ak@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm">ttdat.ak@gmail.com</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={18} />
                <span className="text-sm">github.com/ttdat99</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={18} />
                <span className="text-sm">linkedin.com/in/ttdat99</span>
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
