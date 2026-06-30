import type { PerformanceStat } from "../../types/analysis";

interface AnalysisInsightProps {
  stats: PerformanceStat[];
  recommendation: string;
  onEdit: () => void;
}

export default function AnalysisInsight({ stats, recommendation, onEdit }: AnalysisInsightProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Performance summary */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-surface-container text-center" style={{ boxShadow: "0 1px 8px rgba(99,71,209,0.06)" }}>
            <p className="text-[22px] font-extrabold text-on-surface tracking-tight">{s.value}</p>
            <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5">{s.label}</p>
            <p className="text-[11px] text-outline mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* AI recommendation */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg, #2d1b69, #4b2ab8)" }}
      >
        <p
          className="text-[10px] font-bold tracking-widest uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          AI 추천 액션
        </p>
        <p className="text-sm text-white leading-relaxed mb-4" style={{ opacity: 0.9 }}>{recommendation}</p>
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded-xl text-[13px] font-bold text-on-surface border-0 cursor-pointer font-[inherit]"
          style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
        >
          포트폴리오 수정하기 →
        </button>
      </div>
    </div>
  );
}
