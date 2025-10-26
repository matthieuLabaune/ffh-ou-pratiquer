import { create } from 'zustand';
import { questionnaireService } from '@/api';
import {
  Question,
  QuestionnaireAnswer,
  QuestionnaireResult,
} from '@/models';

interface QuestionnaireState {
  questions: Question[];
  answers: QuestionnaireAnswer[];
  result: QuestionnaireResult | null;
  currentQuestionIndex: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadQuestions: () => Promise<void>;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAnswers: () => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>((set, get) => ({
  questions: [],
  answers: [],
  result: null,
  currentQuestionIndex: 0,
  isLoading: false,
  error: null,

  loadQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const questions = await questionnaireService.getQuestions();
      set({
        questions: questions.sort((a, b) => a.order - b.order),
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors du chargement',
        isLoading: false,
      });
      throw error;
    }
  },

  setAnswer: (questionId: string, answer: string | string[]) => {
    const { answers } = get();
    const existingIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = { questionId, answer };
      set({ answers: newAnswers });
    } else {
      set({ answers: [...answers, { questionId, answer }] });
    }
  },

  goToQuestion: (index: number) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({ currentQuestionIndex: index });
    }
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  submitAnswers: async () => {
    const { answers } = get();
    set({ isLoading: true, error: null });
    
    try {
      const result = await questionnaireService.submitAnswers({
        answers,
        submittedAt: new Date().toISOString(),
      });
      
      set({
        result,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Erreur lors de la soumission',
        isLoading: false,
      });
      throw error;
    }
  },

  reset: () => {
    set({
      answers: [],
      result: null,
      currentQuestionIndex: 0,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));

export default useQuestionnaireStore;
