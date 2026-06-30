import type { InsightCard } from "../../types/analysis";

const SEVERITY_STYLES: Record<InsightCard["severity"], { bg: string; color: string }> = {
  Critical: { bg: "#fee2e2", color: "#dc2626" },
  High:     { bg: "#fef3c7", color: "#d97706" },
  Medium:   { bg: "#e0f2fe", color: "#0284c7" },
};

interface ImprovementInsightCardProps {
  insight: InsightCard;
}

export default function ImprovementInsightCard({ insight }: ImprovementInsightCardProps) {
  const style = SEVERITY_STYLES[insight.severity];
  return (
    <div className="bg-white rounded-2xl border border-surface-container p-5 shadow-[0_1px_8px_rgba(99,71,209,0.06)]">
      <div className="flex items-start gap-3">
        <span
          className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shrink-0 mt-0.5"
          style={{ background: style.bg, color: style.color }}
        >
          {insight.severity}
        </span>
        <div>
          <p className="text-[14px] font-semibold text-on-surface mb-2">{insight.issue}</p>
          <div className="pl-3 border-l-2 border-[#6347d1]">
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              💡 {insight.suggestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
