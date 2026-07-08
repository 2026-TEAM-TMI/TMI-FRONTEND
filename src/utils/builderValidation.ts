// 빌더 각 단계의 "다음" 진행 및 최종 제출을 막는 필수값 검증. API 명세의 Nullable=X 필드 기준.

export function isBasicInfoComplete(v: {
  portfolioTitle: string;
  portfolioDescription: string;
  name: string;
  bio: string;
}): boolean {
  return (
    v.portfolioTitle.trim() !== "" &&
    v.portfolioDescription.trim() !== "" &&
    v.name.trim() !== "" &&
    v.bio.trim() !== ""
  );
}

export function hasValidProject(repos: { repositoryId: number | null }[]): boolean {
  return repos.some((r) => r.repositoryId !== null);
}

export function isConnectStepComplete(v: {
  selectedCategory: string | null;
  repos: { repositoryId: number | null }[];
}): boolean {
  return v.selectedCategory !== null && hasValidProject(v.repos);
}

export function isExtraExperienceComplete(v: {
  awards: { title: string }[];
  activities: { title: string }[];
}): boolean {
  return (
    v.awards.every((a) => a.title.trim() !== "") &&
    v.activities.every((a) => a.title.trim() !== "")
  );
}
