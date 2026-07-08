import SocialLoginButton from "./SocialLoginButton";
import AuthFooterLinks from "./AuthFooterLinks";
import characterIcon from "../../assets/images/character-icon.png";

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
            className="w-18 h-18 rounded-2xl mx-auto overflow-hidden bg-[linear-gradient(135deg,#3b82f6,#38bdf8)]"
            style={{ boxShadow: "0 8px 40px rgba(59,130,246,0.45), 0 0 0 1px rgba(255,255,255,0.15) inset" }}
          >
            <img src={characterIcon} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-2xl -z-10"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)", transform: "scale(1.8)", opacity: 0.6 }}
          />
        </div>
        <h1 className="text-[32px] font-extrabold text-primary tracking-tight leading-none mb-1.5">
          대신 취업해줘
        </h1>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-outline uppercase font-label">
          AI 포트폴리오 빌더
        </p>
      </div>

      {/* Card */}
      <div
        className="rounded-3xl p-10"
        style={{
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 4px 48px rgba(59,130,246,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
          border: "1px solid rgba(201,196,214,0.45)",
        }}
      >
        <div className="mb-8">
          <h2 className="text-[22px] font-extrabold text-on-surface tracking-tight mb-2">
            다시 오셨네요
          </h2>
          <p className="text-[14px] text-on-surface-variant leading-relaxed">
            GitHub으로 로그인하고 포트폴리오 작성을 이어가세요.
          </p>
        </div>

        <SocialLoginButton onClick={onGithubLogin} />

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-surface-container" />
          <span className="text-[11px] font-semibold text-outline font-label">OAUTH 2.0 보안 적용</span>
          <div className="flex-1 h-px bg-surface-container" />
        </div>
      </div>

      <AuthFooterLinks />
    </div>
  );
}
