import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ hover = false, className = "", children, ...rest }: CardProps) {
  const base = "bg-white rounded-[18px] border border-surface-container shadow-[0_1px_8px_rgba(99,71,209,0.06)]";
  const hoverClass = hover
    ? "cursor-pointer transition-all duration-200 hover:shadow-[0_8px_28px_rgba(99,71,209,0.13)] hover:-translate-y-0.5"
    : "";

  return (
    <div className={`${base} ${hoverClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}
