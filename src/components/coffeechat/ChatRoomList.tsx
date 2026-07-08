import type { ChatRoom } from "../../types/chat";
import ChatRoomItem from "./ChatRoomItem";

interface ChatRoomListProps {
  rooms: ChatRoom[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}

export default function ChatRoomList({ rooms, selectedIndex, onSelect }: ChatRoomListProps) {
  const unreadCount = rooms.filter((r) => r.unread > 0).length;

  return (
    <div
      className="w-64 shrink-0 bg-white rounded-[18px] border border-surface-container flex flex-col overflow-hidden shadow-[0_1px_6px_rgba(59,130,246,0.06)]"
    >
      <div className="px-5 py-4 border-b border-[#f0f0f8]">
        <h2 className="text-[15px] font-extrabold text-on-surface">커피챗 ☕</h2>
        <p className="text-[11px] text-outline mt-0.5">{unreadCount}개의 새 메시지</p>
      </div>
      <div className="overflow-auto flex-1">
        {rooms.map((room, i) => (
          <ChatRoomItem
            key={room.id}
            room={room}
            isActive={selectedIndex === i}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}
