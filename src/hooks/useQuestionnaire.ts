import { useQuestionnaireStore } from '@/store';

export const useQuestionnaire = () => {
  const {
    questions,
    answers,
    result,
    currentQuestionIndex,
    isLoading,
    error,
    loadQuestions,
    setAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    submitAnswers,
    reset,
    clearError,
  } = useQuestionnaireStore();

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = questions.length > 0 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : 0;

  const getCurrentAnswer = () => {
    if (!currentQuestion) return null;
    const answer = answers.find(a => a.questionId === currentQuestion.id);
    return answer?.answer || null;
  };

  const isCurrentQuestionAnswered = () => {
    const answer = getCurrentAnswer();
    if (!answer) return false;
    
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    
    return answer.trim().length > 0;
  };

  const canSubmit = () => {
    const requiredQuestions = questions.filter(q => q.required);
    const answeredRequired = requiredQuestions.filter(q =>
      answers.some(a => a.questionId === q.id)
    );
    return answeredRequired.length === requiredQuestions.length;
  };

  return {
    // State
    questions,
    answers,
    result,
    currentQuestion,
    currentQuestionIndex,
    isLoading,
    error,
    
    // Computed
    isFirstQuestion,
    isLastQuestion,
    progress,
    
    // Actions
    loadQuestions,
    setAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    submitAnswers,
    reset,
    clearError,
    
    // Helpers
    getCurrentAnswer,
    isCurrentQuestionAnswered,
    canSubmit,
  };
};

export default useQuestionnaire;
