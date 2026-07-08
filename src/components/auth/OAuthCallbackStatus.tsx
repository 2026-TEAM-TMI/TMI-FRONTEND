import LoadingScreen from "../common/LoadingScreen";

interface OAuthCallbackStatusProps {
  error: string | null;
  onRetry: () => void;
}

export default function OAuthCallbackStatus({ error, onRetry }: OAuthCallbackStatusProps) {
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <p className="text-sm text-red-500">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-xl bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
        >
          로그인으로 돌아가기
        </button>
      </div>
    );
  }

  return <LoadingScreen label="로그인 처리 중입니다..." />;
}
