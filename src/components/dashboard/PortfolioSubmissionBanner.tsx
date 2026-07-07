import { usePortfolioSubmissionStore } from "../../store/portfolioSubmissionStore";

export default function PortfolioSubmissionBanner() {
  const { status, errorMessage, reset } = usePortfolioSubmissionStore();

  if (status === "idle") return null;

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-low border border-surface-container mb-6">
        <div className="w-4 h-4 rounded-full border-2 border-primary-container border-t-transparent animate-spin" />
        <p className="text-sm font-semibold text-on-surface">포트폴리오를 생성하고 있어요. 완료되면 알려드릴게요.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-surface-low border border-primary-container/40 mb-6">
        <p className="text-sm font-semibold text-on-surface">🎉 포트폴리오가 생성되었습니다!</p>
        <button onClick={reset} className="text-xs font-bold text-outline hover:text-on-surface">닫기</button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-red-50 border border-red-200 mb-6">
      <p className="text-sm font-semibold text-red-600">⚠️ {errorMessage}</p>
      <button onClick={reset} className="text-xs font-bold text-red-400 hover:text-red-600">닫기</button>
    </div>
  );
}