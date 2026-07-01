import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import BuilderStep1Page from "../pages/builder/BuilderStep1Page";
import BuilderStep2Page from "../pages/builder/BuilderStep2Page";
import BuilderStep3Page from "../pages/builder/BuilderStep3Page";
import PublishingProgressPage from "../pages/builder/PublishingProgressPage";
import PortfolioPreviewPage from "../pages/PortfolioPreviewPage";
import PortfolioFeedPage from "../pages/PortfolioFeedPage";
import PortfolioMasterpiecesPage from "../pages/PortfolioMasterpiecesPage";
import PortfolioDetailPage from "../pages/PortfolioDetailPage";
import PortfolioAnalysisPage from "../pages/PortfolioAnalysisPage";
import PortfolioFeedbackPage from "../pages/PortfolioFeedbackPage";
import CoffeeChatPage from "../pages/CoffeeChatPage";

export default function AppRouter() {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="animate-page-in">
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/builder/step1" element={<BuilderStep1Page />} />
      <Route path="/builder/step2" element={<BuilderStep2Page />} />
      <Route path="/builder/step3" element={<BuilderStep3Page />} />
      <Route path="/builder/publishing" element={<PublishingProgressPage />} />
      <Route path="/portfolio/preview" element={<PortfolioPreviewPage />} />
      <Route path="/portfolio/feed" element={<PortfolioFeedPage />} />
      <Route path="/portfolio/masterpieces" element={<PortfolioMasterpiecesPage />} />
      <Route path="/portfolio/detail" element={<PortfolioDetailPage />} />
      <Route path="/portfolio/analysis" element={<PortfolioAnalysisPage />} />
      <Route path="/portfolio/feedback" element={<PortfolioFeedbackPage />} />
      <Route path="/coffee-chat" element={<CoffeeChatPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </div>
  );
}
