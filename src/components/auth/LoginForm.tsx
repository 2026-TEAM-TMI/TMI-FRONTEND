import SocialLoginButton from "./SocialLoginButton";
import AuthFooterLinks from "./AuthFooterLinks";

interface LoginFormProps {
  onGithubLogin: () => void;
}

export default function LoginForm({ onGithubLogin }: LoginFormProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "440px",
        margin: "0 auto",
        padding: "0 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #6347d1, #9c48ea)",
            borderRadius: "16px",
            fontSize: "28px",
            marginBottom: "16px",
            boxShadow: "0 8px 32px rgba(99,71,209,0.3)",
          }}
        >
          ✦
        </div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "#4b2ab8",
            letterSpacing: "-0.02em",
            margin: "0 0 4px",
          }}
        >
          Cupoli
        </h1>
        <p
          style={{
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.12em",
            color: "#797585",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            textTransform: "uppercase",
          }}
        >
          The Alchemist's Atelier
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 4px 40px rgba(99,71,209,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
          border: "1px solid rgba(201,196,214,0.5)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#121c2a",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          Welcome Back ✨
        </h2>
        <p style={{ fontSize: "14px", color: "#484554", marginBottom: "32px" }}>
          Continue your journey of transmutation
        </p>

        <SocialLoginButton onClick={onGithubLogin} />
      </div>

      <AuthFooterLinks />
    </div>
  );
}
