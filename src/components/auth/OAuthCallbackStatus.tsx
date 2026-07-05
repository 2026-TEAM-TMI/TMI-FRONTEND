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
          className="px-4 py-2 rounded-xl bg-purple-50 text-sm font-medium text-purple-600 hover:bg-purple-100 transition-colors"
        >
          로그인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-sm text-gray-500">로그인 처리 중입니다...</p>
    </div>
  );
}
