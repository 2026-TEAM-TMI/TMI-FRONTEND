// src/routes/AppRouter.tsx
import { useAuthStore } from "../store/authStore";

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
  const currentRoute = useAuthStore((s) => s.currentRoute);

  switch (currentRoute) {
    case "login":
      return <LoginPage />;
    case "dashboard":
      return <DashboardPage />;
    case "builder-step1":
      return <BuilderStep1Page />;
    case "builder-step2":
      return <BuilderStep2Page />;
    case "builder-step3":
      return <BuilderStep3Page />;
    case "publishing":
      return <PublishingProgressPage />;
    case "portfolio-preview":
      return <PortfolioPreviewPage />;
    case "portfolio-feed":
      return <PortfolioFeedPage />;
    case "portfolio-masterpieces":
      return <PortfolioMasterpiecesPage />;
    case "portfolio-detail":
      return <PortfolioDetailPage />;
    case "portfolio-analysis":
      return <PortfolioAnalysisPage />;
    case "portfolio-feedback":
      return <PortfolioFeedbackPage />;
    case "coffee-chat":
      return <CoffeeChatPage />;
    default:
      return <LoginPage />;
  }
}