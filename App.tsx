
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadStep } from './components/UploadStep';
import { ProcessingStep } from './components/ProcessingStep';
import { ResultsStep } from './components/ResultsStep';
import { processOmrSheet } from './services/omrService';
import { generatePerformanceSummary } from './services/geminiService';
import type { AppState, EvaluationResult } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('IDLE');
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleProcessRequest = useCallback(async (file: File, answerKeyId: string) => {
    setAppState('PROCESSING');
    setError(null);
    setUploadedFile(file);

    try {
      const result = await processOmrSheet(file, answerKeyId);
      setEvaluationResult(result);
      
      const summary = await generatePerformanceSummary(result);
      setAiSummary(summary);

      setAppState('RESULTS');
    } catch (err) {
      setError('Failed to process the OMR sheet. Please try again.');
      setAppState('IDLE');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState('IDLE');
    setEvaluationResult(null);
    setAiSummary('');
    setError(null);
    setUploadedFile(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'IDLE':
        return <UploadStep onProcess={handleProcessRequest} error={error} />;
      case 'PROCESSING':
        return <ProcessingStep />;
      case 'RESULTS':
        if (evaluationResult && uploadedFile) {
          return (
            <ResultsStep
              result={evaluationResult}
              aiSummary={aiSummary}
              onReset={handleReset}
              uploadedFile={uploadedFile}
            />
          );
        }
        // Fallback in case result is null
        handleReset();
        return null;
      default:
        return <UploadStep onProcess={handleProcessRequest} error={error} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
