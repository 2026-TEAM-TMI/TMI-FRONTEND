import { useEffect, useState } from "react";

const STEPS = [
  "GitHub 데이터 분석 중...",
  "포트폴리오 콘텐츠 생성 중...",
  "스타일 & 레이아웃 적용 중...",
  "최종 검토 & 배포 중...",
];

interface PublishingProgressProps {
  onDone: () => void;
}

export default function PublishingProgress({ onDone }: PublishingProgressProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 600);
          return 100;
        }
        setStep(Math.floor((next / 100) * STEPS.length));
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="min-h-svh bg-surface flex items-center justify-center font-sans">
      <div className="text-center max-w-md w-full px-8">
        <div className="text-6xl mb-6" style={{ animation: "spin 3s linear infinite" }}>✦</div>
        <h1 className="text-[28px] font-extrabold text-on-surface tracking-tight mb-2">
          Transmuting Your Portfolio...
        </h1>
        <p className="text-outline mb-8">{STEPS[Math.min(step, STEPS.length - 1)]}</p>

        <div className="h-2 bg-surface-container rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg,#6347d1,#9c48ea)",
            }}
          />
        </div>
        <p
          className="text-[13px] font-bold text-primary-container"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {Math.round(progress)}%
        </p>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
