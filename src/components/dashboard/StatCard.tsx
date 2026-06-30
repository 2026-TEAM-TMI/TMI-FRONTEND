interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: string;
}

export default function StatCard({ label, value, change, icon }: StatCardProps) {
  return (
    <div className="rounded-[20px] px-7 pt-7 pb-6 bg-white border border-surface-container shadow-[0_2px_16px_rgba(99,71,209,0.07)] hover:shadow-[0_8px_32px_rgba(99,71,209,0.14)] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
      <div className="flex justify-between items-start mb-5">
        <p className="text-[13px] font-semibold tracking-[0.02em] text-outline">{label}</p>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 bg-[linear-gradient(135deg,#eff4ff,#e6eeff)]">
          {icon}
        </div>
      </div>
      <p className="text-[32px] font-extrabold tracking-[-0.04em] leading-none mb-3.5 text-on-surface">
        {value}
      </p>
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold bg-surface-low text-primary font-label">
        ↑ {change}
      </span>
    </div>
  );
}
