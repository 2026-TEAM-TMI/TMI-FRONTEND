import { createPortfolio } from "../api/portfolioApi";
import type { CreatePortfolioRequest } from "../types/portfolio";
import { useBuilderStore } from "../store/builderStore";
import { usePortfolioStore } from "../store/portfolioStore";

const doneFileKeys = (files: { status: string; key?: string }[]) =>
  files.filter((f) => f.status === "done" && f.key).map((f) => f.key as string);

// 드랍다운에서 고른 종류를 실제 라벨로 변환. "기타"는 사용자가 입력한 커스텀 라벨을 사용.
const resolveContactLabel = (c: { type: string; customLabel: string }) =>
  c.type === "기타" ? c.customLabel.trim() : c.type;

export async function submitPortfolio() {
  const store = useBuilderStore.getState();
  const portfolioStore = usePortfolioStore.getState();

  const displayTitle = store.portfolioTitle || "새 포트폴리오";
  const tempId = portfolioStore.addGeneratingPortfolio(displayTitle, store.tags);

  const contactMap = Object.fromEntries(
    store.contact
      .map((c) => [resolveContactLabel(c), c.value] as const)
      .filter(([label]) => label.trim() !== "")
  );

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

  try {
    await createPortfolio(body);
    portfolioStore.markPublished(tempId);
    store.resetBuilder();
  } catch (err) {
    console.error("포트폴리오 생성 실패:", err);
    portfolioStore.markError(tempId);
  }
}