import SectionReveal from "./SectionReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const About = () => {
  const { t } = useLanguage();
  
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1HUlIsbExwqVV2Nyr3Fq2en7Gh9bvWIpc';
    link.download = 'CV_DatTruongThanh.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
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
          <div className="mt-8">
            <Button 
              variant="outline" 
              size="default"
              onClick={handleDownloadCV}
              className="group rounded-full transition-all hover:scale-105 hover:shadow-md"
            >
              <Download className="transition-transform group-hover:-translate-y-0.5" />
              {t.about.downloadCV}
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default About;
