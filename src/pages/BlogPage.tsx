import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { fetchBlogPosts, fallbackBlogPosts } from "../data/blogData";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Fetch blog posts from Google Sheets
  const { data: blogPosts = fallbackBlogPosts, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t.date.locale, t.date.fullDateFormat);
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
                {t.blog.title}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                {t.blog.latestArticles}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t.blog.subtitle}
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 sm:py-16 pb-24">
          <div className="container mx-auto px-6">
            {isLoading ? (
              // Loading skeleton
              <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <article
                    key={i}
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card animate-pulse"
                  >
                    <div className="aspect-[16/10] bg-accent" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="h-4 bg-accent rounded w-24 mb-3"></div>
                      <div className="h-6 bg-accent rounded mb-3"></div>
                      <div className="h-4 bg-accent rounded mb-2"></div>
                      <div className="h-4 bg-accent rounded w-5/6 mb-6"></div>
                      <div className="h-4 bg-accent rounded w-20"></div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
            <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                  <SectionReveal key={post.id} className="h-full">
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
                    >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-accent">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
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
                      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>

                      {/* Read More Link */}
                      <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary">
                        {t.blog.readMore}
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </motion.article>
                  </SectionReveal>
              ))}
            </div>
            )}

            {/* Empty State */}
            {!isLoading && blogPosts.length === 0 && (
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
