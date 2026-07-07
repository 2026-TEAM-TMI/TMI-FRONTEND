// 피드 응답에는 memberId가 내려오지 않아, S3 저장 경로 규칙(.../portfolios/{memberId}/{uuid}.html)에서
// 임시로 추출한다. 백엔드가 memberId 필드를 내려주면 이 파싱은 걷어내야 한다.
export function extractMemberIdFromPortfolioUrl(url: string): number | null {
  const match = url.match(/\/portfolios\/(\d+)\//);
  return match ? Number(match[1]) : null;
}
