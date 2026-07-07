import type { Activity } from "../../types/portfolio";
import { TextInput, Textarea } from "../common/Input";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: "600",
  color: "#484554",
  marginBottom: "5px",
};

function ActivityCard({
  activity,
  index,
  onRemove,
  onChange,
  showErrors,
}: {
  activity: Activity;
  index: number;
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Omit<Activity, "id">, value: string) => void;
  showErrors: boolean;
}) {
  const titleError = showErrors && !activity.title.trim();
  return (
    <div className="bg-surface rounded-2xl border border-surface-container p-5">
      <div className="flex justify-between items-center mb-3.5">
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#4b2ab8", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          활동 {index + 1}
        </span>
        <button onClick={() => onRemove(activity.id)} className="bg-transparent border-0 text-outline text-lg cursor-pointer px-1">×</button>
      </div>
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>활동명<span className="text-red-500 ml-0.5">*</span></label>
          <TextInput placeholder="e.g. 삼성 청년 SW 아카데미 (SSAFY)" value={activity.title} onChange={(e) => onChange(activity.id, "title", e.target.value)} error={titleError} />
          {titleError && <p className="text-[12px] text-red-500 mt-1">필수 입력 항목입니다.</p>}
        </div>
        <div>
          <label style={labelStyle}>소속/기관</label>
          <TextInput placeholder="e.g. 삼성전자" value={activity.organization} onChange={(e) => onChange(activity.id, "organization", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>활동 기간</label>
          <TextInput placeholder="e.g. 2023.03 ~ 2023.12" value={activity.period} onChange={(e) => onChange(activity.id, "period", e.target.value)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>설명</label>
          <Textarea placeholder="배운 내용, 프로젝트, 주요 성과 등을 입력하세요." value={activity.description} onChange={(e) => onChange(activity.id, "description", e.target.value)} rows={2} />
        </div>
      </div>
    </div>
  );
}

interface EducationSectionProps {
  activities: Activity[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Omit<Activity, "id">, value: string) => void;
  showErrors?: boolean;
}

export default function EducationSection({ activities, onAdd, onRemove, onChange, showErrors = false }: EducationSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <h3 className="text-[15px] font-bold text-on-surface">🎓 활동 이력</h3>
          <p className="text-[12px] text-outline mt-0.5">자격증, 온라인 강의, 부트캠프, 대외활동 등</p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-full text-[13px] font-bold text-white border-0 cursor-pointer font-[inherit]"
          style={{ background: "linear-gradient(135deg,#6347d1,#9c48ea)", boxShadow: "0 4px 12px rgba(99,71,209,0.25)" }}
        >
          + 활동 추가
        </button>
      </div>
      {activities.length === 0 ? (
        <div className="border-2 border-dashed border-outline-variant rounded-2xl p-7 text-center text-outline text-sm">
          <div className="text-3xl mb-2">📚</div>
          <p>아직 추가된 활동 정보가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {activities.map((a, i) => <ActivityCard key={a.id} activity={a} index={i} onRemove={onRemove} onChange={onChange} showErrors={showErrors} />)}
        </div>
      )}
    </div>
  );
}