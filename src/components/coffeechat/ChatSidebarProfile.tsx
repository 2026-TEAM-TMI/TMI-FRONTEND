import type { ChatRoom } from "../../types/chat";
import SkillRadarChart from "../portfolio/SkillRadarChart";
import ProgressBar from "../common/ProgressBar";

interface ChatSidebarProfileProps {
  room: ChatRoom;
  onViewPortfolio: () => void;
  onViewAnalysis: () => void;
}

export default function ChatSidebarProfile({ room, onViewPortfolio, onViewAnalysis }: ChatSidebarProfileProps) {
  return (
    <div
      className="w-[268px] shrink-0 bg-white rounded-[18px] border border-surface-container flex flex-col overflow-auto"
      style={{ boxShadow: "0 1px 6px rgba(99,71,209,0.06)" }}
    >
      {/* Profile header */}
      <div className="px-[18px] py-5 text-center border-b border-[#f0f0f8]" style={{ background: "linear-gradient(180deg, #faf9ff 0%, #fff 100%)" }}>
        <div
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[22px] font-extrabold text-white mx-auto mb-2.5"
          style={{
            background: `linear-gradient(135deg, ${room.color}, ${room.color}bb)`,
            boxShadow: `0 4px 16px ${room.color}44`,
          }}
        >
          {room.avatar}
        </div>
        <p className="font-extrabold text-sm text-on-surface">{room.name}</p>
        <p className="text-[11px] font-semibold mt-0.5" style={{ color: room.color }}>{room.role}</p>
        <p className="text-[11px] text-outline mt-0.5">{room.company}</p>
        <p className="text-[11px] text-on-surface-variant leading-snug mt-2.5 text-left px-2.5 py-2 bg-surface rounded-lg">
          {room.bio}
        </p>
      </div>

      {/* Match score */}
      <div className="px-[18px] pt-3.5">
        <div
          className="rounded-2xl px-3.5 py-3 flex items-center justify-between"
          style={{ background: `linear-gradient(135deg, ${room.color}, #9c48ea)` }}
        >
          <div>
            <p
              className="text-[9px] font-bold tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              매칭 점수
            </p>
            <p className="text-[26px] font-extrabold text-white tracking-tight mt-0.5">
              {room.matchScore}<span className="text-sm font-semibold opacity-80">%</span>
            </p>
          </div>
          <div className="text-[28px] opacity-60">✦</div>
        </div>
      </div>

      {/* Radar chart */}
      <div className="px-2 pt-3.5 pb-1">
        <p
          className="text-[10px] font-bold tracking-widest uppercase text-outline text-center mb-1.5"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          직무 역량 레이더
        </p>
        <SkillRadarChart skills={room.skills} size={220} color={room.color} />
      </div>

      {/* Skill bars */}
      <div className="px-[18px] pb-4 flex flex-col gap-2">
        {room.skills.map((s) => (
          <ProgressBar key={s.label} label={s.label} value={s.value} accentColor={room.color} height={4} />
        ))}
      </div>

      <div className="h-px bg-[#f0f0f8] mx-[18px]" />

      {/* Actions */}
      <div className="px-[18px] py-3.5 flex flex-col gap-2">
        <button
          onClick={onViewPortfolio}
          className="w-full py-2.5 rounded-xl text-[12px] font-bold text-primary cursor-pointer font-[inherit] flex items-center justify-center gap-1.5"
          style={{ background: "#eff4ff", border: "1.5px solid #dddaeb" }}
        >
          ✦ 포트폴리오 보기
        </button>
        <button
          onClick={onViewAnalysis}
          className="w-full py-2.5 rounded-xl text-[12px] font-bold text-white border-0 cursor-pointer font-[inherit] flex items-center justify-center gap-1.5"
          style={{
            background: `linear-gradient(135deg, ${room.color}, #9c48ea)`,
            boxShadow: `0 4px 14px ${room.color}33`,
          }}
        >
          📊 상세 분석 보기
        </button>
      </div>
    </div>
  );
}
