import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { blogPosts } from "@/data/blogData";

const BlogPage = () => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-6">
            <SectionReveal>
              <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
                Blog
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                Latest Articles
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Thoughts on software development, architecture, and technology. 
                Sharing knowledge and experiences from building scalable systems.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 sm:py-16 pb-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <div key={post.id}>
                  <SectionReveal>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="group cursor-pointer rounded-xl border border-border bg-card overflow-hidden h-full flex flex-col transition-shadow hover:shadow-lg"
                    >
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-accent">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar size={14} />
                        <time dateTime={post.createdAt}>
                          {formatDate(post.createdAt)}
                        </time>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3 mb-4">
                        {post.description}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                        Read more
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </motion.article>
                  </SectionReveal>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {blogPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  No blog posts available yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
