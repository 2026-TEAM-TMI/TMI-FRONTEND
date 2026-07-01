// src/pages/LoginPage.tsx
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  const { loginWithGithub } = useAuth();

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "linear-gradient(135deg, #f8f9ff 0%, #e6eeff 50%, #f0dbff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,71,209,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(156,72,234,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <LoginForm onGithubLogin={loginWithGithub} />
    </div>
  );
}
