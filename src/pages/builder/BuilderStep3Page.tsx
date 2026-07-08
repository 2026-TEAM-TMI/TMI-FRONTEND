// src/pages/builder/BuilderStep3Page.tsx
import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../../components/layout/NavTabs";
import BuilderStepper from "../../components/builder/BuilderStepper";
import FinishStep from "../../components/builder/FinishStep";
import VisibilitySettings from "../../components/builder/VisibilitySettings";
import Button from "../../components/common/Button";
import { useBuilderStore } from "../../store/builderStore";
import { submitPortfolio } from "../../utils/submitPortfolio";
import { isBasicInfoComplete, isConnectStepComplete, isExtraExperienceComplete } from "../../utils/builderValidation";

export default function BuilderStep3Page() {
  const navigate = useNavigate();
  const {
    portfolioTitle, portfolioDescription, name, bio,
    selectedCategory, repos,
    awards, activities,
    direction, setDirection,
    tags, setTags,
    selectedStyle, setSelectedStyle,
    customStyleDesc, setCustomStyleDesc,
    customPrompt, setCustomPrompt,
    visibility, setVisibility,
  } = useBuilderStore();

  const [tagInput, setTagInput] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,$/, "");
      if (newTag && !tags.includes(newTag)) setTags([...tags, newTag]);
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  // 각 단계의 Continue 가드를 통과해야 여기 도달하지만, 직접 URL 접근 등으로 단계를 건너뛴 경우에 대비한 최종 안전망.
  const handleComplete = () => {
    if (!isBasicInfoComplete({ portfolioTitle, portfolioDescription, name, bio })) {
      setSubmitError("기본 정보가 비어 있어요. 'Basic Info' 단계에서 필수 항목을 입력해주세요.");
      return;
    }
    if (!isConnectStepComplete({ selectedCategory, repos })) {
      setSubmitError("직무 카테고리 또는 프로젝트가 비어 있어요. 'Connect' 단계에서 확인해주세요.");
      return;
    }
    if (!isExtraExperienceComplete({ awards, activities })) {
      setSubmitError("수상 경력 또는 활동 이력의 이름이 비어 있어요. 'Experience' 단계에서 확인해주세요.");
      return;
    }
    submitPortfolio();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-190 mx-auto px-8 py-10">
        <BuilderStepper currentStep={4} />

        <div className="bg-white rounded-3xl p-10 border border-surface-container shadow-[0_1px_16px_rgba(59,130,246,0.08)]">
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-2 font-label">
              4 / 4 단계
            </p>
            <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-2">마지막 단계</h1>
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              포트폴리오의 방향과 스타일을 설정하고 공개 범위를 선택하세요.
            </p>
          </div>

          <FinishStep
            direction={direction}
            onDirectionChange={setDirection}
            tags={tags}
            tagInput={tagInput}
            onTagInputChange={setTagInput}
            onTagKeyDown={handleTagKeyDown}
            onRemoveTag={(t) => setTags(tags.filter((x) => x !== t))}
            selectedStyle={selectedStyle}
            onStyleChange={setSelectedStyle}
            customStyleDesc={customStyleDesc}
            onCustomStyleDescChange={setCustomStyleDesc}
            customPrompt={customPrompt}
            onCustomPromptChange={setCustomPrompt}
          />

          <VisibilitySettings value={visibility} onChange={setVisibility} />

          {submitError && (
            <p className="text-[13px] text-red-500 font-semibold mb-4 text-right">{submitError}</p>
          )}

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => navigate("/builder/step2")}>← 이전</Button>
            <Button variant="primary" onClick={handleComplete}>완료하기</Button>
          </div>
        </div>
      </main>
    </div>
  );
}