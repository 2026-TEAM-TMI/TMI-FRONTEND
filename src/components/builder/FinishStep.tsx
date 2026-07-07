import type { KeyboardEvent } from "react";
import { Textarea } from "../common/Input";

const STYLE_PRESETS = [
  { id: "ethereal", name: "Ethereal Alchemist", color: "#6347d1", desc: "Mystic purple & lavender whites", icon: "" },
  { id: "obsidian", name: "Obsidian Forge", color: "#121c2a", desc: "Dark & dramatic", icon: "" },
  { id: "aurora", name: "Aurora Drift", color: "#8127cf", desc: "Vibrant & expressive", icon: "" },
  { id: "custom", name: "Custom Style", color: "#797585", desc: "직접 스타일을 설명하세요", icon: "✏️" },
];

interface FinishStepProps {
  direction: string;
  onDirectionChange: (v: string) => void;
  tags: string[];
  tagInput: string;
  onTagInputChange: (v: string) => void;
  onTagKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (t: string) => void;
  selectedStyle: string;
  onStyleChange: (id: string) => void;
  customStyleDesc: string;
  onCustomStyleDescChange: (v: string) => void;
  customPrompt: string;
  onCustomPromptChange: (v: string) => void;
}

export default function FinishStep({
  direction, onDirectionChange,
  tags, tagInput, onTagInputChange, onTagKeyDown, onRemoveTag,
  selectedStyle, onStyleChange,
  customStyleDesc, onCustomStyleDescChange,
  customPrompt, onCustomPromptChange,
}: FinishStepProps) {
  return (
    <>
      <div className="mb-7">
        <label className="block text-[15px] font-bold text-on-surface mb-1.5">📝 포트폴리오 방향 설명</label>
        <p className="text-[13px] text-outline mb-2.5">AI가 어떤 방향으로 포트폴리오를 구성할지 자유롭게 작성해주세요.</p>
        <Textarea
          value={direction}
          onChange={(e) => onDirectionChange(e.target.value)}
          rows={4}
          placeholder={"예) 백엔드 개발자로서 대용량 트래픽 처리 경험과 시스템 설계 역량을 강조하고 싶어요.\n실무 프로젝트 위주로 임팩트 있는 수치를 부각시켜 주세요.\n신입이지만 책임감 있고 성장 가능성이 높은 개발자 이미지를 만들어 주세요."}
          style={{ minHeight: "110px" }}
        />
      </div>

      <div className="mb-7">
        <label className="block text-[15px] font-bold text-on-surface mb-1.5">🏷️ 강조할 키워드</label>
        <p className="text-[13px] text-outline mb-2.5">포트폴리오에서 부각시키고 싶은 단어를 입력 후 Enter 또는 쉼표로 추가하세요.</p>
        <div
          className="flex flex-wrap gap-2 p-2.5 bg-surface border border-surface-container rounded-xl min-h-[50px] items-center cursor-text"
          onClick={() => document.getElementById("tag-input")?.focus()}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[13px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#6347d1,#9c48ea)", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              {tag}
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveTag(tag); }}
                className="bg-transparent border-0 text-white/80 cursor-pointer text-sm leading-none p-0"
              >
                ×
              </button>
            </span>
          ))}
          <input
            id="tag-input"
            value={tagInput}
            onChange={(e) => onTagInputChange(e.target.value)}
            onKeyDown={onTagKeyDown}
            placeholder={tags.length === 0 ? "e.g. 대용량 트래픽, 시스템 설계, MSA, 리더십..." : ""}
            className="border-0 outline-none bg-transparent text-sm text-on-surface font-[inherit] flex-1 min-w-[120px]"
          />
        </div>
      </div>

      <div className="mb-7">
        <h3 className="text-[15px] font-bold text-on-surface mb-3.5">🎨 Visual Style</h3>
        <div className="grid grid-cols-2 gap-3">
          {STYLE_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onStyleChange(preset.id)}
              className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-150"
              style={{
                border: `2px solid ${selectedStyle === preset.id ? "#6347d1" : "#e6eeff"}`,
                background: selectedStyle === preset.id ? "#f0f0ff" : "#f8f9ff",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-lg"
                style={{
                  background: preset.id === "custom"
                    ? "linear-gradient(135deg,#c9c4d6,#797585)"
                    : preset.color,
                }}
              >
                {preset.icon}
              </div>
              <div>
                <p className="font-bold text-[13px] text-on-surface">{preset.name}</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">{preset.desc}</p>
              </div>
              {selectedStyle === preset.id && (
                <span className="ml-auto text-primary-container text-base">✓</span>
              )}
            </div>
          ))}
        </div>

        {selectedStyle === "custom" && (
          <div className="mt-3.5">
            <Textarea
              value={customStyleDesc}
              onChange={(e) => onCustomStyleDescChange(e.target.value)}
              rows={4}
              placeholder={
                "원하는 색상 팔레트, 분위기, 디자인 언어를 자유롭게 설명해주세요.\n\n" +
                "예) 메인 컬러는 딥 네이비(#0a1628)와 시안(#00d4ff)을 사용하고,\n" +
                "미니멀하고 테크니컬한 느낌을 주고 싶어요.\n" +
                "코드 스니펫 스타일의 카드와 모노스페이스 폰트를 활용해주세요."
              }
              style={{ minHeight: "120px", borderColor: "#6347d1", background: "#faf9ff" }}
            />
          </div>
        )}
      </div>

      <div className="mb-7">
        <label className="block text-[15px] font-bold text-on-surface mb-1.5">✨ 전반적인 커스텀 요구사항</label>
        <p className="text-[13px] text-outline mb-2.5">위 항목 외에 AI에게 전달하고 싶은 전반적인 요구사항이 있다면 작성해주세요.</p>
        <Textarea
          value={customPrompt}
          onChange={(e) => onCustomPromptChange(e.target.value)}
          rows={3}
          placeholder="예) 전체적으로 간결하고 신뢰감 있는 톤으로 작성해주세요."
        />
      </div>
    </>
  );
}