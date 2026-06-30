import type { Award } from "../../types/portfolio";
import { TextInput, Textarea } from "../common/Input";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: "600",
  color: "#484554",
  marginBottom: "5px",
};

function AwardCard({
  award,
  index,
  onRemove,
  onChange,
}: {
  award: Award;
  index: number;
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Omit<Award, "id">, value: string) => void;
}) {
  return (
    <div className="bg-surface rounded-2xl border border-surface-container p-5">
      <div className="flex justify-between items-center mb-3.5">
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#8127cf", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          수상 {index + 1}
        </span>
        <button onClick={() => onRemove(award.id)} className="bg-transparent border-0 text-outline text-lg cursor-pointer px-1">×</button>
      </div>
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>수상 이름</label>
          <TextInput placeholder="e.g. 대학생 창업 아이디어 경진대회 최우수상" value={award.name} onChange={(e) => onChange(award.id, "name", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>상 타입</label>
          <TextInput placeholder="e.g. 최우수상, 금상" value={award.type} onChange={(e) => onChange(award.id, "type", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>받은 날짜</label>
          <TextInput type="date" value={award.date} onChange={(e) => onChange(award.id, "date", e.target.value)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>상 설명</label>
          <Textarea placeholder="이 수상에 대한 간략한 설명을 입력하세요." value={award.description} onChange={(e) => onChange(award.id, "description", e.target.value)} rows={2} />
        </div>
      </div>
    </div>
  );
}

interface AwardsSectionProps {
  awards: Award[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Omit<Award, "id">, value: string) => void;
}

export default function AwardsSection({ awards, onAdd, onRemove, onChange }: AwardsSectionProps) {
  return (
    <div className="mb-9">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <h3 className="text-[15px] font-bold text-on-surface">🏆 수상 경력</h3>
          <p className="text-[12px] text-outline mt-0.5">해커톤, 공모전, 경진대회 수상 내역</p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-full text-[13px] font-bold text-white border-0 cursor-pointer font-[inherit]"
          style={{ background: "linear-gradient(135deg,#6347d1,#9c48ea)", boxShadow: "0 4px 12px rgba(99,71,209,0.25)" }}
        >
          + 수상 추가
        </button>
      </div>
      {awards.length === 0 ? (
        <div className="border-2 border-dashed border-outline-variant rounded-2xl p-7 text-center text-outline text-sm">
          <div className="text-3xl mb-2">🏅</div>
          <p>아직 추가된 수상 경력이 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {awards.map((a, i) => <AwardCard key={a.id} award={a} index={i} onRemove={onRemove} onChange={onChange} />)}
        </div>
      )}
    </div>
  );
}
