import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import characterIcon from "../../assets/images/character-icon.png";

const tabs = [
  { label: "대시보드", path: "/dashboard", icon: "⊞" },
  { label: "빌더", path: "/builder/basic-info", icon: "✦" },
  { label: "피드", path: "/portfolio/feed", icon: "◈" },
  { label: "커피챗", path: "/coffee-chat", icon: "☕" },
  { label: "분석", path: "/portfolio/analysis", icon: "◎" },
];

const BUILDER_PATHS = ["/builder/basic-info", "/builder/step1", "/builder/step2", "/builder/step3"];

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
        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 transition-all duration-200 group-hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] group-hover:scale-110 bg-[linear-gradient(135deg,#3b82f6,#38bdf8)]">
          <img src={characterIcon} alt="대신 취업해줘" className="w-full h-full object-cover" />
        </div>
        <span className="font-extrabold text-[18px] text-primary tracking-tight">대신 취업해줘</span>
      </button>

      {/* Nav items */}
      <div className="flex items-center gap-0.5 flex-1">
        {tabs.map((tab) => {
          const active =
            pathname === tab.path ||
            (tab.path === "/builder/basic-info" && BUILDER_PATHS.includes(pathname));
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200 border-0 font-[inherit] font-semibold ${
                active
                  ? "bg-[linear-gradient(135deg,#3b82f6,#38bdf8)] text-white shadow-[0_2px_10px_rgba(59,130,246,0.3)]"
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
        title="마이페이지"
        className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-sm cursor-pointer shrink-0 overflow-hidden transition-all duration-200 hover:scale-110 hover:shadow-[0_4px_14px_rgba(59,130,246,0.4)] select-none bg-[linear-gradient(135deg,#3b82f6,#38bdf8)] ${
          pathname === "/mypage" ? "ring-2 ring-primary" : ""
        }`}
      >
        {user?.profileImage ? (
          <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          user?.avatar ?? "?"
        )}
      </div>
    </nav>
  );
}