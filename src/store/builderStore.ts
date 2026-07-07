import { create } from "zustand";
import type { RepoEntry, RepoFile, Award, Activity, ContactEntry } from "../types/portfolio";

let _repoId = 1;
let _awardId = 1;
let _activityId = 1;
let _contactId = 1;

interface BuilderState {
  // 기본 정보
  portfolioTitle: string;
  portfolioDescription: string;
  name: string;
  contact: ContactEntry[];
  address: string;
  bio: string;
  portfolioImages: RepoFile[];
  customPrompt: string;

  // Step 1
  selectedCategory: string | null;
  repos: RepoEntry[];
  // Step 2
  awards: Award[];
  activities: Activity[];
  // Step 3
  direction: string;
  tags: string[];
  selectedStyle: string;
  customStyleDesc: string;
  visibility: "public" | "private";

  setPortfolioTitle: (v: string) => void;
  setPortfolioDescription: (v: string) => void;
  setName: (v: string) => void;
  addContact: () => void;
  removeContact: (id: number) => void;
  updateContact: (id: number, field: "label" | "value", value: string) => void;
  setAddress: (v: string) => void;
  setBio: (v: string) => void;
  setPortfolioImages: (files: RepoFile[]) => void;
  setCustomPrompt: (v: string) => void;

  setSelectedCategory: (v: string) => void;
  addRepo: () => void;
  removeRepo: (id: number) => void;
  updateRepo: (id: number, field: keyof Omit<RepoEntry, "id" | "files" | "images">, value: string | number | null) => void;
  setRepoFiles: (id: number, files: RepoFile[]) => void;
  setRepoImages: (id: number, images: RepoFile[]) => void;

  addAward: () => void;
  removeAward: (id: number) => void;
  updateAward: (id: number, field: keyof Omit<Award, "id">, value: string) => void;

  addActivity: () => void;
  removeActivity: (id: number) => void;
  updateActivity: (id: number, field: keyof Omit<Activity, "id">, value: string) => void;

  setDirection: (v: string) => void;
  setTags: (tags: string[]) => void;
  setSelectedStyle: (v: string) => void;
  setCustomStyleDesc: (v: string) => void;
  setVisibility: (v: "public" | "private") => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  portfolioTitle: "",
  portfolioDescription: "",
  name: "",
  contact: [],
  address: "",
  bio: "",
  portfolioImages: [],
  customPrompt: "",

  selectedCategory: null,
  repos: [],
  awards: [],
  activities: [],
  direction: "",
  tags: [],
  selectedStyle: "ethereal",
  customStyleDesc: "",
  visibility: "public",

  setPortfolioTitle: (v) => set({ portfolioTitle: v }),
  setPortfolioDescription: (v) => set({ portfolioDescription: v }),
  setName: (v) => set({ name: v }),
  addContact: () =>
    set((s) => ({ contact: [...s.contact, { id: _contactId++, label: "", value: "" }] })),
  removeContact: (id) => set((s) => ({ contact: s.contact.filter((c) => c.id !== id) })),
  updateContact: (id, field, value) =>
    set((s) => ({ contact: s.contact.map((c) => (c.id === id ? { ...c, [field]: value } : c)) })),
  setAddress: (v) => set({ address: v }),
  setBio: (v) => set({ bio: v }),
  setPortfolioImages: (files) => set({ portfolioImages: files }),
  setCustomPrompt: (v) => set({ customPrompt: v }),

  setSelectedCategory: (v) => set({ selectedCategory: v }),

  addRepo: () =>
    set((s) => ({
      repos: [...s.repos, { id: _repoId++, url: "", repositoryId: null, name: "", description: "", files: [], images: [] }],
    })),
  removeRepo: (id) => set((s) => ({ repos: s.repos.filter((r) => r.id !== id) })),
  updateRepo: (id, field, value) =>
    set((s) => ({ repos: s.repos.map((r) => (r.id === id ? { ...r, [field]: value } : r)) })),
  setRepoFiles: (id, files) =>
    set((s) => ({ repos: s.repos.map((r) => (r.id === id ? { ...r, files } : r)) })),
  setRepoImages: (id, images) =>
    set((s) => ({ repos: s.repos.map((r) => (r.id === id ? { ...r, images } : r)) })),

  addAward: () =>
    set((s) => ({ awards: [...s.awards, { id: _awardId++, title: "", organization: "", date: "", description: "" }] })),
  removeAward: (id) => set((s) => ({ awards: s.awards.filter((a) => a.id !== id) })),
  updateAward: (id, field, value) =>
    set((s) => ({ awards: s.awards.map((a) => (a.id === id ? { ...a, [field]: value } : a)) })),

  addActivity: () =>
    set((s) => ({ activities: [...s.activities, { id: _activityId++, title: "", organization: "", period: "", description: "" }] })),
  removeActivity: (id) => set((s) => ({ activities: s.activities.filter((a) => a.id !== id) })),
  updateActivity: (id, field, value) =>
    set((s) => ({ activities: s.activities.map((a) => (a.id === id ? { ...a, [field]: value } : a)) })),

  setDirection: (v) => set({ direction: v }),
  setTags: (tags) => set({ tags }),
  setSelectedStyle: (v) => set({ selectedStyle: v }),
  setCustomStyleDesc: (v) => set({ customStyleDesc: v }),
  setVisibility: (v) => set({ visibility: v }),
}));