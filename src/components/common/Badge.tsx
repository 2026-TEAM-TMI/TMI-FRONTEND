import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: string;
  bg?: string;
  className?: string;
}

export default function Badge({ children, color = "#4b2ab8", bg = "#eff4ff", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold font-['Space_Grotesk',system-ui,sans-serif] ${className}`}
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}
