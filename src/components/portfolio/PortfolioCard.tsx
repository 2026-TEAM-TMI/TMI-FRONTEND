import { useState, useRef, useCallback } from "react";
import type { PortfolioCard as IPortfolioCard } from "../../types/portfolio";

interface PortfolioCardProps {
  portfolio: IPortfolioCard;
  onAuthorClick: () => void;
  onPortfolioClick: () => void;
  onCoffeeChatClick: () => void;
}

export default function PortfolioCard({
  portfolio: p,
  onAuthorClick,
  onPortfolioClick,
  onCoffeeChatClick,
}: PortfolioCardProps) {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.4s ease" : "transform 0.1s ease",
        willChange: "transform",
      }}
      className="bg-white rounded-[18px] border border-surface-container flex flex-col overflow-hidden shadow-[0_1px_6px_rgba(99,71,209,0.06)] hover:shadow-[0_12px_32px_rgba(99,71,209,0.18)]"
    >
      {/* Author bar */}
      <div
        onClick={onAuthorClick}
        className="flex items-center gap-2.5 px-4 py-3.5 cursor-pointer border-b border-[#f0f0f8] hover:bg-[#faf9ff] transition-colors duration-150"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0"
          style={{
            background: `linear-gradient(135deg, ${p.color}, ${p.color}bb)`,
            boxShadow: `0 2px 8px ${p.color}44`,
          }}
        >
          {p.avatar}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="font-bold text-[13px] text-on-surface leading-tight">{p.name}</p>
          <p className="text-[11px] text-outline mt-0.5 truncate">{p.role}</p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shrink-0 bg-surface-low text-primary font-label">
          ✦ {p.matchScore}%
        </span>
      </div>

      {/* Portfolio preview */}
      <div
        onClick={onPortfolioClick}
        className="px-4.5 py-5 cursor-pointer flex-1 relative hover:opacity-90 transition-opacity duration-150"
        style={{ background: p.gradient }}
      >
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2.5 font-label tracking-[0.06em]"
          style={{
            background: `${p.color}22`,
            color: p.color,
            border: `1px solid ${p.color}33`,
          }}
        >
          {p.jobCategory}
        </span>
        <h3 className="text-sm font-extrabold text-on-surface leading-snug mb-1.5 tracking-tight">{p.title}</h3>
        <p className="text-[12px] text-on-surface-variant leading-relaxed">{p.desc}</p>
        <div className="mt-3.5 inline-flex items-center gap-1 text-[11px] font-bold font-label" style={{ color: p.color }}>
          포트폴리오 보기 →
        </div>
      </div>

      {/* Bottom */}
      <div className="px-4 pt-2.5 pb-3 border-t border-[#f0f0f8]">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f0f0f8] text-on-surface-variant font-label tracking-[0.04em]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={onCoffeeChatClick}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer border-0 bg-surface-low text-primary hover:bg-surface-container transition-colors duration-150 font-[inherit]"
          >
            ☕ Coffee Chat
          </button>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-[#b0abc0]">♥ {p.likes}</span>
            <span className="text-[11px] text-[#b0abc0]">👁 {p.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
