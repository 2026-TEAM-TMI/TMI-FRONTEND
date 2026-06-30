import type { ChatRoom } from "../../types/chat";

interface ChatRoomItemProps {
  room: ChatRoom;
  isActive: boolean;
  onClick: () => void;
}

export default function ChatRoomItem({ room, isActive, onClick }: ChatRoomItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2.5 px-[18px] py-3 cursor-pointer transition-all duration-150"
      style={{
        background: isActive ? "#f3f0ff" : "transparent",
        borderLeft: `3px solid ${isActive ? room.color : "transparent"}`,
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0"
        style={{
          background: `linear-gradient(135deg, ${room.color}, ${room.color}bb)`,
          boxShadow: `0 2px 8px ${room.color}33`,
        }}
      >
        {room.avatar}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center mb-0.5">
          <p className="font-bold text-[13px] text-on-surface">{room.name}</p>
          <span className="text-[10px] text-[#b0abc0]">{room.time}</span>
        </div>
        <p className="text-[11px] text-outline truncate">{room.lastMsg}</p>
      </div>
      {room.unread > 0 && (
        <div
          className="w-[17px] h-[17px] rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0"
          style={{ background: room.color }}
        >
          {room.unread}
        </div>
      )}
    </div>
  );
}
