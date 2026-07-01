import type { AppRoute } from "../../store/authStore";

const NAV_ITEMS: { label: string; route: AppRoute; icon: string }[] = [
  { label: "Dashboard", route: "dashboard", icon: "⊞" },
  { label: "Builder", route: "builder-step1", icon: "✦" },
  { label: "Feed", route: "portfolio-feed", icon: "◈" },
  { label: "Coffee Chat", route: "coffee-chat", icon: "☕" },
];

interface SidebarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export default function Sidebar({ currentRoute, onNavigate }: SidebarProps) {
  return (
    <aside className="flex flex-col w-56 min-h-screen bg-white border-r border-surface-container py-8 px-4 shrink-0">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-xl text-white text-sm font-bold"
          style={{ background: "linear-gradient(135deg, #6347d1, #9c48ea)" }}
        >
          ✦
        </div>
        <span className="text-lg font-extrabold tracking-tight" style={{ color: "#4b2ab8" }}>
          Cupoli
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, route, icon }) => {
          const isBuilderRoute = route === "builder-step1" && currentRoute.startsWith("builder");
          const isActive = currentRoute === route || isBuilderRoute;
          return (
            <button
              key={route}
              onClick={() => onNavigate(route)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer border-0 font-[inherit] ${
                isActive
                  ? "bg-primary-container text-primary"
                  : "bg-transparent text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
