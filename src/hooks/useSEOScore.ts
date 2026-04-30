import { useMemo } from "react";

interface SEOCheck {
  label: string;
  passed: boolean;
  type: "basic" | "geo" | "ai";
}

interface useSEOScoreProps {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(text: string): number {
  const plain = stripHtml(text);
  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
}

function getFirstParagraph(html: string): string {
  const match = html.match(/<p[^>]*>(.*?)<\/p>/i);
  return match ? stripHtml(match[1]) : stripHtml(html).slice(0, 300);
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

function textIncludesVariant(text: string, variants: string[]): boolean {
  const lower = text.toLowerCase();
  return variants.some((v) => lower.includes(v));
}

function countVariantOccurrences(text: string, variants: string[]): number {
  const lower = text.toLowerCase();
  let total = 0;
  for (const v of variants) {
    let idx = 0;
    while ((idx = lower.indexOf(v, idx)) !== -1) {
      total++;
      idx += v.length;
    }
  }
  return total;
}

export const useSEOScore = ({
  title,
  slug,
  content,
  excerpt,
  metaTitle,
  metaDescription,
  focusKeyword,
}: useSEOScoreProps) => {
  const plainContent = useMemo(() => stripHtml(content), [content]);
  const wordCount = useMemo(() => countWords(content), [content]);
  const variants = useMemo(() => getKeywordVariants(focusKeyword), [focusKeyword]);
  const slugVariants = useMemo(() => variants.map(v => v.replace(/\s+/g, "-")), [variants]);

  const checks = useMemo<SEOCheck[]>(() => {
    const hasKw = variants.length > 0 && focusKeyword.trim().length > 0;
    const firstPara = getFirstParagraph(content);
    
    // AI/GEO Specific checks
    const hasQuestionHeading = /<h[1-3][^>]*>.*?\?.*?<\/h[1-3]>/i.test(content);
    const paragraphs = content.match(/<p[^>]*>.*?<\/p>/gi) || [];
    const hasOptimalPassage = paragraphs.some(p => {
      const words = stripHtml(p).split(/\s+/).filter(Boolean).length;
      return words >= 134 && words <= 167;
    });

    return [
      { label: "Focus keyword in title", passed: hasKw && textIncludesVariant(title, variants), type: "basic" },
      { label: "Focus keyword in slug", passed: hasKw && textIncludesVariant(slug, slugVariants), type: "basic" },
      { label: "Focus keyword in meta title", passed: hasKw && textIncludesVariant(metaTitle, variants), type: "basic" },
      { label: "Focus keyword in meta description", passed: hasKw && textIncludesVariant(metaDescription, variants), type: "basic" },
      { label: "Focus keyword in excerpt", passed: hasKw && textIncludesVariant(excerpt, variants), type: "basic" },
      { label: "Focus keyword in first paragraph", passed: hasKw && textIncludesVariant(firstPara, variants), type: "basic" },
      { label: "Meta title length (50–60 chars)", passed: metaTitle.length >= 50 && metaTitle.length <= 60, type: "basic" },
      { label: "Meta description length (120–160 chars)", passed: metaDescription.length >= 120 && metaDescription.length <= 160, type: "basic" },
      { label: "Content length (300+ words)", passed: wordCount >= 300, type: "basic" },
      { label: "Excerpt is filled in", passed: excerpt.trim().length > 0, type: "basic" },
      // GEO Checks
      { label: "Question-based heading found", passed: hasQuestionHeading, type: "geo" },
      { label: "Optimal AI citation passage (134-167 words)", passed: hasOptimalPassage, type: "geo" },
    ];
  }, [focusKeyword, variants, slugVariants, title, slug, metaTitle, metaDescription, excerpt, content, wordCount]);

  const score = useMemo(() => {
    if (checks.length === 0) return 0;
    return Math.round((checks.filter((c) => c.passed).length / checks.length) * 100);
  }, [checks]);

  const { occurrences, density } = useMemo(() => {
    if (!focusKeyword.trim() || wordCount === 0) return { occurrences: 0, density: 0 };
    const count = countVariantOccurrences(plainContent, variants);
    return { occurrences: count, density: (count / wordCount) * 100 };
  }, [focusKeyword, plainContent, wordCount, variants]);

  const densityStatus = useMemo(() => {
    if (!focusKeyword.trim()) return "neutral";
    if (density >= 0.5 && density <= 2.5) return "good";
    if (density < 0.5) return "low";
    return "high";
  }, [focusKeyword, density]);

  return {
    score,
    checks,
    wordCount,
    occurrences,
    density,
    densityStatus,
    variants
  };
};
