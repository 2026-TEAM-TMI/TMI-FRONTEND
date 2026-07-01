import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  { icon: "🔍", label: "Analyzing repositories", duration: 800 },
  { icon: "⚗️", label: "Extracting experiences", duration: 900 },
  { icon: "🎨", label: "Enchanting assets", duration: 1000 },
  { icon: "✨", label: "Transmuting into portfolio", duration: 700 },
];

export default function PublishingProgressPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const total = steps.reduce((a, s) => a + s.duration, 0);
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 50;
      const pct = Math.min((elapsed / total) * 100, 100);
      setProgress(pct);

      let cumulative = 0;
      for (let i = 0; i < steps.length; i++) {
        cumulative += steps[i].duration;
        if (elapsed < cumulative) { setCurrentStep(i); break; }
      }

      if (elapsed >= total) {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => navigate("/portfolio/preview"), 700);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-svh font-sans flex items-center justify-center relative overflow-hidden bg-[linear-gradient(135deg,#f8f9ff_0%,#e6eeff_50%,#f0dbff_100%)]">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="animate-float-orb absolute top-[20%] left-[10%] w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,71,209,0.13) 0%, transparent 70%)" }} />
        <div className="animate-float-orb-slow absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(156,72,234,0.10) 0%, transparent 70%)" }} />
        <div className="animate-float-orb absolute top-[60%] left-[60%] w-56 h-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(75,42,184,0.07) 0%, transparent 70%)", animationDelay: "2s" }} />
      </div>

      {/* Card */}
      <div className="relative z-10 w-[90%] max-w-lg text-center rounded-[28px] px-14 py-14 border border-white/50"
        style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(24px)", boxShadow: "0 8px 48px rgba(99,71,209,0.14), 0 1px 0 rgba(255,255,255,0.9) inset" }}>

        {/* Animated icon */}
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 bg-[linear-gradient(135deg,#6347d1,#9c48ea)] shadow-[0_8px_32px_rgba(99,71,209,0.4)]"
          style={{ transition: "all 0.3s ease", transform: done ? "scale(1.1)" : "scale(1)" }}
        >
          {done ? "🎉" : steps[currentStep]?.icon ?? "✨"}
        </div>

        <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-3">
          {done ? "Transmutation Complete!" : "Casting Your Portfolio Spell..."}
        </h1>
        <p className="text-[14px] text-on-surface-variant leading-relaxed mb-9">
          {done
            ? "Your legendary portfolio has been forged. Redirecting..."
            : "Our AI alchemists are distilling your experience into a legendary masterpiece."}
        </p>

        {/* Current step indicator */}
        <div className="flex items-center gap-3 bg-surface-low rounded-xl px-5 py-3.5 mb-5 text-left">
          <span className="text-xl">{steps[currentStep]?.icon}</span>
          <span className="text-[14px] font-semibold text-secondary flex-1">
            {steps[currentStep]?.label}...
          </span>
          <span className="text-[14px] font-extrabold text-primary">{Math.round(progress)}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-surface-container rounded-full overflow-hidden mb-7">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#6347d1,#9c48ea)] shadow-[0_0_10px_rgba(99,71,209,0.5)]"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          />
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mb-7">
          {steps.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentStep ? "24px" : "8px",
                height: "8px",
                background: i <= currentStep ? "#6347d1" : "#c9c4d6",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-[13px] font-semibold text-outline bg-transparent border-0 cursor-pointer font-[inherit] hover:text-on-surface-variant transition-colors duration-150"
        >
          Skip to Dashboard →
        </button>
      </div>
    </div>
  );
}
