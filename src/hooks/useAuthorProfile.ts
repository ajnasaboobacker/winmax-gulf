import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export const profileSchema = z.object({
  display_name: z.string().min(2, "Display name must be at least 2 characters").max(100, "Display name too long"),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
  website_url: z.string().url("Invalid URL format").optional().or(z.literal("")),
  social_twitter: z.string().max(50, "Twitter handle too long").optional(),
  social_linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
});

export type ProfileData = z.infer<typeof profileSchema>;

export const useAuthorProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  // Form state
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchProfile = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfileId(data.id);
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
        setAvatarUrl(data.avatar_url);
        setWebsiteUrl(data.website_url || "");
        setSocialTwitter(data.social_twitter || "");
        setSocialLinkedin(data.social_linkedin || "");
      } else {
        setDisplayName(user.email?.split("@")[0] || "Author");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({ title: "Failed to load profile", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, toast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleAvatarUpload = async (file: File) => {
    if (!user?.id) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Image must be less than 2MB", variant: "destructive" });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      setAvatarUrl(urlData.publicUrl);
      toast({ title: "Avatar uploaded successfully" });
      return urlData.publicUrl;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({ title: "Failed to upload avatar", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const validate = () => {
    try {
      profileSchema.parse({
        display_name: displayName,
        bio: bio || undefined,
        website_url: websiteUrl || undefined,
        social_twitter: socialTwitter || undefined,
        social_linkedin: socialLinkedin || undefined,
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

  const handleSave = async () => {
    if (!validate() || !user?.id) return;

    setIsSaving(true);

    try {
      const profileData = {
        user_id: user.id,
        display_name: displayName.trim(),
        bio: bio.trim() || null,
        avatar_url: avatarUrl,
        website_url: websiteUrl.trim() || null,
        social_twitter: socialTwitter.trim() || null,
        social_linkedin: socialLinkedin.trim() || null,
      };

      if (profileId) {
        const { error } = await supabase
          .from("profiles")
          .update(profileData)
          .eq("id", profileId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("profiles")
          .insert(profileData)
          .select("id")
          .single();

        if (error) throw error;
        setProfileId(data.id);
      }

      toast({ title: "Profile saved successfully!" });
      return true;
    } catch (error: any) {
      console.error("Save error:", error);
      toast({ title: "Failed to save profile", description: error.message, variant: "destructive" });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isLoading,
    isSaving,
    isUploading,
    displayName,
    setDisplayName,
    bio,
    setBio,
    avatarUrl,
    websiteUrl,
    setWebsiteUrl,
    socialTwitter,
    setSocialTwitter,
    socialLinkedin,
    setSocialLinkedin,
    errors,
    handleAvatarUpload,
    handleSave,
    refreshProfile: fetchProfile
  };
};
