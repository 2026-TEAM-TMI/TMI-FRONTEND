interface ProgressBarProps {
  label?: string;
  value: number; // 0–1
  accentColor?: string;
  height?: number;
  showValue?: boolean;
}

export default function ProgressBar({
  label,
  value,
  accentColor = "#6347d1",
  height = 5,
  showValue = true,
}: ProgressBarProps) {
  const pct = Math.round(value * 100);

  return (
    <div className="flex flex-col gap-1">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span
              className="text-[12px] font-semibold text-[#484554]"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-[12px] font-bold" style={{ color: accentColor }}>
              {pct}
            </span>
          )}
        </div>
      )}
      <div
        className="rounded-full overflow-hidden"
        style={{ height, background: "#e6eeff" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${accentColor}, #9c48ea)`,
          }}
        />
      </div>
    </div>
  );
}
