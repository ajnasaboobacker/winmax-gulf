import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Search, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import Reveal from "@/components/Reveal";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  author_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["public-blog-posts", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image_url, published_at, author_id")
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

      if (selectedCategory) {
        const { data: postIds } = await supabase
          .from("post_categories")
          .select("post_id")
          .eq("category_id", selectedCategory);
        
        if (postIds && postIds.length > 0) {
          query = query.in("id", postIds.map(p => p.post_id));
        } else {
          return [];
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("id, name, slug")
        .order("name");
      if (error) throw error;
      return data as Category[];
    },
  });

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Winmax Gulf Blog",
    "description": "Professional insights and corporate news on smart film and glass, specialized AV engineering, and solar infrastructure.",
    "url": "https://winmaxgulf.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Winmax Gulf",
      "logo": "https://winmaxgulf.com/favicon.png"
    }
  };

  return (
    <>
      <SEOHead
        title="Blog | Winmax Gulf - Corporate Insights"
        description="Official blog covering PDLC smart film and glass solutions, specialized AV engineering, and solar infrastructure in the UAE."
        structuredData={blogSchema}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-winmax-orange/30 font-sans">
        <Header />
        
        <div className="pt-24 border-b border-white/5">
           <Breadcrumbs items={[{ label: "Blog" }]} />
        </div>
        
        {/* Architectural Hero */}
        <section className="pt-40 pb-32 px-8 relative overflow-hidden">
          {/* Spatial Design Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-winmax-orange/[0.02] blur-[120px]" />
            <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-blue-500/[0.01] blur-[100px]" />
            <div className="absolute inset-0 antigravity-grid-pattern opacity-[0.03]" />
          </div>

          <div className="container mx-auto max-w-6xl relative z-10 text-center md:text-left">
            <Reveal>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                <div className="w-12 h-px bg-winmax-orange" />
                <span className="technical-text text-winmax-orange">Winmax Gulf Blog</span>
              </div>
            </Reveal>
            
            <div className="grid lg:grid-cols-2 gap-16 items-end">
               <div>
                  <Reveal delay={0.1}>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-8">
                       ARCHITECTURAL<br />
                       <span className="text-white/30">INTELLIGENCE.</span>
                    </h1>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="text-xl text-white/50 max-w-xl font-light leading-relaxed">
                      Professional insights, corporate updates, and engineering perspectives on the future of responsive environments.
                    </p>
                  </Reveal>
               </div>

               <div className="flex flex-col md:flex-row gap-6 items-center lg:justify-end">
                  <Reveal delay={0.3}>
                    <div className="relative w-full md:w-80 group">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-winmax-orange transition-colors" />
                      <input
                        type="text"
                        placeholder="Search blog..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-white/20 font-medium text-sm focus:outline-none focus:border-winmax-orange/40 transition-technical"
                      />
                    </div>
                  </Reveal>
               </div>
            </div>
          </div>
        </section>

        {/* Global Catalog Filter */}
        {categories && categories.length > 0 && (
          <section className="pb-12 px-8">
            <div className="container mx-auto max-w-6xl">
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                   <span className="technical-text text-white/20 mr-4 hidden md:block">Filter by Division:</span>
                   <button
                     className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest border rounded-xl transition-all duration-500 ${
                       selectedCategory === null
                         ? "bg-winmax-orange text-black border-winmax-orange shadow-[0_10px_20px_rgba(255,90,0,0.2)]"
                         : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white"
                     }`}
                     onClick={() => setSelectedCategory(null)}
                   >
                     All Articles
                   </button>
                   {categories.map((category) => (
                     <button
                       key={category.id}
                       className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest border rounded-xl transition-all duration-500 ${
                         selectedCategory === category.id
                           ? "bg-winmax-orange text-black border-winmax-orange shadow-[0_10px_20px_rgba(255,90,0,0.2)]"
                           : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white"
                       }`}
                       onClick={() => setSelectedCategory(category.id)}
                     >
                       {category.name}
                     </button>
                   ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* The Journal Grid */}
        <section className="py-24 px-8 border-t border-white/5 bg-[#080808]">
          <div className="container mx-auto max-w-6xl">
            {postsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/[0.02] rounded-3xl overflow-hidden border border-white/5 p-2">
                    <Skeleton className="w-full aspect-[4/3] bg-white/5 rounded-2xl" />
                    <div className="p-8 space-y-4">
                      <Skeleton className="h-4 w-1/4 bg-white/5" />
                      <Skeleton className="h-8 w-full bg-white/5" />
                      <Skeleton className="h-20 w-full bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                {filteredPosts.map((post, idx) => (
                  <Reveal key={post.id} delay={idx * 0.1} width="100%" className="h-full">
                    <article className="group relative flex flex-col h-full bg-[#111] rounded-[2.5rem] p-2 border border-white/5 hover:border-winmax-orange/30 transition-technical hover:shadow-spatial hover:-translate-y-2">
                      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                        {/* Featured Visual */}
                        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-black isolation-auto shrink-0">
                          {post.featured_image_url ? (
                            <img
                              src={post.featured_image_url}
                              alt={post.title}
                              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                              <BookOpen className="w-12 h-12 text-white/10" />
                            </div>
                          )}
                          {/* Division Label */}
                          <div className="absolute top-6 left-6">
                             <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                                <span className="technical-text text-[8px] text-white/50">Article</span>
                             </div>
                          </div>
                        </div>

                        {/* Article Content */}
                        <div className="p-8 pb-10 flex flex-col flex-grow">
                          <div className="flex items-center gap-4 text-[10px] font-bold text-winmax-orange/60 uppercase tracking-[0.2em] mb-6">
                            {post.published_at && (
                              <span className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(post.published_at), "MM.dd.yyyy")}
                              </span>
                            )}
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="flex items-center gap-2">
                               <Clock className="h-3 w-3" />
                               5 min Read
                            </span>
                          </div>
                          
                          <h2 className="text-2xl font-bold mb-5 text-white group-hover:text-winmax-orange transition-colors line-clamp-2 tracking-tight leading-tight min-h-[4rem]">
                            {post.title}
                          </h2>
                          
                          {post.excerpt && (
                            <p className="text-sm text-white/40 font-light leading-relaxed line-clamp-3 mb-8 min-h-[4.5rem]">
                              {post.excerpt}
                            </p>
                          )}
                          
                          <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                             <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] group-hover:text-winmax-orange group-hover:tracking-[0.4em] transition-all duration-500">
                                Read Article
                             </span>
                             <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-winmax-orange group-hover:border-winmax-orange transition-all duration-500">
                                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                             </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/10">
                <div className="w-24 h-24 bg-winmax-orange/5 rounded-3xl border border-winmax-orange/10 flex items-center justify-center mx-auto mb-10">
                  <BookOpen className="w-10 h-10 text-winmax-orange/20" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-4 text-white/80">No Articles Found</h3>
                <p className="text-white/30 font-light text-lg">
                  {searchQuery
                    ? "Adjust your search to find more results."
                    : "The team is currently preparing new content."}
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
