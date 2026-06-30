import type { SkillComparison } from "../../types/analysis";

interface SkillAnalysisChartProps {
  skills: SkillComparison[];
}

export default function SkillAnalysisChart({ skills }: SkillAnalysisChartProps) {
  return (
    <div className="flex flex-col gap-4">
      {skills.map((s) => {
        const diff = s.mine - s.avg;
        return (
          <div key={s.label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[13px] font-semibold text-on-surface-variant font-label">
                {s.label}
              </span>
              <span className={`text-[12px] font-bold ${diff >= 0 ? "text-green-400" : "text-red-400"}`}>
                {diff >= 0 ? "↑" : "↓"} {Math.abs(diff)}
              </span>
            </div>
            <div className="h-3 rounded-full overflow-hidden relative bg-surface-container">
              <div
                className="absolute top-0 left-0 h-full rounded-full opacity-40 bg-[#b0abc0]"
                style={{ width: `${s.avg}%` }}
              />
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-[linear-gradient(90deg,#6347d1,#9c48ea)]"
                style={{ width: `${s.mine}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-outline">평균 {s.avg}</span>
              <span className="text-[10px] font-bold text-primary-container">내 점수 {s.mine}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
