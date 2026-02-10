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

  const checks = useMemo<Check[]>(() => {
    const kw = focusKeyword.toLowerCase().trim();
    const hasKw = kw.length > 0;

    return [
      {
        label: "Focus keyword in title",
        passed: hasKw && title.toLowerCase().includes(kw),
      },
      {
        label: "Focus keyword in slug",
        passed: hasKw && slug.toLowerCase().includes(kw.replace(/\s+/g, "-")),
      },
      {
        label: "Focus keyword in meta title",
        passed: hasKw && metaTitle.toLowerCase().includes(kw),
      },
      {
        label: "Focus keyword in meta description",
        passed: hasKw && metaDescription.toLowerCase().includes(kw),
      },
      {
        label: "Focus keyword in excerpt",
        passed: hasKw && excerpt.toLowerCase().includes(kw),
      },
      {
        label: "Focus keyword in first paragraph",
        passed: hasKw && getFirstParagraph(content).toLowerCase().includes(kw),
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
  }, [focusKeyword, title, slug, metaTitle, metaDescription, excerpt, content, wordCount]);

  const score = useMemo(() => {
    if (checks.length === 0) return 0;
    return Math.round((checks.filter((c) => c.passed).length / checks.length) * 100);
  }, [checks]);

  // Keyword density
  const { occurrences, density } = useMemo(() => {
    const kw = focusKeyword.toLowerCase().trim();
    if (!kw || wordCount === 0) return { occurrences: 0, density: 0 };

    let count = 0;
    let idx = 0;
    const lower = plainContent.toLowerCase();
    while ((idx = lower.indexOf(kw, idx)) !== -1) {
      count++;
      idx += kw.length;
    }
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
            "{focusKeyword}" appears <strong>{occurrences}</strong> time{occurrences !== 1 && "s"} ({density.toFixed(2)}%)
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
