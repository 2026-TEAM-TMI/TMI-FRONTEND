import type { User } from "../../types/user";
import Avatar from "../common/Avatar";

interface HeaderProps {
  user?: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="w-full px-8 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-surface-container sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl text-white text-base font-bold"
          style={{ background: "linear-gradient(135deg, #6347d1, #9c48ea)" }}
        >
          ✦
        </div>
        <span
          className="text-xl font-extrabold tracking-tight"
          style={{ color: "#4b2ab8" }}
        >
          Cupoli
        </span>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-on-surface-variant hidden sm:block">
            {user.name}
          </span>
          <Avatar letter={user.avatar} color={user.color} size={36} fontSize={13} />
        </div>
      )}
    </header>
  );
}
