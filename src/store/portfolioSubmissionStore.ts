import { create } from "zustand";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

interface PortfolioSubmissionState {
  status: SubmissionStatus;
  errorMessage: string;
  setStatus: (status: SubmissionStatus, errorMessage?: string) => void;
  reset: () => void;
}

export const usePortfolioSubmissionStore = create<PortfolioSubmissionState>((set) => ({
  status: "idle",
  errorMessage: "",
  setStatus: (status, errorMessage = "") => set({ status, errorMessage }),
  reset: () => set({ status: "idle", errorMessage: "" }),
}));