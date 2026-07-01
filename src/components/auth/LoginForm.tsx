import SocialLoginButton from "./SocialLoginButton";
import AuthFooterLinks from "./AuthFooterLinks";

interface LoginFormProps {
  onGithubLogin: () => void;
}

export default function LoginForm({ onGithubLogin }: LoginFormProps) {
  return (
    <div className="w-full max-w-105 mx-auto px-6 relative z-10">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="relative inline-block mb-5">
          <div
            className="w-18 h-18 flex items-center justify-center rounded-2xl text-[32px] mx-auto bg-[linear-gradient(135deg,#6347d1,#9c48ea)]"
            style={{ boxShadow: "0 8px 40px rgba(99,71,209,0.45), 0 0 0 1px rgba(255,255,255,0.15) inset" }}
          >
            ✦
          </div>
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-2xl -z-10"
            style={{ background: "radial-gradient(circle, rgba(99,71,209,0.3) 0%, transparent 70%)", transform: "scale(1.8)", opacity: 0.6 }}
          />
        </div>
        <h1 className="text-[32px] font-extrabold text-primary tracking-tight leading-none mb-1.5">
          Cupoli
        </h1>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-outline uppercase font-label">
          The Alchemist's Atelier
        </p>
      </div>

      {/* Card */}
      <div
        className="rounded-3xl p-10"
        style={{
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 4px 48px rgba(99,71,209,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
          border: "1px solid rgba(201,196,214,0.45)",
        }}
      >
        <div className="mb-8">
          <h2 className="text-[22px] font-extrabold text-on-surface tracking-tight mb-2">
            Welcome Back ✨
          </h2>
          <p className="text-[14px] text-on-surface-variant leading-relaxed">
            GitHub으로 로그인하고 포트폴리오 마법을 이어가세요.
          </p>
        </div>

        <SocialLoginButton onClick={onGithubLogin} />

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-surface-container" />
          <span className="text-[11px] font-semibold text-outline font-label">SECURED BY OAUTH 2.0</span>
          <div className="flex-1 h-px bg-surface-container" />
        </div>
      </div>

      <AuthFooterLinks />
    </div>
  );
}
