import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import RequireAuth from "../components/auth/RequireAuth";
import LoginPage from "../pages/LoginPage";
import OAuthCallbackPage from "../pages/OAuthCallbackPage";
import DashboardPage from "../pages/DashboardPage";
import BuilderBasicInfoPage from "../pages/builder/BuilderBasicInfoPage";
import BuilderStep1Page from "../pages/builder/BuilderStep1Page";
import BuilderStep2Page from "../pages/builder/BuilderStep2Page";
import BuilderStep3Page from "../pages/builder/BuilderStep3Page";
import PortfolioPreviewPage from "../pages/PortfolioPreviewPage";
import PortfolioFeedPage from "../pages/PortfolioFeedPage";
import PortfolioAuthorFeedPage from "../pages/PortfolioAuthorFeedPage";
import PortfolioAnalysisPage from "../pages/PortfolioAnalysisPage";
import PortfolioFeedbackPage from "../pages/PortfolioFeedbackPage";
import CoffeeChatPage from "../pages/CoffeeChatPage";
import MyPage from "../pages/MyPage";

export default function AppRouter() {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="animate-page-in">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/oauth2/code/github" element={<OAuthCallbackPage />} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/builder/basic-info" element={<RequireAuth><BuilderBasicInfoPage /></RequireAuth>} />
        <Route path="/builder/step1" element={<RequireAuth><BuilderStep1Page /></RequireAuth>} />
        <Route path="/builder/step2" element={<RequireAuth><BuilderStep2Page /></RequireAuth>} />
        <Route path="/builder/step3" element={<RequireAuth><BuilderStep3Page /></RequireAuth>} />
        <Route path="/portfolio/preview" element={<RequireAuth><PortfolioPreviewPage /></RequireAuth>} />
        <Route path="/portfolio/feed" element={<RequireAuth><PortfolioFeedPage /></RequireAuth>} />
        <Route path="/portfolio/author/:memberId" element={<RequireAuth><PortfolioAuthorFeedPage /></RequireAuth>} />
        <Route path="/portfolio/analysis" element={<RequireAuth><PortfolioAnalysisPage /></RequireAuth>} />
        <Route path="/portfolio/feedback" element={<RequireAuth><PortfolioFeedbackPage /></RequireAuth>} />
        <Route path="/coffee-chat" element={<RequireAuth><CoffeeChatPage /></RequireAuth>} />
        <Route path="/mypage" element={<RequireAuth><MyPage /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}