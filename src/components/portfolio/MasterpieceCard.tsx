import type { Masterpiece } from "../../types/portfolio";

interface MasterpieceCardProps {
  item: Masterpiece;
  onClick: () => void;
}

export default function MasterpieceCard({ item: m, onClick }: MasterpieceCardProps) {
  return (
    <div
      className="bg-white rounded-[18px] overflow-hidden border border-surface-container flex flex-col cursor-pointer transition-all duration-200 shadow-[0_1px_6px_rgba(99,71,209,0.06)] hover:shadow-[0_8px_28px_rgba(99,71,209,0.13)] hover:-translate-y-0.5"
      onClick={onClick}
    >
      {/* Preview area */}
      <div className="h-27.5 flex items-center justify-center text-4xl relative" style={{ background: m.gradient }}>
        ✦
        <span
          className="absolute top-2.5 right-2.5 text-[11px] font-bold px-2 py-0.5 rounded-full font-label"
          style={{ color: m.accent, background: `${m.accent}14` }}
        >
          Inspect →
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-[13px] font-extrabold text-on-surface leading-snug mb-1.5 tracking-tight">{m.title}</h3>
        <p className="text-[12px] text-on-surface-variant leading-relaxed flex-1 mb-3">{m.desc}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {m.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f0f0f8] text-on-surface-variant font-label"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-2.5 border-t border-[#f0f0f8]">
          <span className="text-[11px] text-[#b0abc0]">♥ {m.likes}</span>
          <span className="text-[11px] text-[#b0abc0]">💬 {m.comments}</span>
        </div>
      </div>
    </div>
  );
}
