import type { JobCategory } from "../../types/portfolio";

const FILTERS: JobCategory[] = ["ALL", "AI", "백엔드", "프론트엔드"];

interface PortfolioFilterTabsProps {
  active: JobCategory;
  onChange: (f: JobCategory) => void;
}

export default function PortfolioFilterTabs({ active, onChange }: PortfolioFilterTabsProps) {
  return (
    <div className="flex gap-2 mb-6">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-[18px] py-[7px] rounded-full text-[13px] font-bold transition-all duration-150 cursor-pointer border-[1.5px] font-label tracking-[0.02em] ${
            active === f
              ? "bg-primary-container text-white border-primary-container shadow-[0_4px_12px_rgba(99,71,209,0.25)]"
              : "bg-white text-on-surface-variant border-[#dddaeb] hover:border-outline-variant hover:text-on-surface"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
