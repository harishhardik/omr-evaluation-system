
import type { AnswerKeySet } from './types';

export const SUBJECTS = [
  { id: 'sub1', name: 'Data Analytics Fundamentals' },
  { id: 'sub2', name: 'Statistics & Probability' },
  { id: 'sub3', name: 'Machine Learning Concepts' },
  { id: 'sub4', name: 'AI & Generative Models' },
  { id: 'sub5', name: 'Python for Data Science' },
];

const generateRandomAnswers = (count: number): string[] => {
    const options = ['A', 'B', 'C', 'D'];
    return Array.from({ length: count }, () => options[Math.floor(Math.random() * options.length)]);
};

export const ANSWER_KEYS: AnswerKeySet = {
  'Set A': generateRandomAnswers(100),
  'Set B': generateRandomAnswers(100),
  'Set C': generateRandomAnswers(100),
  'Set D': generateRandomAnswers(100),
};

export const PROCESSING_MESSAGES: string[] = [
  'Initializing evaluation...',
  'Detecting sheet orientation...',
  'Correcting perspective and skew...',
  'Scanning for bubble grid...',
  'Identifying marked responses...',
  'Matching against answer key...',
  'Calculating subject-wise scores...',
  'Finalizing results...',
];
