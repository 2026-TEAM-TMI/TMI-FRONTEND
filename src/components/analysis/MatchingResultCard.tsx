import type { MatchJob } from "../../types/analysis";

interface MatchingResultCardProps {
  job: MatchJob;
}

export default function MatchingResultCard({ job }: MatchingResultCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-surface-container shadow-[0_1px_8px_rgba(59,130,246,0.06)] overflow-hidden hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] hover:border-outline-variant transition-all duration-200">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{job.company}</span>
              <span className="text-[15px] font-bold text-on-surface">{job.role}</span>
            </div>
            <p className="text-[12px] text-outline">{job.location}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[12px] font-extrabold text-white shrink-0 bg-[linear-gradient(135deg,#3b82f6,#38bdf8)]">
            {job.score}% 매칭
          </span>
        </div>

        <div className="mb-3">
          <p className="text-[10px] font-bold tracking-widest uppercase text-outline mb-1.5 font-label">
            매칭 이유
          </p>
          <ul className="flex flex-col gap-1">
            {job.reasons.map((r, i) => (
              <li key={i} className="text-[12px] text-on-surface-variant flex items-start gap-1.5">
                <span className="text-primary-container mt-0.5 shrink-0">✦</span> {r}
              </li>
            ))}
          </ul>
        </div>

        {job.gaps.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-bold tracking-widest uppercase text-outline mb-1.5 font-label">
              부족한 역량
            </p>
            <div className="flex flex-wrap gap-1.5">
              {job.gaps.map((g) => (
                <span key={g} className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-white bg-red-500">
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

        <button className="w-full py-2.5 rounded-xl text-[13px] font-bold text-primary border-0 cursor-pointer font-[inherit] bg-surface-low hover:bg-surface-container transition-colors duration-150">
          공고 보기 →
        </button>
      </div>
    </div>
  );
}
