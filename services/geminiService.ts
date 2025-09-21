
// This import is for demonstration to show which library would be used.
// Since we are mocking the API call, it's not strictly necessary for execution.
// import { GoogleGenAI } from "@google/genai";
import type { EvaluationResult } from '../types';

// This function simulates a call to the Gemini API to get a performance summary.
// In a real application, you would initialize the Gemini client and make an actual API call.
export const generatePerformanceSummary = (
  result: EvaluationResult
): Promise<string> => {
  
  // --- START: Real Gemini API call (for demonstration) ---
  /*
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const subjectScoresText = result.subjectScores
      .map(s => `${s.name}: ${s.score}/${s.totalQuestions}`)
      .join(', ');

    const prompt = `
      An OMR test for a student has been evaluated.
      Total Score: ${result.totalScore}/100.
      Subject-wise scores: ${subjectScoresText}.
      Based on this data, write a brief, encouraging, one-paragraph performance summary for the evaluator.
      Highlight the strongest subject and suggest an area for improvement if the total score is below 80.
      Keep it concise and professional.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return Promise.resolve(response.text);
    } catch (error) {
      console.error("Gemini API call failed:", error);
      // Fallback to mock summary on error
      return generateMockSummary(result);
    }
  */
  // --- END: Real Gemini API call ---

  // For this project, we return a mocked summary to avoid needing a real API key.
  return generateMockSummary(result);
};

// Helper function to generate a plausible mock summary.
const generateMockSummary = (result: EvaluationResult): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const strongestSubject = result.subjectScores.reduce((max, current) => 
                current.score > max.score ? current : max
            );
            
            let summary = `The student achieved a total score of ${result.totalScore}/100, demonstrating a solid understanding of the material. Performance in "${strongestSubject.name}" was particularly strong, indicating a clear aptitude in this area. `;

            if (result.totalScore < 80) {
                 const weakestSubject = result.subjectScores.reduce((min, current) => 
                    current.score < min.score ? current : min
                );
                summary += `While the overall result is good, focusing on improving scores in "${weakestSubject.name}" could significantly boost overall performance in future assessments. Consistent practice in this area is recommended.`;
            } else {
                summary += `All subjects show proficient scores, reflecting a well-rounded and comprehensive preparation. Continued engagement with advanced topics is encouraged to build on this excellent foundation.`;
            }

            resolve(summary);
        }, 500); // Simulate a short delay for the AI to "think"
    });
}
