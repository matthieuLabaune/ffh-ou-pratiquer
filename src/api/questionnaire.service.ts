import apiClient from './client';
import {
  Question,
  QuestionnaireSubmission,
  QuestionnaireResult,
} from '@/models';

class QuestionnaireService {
  private readonly endpoint = '/questionnaire';

  async getQuestions(): Promise<Question[]> {
    return apiClient.get<Question[]>(`${this.endpoint}/questions`);
  }

  async submitAnswers(
    submission: QuestionnaireSubmission
  ): Promise<QuestionnaireResult> {
    return apiClient.post<QuestionnaireResult>(
      `${this.endpoint}/submit`,
      submission
    );
  }

  async getResults(submissionId: string): Promise<QuestionnaireResult> {
    return apiClient.get<QuestionnaireResult>(
      `${this.endpoint}/results/${submissionId}`
    );
  }
}

export const questionnaireService = new QuestionnaireService();
export default questionnaireService;
