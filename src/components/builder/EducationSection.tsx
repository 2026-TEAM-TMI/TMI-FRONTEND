import type { Education } from "../../types/portfolio";
import { TextInput, Textarea } from "../common/Input";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: "600",
  color: "#484554",
  marginBottom: "5px",
};

function EducationCard({
  edu,
  index,
  onRemove,
  onChange,
}: {
  edu: Education;
  index: number;
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Omit<Education, "id">, value: string) => void;
}) {
  return (
    <div className="bg-surface rounded-2xl border border-surface-container p-5">
      <div className="flex justify-between items-center mb-3.5">
        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#4b2ab8", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          교육/부트캠프 {index + 1}
        </span>
        <button onClick={() => onRemove(edu.id)} className="bg-transparent border-0 text-outline text-lg cursor-pointer px-1">×</button>
      </div>
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>프로그램 이름</label>
          <TextInput placeholder="e.g. 삼성 청년 SW 아카데미 (SSAFY)" value={edu.program} onChange={(e) => onChange(edu.id, "program", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>시작일</label>
          <TextInput type="date" value={edu.startDate} onChange={(e) => onChange(edu.id, "startDate", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>종료일</label>
          <TextInput type="date" value={edu.endDate} onChange={(e) => onChange(edu.id, "endDate", e.target.value)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>설명</label>
          <Textarea placeholder="배운 내용, 프로젝트, 주요 성과 등을 입력하세요." value={edu.description} onChange={(e) => onChange(edu.id, "description", e.target.value)} rows={2} />
        </div>
      </div>
    </div>
  );
}

interface EducationSectionProps {
  educations: Education[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (id: number, field: keyof Omit<Education, "id">, value: string) => void;
}

export default function EducationSection({ educations, onAdd, onRemove, onChange }: EducationSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <h3 className="text-[15px] font-bold text-on-surface">🎓 외부 교육 / 부트캠프</h3>
          <p className="text-[12px] text-outline mt-0.5">자격증, 온라인 강의, 부트캠프 등</p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-full text-[13px] font-bold text-white border-0 cursor-pointer font-[inherit]"
          style={{ background: "linear-gradient(135deg,#6347d1,#9c48ea)", boxShadow: "0 4px 12px rgba(99,71,209,0.25)" }}
        >
          + 교육 추가
        </button>
      </div>
      {educations.length === 0 ? (
        <div className="border-2 border-dashed border-outline-variant rounded-2xl p-7 text-center text-outline text-sm">
          <div className="text-3xl mb-2">📚</div>
          <p>아직 추가된 교육 정보가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {educations.map((e, i) => <EducationCard key={e.id} edu={e} index={i} onRemove={onRemove} onChange={onChange} />)}
        </div>
      )}
    </div>
  );
}
