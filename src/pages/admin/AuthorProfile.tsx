import { useAuthorProfile } from "@/hooks/useAuthorProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Save, Upload, User, Globe, Twitter, Linkedin } from "lucide-react";

const AuthorProfile = () => {
  const {
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
  } = useAuthorProfile();

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleAvatarUpload(file);
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
                onChange={onAvatarChange}
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

