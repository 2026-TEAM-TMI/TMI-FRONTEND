import { useState, useRef, useCallback } from "react";
import type { PortfolioFeedItem } from "../../types/portfolio";

interface PortfolioCardProps {
  portfolio: PortfolioFeedItem;
  onPortfolioClick: () => void;
  onAuthorClick?: () => void;
}

export default function PortfolioCard({ portfolio: p, onPortfolioClick, onAuthorClick }: PortfolioCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTilt({ x: y * 7, y: -x * 7 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={ref}
      onClick={onPortfolioClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.4s ease" : "transform 0.1s ease",
        willChange: "transform",
      }}
      className="bg-white rounded-[18px] border border-surface-container flex flex-col overflow-hidden cursor-pointer shadow-[0_1px_6px_rgba(59,130,246,0.06)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.18)]"
    >
      {p.thumbnailImage ? (
        <img src={p.thumbnailImage} alt={p.portfolioTitle} className="w-full h-36 object-cover" />
      ) : (
        <div className="w-full h-36 flex items-center justify-center text-3xl bg-[linear-gradient(135deg,#f0eafc,#e6eeff)]">
          📄
        </div>
      )}

      <div className="px-4.5 py-4 flex-1 flex flex-col">
        <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 bg-surface-low text-primary font-label tracking-[0.06em]">
          {p.jobCategory}
        </span>
        <h3 className="text-sm font-extrabold text-on-surface leading-snug mb-1.5 tracking-tight line-clamp-1">
          {p.portfolioTitle}
        </h3>
        <p className="text-[12px] text-on-surface-variant leading-relaxed line-clamp-2 flex-1">
          {p.portfolioDescription}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f0f0f8]">
          {onAuthorClick ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAuthorClick();
              }}
              className="text-[11px] font-bold text-primary bg-transparent border-0 cursor-pointer p-0 font-[inherit]"
            >
              작성자의 다른 포트폴리오 →
            </button>
          ) : (
            <span />
          )}
          <span className="text-[11px] text-[#b0abc0]">👁 {p.viewsCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
