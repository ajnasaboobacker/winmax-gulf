import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SuggestedPost {
  id: string;
  title: string;
  slug: string;
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

export const useInternalLinks = (focusKeyword: string, currentPostId?: string) => {
  const [suggestions, setSuggestions] = useState<SuggestedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        if (!data) {
          setSuggestions([]);
          return;
        }

        const matched = data
          .filter((post) => {
            const haystack = `${post.title} ${post.excerpt || ""} ${stripHtml(post.content || "")}`.toLowerCase();
            return variants.some((v) => haystack.includes(v));
          })
          .slice(0, 5)
          .map(({ id, title, slug }) => ({ id, title, slug }));

        setSuggestions(matched);
      } catch (err) {
        console.error("Error fetching link suggestions:", err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [focusKeyword, variants, currentPostId]);

  return { suggestions, isLoading };
};
