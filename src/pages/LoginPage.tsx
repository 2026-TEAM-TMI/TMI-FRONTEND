import { useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const { loginWithGithub } = useAuth();
  const [cursor, setCursor] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
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
      {/* Cursor-following glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(circle 480px at ${cursor.x}px ${cursor.y}px, rgba(99,71,209,0.10) 0%, transparent 70%)`,
          transition: "background 0.08s linear",
        }}
      />

      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div
          className="animate-float-orb"
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,71,209,0.16) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-float-orb-slow"
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(156,72,234,0.13) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-float-orb"
          style={{
            position: "absolute",
            top: "40%",
            left: "30%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(75,42,184,0.07) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
      </div>

      <LoginForm onGithubLogin={loginWithGithub} />
    </div>
  );
}
