import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const tabs = [
  { label: "Dashboard", path: "/dashboard", icon: "⊞" },
  { label: "Builder", path: "/builder/step1", icon: "✦" },
  { label: "Feed", path: "/portfolio/feed", icon: "◈" },
  { label: "Coffee Chat", path: "/coffee-chat", icon: "☕" },
  { label: "Analysis", path: "/portfolio/analysis", icon: "◎" },
];

const BUILDER_PATHS = ["/builder/step1", "/builder/step2", "/builder/step3", "/builder/publishing"];

export default function NavTabs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="sticky top-0 z-50 flex items-center gap-1 px-8 h-16 border-b border-outline-variant/60"
      style={{ background: "rgba(248,249,255,0.92)", backdropFilter: "blur(16px)" }}>

      {/* Brand */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2.5 mr-8 shrink-0 bg-transparent border-0 cursor-pointer font-[inherit] group"
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold text-white transition-all duration-200 group-hover:shadow-[0_4px_12px_rgba(99,71,209,0.4)] group-hover:scale-110 bg-[linear-gradient(135deg,#6347d1,#9c48ea)]">
          ✦
        </div>
        <span className="font-extrabold text-[18px] text-primary tracking-tight">Cupoli</span>
      </button>

      {/* Nav items */}
      <div className="flex items-center gap-0.5 flex-1">
        {tabs.map((tab) => {
          const active =
            pathname === tab.path ||
            (tab.path === "/builder/step1" && BUILDER_PATHS.includes(pathname));
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200 border-0 font-[inherit] font-semibold ${
                active
                  ? "bg-[linear-gradient(135deg,#6347d1,#9c48ea)] text-white shadow-[0_2px_10px_rgba(99,71,209,0.3)]"
                  : "bg-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span className="text-[13px]">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* User avatar */}
      <div
        onClick={() => navigate("/mypage")}
        title="My Page"
        className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-sm cursor-pointer shrink-0 transition-all duration-200 hover:scale-110 hover:shadow-[0_4px_14px_rgba(99,71,209,0.4)] select-none bg-[linear-gradient(135deg,#6347d1,#9c48ea)] ${
          pathname === "/mypage" ? "ring-2 ring-primary" : ""
        }`}
      >
        {user?.avatar ?? "?"}
      </div>

      </div>
    </nav>
  );
}