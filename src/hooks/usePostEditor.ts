import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSlug } from "@/hooks/useSlug";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug too long"),
  excerpt: z.string().max(500, "Excerpt too long").optional(),
  content: z.string().min(1, "Content is required"),
  meta_title: z.string().max(60, "Meta title should be under 60 characters").optional(),
  meta_description: z.string().max(160, "Meta description should be under 160 characters").optional(),
  focus_keyword: z.string().max(100, "Focus keyword too long").optional(),
  canonical_url: z.string().max(500, "Canonical URL too long").url("Must be a valid URL").optional().or(z.literal("")),
});

export type PostStatus = "draft" | "published" | "scheduled" | "archived";

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
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
}

export const usePostEditor = (postId?: string) => {
  const { user } = useAuth();
  const { generateSlug } = useSlug();
  const { toast } = useToast();

  const isEditing = Boolean(postId);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | undefined>();
  const [status, setStatus] = useState<PostStatus>("draft");
  const [scheduledFor, setScheduledFor] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [noIndex, setNoIndex] = useState(false);

  // Categories, Tags & Author
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      const [catRes, tagRes] = await Promise.all([
        supabase.from("blog_categories").select("id, name, slug").order("name"),
        supabase.from("blog_tags").select("id, name, slug").order("name"),
      ]);

      if (catRes.data) setCategories(catRes.data);
      if (tagRes.data) setTags(tagRes.data);

      if (user?.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, user_id, display_name, avatar_url, bio")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (profile) {
          setCurrentAuthor(profile as Author);
        }
      }
    };

    fetchData();
  }, [user?.id]);

  // Fetch existing post
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const { data: post, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", postId)
          .maybeSingle();

        if (error) throw error;
        if (!post) {
          toast({ title: "Post not found", variant: "destructive" });
          return;
        }

        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || "");
        setContent(post.content);
        setFeaturedImage(post.featured_image_url || undefined);
        setStatus(post.status as PostStatus);
        setScheduledFor(post.scheduled_for ? post.scheduled_for.slice(0, 16) : "");
        setMetaTitle(post.meta_title || "");
        setMetaDescription(post.meta_description || "");
        setFocusKeyword(post.focus_keyword || "");
        setCanonicalUrl(post.canonical_url || "");
        setNoIndex(post.no_index || false);

        // Fetch relations
        const [postCats, postTags] = await Promise.all([
          supabase.from("post_categories").select("category_id").eq("post_id", postId),
          supabase.from("post_tags").select("tag_id").eq("post_id", postId),
        ]);

        if (postCats.data) setSelectedCategories(postCats.data.map((pc) => pc.category_id));
        if (postTags.data) setSelectedTags(postTags.data.map((pt) => pt.tag_id));
      } catch (error) {
        console.error("Error fetching post:", error);
        toast({ title: "Failed to load post", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, toast]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !slug) {
      setSlug(generateSlug(value));
    }
  };

  const validate = useCallback(() => {
    try {
      postSchema.parse({
        title,
        slug,
        excerpt: excerpt || undefined,
        content,
        meta_title: metaTitle || undefined,
        meta_description: metaDescription || undefined,
        focus_keyword: focusKeyword || undefined,
        canonical_url: canonicalUrl || undefined,
      });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) {
            newErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [title, slug, excerpt, content, metaTitle, metaDescription, focusKeyword, canonicalUrl]);

  const savePost = async (publishStatus?: PostStatus) => {
    if (!validate()) return null;

    setIsSaving(true);
    const saveStatus = publishStatus || status;

    try {
      const postData = {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featured_image_url: featuredImage || null,
        status: saveStatus,
        scheduled_for: saveStatus === "scheduled" && scheduledFor ? scheduledFor : null,
        published_at: saveStatus === "published" ? new Date().toISOString() : null,
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        focus_keyword: focusKeyword || null,
        canonical_url: canonicalUrl || null,
        no_index: noIndex,
        author_id: user?.id,
      };

      let finalPostId = postId;

      if (isEditing && postId) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", postId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("blog_posts")
          .insert(postData)
          .select("id")
          .single();

        if (error) throw error;
        finalPostId = data.id;
      }

      // Sync Categories
      await supabase.from("post_categories").delete().eq("post_id", finalPostId);
      if (selectedCategories.length > 0) {
        await supabase.from("post_categories").insert(
          selectedCategories.map((catId) => ({
            post_id: finalPostId,
            category_id: catId,
          }))
        );
      }

      // Sync Tags
      await supabase.from("post_tags").delete().eq("post_id", finalPostId);
      if (selectedTags.length > 0) {
        await supabase.from("post_tags").insert(
          selectedTags.map((tagId) => ({
            post_id: finalPostId,
            tag_id: tagId,
          }))
        );
      }

      setLastSaved(new Date());
      toast({
        title: saveStatus === "published" ? "Post published!" : "Post saved",
        description: saveStatus === "published" ? "Your post is now live." : "Draft saved successfully.",
      });

      return finalPostId;
    } catch (error: any) {
      console.error("Save error:", error);
      if (error.code === "23505") {
        setErrors({ slug: "This slug is already in use" });
        toast({ title: "Slug already exists", variant: "destructive" });
      } else {
        toast({ title: "Failed to save", description: error.message, variant: "destructive" });
      }
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isEditing,
    title,
    setTitle: handleTitleChange,
    slug,
    setSlug,
    excerpt,
    setExcerpt,
    content,
    setContent,
    featuredImage,
    setFeaturedImage,
    status,
    setStatus,
    scheduledFor,
    setScheduledFor,
    metaTitle,
    setMetaTitle,
    metaDescription,
    setMetaDescription,
    focusKeyword,
    setFocusKeyword,
    canonicalUrl,
    setCanonicalUrl,
    noIndex,
    setNoIndex,
    categories,
    tags,
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    currentAuthor,
    isLoading,
    isSaving,
    errors,
    lastSaved,
    savePost
  };
};
