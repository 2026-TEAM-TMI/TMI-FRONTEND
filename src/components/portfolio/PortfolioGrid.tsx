import type { ReactNode } from "react";

interface PortfolioGridProps {
  children: ReactNode;
  empty?: boolean;
}

export default function PortfolioGrid({ children, empty }: PortfolioGridProps) {
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
