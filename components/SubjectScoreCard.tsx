
import React from 'react';
import type { SubjectScore } from '../types';

interface SubjectScoreCardProps {
  subject: SubjectScore;
}

export const SubjectScoreCard: React.FC<SubjectScoreCardProps> = ({ subject }) => {
  const percentage = (subject.score / subject.totalQuestions) * 100;
  const barColor = percentage >= 75 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-medium text-slate-600 w-3/4">{subject.name}</h4>
        <p className="text-lg font-bold text-slate-800">
          {subject.score}<span className="text-sm font-normal text-slate-400">/{subject.totalQuestions}</span>
        </p>
      </div>
      <div className="mt-3">
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div className={`${barColor} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};
