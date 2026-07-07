import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { PortfolioListItem as IPortfolioListItem } from "../../types/portfolio";

interface PortfolioListItemProps {
  portfolio: IPortfolioListItem;
  onClick: () => void;
}

export default function PortfolioListItem({ portfolio: p, onClick }: PortfolioListItemProps) {
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTilt({ x: y * 5, y: -x * 5 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  // 서버에서 받은 실제 포트폴리오는 preview 페이지 내부 iframe으로, 목업/생성 중 카드는 기존 내부 이동 사용
  const handleClick = () => {
    if (p.url) {
      navigate("/portfolio/preview", { state: { portfolioUrl: p.url } });
    } else {
      onClick();
    }
  };

  const isGenerating = p.status === "generating";

  if (isGenerating) {
    return (
      <div className="rounded-[20px] p-7 bg-[linear-gradient(135deg,#f8f9ff_0%,#f3ebfa_100%)] border-[1.5px] border-dashed border-[#d9c9f5] cursor-default flex flex-col items-center justify-center text-center gap-3 min-h-43">
        <div className="w-9 h-9 rounded-full border-[3px] border-[#e0d3f7] border-t-secondary animate-spin" />
        <h3 className="text-[15px] font-bold text-on-surface leading-snug">{p.title}</h3>
        <p className="text-[12px] font-semibold text-secondary">✨ AI가 포트폴리오를 만들고 있어요...</p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.4s ease" : "transform 0.1s ease",
        willChange: "transform",
      }}
      className="rounded-[20px] p-7 bg-white border-[1.5px] border-surface-container shadow-[0_2px_12px_rgba(99,71,209,0.06)] hover:shadow-[0_12px_36px_rgba(99,71,209,0.16)] hover:border-outline-variant cursor-pointer"
    >
      {p.thumbnailImage && (
        <img
          src={p.thumbnailImage}
          alt={p.title}
          className="w-full h-32 object-cover rounded-xl mb-4"
        />
      )}

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[17px] font-bold flex-1 leading-snug pr-3 text-on-surface">{p.title}</h3>
        <span
          className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shrink-0 font-label"
          style={{
            background: p.status === "published" ? "#e6eeff" : "#f3ebfa",
            color: p.status === "published" ? "#4b2ab8" : "#8127cf",
          }}
        >
          {p.status}
        </span>
      </div>

      {p.description && (
        <p className="text-[13px] text-on-surface-variant leading-relaxed mb-4 line-clamp-2">{p.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-5">
        {p.jobCategory && (
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.06em] bg-surface-container text-primary font-label">
            {p.jobCategory}
          </span>
        )}
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.06em] bg-[#f0dbff] text-secondary font-label"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#f0f0f8]">
        <span className="text-[12px] text-[#b0abc0]">{p.updated}</span>
        <div className="flex items-center gap-1 text-[13px] font-semibold text-on-surface-variant">
          <span>👁️</span>
          <span>{p.views}</span>
        </div>
      </div>
    </div>
  );
}
