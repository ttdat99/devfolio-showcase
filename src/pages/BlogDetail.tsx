import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchBlogPosts, fallbackBlogPosts } from "@/data/blogData";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch blog posts from Google Sheets
  const { data: blogPosts = fallbackBlogPosts, isLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const post = blogPosts.find((p) => p.id === Number(id));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {isLoading ? (
          // Loading skeleton
          <article className="py-12 sm:py-16">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="animate-pulse">
                <div className="h-4 bg-accent rounded w-32 mb-8"></div>
                <div className="h-4 bg-accent rounded w-24 mb-6"></div>
                <div className="h-12 bg-accent rounded mb-6"></div>
                <div className="h-6 bg-accent rounded mb-8"></div>
                <div className="h-64 bg-accent rounded-xl mb-12"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-accent rounded"></div>
                  <div className="h-4 bg-accent rounded w-5/6"></div>
                  <div className="h-4 bg-accent rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </article>
        ) : !post ? (
          // Not found state
          <div className="py-12 sm:py-16">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <button
                onClick={() => navigate("/blog")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <ArrowLeft size={18} />
                Back to Blog
              </button>
            </div>
          </div>
        ) : (
        /* Hero Section */
        <article className="py-12 sm:py-16">
          <div className="container mx-auto px-6">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </motion.button>

            {/* Post Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl mx-auto"
            >
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{estimateReadTime(post.content)} min read</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {post.description}
              </p>

              {/* Featured Image */}
              <div className="relative rounded-xl overflow-hidden mb-12 shadow-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-pre:bg-accent prose-pre:border prose-pre:border-border max-w-none">
                {/* Simple content rendering - splitting by newlines */}
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return null;
                  
                  // Handle headings
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index}>{paragraph.replace('# ', '')}</h1>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
                  }
                  
                  // Handle code blocks
                  if (paragraph.startsWith('```')) {
                    return null; // Skip code block markers for now
                  }
                  
                  // Handle bold text
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <p key={index}><strong>{paragraph.replace(/\*\*/g, '')}</strong></p>;
                  }
                  
                  // Regular paragraphs
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
            </motion.div>

            {/* Navigation to other posts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto mt-16 pt-8 border-t border-border"
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-between">
                {/* Previous Post */}
                {blogPosts[blogPosts.findIndex(p => p.id === post.id) + 1] && (
                  <button
                    onClick={() => navigate(`/blog/${blogPosts[blogPosts.findIndex(p => p.id === post.id) + 1].id}`)}
                    className="flex-1 group text-left p-6 rounded-xl border border-border hover:bg-accent transition-colors"
                  >
                    <p className="text-xs text-muted-foreground mb-2">← Previous</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {blogPosts[blogPosts.findIndex(p => p.id === post.id) + 1].title}
                    </p>
                  </button>
                )}

                {/* Next Post */}
                {blogPosts[blogPosts.findIndex(p => p.id === post.id) - 1] && (
                  <button
                    onClick={() => navigate(`/blog/${blogPosts[blogPosts.findIndex(p => p.id === post.id) - 1].id}`)}
                    className="flex-1 group text-right p-6 rounded-xl border border-border hover:bg-accent transition-colors"
                  >
                    <p className="text-xs text-muted-foreground mb-2">Next →</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {blogPosts[blogPosts.findIndex(p => p.id === post.id) - 1].title}
                    </p>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
