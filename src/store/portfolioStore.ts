import { create } from "zustand";
import type { PortfolioListItem } from "../types/portfolio";

let _id = 100;

interface PortfolioState {
  portfolios: PortfolioListItem[];
  addGeneratingPortfolio: (title: string, tags: string[]) => number;
  markPublished: (id: number) => void;
  markError: (id: number) => void;
  removePortfolio: (id: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  portfolios: [
    { id: 1, title: "Lumina: Generative Dreamscapes", tags: ["UX", "AI", "GENERATIVE"], updated: "Updated 2h ago", views: "4.2k", status: "published" },
    { id: 2, title: "Nebula OS: System Design", tags: ["SYSTEM", "VR/AR"], updated: "Updated 5d ago", views: "2.8k", status: "published" },
    { id: 3, title: "Soma Skincare Branding", tags: ["BRANDING", "E-COM"], updated: "Updated 1w ago", views: "3.1k", status: "draft" },
    { id: 4, title: "Pulse Dashboard: Health-Tech", tags: ["DASHBOARD", "DATA"], updated: "Updated 2w ago", views: "1.9k", status: "published" },
  ],

  addGeneratingPortfolio: (title, tags) => {
    const id = _id++;
    set((s) => ({
      portfolios: [
        { id, title, tags, updated: "Generating now", views: "0", status: "generating" },
        ...s.portfolios,
      ],
    }));
    return id;
  },

  markPublished: (id) =>
    set((s) => ({
      portfolios: s.portfolios.map((p) =>
        p.id === id ? { ...p, status: "published", updated: "Updated just now" } : p
      ),
    })),

  markError: (id) =>
    set((s) => ({
      portfolios: s.portfolios.map((p) =>
        p.id === id ? { ...p, status: "error", updated: "생성 실패" } : p
      ),
    })),

  removePortfolio: (id) =>
    set((s) => ({ portfolios: s.portfolios.filter((p) => p.id !== id) })),
}));