import type { JobCategory } from "../../types/portfolio";

const FILTERS: { label: string; value: JobCategory }[] = [
  { label: "전체", value: "ALL" },
  { label: "AI", value: "AI" },
  { label: "백엔드", value: "백엔드" },
  { label: "프론트엔드", value: "프론트엔드" },
];

interface PortfolioFilterTabsProps {
  active: JobCategory;
  onChange: (f: JobCategory) => void;
}

export default function PortfolioFilterTabs({ active, onChange }: PortfolioFilterTabsProps) {
  return (
    <div className="flex gap-2 mb-7">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-200 cursor-pointer border-0 font-[inherit] ${
            active === value
              ? "bg-[linear-gradient(135deg,#6347d1,#9c48ea)] text-white shadow-[0_4px_14px_rgba(99,71,209,0.3)]"
              : "bg-white text-on-surface-variant border border-outline-variant hover:border-primary-container hover:text-primary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
