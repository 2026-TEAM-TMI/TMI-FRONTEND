import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-sm",
};

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#6347d1,#9c48ea)] text-white shadow-[0_4px_16px_rgba(99,71,209,0.3)] hover:opacity-90",
  secondary:
    "bg-surface-low text-primary border-[1.5px] border-[#dddaeb] hover:bg-surface-container",
  ghost:
    "bg-transparent text-on-surface-variant border-[1.5px] border-outline-variant hover:bg-surface-container hover:text-on-surface",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-xl font-bold cursor-pointer transition-all duration-150 font-[inherit] border-0";

  return (
    <button
      className={`${base} ${sizeMap[size]} ${variantMap[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
