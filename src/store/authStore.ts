// src/store/authStore.ts (라우팅 상태 겸용으로 사용)
import { create } from "zustand";

export type AppRoute =
  | "login"
  | "dashboard"
  | "builder-step1"
  | "builder-step2"
  | "builder-step3"
  | "publishing"
  | "portfolio-preview"
  | "portfolio-feed"
  | "portfolio-masterpieces"
  | "portfolio-detail"
  | "portfolio-analysis"
  | "portfolio-feedback"
  | "coffee-chat";

interface AuthState {
  currentRoute: AppRoute;
  navigate: (route: AppRoute) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentRoute: "login",
  navigate: (route) => set({ currentRoute: route }),
}));