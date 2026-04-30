import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertTriangle, Sparkles } from "lucide-react";
import { useSEOScore } from "@/hooks/useSEOScore";

interface SEOScorePanelProps {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
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
  const {
    score,
    checks,
    wordCount,
    occurrences,
    density,
    densityStatus,
    variants
  } = useSEOScore({ title, slug, content, excerpt, metaTitle, metaDescription, focusKeyword });

  const scoreColor =
    score >= 70 ? "text-green-400" : score >= 40 ? "text-yellow-400" : "text-red-400";
  const progressColor =
    score >= 70 ? "[&>div]:bg-green-500" : score >= 40 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500";

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
      <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-4 space-y-4">
        <div>
          <span className="text-sm font-medium text-slate-200 block mb-2">Standard SEO</span>
          <div className="space-y-2">
            {checks.filter(c => c.type === "basic").map((check) => (
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
        </div>

        <div className="pt-2 border-t border-slate-600/50">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-slate-200">GEO / AI Search Optimization</span>
          </div>
          <div className="space-y-2">
            {checks.filter(c => c.type === "geo").map((check) => (
              <div key={check.label} className="flex items-center gap-2 text-sm">
                {check.passed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0" />
                )}
                <span className={check.passed ? "text-slate-300" : "text-slate-400"}>
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </div>
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

