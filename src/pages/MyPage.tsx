// src/pages/MyPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";
import { getMyInfo } from "../api/memberApi";
import type { Member } from "../types/member";
import { ApiError } from "../api/httpClient";

export default function MyPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getMyInfo()
      .then((data) => {
        if (!cancelled) setMember(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "내 정보를 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavTabs />
        <div className="max-w-3xl mx-auto px-6 py-10 text-sm text-gray-500">불러오는 중...</div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-background">
        <NavTabs />
        <div className="max-w-3xl mx-auto px-6 py-10 text-sm text-red-500">
          {error ?? "내 정보를 불러오지 못했습니다."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavTabs />
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center gap-6">
          {member.profileImage ? (
            <img
              src={member.profileImage}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0 bg-[linear-gradient(135deg,#6347d1,#9c48ea)]">
              {member.name[0]}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
            <p className="text-sm text-purple-600 font-medium">{member.role}</p>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
          <h2 className="font-semibold text-gray-800">GitHub</h2>
          {member.githubLogin ? (
            <a
              href={`https://github.com/${member.githubLogin}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-purple-600 hover:underline"
            >
              <span>🔗</span>
              {member.githubLogin}
            </a>
          ) : (
            <p className="text-sm text-gray-400">연동된 GitHub 계정이 없습니다.</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ← Dashboard
          </button>
          <button
            onClick={logout}
            className="flex-1 py-3 rounded-xl bg-red-50 text-sm font-medium text-red-500 hover:bg-red-100 transition-colors"
          >
            로그아웃
          </button>
        </div>

      </div>
    </div>
  );
}
