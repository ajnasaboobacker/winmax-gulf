import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { format } from "date-fns";

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

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

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || "")}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-1/3 mb-8" />
            <Skeleton className="w-full h-96 rounded-lg mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button variant="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
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
      "name": "WinmaxGulf",
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
        title={`${post.meta_title || post.title} | WinmaxGulf Blog`}
        description={post.meta_description || post.excerpt || ""}
        keywords={tags?.map(t => t.name).join(", ") || ""}
        ogImage={post.featured_image_url || undefined}
        structuredData={articleSchema}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <article className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Back Link */}
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2 mb-8 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </button>

            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <Badge key={category.id} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              {post.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {calculateReadingTime(post.content)} min read
              </span>
            </div>

            {/* Featured Image */}
            {post.featured_image_url && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8 bg-muted">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-invert prose-lg max-w-none mb-12
                prose-headings:text-foreground prose-headings:font-bold
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
                prose-pre:bg-card prose-pre:border prose-pre:border-border
                prose-img:rounded-lg prose-img:mx-auto
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:marker:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="border-t border-border pt-6 mb-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Tags:</span>
                  {tags.map((tag) => (
                    <Badge key={tag.id} variant="outline" className="text-xs">
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="border-t border-border pt-6 mb-12">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  Share this article:
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={shareOnTwitter}
                    className="hover:bg-primary/10 hover:border-primary"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={shareOnFacebook}
                    className="hover:bg-primary/10 hover:border-primary"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={shareOnLinkedIn}
                    className="hover:bg-primary/10 hover:border-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <section className="border-t border-border pt-12">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="aspect-video overflow-hidden bg-muted">
                        {relatedPost.featured_image_url ? (
                          <img
                            src={relatedPost.featured_image_url}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <span className="text-2xl">📝</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
