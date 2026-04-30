import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Copy, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInternalLinks } from "@/hooks/useInternalLinks";

interface InternalLinkSuggestionsProps {
  focusKeyword: string;
  currentPostId?: string;
}

const InternalLinkSuggestions = ({ focusKeyword, currentPostId }: InternalLinkSuggestionsProps) => {
  const { suggestions, isLoading } = useInternalLinks(focusKeyword, currentPostId);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const { toast } = useToast();

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`/blog/${slug}`);
    setCopiedSlug(slug);
    toast({ title: "Link copied!", description: `/blog/${slug}` });
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  if (!focusKeyword.trim()) return null;

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2 text-sm">
          <Link2 className="h-4 w-4" />
          Internal Link Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Searching…
          </div>
        ) : suggestions.length === 0 ? (
          <p className="text-sm text-slate-400">No matching published posts found for "{focusKeyword}".</p>
        ) : (
          <div className="space-y-2">
            {suggestions.map((post) => (
              <div key={post.id} className="flex items-center justify-between gap-2 rounded-md border border-slate-600 bg-slate-700/30 p-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-200 truncate">{post.title}</p>
                  <p className="text-xs text-slate-400 truncate">/blog/{post.slug}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0 h-8 w-8 p-0"
                  onClick={() => copyLink(post.slug)}
                >
                  {copiedSlug === post.slug ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InternalLinkSuggestions;

