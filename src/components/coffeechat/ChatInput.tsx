interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  accentColor: string;
}

export default function ChatInput({ value, onChange, onSend, accentColor }: ChatInputProps) {
  return (
    <div className="flex gap-2.5 items-center px-5 py-3.5 border-t border-[#f0f0f8] bg-[#faf9ff]">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="메시지를 입력하세요..."
        onKeyDown={(e) => { if (e.key === "Enter") onSend(); }}
        onFocus={(e) => { e.target.style.borderColor = accentColor; }}
        onBlur={(e) => { e.target.style.borderColor = "#e6eeff"; }}
        className="flex-1 px-4 py-2.5 bg-white rounded-xl text-[13px] text-on-surface outline-none font-[inherit]"
        style={{ border: "1.5px solid #e6eeff" }}
      />
      <button
        onClick={onSend}
        className="w-[42px] h-[42px] rounded-xl border-0 text-white text-base cursor-pointer flex items-center justify-center shrink-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, #38bdf8)`,
          boxShadow: `0 4px 12px ${accentColor}44`,
        }}
      >
        →
      </button>
    </div>
  );
}
