import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSlug } from "@/hooks/useSlug";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Loader2, 
  Calendar,
  X 
} from "lucide-react";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug too long"),
  excerpt: z.string().max(500, "Excerpt too long").optional(),
  content: z.string().min(1, "Content is required"),
  meta_title: z.string().max(60, "Meta title should be under 60 characters").optional(),
  meta_description: z.string().max(160, "Meta description should be under 160 characters").optional(),
});

type PostStatus = "draft" | "published" | "scheduled" | "archived";

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

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { generateSlug } = useSlug();
  const { toast } = useToast();

  const isEditing = Boolean(id);

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

  // Categories & Tags
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Fetch categories and tags
  useEffect(() => {
    const fetchData = async () => {
      const [catRes, tagRes] = await Promise.all([
        supabase.from("blog_categories").select("id, name, slug").order("name"),
        supabase.from("blog_tags").select("id, name, slug").order("name"),
      ]);

      if (catRes.data) setCategories(catRes.data);
      if (tagRes.data) setTags(tagRes.data);
    };

    fetchData();
  }, []);

  // Fetch existing post if editing
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const { data: post, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;
        if (!post) {
          toast({ title: "Post not found", variant: "destructive" });
          navigate("/admin/blog/posts");
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

        // Fetch post categories
        const { data: postCats } = await supabase
          .from("post_categories")
          .select("category_id")
          .eq("post_id", id);
        if (postCats) {
          setSelectedCategories(postCats.map((pc) => pc.category_id));
        }

        // Fetch post tags
        const { data: postTags } = await supabase
          .from("post_tags")
          .select("tag_id")
          .eq("post_id", id);
        if (postTags) {
          setSelectedTags(postTags.map((pt) => pt.tag_id));
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        toast({ title: "Failed to load post", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, toast]);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !slug) {
      setSlug(generateSlug(value));
    }
  };

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Toggle tag selection
  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Validate form
  const validate = () => {
    try {
      postSchema.parse({
        title,
        slug,
        excerpt: excerpt || undefined,
        content,
        meta_title: metaTitle || undefined,
        meta_description: metaDescription || undefined,
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
  };

  // Save post
  const savePost = useCallback(async (publishStatus?: PostStatus) => {
    if (!validate()) return;

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
        author_id: user?.id,
      };

      let postId = id;

      if (isEditing) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("blog_posts")
          .insert(postData)
          .select("id")
          .single();

        if (error) throw error;
        postId = data.id;
      }

      // Update categories
      await supabase.from("post_categories").delete().eq("post_id", postId);
      if (selectedCategories.length > 0) {
        await supabase.from("post_categories").insert(
          selectedCategories.map((catId) => ({
            post_id: postId,
            category_id: catId,
          }))
        );
      }

      // Update tags
      await supabase.from("post_tags").delete().eq("post_id", postId);
      if (selectedTags.length > 0) {
        await supabase.from("post_tags").insert(
          selectedTags.map((tagId) => ({
            post_id: postId,
            tag_id: tagId,
          }))
        );
      }

      setLastSaved(new Date());

      toast({
        title: saveStatus === "published" ? "Post published!" : "Post saved",
        description: saveStatus === "published" 
          ? "Your post is now live." 
          : "Draft saved successfully.",
      });

      if (!isEditing) {
        navigate(`/admin/blog/posts/${postId}`);
      }
    } catch (error: any) {
      console.error("Save error:", error);
      
      if (error.code === "23505") {
        setErrors({ slug: "This slug is already in use" });
        toast({ title: "Slug already exists", description: "Please choose a different slug.", variant: "destructive" });
      } else {
        toast({ title: "Failed to save", description: error.message, variant: "destructive" });
      }
    } finally {
      setIsSaving(false);
    }
  }, [title, slug, excerpt, content, featuredImage, status, scheduledFor, metaTitle, metaDescription, user, id, isEditing, selectedCategories, selectedTags, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/blog/posts")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isEditing ? "Edit Post" : "New Post"}
            </h1>
            {lastSaved && (
              <p className="text-sm text-slate-400">
                Last saved {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => savePost("draft")}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Draft
          </Button>
          <Button onClick={() => savePost("published")} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-200">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                  className="text-lg bg-slate-700/50 border-slate-600 text-white"
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-slate-200">Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">/blog/</span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor content={content} onChange={setContent} />
              {errors.content && <p className="text-sm text-destructive mt-2">{errors.content}</p>}
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Excerpt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the post..."
                className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
                maxLength={500}
              />
              <p className="text-xs text-slate-400 mt-1">{excerpt.length}/500 characters</p>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title" className="text-slate-200">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={title || "Enter meta title..."}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  maxLength={60}
                />
                <p className="text-xs text-slate-400">{metaTitle.length}/60 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-desc" className="text-slate-200">Meta Description</Label>
                <Textarea
                  id="meta-desc"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief description for search engines..."
                  className="bg-slate-700/50 border-slate-600 text-white"
                  maxLength={160}
                />
                <p className="text-xs text-slate-400">{metaDescription.length}/160 characters</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={status} onValueChange={(v) => setStatus(v as PostStatus)}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              {status === "scheduled" && (
                <div className="space-y-2">
                  <Label className="text-slate-200">Schedule For</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="datetime-local"
                      value={scheduledFor}
                      onChange={(e) => setScheduledFor(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload value={featuredImage} onChange={setFeaturedImage} />
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <p className="text-sm text-slate-400">No categories yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat.id}
                      variant={selectedCategories.includes(cat.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCategory(cat.id)}
                    >
                      {cat.name}
                      {selectedCategories.includes(cat.id) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              {tags.length === 0 ? (
                <p className="text-sm text-slate-400">No tags yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                      {selectedTags.includes(tag.id) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
