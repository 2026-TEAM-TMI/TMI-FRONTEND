import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-sm",
};

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#6347d1,#9c48ea)] text-white shadow-[0_4px_16px_rgba(99,71,209,0.35)] hover:shadow-[0_6px_24px_rgba(99,71,209,0.5)] hover:-translate-y-px active:translate-y-0",
  secondary:
    "bg-surface-low text-primary border-[1.5px] border-[#dddaeb] hover:bg-surface-container hover:border-primary-container",
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
    "relative inline-flex items-center justify-center gap-1.5 rounded-full font-bold cursor-pointer transition-all duration-200 font-[inherit] border-0 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0";

  return (
    <button
      className={`${base} ${sizeMap[size]} ${variantMap[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="animate-shimmer pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </button>
  );
}
