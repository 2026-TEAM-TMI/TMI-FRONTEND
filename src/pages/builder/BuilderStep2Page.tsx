// src/pages/builder/BuilderStep2Page.tsx
import { useAuthStore } from "../../store/authStore";
import NavTabs from "../../components/layout/NavTabs";
import BuilderStepper from "../../components/builder/BuilderStepper";
import AwardsSection from "../../components/builder/AwardsSection";
import EducationSection from "../../components/builder/EducationSection";
import Button from "../../components/common/Button";
import { useBuilderStore } from "../../store/builderStore";

export default function BuilderStep2Page() {
  const navigate = useAuthStore((s) => s.navigate);
  const {
    awards, addAward, removeAward, updateAward,
    educations, addEducation, removeEducation, updateEducation,
  } = useBuilderStore();

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-190 mx-auto px-8 py-10">
        <BuilderStepper currentStep={2} />

        <div className="bg-white rounded-3xl p-10 border border-surface-container" className_PLACEHOLDER>
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-2 font-label">
              Step 2 of 3
            </p>
            <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-2">Add Extra Experience ✦</h1>
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              수상경력과 외부 교육/부트캠프 정보를 추가하세요.
            </p>
          </div>

          <AwardsSection awards={awards} onAdd={addAward} onRemove={removeAward} onChange={updateAward} />
          <EducationSection educations={educations} onAdd={addEducation} onRemove={removeEducation} onChange={updateEducation} />

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => navigate("builder-step1")}>← Back</Button>
            <Button variant="primary" onClick={() => navigate("builder-step3")}>Next: Finish →</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
