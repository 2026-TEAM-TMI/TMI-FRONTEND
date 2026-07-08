import type { ChatMessage } from "../../types/chat";

interface ChatBubbleProps {
  message: ChatMessage;
  avatar: string;
  color: string;
}

export default function ChatBubble({ message: msg, avatar, color }: ChatBubbleProps) {
  return (
    <div className={`flex items-end gap-1.5 ${msg.isMe ? "justify-end" : "justify-start"}`}>
      {!msg.isMe && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
        >
          {avatar}
        </div>
      )}
      <div>
        <div
          className="px-3.5 py-2.5 text-[13px] leading-relaxed max-w-[340px]"
          style={{
            borderRadius: msg.isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            background: msg.isMe ? `linear-gradient(135deg, ${color}, #38bdf8)` : "#f0f0f8",
            color: msg.isMe ? "#fff" : "#121c2a",
            boxShadow: msg.isMe ? `0 4px 12px ${color}33` : "none",
          }}
        >
          {msg.text}
        </div>
        <p className={`text-[10px] text-[#b0abc0] mt-0.5 ${msg.isMe ? "text-right" : "text-left"}`}>
          {msg.time}
        </p>
      </div>
    </div>
  );
}
