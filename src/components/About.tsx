import SectionReveal from "./SectionReveal";

const About = () => (
  <section id="about" className="py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">About</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-8">
          Building robust systems.
        </h2>
        <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I'm a backend engineer who thrives on designing scalable, maintainable systems.
            With deep expertise in Java and the Spring ecosystem, I focus on crafting clean
            APIs, optimizing database performance, and architecting solutions that handle
            real-world scale.
          </p>
          <p>
            My work spans RESTful API development, microservice architecture, system design,
            and performance optimization. I'm passionate about writing code that's not just
            functional, but elegant — and sharing what I learn through technical writing.
          </p>
        </div>
      </SectionReveal>
    </div>
  </section>
);

export default About;
