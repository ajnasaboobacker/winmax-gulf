import { useNavigate, useParams } from "react-router-dom";
import { usePostEditor, PostStatus } from "@/hooks/usePostEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SEOScorePanel from "@/components/admin/SEOScorePanel";
import InternalLinkSuggestions from "@/components/admin/InternalLinkSuggestions";
import ImageUpload from "@/components/admin/ImageUpload";
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Loader2, 
  Calendar,
  X,
  AlertTriangle 
} from "lucide-react";

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isEditing,
    title,
    setTitle,
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
  } = usePostEditor(id);

  const handleSaveAction = async (publishStatus?: PostStatus) => {
    const savedId = await savePost(publishStatus);
    if (savedId && !isEditing) {
      navigate(`/admin/blog/posts/${savedId}`);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            onClick={() => handleSaveAction("draft")}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Draft
          </Button>
          <Button onClick={() => handleSaveAction("published")} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-200">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor content={content} onChange={setContent} />
              {errors.content && <p className="text-sm text-destructive mt-2">{errors.content}</p>}
            </CardContent>
          </Card>

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

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="focus-keyword" className="text-slate-200">Focus Keyword</Label>
                <Input
                  id="focus-keyword"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder='e.g. "PDLC smart film UAE"'
                  className="bg-slate-700/50 border-slate-600 text-white"
                  maxLength={100}
                />
              </div>

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
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical-url" className="text-slate-200">Canonical URL</Label>
                <Input
                  id="canonical-url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://example.com/original-article"
                  className="bg-slate-700/50 border-slate-600 text-white"
                  maxLength={500}
                />
                {errors.canonical_url && <p className="text-sm text-destructive">{errors.canonical_url}</p>}
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-600 p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="no-index" className="text-slate-200">Noindex / Nofollow</Label>
                  <p className="text-xs text-slate-400">Hide this post from search engines</p>
                </div>
                <Switch
                  id="no-index"
                  checked={noIndex}
                  onCheckedChange={setNoIndex}
                />
              </div>
              {noIndex && (
                <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-400/10 rounded-md p-3">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <span>This post will be hidden from search engines.</span>
                </div>
              )}

              <SEOScorePanel
                title={title}
                slug={slug}
                content={content}
                excerpt={excerpt}
                metaTitle={metaTitle}
                metaDescription={metaDescription}
                focusKeyword={focusKeyword}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
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

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Author</CardTitle>
            </CardHeader>
            <CardContent>
              {currentAuthor ? (
                <div className="flex items-center gap-3">
                  {currentAuthor.avatar_url ? (
                    <img
                      src={currentAuthor.avatar_url}
                      alt={currentAuthor.display_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                      {currentAuthor.display_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{currentAuthor.display_name}</p>
                    {currentAuthor.bio && (
                      <p className="text-slate-400 text-sm line-clamp-1">{currentAuthor.bio}</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400">No author profile found.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload value={featuredImage} onChange={setFeaturedImage} />
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat.id}
                    variant={selectedCategories.includes(cat.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(cat.id)}
                  >
                    {cat.name}
                    {selectedCategories.includes(cat.id) && <X className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                    {selectedTags.includes(tag.id) && <X className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <InternalLinkSuggestions focusKeyword={focusKeyword} currentPostId={id} />
        </div>
      </div>
    </div>
  );
};

export default PostEditor;

