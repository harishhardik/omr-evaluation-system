
import React, { useEffect, useState } from 'react';
import type { EvaluationResult } from '../types';
import { SubjectScoreCard } from './SubjectScoreCard';
import { DownloadIcon } from './icons/DownloadIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface ResultsStepProps {
  result: EvaluationResult;
  aiSummary: string;
  onReset: () => void;
  uploadedFile: File;
}

export const ResultsStep: React.FC<ResultsStepProps> = ({ result, aiSummary, onReset, uploadedFile }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  useEffect(() => {
    const objectUrl = URL.createObjectURL(uploadedFile);
    setImagePreviewUrl(objectUrl);
    
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedFile]);

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Student ID,Total Score,Accuracy\n";
    csvContent += `${result.studentId},${result.totalScore},${result.accuracy * 100}%\n\n`;
    csvContent += "Subject,Score,Total Questions\n";
    result.subjectScores.forEach(s => {
      csvContent += `${s.name},${s.score},${s.totalQuestions}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `OMR_Result_${result.studentId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const scoreColor = result.totalScore >= 75 ? 'text-green-600' : result.totalScore >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200">
      <div className="flex justify-between items-start mb-6">
        <div>
            <h2 className="text-3xl font-bold text-slate-800">Evaluation Complete</h2>
            <p className="text-slate-500 mt-1">Results for Student ID: <span className="font-semibold text-slate-700">{result.studentId}</span></p>
        </div>
        <div className="flex space-x-2">
            <button onClick={exportToCSV} className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <DownloadIcon className="w-5 h-5 mr-2" />
                Export CSV
            </button>
            <button onClick={onReset} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Process Another Sheet
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image with Overlay */}
        <div className="lg:col-span-1 bg-slate-100 rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-2 text-slate-700">Scanned Sheet Review</h3>
            <p className="text-sm text-slate-500 mb-4">A simulated overlay of correct (green) and incorrect (red) answers.</p>
            <div className="relative w-full h-auto overflow-hidden rounded-md shadow-inner">
                {imagePreviewUrl ? (
                    <img src={imagePreviewUrl} alt="Processed OMR Sheet" className="w-full h-auto object-contain" />
                ) : (
                    <div className="w-full h-96 bg-slate-200 flex items-center justify-center">
                        <p className="text-slate-500">Loading image...</p>
                    </div>
                )}
                 {/* This is a MOCK overlay */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {result.isCorrect.map((correct, index) => {
                        if (index >= 20) return null; // Only show first 20 for demo
                        const top = 15 + (index % 10) * 8.4;
                        const left = index < 10 ? 10 : 55;
                        const Icon = correct ? CheckCircleIcon : XCircleIcon;
                        const color = correct ? 'text-green-500/80' : 'text-red-500/80';
                        return (
                            <Icon key={index} className={`absolute w-5 h-5 ${color}`} style={{ top: `${top}%`, left: `${left}%` }} />
                        )
                    })}
                </div>
            </div>
        </div>

        {/* Right Column: Scores and Summary */}
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-slate-50 p-6 rounded-lg border">
                    <h4 className="text-sm font-medium text-slate-500 uppercase">Total Score</h4>
                    <p className={`text-5xl font-bold mt-1 ${scoreColor}`}>{result.totalScore}<span className="text-3xl text-slate-400">/100</span></p>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg border">
                    <h4 className="text-sm font-medium text-slate-500 uppercase">Accuracy</h4>
                    <p className={`text-5xl font-bold mt-1 ${scoreColor}`}>{(result.accuracy * 100).toFixed(1)}%</p>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-slate-700">Subject-wise Performance</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {result.subjectScores.map(subject => (
                        <SubjectScoreCard key={subject.id} subject={subject} />
                    ))}
                </div>
            </div>

            <div>
                 <h3 className="text-lg font-semibold text-slate-700">AI-Powered Summary</h3>
                 <div className="mt-4 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 p-4 rounded-r-lg">
                    <p className="text-sm">{aiSummary}</p>
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
};
