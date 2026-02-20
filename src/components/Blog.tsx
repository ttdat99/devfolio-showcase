import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionReveal from "./SectionReveal";
import { blogPosts } from "@/data/blogData";

const Blog = () => {
  const navigate = useNavigate();
  
  // Get latest 3 posts
  const latestPosts = blogPosts.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
  <section id="blog" className="py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">Blog</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12">
          Latest writing.
        </h2>
      </SectionReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <SectionReveal key={post.id}>
            <motion.button
              onClick={() => navigate(`/blog/${post.id}`)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group block rounded-xl border border-border bg-card p-6 h-full text-left w-full"
            >
              <p className="text-xs text-muted-foreground mb-3">{formatDate(post.createdAt)}</p>
              <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-1">
                {post.title}
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            </motion.button>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Blog;
