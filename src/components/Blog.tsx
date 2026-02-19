import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const posts = [
  {
    title: "Understanding JVM Garbage Collection",
    description:
      "A deep dive into how the JVM manages memory, different GC algorithms, and tuning strategies for production systems.",
    date: "Jan 2025",
  },
  {
    title: "Building REST APIs with Spring Boot 3",
    description:
      "Best practices for structuring, documenting, and securing production-grade REST APIs using modern Spring Boot.",
    date: "Dec 2024",
  },
  {
    title: "Docker for Java Developers",
    description:
      "From Dockerfile basics to multi-stage builds — everything you need to containerize your Java applications.",
    date: "Nov 2024",
  },
];

const Blog = () => (
  <section id="blog" className="py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Blog</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12">
          Latest writing.
        </h2>
      </SectionReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <SectionReveal key={post.title}>
            <motion.a
              href="#"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group block rounded-xl border border-border bg-card p-6 h-full"
            >
              <p className="text-xs text-muted-foreground mb-3">{post.date}</p>
              <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-1">
                {post.title}
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            </motion.a>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
