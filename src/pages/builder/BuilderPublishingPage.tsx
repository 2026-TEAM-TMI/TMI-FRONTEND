import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavTabs from "../../components/layout/NavTabs";
import Button from "../../components/common/Button";
import { useBuilderStore } from "../../store/builderStore";
import { createPortfolio } from "../../api/portfolioApi";
import type { CreatePortfolioRequest } from "../../types/portfolio";

export default function BuilderPublishingPage() {
  const navigate = useNavigate();
  const store = useBuilderStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const submittedRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const contactMap = Object.fromEntries(
      store.contact.filter((c) => c.label.trim()).map((c) => [c.label, c.value])
    );

    const doneFileKeys = (files: { status: string; key?: string }[]) =>
      files.filter((f) => f.status === "done" && f.key).map((f) => f.key as string);

    const body: CreatePortfolioRequest = {
      portfolioTitle: store.portfolioTitle,
      portfolioDescription: store.portfolioDescription,
      isPublic: store.visibility === "public",
      name: store.name,
      contact: Object.keys(contactMap).length > 0 ? contactMap : undefined,
      address: store.address || undefined,
      description: store.bio,
      jobCategory: store.selectedCategory ?? "",
      portfolioImageKeys: doneFileKeys(store.portfolioImages),
      customPrompt: store.customPrompt || undefined,
      projects: store.repos
        .filter((r) => r.repositoryId !== null)
        .map((r) => ({
          name: r.name,
          repositoryId: r.repositoryId as number,
          description: r.description || undefined,
          fileKeys: doneFileKeys(r.files),
          imageKeys: doneFileKeys(r.images),
        })),
      awards: store.awards.map((a) => ({
        title: a.title,
        organization: a.organization || undefined,
        date: a.date || undefined,
        description: a.description || undefined,
      })),
      activities: store.activities.map((a) => ({
        title: a.title,
        organization: a.organization || undefined,
        period: a.period || undefined,
        description: a.description || undefined,
      })),
    };

    createPortfolio(body)
      .then(() => {
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "포트폴리오 생성 중 오류가 발생했습니다.");
      });
  }, [store]);

  return (
    <div className="min-h-svh bg-surface font-sans">
      <NavTabs />
      <main className="max-w-190 mx-auto px-8 py-10">
        <div className="bg-white rounded-3xl p-10 border border-surface-container shadow-[0_1px_16px_rgba(99,71,209,0.08)] text-center">
          {status === "loading" && (
            <>
              <div className="text-4xl mb-4">✨</div>
              <h1 className="text-[22px] font-extrabold text-on-surface mb-2">포트폴리오를 만드는 중이에요...</h1>
              <p className="text-[14px] text-on-surface-variant">잠시만 기다려주세요.</p>
            </>
          )}
          {status === "success" && (
            <>
              <div className="text-4xl mb-4">🎉</div>
              <h1 className="text-[22px] font-extrabold text-on-surface mb-2">포트폴리오가 생성되었습니다!</h1>
              <div className="flex justify-center gap-3 mt-6">
                <Button variant="ghost" onClick={() => navigate("/dashboard")}>대시보드로</Button>
                <Button variant="primary" onClick={() => navigate("/portfolio/preview")}>미리보기</Button>
              </div>
            </>
          )}
          {status === "error" && (
            <>
              <div className="text-4xl mb-4">⚠️</div>
              <h1 className="text-[22px] font-extrabold text-on-surface mb-2">포트폴리오 생성에 실패했습니다</h1>
              <p className="text-[13px] text-red-500 mb-6">{errorMsg}</p>
              <Button variant="primary" onClick={() => navigate("/builder/step3")}>이전으로 돌아가기</Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}