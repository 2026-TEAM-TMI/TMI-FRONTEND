import { useState, useRef, useCallback } from "react";
import type { PortfolioListItem as IPortfolioListItem } from "../../types/portfolio";

interface PortfolioListItemProps {
  portfolio: IPortfolioListItem;
  onClick: () => void;
}

export default function PortfolioListItem({ portfolio: p, onClick }: PortfolioListItemProps) {
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

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.4s ease" : "transform 0.1s ease",
        willChange: "transform",
      }}
      className="rounded-[20px] p-7 bg-white border-[1.5px] border-surface-container shadow-[0_2px_12px_rgba(99,71,209,0.06)] hover:shadow-[0_12px_36px_rgba(99,71,209,0.16)] hover:border-outline-variant cursor-pointer"
    >
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

      <div className="flex flex-wrap gap-1.5 mb-5">
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
