// src/pages/MyPage.tsx
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import NavTabs from "../components/layout/NavTabs";

export default function MyPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const profile = {
    name: "Elena Vane",
    email: "elena@cupoli.com",
    role: "Senior Product Designer",
    github: "https://github.com/elenavane",
    bio: "I transmute complex problems into seamless digital experiences.",
    skills: ["UX Design", "Product Strategy", "Figma", "React", "AI Tools"],
    joinedAt: "2024.01.15",
    portfolioCount: 4,
    totalViews: 12482,
    chatRequests: 18,
  };

  const stats = [
    { label: "Total Views", value: profile.totalViews.toLocaleString() },
    { label: "Chat Requests", value: String(profile.chatRequests) },
    { label: "Portfolios", value: String(profile.portfolioCount) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavTabs />
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0 bg-[linear-gradient(135deg,#6347d1,#9c48ea)]">
            {profile.name[0]}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-sm text-purple-600 font-medium">{profile.role}</p>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <p className="text-xs text-gray-400">가입일: {profile.joinedAt}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-purple-600">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
          <h2 className="font-semibold text-gray-800">GitHub</h2>
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-purple-600 hover:underline">
            <span>🔗</span>
            {profile.github}
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
          <h2 className="font-semibold text-gray-800">Bio</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
          <h2 className="font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                {skill}
              </span>
            ))}
          </div>
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