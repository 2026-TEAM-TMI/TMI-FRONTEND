interface ScoreCircleProps {
  score: number;
  label?: string;
  sub?: string;
}

export default function ScoreCircle({ score, label = "전체 적합도 점수", sub }: ScoreCircleProps) {
  return (
    <div
      className="rounded-2xl p-4 text-center text-white"
      style={{ background: "linear-gradient(135deg, #6347d1, #9c48ea)" }}
    >
      <p
        className="text-[11px] font-semibold tracking-wide uppercase mb-0.5"
        style={{ opacity: 0.8, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
      >
        {label}
      </p>
      <p className="text-[32px] font-extrabold tracking-tight my-0.5">
        {score}<span className="text-base font-semibold" style={{ opacity: 0.8 }}>점</span>
      </p>
      {sub && <p className="text-[12px]" style={{ opacity: 0.75 }}>{sub}</p>}
    </div>
  );
}
