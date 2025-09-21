
import { ANSWER_KEYS, SUBJECTS } from '../constants';
import type { EvaluationResult, SubjectScore } from '../types';

// This is a mock service that simulates processing an OMR sheet image.
// In a real application, this would be an API call to a backend service.
export const processOmrSheet = (
  file: File,
  answerKeyId: string
): Promise<EvaluationResult> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay and processing time
    setTimeout(() => {
      try {
        const correctAnswers = ANSWER_KEYS[answerKeyId];
        if (!correctAnswers) {
          throw new Error('Invalid answer key ID');
        }

        // Simulate student's answers with some randomness for errors
        const detectedAnswers = correctAnswers.map(answer => {
            const isCorrect = Math.random() > 0.15; // 85% chance of being correct
            if (isCorrect) return answer;
            const options = ['A', 'B', 'C', 'D'].filter(opt => opt !== answer);
            return options[Math.floor(Math.random() * options.length)];
        });

        let totalScore = 0;
        const isCorrect: boolean[] = [];

        detectedAnswers.forEach((studentAnswer, index) => {
          if (studentAnswer === correctAnswers[index]) {
            totalScore++;
            isCorrect.push(true);
          } else {
            isCorrect.push(false);
          }
        });

        const subjectScores: SubjectScore[] = SUBJECTS.map((subject, i) => {
          let score = 0;
          const startIndex = i * 20;
          const endIndex = startIndex + 20;
          for (let j = startIndex; j < endIndex; j++) {
            if (isCorrect[j]) {
              score++;
            }
          }
          return { ...subject, score, totalQuestions: 20 };
        });

        const result: EvaluationResult = {
          studentId: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
          totalScore,
          accuracy: totalScore / 100,
          subjectScores,
          detectedAnswers,
          correctAnswers,
          isCorrect,
          processedImageUrl: 'https://picsum.photos/400/565', // Placeholder image URL
          answerKeyId,
        };

        resolve(result);
      } catch (err) {
        reject(err);
      }
    }, 3000); // 3-second delay
  });
};
