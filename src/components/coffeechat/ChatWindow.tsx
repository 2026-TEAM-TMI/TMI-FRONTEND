import type { ChatRoom, ChatMessage } from "../../types/chat";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  room: ChatRoom;
  messages: ChatMessage[];
  inputVal: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  onViewPortfolio: () => void;
}

export default function ChatWindow({
  room,
  messages,
  inputVal,
  onInputChange,
  onSend,
  onViewPortfolio,
}: ChatWindowProps) {
  return (
    <div
      className="flex-1 bg-white rounded-[18px] border border-surface-container flex flex-col overflow-hidden"
      style={{ boxShadow: "0 1px 6px rgba(59,130,246,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#f0f0f8] bg-[#faf9ff]">
        <div
          className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-sm font-extrabold text-white"
          style={{ background: `linear-gradient(135deg, ${room.color}, ${room.color}bb)` }}
        >
          {room.avatar}
        </div>
        <div>
          <p className="font-bold text-sm text-on-surface">{room.name}</p>
          <p className="text-[11px] font-semibold" style={{ color: room.color }}>
            {room.role} · {room.company}
          </p>
        </div>
        <div className="ml-auto">
          <button
            onClick={onViewPortfolio}
            className="px-3 py-1.5 bg-surface-low rounded-full text-[11px] font-bold text-primary border-0 cursor-pointer font-[inherit]"
          >
            포트폴리오 보기
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-5 flex flex-col gap-2.5">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} avatar={room.avatar} color={room.color} />
        ))}
      </div>

      <ChatInput value={inputVal} onChange={onInputChange} onSend={onSend} accentColor={room.color} />
    </div>
  );
}
