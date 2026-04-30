import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSlug } from "@/hooks/useSlug";
import { useToast } from "@/hooks/use-toast";

interface TaxonomyItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at: string;
}

export const useTaxonomy = (tableName: "blog_categories" | "blog_tags") => {
  const [items, setItems] = useState<TaxonomyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TaxonomyItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const { generateSlug } = useSlug();
  const { toast } = useToast();

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("name");

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error(`Error fetching from ${tableName}:`, error);
      toast({ title: `Failed to load ${tableName.replace("blog_", "")}`, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [tableName, toast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreateDialog = () => {
    setEditingItem(null);
    setName("");
    setSlug("");
    setDescription("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: TaxonomyItem) => {
    setEditingItem(item);
    setName(item.name);
    setSlug(item.slug);
    setDescription(item.description || "");
    setIsDialogOpen(true);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!editingItem) {
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
      const itemData: any = {
        name: name.trim(),
        slug: slug.trim(),
      };
      
      if (tableName === "blog_categories") {
        itemData.description = description.trim() || null;
      }

      if (editingItem) {
        const { error } = await supabase
          .from(tableName)
          .update(itemData)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast({ title: "Updated successfully" });
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert(itemData);

        if (error) throw error;
        toast({ title: "Created successfully" });
      }

      setIsDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      console.error("Save error:", error);
      if (error.code === "23505") {
        toast({ title: "Slug already exists", variant: "destructive" });
      } else {
        toast({ title: "Failed to save", variant: "destructive" });
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
        .from(tableName)
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setItems((prev) => prev.filter((i) => i.id !== deleteId));
      toast({ title: "Deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return {
    items,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    editingItem,
    deleteId,
    setDeleteId,
    isSaving,
    isDeleting,
    name,
    setName: handleNameChange,
    slug,
    setSlug,
    description,
    setDescription,
    openCreateDialog,
    openEditDialog,
    handleSave,
    handleDelete,
  };
};
