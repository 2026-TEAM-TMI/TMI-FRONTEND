import { create } from "zustand";
import type { User } from "../types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null, isLoggedIn: false }),
}));
