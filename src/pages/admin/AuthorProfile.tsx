import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Save, Upload, User, Globe, Twitter, Linkedin } from "lucide-react";
import { z } from "zod";

const profileSchema = z.object({
  display_name: z.string().min(2, "Display name must be at least 2 characters").max(100, "Display name too long"),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
  website_url: z.string().url("Invalid URL format").optional().or(z.literal("")),
  social_twitter: z.string().max(50, "Twitter handle too long").optional(),
  social_linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
});

const AuthorProfile = () => {
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

  // Fetch existing profile
  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
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
          // No profile exists yet - set defaults
          setDisplayName(user.email?.split("@")[0] || "Author");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({ title: "Failed to load profile", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id, toast]);

  // Handle avatar upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    // Validate file
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

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      setAvatarUrl(urlData.publicUrl);
      toast({ title: "Avatar uploaded successfully" });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({ title: "Failed to upload avatar", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  // Validate form
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

  // Save profile
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
        // Update existing profile
        const { error } = await supabase
          .from("profiles")
          .update(profileData)
          .eq("id", profileId);

        if (error) throw error;
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from("profiles")
          .insert(profileData)
          .select("id")
          .single();

        if (error) throw error;
        setProfileId(data.id);
      }

      toast({ title: "Profile saved successfully!" });
    } catch (error: any) {
      console.error("Save error:", error);
      toast({ title: "Failed to save profile", description: error.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Author Profile</h1>
        <p className="text-slate-400 mt-1">
          Manage your public author profile that appears on your blog posts.
        </p>
      </div>

      {/* Avatar Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Profile Picture</CardTitle>
          <CardDescription className="text-slate-400">
            This image will appear next to your posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl || undefined} alt={displayName} />
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label
                htmlFor="avatar-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg cursor-pointer transition-colors"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload Photo
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={isUploading}
              />
              <p className="text-xs text-slate-400">JPG, PNG or WebP. Max 2MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="display-name" className="text-slate-200">
              <User className="h-4 w-4 inline mr-2" />
              Display Name
            </Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name as shown on posts"
              className="bg-slate-700/50 border-slate-600 text-white"
            />
            {errors.display_name && (
              <p className="text-sm text-destructive">{errors.display_name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-slate-200">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short bio about yourself..."
              className="bg-slate-700/50 border-slate-600 text-white min-h-[120px]"
              maxLength={500}
            />
            <p className="text-xs text-slate-400">{bio.length}/500 characters</p>
            {errors.bio && <p className="text-sm text-destructive">{errors.bio}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Social Links</CardTitle>
          <CardDescription className="text-slate-400">
            Optional links shown on your author profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website" className="text-slate-200">
              <Globe className="h-4 w-4 inline mr-2" />
              Website
            </Label>
            <Input
              id="website"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="bg-slate-700/50 border-slate-600 text-white"
            />
            {errors.website_url && (
              <p className="text-sm text-destructive">{errors.website_url}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="text-slate-200">
              <Twitter className="h-4 w-4 inline mr-2" />
              Twitter Handle
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">@</span>
              <Input
                id="twitter"
                value={socialTwitter}
                onChange={(e) => setSocialTwitter(e.target.value.replace("@", ""))}
                placeholder="username"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            {errors.social_twitter && (
              <p className="text-sm text-destructive">{errors.social_twitter}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-slate-200">
              <Linkedin className="h-4 w-4 inline mr-2" />
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              value={socialLinkedin}
              onChange={(e) => setSocialLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="bg-slate-700/50 border-slate-600 text-white"
            />
            {errors.social_linkedin && (
              <p className="text-sm text-destructive">{errors.social_linkedin}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default AuthorProfile;
