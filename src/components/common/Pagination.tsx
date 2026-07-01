interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = getPages();

  const btnBase =
    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-150 cursor-pointer border-0 font-[inherit]";

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      {/* Prev */}
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} text-on-surface-variant hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        ←
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dot-${i}`} className="w-9 h-9 flex items-center justify-center text-outline text-sm">
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`${btnBase} ${
              currentPage === p
                ? "bg-primary-container text-white shadow-[0_4px_12px_rgba(99,71,209,0.3)]"
                : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} text-on-surface-variant hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        →
      </button>
    </div>
  );
}
