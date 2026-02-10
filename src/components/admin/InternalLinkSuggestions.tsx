import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Copy, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InternalLinkSuggestionsProps {
  focusKeyword: string;
  currentPostId?: string;
}

function getKeywordVariants(keyword: string): string[] {
  const kw = keyword.toLowerCase().trim();
  if (!kw) return [];
  const variants = new Set<string>([kw]);
  const words = kw.split(/\s+/);
  const lastWord = words[words.length - 1];
  const prefix = words.slice(0, -1).join(" ");
  const join = (w: string) => (prefix ? `${prefix} ${w}` : w);

  variants.add(join(lastWord + "s"));
  variants.add(join(lastWord + "es"));
  if (lastWord.endsWith("s") && lastWord.length > 2) variants.add(join(lastWord.slice(0, -1)));
  if (lastWord.endsWith("es") && lastWord.length > 3) variants.add(join(lastWord.slice(0, -2)));
  if (lastWord.endsWith("ies")) variants.add(join(lastWord.slice(0, -3) + "y"));
  if (lastWord.endsWith("y") && !lastWord.endsWith("ay") && !lastWord.endsWith("ey") && !lastWord.endsWith("oy") && !lastWord.endsWith("uy")) {
    variants.add(join(lastWord.slice(0, -1) + "ies"));
  }
  return Array.from(variants);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

interface SuggestedPost {
  id: string;
  title: string;
  slug: string;
}

const InternalLinkSuggestions = ({ focusKeyword, currentPostId }: InternalLinkSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<SuggestedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const { toast } = useToast();

  const variants = useMemo(() => getKeywordVariants(focusKeyword), [focusKeyword]);

  useEffect(() => {
    if (!focusKeyword.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, content")
          .eq("status", "published");

        if (currentPostId) {
          query = query.neq("id", currentPostId);
        }

        const { data } = await query.limit(50);
        if (!data) { setSuggestions([]); return; }

        const matched = data.filter((post) => {
          const haystack = `${post.title} ${post.excerpt || ""} ${stripHtml(post.content || "")}`.toLowerCase();
          return variants.some((v) => haystack.includes(v));
        }).slice(0, 5).map(({ id, title, slug }) => ({ id, title, slug }));

        setSuggestions(matched);
      } catch (err) {
        console.error("Error fetching link suggestions:", err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [focusKeyword, variants, currentPostId]);

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
