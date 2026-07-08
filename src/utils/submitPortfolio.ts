import { createPortfolio } from "../api/portfolioApi";
import type { CreatePortfolioRequest } from "../types/portfolio";
import { useBuilderStore } from "../store/builderStore";
import { usePortfolioStore } from "../store/portfolioStore";
import { STYLE_PRESETS } from "../components/builder/FinishStep";

const doneFileKeys = (files: { status: string; key?: string }[]) =>
  files.filter((f) => f.status === "done" && f.key).map((f) => f.key as string);

// 드랍다운에서 고른 종류를 실제 라벨로 변환. "기타"는 사용자가 입력한 커스텀 라벨을 사용.
const resolveContactLabel = (c: { type: string; customLabel: string }) =>
  c.type === "기타" ? c.customLabel.trim() : c.type;

// 백엔드 CreatePortfolioRequest엔 direction/tags/selectedStyle 전용 필드가 없고
// 자유 입력을 받는 통로가 customPrompt 하나뿐이라, FinishStep에서 받은 나머지 입력을
// customPrompt 텍스트에 합쳐서 전송한다 (그대로 두면 서버에 전혀 전달되지 않음).
function buildCustomPrompt(store: ReturnType<typeof useBuilderStore.getState>): string | undefined {
  const parts: string[] = [];

  if (store.direction.trim()) {
    parts.push(`[포트폴리오 방향]\n${store.direction.trim()}`);
  }
  if (store.tags.length > 0) {
    parts.push(`[강조 키워드]\n${store.tags.join(", ")}`);
  }

  const preset = STYLE_PRESETS.find((p) => p.id === store.selectedStyle);
  if (store.selectedStyle === "custom" && store.customStyleDesc.trim()) {
    parts.push(`[비주얼 스타일]\n${store.customStyleDesc.trim()}`);
  } else if (preset && preset.id !== "custom") {
    parts.push(`[비주얼 스타일]\n${preset.name} — ${preset.desc}`);
  }

  if (store.customPrompt.trim()) {
    parts.push(store.customPrompt.trim());
  }

  return parts.length > 0 ? parts.join("\n\n") : undefined;
}

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
    customPrompt: buildCustomPrompt(store),
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