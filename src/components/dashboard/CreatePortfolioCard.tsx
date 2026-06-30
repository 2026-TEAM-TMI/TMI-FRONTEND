interface CreatePortfolioCardProps {
  count: number;
  onCreate: () => void;
}

export default function CreatePortfolioCard({ count, onCreate }: CreatePortfolioCardProps) {
  return (
    <div className="flex justify-between items-center mb-5">
      <div>
        <h2 className="text-[22px] font-extrabold tracking-tight mb-1 text-on-surface">My Portfolios</h2>
        <p className="text-sm text-outline">{count} active enchantments</p>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center gap-2 px-6 py-3 rounded-[14px] text-sm font-bold cursor-pointer font-[inherit] text-white border-0 bg-[linear-gradient(135deg,#6347d1,#9c48ea)] shadow-[0_4px_16px_rgba(99,71,209,0.3)] hover:opacity-90 hover:-translate-y-px transition-all duration-150"
      >
        <span className="text-lg leading-none">+</span>
        New Portfolio
      </button>
    </div>
  );
}
