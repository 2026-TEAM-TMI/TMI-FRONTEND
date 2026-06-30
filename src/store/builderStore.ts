import { create } from "zustand";
import type { RepoEntry, Award, Education } from "../types/portfolio";

let _repoId = 1;
let _awardId = 1;
let _eduId = 1;

interface BuilderState {
  // Step 1
  githubId: string;
  selectedCategory: string | null;
  repos: RepoEntry[];
  // Step 2
  awards: Award[];
  educations: Education[];
  // Step 3
  direction: string;
  tags: string[];
  selectedStyle: string;
  customStyleDesc: string;
  visibility: "public" | "private";

  setGithubId: (v: string) => void;
  setSelectedCategory: (v: string) => void;
  addRepo: () => void;
  removeRepo: (id: number) => void;
  updateRepo: (id: number, field: keyof Omit<RepoEntry, "id" | "files">, value: string) => void;

  addAward: () => void;
  removeAward: (id: number) => void;
  updateAward: (id: number, field: keyof Omit<Award, "id">, value: string) => void;

  addEducation: () => void;
  removeEducation: (id: number) => void;
  updateEducation: (id: number, field: keyof Omit<Education, "id">, value: string) => void;

  setDirection: (v: string) => void;
  setTags: (tags: string[]) => void;
  setSelectedStyle: (v: string) => void;
  setCustomStyleDesc: (v: string) => void;
  setVisibility: (v: "public" | "private") => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  githubId: "",
  selectedCategory: null,
  repos: [],
  awards: [],
  educations: [],
  direction: "",
  tags: [],
  selectedStyle: "ethereal",
  customStyleDesc: "",
  visibility: "public",

  setGithubId: (v) => set({ githubId: v }),
  setSelectedCategory: (v) => set({ selectedCategory: v }),

  addRepo: () =>
    set((s) => ({ repos: [...s.repos, { id: _repoId++, url: "", description: "", files: [] }] })),
  removeRepo: (id) => set((s) => ({ repos: s.repos.filter((r) => r.id !== id) })),
  updateRepo: (id, field, value) =>
    set((s) => ({ repos: s.repos.map((r) => (r.id === id ? { ...r, [field]: value } : r)) })),

  addAward: () =>
    set((s) => ({ awards: [...s.awards, { id: _awardId++, name: "", type: "", date: "", description: "" }] })),
  removeAward: (id) => set((s) => ({ awards: s.awards.filter((a) => a.id !== id) })),
  updateAward: (id, field, value) =>
    set((s) => ({ awards: s.awards.map((a) => (a.id === id ? { ...a, [field]: value } : a)) })),

  addEducation: () =>
    set((s) => ({ educations: [...s.educations, { id: _eduId++, program: "", startDate: "", endDate: "", description: "" }] })),
  removeEducation: (id) => set((s) => ({ educations: s.educations.filter((e) => e.id !== id) })),
  updateEducation: (id, field, value) =>
    set((s) => ({ educations: s.educations.map((e) => (e.id === id ? { ...e, [field]: value } : e)) })),

  setDirection: (v) => set({ direction: v }),
  setTags: (tags) => set({ tags }),
  setSelectedStyle: (v) => set({ selectedStyle: v }),
  setCustomStyleDesc: (v) => set({ customStyleDesc: v }),
  setVisibility: (v) => set({ visibility: v }),
}));
