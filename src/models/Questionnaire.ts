export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'text';
  options?: QuestionOption[];
  required: boolean;
  order: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  value: string;
}

export interface QuestionnaireAnswer {
  questionId: string;
  answer: string | string[];
}

export interface QuestionnaireSubmission {
  answers: QuestionnaireAnswer[];
  submittedAt: string;
}

export interface QuestionnaireResult {
  recommendedStructures: string[];
  recommendedSports: string[];
  score: number;
}
