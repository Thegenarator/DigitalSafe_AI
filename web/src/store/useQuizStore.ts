import { QUESTION_BANK } from "@/data/questions";
import { SelectedAnswer } from "@/lib/types";
import { create } from "zustand";

type QuizState = {
  currentIndex: number;
  responses: Record<string, SelectedAnswer | undefined>;
  setResponse: (answer: SelectedAnswer) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  currentIndex: 0,
  responses: {},
  setResponse: (answer) =>
    set((state) => ({
      responses: { ...state.responses, [answer.questionId]: answer },
    })),
  next: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, QUESTION_BANK.length - 1),
    })),
  back: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
    })),
  reset: () =>
    set(() => ({
      currentIndex: 0,
      responses: {},
    })),
}));

