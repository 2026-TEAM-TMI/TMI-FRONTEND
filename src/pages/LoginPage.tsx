// src/pages/LoginPage.tsx
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useAuthStore((s) => s.navigate);

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

          {/* Google login only */}
          <button
            onClick={() => navigate("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              width: "100%",
              padding: "16px 20px",
              background: "#fff",
              border: "1.5px solid #c9c4d6",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#121c2a",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#6347d1";
              e.currentTarget.style.background = "#f8f9ff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#c9c4d6";
              e.currentTarget.style.background = "#fff";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Footer links */}
        <div style={{ textAlign: "center", marginTop: "24px", display: "flex", justifyContent: "center", gap: "20px" }}>
          {["Find Account", "Reset Password", "Sign Up"].map((text) => (
            <button
              key={text}
              style={{
                background: "none",
                border: "none",
                color: "#797585",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
