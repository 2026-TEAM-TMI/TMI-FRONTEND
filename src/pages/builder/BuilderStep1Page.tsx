// src/pages/builder/BuilderStep1Page.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../../components/layout/NavTabs";
import BuilderStepper from "../../components/builder/BuilderStepper";
import GithubConnectStep from "../../components/builder/GithubConnectStep";
import Button from "../../components/common/Button";
import { useBuilderStore } from "../../store/builderStore";
import { hasValidProject } from "../../utils/builderValidation";

export default function BuilderStep1Page() {
  const navigate = useNavigate();
  const {
    selectedCategory, setSelectedCategory,
    repos, addRepo, removeRepo, updateRepo, setRepoFiles, setRepoImages,
  } = useBuilderStore();

  const [attemptedNext, setAttemptedNext] = useState(false);

  const handleContinue = () => {
    if (!hasValidProject(repos)) {
      setAttemptedNext(true);
      return;
    }
    navigate("/builder/step2");
  };

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-190 mx-auto px-8 py-10">
        <BuilderStepper currentStep={2} />

        <div className="bg-white rounded-3xl p-10 border border-surface-container shadow-[0_1px_16px_rgba(59,130,246,0.08)]">
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-2 font-label">
              2 / 4 단계
            </p>
            <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-2">GitHub 연동</h1>
            <p className="text-[15px] text-on-surface-variant leading-relaxed">
              GitHub을 연동하고, 레포지토리를 선택해 포트폴리오를 만들어보세요.
            </p>
          </div>

          <GithubConnectStep
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            repos={repos}
            onAddRepo={addRepo}
            onRemoveRepo={removeRepo}
            onUpdateRepo={updateRepo}
            onRepoFilesChange={setRepoFiles}
            onRepoImagesChange={setRepoImages}
            showErrors={attemptedNext}
          />

          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => navigate("/builder/basic-info")}>← 이전</Button>
            <div className="flex flex-col items-end gap-1.5">
              {!selectedCategory && (
                <p className="text-[12px] text-secondary font-semibold">직무 카테고리를 선택해주세요.</p>
              )}
              <Button
                variant="primary"
                disabled={!selectedCategory}
                onClick={handleContinue}
              >
                계속하기 →
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}