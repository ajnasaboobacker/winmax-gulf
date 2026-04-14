import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, BookOpen, Quote, ChevronLeft, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import Reveal from "@/components/Reveal";
import AntigravityCard from "@/components/AntigravityCard";
import { motion, useScroll, useSpring } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  no_index: boolean;
  author_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  website_url: string | null;
  social_twitter: string | null;
  social_linkedin: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleBackClick = () => {
    navigate("/blog");
  };

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .maybeSingle();
      
      if (error) throw error;
      return data as BlogPost | null;
    },
    enabled: !!slug,
  });

  const { data: categories } = useQuery({
    queryKey: ["post-categories", post?.id],
    queryFn: async () => {
      if (!post?.id) return [];
      const { data: postCategories } = await supabase
        .from("post_categories")
        .select("category_id")
        .eq("post_id", post.id);
      
      if (!postCategories || postCategories.length === 0) return [];
      
      const { data } = await supabase
        .from("blog_categories")
        .select("id, name, slug")
        .in("id", postCategories.map(pc => pc.category_id));
      
      return data as Category[] || [];
    },
    enabled: !!post?.id,
  });

  const { data: tags } = useQuery({
    queryKey: ["post-tags", post?.id],
    queryFn: async () => {
      if (!post?.id) return [];
      const { data: postTags } = await supabase
        .from("post_tags")
        .select("tag_id")
        .eq("post_id", post.id);
      
      if (!postTags || postTags.length === 0) return [];
      
      const { data } = await supabase
        .from("blog_tags")
        .select("id, name, slug")
        .in("id", postTags.map(pt => pt.tag_id));
      
      return data as Tag[] || [];
    },
    enabled: !!post?.id,
  });

  const { data: author } = useQuery({
    queryKey: ["post-author", post?.author_id],
    queryFn: async () => {
      if (!post?.author_id) return null;
      const { data } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, bio, website_url, social_twitter, social_linkedin")
        .eq("user_id", post.author_id)
        .maybeSingle();
      
      return data as Author | null;
    },
    enabled: !!post?.author_id,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", post?.id, categories],
    queryFn: async () => {
      if (!post?.id || !categories || categories.length === 0) return [];
      
      const categoryIds = categories.map(c => c.id);
      const { data: relatedPostIds } = await supabase
        .from("post_categories")
        .select("post_id")
        .in("category_id", categoryIds)
        .neq("post_id", post.id);
      
      if (!relatedPostIds || relatedPostIds.length === 0) return [];
      
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image_url, published_at")
        .in("id", relatedPostIds.map(rp => rp.post_id))
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false })
        .limit(3);
      
      return data || [];
    },
    enabled: !!post?.id && !!categories && categories.length > 0,
  });

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || "")}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Header />
        <div className="pt-40 pb-20 px-8">
          <div className="container mx-auto max-w-4xl">
            <Skeleton className="h-4 w-32 bg-white/5 mb-8" />
            <Skeleton className="h-16 w-full bg-white/5 mb-6" />
            <Skeleton className="h-6 w-1/3 bg-white/5 mb-12" />
            <Skeleton className="w-full aspect-video rounded-3xl bg-white/5 mb-12" />
            <div className="space-y-6">
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-3/4 bg-white/5" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Header />
        <div className="pt-40 pb-20 px-8">
          <div className="container mx-auto max-w-4xl text-center py-20 bg-white/[0.01] rounded-[3rem] border border-white/5">
            <div className="text-6xl mb-8">🔍</div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Article not found.</h1>
            <p className="text-white/40 mb-10 font-light text-lg">
              The requested article does not exist in our system.
            </p>
            <Button onClick={() => navigate('/blog')} variant="outline" className="rounded-xl px-10 border-white/10 hover:bg-white/5">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.meta_title || post.title,
    "description": post.meta_description || post.excerpt,
    "image": post.featured_image_url,
    "datePublished": post.published_at,
    "url": shareUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Winmax Gulf",
      "logo": "https://winmaxgulf.com/favicon.png"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    }
  };

  return (
    <>
      <SEOHead
        title={`${post.meta_title || post.title} | Winmax Gulf Perspectives`}
        description={post.meta_description || post.excerpt || ""}
        ogImage={post.featured_image_url || undefined}
        canonicalUrl={post.canonical_url || undefined}
        noIndex={post.no_index || false}
        structuredData={articleSchema}
      />
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-winmax-orange z-[100] origin-left"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-winmax-orange/30 font-sans">
        <Header />
        
        <div className="pt-24 border-b border-white/5">
           <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Article" }]} />
        </div>

        <article className="relative">
          {/* Spatial Background Effects */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-winmax-orange/[0.03] blur-[150px] rounded-full" />
             <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-blue-500/[0.02] blur-[120px] rounded-full" />
             <div className="absolute inset-0 antigravity-grid-pattern opacity-[0.02]" />
          </div>

          {/* Hero Header */}
          <header className="pt-24 pb-16 relative z-10 px-8">
            <div className="container mx-auto max-w-4xl">
              <Reveal>
                <button
                  onClick={handleBackClick}
                  className="inline-flex items-center gap-2 text-white/30 hover:text-winmax-orange transition-technical mb-12 group"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="technical-text text-[9px] group-hover:tracking-[0.4em] transition-all">Back to Blog</span>
                </button>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-3 mb-10">
                  {categories?.map((cat) => (
                    <span key={cat.id} className="px-4 py-1.5 bg-winmax-orange/10 border border-winmax-orange/25 text-[10px] font-bold text-winmax-orange uppercase tracking-widest rounded-full">
                       {cat.name}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <h1 className="text-4xl md:text-6xl font-bold leading-[0.95] tracking-tighter mb-10 text-white">
                  {post.title}
                </h1>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex flex-wrap items-center gap-10 border-t border-white/5 pt-10">
                   {author && (
                      <div className="flex items-center gap-4">
                         {author.avatar_url ? (
                           <img src={author.avatar_url} alt={author.display_name} className="w-12 h-12 rounded-full border border-white/10" />
                         ) : (
                           <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-winmax-orange font-bold">
                              {author.display_name.charAt(0)}
                           </div>
                         )}
                         <div>
                            <p className="text-[10px] technical-text text-white/20 mb-0.5">Contributor</p>
                            <p className="text-sm font-bold text-white/70">{author.display_name}</p>
                         </div>
                      </div>
                   )}
                   
                   <div className="flex items-center gap-10">
                      <div>
                         <p className="text-[10px] technical-text text-white/20 mb-0.5">Published</p>
                         <p className="text-sm font-bold text-white/70">{post.published_at ? format(new Date(post.published_at), "MMM dd, yyyy") : "N/A"}</p>
                      </div>
                      <div className="hidden sm:block">
                         <p className="text-[10px] technical-text text-white/20 mb-0.5">Verified</p>
                         <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-winmax-orange" />
                            <p className="text-sm font-bold text-white/70">Winmax Engineering</p>
                         </div>
                      </div>
                      <div>
                         <p className="text-[10px] technical-text text-white/20 mb-0.5">Reading Type</p>
                         <p className="text-sm font-bold text-white/70">{calculateReadingTime(post.content)} min read</p>
                      </div>
                   </div>
                </div>
              </Reveal>
            </div>
          </header>

          {/* Featured Visual */}
          {post.featured_image_url && (
            <div className="container mx-auto max-w-5xl px-8 mb-24 relative z-10">
               <Reveal delay={0.5}>
                 <div className="relative group rounded-[3rem] overflow-hidden border border-white/10 shadow-spatial">
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full aspect-[21/9] object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
               </Reveal>
            </div>
          )}

          {/* Content Body */}
          <div className="container mx-auto max-w-4xl px-8 relative z-10">
              <div className="flex flex-col lg:flex-row gap-20">
                 
                 {/* Article Content */}
                 <div className="flex-1">
                    <div
                      className="prose prose-invert prose-xl max-w-none mb-24
                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                        prose-p:text-white/60 prose-p:leading-[1.9] prose-p:font-light
                        prose-a:text-winmax-orange prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white prose-strong:font-bold
                        prose-blockquote:border-winmax-orange prose-blockquote:bg-white/[0.02] prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:italic prose-blockquote:text-white/80
                        prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10 prose-img:shadow-2xl
                        prose-ul:text-white/50 prose-li:marker:text-winmax-orange"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                    />

                    {/* Tags Ecosystem */}
                    {tags && tags.length > 0 && (
                      <div className="border-t border-white/5 pt-12 mt-20">
                        <div className="flex flex-wrap items-center gap-4">
                          <span className="technical-text text-white/20">Metadata Tags:</span>
                          {tags.map((tag) => (
                            <span key={tag.id} className="text-xs font-mono text-white/40 hover:text-winmax-orange cursor-pointer transition-colors">
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                 </div>

                 {/* Sticky Sidebar Info */}
                 <aside className="lg:w-64 space-y-16">
                    <div className="sticky top-40 space-y-12">
                       {/* Share Action */}
                       <div className="space-y-6">
                          <p className="technical-text text-winmax-orange/50">Share Article</p>
                          <div className="flex gap-4">
                             <button onClick={shareOnTwitter} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-winmax-orange hover:border-winmax-orange transition-all duration-500 group">
                                <Twitter className="w-4 h-4 text-white/40 group-hover:text-black" />
                             </button>
                             <button onClick={shareOnLinkedIn} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-winmax-orange hover:border-winmax-orange transition-all duration-500 group">
                                <Linkedin className="w-4 h-4 text-white/40 group-hover:text-black" />
                             </button>
                             <button onClick={shareOnFacebook} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-winmax-orange hover:border-winmax-orange transition-all duration-500 group">
                                <Facebook className="w-4 h-4 text-white/40 group-hover:text-black" />
                             </button>
                          </div>
                       </div>

                       {/* Author Compact Card */}
                       {author && (
                          <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 space-y-6">
                             <p className="technical-text text-white/20">Lead Author</p>
                             <div className="space-y-4 text-center">
                                {author.avatar_url ? (
                                   <img src={author.avatar_url} alt={author.display_name} className="w-20 h-20 rounded-full mx-auto border-2 border-winmax-orange/30 p-1" />
                                ) : (
                                   <div className="w-20 h-20 rounded-full bg-winmax-orange/10 mx-auto flex items-center justify-center text-winmax-orange text-2xl font-bold border border-winmax-orange/20">
                                      {author.display_name.charAt(0)}
                                   </div>
                                )}
                                <h4 className="font-bold text-white text-lg">{author.display_name}</h4>
                                <p className="text-xs text-white/40 leading-relaxed font-light">{author.bio}</p>
                             </div>
                          </div>
                       )}
                    </div>
                 </aside>
              </div>
          </div>

          {/* Related Explorations */}
          {relatedPosts && relatedPosts.length > 0 && (
            <footer className="mt-32 border-t border-white/5 pt-24 pb-20 px-8 bg-[#080808]">
              <div className="container mx-auto max-w-6xl">
                 <div className="flex items-center gap-4 mb-16">
                   <div className="w-12 h-px bg-winmax-orange" />
                   <h2 className="technical-text text-winmax-orange">Related Articles</h2>
                 </div>
                 <div className="grid md:grid-cols-3 gap-10">
                   {relatedPosts.map((rp) => (
                     <Link
                       key={rp.id}
                       to={`/blog/${rp.slug}`}
                       className="group flex flex-col h-full bg-[#111] rounded-3xl p-2 border border-white/5 hover:border-winmax-orange/30 transition-technical"
                     >
                       <div className="aspect-video rounded-[1.5rem] overflow-hidden bg-black isolation-auto">
                         {rp.featured_image_url ? (
                           <img
                             src={rp.featured_image_url}
                             alt={rp.title}
                             className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                           />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                             <BookOpen className="w-8 h-8 text-white/10" />
                           </div>
                         )}
                       </div>
                       <div className="p-6 pt-8 pb-10 flex flex-col flex-1">
                         <span className="text-[10px] font-bold text-winmax-orange/50 uppercase tracking-widest mb-4">Technical Recap</span>
                         <h3 className="font-bold text-white group-hover:text-winmax-orange transition-colors line-clamp-2 text-lg tracking-tight flex-1 min-h-[3.5rem]">
                           {rp.title}
                         </h3>
                         <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest group-hover:text-white/40">Read Article</span>
                            <ArrowLeft className="w-3 h-3 text-white/20 rotate-180 group-hover:text-winmax-orange transition-colors" />
                         </div>
                       </div>
                     </Link>
                   ))}
                 </div>
              </div>
            </footer>
          )}
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
