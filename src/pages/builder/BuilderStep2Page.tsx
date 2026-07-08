// src/pages/builder/BuilderStep2Page.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../../components/layout/NavTabs";
import BuilderStepper from "../../components/builder/BuilderStepper";
import ExtraExperienceStep from "../../components/builder/ExtraExperienceStep";
import Button from "../../components/common/Button";
import { useBuilderStore } from "../../store/builderStore";
import { isExtraExperienceComplete } from "../../utils/builderValidation";

export default function BuilderStep2Page() {
  const navigate = useNavigate();
  const {
    awards, addAward, removeAward, updateAward,
    activities, addActivity, removeActivity, updateActivity,
  } = useBuilderStore();

  const [attemptedNext, setAttemptedNext] = useState(false);

  const handleContinue = () => {
    if (!isExtraExperienceComplete({ awards, activities })) {
      setAttemptedNext(true);
      return;
    }
    navigate("/builder/step3");
  };

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-190 mx-auto px-8 py-10">
        <BuilderStepper currentStep={3} />

        <div className="bg-white rounded-3xl p-10 border border-surface-container shadow-[0_1px_16px_rgba(59,130,246,0.08)]">
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-2 font-label">
              3 / 4 단계
            </p>
            <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-2">추가 경험 입력</h1>
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              수상경력과 활동 이력을 추가하세요.
            </p>
          </div>

          <ExtraExperienceStep
            awards={awards}
            onAddAward={addAward}
            onRemoveAward={removeAward}
            onChangeAward={updateAward}
            activities={activities}
            onAddActivity={addActivity}
            onRemoveActivity={removeActivity}
            onChangeActivity={updateActivity}
            showErrors={attemptedNext}
          />

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => navigate("/builder/step1")}>← 이전</Button>
            <Button variant="primary" onClick={handleContinue}>다음: 마무리 →</Button>
          </div>
        </div>
      </main>
    </div>
  );
}