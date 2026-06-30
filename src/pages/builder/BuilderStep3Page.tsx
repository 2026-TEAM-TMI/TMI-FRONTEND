// src/pages/builder/BuilderStep3Page.tsx
import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useAuthStore } from "../../store/authStore";
import NavTabs from "../../components/layout/NavTabs";
import BuilderStepper from "../../components/builder/BuilderStepper";
import FinishStep from "../../components/builder/FinishStep";
import VisibilitySettings from "../../components/builder/VisibilitySettings";
import Button from "../../components/common/Button";
import { useBuilderStore } from "../../store/builderStore";

export default function BuilderStep3Page() {
  const navigate = useAuthStore((s) => s.navigate);
  const {
    direction, setDirection,
    tags, setTags,
    selectedStyle, setSelectedStyle,
    customStyleDesc, setCustomStyleDesc,
    visibility, setVisibility,
  } = useBuilderStore();

  const [tagInput, setTagInput] = useState("");

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

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-190 mx-auto px-8 py-10">
        <BuilderStepper currentStep={3} />

        <div className="bg-white rounded-3xl p-10 border border-surface-container shadow-[0_1px_16px_rgba(99,71,209,0.08)]">
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-2 font-label">
              Step 3 of 3
            </p>
            <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-2">Final Enchantments ✦</h1>
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
          />

          <VisibilitySettings value={visibility} onChange={setVisibility} />

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => navigate("builder-step2")}>← Back</Button>
            <Button variant="primary" onClick={() => navigate("publishing")}>Complete ✨ Transmute!</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
