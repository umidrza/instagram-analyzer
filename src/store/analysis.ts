import { create } from "zustand";
import type { AnalysisResult } from "@/types/domain";

interface AnalysisStore {
  analysis: AnalysisResult | null;
  setAnalysis: (analysis: AnalysisResult) => void;
  clearAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analysis: null,

  setAnalysis: (analysis) =>
    set({
      analysis,
    }),

  clearAnalysis: () =>
    set({
      analysis: null,
    }),
}));