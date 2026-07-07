import { useState, useRef, useCallback } from "react";
import { useAuthStore } from "../../store/authStore";

export default function WelcomeBanner() {
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="rounded-3xl px-12 py-11 mb-8 relative overflow-hidden bg-[linear-gradient(135deg,#4b2ab8_0%,#6347d1_50%,#9c48ea_100%)]"
    >
      {/* Cursor-following inner glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(circle 300px at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.10) 0%, transparent 70%)`,
          transition: "background 0.06s linear",
        }}
      />

      {/* Decorative orbs */}
      <div className="absolute -right-15 -top-15 w-65 h-65 rounded-full pointer-events-none bg-white/6 animate-float-orb" />
      <div className="absolute right-20 -bottom-20 w-45 h-45 rounded-full pointer-events-none bg-white/4 animate-float-orb-slow" />
      <div className="absolute -top-7.5 w-30 h-30 rounded-full pointer-events-none bg-white/3 animate-float-orb" style={{ left: "40%", animationDelay: "2s" }} />

      <p className="relative text-[11px] font-bold tracking-[0.12em] uppercase mb-3 text-white/55 font-label">
        The Alchemist's Atelier
      </p>
      <h1 className="relative text-[34px] font-extrabold tracking-[-0.03em] leading-[1.2] mb-3 text-white">
        Welcome back, {user?.name ?? "게스트"}! ✨
      </h1>
      <p className="relative text-[15px] leading-relaxed text-white/70">
        Your portfolio magic is ready — keep crafting your story.
      </p>

      <div className="absolute right-12 top-1/2 -translate-y-1/2 text-center rounded-[20px] px-7 py-5 bg-white/12 backdrop-blur-sm border border-white/20">
        <p className="text-[36px] font-extrabold tracking-[-0.04em] leading-none text-white">82</p>
        <p className="text-[11px] font-semibold mt-1 tracking-[0.04em] text-white/65 font-label">
          MAGIC SCORE
        </p>
      </div>
    </div>
  );
}
