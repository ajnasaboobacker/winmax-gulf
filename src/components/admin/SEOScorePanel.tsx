import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface SEOScorePanelProps {
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

/**
 * Generate keyword variants: plurals (add/remove trailing s/es),
 * and common suffix swaps so "smart glass" also matches "smart glasses".
 */
function getKeywordVariants(keyword: string): string[] {
  const kw = keyword.toLowerCase().trim();
  if (!kw) return [];

  const variants = new Set<string>([kw]);
  const words = kw.split(/\s+/);

  // Generate variants by modifying the last word (most common for plurals)
  const lastWord = words[words.length - 1];
  const prefix = words.slice(0, -1).join(" ");
  const join = (w: string) => (prefix ? `${prefix} ${w}` : w);

  // Add 's'
  variants.add(join(lastWord + "s"));
  // Add 'es'
  variants.add(join(lastWord + "es"));
  // Remove trailing 's'
  if (lastWord.endsWith("s") && lastWord.length > 2) {
    variants.add(join(lastWord.slice(0, -1)));
  }
  // Remove trailing 'es'
  if (lastWord.endsWith("es") && lastWord.length > 3) {
    variants.add(join(lastWord.slice(0, -2)));
  }
  // 'ies' <-> 'y'
  if (lastWord.endsWith("ies")) {
    variants.add(join(lastWord.slice(0, -3) + "y"));
  }
  if (lastWord.endsWith("y") && !lastWord.endsWith("ay") && !lastWord.endsWith("ey") && !lastWord.endsWith("oy") && !lastWord.endsWith("uy")) {
    variants.add(join(lastWord.slice(0, -1) + "ies"));
  }

  return Array.from(variants);
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

function textIncludesVariant(text: string, variants: string[]): boolean {
  const lower = text.toLowerCase();
  return variants.some((v) => lower.includes(v));
}

interface Check {
  label: string;
  passed: boolean;
}

const SEOScorePanel = ({
  title,
  slug,
  content,
  excerpt,
  metaTitle,
  metaDescription,
  focusKeyword,
}: SEOScorePanelProps) => {
  const plainContent = useMemo(() => stripHtml(content), [content]);
  const wordCount = useMemo(() => countWords(content), [content]);

  const variants = useMemo(() => getKeywordVariants(focusKeyword), [focusKeyword]);
  const slugVariants = useMemo(() => variants.map(v => v.replace(/\s+/g, "-")), [variants]);

  const checks = useMemo<Check[]>(() => {
    const hasKw = variants.length > 0 && focusKeyword.trim().length > 0;

    return [
      {
        label: "Focus keyword in title",
        passed: hasKw && textIncludesVariant(title, variants),
      },
      {
        label: "Focus keyword in slug",
        passed: hasKw && textIncludesVariant(slug, slugVariants),
      },
      {
        label: "Focus keyword in meta title",
        passed: hasKw && textIncludesVariant(metaTitle, variants),
      },
      {
        label: "Focus keyword in meta description",
        passed: hasKw && textIncludesVariant(metaDescription, variants),
      },
      {
        label: "Focus keyword in excerpt",
        passed: hasKw && textIncludesVariant(excerpt, variants),
      },
      {
        label: "Focus keyword in first paragraph",
        passed: hasKw && textIncludesVariant(getFirstParagraph(content), variants),
      },
      {
        label: "Meta title length (50–60 chars)",
        passed: metaTitle.length >= 50 && metaTitle.length <= 60,
      },
      {
        label: "Meta description length (120–160 chars)",
        passed: metaDescription.length >= 120 && metaDescription.length <= 160,
      },
      {
        label: "Content length (300+ words)",
        passed: wordCount >= 300,
      },
      {
        label: "Excerpt is filled in",
        passed: excerpt.trim().length > 0,
      },
    ];
  }, [focusKeyword, variants, slugVariants, title, slug, metaTitle, metaDescription, excerpt, content, wordCount]);

  const score = useMemo(() => {
    if (checks.length === 0) return 0;
    return Math.round((checks.filter((c) => c.passed).length / checks.length) * 100);
  }, [checks]);

  // Keyword density (counts all variants)
  const { occurrences, density } = useMemo(() => {
    if (!focusKeyword.trim() || wordCount === 0) return { occurrences: 0, density: 0 };
    const count = countVariantOccurrences(plainContent, variants);
    return { occurrences: count, density: (count / wordCount) * 100 };
  }, [focusKeyword, plainContent, wordCount]);

  const scoreColor =
    score >= 70 ? "text-green-400" : score >= 40 ? "text-yellow-400" : "text-red-400";
  const progressColor =
    score >= 70 ? "[&>div]:bg-green-500" : score >= 40 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500";

  const densityStatus =
    !focusKeyword.trim()
      ? "neutral"
      : density >= 0.5 && density <= 2.5
        ? "good"
        : density < 0.5
          ? "low"
          : "high";

  if (!focusKeyword.trim()) {
    return (
      <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4">
        <p className="text-sm text-slate-400">
          Enter a focus keyword above to see your SEO score and recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Score */}
      <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-200">SEO Score</span>
          <span className={`text-lg font-bold ${scoreColor}`}>{score}/100</span>
        </div>
        <Progress value={score} className={`h-2 bg-slate-600 ${progressColor}`} />
      </div>

      {/* Checklist */}
      <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4 space-y-2">
        <span className="text-sm font-medium text-slate-200">SEO Checklist</span>
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-2 text-sm">
            {check.passed ? (
              <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 text-red-400 shrink-0" />
            )}
            <span className={check.passed ? "text-slate-300" : "text-slate-400"}>
              {check.label}
            </span>
          </div>
        ))}
      </div>

      {/* Keyword Density */}
      <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4 space-y-1">
        <span className="text-sm font-medium text-slate-200">Keyword Density</span>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-300">
            "{focusKeyword}" {variants.length > 1 && "+ variants"} appears <strong>{occurrences}</strong> time{occurrences !== 1 && "s"} ({density.toFixed(2)}%)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          {densityStatus === "good" && (
            <span className="flex items-center gap-1 text-green-400">
              <CheckCircle2 className="h-3 w-3" /> Good density (0.5–2.5%)
            </span>
          )}
          {densityStatus === "low" && (
            <span className="flex items-center gap-1 text-yellow-400">
              <AlertTriangle className="h-3 w-3" /> Low density — use the keyword more
            </span>
          )}
          {densityStatus === "high" && (
            <span className="flex items-center gap-1 text-red-400">
              <AlertTriangle className="h-3 w-3" /> Too high — reduce keyword stuffing
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">Word count: {wordCount}</p>
      </div>
    </div>
  );
};

export default SEOScorePanel;
