// src/pages/builder/BuilderStep1Page.tsx
import { useNavigate } from "react-router-dom";
import NavTabs from "../../components/layout/NavTabs";
import BuilderStepper from "../../components/builder/BuilderStepper";
import GithubConnectStep from "../../components/builder/GithubConnectStep";
import Button from "../../components/common/Button";
import { useBuilderStore } from "../../store/builderStore";

export default function BuilderStep1Page() {
  const navigate = useNavigate();
  const {
    selectedCategory, setSelectedCategory,
    repos, addRepo, removeRepo, updateRepo,
  } = useBuilderStore();

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-190 mx-auto px-8 py-10">
        <BuilderStepper currentStep={1} />

        <div className="bg-white rounded-3xl p-10 border border-surface-container shadow-[0_1px_16px_rgba(99,71,209,0.08)]">
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-2 font-label">
              Step 1 of 3
            </p>
            <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight mb-2">Connect Your Grimoire ✦</h1>
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
          />

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>← Cancel</Button>
            <Button variant="primary" onClick={() => navigate("/builder/step2")}>Continue Crafting →</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
