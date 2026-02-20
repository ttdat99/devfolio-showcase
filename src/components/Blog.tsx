import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SectionReveal from "./SectionReveal";
import { fetchBlogPosts, fallbackBlogPosts } from "@/data/blogData";

const Blog = () => {
  const navigate = useNavigate();
  
  // Fetch blog posts from Google Sheets
  const { data: blogPosts = fallbackBlogPosts, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
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
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 h-full animate-pulse">
              <div className="h-4 bg-accent rounded w-20 mb-3"></div>
              <div className="h-6 bg-accent rounded mb-2"></div>
              <div className="h-4 bg-accent rounded mb-1"></div>
              <div className="h-4 bg-accent rounded w-4/5"></div>
            </div>
          ))
        ) : (
          latestPosts.map((post) => (
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
        ))
        )}
      </div>
    </div>
  </section>
  );
};

export default Blog;
