import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSlug } from "@/hooks/useSlug";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Tags as TagsIcon, Loader2 } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

const BlogTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const { generateSlug } = useSlug();
  const { toast } = useToast();

  const fetchTags = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_tags")
        .select("*")
        .order("name");

      if (error) throw error;
      setTags(data || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast({ title: "Failed to load tags", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const openCreateDialog = () => {
    setEditingTag(null);
    setName("");
    setSlug("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (tag: Tag) => {
    setEditingTag(tag);
    setName(tag.name);
    setSlug(tag.slug);
    setIsDialogOpen(true);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!editingTag) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !slug.trim()) {
      toast({ title: "Name and slug are required", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      const tagData = {
        name: name.trim(),
        slug: slug.trim(),
      };

      if (editingTag) {
        const { error } = await supabase
          .from("blog_tags")
          .update(tagData)
          .eq("id", editingTag.id);

        if (error) throw error;
        toast({ title: "Tag updated" });
      } else {
        const { error } = await supabase
          .from("blog_tags")
          .insert(tagData);

        if (error) throw error;
        toast({ title: "Tag created" });
      }

      setIsDialogOpen(false);
      fetchTags();
    } catch (error: unknown) {
      console.error("Save error:", error);
      const err = error as { code?: string; message: string };
      if (err.code === "23505") {
        toast({ title: "Slug already exists", variant: "destructive" });
      } else {
        toast({ title: "Failed to save tag", variant: "destructive" });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("blog_tags")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setTags((prev) => prev.filter((t) => t.id !== deleteId));
      toast({ title: "Tag deleted" });
    } catch (error) {
      console.error("Delete error:", error);
      toast({ title: "Failed to delete tag", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tags</h1>
          <p className="text-slate-400 mt-1">
            Manage tags for your blog posts
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          New Tag
        </Button>
      </div>

      {/* Tags List */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : tags.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <TagsIcon className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No tags yet</h3>
          <p className="text-slate-400 mb-4">Create tags to help categorize your posts</p>
          <Button onClick={openCreateDialog}>Create Tag</Button>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2"
              >
                <Badge variant="secondary" className="text-sm">
                  {tag.name}
                </Badge>
                <div className="flex items-center gap-1 border-l border-slate-600 pl-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => openEditDialog(tag)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => setDeleteId(tag.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingTag ? "Edit Tag" : "New Tag"}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {editingTag ? "Update tag details" : "Create a new tag for your posts"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tag-name" className="text-slate-200">Name</Label>
              <Input
                id="tag-name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Tag name"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag-slug" className="text-slate-200">Slug</Label>
              <Input
                id="tag-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="tag-slug"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {editingTag ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Tag</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure? This tag will be removed from all posts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogTags;
