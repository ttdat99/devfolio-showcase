import SectionReveal from "./SectionReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">{t.about.title}</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8">
            {t.about.heading}
          </h2>
          <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {t.about.paragraph1}
            </p>
            <p>
              {t.about.paragraph2}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default About;
