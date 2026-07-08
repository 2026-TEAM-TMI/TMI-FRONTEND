import type { SkillScore } from "../../types/portfolio";

interface HexRadarChartProps {
  skills: SkillScore[];
  size?: number;
  color?: string;
  /** 동종 업계 평균 값 (skills와 같은 순서/개수). 전달 시 두 번째 폴리곤으로 겹쳐 그림 */
  averageSkills?: SkillScore[];
  averageColor?: string;
}

function hexPoint(cx: number, cy: number, r: number, i: number, n: number) {
  const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function toPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z";
}

export default function SkillRadarChart({
  skills,
  size = 260,
  color = "#3b82f6",
  averageSkills,
  averageColor = "#a1a7b3",
}: HexRadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const n = skills.length;
  const levels = [0.25, 0.5, 0.75, 1];

  const gridPts = (r: number) => Array.from({ length: n }, (_, i) => hexPoint(cx, cy, maxR * r, i, n));
  const dataPts = skills.map((s, i) => hexPoint(cx, cy, maxR * s.value, i, n));
  const avgPts = averageSkills?.map((s, i) => hexPoint(cx, cy, maxR * s.value, i, n));
  const labelR = maxR + size * 0.085;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", margin: "0 auto" }}>
      {levels.map((r, li) => (
        <path
          key={li}
          d={toPath(gridPts(r))}
          fill="none"
          stroke={li === levels.length - 1 ? "#dddaeb" : "#eeebf8"}
          strokeWidth={li === levels.length - 1 ? 1.5 : 1}
        />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const p = hexPoint(cx, cy, maxR, i, n);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#eeebf8" strokeWidth={1} />;
      })}
      {avgPts && (
        <path
          d={toPath(avgPts)}
          fill={`${averageColor}18`}
          stroke={averageColor}
          strokeWidth={2}
          strokeDasharray="4 3"
          strokeLinejoin="round"
        />
      )}
      {avgPts &&
        avgPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill={averageColor} stroke="#fff" strokeWidth={1.5} />
        ))}
      <path
        d={toPath(dataPts)}
        fill={`${color}20`}
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {dataPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} stroke="#fff" strokeWidth={1.5} />
      ))}
      {skills.map((s, i) => {
        const lp = hexPoint(cx, cy, labelR, i, n);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size > 240 ? 10 : 9}
            fontWeight="600"
            fill="#484554"
            fontFamily="'Space Grotesk', system-ui, sans-serif"
          >
            {s.label}
          </text>
        );
      })}
      <circle cx={cx} cy={cy} r={3} fill="#c9c4d6" />
    </svg>
  );
}
