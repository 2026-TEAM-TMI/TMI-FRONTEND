// src/store/authStore.ts
import { create } from "zustand";
import type { User } from "../types/user";

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
  | "coffee-chat"
  | "mypage";

interface AuthState {
  currentRoute: AppRoute;
  navigate: (route: AppRoute) => void;
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentRoute: "login",
  navigate: (route) => set({ currentRoute: route }),
  user: null,
  token: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  setToken: (token) => set({ token }),
  logout: () =>
    set({ user: null, token: null, isLoggedIn: false, currentRoute: "login" }),
}));