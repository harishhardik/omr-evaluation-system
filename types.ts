
export interface SubjectScore {
  id: string;
  name: string;
  score: number;
  totalQuestions: number;
}

export interface EvaluationResult {
  studentId: string;
  totalScore: number;
  accuracy: number;
  subjectScores: SubjectScore[];
  detectedAnswers: (string | null)[];
  correctAnswers: string[];
  isCorrect: boolean[];
  processedImageUrl: string;
  answerKeyId: string;
}

export type AppState = 'IDLE' | 'PROCESSING' | 'RESULTS';

export interface AnswerKeySet {
  [key: string]: string[]; 
}
