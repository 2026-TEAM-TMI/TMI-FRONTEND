// src/components/layout/NavTabs.tsx
import { useAuthStore } from "../../store/authStore";
import type { AppRoute } from "../../store/authStore";

const tabs: { label: string; route: AppRoute; icon: string }[] = [
  { label: "Dashboard", route: "dashboard", icon: "🏠" },
  { label: "Builder", route: "builder-step1", icon: "✨" },
  { label: "Feed", route: "portfolio-feed", icon: "📋" },
  { label: "Coffee Chat", route: "coffee-chat", icon: "☕" },
  { label: "Analysis", route: "portfolio-analysis", icon: "📊" },
];

export default function NavTabs() {
  const { currentRoute, navigate } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 flex items-center gap-1 px-8 h-16 bg-surface/90 backdrop-blur-md border-b border-outline-variant">
      {/* Brand */}
      <div
        className="flex items-center gap-2 mr-8 cursor-pointer shrink-0"
        onClick={() => navigate("dashboard")}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base bg-[linear-gradient(135deg,#6347d1,#9c48ea)]">
          ✦
        </div>
        <span className="font-bold text-[18px] text-primary tracking-tight">Cupoli</span>
      </div>

      {/* Nav items */}
      <div className="flex items-center gap-1 flex-1">
        {tabs.map((tab) => {
          const active =
            currentRoute === tab.route ||
            (tab.route === "builder-step1" &&
              ["builder-step1", "builder-step2", "builder-step3", "publishing"].includes(currentRoute));
          return (
            <button
              key={tab.route}
              onClick={() => navigate(tab.route)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200 border-0 font-[inherit] ${
                active
                  ? "bg-primary-container text-white font-semibold"
                  : "bg-transparent text-on-surface-variant font-medium hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-[linear-gradient(135deg,#6347d1,#9c48ea)] flex items-center justify-center text-white font-bold text-sm cursor-pointer shrink-0">
        E
      </div>
    </nav>
  );
}
