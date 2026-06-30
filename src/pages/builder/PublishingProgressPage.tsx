// src/pages/builder/PublishingProgressPage.tsx
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";

const steps = [
  { icon: "🔍", label: "Analyzing repositories", duration: 800 },
  { icon: "⚗️", label: "Extracting experiences", duration: 900 },
  { icon: "🎨", label: "Enchanting assets", duration: 1000 },
  { icon: "✨", label: "Transmuting into portfolio", duration: 700 },
];

export default function PublishingProgressPage() {
  const navigate = useAuthStore((s) => s.navigate);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

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
        setTimeout(() => navigate("portfolio-preview"), 600);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "linear-gradient(135deg, #f8f9ff 0%, #e6eeff 50%, #f0dbff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,71,209,0.12) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(156,72,234,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderRadius: "28px",
          padding: "52px 56px",
          maxWidth: "500px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 8px 48px rgba(99,71,209,0.12)",
          border: "1px solid rgba(201,196,214,0.5)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Animated icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #6347d1, #9c48ea)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            margin: "0 auto 28px",
            boxShadow: "0 8px 32px rgba(99,71,209,0.35)",
          }}
        >
          {steps[currentStep]?.icon ?? "✨"}
        </div>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#121c2a",
            letterSpacing: "-0.02em",
            marginBottom: "10px",
          }}
        >
          Casting Your Portfolio Spell...
        </h1>
        <p style={{ fontSize: "14px", color: "#484554", lineHeight: "1.6", marginBottom: "36px" }}>
          Our AI alchemists are distilling your experience into a legendary masterpiece.
          This transmutation takes a moment of focused energy.
        </p>

        {/* Current step */}
        <div
          style={{
            background: "#f0dbff",
            borderRadius: "12px",
            padding: "12px 20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "18px" }}>{steps[currentStep]?.icon}</span>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "#8127cf" }}>
            {steps[currentStep]?.label}...
          </span>
          <span style={{ marginLeft: "auto", fontSize: "14px", fontWeight: "800", color: "#4b2ab8" }}>
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: "8px", background: "#e6eeff", borderRadius: "999px", overflow: "hidden", marginBottom: "28px" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6347d1, #9c48ea)",
              borderRadius: "999px",
              transition: "width 0.1s linear",
              boxShadow: "0 0 8px rgba(99,71,209,0.5)",
            }}
          />
        </div>

        {/* Steps indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: i <= currentStep ? "#6347d1" : "#c9c4d6",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("dashboard")}
          style={{
            marginTop: "28px",
            background: "none",
            border: "none",
            color: "#797585",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Skip to Dashboard →
        </button>
      </div>
    </div>
  );
}
