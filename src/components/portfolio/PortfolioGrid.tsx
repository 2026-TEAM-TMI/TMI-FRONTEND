import type { ReactNode } from "react";

interface PortfolioGridProps {
  children: ReactNode;
  empty?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function PortfolioGrid({ children, empty, error, onRetry }: PortfolioGridProps) {
  if (error) {
    return (
      <div className="text-center py-20 text-[#797585]">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-[15px] font-semibold">피드를 불러오지 못했습니다</p>
        <p className="text-[13px] mt-1 text-[#b0abc0]">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 rounded-full text-[13px] font-bold text-white border-0 cursor-pointer font-[inherit]"
            style={{ background: "linear-gradient(135deg,#3b82f6,#38bdf8)" }}
          >
            다시 시도
          </button>
        )}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="text-center py-20 text-[#797585]">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-[15px] font-semibold">해당 직무의 포트폴리오가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4.5">
      {children}
    </div>
  );
}
